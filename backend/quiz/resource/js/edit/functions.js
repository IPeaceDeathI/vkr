import {
    ENV
} from './Env';
import {
    dd
} from './dev_func';
import {
    TypeQuestionEnum
} from './TypeQuestionEnum';
import * as ComponentQ1 from './ComponentQ1';
import * as ComponentQ2 from './ComponentQ2';
import * as QuesSetting from './QuesSetting';
import * as AreaQues from './AreaQues';
import * as DataAttrEnum from './DataAttrEnum';

// ------------------------------------------------------------------
// blabla
// ------------------------------------------------------------------

/**
 * парсим данные из бд
 */
export function parseJSONFromDB() {
    ENV.edit_ques = $('script#ques').text().trim();
    if (ENV.edit_ques != '') {
        ENV.edit_ques = JSON.parse(ENV.edit_ques);
    }

    ENV.edit_setting = $('script#setting').text().trim();
    if (ENV.edit_setting != '') {
        ENV.edit_setting = JSON.parse(ENV.edit_setting);
    }

    ENV.types = $('script#types').text().trim();
    ENV.types = JSON.parse(ENV.types);

    dd('ENV.types', ENV.types);
    dd('ENV.edit_ques', ENV.edit_ques);
    dd('ENV.edit_setting', ENV.edit_setting);
}

export function isEditPage() {
    let pathname = getLocationObject().pathname;
    return pathname.includes('/edit/');
}

export function getLocationObject() {
    return (new URL(document.location));
}

export function genRndStr() {
    return Date.now() + Math.random().toString(36).substring(2);
}

export function getDataFromQuesByTypeID(ques, type_id) {
    if (type_id == TypeQuestionEnum.type1) return getDataQ1(ques);
    else if (type_id == TypeQuestionEnum.type2) return getDataQ2(ques);
    else dd('getDataFromQuesByTypeID не определил тип вопроса', type_id, ques);
}

export function hashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

/**
 * получить текущий анкор
 */
export function getCurrentAnchor() {
    return getLocationObject().hash;
}

/**
 * возвращаем компоненты вопроса по типу вопроса (ques, setting)
 */
// export function renderType(type_id) {
export function getComponentsByTypeID(type_id) {
    if (TypeQuestionEnum.type1 == type_id) {
        return {
            ques: ComponentQ1.getNewElementQues(),
            setting: ComponentQ1.getNewElementSettingQues(),
        };
    } else if (TypeQuestionEnum.type2 == type_id) {
        return {
            ques: ComponentQ2.getNewElementQues(),
            setting: ComponentQ2.getNewElementSettingQues(),
        };
    } else return '';
}

export function redirect(url) {
    // window.location.replace не использовать, потому что к предыдущей ссылке не вернутся
    window.location.href = url;
}

/**
 * получить quiz_id из гет параметра или глобальной переменной
 */
export function getQuizID() {
    let param = getLocationObject().pathname.match(/^\/quiz\/edit\/(\d+)/);
    console.log('getQuizID: param', param);
    return param ? parseInt(param[1]) ?? ENV.quiz_id : ENV.quiz_id;
}

export function tempDisabledElem($el, status) {
    if (!$el) return;
    let style = {
        css: null,
        className: "temp-disabled-elem",
        el: null,
        keyframe: null,
    };
    if ($("style[data-temp-disabled-elem-css]").length == 0) {
        let i = "!important";
        style.el = $("<style data-temp-disabled-elem-css></style>");
        style.keyframe = `
         0% {background-color: #2f2f3880;}
         25% {background-color: #8d8d8d80;}
         50% {background-color: #2f2f3880;}
         75% {background-color: #8d8d8d80;}
         100% {background-color: #2f2f3880;}
      `;
        style.css = `
         .${style.className}{
               position:relative${i};
               pointer-events: none${i};
               cursor: not-allowed${i};
               overflow: hidden${i};
         }
         .${style.className}:before{
               content: ""${i};
               z-index:2147483647${i};
               pointer-events: none${i};
               cursor: not-allowed${i};
               position:absolute${i};
               top:-1px${i};
               bottom:-1px${i};
               right:-1px${i};
               left:-1px${i};
               -webkit-animation: ${style.className} 3s infinite${i};
               -moz-animation: ${style.className} 3s infinite${i};
               -o-animation: ${style.className} 3s infinite${i};
               animation: ${style.className} 3s infinite${i};
         }
         @-webkit-keyframes ${style.className} {${style.keyframe}}
         @-moz-keyframes ${style.className} {${style.keyframe}}
         @-o-keyframes ${style.className} {${style.keyframe}}
         @keyframes ${style.className} {${style.keyframe}}
      `;
        style.el.text(style.css);
        $("head").append(style.el);
    }

    if (status) {
        $el.attr("disabled", "disabled");
        $el.addClass(style.className);
    } else {
        $el.removeAttr("disabled");
        $el.removeClass(style.className);
    }
}

