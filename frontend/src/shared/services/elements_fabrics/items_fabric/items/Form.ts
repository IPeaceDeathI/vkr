import {
    ItemTypes,
    ItemFormParams,
    FormInputStyles,
    FlexDirection,
    ElementsJustify,
    EventTypes,
    ActionTypes,
    MainGoals,
} from "@/types";
import { ItemsFabric } from "../ItemsFabric";
import { FieldsFabric } from "./FieldsFabric";
import { cssVariable } from "@/shared/constants/default_values";
import {
    collectMobileStyle,
    collectStyle,
    styleGenerator,
} from "@/shared/services";
import { Item } from "./Item";
import { getDefaultGoalsParams } from "../../commonParams";

export class Form extends Item {
    protected static instance: Form;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Form.instance) {
            Form.instance = new Form();
            // ... здесь единожды выполняется инициализация ...
        }
        return Form.instance;
    }
    public getType(): ItemTypes.form {
        return ItemTypes.form;
    }
    public getName() {
        return "Форма";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/form.jpg`;
    }
    public getDefaultItemParams(): ItemFormParams {
        return {
            ...this.getItemCommonParams(this.getType()),
            type: this.getType(),
            inputsStyle: FormInputStyles.fill,
            fields: {
                odwjwo: structuredClone(FieldsFabric["name-field"].params),
                "54534543": structuredClone(FieldsFabric["phone-field"].params),
            },
            fieldsGrid: [["odwjwo"], ["54534543"]],
            columnCols: [],
            flexDirection: FlexDirection.column,
            justify: ElementsJustify.center,
            buttonText: "Отправить",
            buttonStyles: {
                ...ItemsFabric.getInstance()
                    .getItem(ItemTypes.button)
                    .getDefaultItemParams("1323").styles,
                borderRadius: {
                    enabled: true,
                    value: {
                        tl: 5,
                        tr: 5,
                        bl: 5,
                        br: 5,
                    },
                },
            },
            settings: {
                events: [
                    {
                        [EventTypes.afterFormSend]: {
                            [ActionTypes.showSnackbar]: "Заявка отправлена",
                        },
                    },
                ],
                goals: {
                    ...getDefaultGoalsParams(),
                    formName: "Форма",
                    mainGoal: MainGoals.order,
                },
            },
        };
    }

    public getStyles(params: ItemFormParams) {
        return (
            this.getItemCommonStyles(params) +
            styleGenerator([
                {
                    cssVariable: cssVariable.zoneContentJustify,
                    value: params.justify,
                },
                {
                    cssVariable: cssVariable.flexDirection,
                    value: params.flexDirection,
                },
                {
                    cssVariable: cssVariable.elementsAlign,
                    value: params.justify,
                },
            ])
        );
    }
    public getMobileStyles(params: ItemFormParams) {
        return this.getMobileItemCommonStyles(params);
    }
    public getFormButtonStyles(params: ItemFormParams): string {
        const BUTTON = ItemsFabric.getInstance().getItem(ItemTypes.button);
        return BUTTON.getByStylesParams(params.buttonStyles);
    }
    public getFormButtonStylesMobile(params: ItemFormParams): string {
        const BUTTON = ItemsFabric.getInstance().getItem(ItemTypes.button);
        return BUTTON.getByStylesParamsMobile(params.buttonStyles);
    }
    public getAdditionalCombinedStyles(id: id, params: ItemFormParams): string {
        const mainSelector = this.getDataElementSelector(id);
        const buttonSelector = mainSelector + " .form-submit";
        //buttonStyles
        const mainStyles = collectStyle(
            buttonSelector,
            this.getFormButtonStyles(params)
        );
        const mobileStyles = collectMobileStyle(
            buttonSelector,
            this.getFormButtonStylesMobile(params)
        );
        return mainStyles + mobileStyles;
    }
}
