export default class QuesType1 {
    #answers;
    #title;
    #setting;
    #position;
    #area;

    constructor(ques, area) {
        this.#answers = ques.data_ques;
        this.#title = ques.data_choice.title;
        this.#position = ques.data_choice.position;
        this.#setting = ques.data_stg;
        this.#area = area;

        // преобразуем булевы значения
        this.#setting.internal_name = JSON.parse(this.#setting.internal_name);
        this.#setting.many = JSON.parse(this.#setting.many);
        this.#setting.not_necessary = JSON.parse(this.#setting.not_necessary);
        this.#setting.your_answer = JSON.parse(this.#setting.your_answer);
        this.#setting.long = JSON.parse(this.#setting.long);
    }

    renderQues() {
        this.#setTitle();
        let item_area = this.#area.find('.ques-list-answer');
        window.ViewQuiz.statusBtnNext(this.#setting.not_necessary);

        item_area.append($(`<div class="q1-wrp-items"></div>`));
        item_area = item_area.find('.q1-wrp-items');

        for (const [key, item] of Object.entries(this.#answers)) {
            if (item.answer == '' && item.other_text == '') continue;
            item_area.append(
                this.#renderItem(item.answer, item.other_text)
            );
        }
        // свой ответ
        if (this.#setting.your_answer) {
            item_area.append(
                this.#renderItemInputText()
            );
        }

        // проверка на количество ответов, их может не быть
        if (item_area.find('.q1-wrp-item').length === 0) {
            window.ViewQuiz.nextQues();
            return;
        }
        this.#eventSelectItem();
    }

    getData() {
        let selectAnswerEl = this.#area.find('.q1-check-on');
        let answers = [];
        let title = this.#area.find('.ques-title-ques').text();
        let temp;
        selectAnswerEl.each(function () {
            let wrp = $(this).closest('.q1-wrp-item');
            temp = wrp.find('input[type="text"]').val();
            if (temp == undefined) temp = wrp.find('input[type="checkbox"]').val();
            answers.push(temp);
        });

        return {
            quiz_question: title,
            quiz_answer: answers,
            target: (this.#setting.ques_id_target ?? ''),
        };
    }

    /**
     * навешиваем событие на ответы на вопросы
     */
    #eventSelectItem() {
        let items = $('.q1-wrp-item');
        let many = this.#setting.many;
        let not_necessary = this.#setting.not_necessary;
        let area = this.#area;
        $(document).off('change focus', '.q1-wrp-item');
        $(document).on('change focus', '.q1-wrp-item', function () {
            let check = $(this).find('.q1-check');
            if (!many)// false выбрать только один, true несколько
            {
                items.each(function () {
                    $(this).find('.q1-check').removeClass('q1-check-on');
                });
            }
            check.toggleClass('q1-check-on');
            let activeItem = area.find('.q1-check-on').length > 0 ? true : false;
            // если был выбран ответ тогда активируем кнопку "Далее"
            if (!not_necessary) {
                if (activeItem) window.ViewQuiz.statusBtnNext(true);
                else window.ViewQuiz.statusBtnNext(false);
            }
            else {
                window.ViewQuiz.statusBtnNext(true);
            }
        });
    }

    #renderItem(answer, other_text) {
        let html = `
        <div class="q1-wrp-item">
            <label class="q1-label">
                <input type="checkbox" value="${answer}">
                <div class="q1-check"></div>
                <div>
                    <div class="q1-control-label">
                        <div class="q1-control-label-text" title="${window.ViewQuiz.escapeHtml(answer)}">${answer}</div>
                    </div>
                    ${(this.#setting.long && other_text != '' ? `<span class="q1-other-text">${other_text}</span>` : '')}
                </div>
                </label>
        </div>
        `;
        return $(html);
    }

    #renderItemInputText() {
        if (this.#setting.your_answer_text == '') this.#setting.your_answer_text = 'Другое...';
        let html = `
            <div class="q1-wrp-item q1-mine-answer">
                <label class="q1-label">
                    <input type="checkbox" value="Свой ответ">
                    <div class="q1-check"></div>
                    <input class="q1-mine-answer" type="text" maxlength="80" placeholder="${this.#setting.your_answer_text}">
                </label>
            </div>
        `;
        return $(html);
    }

    /**
     * ставим заголовок вопроса
     */
    #setTitle() {
        this.#area.find('.ques-title-ques').text(this.#title);
    }
}