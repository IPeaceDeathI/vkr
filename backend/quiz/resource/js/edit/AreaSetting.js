import {
   ENV,
} from './Env';
import * as DataAttrEnum from './DataAttrEnum';

/**
 * подставляем значения в настройки
 */
export function filledAreaSettingFromDB() {
   let target_id = ENV.edit_setting.form_id_target;
   if (target_id == ENV.default_target) target_id = '';
   getElementTargetID().val(target_id);
   getElementTitleForm().val(ENV.edit_setting.title);
   getElementDescForm().val(ENV.edit_setting.desc);
   getElementNameButtonForm().val(ENV.edit_setting.title_btn);
}

/**
 * получить данные из формы настройки
 */
export function getAllDataAreaSetting() {
   let target_id = getValueTargetID();
   if (target_id == '') target_id = ENV.default_target;
   let data = {
      title: getValueTitleForm(),
      desc: getValueDescForm(),
      title_btn: getValueNameButtonForm(),
      form_id_target: target_id,
   };
   return data;
}

// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// not import
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

// ------------------------------------------------------------------
// $ element
// ------------------------------------------------------------------

function getElementAreaSetting() {
   return $('[data-anchor="#setting"]');
}

function getElementTargetID() {
   return getElementAreaSetting().find(
      DataAttrEnum.getSelector(DataAttrEnum.AREA_STG_INPUT_TARGET)
   );
}

function getElementTitleForm() {
   return getElementAreaSetting().find(
      DataAttrEnum.getSelector(DataAttrEnum.AREA_STG_TITLE)
   );
}

function getElementDescForm() {
   return getElementAreaSetting().find(
      DataAttrEnum.getSelector(DataAttrEnum.AREA_STG_DESC)
   );
}

function getElementNameButtonForm() {
   return getElementAreaSetting().find(
      DataAttrEnum.getSelector(DataAttrEnum.AREA_STG_BTN_TITLE)
   );
}

// ------------------------------------------------------------------
// values
// ------------------------------------------------------------------

function getValueNameButtonForm() {
   return getElementNameButtonForm().val();
}

function getValueDescForm() {
   return getElementDescForm().val();
}

function getValueTitleForm() {
   return getElementTitleForm().val();
}

function getValueTargetID() {
   return getElementTargetID().val() ?? '';
}