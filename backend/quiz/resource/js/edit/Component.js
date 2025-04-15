import {
    genRndStr,
} from './functions';
import {
    TypeQuestionEnum,
} from './TypeQuestionEnum';
import * as DataAttrEnum from './DataAttrEnum';

/**
 * получаем html востановления
 */
export function getRestoreElement(trash_id) {
    return $(`
        <div
            ${DataAttrEnum.ID_TRASH}="${trash_id}"
            class="text-[1.3em] text-[gray] mx-0 my-8"
        >
            Вопрос удален.
            <span
                ${DataAttrEnum.QUES_RESTORE}
                class="text-black cursor-pointer text-[1.2em] border-t-0 border-r-0 border-l-0 border-b-2 border-b-black border-dashed"
            >
                Восстановить
            </span>
        </div>
    `);
}

/**
 * создаем общие настройки вопроса
 */
export function getNewElementSettingQues() {
    let opt = {
        not_necessary: 'q_stg_' + genRndStr(),
        internal_name: 'q_stg_' + genRndStr(),
    };

    let html = `
    <div class="first-of-type:mr-[4em]">
        <div class="tracking-[1px] uppercase ml-[25px] mb-[5px] border-b-[black]">настройки вопросов</div>

        <input type="checkbox" ${DataAttrEnum.STG_NOT_NECESSARY} id="${opt.not_necessary}">
        <label class="cursor-pointer inline text-[1.3em] font-light" for="${opt.not_necessary}">Необязательный вопрос</label>
        <br>
        <input type="checkbox" ${DataAttrEnum.STG_INTERNAL_NAME} id="${opt.internal_name}">
        <label class="cursor-pointer inline text-[1.3em] font-light" for="${opt.internal_name}">Внутреннее название вопроса</label>
        ${createInputMetricTarget().prop('outerHTML')}
    </div>
    `;
    return $(html);
}

/**
 * input для настройки "Внутреннее название вопроса"
 */
// export function htmlStgInternalName ()
export function getNewElementInputInternalName(value = null) {
    let el = $(`
        <input
            class="outline-none block ml-[25px] p-[5px] w-full border-none mt-[5px]"
            ${DataAttrEnum.STG_INPUT_INTERNAL_NAME}
            placeholder="Название вопроса..."
            maxlength="100"
            type="text"
        >
    `);
    if (value !== null) el.val(value);
    return el;
}
/**
 * черта под вопросом, для добавление вопроса снизу
 */
export function getElementAddQuesEnd() {
    return $(`
        <div ${DataAttrEnum.ADD_QUES_END} title="Добавить вопрос в конец"
            class="
                cursor-pointer absolute bottom-[-1em] block w-full opacity-20 inset-x-0 hover:opacity-[10]
                
                after:block after:content-[''] after:w-full after:ml-[-4px] after:my-[4px] after:border-b-0 after:border-b-black after:border-dashed
                
                before:content-['+'] before:text-3xl before:absolute before:right-[-5px] before:text-black before:translate-x-4 before:font-normal before:top-[-12px]
            "></div>
    `);
}

/**
 * черта между вопросом, для добавление вопроса
 */
export function getElementAddQuesChoiceBetween() {
    return $(`
        <div ${DataAttrEnum.ADD_QUES_CHOICE_BETWEEN} title="Добавить вопрос"
            class="
                cursor-pointer absolute top-[-1.3rem] block w-full opacity-0 inset-x-0 hover:opacity-[10]
                
                after:block after:content-[''] after:w-full after:ml-[-4px] after:my-[8px] after:border-b-0 after:border-b-black after:border-dashed
                
                before:content-['+'] before:text-3xl before:absolute before:right-[-5px] before:text-black before:translate-x-4 before:font-normal before:top-[-8px]
            "></div>
    `);
}

