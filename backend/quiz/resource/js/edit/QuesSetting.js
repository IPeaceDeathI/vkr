import * as AreaQues from './AreaQues';
import {
   findElement
} from './functions';
import {
   dd
} from './dev_func';
import * as DataAttrEnum from './DataAttrEnum';

/**
 * Главные селектор, в нем все настройки вопроса
 */
const END_SELECTOR = DataAttrEnum.getSelector(DataAttrEnum.SETTING_QUES);

/**
 * Настройка: "Необязательный вопрос" checkbox [data-stg-not-necessary]
 */
export function getElementStgNotNecessary(any_el) {
   // return AreaQues.getElementSettingQues(any_el).find(selector);
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.STG_NOT_NECESSARY), END_SELECTOR);
}

/**
 * Настройка: "Необязательный вопрос" checkbox [data-stg-not-necessary]
 */
export function getValueStgNotNecessary(any_el) {
   return getElementStgNotNecessary(any_el).prop('checked');
}
export function setValueStgNotNecessary(any_el, value) {
   getElementStgNotNecessary(any_el).prop('checked', value);
}




/**
 * Настройка: "Внутреннее название вопроса" checkbox [data-stg-internal-name]
 */
export function getElementStgInternalName(any_el) {
   // return AreaQues.getElementSettingQues(any_el).find(selector);
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.STG_INTERNAL_NAME), END_SELECTOR);
}
/**
 * Настройка: "Внутреннее название вопроса" checkbox [data-stg-internal-name]
 */
export function getValueStgInternalName(any_el) {
   return getElementStgInternalName(any_el).prop('checked');
}
export function setValueStgInternalName(any_el, value) {
   getElementStgInternalName(any_el).prop('checked', value);
}




/**
 * Настройка: "Поле внутреннее название вопроса" input text [data-stg-input-internal-name]
 */
export function getElementStgInputInternalName(any_el) {
   return AreaQues.getElementSettingQues(any_el).find(
      DataAttrEnum.getSelector(DataAttrEnum.STG_INPUT_INTERNAL_NAME)
   );
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.STG_INPUT_INTERNAL_NAME), END_SELECTOR);
}
/**
 * Настройка: "Поле внутреннее название вопроса" input text [data-stg-input-internal-name]
 */
export function getValueStgInputInternalName(any_el) {
   return getElementStgInputInternalName(any_el).val() ?? '';
}






/**
 * Настройка: "поле цель" input text [data-stg-input-metric-target]
 */
export function getElementStgInputMetricTarget(any_el) {
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.STG_INPUT_METRIC_TARGET), END_SELECTOR);
}
/**
 * Настройка: "поле цель" input text [data-stg-input-metric-target]
 */
export function getValueQStgInputMetricTarget(any_el) {
   return getElementStgInputMetricTarget(any_el).val() ?? '';
}
export function setValueQStgInputMetricTarget(any_el, value) {
   getElementStgInputMetricTarget(any_el).val(value);
}






/**
 * Настройка: "Можно несколько" checkbox [data-stg-many]
 */
export function getElementStgMany(any_el) {
   // return AreaQues.getElementSettingQues(any_el).find(selector);
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.STG_MANY), END_SELECTOR);
}
/**
 * Настройка: "Можно несколько" checkbox [data-stg-many]
 */
export function getValueQStgMany(any_el) {
   return getElementStgMany(any_el).prop('checked');
}
export function setValueQStgMany(any_el, value) {
   getElementStgMany(any_el).prop('checked', value);
}

// ------------------------------------------------------------------
// Q1
// ------------------------------------------------------------------

/**
 * Настройка: "свой ответ" checkbox [data-q1-stg-your-answer]
 */
export function getElementQ1StgYourAnswer(any_el) {
   // return AreaQues.getElementSettingQues(any_el).find(selector);
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_YOUR_ANSWER), END_SELECTOR);
}
/**
 * Настройка: "свой ответ" checkbox [data-q1-stg-your-answer]
 */
