import * as ComponentQ2 from './ComponentQ2';
import * as AreaQues from './AreaQues';
import * as QuesSetting from './QuesSetting';
import {
    dd,
} from './dev_func';
import {
    execSortableQ2,
} from './sortable';
import * as DataAttrEnum from './DataAttrEnum';

/**
 * активировать обработчики события
 */
export function eventsQ2() {
    /**
     * вызываем окно загрузки
     */
    $(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.Q2_SHOW_UPL_WINDOW));
    $(document).on('click', DataAttrEnum.getSelector(DataAttrEnum.Q2_SHOW_UPL_WINDOW), function () {
        let file = $(this).siblings('input[type="file"]');
        file.trigger('click');
    });

    /**
     * вызываем после выбора картинки
     */
    $(document).off("change", DataAttrEnum.getSelector(DataAttrEnum.Q2_FILE_INPUT));
    $(document).on('change', DataAttrEnum.getSelector(DataAttrEnum.Q2_FILE_INPUT), function () {
        let input = $(this);
        let files = input.prop('files');
        if (files.lenght === 0) {
            dd(files);
            return;
        }

        let preview = input.siblings(
            DataAttrEnum.getSelector(DataAttrEnum.Q2_IMG_PREVIEW)
        );

        let formData = new FormData();
        formData.append('foo', files[0]);
        // обнуляем значение в input file
        input.val('');
        $.ajax({
            url: 'https://noks-d1.ru/',
            method: 'POST',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.status) {
                    preview.find('svg').remove();
                    preview.find(
                        DataAttrEnum.getSelector(DataAttrEnum.Q2_IMG)
                    ).remove();
                    preview.append(ComponentQ2.getNewElementPreviewImage(response.result[0].src));
                    return;
                }
                // confirmNotice(Object.values(response.errors).join('<br>'));
                dd(Object.values(response.errors).join('<br>'));
            },
            error: () => {
                // confirmNotice('Не удалось загрузить картинку.');
                dd('Не удалось загрузить картинку.');
            },
        });
    });

    /**
     * добавить поле после нажатия Enter
     */
    $(document).off("keyup", DataAttrEnum.getSelector(DataAttrEnum.Q2_INPUT_ANSWER));
    $(document).on('keyup', DataAttrEnum.getSelector(DataAttrEnum.Q2_INPUT_ANSWER), function (e) {
        if (e.key == 'Enter') {
            let list = AreaQues.getElementQuesListItem($(this));
            addQ2Answer(list);
        }
    });

    /**
     * добавить поле
     */
    $(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.Q2_ADD_ITEM));
    $(document).on('click', DataAttrEnum.getSelector(DataAttrEnum.Q2_ADD_ITEM), function () {
        let list = AreaQues.getElementQuesListItem($(this));
        addQ2Answer(list);
    });

    /**
     * удалить поле
     */
    $(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.Q2_REMOVE_ANSWER));
    $(document).on('click', DataAttrEnum.getSelector(DataAttrEnum.Q2_REMOVE_ANSWER), function () {
        $(this).parent().remove();
    });

    /**
     * копировать поле
     */
    $(document).off("click", DataAttrEnum.getSelector(DataAttrEnum.Q2_COPY_ANSWER));
    $(document).on('click', DataAttrEnum.getSelector(DataAttrEnum.Q2_COPY_ANSWER), function () {
        let $el = $(this).parent();
        let $newEl = $($el.prop('outerHTML'));
        $newEl.find('input[type="text"]').val($el.find('input[type="text"]').val());
        $($newEl).insertAfter($el);
    });

    /**
     * настройка "свой ответ"
     */
    $(document).off("change", DataAttrEnum.getSelector(DataAttrEnum.Q2_STG_YOUR_ANSWER));
    $(document).on('change', DataAttrEnum.getSelector(DataAttrEnum.Q2_STG_YOUR_ANSWER), function () {
        let $checkbox = $(this);
        let id = $checkbox.attr('id');
        if (this.checked) {
            // добавить input
            ComponentQ2.getNewElementYourAnswer().insertAfter($checkbox.siblings('[for="' + id + '"]'));
            return;
        }
        // убрать инпут
        // $checkbox.siblings('[data-q2-stg-input-your-answer]').remove();
        QuesSetting.getElementQ2InputYourAnswer($checkbox).remove();
        return;
    });

    $(function () {
        execSortableQ2();
    });
}

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// NOT IMPORT
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------


/**
 * добавить новое поле в конец списка
 */
function addQ2Answer(list) {
    // let ques = AreaQues.getElementQuesMainWrp(list);
    let item = ComponentQ2.getNewElementItem();
    list.append(item);
    item.find('input:first-of-type').focus();
}
