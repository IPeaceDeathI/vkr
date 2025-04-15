import QuesType1 from "./QuesType1";
import QuesType2 from "./QuesType2";
import { isJSONAsObject } from "./../../../../../vendor/inilim/js_type_string/src/JSON";
import { isEmptyObject } from "./../../../../../vendor/inilim/js_type_string/src/Object";
import { isNotEmptyString } from "./../../../../../vendor/inilim/js_type_string/src/String";
import { only_number_input } from "./../../../../../resource/js/only_number";

/**
 * TODO нужен рефакторинг!!!
 */
export default class ViewQuiz {
    static #run_init = false;
    static #hash = null;
    static #is_frame = null;
    static #timer = null;

    #o = {
        progress: 0,
        id_quiz: null,
        ques: null,
        setting: null,
        area_ques: null,
        area_form: null,
        currentQuesNum: 0,
    };
    #currentQuesObj = null;
    #preview = null;
    #storage = null;
    #location = null;

    // ------------------------------------------------------------------
    //
    // ------------------------------------------------------------------

    init() {
        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        if (ViewQuiz.#run_init === false) {
            console.log("ViewQuiz.init");
            ViewQuiz.#run_init = true;
        } else {
            console.log("ViewQuiz.init: попытка повторного вызова");
            return;
        }

        // ------------------------------------------------------------------
        // очищаем local storage, так как он должен прийти новый из родителя
        // ------------------------------------------------------------------

        this.#clearLocalStorage();

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        ViewQuiz.#is_frame = this.#isFrame();
        console.log("ViewQuiz.is_frame", ViewQuiz.#is_frame);
        ViewQuiz.#hash = this.#uuid();
        console.log("ViewQuiz.hash", ViewQuiz.#hash);

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        if (ViewQuiz.#is_frame) {
            // ------------------------------------------------------------------
            // ожидаем от окна родителя сообщение, примаем ото всех
            // ------------------------------------------------------------------

            try {
                window.addEventListener("message", this.#eventMessage);
                console.log("ViewQuiz.eventMessage.set");
            } catch (e) {
                console.log("ViewQuiz.eventMessage.exception", e);
            }

            // ------------------------------------------------------------------
            // INFO отправляем родительскому окну что мы прогрузились
            // ------------------------------------------------------------------
            ViewQuiz.#timer = setInterval(() => {
                this.#sendParentWindow({
                    type: "quiz_load",
                    hash: ViewQuiz.#hash,
                });
            }, 1000);

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------
        }

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        this.#o.ques = $("script#ques").text();
        this.#o.ques = JSON.parse(this.#o.ques);

        this.#o.setting = $("script#setting").text();
        this.#o.setting = JSON.parse(this.#o.setting);

        let temp = $("script#info").text();
        temp = JSON.parse(temp);

        this.#o.id_quiz = parseInt(temp.quiz_id);

        this.#o.area_ques = $("[data-area-ques]");
        this.#o.area_form = $("[data-area-form]");
        this.#o.area_gb = $("[data-good-bye]");

        this.#preview = $('meta[name="preview-quiz"]').attr("content");

        // первичная проверка
        if (this.#validData()) {
            // начать рендерить
            this.#renderFirstQues();
            // обьявляем обработчик с текущим обьектом вопроса
            this.#eventClickNext();
            this.#eventClickPrev();
            return;
        }
        // рендер формы
        this.#eventClickForm();
        this.#renderForm();
    }

    // ------------------------------------------------------------------
    // static
    // ------------------------------------------------------------------

    /**
     * ждем когда родитель даст знать что он нас слышит
     */
    static eventMessageTypeCompletListenMessage(incoming_data) {
        incoming_data.hash = incoming_data.hash ?? "";

        if (incoming_data.hash === ViewQuiz.#hash) {
            if (ViewQuiz.#timer === null) {
                console.log("ViewQuiz.timer.null");
                return;
            }
            clearInterval(ViewQuiz.#timer);
        } else {
            console.log(
                "ViewQuiz.hash.not_equal",
                incoming_data.hash,
                ViewQuiz.#hash
            );
        }
    }

    /**
     * получаем от родителя данные о сайте клиента
     */
    static eventMessageTypeSiteInfo(incoming_data) {
        let data = incoming_data.data ?? {};

        console.log("ViewQuiz.eventMessageTypeSiteInfo", incoming_data);

        if (isEmptyObject(data)) {
            return;
        }

        data = window.btoa(JSON.stringify(data));

        localStorage.setItem("lp_site_info", data);
    }

    /**
     * получаем от родителя данные об visit_id
     */
    static eventMessageTypeVisit(incoming_data) {
        // ------------------------------------------------------------------
        // проверяем ключи и значение в обьекте
        // ------------------------------------------------------------------

        if (incoming_data.lp_stat_visit === undefined) {
            console.log(
                "ViewQuiz.eventMessageTypeVisit.lp_stat_visit",
                incoming_data
            );
            return;
        }

        if (!isNotEmptyString(incoming_data.lp_stat_visit)) {
            console.log(
                "ViewQuiz.eventMessageTypeVisit.lp_stat_visit.empty",
                incoming_data
            );
            return;
        }

        if (incoming_data.lp_stat_visit.length !== 36) {
            console.log(
                "ViewQuiz.eventMessageTypeVisit.lp_stat_visit.length",
                incoming_data
            );
            return;
        }

        // ------------------------------------------------------------------
        // ожидаем куку визита из родителя
        // ------------------------------------------------------------------

        localStorage.setItem(
            "lp_stat_internal_visit",
            incoming_data.lp_stat_visit
        );

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        console.log(
            "ViewQuiz.eventMessageTypeVisit.lp_stat_visit.set",
            incoming_data
        );
    }

    // ------------------------------------------------------------------
    // public
    // ------------------------------------------------------------------

    /**
     * false - заблочить. true - активировать
     */
    statusBtnNext(st) {
        let btn = $(".ques-navbar .btn-next");
        if (st) {
            btn.removeAttr("disabled");
        } else {
            btn.attr("disabled", "");
        }
    }

    /**
     * рендерить следующий вопрос, если его нет, тогда показываем форму
     */
    nextQues() {
        this.#clearQues();
        this.#o.currentQuesNum++;

        if (this.#o.currentQuesNum < this.#o.ques.length) {
            let obj = this.#getObjTypeQues(
                Object.values(this.#o.ques)[this.#o.currentQuesNum]
            );
            this.#currentQuesObj = obj;
            obj.renderQues();
            this.#eventClickNext();
            this.#progress();
            return;
        }
        this.#o.currentQuesNum = this.#o.ques.length;
        this.#progress();
        // рендер формы
        this.#eventClickForm();
        this.#renderForm();
    }

    urlStorage() {
        if (this.#storage == null) {
            this.#storage = this.#getLocation().origin;
        }
        return this.#storage;
    }

    escapeHtml(text) {
        let map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };
        return text.replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    }

    // ------------------------------------------------------------------
    // private
    // ------------------------------------------------------------------

    #clearLocalStorage() {
        localStorage.removeItem("lp_stat_internal_visit");
        localStorage.removeItem("lp_site_info");
    }

    #eventMessage(event) {
        // e.origin - принимаем сообщение от всех
        let incoming_data = event.data ?? "";

        // ------------------------------------------------------------------
        // проверяем что это JSON
        // ------------------------------------------------------------------

        if (!isJSONAsObject(incoming_data)) {
            console.log(
                "ViewQuiz.eventMessage.json",
                event.origin,
                incoming_data
            );
            return;
        }
        incoming_data = JSON.parse(incoming_data);

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        if (incoming_data.type === undefined) {
            console.log(
                "ViewQuiz.eventMessage.type.not_found",
                event.origin,
                incoming_data
            );
            return;
        }

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        if (incoming_data.type === "visit") {
            console.log("ViewQuiz.eventMessage.type: visit");
            ViewQuiz.eventMessageTypeVisit(incoming_data);
        } else if (incoming_data.type === "site_info") {
            console.log("ViewQuiz.eventMessage.type: site_info");
            ViewQuiz.eventMessageTypeSiteInfo(incoming_data);
        } else if (incoming_data.type === "parent_complete") {
            console.log("ViewQuiz.eventMessage.type: parent_complete");
            ViewQuiz.eventMessageTypeCompletListenMessage(incoming_data);
        }
    }

    #isFrame() {
        try {
            return self.parent.frames.length != 0;
        } catch (e) {
            return false;
        }
    }

    #getHREFFrame() {
        try {
            return self.parent.location.href ?? null;
        } catch (e) {
            return null;
        }
    }

    /**
     * рендер первого окна вопроса
     */
    #renderFirstQues() {
        // показываем главное окно вопросов
        this.#clearQues();
        let obj = this.#getObjTypeQues(
            Object.values(this.#o.ques)[this.#o.currentQuesNum]
        );
        this.#currentQuesObj = obj;
        $(".quiz-ques").fadeIn(500);
        obj.renderQues();
    }

    #filterQues(obj, callback) {
        let result = [];
        let i = 0;
        for (const [key, value] of Object.entries(obj)) {
            if (callback(value, key)) {
                result[i] = value;
                i++;
            }
        }
        return result;
    }

    /**
     * получить нужный обьект вопроса
     */
    #getObjTypeQues(ques) {
        let obj;
        if (ques.id_type == 1) {
            obj = new QuesType1(ques, this.#o.area_ques);
        } else if (ques.id_type == 2) {
            obj = new QuesType2(ques, this.#o.area_ques);
        }

        return obj;
    }

    /**
     * проверки на наличие вопросов и их значения. В основном все валидируется на этапе создания.
     */
    #validData() {
        // если вопрос скрыт
        this.#o.ques = this.#filterQues(this.#o.ques, function (ques) {
            return ques.data_choice.hidden != true;
        });
        // если ответов нет
        this.#o.ques = this.#filterQues(this.#o.ques, function (ques) {
            return ques.data_ques.length !== 0;
        });
        // если ответы есть но они пустые
        try {
            this.#o.ques = this.#filterQues(this.#o.ques, function (ques) {
                let t = "";
                // проверяем что поля ответов не пусты
                ques.data_ques.forEach((answer) => {
                    t += (answer.answer ?? "") + (answer.other_text ?? "");
                });

                // проверяем наличие поля "Свой ответ"
                if (ques.data_stg.your_answer ?? false) {
                    t += ques.data_stg.your_answer_text ?? "";
                }

                return t !== "";
            });
        } catch (e) {
            console.log("ViewQuiz", e);
        }

        if (this.#o.ques.length > 0) return true;
        return false;
    }

    #getLocation() {
        if (this.#location == null) {
            this.#location = new URL(document.location);
        }
        return this.#location;
    }

    /**
     * получаем данные из урла, в случаи если мы в iframe'е
     * INFO скорее всего на удаление
     * @returns {string}
     */
    #getSiteDataFromAnchor() {
        let data = this.#getLocation().hash ?? "";
        data = data.replace(/^#/, "");

        console.log("ViewQuiz.getSiteDataFromAnchor", data);

        return data;
    }

    /**
     * берем данные из localstorage, они там могут быть если квиз был открыт в iframe'e
     * @returns {string}
     */
    #getSiteDataFromLocalStorage() {
        let data = localStorage.getItem("lp_site_info") ?? "";

        console.log("ViewQuiz.getSiteDataFromLocalStorage", data);

        return data;
    }

    #getSiteDataIfDirectVisit() {
        let url, data;

        if (ViewQuiz.#is_frame) url = this.#getHREFFrame();
        else url = null;

        data = {
            url_client: url,
            // META TAG
            id_page: null,
            id_site: null,
            id_flow: null,
            // COOKIE
            cookie: {},
            // localStorage
            local_storage: {
                // ожидаем его от родителя
                lp_stat_visit: localStorage.getItem("lp_stat_internal_visit"),
            },
        };

        console.log("ViewQuiz.getSiteDataIfDirectVisit", data);

        return window.btoa(JSON.stringify(data));
    }

    /**
     * взять данные формы
     */
    #getDataContact() {
        let data = this.#getSiteDataFromAnchor();
        let from = "getSiteDataFromAnchor";

        if (data === "") {
            data = this.#getSiteDataFromLocalStorage();
            from = "getSiteDataFromLocalStorage";
        }

        if (data === "") {
            // если на квиз перешли по прямой ссылке. site.ru/quiz/show/10
            // или конструктор не подставил якорь
            data = this.#getSiteDataIfDirectVisit();
            from = "getSiteDataIfDirectVisit";
        }

        data = {
            name: this.#o.area_form.find('input[name="name"]').val(),
            tel: this.#o.area_form.find('input[name="phone"]').val(),
            id_quiz: this.#o.id_quiz,
            result_approach_hash: ViewQuiz.#hash,
            data_from: from,
            meta_data: data,
        };

        console.log("ViewQuiz.getDataContact", data);

        return data;
    }

    /**
     * меняем прогресс бар
     */
    #progress() {
        let bar = $(".ques-navbar .label");
        let liner = $(".ques-navbar .progress-bar-linear span");
        let stepCount = this.#o.ques.length;
        let current = this.#o.currentQuesNum;
        let percent = (current / stepCount) * 100;

        if (this.#o.currentQuesNum === 0) percent = 0;

        percent = Math.round(percent);
        bar.text(percent + "%");
        liner.css("width", percent + "%");
    }

    /**
     * очищаем данные вопроса
     */
    #clearQues() {
        this.#o.area_ques.find(".ques-title-ques").text("");
        this.#o.area_ques.find(".ques-list-answer").empty();
    }

    /**
     * рендерим предыдущий вопрос
     */
    #prevQues() {
        if (this.#o.currentQuesNum === 0) return;
        // на всякий случай
        if (this.#o.currentQuesNum < 0) return;
        this.#clearQues();
        this.#o.currentQuesNum--;

        let obj = this.#getObjTypeQues(
            Object.values(this.#o.ques)[this.#o.currentQuesNum]
        );
        this.#currentQuesObj = obj;
        obj.renderQues();
        this.#eventClickPrev();
        this.#progress();
        return;
    }

    /**
     * отправить данные о пройденном шаге "вопрос"
     */
    #sendStepData(dataQues) {
        this.#sendParentWindow({
            type: "quiz_goal",
            target_id: dataQues.target,
            action: "noks_goal_quiz_step_send",
        });

        dataQues.quiz_answer = JSON.stringify(dataQues.quiz_answer);
        dataQues.id_quiz = this.#o.id_quiz;
        dataQues.result_approach_hash = ViewQuiz.#hash;

        if (this.#preview == 1) {
            console.log("ViewQuiz.preview_mode", dataQues);
            return;
        }

        $.ajax({
            url: "/api/quiz/save/step",
            method: "POST",
            data: dataQues,
            dataType: "json",
            success: (response) => dd(response),
            error: (response) => dd(response),
        });
    }

    #sendLog(data) {
        try {
            $.ajax({
                url: "/api/other/front_client_log",
                method: "POST",
                data: data,
                dataType: "json",
                success: (res) => dd(res),
                error: (res) => dd(res),
            });
        } catch (e) {}
    }

    /**
     * отправить данные формы
     */
    #sendContact(data) {
        this.#sendParentWindow({
            type: "quiz_goal",
            target_id: this.#o.setting.form_id_target ?? "",
            action: "noks_goal_quiz_lead_send",
        });
        if (this.#preview == 1) {
            console.log("ViewQuiz.preview_mode", data);
            return;
        }
        $.ajax({
            url: "/api/quiz/save/lead",
            method: "POST",
            data: data,
            dataType: "json",
            success: (response) => dd(response),
            error: (response) => dd(response),
        });
    }

    #eventClickNext() {
        $(document).off("click", ".ques-navbar .btn-next");
        $(document).on("click", ".ques-navbar .btn-next", () => {
            try {
                this.#sendStepData(this.#currentQuesObj.getData());
                this.nextQues();
            } catch (e) {
                this.#sendLog(e);
                console.log("ViewQuiz", e);
            }
        });
    }

    #eventClickPrev() {
        $(document).off("click", ".ques-navbar .btn-prev");
        $(document).on("click", ".ques-navbar .btn-prev", () => {
            this.#prevQues();
        });
    }

    #uuid(length = 40) {
        let result = "";
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const chars_len = chars.length;
        let counter = 0;
        while (counter < length) {
            result += chars.charAt(Math.floor(Math.random() * chars_len));
            counter += 1;
        }
        return result;
    }

    /**
     * клик по кнопке в форме
     */
    #eventClickForm() {
        let area_form = this.#o.area_form;

        let msg = {
            agreement:
                "Пожалуйста, ознакомьтесь и примите Положение об обработке персональных данных и Политику конфиденциальности, поставив галочку",
            tel_empty: "Введите телефон",
            tel_length: "Не корректная длина номера.",
            tel_pattern: "Некорректный формат номера телефона",
        };

        try {
            only_number_input($('[data-area-form] input[type="tel"]').get(0));
            // $('[data-area-form] input[type="tel"]').mask("+7 (999) 999-99-99");
        } catch (e) {
            console.log("ViewQuiz.only_number_input", e);
        }

        $(document).off("click", "[data-area-form] button");
        $(document).on("click", "[data-area-form] button", (e) => {
            e.preventDefault();
            let err = [];

            if (!area_form.find(".agreement input").prop("checked")) {
                err.push(msg.agreement);
            }

            let tel = area_form.find('input[type="tel"]').val();
            tel = tel.replace(/\(|\)|\s+|-/g, "");

            if (tel == "") {
                err.push(msg.tel_empty);
            } else if (tel.length <= 9) {
                err.push(msg.tel_length);
            } else if (!/^((\+7|7|8)+([0-9]){10})$/.test(tel)) {
                err.push(msg.tel_pattern);
            }

            if (err.length > 0) {
                err.forEach(function (value) {
                    $.message(value);
                });
                return;
            }
            // рендер прощального окна
            this.#renderGoodBye();
            // собрать данные и отправить
            try {
                this.#sendContact(this.#getDataContact());
            } catch (e) {
                this.#sendLog(e);
                console.log("ViewQuiz", e);
            }
        });
    }

    /**
     * показываем окно формы
     */
    #renderForm() {
        this.#initMessages();
        if (this.#o.setting.title_btn == "") {
            this.#o.setting.title_btn = "Получить результат";
        }

        if (this.#o.setting.title == "") {
            if (this.#o.setting.desc == "") {
                this.#o.setting.title =
                    "Заполните форму, чтобы получить результаты теста";
            }
        }
        let area_form = this.#o.area_form;

        // заполняем форму данными
        area_form.find("[data-title-form]").text(this.#o.setting.title);
        area_form.find("[data-other-text-form]").text(this.#o.setting.desc);
        area_form.find("button").text(this.#o.setting.title_btn);

        // скрыть главную область вопросов
        $(".quiz-ques").fadeOut(500, function () {
            // показать окно формы
            area_form.fadeIn(500);
        });
    }

    /**
     * показываем окно "пока"
     */
    #renderGoodBye() {
        // прячем форму
        this.#o.area_form.fadeOut(500, () => {
            // показываем прощальное окно
            this.#o.area_gb.fadeIn(500);
        });
    }

    /**
     * обьявляем функцию для ошибок в форме
     */
    #initMessages() {
        $('<div class="messages"></div>').appendTo("body");
        $.message = function (text, timeout) {
            if (!timeout) timeout = 5000;
            var box = $('<div class="message">' + text + "</div>");
            if ($(".messages div").length >= 3)
                $(".message:first")
                    .stop()
                    .animate(
                        {
                            opacity: "0",
                            left: "-2em",
                        },
                        100,
                        function () {
                            $(".message").remove();
                        }
                    );
            box.animate(
                {
                    opacity: "0",
                },
                200,
                function () {
                    box.appendTo(".messages")
                        .css({
                            opacity: "0",
                            left: "2em",
                        })
                        .animate(
                            {
                                opacity: "1",
                                left: "0em",
                            },
                            300,
                            function () {
                                box.animate(
                                    {
                                        opacity: "1",
                                    },
                                    timeout,
                                    function () {
                                        box.animate(
                                            {
                                                opacity: "0",
                                                left: "-2em",
                                            },
                                            300,
                                            function () {
                                                box.remove();
                                            }
                                        );
                                    }
                                );
                            }
                        );
                }
            );
        };
    }

    #sendParentWindow(data_obj) {
        try {
            console.log("ViewQuiz.postMessage.send", data_obj);
            window.top.postMessage(JSON.stringify(data_obj), "*");
        } catch (e) {
            console.log("ViewQuiz.postMessage.exception", e);
        }
    }
}
