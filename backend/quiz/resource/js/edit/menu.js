import {
    getQuizID,
    hashCode,
    getDataFromQuesByTypeID,
} from './functions';
import * as AreaSetting from './AreaSetting';
import * as AreaQues from './AreaQues';
import {
    dd
} from './dev_func';
import * as DataAttrEnum from './DataAttrEnum';


/**
 * переключаем рабочие области area
 */
export function checkoutArea(anchor) {
    $('[data-anchor]').hide();
    $('[data-anchor="' + anchor + '"]').show();
}


/**
 * получить данные вопросов, настроек и заголовка
 */
export function getCascadData() {
    let data = {
        title: getTitleQuiz(),
        ques: getAllQuesData(),
        setting: AreaSetting.getAllDataAreaSetting(),
    };
    let hash = hashCode(JSON.stringify(data));
    data.hash = hash;
    data.id_quiz = getQuizID();
    return data;
}

// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// name
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

/**
 * получить заголовок квиза
 */
function getTitleQuiz() {
    return $(
        DataAttrEnum.getSelector(DataAttrEnum.TITLE_QUIZ)
    ).val() ?? '';
}

/**
 * собираем все данные из вопросов
 */
function getAllQuesData() {
    let data = [];
    let i = 0;
    AreaQues.getAllQuesMainWrp().each(function () {
        let ques = $(this);
        let type_id = AreaQues.getTypeID(ques);
        if (type_id == null) {
            dd('не определен type_id:', type_id, ques);
            return;
        }

        data[i] = getDataFromQuesByTypeID(ques, type_id);

        i++;
    });

    return data;
}
