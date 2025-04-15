export default class QuesType2
{
    #answers;
    #title;
    #setting;
    #position;
    #area;

    constructor(ques, area)
    {
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
    }

    #renderItem (answer, img)
    {
        if(img == '')
        {
            // заглушка
            img = window.ViewQuiz.urlStorage() + '/resource/img/quiz/default.jpg';
        }
        let html = `
            <div class="q2-wrp-item">
                <label class="q2-label">
                    <input type="checkbox" value="${answer}">
                    <div class="q2-check" style="display: none;"></div>
                    <div class="q2-img" style="background-image: url(${img})"></div>
                    ${(answer == '' ? '' : `<div class="q2-answer"><div class="q2-answer-text" title="${window.ViewQuiz.escapeHtml(answer)}">${answer}</div></div>`)}
                </label>
            </div>
        `;
        return $(html);
    }

    /**
     * your_answer = true
     */
    #renderItemInputText ()
    {
        if(this.#setting.your_answer_text == '') this.#setting.your_answer_text = 'Свой вариант';
        let img = window.ViewQuiz.urlStorage() + '/resource/img/quiz/default.jpg';// сюда заглушка картинка
        let html = `
            <div class="q2-wrp-item">
                <label class="q2-label">
                    <input type="checkbox" value="Свой ответ">
                    <div class="q2-check" style="display: none;"></div>
                    <div class="q2-img" style="background-image: url(${img})"></div>
                    <input type="text" maxlength="80" placeholder="${this.#setting.your_answer_text}">
                </label>
            </div>
        `;
        return $(html);
    }

    #checkImgError ()
    {
        const instance = this;
        $('div.q2-img').each(function ()
        {
            instance.#checkImgSrc( $(this) );
        });
    }

    #getSrcFromStyleUrl (css)
    {
        css = css.replace(/^url/, '');
        css = css.replace(/^\(\"?/, '');
        return css.replace(/\"?\)$/, '');
    }

    #checkImgSrc (el)
    {
        let url = window.ViewQuiz.urlStorage() + '/resource/img/quiz/default.jpg';
        let src = el.css('background-image');
        src = this.#getSrcFromStyleUrl(src);

        const img = new Image();
        /* img.onload = function ()
        {

        }; */
        img.onerror = function ()
        {
            el.attr('style', `background-image: url(${url})`);
        };
        img.src = src;
    }

    /**
     * рендер вопрос
     */
    renderQues ()
    {
        this.#setTitle();
        let item_area = this.#area.find('.ques-list-answer');
        window.ViewQuiz.statusBtnNext(this.#setting.not_necessary);
        
        for (const [key, item] of Object.entries(this.#answers))
        {
            item.url = item.url ?? '';
            // пропускаем ответы у которых нету текста и нету картинки
            if(item.url == '' && item.answer == '') continue;

            item_area.append(
                this.#renderItem(item.answer, item.url)
            );
        }
        // свой ответ
        if(this.#setting.your_answer)
        {
            item_area.append(
                this.#renderItemInputText()
            );
        }

        // проверка на количество ответов, их может не быть
        if(item_area.find('.q2-wrp-item').length === 0)
        {
            window.ViewQuiz.nextQues();
            return;
        }
        this.#checkImgError();
        this.#eventSelectItem();
    }
        
    /**
     * ставим заголовок вопроса
     */
    #setTitle ()
    {
        this.#area.find('.ques-title-ques').text(this.#title);
    }

    /**
     * навешиваем событие на ответы на вопросы
     */
    #eventSelectItem ()
    {
        let items = $('.q2-wrp-item');
        let many = this.#setting.many;
        let not_necessary = this.#setting.not_necessary;
        let area = this.#area;
        $(document).off('change focus', '.q2-wrp-item');
        $(document).on('change focus', '.q2-wrp-item', function()
        {
            if(!many)// false выбрать только один, true несколько
            {
                items.each(function()
                {
                    $(this).removeClass('q2-checked');
                    $(this).find('.q2-check').hide();
                });
            }
            $(this).toggleClass('q2-checked');
            $(this).find('.q2-check').toggle();

            let activeItem = area.find('.q2-checked').length > 0 ? true : false;
            // если был выбран ответ тогда активируем кнопку "Далее"
            if(!not_necessary)
            {
                if(activeItem) window.ViewQuiz.statusBtnNext(true);
                else window.ViewQuiz.statusBtnNext(false);
            }
            else
            {
                window.ViewQuiz.statusBtnNext(true);
            }
        });
    }

    /**
     * собрать данные об ответах на вопрос
     */
    getData ()
    {
        const instance = this;
        let selectAnswerEl = this.#area.find('.q2-wrp-item.q2-checked');
        let answers = [];
        let title = this.#area.find('.ques-title-ques').text();
        let temp;
        selectAnswerEl.each(function()
        {
            temp = $(this).find('input[type="text"]').val();
            if(temp == undefined) temp = $(this).find('input[type="checkbox"]').val();
            // если нету текста ответа, берем картинку
            if(temp == '')
            {
                temp =  $(this).find('.q2-img').css('background-image');
                temp = instance.#getSrcFromStyleUrl(temp);
            }
            answers.push(temp);
        });
        return {
            quiz_question: title,
            quiz_answer: answers,
            target: (this.#setting.ques_id_target ?? ''),
        };
    }
}