import {
    genRndStr
} from './functions';
import * as Component from './Component';
import * as DataAttrEnum from './DataAttrEnum';

/**
 * рендерим html для data-ques-wrp "Варианты ответов"
 */
export function getNewElementQues() {
    return $(`
        <div
            ${DataAttrEnum.QUES_TYPE_ID}="1"
            ${DataAttrEnum.QUES_WRP}
        >
            <div
                ${DataAttrEnum.Q1_LIST_SORTABLE}
                ${DataAttrEnum.QUES_LIST_ITEM}
                class="m-[1em]"
            >
                ${getNewElementItem().prop('outerHTML')}
            </div>
            <div
                ${DataAttrEnum.Q1_ADD_ITEM}
                class=" text-[1em] italic m-[1em]"
            >
                <span
                    class="cursor-pointer text-[#d13980]"
                >
                    Добавьте ответ
                </span>
                или нажмите “Enter↵”
            </div>
        </div>
    `);
}

export function getNewElementItem(status_stg_long = false) {
    return $(`
        <div ${DataAttrEnum.QUES_ITEM}
            class="
                border
                flex
                justify-between
                items-center
                px-0
                py-0.5
                border-solid
                border-transparent
                hover:border
                hover:border-solid
                hover:border-[#d5d2d2]
            "
        >
            ${Component.getElDragAndDrop([DataAttrEnum.Q1_SORTABLE]).prop('outerHTML')}
            <div class="
                grow-[3]
                m-0
                p-0
            ">
                <input ${DataAttrEnum.Q1_INPUT_ANSWER}
                    class="
                        inline-flex
                        justify-center
                        items-center
                        w-[90%]
                        bg-transparent
                        pl-[5px]
                        border-none
                        focus:outline-none
                    "
                type="text" placeholder="Добавьте ответ">
                <input ${DataAttrEnum.Q1_STG_INPUT_LONG} ${(status_stg_long ? '' : 'style="display: none;"')}
                    class="
                        inline-flex
                        justify-center
                        items-center
                        w-[90%]
                        bg-transparent
                        pl-[5px]
                        border-none
                        outline-none
                    "
                type="text" placeholder="Дополнительный текст...">
            </div>
            ${Component.getElRemoveAnswer([DataAttrEnum.Q1_REMOVE_ANSWER]).prop('outerHTML')}
        </div>
    `);
}

/**
 * настройки для Q1
 */
export function getNewElementSettingQues() {
    let opt = {
        long: 'q_stg_' + genRndStr(),
        many: 'q_stg_' + genRndStr(),
        your_answer: 'q_stg_' + genRndStr(),
    };

    let html = `<div ${DataAttrEnum.SETTING_QUES}
        class="
            pt-[0.5em]
            pb-[1em]
            px-[1em]
        " style="display: none;">
        <div
            class="
                flex
                justify-start
                relative
        ">
            <div class="first-of-type:mr-[4em]">
                <div
                    class="
                        tracking-[1px]
                        uppercase
                        ml-[25px]
                        mb-[5px]
                        border-b-[black]
                    ">настройки ответов</div>

                <input type="checkbox" ${DataAttrEnum.Q1_STG_LONG} id="${opt.long}">
                <label
                    class="
                        cursor-pointer
                        inline
                        text-[1.3em]
                        font-light
                    " for="${opt.long}">Длинный текстовый ответ</label>
                <br>
                <input type="checkbox" ${DataAttrEnum.STG_MANY} id="${opt.many}">
                <label
                    class="
                        cursor-pointer
                        inline
                        text-[1.3em]
                        font-light
                    " for="${opt.many}">Можно несколько</label>
                <br>
                <input type="checkbox" ${DataAttrEnum.Q1_STG_YOUR_ANSWER} id="${opt.your_answer}">
                <label
                    class="
                        cursor-pointer
                        inline
                        text-[1.3em]
                        font-light
                    " for="${opt.your_answer}">Вариант "свой ответ"</label>
            </div>
            ${Component.getNewElementSettingQues().prop('outerHTML')}
        </div>
    </div>`;

    return $(html);
}

/**
 * генерируем инпут для настройки "свой ответ"
 */
export function getNewElementYourAnswer(value = null) {
    let el = $(`
        <input
            class="outline-none ml-[25px] w-full p-[5px] block border-none mt-[5px]"
            ${DataAttrEnum.Q1_STG_INPUT_YOUR_ANSWER}
            placeholder="Другое..."
            maxlength="100"
            type="text"
        >
    `);
    if (value !== null) el.val(value);
    return el;
}