/**
 * редирект из add на edit
 */
export function redirectActionEdit(quiz_id) {
    if (getLocationObject().pathname.includes('/add')) {
        let go_to = document.location.origin + '/quiz/edit/' + quiz_id + getCurrentAnchor();
        redirect(go_to);
    }
}

export function findElement(any_el, selector, end_selector) {
    let res, parent;
    res = any_el.find(selector);
    if (res.length) return res;

    while (true) {
        parent = any_el.parent();
        res = parent.find(selector);
        if (res.length) return res;
        if (parent.length === 0 || parent.is(end_selector)) {
            dd('не найден селектор: ', selector, any_el);
            return any_el;
        }
    }
}

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// NOT EXPORT
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

/**
 * получить данные по Q1
 */
function getDataQ1(ques) {
    let data_ques = [];

    // получить вопросы.
    AreaQues.getElementQuesItems(ques).each(function () {
        data_ques.push({
            answer: $(this).find(
                DataAttrEnum.getSelector(DataAttrEnum.Q1_INPUT_ANSWER)
            ).val(),// ответ
            other_text: QuesSetting.getValueQ1StgInputLong($(this))// дополнительный текст
        });
    });

    // получить настройки
    let data_stg = {
        not_necessary: QuesSetting.getValueStgNotNecessary(ques),//Необязательный вопрос
        internal_name: QuesSetting.getValueStgInternalName(ques),//Внутреннее название вопроса
        internal_name_text: QuesSetting.getValueStgInputInternalName(ques),//поле Внутреннее название вопроса
        many: QuesSetting.getValueQStgMany(ques),//Можно несколько
        long: QuesSetting.getValueQ1StgLong(ques),//дополнительный текст
        your_answer: QuesSetting.getValueQ1StgYourAnswer(ques),//Вариант "свой ответ"
        your_answer_text: QuesSetting.getValueQ1StgInputYourAnswer(ques),//поле "свой ответ"
        ques_id_target: QuesSetting.getValueQStgInputMetricTarget(ques),//поле "цель"
    };

    return {
        id_type: AreaQues.getTypeID(ques),
        data_ques: data_ques,
        data_stg: data_stg,
        // получить данные по пустышке
        data_choice: AreaQues.getInfoQues(ques)
    };
}

/**
 * получить данные по Q2
 */
function getDataQ2(ques) {
    let data_ques = [];

    // получить вопросы.
    AreaQues.getElementQuesItems(ques).each(function () {
        data_ques.push({
            answer: $(this).find(
                DataAttrEnum.getSelector(DataAttrEnum.Q2_INPUT_ANSWER)
            ).val(),// ответ
            url: AreaQues.getValueQ2Img($(this)),// url
        });
    });

    // получить настройки
    let data_stg = {
        not_necessary: QuesSetting.getValueStgNotNecessary(ques),//Необязательный вопрос
        internal_name: QuesSetting.getValueStgInternalName(ques),//Внутреннее название вопроса
        internal_name_text: QuesSetting.getValueStgInputInternalName(ques),//поле Внутреннее название вопроса
        many: QuesSetting.getValueQStgMany(ques),//Можно несколько
        your_answer: QuesSetting.getValueQ2StgYourAnswer(ques),//Вариант "свой ответ"
        your_answer_text: QuesSetting.getValueQ2InputYourAnswer(ques),//поле "свой ответ"
        ques_id_target: QuesSetting.getValueQStgInputMetricTarget(ques),//поле "цель"
    };

    return {
        id_type: AreaQues.getTypeID(ques),
        data_ques: data_ques,
        data_stg: data_stg,
        // получить данные по пустышке
        data_choice: AreaQues.getInfoQues(ques)
    };
}