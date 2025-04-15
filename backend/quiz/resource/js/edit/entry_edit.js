import * as Menu from "./Menu";
import * as AreaSetting from "./AreaSetting";
import * as QuesSetting from "./QuesSetting";
import * as DataAttrEnum from "./DataAttrEnum";
import * as AreaEnum from "./AreaEnum";
import {
    showSettingQues,
    execAfterRenderByTypeID,
    addTrashQues,
    setTimeRestore,
    spoilerQues,
    hiddenQues,
} from "./add";
import { execRenderQuesFromDB, removeChoice } from "./edit";
import {
    getComponentsByTypeID,
    isEditPage,
    getCurrentAnchor,
    parseJSONFromDB,
} from "./functions";
import * as Component from "./Component";
import { ENV } from "./Env";
import * as AreaQues from "./AreaQues";
import { sendCascadData, ajaxDeleteQuiz } from "./API";
import { dd } from "./dev_func";
import { checkDelete } from "./confirm";
import { _ } from "./_";
import { execSortableQues } from "./sortable";

parseJSONFromDB();

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// component replace hole js
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

$("[data-hole-component-add-list-type]").replaceWith(
    Component.getElListType(ENV.types)
);
$("[data-hole-component-ques-action-setting]").replaceWith(
    Component.getElementQuesActionSetting()
);
$("[data-hole-component-ques-hide]").replaceWith(
    Component.getElementQuesHide()
);
$("[data-hole-component-ques-copy]").replaceWith(
    Component.getElementQuesCopy()
);
$("[data-hole-component-ques-remove]").replaceWith(
    Component.getElementQuesRemove()
);
$("[data-hole-component-add-ques-choice-between]").replaceWith(
    Component.getElementAddQuesChoiceBetween()
);
$("[data-hole-component-add-ques-end]").replaceWith(
    Component.getElementAddQuesEnd()
);

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// add js
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.ADD_QUES_END));
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.ADD_QUES_END),
    function () {
        AreaQues.addFilledChoiceElement();
    }
);

// выбрать тип вопроса
$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.TYPE));
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.TYPE),
    function () {
        let ques = AreaQues.getElementQuesMainWrp($(this));
        let type_id = $(this).attr(DataAttrEnum.TYPE);
        let html_for_area = getComponentsByTypeID(type_id);
        if (html_for_area == "") {
            dd("функции для рендера type:" + type_id + " не найдены");
            return;
        }
        showSettingQues(ques, false);
        AreaQues.getElementQuesWrp(ques).replaceWith(html_for_area.ques);
        AreaQues.getElementSettingQues(ques).replaceWith(html_for_area.setting);
        execAfterRenderByTypeID(type_id);
    }
);

$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.QUES_REMOVE));
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUES_REMOVE),
    function () {
        let ques = AreaQues.getElementQuesMainWrp($(this));
        // --------------------------------
        // Помещаем вопрос в trash, после выдаем шанс на восстановление
        showSettingQues(ques, false);
        let trash_id = addTrashQues(ques);
        let restore_el = Component.getRestoreElement(trash_id);
        ques.replaceWith(restore_el);
        setTimeRestore(restore_el, trash_id);
        // --------------------------------
        ques.remove();
        AreaQues.refreshPositionAllQues();
    }
);

$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE));
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE),
    function () {
        let ques = AreaQues.getElementQuesMainWrp($(this));
        let hide_num = ques
            .find(DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE))
            .attr(DataAttrEnum.QUES_HIDE);
        if (hide_num == "0") {
            // скрыть
            ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE)).attr(
                DataAttrEnum.QUES_HIDE,
                "1"
            );
            showSettingQues(ques, false);
            spoilerQues(ques, true);
            hiddenQues(ques, true);
        } else {
            // показать
            ques.find(DataAttrEnum.getSelector(DataAttrEnum.QUES_HIDE)).attr(
                DataAttrEnum.QUES_HIDE,
                "0"
            );
            spoilerQues(ques, false);
            hiddenQues(ques, false);
        }
    }
);

/**
 * восстановить вопрос
 */
$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.QUES_RESTORE));
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUES_RESTORE),
    function () {
        let restore = $(this).parent();
        let id_trash = restore.attr(DataAttrEnum.ID_TRASH);
        if (ENV.trash[id_trash] == undefined) {
            restore.remove();
            dd(id_trash + " вопрос не найден в trash");
            return;
        }
        let id_type = AreaQues.getTypeID(ENV.trash[id_trash]);
        restore.replaceWith(ENV.trash[id_trash]);
        delete ENV.trash[id_trash];
        AreaQues.refreshPositionAllQues();
        if (id_type != null) {
            execAfterRenderByTypeID(id_type);
        }
        dd(id_trash + " восстановлен");
    }
);

