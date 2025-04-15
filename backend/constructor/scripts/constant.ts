import TagsOptionColor from "@/classes/TagsOptionColor";
import TagsOptionString from "@/classes/TagsOptionString";
import SettingOption from "@/classes/SettingOption";
import TagsOption from "@/classes/TagsOption";
import TagsOptionNumeric from "@/classes/TagsOptionNumeric";
import TagsOptionPercent from "@/classes/TagsOptionPercent";
import TagsOptionPixel from "@/classes/TagsOptionPixel";
import TagsOptionSelect from "@/classes/TagsOptionSelect";
import TagsOptionsPackage from "@/classes/TagsOptionsPackage";
import TagsOptionSrc from "@/classes/TagsOptionSrc";
import { position_remake_string_to_percent_X } from "@/services/services";
import { position_remake_string_to_percent_Y } from "@/services/services";

export const DEFAULT_IMAGE = "/images/image.png";
export const DEFAULT_REF = "/";
export const DEFAULT_HTML = "";
export const VERSION_PATH = `/${window.version}/`;
export const IMAGES_PATH = `/${window.version}/constructor/images/`;
export const IMAGES_TAG_OPTIONS_PATH = `${IMAGES_PATH}Tag_options/`;
export const BOX_SHADOWS_PRESET = {
    flat: {
        name: "Плоская тень",
        shadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    soft: {
        name: "Мягкая тень с размытием",
        shadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    },
    tender: {
        name: "Нежняя внутренняя тень",
        shadow: "inset 0px 0px 6px rgba(0, 0, 0, 0.1)",
    },
    promising: {
        name: "Перспективная тень",
        shadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
    },
    stroke: {
        name: "Тень с обводкой",
        shadow: "0px 0px 0px 4px rgba(0, 0, 0, 0.1)",
    },
};

const border = [
    { value: "none", text: "Убрать", img: "" },
    { value: "hidden", text: "hidden", img: "" },
    { value: "dotted", text: "dotted", img: "" },
    { value: "dashed", text: "dashed", img: "" },
    { value: "solid", text: "solid", img: "" },
    { value: "groove", text: "groove", img: "" },
    { value: "double", text: "double", img: "" },
    { value: "ridge", text: "ridge", img: "" },
    { value: "inset", text: "inset", img: "" },
    { value: "outset", text: "outset", img: "" },
];
let overflow = [
    { value: "visible", text: "visible", img: "" },
    { value: "hidden", text: "hidden", img: "" },
    { value: "scroll", text: "scroll", img: "" },
    { value: "auto", text: "auto", img: "" },
];

export const variantSelectors = {
    "text-align": [
        {
            value: "left",
            text: "По левому",
            img: `<svg width="15" height="9" viewBox="0 0 15 9" fill="none"">
															<path d="M1.16667 1.50033C0.936548 1.50033 0.75 1.31378 0.75 1.08366C0.75 0.85354 0.936548 0.666992 1.16667 0.666992H13.6667C13.8968 0.666992 14.0833 0.85354 14.0833 1.08366C14.0833 1.31378 13.8968 1.50033 13.6667 1.50033H1.16667ZM1.16667 4.83366C0.936548 4.83366 0.75 4.64711 0.75 4.41699C0.75 4.18687 0.936548 4.00033 1.16667 4.00033H13.6667C13.8968 4.00033 14.0833 4.18687 14.0833 4.41699C14.0833 4.64711 13.8968 4.83366 13.6667 4.83366H1.16667ZM1.16667 8.16699C0.936548 8.16699 0.75 7.98044 0.75 7.75033C0.75 7.52021 0.936548 7.33366 1.16667 7.33366H8.66667C8.89679 7.33366 9.08333 7.52021 9.08333 7.75033C9.08333 7.98044 8.89679 8.16699 8.66667 8.16699H1.16667Z" fill="#C0C0C0"/>
														</svg>`,
        },
        {
            value: "center",
            text: "По центру",
            img: `<svg width="15" height="9" viewBox="0 0 15 9" fill="none"">
															<path d="M1.375 1.50033C1.13338 1.50033 0.9375 1.31378 0.9375 1.08366C0.9375 0.85354 1.13338 0.666992 1.375 0.666992H14.5C14.7416 0.666992 14.9375 0.85354 14.9375 1.08366C14.9375 1.31378 14.7416 1.50033 14.5 1.50033H1.375ZM4 4.83366C3.75838 4.83366 3.5625 4.64711 3.5625 4.41699C3.5625 4.18687 3.75838 4.00033 4 4.00033H11.875C12.1166 4.00033 12.3125 4.18687 12.3125 4.41699C12.3125 4.64711 12.1166 4.83366 11.875 4.83366H4ZM1.375 8.16699C1.13338 8.16699 0.9375 7.98044 0.9375 7.75033C0.9375 7.52021 1.13338 7.33366 1.375 7.33366H14.5C14.7416 7.33366 14.9375 7.52021 14.9375 7.75033C14.9375 7.98044 14.7416 8.16699 14.5 8.16699H1.375Z" fill="#C0C0C0"/>
														  </svg>`,
        },
        {
            value: "right",
            text: "По правому",
            img: `<svg width="15" height="9" viewBox="0 0 15 9" fill="none"">
														     	<path d="M1.375 1.50033C1.13338 1.50033 0.9375 1.31378 0.9375 1.08366C0.9375 0.85354 1.13338 0.666992 1.375 0.666992H14.5C14.7416 0.666992 14.9375 0.85354 14.9375 1.08366C14.9375 1.31378 14.7416 1.50033 14.5 1.50033H1.375ZM1.375 4.83366C1.13338 4.83366 0.9375 4.64711 0.9375 4.41699C0.9375 4.18687 1.13338 4.00033 1.375 4.00033H14.5C14.7416 4.00033 14.9375 4.18687 14.9375 4.41699C14.9375 4.64711 14.7416 4.83366 14.5 4.83366H1.375ZM6.625 8.16699C6.38338 8.16699 6.1875 7.98044 6.1875 7.75033C6.1875 7.52021 6.38338 7.33366 6.625 7.33366H14.5C14.7416 7.33366 14.9375 7.52021 14.9375 7.75033C14.9375 7.98044 14.7416 8.16699 14.5 8.16699H6.625Z" fill="#C0C0C0"/>
													      </svg>`,
        },
        {
            value: "justify",
            text: "По ширине",
            img: `<svg width="15" height="9" viewBox="0 0 15 9" fill="none"">
																<path d="M1.16667 1.50033C0.936548 1.50033 0.75 1.31378 0.75 1.08366C0.75 0.85354 0.936548 0.666992 1.16667 0.666992H13.6667C13.8968 0.666992 14.0833 0.85354 14.0833 1.08366C14.0833 1.31378 13.8968 1.50033 13.6667 1.50033H1.16667ZM1.16667 4.83366C0.936548 4.83366 0.75 4.64711 0.75 4.41699C0.75 4.18687 0.936548 4.00033 1.16667 4.00033H13.6667C13.8968 4.00033 14.0833 4.18687 14.0833 4.41699C14.0833 4.64711 13.8968 4.83366 13.6667 4.83366H1.16667ZM1.16667 8.16699C0.936548 8.16699 0.75 7.98044 0.75 7.75033C0.75 7.52021 0.936548 7.33366 1.16667 7.33366H13.6667C13.8968 7.33366 14.0833 7.52021 14.0833 7.75033C14.0833 7.98044 13.8968 8.16699 13.6667 8.16699H1.16667Z" fill="#C0C0C0"/>
														   </svg>`,
        },
    ],
    "font-family": [
        { value: "Futura New", text: "Futura New", img: "" }, //1
        { value: "Gilroy", text: "Gilroy", img: "" }, //2
        { value: "inter", text: "inter", img: "" }, //3
        { value: "Montserrat", text: "Montserrat", img: "" }, //4
        { value: "Open Sans", text: "Open Sans", img: "" }, //5
        { value: "Open Sans Condensed", text: "Open Sans Condensed", img: "" }, //6
        { value: "Playfair Display SC", text: "Playfair Display SC", img: "" }, //7
        { value: "Proxima Nova Cn Lt", text: "Proxima Nova Cn Lt", img: "" }, //8
        { value: "PT Serif", text: "PT Serif", img: "" }, //9
        { value: "Roboto", text: "Roboto", img: "" }, //10
        { value: "Rubik", text: "Rubik", img: "" }, //11
        { value: "Ubuntu", text: "Ubuntu", img: "" }, //12
        { value: "Yandex Sans Text", text: "Yandex Sans Text", img: "" }, //13
    ],
    "flex-direction": [
        { value: "row", text: "Cлева направо", img: "" },
        { value: "column", text: "Сверху вниз", img: "" },
        { value: "row-reverse", text: "Справа налево", img: "" },
        { value: "column-reverse", text: "Снизу вверх", img: "" },
    ],
    "align-items": [
        { value: "stretch", text: "Растянуть", img: "" },
        { value: "flex-start", text: "Над осью", img: "" },
        { value: "flex-end", text: "Под осью", img: "" },
        { value: "center", text: "По центру", img: "" },
        { value: "baseline", text: "По базовой линии", img: "" },
    ],
    "list-style-type": [
        {
            value: "armenian",
            text: "Традиционная армянская нумерация",
            img: "",
        },
        { value: "decimal", text: "Арабские числа (1, 2, 3, 4,...)", img: "" },
        {
            value: "decimal-leading-zero",
            text: "Арабские числа с нулем впереди для цифр меньше десяти (01, 02, 03,...)",
            img: "",
        },
        {
            value: "georgian",
            text: "Традиционная грузинская нумерация",
            img: "",
        },
        {
            value: "lower-alpha",
            text: "Строчные латинские буквы (a, b, c, d,...)",
            img: "",
        },
        {
            value: "lower-greek",
            text: "Строчные греческие буквы (α, β, γ, δ,...)",
            img: "",
        },
        {
            value: "lower-roman",
            text: "Римские числа в нижнем регистре (i, ii, iii, iv, v,...)",
            img: "",
        },
        {
            value: "upper-alpha",
            text: "Заглавные латинские буквы (A, B, C, D,...)",
            img: "",
        },
        {
            value: "upper-roman",
            text: "Римские числа в верхнем регистре (I, II, III, IV, V,...)",
            img: "",
        },
        { value: "none", text: "Убрать", img: "" },
    ],
    display: [
        { value: "none", text: "Убрать", img: "" },
        { value: "initial", text: "По умолчанию", img: "" },
        { value: "block", text: "Блочный", img: "" },
        { value: "inline", text: "Строчный", img: "" },
        { value: "inline-block", text: "Строчно-блочный", img: "" },
        { value: "flex", text: "Flex", img: "" },
    ],
    "justify-content": [
        { value: "normal", text: "normal", img: "" },
        { value: "start", text: "start", img: "" },
        { value: "center", text: "center", img: "" },
        { value: "space-between", text: "space-between", img: "" },
        { value: "space-around", text: "space-around", img: "" },
        { value: "space-evenly", text: "space-evenly", img: "" },
    ],
    "flex-wrap": [
        { value: "nowrap", text: "nowrap", img: "" },
        { value: "revert", text: "revert", img: "" },
        { value: "unset", text: "unset", img: "" },
        { value: "wrap", text: "wrap", img: "" },
        { value: "wrap-reverse", text: "wrap-reverse", img: "" },
    ],
    "background-repeat": [
        { value: "repeat-x", text: "repeat-x", img: "" },
        { value: "repeat", text: "repeat", img: "" },
        { value: "space", text: "space", img: "" },
        { value: "round", text: "round", img: "" },
        { value: "no-repeat", text: "no-repeat", img: "" },
        { value: "space repeat", text: "space repeat", img: "" },
    ],
    "text-transform": [
        { value: "capitalize", text: "Каждое слово с большой буквы", img: "" },
        { value: "uppercase", text: "Вверхний регистр", img: "" },
        { value: "lowercase", text: "Нижний регистр", img: "" },
        { value: "none", text: "Как есть", img: "" },
    ],
    "background-size": [
        { value: "cover", text: "cover", img: "" },
        { value: "contain", text: "contain", img: "" },
        { value: "auto", text: "auto", img: "" },
    ],
    "text-decoration": [
        { value: "none", text: "none", img: "" },
        { value: "underline", text: "underline", img: "" },
        { value: "wavy underline", text: "wavy", img: "" },
        { value: "underline dotted", text: "underline dotted", img: "" },
    ],
    "pointer-events": [
        { value: "auto", text: "auto", img: "" },
        { value: "none", text: "none", img: "" },
    ],
    cursor: [
        { value: "default", text: "default", img: "" },
        { value: "pointer", text: "pointer", img: "" },
    ],
    "align-content": [
        { value: "center", text: "center", img: "" },
        { value: "flex-start", text: "flex-start", img: "" },
        { value: "flex-end", text: "flex-end", img: "" },
        { value: "space-around", text: "space-around", img: "" },
        { value: "space-between", text: "space-between", img: "" },
        { value: "stretch", text: "stretch", img: "" },
    ],
    float: [
        { value: "left", text: "left", img: "" },
        { value: "right", text: "right", img: "" },
        { value: "none", text: "none", img: "" },
    ],
    position: [
        { value: "static", text: "static", img: "" },
        { value: "relative", text: "relative", img: "" },
        { value: "absolute", text: "absolute", img: "" },
        { value: "sticky", text: "sticky", img: "" },
    ],
    "object-fit": [
        { value: "none", text: "Убрать", img: "" },
        { value: "fill", text: "fill", img: "" },
        { value: "contain", text: "contain", img: "" },
        { value: "cover", text: "cover", img: "" },
    ],
    "word-break" : [
        { 'value': 'normal', 'text': 'По умолчанию', 'img': '', },
        { 'value': 'break-all', 'text': 'Переносить все(', 'img': '', },
        { 'value': 'break-word', 'text': 'Переносить слова', 'img': '', },
    ],
    "object-position": [
        { value: "center", text: "По центру", img: "" },
        { value: "top", text: "Сверху", img: "" },
        { value: "bottom", text: "Снизу", img: "" },
        { value: "left", text: "Слева", img: "" },
        { value: "right", text: "Справа", img: "" },
    ],
    "border-style": border,
    "border-top-style": border,
    "border-right-style": border,
    "border-left-style": border,
    "border-bottom-style": border,
    overflow: overflow,
    "overflow-y": [...overflow, { value: "clip", text: "clip", img: "" }],
    "overflow-x": [...overflow, { value: "clip", text: "clip", img: "" }],
};

// - Если имя не задано, то свойство не изменяется
export const nameOptionsTest = {
    "border-top-style": "Стиль сверху границы",
    "border-left-style": "Стиль слева границы",
    "border-right-style": "Стиль справа границы",
    "border-bottom-style": "Стиль снизу границы",

    "border-top-width": "Толщина границы сверху",
    "border-left-width": "Толщина границы слева",
    "border-right-width": "Толщина границы справа",
    "border-bottom-width": "Толщина границы снизу",

    "border-top-color": "Цвет границы сверху",
    "border-left-color": "Цвет границы слева",
    "border-right-color": "Цвет границы справа",
    "border-bottom-color": "Цвет границы снизу",

    "border-style": "Стиль границы",
    "border-width": "Толщина границы",
    "border-color": "Цвет границы",

    cursor: "Курсор",
    html_variant: "Тип блока",
    "text-align": "Выравнивание",
    "font-size": "Размер текста",
    "font-weight": "Насыщенность шрифта",
    src: "Изображение",
    href: "Ссылка",
    "pointer-events": "pointer-events",
    width: "Ширина",
    "min-width": "Минимальная ширина",
    "max-width": "Максимальная ширина",
    "text-decoration": "Нижняя черта для ссылок",
    height: "Высота",
    "min-height": "Минимальная высота",
    "max-height": "Максимальная высота",
    color: "Цвет текста",
    opacity: "Прозрачность",
    "background": "Градиент фона",
    "background-color": "Цвет фона",
    "background-image": "Картинка на фон",
    "background-repeat": "Повторение картинки",
    "background-position": "Позиция картинки",
    "object-position": "Позиция элемента",
    "background-position-x": "Позиция картинки по оси X",
    "background-position-y": "Позиция картинки по оси Y",
    "background-size": "Размер картинки",
    "flex-direction": "Направление элементов",
    "align-items": "Расположение вдоль оси напрваления",
    "border-radius": "Уголки",
    "margin-top": "Оступ сверху",
    "margin-bottom": "Оступ снизу",
    "margin-left": "Оступ слева",
    "margin-right": "Оступ справа",
    "padding-right": "Отступ внутри справа",
    "padding-left": "Отступ внутри слева",
    "padding-top": "Отступ внутри сверху",
    "padding-bottom": "Отступ внутри снизу",
    "list-style-type": "Нумерованный список",
    display: "Отображение",
    "justify-content": "justify-content",
    "flex-wrap": "flex-wrap",
    "flex-basis": "flex-basis",
    "text-transform": "text-transform",
    "li-array": "Изменить пункты списка",
    "align-content": "align-content",
    "overflow-x": "overflow-x",
    "overflow-y": "overflow-y",
    overflow: "overflow",
    position: "position",
    "z-index": "z-index",
    "border-bottom-left-radius": "border-bottom-left-radius",
    "border-bottom-right-radius": "border-bottom-right-radius",
    "border-top-right-radius": "border-top-right-radius",
    "border-top-left-radius": "border-top-left-radius",
    float: "float",
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
    "line-height": "line-height",
    "word-break" : "Пернеос слов"
};

export const unitOptionsTest = {
    src: "text",
    href: "text",
    "font-weight": "text",
    "background-image": "huy",
};

export const SettingOptionMap = {
    html_variant: function (name : string) : SettingOption{
        return new SettingOption("html_variant", name);
    },
};
export const TagOptionMap = function (index) {
    switch (index) {
        case EnumOption.RIGHT:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.RIGHT,
                        name: "right",
                        val: params.val,
                        extra_unit: ["auto"],
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.LEFT:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.LEFT,
                        name: "left",
                        extra_unit: ["auto"],
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BOTTOM:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BOTTOM,
                        name: "bottom",
                        val: params.val,
                        extra_unit: ["auto"],
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.TOP:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.TOP,
                        name: "top",
                        extra_unit: ["auto"],
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.LINE_HEIGHT:
            return function (params = {}) {
                return new TagsOptionNumeric(
                    {
                        unit: params.unit ?? "",
                        id: EnumOption.LINE_HEIGHT,
                        name: "line-height",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                    },
                    params.parent
                );
            };
        case EnumOption.Z_INDEX:
            return function (params = {}) {
                return new TagsOptionNumeric(
                    {
                        unit: params.unit ?? "",
                        id: EnumOption.Z_INDEX,
                        name: "z-index",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_BOTTOM_LEFT_RADIUS:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_BOTTOM_LEFT_RADIUS,
                        name: "border-bottom-left-radius",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_BOTTOM_RIGHT_RADIUS:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_BOTTOM_RIGHT_RADIUS,
                        name: "border-bottom-right-radius",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_TOP_RIGHT_RADIUS:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_TOP_RIGHT_RADIUS,
                        name: "border-top-right-radius",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_TOP_LEFT_RADIUS:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_TOP_LEFT_RADIUS,
                        name: "border-top-left-radius",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.POSITION:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.POSITION,
                        name: "position",
                        val: params.val ?? "relative",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.WORD_BREAK:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.WORD_BREAK,
                        name: "word-break",
                        val: params.val ?? "normal",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.FLOAT:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.FLOAT,
                        name: "float",
                        val: params.val ?? "none",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.OVERFLOW_Y:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.OVERFLOW_Y,
                        name: "overflow-y",
                        val: params.val ?? "visible",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                        extra_unit: ["auto"],
                    },
                    params.parent
                );
            };
        case EnumOption.ATTR:
            return function (params = {}) {
                return new TagsOption(
                    {
                        id: EnumOption.ATTR,
                        type: "attr",
                        name: params.name ?? "none",
                        val: params.val ?? "none",
                        title: params.title ?? "Атрибут",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.OVERFLOW_X:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.OVERFLOW_X,
                        name: "overflow-x",
                        val: params.val ?? "visible",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                        extra_unit: ["auto"],
                    },
                    params.parent
                );
            };
        case EnumOption.OVERFLOW:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.OVERFLOW,
                        name: "overflow",
                        val: params.val ?? "visible",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.ALIGN_CONTENT:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.ALIGN_CONTENT,
                        name: "align-content",
                        val: params.val ?? "center",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.IMAGE:
            return function (params = {}) {
                return new TagsOptionSrc(
                    {
                        //image
                        id: EnumOption.IMAGE,
                        val:
                            params.val ??
                            "https://avatars.mds.yandex.net/i?id=508b5cade7bd1d4b512bac7db98c41d333f96472-8492261-images-thumbs&n=13",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.FONT_SIZE:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.FONT_SIZE,
                        name: "font-size",
                        val: params.val ?? 20,
                        extra_unit: ["em", "rem"],
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.COLOR:
            return function (params = {}) {
                return new TagsOptionColor(
                    {
                        id: EnumOption.COLOR,
                        name: "color",
                        val: params.val ?? "#000000",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.HREF:
            return function (params = {}) {
                return new TagsOption(
                    {
                        id: EnumOption.HREF,
                        type: "attr",
                        name: "href",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.CURSOR:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.CURSOR,
                        name: "cursor",
                        val: params.val ?? "default",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.TEXT_DECORATION:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.TEXT_DECORATION,
                        name: "text-decoration",
                        val: params.val ?? "underline",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.OPACITY:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        unit: params.unit,
                        id: EnumOption.OPACITY,
                        type: "css",
                        name: "opacity",
                        val: params.val ?? "100",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.FONT_WEIGHT:
            return function (params = {}) {
                return new TagsOption(
                    {
                        id: EnumOption.FONT_WEIGHT,
                        type: "css",
                        name: "font-weight",
                        val: params.val ?? "normal",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.FONT_FAMILY:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.FONT_FAMILY,
                        type: "css",
                        name: "font-family",
                        val: params.val ?? "Futura New",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            }; 
        case EnumOption.BACKGROUND_GRADIENT:
            return function (params = {}) {
                return new TagsOptionString(
                    {
                        id: EnumOption.BACKGROUND_GRADIENT,
                        name: "background",
                        val: params.val ?? "linear-gradient(blue, pink)",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };    
        case EnumOption.BACKGROUND_COLOR:
            return function (params = {}) {
                return new TagsOptionColor(
                    {
                        id: EnumOption.BACKGROUND_COLOR,
                        name: "background-color",
                        val: params.val ?? "#ffffff",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BACKGROUND_IMAGE:
            return function (params = {}) {
                return new TagsOption(
                    {
                        id: EnumOption.BACKGROUND_IMAGE,
                        type: "css",
                        name: "background-image",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BACKGROUND_REPEAT:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.BACKGROUND_REPEAT,
                        name: "background-repeat",
                        val: params.val ?? "no-repeat",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BACKGROUND_POSITION_X:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        id: EnumOption.BACKGROUND_POSITION_X,
                        name: "background-position-x",
                        val:
                            position_remake_string_to_percent_X(params.val) ?? 50,
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BACKGROUND_POSITION_Y:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        id: EnumOption.BACKGROUND_POSITION_Y,
                        name: "background-position-y",
                        val:
                            position_remake_string_to_percent_Y(params.val) ?? 50,
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        /* case EnumOption.BACKGROUND_POSITION: return function(params = {}){return new TagsOptionSelect({
			id : EnumOption.BACKGROUND_POSITION,
			name: 'background-position',
			val: params.val ?? 'center',
			edit_option: params.edit_option ?? EnumEditOption.ADVANCED,
			show: params.show ?? null,
			hidden: params.hidden ?? null,
		}, params.parent)}; */
        case EnumOption.BACKGROUND_SIZE:
            return function (params = {}) {
                return new TagsOptionNumeric(
                    {
                        id: EnumOption.BACKGROUND_SIZE,
                        name: "background-size",
                        val: params.val ?? "cover",
                        unit: params.unit,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        extra_unit: ["auto", "cover", "contain"],
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.TEXT_ALIGN:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.TEXT_ALIGN,
                        name: "text-align",
                        val: params.val ?? "center",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.POINTER_EVENTS:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.POINTER_EVENTS,
                        name: "pointer-events",
                        val: params.val ?? "none",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        /* case EnumOption.BORDER_RADIUS: return function (params = {}){return new TagsOptionPixel({
			unit:params.unit,
			id : EnumOption.BORDER_RADIUS,
			name: 'border-radius',
			val: params.val ?? 5,
			edit_option: params.edit_option ?? EnumEditOption.EDITABLE
		}, params.parent)}; */
        case EnumOption.MARGIN_TOP:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.MARGIN_TOP,
                        name: "margin-top",
                        extra_unit: ["auto", "em", "rem"],
                        val: params.val ?? 5,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.MARGIN_BOTTOM:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.MARGIN_BOTTOM,
                        name: "margin-bottom",
                        extra_unit: ["auto", "em", "rem"],
                        val: params.val ?? 5,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.MARGIN_LEFT:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.MARGIN_LEFT,
                        name: "margin-left",
                        extra_unit: ["auto", "em", "rem"],
                        val: params.val ?? 5,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.MARGIN_RIGHT:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.MARGIN_RIGHT,
                        name: "margin-right",
                        extra_unit: ["auto", "em", "rem"],
                        val: params.val ?? 5,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.PADDING_TOP:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.PADDING_TOP,
                        name: "padding-top",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.PADDING_BOTTOM:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.PADDING_BOTTOM,
                        name: "padding-bottom",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.PADDING_RIGHT:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.PADDING_RIGHT,
                        name: "padding-right",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.PADDING_LEFT:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.PADDING_LEFT,
                        name: "padding-left",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        // START BORDER
        // TOP
        case EnumOption.BORDER_TOP_WIDTH:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_TOP_WIDTH,
                        name: "border-top-width",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_TOP_STYLE:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.BORDER_TOP_STYLE,
                        name: "border-top-style",
                        val: params.val ?? "solid",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_TOP_COLOR:
            return function (params = {}) {
                return new TagsOptionColor(
                    {
                        id: EnumOption.BORDER_TOP_COLOR,
                        name: "border-top-color",
                        val: params.val ?? "#000000",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        // LEFT
        case EnumOption.BORDER_LEFT_WIDTH:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_LEFT_WIDTH,
                        name: "border-left-width",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_LEFT_STYLE:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.BORDER_LEFT_STYLE,
                        name: "border-left-style",
                        val: params.val ?? "solid",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_LEFT_COLOR:
            return function (params = {}) {
                return new TagsOptionColor(
                    {
                        id: EnumOption.BORDER_LEFT_COLOR,
                        name: "border-left-color",
                        val: params.val ?? "#000000",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        // RIGHT
        case EnumOption.BORDER_RIGHT_WIDTH:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_RIGHT_WIDTH,
                        name: "border-right-width",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_RIGHT_STYLE:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.BORDER_RIGHT_STYLE,
                        name: "border-right-style",
                        val: params.val ?? "solid",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_STYLE:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.BORDER_STYLE,
                        name: "border-style",
                        val: params.val ?? "solid",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_COLOR:
            return function (params = {}) {
                return new TagsOptionColor(
                    {
                        id: EnumOption.BORDER_COLOR,
                        name: "border-color",
                        val: params.val ?? "#000000",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_WIDTH:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_WIDTH,
                        name: "border-width",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_RIGHT_COLOR:
            return function (params = {}) {
                return new TagsOptionColor(
                    {
                        id: EnumOption.BORDER_RIGHT_COLOR,
                        name: "border-right-color",
                        val: params.val ?? "#000000",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        // BOTTOM
        case EnumOption.BORDER_BOTTOM_WIDTH:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.BORDER_BOTTOM_WIDTH,
                        name: "border-bottom-width",
                        extra_unit: ["em", "rem"],
                        val: params.val ?? 0,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_BOTTOM_STYLE:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.BORDER_BOTTOM_STYLE,
                        name: "border-bottom-style",
                        val: params.val ?? "solid",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER_BOTTOM_COLOR:
            return function (params = {}) {
                return new TagsOptionColor(
                    {
                        id: EnumOption.BORDER_BOTTOM_COLOR,
                        name: "border-bottom-color",
                        val: params.val ?? "#000000",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        // END BORDER
        case EnumOption.FLEX_DIRECTION:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.FLEX_DIRECTION,
                        name: "flex-direction",
                        val: params.val ?? "row",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.ALIGN_ITEMS:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.ALIGN_ITEMS,
                        name: "align-items",
                        val: params.val ?? "center",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.LIST_STYLE_TYPE:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.LIST_STYLE_TYPE,
                        name: "list-style-type",
                        val: params.val ?? "none",
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.DISPLAY:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.DISPLAY,
                        name: "display",
                        val: params.val ?? "block",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED, // advanced
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.JUSTIFY_CONTENT:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.JUSTIFY_CONTENT,
                        name: "justify-content",
                        val: params.val ?? "start",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.WIDTH:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.WIDTH,
                        extra_unit: [
                            "auto",
                            "inherit",
                            "em",
                            "rem",
                            "vh",
                            "vw",
                        ],
                        name: "width",
                        val: params.val,

                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.WIDTH_PERCENT:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        unit: params.unit,
                        id: EnumOption.WIDTH_PERCENT,
                        name: "width",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.WIDTH_MIN_PERCENT:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        unit: params.unit,
                        id: EnumOption.WIDTH_MIN_PERCENT,
                        name: "min-width",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.WIDTH_MAX_PERCENT:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        unit: params.unit,
                        id: EnumOption.WIDTH_MAX_PERCENT,
                        name: "max-width",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.WIDTH_MIN:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.WIDTH_MIN,
                        name: "min-width",
                        val: params.val,
                        extra_unit: ["auto", "em", "rem", "vh", "vw"],
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.WIDTH_MAX:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.WIDTH_MAX,
                        name: "max-width",
                        val: params.val,
                        extra_unit: ["auto", "em", "rem", "vh", "vw"],
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.HEIGHT:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.HEIGHT,
                        name: "height",
                        val: params.val,
                        extra_unit: [
                            "auto",
                            "inherit",
                            "em",
                            "rem",
                            "vh",
                            "vw",
                        ],
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.HEIGHT_PERCENT:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        unit: params.unit,
                        id: EnumOption.HEIGHT_PERCENT,
                        name: "height",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.HEIGHT_MIN_PERCENT:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        unit: params.unit,
                        id: EnumOption.HEIGHT_MIN_PERCENT,
                        name: "min-height",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.HEIGHT_MAX_PERCENT:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        unit: params.unit,
                        id: EnumOption.HEIGHT_MAX_PERCENT,
                        name: "max-height",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.HEIGHT_MIN:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.HEIGHT_MIN,
                        name: "min-height",
                        val: params.val,
                        extra_unit: ["auto", "em", "rem", "vh", "vw"],
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.HEIGHT_MAX:
            return function (params = {}) {
                return new TagsOptionPixel(
                    {
                        unit: params.unit,
                        id: EnumOption.HEIGHT_MAX,
                        name: "max-height",
                        val: params.val,
                        extra_unit: ["auto", "em", "rem", "vh", "vw"],
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                    },
                    params.parent
                );
            };
        case EnumOption.FLEX_WRAP:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.FLEX_WRAP,
                        name: "flex-wrap",
                        val: params.val ?? "inherit",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.FLEX_BASIS:
            return function (params = {}) {
                return new TagsOptionPercent(
                    {
                        unit: params.unit,
                        id: EnumOption.FLEX_BASIS,
                        name: "flex-basis",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                    },
                    params.parent
                );
            };
        case EnumOption.TEXT_TRANSFORM:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.TEXT_TRANSFORM,
                        name: "text-transform",
                        val: params.val,
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BACKGROUND_POSITION:
            return function (params = {}) {
                return new TagsOptionsPackage([
                    TagOptionMap(EnumOption.BACKGROUND_POSITION_X)({
                        val: Array.isArray(params.val)
                            ? params.val[0]
                            : params.val,
                        parent: params.parent,
                        edit_option: params.edit_option,
                    }),
                    TagOptionMap(EnumOption.BACKGROUND_POSITION_Y)({
                        val: Array.isArray(params.val)
                            ? params.val[1]
                            : params.val,
                        parent: params.parent,
                        edit_option: params.edit_option,
                    }),
                ]);
            };
        case EnumOption.OBJECT_POSITION:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.OBJECT_POSITION,
                        name: "object-position",
                        val: params.val ?? "center",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.OBJECT_FIT:
            return function (params = {}) {
                return new TagsOptionSelect(
                    {
                        id: EnumOption.OBJECT_FIT,
                        name: "object-fit",
                        val: params.val ?? "contain",
                        edit_option:
                            params.edit_option ?? EnumEditOption.ADVANCED,
                        show: params.show ?? null,
                        hidden: params.hidden ?? null,
                    },
                    params.parent
                );
            };
        case EnumOption.BORDER:
            return function (params = {}) {
                return new TagsOptionsPackage([
                    // TagOptionMap(EnumOption.BORDER_TOP)({
                    // 	unit:params.unit,
                    // 	val: params.val,
                    // 	parent : params.parent,
                    // }),
                    // TagOptionMap(EnumOption.BORDER_BOTTOM)({
                    // 	unit:params.unit,
                    // 	val: params.val,
                    // 	parent : params.parent,
                    // }),
                    // TagOptionMap(EnumOption.BORDER_LEFT)({
                    // 	unit:params.unit,
                    // 	val: params.val,
                    // 	parent : params.parent,
                    // }),
                    // TagOptionMap(EnumOption.BORDER_RIGHT)({
                    // 	unit:params.unit,
                    // 	val: params.val,
                    // 	parent : params.parent,
                    // }),
                    TagOptionMap(EnumOption.BORDER_WIDTH)({
                        unit: params.unit,
                        val: params.val[0] ?? 1,
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_STYLE)({
                        val: params.val[1] ?? "solid",
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_COLOR)({
                        val: params.val[2] ?? "#000000",
                        parent: params.parent,
                    }),
                ]);
            };
        case EnumOption.BORDER_RADIUS:
            return function (params = {}) {
                params.val = params.val ?? 5;
                return new TagsOptionsPackage([
                    TagOptionMap(EnumOption.BORDER_BOTTOM_LEFT_RADIUS)({
                        unit: params.unit,
                        val: params.val[0] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.BORDER_BOTTOM_RIGHT_RADIUS)({
                        unit: params.unit,
                        val: params.val[1] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.BORDER_TOP_LEFT_RADIUS)({
                        unit: params.unit,
                        val: params.val[2] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.BORDER_TOP_RIGHT_RADIUS)({
                        unit: params.unit,
                        val: params.val[3] ?? params.val,
                        parent: params.parent,
                    }),
                ]);
            };
        case EnumOption.BORDER_TOP:
            return function (params = {}) {
                return new TagsOptionsPackage([
                    TagOptionMap(EnumOption.BORDER_TOP_WIDTH)({
                        unit: params.unit,
                        val: params.val[0] ?? 1,
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_TOP_STYLE)({
                        val: params.val[1] ?? "solid",
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_TOP_COLOR)({
                        val: params.val[2] ?? "#000000",
                        parent: params.parent,
                    }),
                ]);
            };
        case EnumOption.BORDER_LEFT:
            return function (params = {}) {
                return new TagsOptionsPackage([
                    TagOptionMap(EnumOption.BORDER_LEFT_WIDTH)({
                        unit: params.unit,
                        val: params.val[0] ?? 1,
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_LEFT_STYLE)({
                        val: params.val[1] ?? "solid",
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_LEFT_COLOR)({
                        val: params.val[2] ?? "#000000",
                        parent: params.parent,
                    }),
                ]);
            };
        case EnumOption.BORDER_RIGHT:
            return function (params = {}) {
                return new TagsOptionsPackage([
                    TagOptionMap(EnumOption.BORDER_RIGHT_WIDTH)({
                        unit: params.unit,
                        val: params.val[0] ?? 1,
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_RIGHT_STYLE)({
                        val: params.val[1] ?? "solid",
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_RIGHT_COLOR)({
                        val: params.val[2] ?? "#000000",
                        parent: params.parent,
                    }),
                ]);
            };
        case EnumOption.BORDER_BOTTOM:
            return function (params = {}) {
                return new TagsOptionsPackage([
                    TagOptionMap(EnumOption.BORDER_BOTTOM_WIDTH)({
                        unit: params.unit,
                        val: params.val[0] ?? 1,
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_BOTTOM_STYLE)({
                        val: params.val[1] ?? "solid",
                        parent: params.parent,
                    }),

                    TagOptionMap(EnumOption.BORDER_BOTTOM_COLOR)({
                        val: params.val[2] ?? "#000000",
                        parent: params.parent,
                    }),
                ]);
            };
        case EnumOption.PADDING: //TODO Добавить поддержку noneditable
            return function (params = {}) {
                return new TagsOptionsPackage([
                    TagOptionMap(EnumOption.PADDING_TOP)({
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        unit: params.unit,
                        val: params.val[0] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.PADDING_RIGHT)({
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        unit: params.unit,
                        val: params.val[1] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.PADDING_BOTTOM)({
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        unit: params.unit,
                        val: params.val[2] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.PADDING_LEFT)({
                        edit_option:
                            params.edit_option ?? EnumEditOption.EDITABLE,
                        unit: params.unit,
                        val: params.val[3] ?? params.val,
                        parent: params.parent,
                    }),
                ]);
            };
        case EnumOption.MARGIN: //TODO Добавить поддержку noneditable
            return function (params = {}) {
                return new TagsOptionsPackage([
                    TagOptionMap(EnumOption.MARGIN_TOP)({
                        unit: params.unit,
                        val: params.val[0] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.MARGIN_RIGHT)({
                        unit: params.unit,
                        val: params.val[1] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.MARGIN_BOTTOM)({
                        unit: params.unit,
                        val: params.val[2] ?? params.val,
                        parent: params.parent,
                    }),
                    TagOptionMap(EnumOption.MARGIN_LEFT)({
                        unit: params.unit,
                        val: params.val[3] ?? params.val,
                        parent: params.parent,
                    }),
                ]);
            };
        default:
            return false;
    }
};
