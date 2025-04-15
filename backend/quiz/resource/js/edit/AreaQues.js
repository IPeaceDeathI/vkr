import {
    ENV,
} from './Env';
import * as DataAttrEnum from './DataAttrEnum';
import {
    findElement
} from './functions';

/**
* Иерархия
*   [data-anchor="#ques"] <-- это area ques
*       ...[data-ques-main-wrp]
*             [data-pos-num]
*             [data-title-ques]
*             [data-ques-wrp]+[data-ques-type-id]
*                 [data-ques-list-item]
*                     ...[data-ques-item]
*             [data-setting-ques]
*                 [data-q1-stg-long]
*                 [data-q1-stg-your-answer]
*                 [data-q1-stg-input-your-answer]
*                 [data-q2-stg-your-answer]
*                 [data-q2-stg-input-your-answer]
*                 [data-stg-many]
*                 [data-stg-not-necessary]
*                 [data-stg-internal-name]
*                 [data-stg-input-internal-name]
*                 [data-stg-input-metric-target]
*             [data-ques-hide]
*/

const END_SELECTOR = DataAttrEnum.getSelector(DataAttrEnum.QUES_MAIN_WRP);
const END_SELECTOR_ITEM = DataAttrEnum.getSelector(DataAttrEnum.QUES_ITEM);

/**
 * [data-anchor="#ques"]
 */
export function getAreaQues() {
    return $('[data-anchor="#ques"]');
}

/**
 * получить все элементы вопросов [data-ques-main-wrp]
 */
export function getAllQuesMainWrp() {
    return getAreaQues().find(END_SELECTOR);
}

export function getNewChoiceElement() {
    return ENV.choice_clone.clone();
}

/**
 * добавить пустышку в конец рабочей области "area"
 */
export function addChoiceElementToAreaQues(choice) {
    getAreaQues().append(choice);
}

/**
 * [data-ques-main-wrp] > [data-setting-ques]
 */
export function getElementSettingQues(any_el) {
    return getElementQuesMainWrp(any_el).find(
        DataAttrEnum.getSelector(DataAttrEnum.SETTING_QUES)
    );
}

/**
 * добавляет пустышку сверху от указанного вопроса 
 */
export function addChoiceElementTopCurrentQues(ques) {
    let choice_el = getNewChoiceElement();
    choice_el.insertBefore(ques);
    refreshPositionAllQues();
}

/**
 * обновить нумерацию позиций всех вопросов
 */
export function refreshPositionAllQues() {
    let pos_num = 1;
    let all_ques = getAllQuesMainWrp();
    all_ques.each(function () {
        $(this).find(
            DataAttrEnum.getSelector(DataAttrEnum.POS_NUM)
        ).text(pos_num);
        pos_num++;
    });
}

/**
 * @returns {bool}
 */
export function isChoiceElement(any_el) {
    any_el = getElementQuesMainWrp(any_el);
    any_el = any_el.find(
        DataAttrEnum.getSelector(DataAttrEnum.TYPE)
    ).length;
    return any_el > 0;
}
/**
 * @returns {bool}
 */
export function isDOMElement(any_el) {
    return any_el.closest('body').length > 0;
}

/**
 * вернуть наполненную пустышку
 */
export function getFilledChoiceElement(pos_num = null, title = '', hide = false) {
    if (pos_num == null) {
        pos_num = getEndPosNumQues();
        pos_num++;
    }
    let choice_new = getNewChoiceElement();
    setInfoQues(choice_new, pos_num, title, hide);
    return choice_new;
}

export function addFilledChoiceElement(pos_num = null, title = '', hide = false) {
    let ques = getFilledChoiceElement(pos_num, title, hide);
    addChoiceElementToAreaQues(ques);
}

/**
 * получить номер позиции последнего вопроса
 * @returns {int}
 */
export function getEndPosNumQues() {
    let pos = getAllQuesMainWrp();
    if (pos.length == 0) return 0;
    pos = pos.last();
    pos = pos.find(
        DataAttrEnum.getSelector(DataAttrEnum.POS_NUM)
    ).text();
    return pos;
}

/**
 * получить элемент вопроса [data-ques-main-wrp]
 */
export function getElementQuesMainWrp(any_el) {
    if (any_el.is(END_SELECTOR)) return any_el;
    return any_el.closest(END_SELECTOR);
}

/**
 * получить рабочую область вопроса [data-ques-main-wrp] > [data-ques-wrp]
 */
export function getElementQuesWrp(any_el) {
    let wrp = getElementQuesMainWrp(any_el);
    return wrp.find(
        DataAttrEnum.getSelector(DataAttrEnum.QUES_WRP)
    );
}

/**
 * взять данные вопроса position,title,hidden
 * @returns {{position:string|int;title:string;hidden:string|int;}}
 */
export function getInfoQues(any_el) {
    any_el = getElementQuesMainWrp(any_el);

    let position, hidden;
    hidden = any_el.find(
        DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE)
    ).attr(DataAttrEnum.QUES_HIDE);
    hidden = parseInt(hidden);
    hidden = hidden == 1 ? true : false;
    position = any_el.find(
        DataAttrEnum.getSelector(DataAttrEnum.POS_NUM)
    ).text();
    position = parseInt(position);

    return {
        position: position,
        title: any_el.find(
            DataAttrEnum.getSelector(DataAttrEnum.TITLE_QUES)
        ).val() ?? '',
        hidden: hidden,
    };
}

/**
 * установить данные в вопрос position,title,hidden
 */
export function setInfoQues(any_el, pos_num, title, hide) {
    any_el = getElementQuesMainWrp(any_el);
    any_el.find(
        DataAttrEnum.getSelector(DataAttrEnum.POS_NUM)
    ).text(pos_num);// номер позиции "ques_position"
    any_el.find(
        DataAttrEnum.getSelector(DataAttrEnum.TITLE_QUES)
    ).val(title);// заголовок вопроса "ques_title"
    any_el.find(
        DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE)
    ).attr(DataAttrEnum.QUES_HIDE, (hide ? '1' : '0'));// статус скрыта "ques_hidden"
}

/**
 * value attr [data-ques-type-id="[0-9]"]
 * @returns {null|int}
 */
export function getTypeID(any_el) {
    any_el = getElementQuesWrp(any_el);
    let type_id = any_el.attr(DataAttrEnum.QUES_TYPE_ID) ?? null;
    if (type_id == null) return null;
    if (type_id == undefined) return null;
    if (type_id == '') return null;
    if (type_id == false) return null;
    type_id = parseInt(type_id);
    return type_id;
}

/**
 * [data-ques-wrp] > [data-ques-list-item] > [data-ques-item]
 */
export function getElementQuesItems(any_el) {
    any_el = getElementQuesWrp(any_el);
    return any_el.find(
        DataAttrEnum.getSelector(DataAttrEnum.QUES_ITEM)
    );
}
/**
 * [data-ques-wrp] > [data-ques-list-item]
 * элемент в котором содержится items answer
 */
export function getElementQuesListItem(any_el) {
    any_el = getElementQuesWrp(any_el);
    return any_el.find(
        DataAttrEnum.getSelector(DataAttrEnum.QUES_LIST_ITEM)
    );
}

/**
 * Настройка: "превьюха с картинкой" div
 */
export function getElementQ2Img(item_answer) {
    return item_answer.find(
        DataAttrEnum.getSelector(DataAttrEnum.Q2_IMG)
    );
}
/**
 * Настройка: "превьюха с картинкой" div
 * @returns {string}
 */
export function getValueQ2Img(item_answer) {
    return getElementQ2Img(item_answer).attr(DataAttrEnum.Q2_IMG);
}