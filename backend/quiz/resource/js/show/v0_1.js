if (!NoksQuiz) {
    var NoksQuiz = class {
        static #allParams = [];
        static #completed = false;

        static init() {
            if (this.#completed) return;
            this.#completed = true;

            console.log(12312332);

            let triggers = [
                ...document.querySelectorAll("[data-noks-quiz-id]"),
                ...document.querySelectorAll('[href^="#popup:noksquiz"]'),
            ];

            if (triggers.length === 0) return;

            // валидация идентификатора
            triggers.forEach((el) => {
                let id = el.getAttribute("data-noks-quiz-id");
                if (id == null) {
                    id = el.getAttribute("href");
                    id = id.replace(/[^0-9]/g, "");
                }
                id = parseInt(id);
                if (Number.isNaN(id)) return;

                this.#allParams.push({
                    id: id,
                    el: el,
                    host: "//" + (window.site_domain ?? "landing-page.su"),
                    action: "/quiz/show",
                });
            });

            if (this.#allParams.length === 0) return;
            // грузим стили
            this.#addCSSTag();
            this.#receptionMessageFromFrame();
            // рендерим фреймы
            let uniq_id = [];
            this.#allParams.forEach((param) => {
                // предотвращаем одинаковые квизы
                if (!uniq_id.includes(param.id)) {
                    uniq_id.push(param.id);
                    this.#addIFrame(param);
                    this.#addListenerHideIframe(param);
                }
                this.#addListenerBtn(param);
            });
        }

        static #collectMetaData() {
            return window.btoa(
                JSON.stringify({
                    url_client: this.#getUrlClient(),
                    // META TAG
                    id_page: this.#getIdPage(),
                    id_site: this.#getIdSite(),
                    // COOKIE
                    cookie: {
                        roistat_visit: this.#getCookie("roistat_visit"),
                        lp_stat_visit: this.#getCookie("lp_stat_visit"),
                    },
                    // localStorage
                    local_storage: {
                        lp_stat_visit: localStorage.getItem("lp_stat_visit"),
                    },
                })
            );
        }

        static #getUrlClient() {
            return new URL(document.location).href ?? null;
        }

        static #getIdPage() {
            let el = document.querySelector('meta[name="id-page"]');
            if (el == null) return null;
            return el.getAttribute("content");
        }

        static #getIdSite() {
            let el = document.querySelector('meta[name="id-site"]');
            if (el == null) return null;
            return el.getAttribute("content");
        }

        /**
         * показать iframe
         */
        static #showIframe(param) {
            let div = document.querySelector(
                '[data-frame-quiz-id="' + param.id + '"]'
            );
            div.classList.add("noks-show-iframe");
            div.querySelector("iframe").classList.add("noks-quiz-frame-open");
        }

        /**
         * спрятать iframe
         */
        static #hideIframe(param) {
            let div = document.querySelector(
                '[data-frame-quiz-id="' + param.id + '"]'
            );
            div.classList.remove("noks-show-iframe");
            div.querySelector("iframe").classList.remove(
                "noks-quiz-frame-open"
            );
        }

        /**
         * добавить обработчик клика на темный фон
         */
        static #addListenerHideIframe(param) {
            let wrp_iframe = document.querySelector(
                '[data-frame-quiz-id="' + param.id + '"]'
            );
            wrp_iframe.addEventListener("click", (el) =>
                this.#hideIframe(param)
            );
        }

        /**
         * открываем iframe по кнопке
         */
        static #addListenerBtn(param) {
            param.el.addEventListener("click", () => this.#showIframe(param));
        }

        /**
         * подгружаем стили для клиента по style
         */
        static #addCSSTag() {
            let css = `.noks-hidden-iframe{top:0;bottom:0;left:0;right:0;background:rgba(25,25,25,.89);visibility:hidden;position:fixed;opacity:0;z-index:-10000;overflow-x:hidden;overflow-y:auto;overflow-scrolling:touch;-webkit-overflow-scrolling:touch;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.noks-show-iframe{visibility:visible;z-index:2147483647;opacity:1}.noks-quiz-modal{visibility:hidden;z-index:100010;position:relative;max-width:1200px;width:80%}.noks-show-iframe .noks-quiz-modal{visibility:visible}.noks-quiz-frame{display:none;height:100%;width:100%;background:#fff;transition:height .2s ease-in;height:650px}.noks-quiz-frame-open{display:block;width:100%}.noks-close-quiz{position:absolute;border-radius:50%;width:30px;height:30px;top:-8px;right:-8px;cursor:pointer;background-color:#d34085}.noks-close-quiz:after{content:'+';display:flex;width:100%;height:100%;color:#fff;font-size:36px;font-weight:400;position:absolute;transform:rotate(45deg);align-items:center;justify-content:center}`;
            let link = document.createElement("style");
            link.innerHTML = css;
            document.head.insertBefore(link, document.head.firstElementChild);
        }

        /**
         * генерируем html iframe для клиента
         */
        static #html(param) {
            let div = document.createElement("div");
            div.setAttribute("class", "noks-hidden-iframe");
            div.setAttribute("data-frame-quiz-id", param.id);
            let html = `
                <div class="noks-quiz-modal">
                    <div class="noks-close-quiz"></div>
                    <iframe class="noks-quiz-frame" src="${param.host}${
                param.action
            }/${
                param.id
            }#${this.#collectMetaData()}" frameborder="0" scrolling="auto" allow="autoplay"></iframe>
                </div>
            `;
            div.innerHTML = html.trim();
            return div;
        }

        /**
         * добавляем iframe в dom у клиента
         */
        static #addIFrame(param) {
            document.body.appendChild(this.#html(param));
        }

        static #getCookie(name) {
            let matches = document.cookie.match(
                new RegExp(
                    "(?:^|; )" +
                        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                        "=([^;]*)"
                )
            );
            return matches ? decodeURIComponent(matches[1]) : null;
        }

        static #decodeJSON(value) {
            try {
                return JSON.parse(value);
            } catch (e) {
                return {};
            }
        }

        static #receptionMessageFromFrame() {
            // прием сообщений из iframe квиза
            window.addEventListener("message", (event) => {
                if (event.origin !== "https://landing-page.su") return;
                try {
                    let data = event.data;
                    data = this.#decodeJSON(data);
                    data.name_sender = data.name_sender ?? "";
                    data.target_id = data.target_id ?? "";
                    if (data.name_sender != "noks_quiz") return;
                    if (yandexMetrikaCounter && data.target_id != "") {
                        ym(yandexMetrikaCounter, "reachGoal", data.target_id);
                    }
                } catch (e) {
                    console.log("quiz | catch", event, e);
                }
            });
        }
    };
}
