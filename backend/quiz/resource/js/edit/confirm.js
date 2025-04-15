import {
   _,
} from './_';

export function confirmQuiz(errors, callback = null) {
   if (callback == null) callback = function () { };
   defaultConfirm({
      content: errors,
      buttons: {
         ok: {},
      },
      onClose: callback,
   })
}

export function checkDelete(callback_yes) {
   defaultConfirm({
      content: _.confirm_check_delete,
      buttons: {
         'да': {
            action: callback_yes,
         },
         'нет': {
            action: () => { }
         },
      },
   });
}

export function confirmNotice(msg) {
   return defaultConfirm({
      content: msg,
      buttons: {
         ok: {
            action: () => { },
         },
      },
   });
}

// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// not import
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

function defaultConfirm(params) {
   let default_params = {
      // разрешить скрытие окна по клику на затемнение
      backgroundDismiss: true,
      boxWidth: "30%",
      useBootstrap: false,
      // заголовок сообщения
      title: "",
      // текст сообщения
      content: "",
      // кнопки
      buttons: {},
   };
   // на все кнопки по дефолтру ставим наш класс
   for (let [key, value] of Object.entries(params.buttons ?? {})) {
      params.buttons[key].btnClass = "btn-noks-yes";
   }
   return $.confirm({ ...default_params, ...params });
}