export function getValueQ1StgYourAnswer(any_el) {
   return getElementQ1StgYourAnswer(any_el).prop('checked');
}
export function setValueQ1StgYourAnswer(any_el, value) {
   getElementQ1StgYourAnswer(any_el).prop('checked', value);
}

/**
 * Настройка: "свой ответ" input text [data-q1-stg-input-your-answer]
 */
export function getElementQ1StgInputYourAnswer(any_el) {
   return AreaQues.getElementSettingQues(any_el).find(
      DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_INPUT_YOUR_ANSWER)
   );
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_INPUT_YOUR_ANSWER), END_SELECTOR);
}
/**
 * Настройка: "свой ответ" input text [data-q1-stg-input-your-answer]
 */
export function getValueQ1StgInputYourAnswer(any_el) {
   return getElementQ1StgInputYourAnswer(any_el).val() ?? '';
}

/**
 * Настройка: "Длинный текстовый ответ" checkbox [data-q1-stg-long]
 */
export function getElementQ1StgLong(any_el) {
   // return AreaQues.getElementSettingQues(any_el).find(selector);
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_LONG), END_SELECTOR);
}
/**
 * Настройка: "Длинный текстовый ответ" checkbox [data-q1-stg-long]
 */
export function getValueQ1StgLong(any_el) {
   return getElementQ1StgLong(any_el).prop('checked');
}
export function setValueQ1StgLong(any_el, value) {
   getElementQ1StgLong(any_el).prop('checked', value);
}

/**
 * Настройка: "Длинный текстовый ответ" input text [data-q1-stg-input-long] находится вне [data-setting-ques]
 */
export function getElementQ1StgInputLong(item_answer) {
   return item_answer.find(
      DataAttrEnum.getSelector(DataAttrEnum.Q1_STG_INPUT_LONG)
   );
}
/**
 * Настройка: "Длинный текстовый ответ" input text [data-q1-stg-input-long] находится вне [data-setting-ques]
 */
export function getValueQ1StgInputLong(item_answer) {
   return getElementQ1StgInputLong(item_answer).val() ?? '';
}

// ------------------------------------------------------------------
// Q2
// ------------------------------------------------------------------



/**
 * Настройка: "свой ответ" checkbox [data-q2-stg-your-answer]
 */
export function getElementQ2StgYourAnswer(any_el) {
   return AreaQues.getElementSettingQues(any_el).find(
      DataAttrEnum.getSelector(DataAttrEnum.Q2_STG_YOUR_ANSWER)
   );
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.Q2_STG_YOUR_ANSWER), END_SELECTOR);
}
/**
 * Настройка: "свой ответ" checkbox [data-q2-stg-your-answer]
 */
export function getValueQ2StgYourAnswer(any_el) {
   return getElementQ2StgYourAnswer(any_el).prop('checked');
}
export function setValueQ2StgYourAnswer(any_el, value) {
   getElementQ2StgYourAnswer(any_el).prop('checked', value);
}







/**
 * Настройка: "свой ответ" input text [data-q2-stg-input-your-answer]
 */
export function getElementQ2InputYourAnswer(any_el) {
   return AreaQues.getElementSettingQues(any_el).find(
      DataAttrEnum.getSelector(DataAttrEnum.Q2_STG_INPUT_YOUR_ANSWER)
   );
   return findElement(any_el, DataAttrEnum.getSelector(DataAttrEnum.Q2_STG_INPUT_YOUR_ANSWER), END_SELECTOR);
}
/**
 * Настройка: "свой ответ" input text [data-q2-stg-input-your-answer]
 */
export function getValueQ2InputYourAnswer(any_el) {
   return getElementQ2InputYourAnswer(any_el).val() ?? '';
}

// ------------------------------------------------------------------
// ___
// ------------------------------------------------------------------