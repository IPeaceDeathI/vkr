import * as AreaQues from './AreaQues';

/**
 */
export function execSortableQ1() {
   $('[data-q1-list-sortable]').sortable({
      items: '[data-ques-item]',
      handle: '[data-q1-sortable]',
   });
   $('[data-q1-list-sortable]').disableSelection();
}

/**
 */
export function execSortableQ2() {
   $('[data-q2-list-sortable]').sortable({
      items: '[data-ques-item]',
      handle: '[data-q2-sortable]',
   });
   $('[data-q2-list-sortable]').disableSelection();
}

export function execSortableQues() {
   $('[data-anchor="#ques"]').sortable({
      items: '[data-ques-main-wrp]',
      handle: '[data-ques-drag]',
      update: function (event, ui) {
         AreaQues.refreshPositionAllQues();
      }
   });
   $('[data-anchor="#ques"]').disableSelection();
}