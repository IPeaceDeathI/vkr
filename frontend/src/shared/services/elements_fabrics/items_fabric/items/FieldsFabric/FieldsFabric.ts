import {
    EmailFieldParams,
    FieldTypes,
    NameFieldParams,
    PhoneFieldParams,
    TextFieldParams,
    SliderFieldParams,
    CheckboxFieldParams,
    RadioFieldParams,
    SelectFieldParams,
} from "@/types";

type FieldSelectMenuParams = {
    readonly name: string;
    readonly icon: string;
};

interface FieldsFabric {
    [FieldTypes.text]: FieldSelectMenuParams & { params: TextFieldParams };
    [FieldTypes.name]: FieldSelectMenuParams & { params: NameFieldParams };
    [FieldTypes.email]: FieldSelectMenuParams & { params: EmailFieldParams };
    [FieldTypes.phone]: FieldSelectMenuParams & { params: PhoneFieldParams };
    [FieldTypes.slider]: FieldSelectMenuParams & { params: SliderFieldParams };
    [FieldTypes.select]: FieldSelectMenuParams & { params: SelectFieldParams };
    [FieldTypes.radio]: FieldSelectMenuParams & { params: RadioFieldParams };
    [FieldTypes.checkbox]: FieldSelectMenuParams & {
        params: CheckboxFieldParams;
    };
}

export const FieldsFabric: FieldsFabric = {
    [FieldTypes.name]: {
        name: "Имя",
        icon: "mdi-account-outline",
        params: {
            type: FieldTypes.name,
            title: "Имя",
            description: "",
            required: false,
        },
    },
    [FieldTypes.phone]: {
        name: "Телефон",
        icon: "mdi-cellphone",
        params: {
            type: FieldTypes.phone,
            title: "Телефон",
            description: "",
            required: true,
            mask: {
                enabled: true,
                baseMask: "+{7}(000)000-00-00",
                useCustomMask: false,
                customMask: "",
                showMaskFormat: false,
            },
        },
    },
    [FieldTypes.email]: {
        name: "Почта",
        icon: "mdi-email-outline",
        params: {
            type: FieldTypes.email,
            title: "Почта",
            description: "",
            required: true,
        },
    },
    [FieldTypes.text]: {
        name: "Текст",
        icon: "mdi-format-text",
        params: {
            type: FieldTypes.text,
            title: "Текст",
            description: "",
            required: false,
            mask: {
                enabled: false,
                value: "",
            },
        },
    },
    [FieldTypes.slider]: {
        name: "Ползунок",
        icon: "mdi-tune-variant",
        params: {
            type: FieldTypes.slider,
            title: "Ползунок",
            description: "",
            required: false,
            from: 0,
            to: 100,
            step: 10,
            unit: {
                enable: false,
                prefix: "",
                suffix: "",
            },
            enableRange: false,
            showValue: {
                type: "limits",
                extremeParams: {
                    enableTextDescription: true,
                    left: "От",
                    right: "До",
                },
            },
        },
    },
    [FieldTypes.checkbox]: {
        name: "Галочка",
        icon: "mdi-checkbox-marked-outline",
        params: {
            type: FieldTypes.checkbox,
            title: "Галочка",
            description: "",
            required: false,
            selectDefault: false,
        },
    },
    [FieldTypes.radio]: {
        name: "Выбор",
        icon: "mdi-radiobox-marked",
        params: {
            type: FieldTypes.radio,
            title: "Выбор",
            description: "",
            required: false,
            indexSelectedRadio: 0,
            radioBtn: ["Вариант 1", "Вариант 2"],
        },
    },
    [FieldTypes.select]: {
        name: "Список",
        icon: "mdi-form-select",
        params: {
            type: FieldTypes.select,
            title: "Список",
            description: "",
            required: false,
            options: ["Вариант 1", "Вариант 2"],
        },
    },
};
