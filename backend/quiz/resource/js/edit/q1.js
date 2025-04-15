import {
    Q1StgLongInput
} from './functions_q1';
import * as AreaQues from './AreaQues';
import * as QuesSetting from './QuesSetting';
import * as ComponentQ1 from './ComponentQ1';
import {
    execSortableQ1
} from './sortable';
import * as DataAttrEnum from './DataAttrEnum';


/**
 * активировать обработчики события
 */
export function eventsQ1() {
    /**
     * добавить поле после нажатия Enter
     */
    $(document).off('keyup', DataAttrEnum.getSelector(DataAttrEnum.Q1_INPUT_ANSWER));
    $(document).on('keyup', DataAttrEnum.getSelector(DataAttrEnum.Q1_INPUT_ANSWER), function (e) {
        if (e.key == 'Enter') {
            let list = AreaQues.getElementQuesWrp($(this)).find(
                DataAttrEnum.getSelector(DataAttrEnum.QUES_LIST_ITEM)
            );
            addQ1Answer(list);
        }
    });

    /**
     * добавить поле
     */
    $(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.Q1_ADD_ITEM));
    $(document).on('click', DataAttrEnum.getSelector(DataAttrEnum.Q1_ADD_ITEM), function () {
        let list = AreaQues.getElementQuesWrp($(this)).find(
            DataAttrEnum.getSelector(DataAttrEnum.QUES_LIST_ITEM)
        );
        addQ1Answer(list);
    });


    /**
     * настройка "длинный текстовый ответ"
     */
    $(document).off("change", DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_LONG));
    $(document).on('change', DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_LONG), function () {
        // let ques = AreaQues.getElementQuesMainWrp($(this));
        let ques = $(this).closest(
            DataAttrEnum.getSelector(DataAttrEnum.QUES_MAIN_WRP)
        );
        Q1StgLongInput(ques, this.checked);
    });

    /**
     * удалить поле
     */
    $(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.Q1_REMOVE_ANSWER));
    $(document).on('click', DataAttrEnum.getSelector(DataAttrEnum.Q1_REMOVE_ANSWER), function () {
        $(this).parent().remove();
    });

    /**
     * настройка "свой ответ"
     */
    $(document).off('change', DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_YOUR_ANSWER));
    $(document).on('change', DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_YOUR_ANSWER), function () {
        let checkbox = $(this);
        let id = checkbox.attr('id');
        if (this.checked) {
            // добавить input
            ComponentQ1.getNewElementYourAnswer().insertAfter(checkbox.siblings('[for="' + id + '"]'));
        } else {
            // убрать инпут
            QuesSetting.getElementQ1StgInputYourAnswer(checkbox).remove();
        }
        return;
    });

    $(function () {
        execSortableQ1();
    });
}


// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// NOT EXPORT
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

/**
 * получить статус настройки "Длинный текстовый ответ"
 */
function getStatusStgLongQ1(ques) {
    return ques.find(
        DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_LONG)
    ).prop("checked");
}

/**
 * добавить новое поле в конец списка
 */
function addQ1Answer(list) {
    // let ques = AreaQues.getElementQuesMainWrp(list);
    let ques = list.closest(
        DataAttrEnum.getSelector(DataAttrEnum.QUES_MAIN_WRP)
    );
    let statusStgLong = getStatusStgLongQ1(ques);
    let item = ComponentQ1.getNewElementItem(statusStgLong);

    list.append(item);

    item.find('input:first-of-type').focus();
}