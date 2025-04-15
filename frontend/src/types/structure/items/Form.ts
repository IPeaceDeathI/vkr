import {
    ColumnCols,
    ElementsJustify,
    EventTypes,
    Events,
    FlexDirection,
    GoalsParams,
} from "@/types";
import { CommonItemsParams, ItemTypes } from "./_common";
import { ItemButtonStylesParams } from "./Button";

interface FieldsMap {
    [key: string]: FieldParams;
}

//FORM
export interface ItemFormParams extends CommonItemsParams {
    type: ItemTypes.form;
    fields: FieldsMap;
    fieldsGrid: Array<Array<false | id>>;
    columnCols: Array<ColumnCols>; //пока не работает
    inputsStyle: FormInputStyles;
    justify: ElementsJustify;
    flexDirection: FlexDirection;
    buttonText: string;
    buttonStyles: ItemButtonStylesParams;
    //DEVELOP
    settings: {
        events: Events<EventTypes.afterFormSend>;
        goals: { formName: string } & GoalsParams;
    };
    //END DEVELOP
}
export enum FormInputStyles {
    fill = "style-filled",
    transparent = "style-transparent",
    underlined = "style-underlined",
}
//Должен совпадать с названием компонентов полей
export enum FieldTypes {
    text = "text-field",
    name = "name-field",
    email = "email-field",
    phone = "phone-field",
    slider = "slider-field",
    checkbox = "checkbox-field",
    select = "select-field",
    radio = "radio-field",
}
export type FieldParams =
    | TextFieldParams
    | NameFieldParams
    | EmailFieldParams
    | SliderFieldParams
    | CheckboxFieldParams
    | RadioFieldParams
    | SelectFieldParams
    | PhoneFieldParams;
export type TextFieldParams = CommonFieldsParams & {
    type: FieldTypes.text;
    mask: {
        enabled: boolean;
        value: string;
    };
};
export type NameFieldParams = CommonFieldsParams & {
    type: FieldTypes.name;
};
export type EmailFieldParams = CommonFieldsParams & {
    type: FieldTypes.email;
};
export type CheckboxFieldParams = CommonFieldsParams & {
    type: FieldTypes.checkbox;
    selectDefault: boolean;
};
export type SliderFieldParams = CommonFieldsParams & {
    type: FieldTypes.slider;
    from: number;
    to: number;
    step: number;
    unit: {
        enable: boolean;
        prefix: string;
        suffix: string;
    };
    enableRange: boolean;
    showValue: {
        type: "hidden" | "limits" | "complex";
        extremeParams: {
            enableTextDescription: boolean;
            left: string;
            right: string;
        };
    };
};
export type PhoneFieldParams = CommonFieldsParams & {
    type: FieldTypes.phone;
    mask: {
        enabled: boolean;
        useCustomMask: boolean;
        customMask: string;
        baseMask: "+{7}(000)000-00-00";
        showMaskFormat: boolean;
    };
};
export type RadioFieldParams = CommonFieldsParams & {
    type: FieldTypes.radio;
    indexSelectedRadio: number;
    radioBtn: Array<string>;
};
export type SelectFieldParams = CommonFieldsParams & {
    type: FieldTypes.select;
    options: Array<string>;
};
export type CommonFieldsParams = {
    type: FieldTypes;
    title: string;
    description: string;
    required: boolean;
};
