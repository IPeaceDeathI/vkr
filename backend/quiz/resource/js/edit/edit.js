import * as ComponentQ2 from './ComponentQ2';
import * as ComponentQ1 from './ComponentQ1';
import {
    Q1StgLongInput,
} from './functions_q1';
import {
    getComponentsByTypeID,
} from './functions';
import * as Component from './Component';
import {
    ENV
} from './Env';
import * as AreaQues from './AreaQues';
import * as QuesSetting from './QuesSetting';
import {
    hiddenQues,
    showSettingQues,
    spoilerQues,
    execAfterRenderByTypeID,
} from './add';
import {
    TypeQuestionEnum
} from './TypeQuestionEnum';
import * as DataAttrEnum from './DataAttrEnum';
import {
    dd
} from './dev_func';

/**
 * Удалить пустышки
 */
export function removeChoice() {
    let ques = AreaQues.getAllQuesMainWrp();
    let id;
    ques.each(function () {
        id = $(this).find(DataAttrEnum.getSelector(DataAttrEnum.QUES_WRP)).attr(DataAttrEnum.getSelector(DataAttrEnum.QUES_TYPE_ID));
        if (id == '') $(this).remove();
    });
}

/**
 * запускаем рендер полученных вопросов из бд
 */
export function execRenderQuesFromDB() {
    for (const [key, ques] of Object.entries(ENV.edit_ques)) {
        renderQuesFromDB(ques);
    }
}

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// NOT IMPORT
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

/**
 * цикл по всем вопросам из бд
 */
function renderQuesFromDB(data_ques_from_db) {
    data_ques_from_db.data_choice.hidden = (data_ques_from_db.data_choice.hidden == '1' ? true : false);
    // получаем пустышку
    let ques_el = AreaQues.getFilledChoiceElement(
        null,
        data_ques_from_db.data_choice.title,
        data_ques_from_db.data_choice.hidden
    );
    // добавляем пустышку в дом
    AreaQues.addChoiceElementToAreaQues(ques_el);
    /**
     * ques_el пустышка пока что без выбранного типа, но уже в доме
     */

    // получаем компоненты вопроса
    let ques_setting = getComponentsByTypeID(data_ques_from_db.id_type);
    if (ques_setting == '') {
        dd('getComponentsByTypeID вернул пустую строку');
        return;
    }

    // прячем настройки
    showSettingQues(ques_el, false);

    // наполняем вопросы
    filledQues(ques_setting.ques, data_ques_from_db.id_type, data_ques_from_db.data_ques);
    // помещаем вопросы в элемент вопроса
    AreaQues.getElementQuesWrp(ques_el).replaceWith(ques_setting.ques);

    // наполняем настройки вопросы
    filledSettingQues(ques_setting.setting, data_ques_from_db.id_type, data_ques_from_db.data_stg, ques_setting.ques);
    // помещаем настройки вопроса в элемент вопроса
    AreaQues.getElementSettingQues(ques_el).replaceWith(ques_setting.setting);


    spoilerQues(ques_el, data_ques_from_db.data_choice.hidden);
    hiddenQues(ques_el, data_ques_from_db.data_choice.hidden);

    execAfterRenderByTypeID(data_ques_from_db.id_type);
}

/**
 * запускаем функции для подставки значения под каждый тип вопроса
 */
function filledSettingQues(setting_el, type_id, data_from_db, ques_el) {
    if (type_id == TypeQuestionEnum.type1) filledQ1SettingQues(setting_el, data_from_db, ques_el);
    else if (type_id == TypeQuestionEnum.type2) filledQ2SettingQues(setting_el, data_from_db, ques_el);
}

/**
 * подставляем значения в настройки
 */
function filledQ1SettingQues(setting_el, data_from_db, ques_el) {
    /**
     * setting_el это компонент, у него нету data-ques-main-wrp
     */
    if (data_from_db.long != undefined) {
        QuesSetting.setValueQ1StgLong(setting_el, JSON.parse(data_from_db.long));
        Q1StgLongInput(ques_el, JSON.parse(data_from_db.long));
    }

    if (data_from_db.many != undefined) {
        QuesSetting.setValueQStgMany(setting_el, JSON.parse(data_from_db.many));
    }

    if (data_from_db.your_answer != undefined) {
        let bool_your_answer = JSON.parse(data_from_db.your_answer);
        QuesSetting.setValueQ1StgYourAnswer(setting_el, bool_your_answer);
        if (data_from_db.your_answer_text != undefined && bool_your_answer) {
            let checkbox = QuesSetting.getElementQ1StgYourAnswer(setting_el);
            let your_answer_el = ComponentQ1.getNewElementYourAnswer(data_from_db.your_answer_text);
            your_answer_el.insertAfter(checkbox.siblings('[for="' + checkbox.attr('id') + '"]'));
        }
    }

    if (data_from_db.not_necessary != undefined) {
        QuesSetting.setValueStgNotNecessary(setting_el, JSON.parse(data_from_db.not_necessary));
    }

    if (data_from_db.internal_name != undefined) {
        let bool_internal_name = JSON.parse(data_from_db.internal_name);
        QuesSetting.setValueStgInternalName(setting_el, bool_internal_name);
        if (data_from_db.internal_name_text != undefined && bool_internal_name) {
            let checkbox = QuesSetting.getElementStgInternalName(setting_el);
            let internal_name_el = Component.getNewElementInputInternalName(data_from_db.internal_name_text);
            internal_name_el.insertAfter(checkbox.siblings('[for="' + checkbox.attr('id') + '"]'));
        }
    }

    // цели
    if (data_from_db.ques_id_target != undefined) {
        QuesSetting.setValueQStgInputMetricTarget(setting_el, data_from_db.ques_id_target);
    }
}

