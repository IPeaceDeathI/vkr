import {
    ENV,
} from './Env';
import {
    genRndStr,
} from './functions';
import {
    TypeQuestionEnum,
} from './TypeQuestionEnum';
import {
    eventsQ2,
} from './q2';
import {
    eventsQ1,
} from './q1';
import * as AreaQues from './AreaQues';
import * as DataAttrEnum from './DataAttrEnum';
import {
    execSortableQ1,
    execSortableQ2,
} from './sortable';

/**
 * Активировать спойлер. true спрятать false показать. по умолчанию toggle
 */
export function spoilerQues(ques, active = null) {
    let class_bg = 'bg-[rgba(209,57,128,0.1)]';
    if (active == null) {
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_WRP)).toggle();
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_SPOILER)).toggleClass(class_bg);
    }
    else if (active == true) {
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_WRP)).hide();
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_SPOILER)).addClass(class_bg);
    }
    else if (active == false) {
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_WRP)).show();
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_SPOILER)).removeClass(class_bg);
    }
}

/**
 * Показать/скрыть настройки. true показать false спрятать. по умолчанию toggle
 */
export function showSettingQues(ques, active = null) {
    let class_bg = 'bg-[rgba(209,57,128,0.1)]';
    if (active == null) {
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.SETTING_QUES)).toggle();
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_ACTION_SETTING)).toggleClass(class_bg);
    }
    else if (active == true) {
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.SETTING_QUES)).show();
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_ACTION_SETTING)).addClass(class_bg);
    }
    else if (active == false) {
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.SETTING_QUES)).hide();
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_ACTION_SETTING)).removeClass(class_bg);
    }
}

/**
 * Активировать hidden. true выделить false убрать выделение. по умолчанию toggle
 */
export function hiddenQues(ques, active) {
    let class_bg = 'bg-[rgba(209,57,128,0.1)]';
    if (active) {
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE)).addClass(class_bg);
        // CSS
        ques.attr('style', 'background-color: #d9d9d9;');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.TITLE_QUES)).attr('style', 'background-color: #d9d9d9; pointer-events: none; opacity: 0.2;');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_FOOTER)).attr('style', 'background-color: #d9d9d9;');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_ACTION_SETTING)).attr('style', 'pointer-events: none;');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_SPOILER)).attr('style', 'pointer-events: none;');
    }
    else {
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE)).removeClass(class_bg);
        // CSS
        ques.removeAttr('style');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.TITLE_QUES)).removeAttr('style');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.TITLE_QUES)).removeAttr('disabled');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_FOOTER)).removeAttr('style');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_ACTION_SETTING)).removeAttr('style');
        ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_SPOILER)).removeAttr('style');
    }
}

/**
 * поместить вопрос в переменную trash вернет trash_id
 */
export function addTrashQues(ques) {
    let trash_id = genRndStr();
    ENV.trash[trash_id] = ques.clone();
    return trash_id;
}

/**
 * задаем время существование элемента restore
 */
export function setTimeRestore(restore_el, trash_id) {
    restore_el.delay(3000).show(function () {
        restore_el.remove();
        delete ENV.trash[trash_id];
    });
}

/**
 * выполнить что-то после рендера указанного вопроса
 */
export function execAfterRenderByTypeID(type_id) {
    let types = [];
    types[TypeQuestionEnum.type1] = () => {
        eventsQ1();
        execSortableQ1();
        regenerateIdInputs();
    };
    types[TypeQuestionEnum.type2] = () => {
        eventsQ2();
        execSortableQ2();
        regenerateIdInputs();
    };

    if (types[type_id] == undefined) {
        dd('execAfterRenderByTypeID type_id not found');
        return;
    }

    types[type_id]();
}





/**
 * перегенерируем идентификаторы label и input для всех настроек
 */
function regenerateIdInputs() {
    let all_ques = AreaQues.getAllQuesMainWrp();
    let area_stg;
    let attr;
    let input;
    let id;

    all_ques.each(function () {
        area_stg = $(this).find(DataAttrEnum.getSelector(DataAttrEnum.SETTING_QUES));
        area_stg.find('label').each(function () {
            attr = $(this).attr('for');
            input = $(this).siblings('[id="' + attr + '"]');

            id = 'q_stg_' + genRndStr();

            input.attr('id', id);
            $(this).attr('for', id);
        });
    });
}
