import * as AreaQues from './AreaQues';

export const ENV = {
    choice_clone: null,
    area: AreaQues.getAreaQues(),
    default_target: 'form_send',
    /**
     * временное хранение удаленных вопросов
     */
    trash: [],
    quiz_id: null,

    /**
     * значения из БД
     */
    edit_ques: null,
    /**
     * значения из БД
     */
    edit_setting: null,
    types: [],
};