/**
 * подставляем значения в настройки
 */
function filledQ2SettingQues(setting_el, data_from_db, ques_el) {
    /**
     * setting_el это компонент, у него нету data-ques-main-wrp
     */
    if (data_from_db.many != undefined) {
        QuesSetting.setValueQStgMany(setting_el, JSON.parse(data_from_db.many));
    }

    // свой ответ
    if (data_from_db.your_answer != undefined) {
        let bool_your_answer = JSON.parse(data_from_db.your_answer);
        QuesSetting.setValueQ2StgYourAnswer(setting_el, bool_your_answer);
        if (data_from_db.your_answer_text != undefined && bool_your_answer) {
            let checkbox = QuesSetting.getElementQ2StgYourAnswer(setting_el);
            let your_answer_el = ComponentQ2.getNewElementYourAnswer(data_from_db.your_answer_text);
            your_answer_el.insertAfter(checkbox.siblings('[for="' + checkbox.attr('id') + '"]'));
        }
    }

    if (data_from_db.not_necessary != undefined) {
        QuesSetting.setValueStgNotNecessary(setting_el, JSON.parse(data_from_db.not_necessary));
    }

    // Внутреннее название вопроса
    if (data_from_db.internal_name != undefined) {
        let bool_internal_name = JSON.parse(data_from_db.internal_name);
        QuesSetting.setValueStgInternalName(setting_el, bool_internal_name);
        if (data_from_db.internal_name_text != undefined && bool_internal_name) {
            let checkbox = QuesSetting.getElementStgInternalName(setting_el);
            let internal_name_el = Component.getNewElementInputInternalName(data_from_db.internal_name_text);
            internal_name_el.insertAfter(checkbox.siblings('[for="' + checkbox.attr('id') + '"]'));
        }
    }

    // цели
    if (data_from_db.ques_id_target != undefined) {
        QuesSetting.setValueQStgInputMetricTarget(setting_el, data_from_db.ques_id_target);
    }
}

/**
 * подставляем значения в вопрос
 */
function filledQues(ques_el, type_id, data_from_db) {
    if (type_id == TypeQuestionEnum.type1) filledQ1Ques(ques_el, data_from_db);
    else if (type_id == TypeQuestionEnum.type2) filledQ2Ques(ques_el, data_from_db);
}

function filledQ1Ques(ques_el, data_from_db) {
    /**
     * ques_el это компонент, у него нету data-ques-main-wrp
     */
    let item = ques_el.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_ITEM));
    let cloneItem = item.clone();
    data_from_db = data_from_db.reverse();

    for (const [key, values] of Object.entries(data_from_db)) {
        cloneItem.find(DataAttrEnum.getSelector(DataAttrEnum.Q1_INPUT_ANSWER)).val(values.answer);
        cloneItem.find(DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_INPUT_LONG)).val(values.other_text);
        cloneItem.insertAfter(item);
        cloneItem = item.clone();
    }

    item.remove();
}

function filledQ2Ques(ques_el, data_from_db) {
    /**
     * ques_el это компонент, у него нету data-ques-main-wrp
     */
    let item = ques_el.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_ITEM));
    let cloneItem = item.clone();
    data_from_db = data_from_db.reverse();

    for (const [key, values] of Object.entries(data_from_db)) {
        cloneItem.find(DataAttrEnum.getSelector(DataAttrEnum.Q2_INPUT_ANSWER)).val(values.answer);

        if ((values.url ?? '') != '') {
            let preview = cloneItem.find(DataAttrEnum.getSelector(DataAttrEnum.Q2_IMG_PREVIEW));
            preview.find('svg').remove();
            preview.find(DataAttrEnum.getSelector(DataAttrEnum.Q2_IMG)).remove();
            preview.append(ComponentQ2.getNewElementPreviewImage(values.url));
        }

        cloneItem.insertAfter(item);
        cloneItem = item.clone();
    }

    item.remove();
}