export function getElementQuesHide() {
    return $(`
        <div ${DataAttrEnum.QUES_HIDE}="0"
            class="
                cursor-pointer w-7 min-w-[28px] h-7 rounded inline-flex justify-center items-center mr-[0.35rem] hover:bg-[rgba(209,57,128,0.1)]
            " title="скрыть вопрос"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
    `);
}
export function getElementQuesCopy() {
    return $(`
        <div ${DataAttrEnum.QUES_COPY}
            class="
                cursor-pointer w-7 min-w-[28px] h-7 rounded inline-flex justify-center items-center mr-[0.35rem] hover:bg-[rgba(209,57,128,0.1)]
            " title="копировать вопрос"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
            </svg>
        </div>
    `);
}
export function getElementQuesRemove() {
    return $(`
        <div ${DataAttrEnum.QUES_REMOVE}
            class="
                cursor-pointer w-7 min-w-[28px] h-7 rounded inline-flex justify-center items-center mr-[0.35rem] hover:bg-[rgba(209,57,128,0.1)]
            " title="удалить вопрос"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </div>
    `);
}
/**
 * data-ques-action-setting
 */
export function getElementQuesActionSetting() {
    return $(`
        <div
            ${DataAttrEnum.QUES_ACTION_SETTING}
            class="cursor-pointer w-7 min-w-[28px] h-7 rounded inline-flex justify-center items-center mr-[0.35rem] hover:bg-[rgba(209,57,128,0.1)]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </div>
    `);
}

export function getElDragAndDrop(array_attr = []) {
    return $(`
        <div
            ${array_attr.join(' ')}
            class="opacity-40 cursor-grab w-7 h-7 rounded inline-flex justify-center items-center ml-[0.3em] hover:bg-[rgba(196,196,196,0.1)] hover:opacity-100"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="text-gray-400 w-6 h-6"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
        </div>
    `);
}

export function getElRemoveAnswer(array_attr = []) {
    return $(`
    <div
        ${array_attr.join(' ')}
        class=" cursor-pointer w-7 min-w-[28px] h-7 rounded inline-flex justify-center items-center mr-[0.35rem] opacity-20 hover:bg-[rgba(209,57,128,0.1)] hover:opacity-100"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="text-gray-400 w-6 h-6"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
    </div>
    `);
}

export function getElListType(types) {
    let t = '';
    let svg = [];
    svg[TypeQuestionEnum.type1] = getElSVGQ1;
    svg[TypeQuestionEnum.type2] = getElSVGQ2;
    types.forEach(value => {
        t += getElType(
            value.type_id,
            value.type_name,
            svg[value.type_id]().prop('outerHTML')
        ).prop('outerHTML');
    });

    return $(`
        <div
            ${DataAttrEnum.QUES_TYPE_ID}
            ${DataAttrEnum.QUES_WRP}
            class="flex justify-around mt-[1em] mb-[2em] mx-[1em]"
        >
            ${t}
        </div>
    `);
}

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// NOT EXPORT
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function getElType(type_id, type_name, svg = '') {
    return $(`
        <div ${DataAttrEnum.TYPE}="${type_id}" class="cursor-pointer w-[10em] h-[8em] border rounded border-solid border-[#eaedf3]">
            <div class="flex items-center justify-center w-full h-3/5 bg-[#f7f7f7]">
                ${svg}
            </div>
            <div class="w-full h-2/5 flex items-center justify-center bg-white text-[#69748c] text-center text-[1.3em] leading-[0.9] font-normal px-2.5 py-0">${type_name}</div>
        </div>
    `);
}

