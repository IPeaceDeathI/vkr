import {
   tempDisabledElem,
   redirect,
   getQuizID,
   redirectActionEdit,
} from './functions';
import {
   ENV,
} from './Env';
import {
   _,
} from './_';
import {
   confirmQuiz,
   confirmNotice,
} from './confirm';

// ------------------------------------------------------------------
// ___
// ------------------------------------------------------------------

export function ajaxDeleteQuiz($el) {
   tempDisabledElem($el, true);
   $.ajax({
      dataType: 'json',
      url: '/api/quiz/' + getQuizID(),
      method: 'DELETE',
      success: (response) => {
         if (response.status) redirect(window.location.origin + '/quiz');
         else confirmNotice(Object.values(response.errors).join('<br>'));
         tempDisabledElem($el, false);
      },
      error: () => confirmNotice(_[500]),
   });
}

/**
 * Сохранить квиз
 */
export function sendCascadData(data, $el) {
   tempDisabledElem($el, true);
   $.ajax({
      url: '/api/quiz/save/quiz',
      dataType: 'json',
      method: 'POST',
      data: {
         data: JSON.stringify(data),
      },
      success: function (response) {
         // для конструктора
         $('body').append('<div data-success = "true" style="display:none"><div>')
         ENV.quiz_id = response.data.id_quiz;
         tempDisabledElem($el, false);
         confirmQuiz(_.save, () => redirectActionEdit(ENV.quiz_id));
      },
      error: function (response) {
         // для конструктора
         $('body').append('<div data-success = "false" style="display:none"><div>')
         confirmNotice(_[500]);
         // для конструктора
         $('body').append('<div data-success = "false" style="display:none"><div>')
         confirmNotice(Object.values(response.errors).join('<br>'))
         tempDisabledElem($el, false);
         return;
      }
   });
}