/**
 * копирование вопроса
 */
$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.QUES_COPY));
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUES_COPY),
    function () {
        let donor = AreaQues.getElementQuesMainWrp($(this));
        let ques = donor.clone();
        showSettingQues(ques, false);
        ques.insertAfter(donor);
        AreaQues.refreshPositionAllQues();
        let type_id = AreaQues.getTypeID(ques);
        if (type_id != null) {
            execAfterRenderByTypeID(type_id);
        }
    }
);

/**
 * спойлер
 */
$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.QUES_SPOILER));
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUES_SPOILER),
    function () {
        let ques = AreaQues.getElementQuesMainWrp($(this));
        spoilerQues(ques);
        showSettingQues(ques, false);
    }
);

/**
 * добавить пустышку между двумя вопросами
 */
$(document).off(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.ADD_QUES_CHOICE_BETWEEN)
);
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.ADD_QUES_CHOICE_BETWEEN),
    function () {
        let ques = AreaQues.getElementQuesMainWrp($(this));
        AreaQues.addChoiceElementTopCurrentQues(ques);
    }
);

$(document).off(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUES_ACTION_SETTING)
);
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUES_ACTION_SETTING),
    function () {
        let ques = AreaQues.getElementQuesMainWrp($(this));
        showSettingQues(ques);
    }
);

/**
 * настройка "Внутреннее название вопроса"
 */
$(document).off(
    "change",
    DataAttrEnum.getSelector(DataAttrEnum.STG_INTERNAL_NAME)
);
$(document).on(
    "change",
    DataAttrEnum.getSelector(DataAttrEnum.STG_INTERNAL_NAME),
    function () {
        let checkbox = $(this);
        let id = checkbox.attr("id");
        if (this.checked) {
            // добавить input
            Component.getNewElementInputInternalName().insertAfter(
                checkbox.siblings('[for="' + id + '"]')
            );
        } else {
            // убрать input
            QuesSetting.getElementStgInputInternalName(checkbox).remove();
        }
    }
);

// активируем drag-and-drop
execSortableQues();
// создаем пустышку из скрытой пустышки в доме
let choice = ENV.area.find(
    DataAttrEnum.getSelector(DataAttrEnum.QUES_MAIN_WRP, DataAttrEnum.FOR_CLONE)
);
ENV.choice_clone = choice.clone();
choice.remove();
ENV.choice_clone.removeAttr("style");
ENV.choice_clone.removeAttr(DataAttrEnum.FOR_CLONE);

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// menu js
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

// переключаемся на текущий area
$(function () {
    let current = getCurrentAnchor();
    if (current == "") {
        Menu.checkoutArea(AreaEnum.getSelector(AreaEnum.QUES));
        return;
    }
    Menu.checkoutArea(current);
});

$(document).off(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUIZ_MENU_ITEM) + '[href^="#"]'
);
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.QUIZ_MENU_ITEM) + '[href^="#"]',
    function () {
        Menu.checkoutArea($(this).attr("href"));
    }
);

$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.SAVE));
$(document).on(
    "click",
    DataAttrEnum.getSelector(DataAttrEnum.SAVE),
    function () {
        let $el = $(this);
        let hash = $el.attr(DataAttrEnum.HASH);
        let data = Menu.getCascadData();

        if (data.ques.length === 0) {
            confirmNotice(_.not_ques);
            return;
        }
        if (hash == data.hash) {
            confirmNotice(_.not_changes_for_save);
            return;
        }
        $el.attr(DataAttrEnum.HASH, data.hash);

        dd("before sendCascadData", data);
        sendCascadData(data, $el);
    }
);

$(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.DELETE));
$(document).on("click", DataAttrEnum.getSelector(DataAttrEnum.DELETE), (e) => {
    checkDelete(() => ajaxDeleteQuiz($(e.currentTarget)));
});

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// edit js
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

if (isEditPage()) {
    // точка входа для режима редактирования
    execRenderQuesFromDB();
    AreaSetting.filledAreaSettingFromDB();
    removeChoice();
    AreaQues.refreshPositionAllQues();
}

// если позиция 0, тогда добавляем пустышку
if (AreaQues.getEndPosNumQues() == 0) AreaQues.addFilledChoiceElement();