function getElSVGQ1() {
    return $(`
        <svg
            class="max-h-[45%] max-w-[70%] w-full h-full align-middle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35.189 24.078"
        >
            <defs>
                <style>
                    .cls-1{fill:#c4c4c4}.cls-2{fill:#fff}
                </style>
            </defs>
            <g id="text" transform="translate(-240 -128)">
                <g id="Group_98" data-name="Group 98" transform="translate(240 128)">
                    <rect id="Rectangle_74" width="35.189" height="6.02" class="cls-1" data-name="Rectangle 74" rx="2"/>
                    <ellipse id="Ellipse_16" cx="1.505" cy="1.505" class="cls-2" data-name="Ellipse 16" rx="1.505" ry="1.505" transform="translate(2.006 1.505)"/>
                </g>
                <g id="Group_99" data-name="Group 99" transform="translate(240 137.029)">
                    <rect id="Rectangle_74-2" width="35.189" height="6.02" class="cls-1" data-name="Rectangle 74" rx="2"/>
                    <ellipse id="Ellipse_16-2" cx="1.505" cy="1.505" class="cls-2" data-name="Ellipse 16" rx="1.505" ry="1.505" transform="translate(2.006 1.505)"/>
                </g>
                <g id="Group_100" data-name="Group 100" transform="translate(240 146.059)">
                    <rect id="Rectangle_74-3" width="35.189" height="6.02" class="cls-1" data-name="Rectangle 74" rx="2"/>
                    <ellipse id="Ellipse_16-3" cx="1.505" cy="1.505" class="cls-2" data-name="Ellipse 16" rx="1.505" ry="1.505" transform="translate(2.006 1.505)"/>
                </g>
            </g>
        </svg>
    `);
}

function getElSVGQ2() {
    return $(`
        <svg
            class="max-h-[45%] max-w-[70%] w-full h-full align-middle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36.19 24.02"
        >
            <defs>
                <style>
                    .cls-1{fill:#c4c4c4}.cls-2{fill:#fff}
                </style>
            </defs>
            <g id="image_text" data-name="image+text" transform="translate(-240 -128)">
                <g id="Group_98" data-name="Group 98" transform="translate(240 128)">
                    <rect id="Rectangle_74" width="16.189" height="6.02" class="cls-1" data-name="Rectangle 74" rx="2"/>
                    <ellipse id="Ellipse_16" cx="1.505" cy="1.505" class="cls-2" data-name="Ellipse 16" rx="1.505" ry="1.505" transform="translate(2.006 1.505)"/>
                </g>
                <g id="Group_101" data-name="Group 101" transform="translate(260 128)">
                    <rect id="Rectangle_74-2" width="16.19" height="24.02" class="cls-1" data-name="Rectangle 74" rx="2"/>
                    <ellipse id="Ellipse_16-2" cx="1.505" cy="1.505" class="cls-2" data-name="Ellipse 16" rx="1.505" ry="1.505" transform="translate(2.006 1.505)"/>
                </g>
                <g id="Group_102" data-name="Group 102" transform="translate(240 137)">
                    <rect id="Rectangle_74-3" width="16.189" height="6.02" class="cls-1" data-name="Rectangle 74" rx="2"/>
                    <ellipse id="Ellipse_16-3" cx="1.505" cy="1.505" class="cls-2" data-name="Ellipse 16" rx="1.505" ry="1.505" transform="translate(2.006 1.505)"/>
                </g>
                <g id="Group_103" data-name="Group 103" transform="translate(240 146)">
                    <rect id="Rectangle_74-4" width="16.189" height="6.02" class="cls-1" data-name="Rectangle 74" rx="2"/>
                    <ellipse id="Ellipse_16-4" cx="1.505" cy="1.505" class="cls-2" data-name="Ellipse 16" rx="1.505" ry="1.505" transform="translate(2.006 1.505)"/>
                </g>
            </g>
        </svg>
    `);
}

/**
 * input цели
 */
function createInputMetricTarget() {
    return $(`
        <input
            class="outline-none ml-[25px] w-full block border-none mt-[5px] p-[10px] text-[1em]"
            ${DataAttrEnum.STG_INPUT_METRIC_TARGET}
            title="Укажите цель для вашей метрики"
            placeholder="Идентификатор цели..."
            maxlength="100"
            type="text"
        >
    `);
}