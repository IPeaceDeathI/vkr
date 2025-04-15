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
            ${DataAttrEnum.QUES_TYPE_ID}="2"
            ${DataAttrEnum.QUES_WRP}
        >
            <div
                ${DataAttrEnum.Q2_LIST_SORTABLE}
                ${DataAttrEnum.QUES_LIST_ITEM}
                class="m-[1em]"
            >
                ${getNewElementItem().prop('outerHTML')}
            </div>
            <div
                class=" text-[1em] italic m-[1em]"
            >
            <span
                ${DataAttrEnum.Q2_ADD_ITEM}
                class="cursor-pointer text-[#d13980]"
            >Добавьте ответ</span> или нажмите “Enter↵”</div>
        </div>
    `);
}

/**
 * настройки для Q2
 */
export function getNewElementSettingQues() {
    let opt = {
        many: 'q_stg_' + genRndStr(),
        your_answer: 'q_stg_' + genRndStr(),
    };

    let html = `
    <div ${DataAttrEnum.SETTING_QUES}
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

                <input type="checkbox" ${DataAttrEnum.STG_MANY} id="${opt.many}">
                <label
                    class="
                        cursor-pointer
                        inline
                        text-[1.3em]
                        font-light
                    " for="${opt.many}">Можно несколько</label>
                <br>
                <input type="checkbox" ${DataAttrEnum.Q2_STG_YOUR_ANSWER} id="${opt.your_answer}">
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
    </div>
    `;

    return $(html);
}

export function getNewElementItem() {
    return $(`
        <div ${DataAttrEnum.QUES_ITEM}
            class=" border flex justify-between items-center px-0 py-0.5 border-solid border-transparent hover:border hover:border-solid hover:border-[#d5d2d2]"
        >
            ${Component.getElDragAndDrop([DataAttrEnum.Q2_SORTABLE]).prop('outerHTML')}
            <div
                class="
                    flex rounded h-[30px] min-w-[56px] w-14 bg-[rgba(102,192,218,0.2)] ml-[0.3em] border-none
                " title="PNG/JPG | MAX:3mb">
                <input type="file" ${DataAttrEnum.Q2_FILE_INPUT}
                    class="
                        hidden
                    " accept="image/png, image/jpeg">
                <div ${DataAttrEnum.Q2_IMG_PREVIEW}
                    class="
                        w-6/12 bg-[rgba(102,192,218,0.7)] rounded border-none flex items-center justify-center
                    "
                >
                    <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>
                <div ${DataAttrEnum.Q2_SHOW_UPL_WINDOW}
                    class="
                        cursor-pointer
                        w-6/12
                        flex items-center justify-center
                    "
                >
                    <svg class="w-6 h-6 text-[#8bcfe3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </div>
            <div
                class=" grow-[3] m-0 p-0"
            >
                <input
                    class="inline-flex justify-center items-center w-[90%] bg-transparent text-[1em] pl-4 rounded-[0.3em] border-none focus:outline-none"
                    ${DataAttrEnum.Q2_INPUT_ANSWER}
                    type="text"
                    placeholder="Добавьте ответ"
                >
            </div>
            <div
                ${DataAttrEnum.Q2_COPY_ANSWER}
                class="cursor-pointer w-7 min-w-[28px] h-7 rounded inline-flex justify-center items-center mr-[0.35rem] hover:bg-[rgba(209,57,128,0.1)] opacity-20 hover:opacity-100"
            >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-gray-400"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                </div>
            ${Component.getElRemoveAnswer([DataAttrEnum.Q2_REMOVE_ANSWER]).prop('outerHTML')}
        </div>
    `);
}

/**
 * генерируем превьюшку 30px
 */
export function getNewElementPreviewImage(src) {
    return $(`
        <div
            class="w-full h-full flex justify-center items-center rounded bg-[50%] bg-cover"
            ${DataAttrEnum.Q2_IMG}="${src}"
            style="background-image: url(${src});"
        ></div>
    `);
}

/**
 * генерируем инпут для настройки "свой ответ"
 */
export function getNewElementYourAnswer(value = null) {
    let el = $(`
        <input
            class="outline-none ml-[25px] w-full p-[5px] block border-none mt-[5px]"
            ${DataAttrEnum.Q2_STG_INPUT_YOUR_ANSWER}
            placeholder="Другое..."
            maxlength="100"
            type="text"
        >
    `);
    if (value !== null) el.val(value);
    return el;
}