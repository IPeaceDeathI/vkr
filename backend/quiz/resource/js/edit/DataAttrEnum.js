export const ID_TRASH = 'data-id-trash';
export const QUES_RESTORE = 'data-ques-restore';
export const STG_NOT_NECESSARY = 'data-stg-not-necessary';
export const STG_INTERNAL_NAME = 'data-stg-internal-name';
export const STG_INPUT_INTERNAL_NAME = 'data-stg-input-internal-name';
export const ADD_QUES_END = 'data-add-ques-end';
export const ADD_QUES_CHOICE_BETWEEN = 'data-add-ques-choice-between';
export const QUES_HIDE = 'data-ques-hide';
export const QUES_COPY = 'data-ques-copy';
export const QUES_REMOVE = 'data-ques-remove';
export const QUES_ACTION_SETTING = 'data-ques-action-setting';
export const QUES_TYPE_ID = 'data-ques-type-id';
export const QUES_WRP = 'data-ques-wrp';
export const TYPE = 'data-type';
export const STG_INPUT_METRIC_TARGET = 'data-stg-input-metric-target';
export const QUES_ITEM = 'data-ques-item';
export const Q1_INPUT_ANSWER = 'data-q1-input-answer';
export const Q1_STG_INPUT_LONG = 'data-q1-stg-input-long';
export const Q2_INPUT_ANSWER = 'data-q2-input-answer';
export const Q2_IMG_PREVIEW = 'data-q2-img-preview';
export const Q2_IMG = 'data-q2-img';
export const Q2_LIST_SORTABLE = 'data-q2-list-sortable';
export const QUES_LIST_ITEM = 'data-ques-list-item';
export const Q2_ADD_ITEM = 'data-q2-add-item';
export const STG_MANY = 'data-stg-many';
export const Q2_STG_YOUR_ANSWER = 'data-q2-stg-your-answer';
export const Q2_SORTABLE = 'data-q2-sortable';
export const Q2_FILE_INPUT = 'data-q2-file-input';
export const Q2_SHOW_UPL_WINDOW = 'data-q2-show-upl-window';
export const Q2_COPY_ANSWER = 'data-q2-copy-answer';
export const Q2_REMOVE_ANSWER = 'data-q2-remove-answer';
export const Q2_STG_INPUT_YOUR_ANSWER = 'data-q2-stg-input-your-answer';
export const Q1_LIST_SORTABLE = 'data-q1-list-sortable';
export const Q1_ADD_ITEM = 'data-q1-add-item';
export const Q1_SORTABLE = 'data-q1-sortable';
export const Q1_REMOVE_ANSWER = 'data-q1-remove-answer';
export const SETTING_QUES = 'data-setting-ques';
export const Q1_STG_LONG = 'data-q1-stg-long';
export const Q1_STG_YOUR_ANSWER = 'data-q1-stg-your-answer';
export const Q1_STG_INPUT_YOUR_ANSWER = 'data-q1-stg-input-your-answer';
export const QUES_SPOILER = 'data-ques-spoiler';
export const TITLE_QUES = 'data-title-ques';
export const QUES_FOOTER = 'data-ques-footer';
export const QUES_MAIN_WRP = 'data-ques-main-wrp';
export const POS_NUM = 'data-pos-num';
export const FOR_CLONE = 'data-for-clone';
export const QUIZ_MENU_ITEM = 'data-quiz-menu-item';
export const SAVE = 'data-save';
export const DELETE = 'data-delete';
export const HASH = 'data-hash';
export const AREA_STG_INPUT_TARGET = 'data-area-stg-input-target';
export const AREA_STG_TITLE = 'data-area-stg-title';
export const AREA_STG_DESC = 'data-area-stg-desc';
export const AREA_STG_BTN_TITLE = 'data-area-stg-btn-title';
export const TITLE_QUIZ = 'data-title-quiz';

/**
 * [data-name] OR [data-name][data-name][data-name]
 * @returns {string}
 */
export function getSelector(...attrs) {
   attrs.forEach((attr, idx) => {
      attrs[idx] = `[${attr}]`;
   });
   return attrs.join('');
}