function set_iframe(_class) {
    return `<iframe class="${_class}" src="" frameborder="0" scrolling="auto" allow="autoplay"></iframe>`;
}

let BLOCKS = [];
// КОНЕЦ ФИКСОВЫ
const EnumLiTargeting = {
    STRING: "42441fsdlfjfs1131",
    IMAGE: "79794hwddaddr44da",
    HREF: "9801284asjdada113",
    HTML: "fpjoicncc941fsfxd",
};
const EnumEditOption = {
    EDITABLE: 0,
    NONEDITABLE: 1,
    ADVANCED: 2,
};

const TagOptionsType = {
    DESKTOP: 0,
    TABLET: 1,
    MOBILE: 2,
    COMMON: 3,
};
const EnumTargetAttr = {
    FORM: "n-form-target",
    FORM_TEXT: "n-form-text-targer",
    FORM_TEL: "n-form-tel-targer",
};
//+ - добавлен в новое меню
//-! - не добавлен в новое мени и не добавиться
///////////////////////////////////////// - пока не добавлен в меню
const EnumOption = {
    IMAGE: "image", //+
    FONT_SIZE: "font-size", //+
    COLOR: "color", //+
    HREF: "href", //+
    TEXT_DECORATION: "text-decoration", //+
    OPACITY: "opacity", //+
    FONT_WEIGHT: "font-weight", //+
    BACKGROUND: "background", // -
    BACKGROUND_COLOR: "background-color", // 7//background-color  //+
    BACKGROUND_IMAGE: "background-image", // 8//background-image  //+
    BACKGROUND_REPEAT: "background-repeat", // 9,//background-repeat  //+
    BACKGROUND_POSITION: "background-position", // 10,//background-position  //+
    BACKGROUND_SIZE: "background-size", // 11,//background-size  //+
    TEXT_ALIGN: "text-align", // 12,//text-align //+
    POINTER_EVENTS: "pointer-events", // 13,//pointer-events  //+
    MARGIN_TOP: "margin-top", // 15,//margin-top  //+
    MARGIN_BOTTOM: "margin-bottom", // 16,//margin-bottom  //+
    MARGIN_LEFT: "margin-left", // 17,//margin-left  //+
    MARGIN_RIGHT: "margin-right", // 18,//margin-right  //+
    PADDING_TOP: "padding-top", // 19,//padding-top  //+
    PADDING_BOTTOM: "padding-bottom", // 20,//padding-bottom  //+
    PADDING_RIGHT: "padding-right", // 21,//padding-right  //+
    PADDING_LEFT: "padding-left", // 22,//padding-left  //+
    BORDER_TOP_WIDTH: "border-top-width", // 23,//border-top-width  ..-!
    BORDER_TOP_STYLE: "border-top-style", // 24,//border-top-style  ..-!
    BORDER_TOP_COLOR: "border-top-color", // 25,//border-top-color  ..-!
    BORDER_LEFT_WIDTH: "border-left-width", // 26,//border-left-width  ..-!
    BORDER_LEFT_STYLE: "border-left-style", // 27,//border-left-style  ..-!
    BORDER_LEFT_COLOR: "border-left-color", // 28,//border-left-color  ..-!
    BORDER_RIGHT_WIDTH: "border-right-width", // 29,//border-right-width  ..-!
    BORDER_RIGHT_STYLE: "border-right-style", // 30,//border-right-style  ..-!
    BORDER_RIGHT_COLOR: "border-right-color", // 31,//border-right-color  ..-!
    BORDER_BOTTOM_WIDTH: "border-bottom-width", // 32,//border-bottom-width  ..-!
    BORDER_BOTTOM_STYLE: "border-bottom-style", // 33,//border-bottom-style  ..-!
    BORDER_BOTTOM_COLOR: "border-bottom-color", // 34,//border-bottom-color  ..-!
    FLEX_DIRECTION: "flex-direction", // 35,//flex-direction  //+
    ALIGN_ITEMS: "align-items", // 36,//align-items  //+
    LIST_STYLE_TYPE: "list-style-type", // 37,//list-style-type  //////////////////////////////////
    DISPLAY: "display", // 38,//display //+
    JUSTIFY_CONTENT: "justify-content", // 39,//justify-content  //+
    WIDTH: "width", // 40,//width  //+
    HEIGHT: "height", // 41,//height  //+
    FLEX_WRAP: "flex-wrap", // 42,//flex-wrap  //+
    FLEX_BASIS: "flex-basis", // 43,//flex-basis  //+
    TEXT_TRANSFORM: "text-transform", // 44,//text-transform //+
    Z_INDEX: "z-index", //52, //+
    TOP: "top", // 53,  //+
    BOTTOM: "bottom", // 54,  //-!
    LEFT: "left", //55,  //+
    RIGHT: "right", // 56 //-!
    BACKGROUND_POSITION_X: "background-position-x", // 57,  //+
    BACKGROUND_POSITION_Y: "background-position-y", //58  //+
    LINE_HEIGHT: "line-height", // 59 //+
    HEIGHT_MIN: "height-min", // 71,  //+
    HEIGHT_MAX: "height-max", //72,  //+
    WIDTH_MIN: "width-min", //73 //+
    WIDTH_MAX: "width-max", //74 //+
    CURSOR: "cursor", // 75,  //+
    ALIGN_CONTENT: "align-content", //76  //+
    OVERFLOW: "overflow", //77  //+
    OVERFLOW_X: "overflow-x", //78,  //+
    OVERFLOW_Y: "overflow-y", // 79,  //+
    FLOAT: "float", //79 //+
    BORDER_TOP_LEFT_RADIUS: "border-top-left-radius", // 82,  //+
    BORDER_TOP_RIGHT_RADIUS: "border-top-right-radius", // 83,  //+
    BORDER_BOTTOM_RIGHT_RADIUS: "border-bottom-right-radius", //84,  //+
    BORDER_BOTTOM_LEFT_RADIUS: "border-bottom-left-radius", // 85,  //+
    FONT_FAMILY: " font-family", // 86,  //////////////////////////////////
    ATTR: "attr", // 87,  //+
    BORDER_COLOR: "border-color", //88,  //+
    BORDER_WIDTH: "border-width", //89,  //+
    BORDER_STYLE: "border-style", //90,  //+
    OBJECT_FIT: "object-fit", // 91, //+
    POSITION: " position", //1008,  //+
    WORD_BREAK: "word-break", //-
    OBJECT_POSITION: "object-position", //+
    BACKGROUND_GRADIENT: "background", // +/-
    // ----------------------------------------------------
    PADDING: "padding", // 1000,//padding
    MARGIN: "margin", // 1001,//margin
    WIDTH_PERCENT: "width-percent", // 1002,//WIDTH_PERCENT
    HEIGHT_PERCENT: "height-percent", // 1003,//WIDTH_PERCENT
    WIDTH_MIN_PERCENT: "width-min-percent", //1004,
    WIDTH_MAX_PERCENT: "width-max-percent", //1005,
    HEIGHT_MIN_PERCENT: "height-min-percent", //1006,
    HEIGHT_MAX_PERCENT: "height-max-percent", //1007,
    BORDER: "border", // 1009,//border
    BORDER_TOP: "border-top", // 1010,//border-top
    BORDER_BOTTOM: "border-bottom", // 1011,//border-bottom
    BORDER_LEFT: "border-left", // 1012,//border-left
    BORDER_RIGHT: "border-right", // 1013,//border-right
    BORDER_TOP: "border-top", // 1014,//border-top
    BORDER_RADIUS: "border-radius", // 1015,//border-radius
};
const EnumCategories = {
    COVER: 1, //  ОБЛОЖКА
    ABOUT_THE_PROJECT: 2, //  О ПРОЕКТЕ
    HEADING: 3, //  ЗАГОЛОВОК
    TEXT_BLOCK: 4, //  ТЕКСТОВЫЙ БЛОК
    IMAGE: 5, //  ИЗОБРАЖЕНИЕ
    GALLERY: 6, //  ГАЛЕРЕЯ
    FORMS: 7, //  ФОРМА
    BUTTON: 8, //  КНОПКА
    BENEFITS: 9, //  ПРЕИМУЩЕСТВА
    COLUMNS: 10, //  КОЛОНКИ
    MENU: 11, //  МЕНЮ
    SHOP: 12, //  МАГАЗИН
    SEPARATOR: 13, //  РАЗДЕЛИТЕЛЬ
    LIST_OF_PAGES: 14, //  СПИСОК СТРАНИЦ
    FOOTER: 15, //  ПОДВАЛ
    VIDEO: 16, //  ВИДЕО
    TEAM: 17, //  КОМАНДА
    REVIEWS: 18, //  ОТЗЫВЫ
    SCHEDULE: 19, //  РАСПИСАНИЕ
    STAGES: 20, //  ЭТАПЫ
    CONTACTS: 21, //  КОНТАКТЫ
    SERVICES: 22, //  УСЛУГИ
    SOC_NETWORKS: 23, //  СОЦ. СЕТИ
    RATES: 24, //  ТАРИФЫ
    PARTNERS: 25, //  ПАРТНЕРЫ
    LISTS: 26, //  СПИСКИ
    CALCULATE: 27, //  КАЛЬКУЛЯТОР
    OTHER: 99, //  ДРУГОЕ
};
const EnumFrameContent = {
    QUIZ: "quiz",
    FORM: "form",
};
const EnumInitialId = {
    BLOCKS: 1,
    INSIDE_FORM: 10000,
};
const EnumMaxId = {
    BLOCKS: 5000,
    INSIDE_FORM: 20000,
};
