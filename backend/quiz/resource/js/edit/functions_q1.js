import * as DataAttrEnum from './DataAttrEnum';

/**
 * показать/скрыть поле "длинный ответ"
 */
export function Q1StgLongInput(ques, show) {
    if (show) ques.find(
        DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_INPUT_LONG)
    ).show();
    else ques.find(
        DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_INPUT_LONG)
    ).hide();
}