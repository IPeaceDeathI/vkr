import {
    ItemTextParams,
    ItemTypes,
    TextType,
    TextTagType,
    TextAlign,
    TextParams,
} from "@/types";
import { cssVariable } from "@/shared/constants/default_values";
import { styleGenerator } from "@/shared/services/style";
import { TextTypeFabric } from "../_textFabric";
import { calibrateMobileFontSize } from "@/shared/helpers";
import { Item } from "./Item";

export class Text extends Item {
    protected static instance: Text;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Text.instance) {
            Text.instance = new Text();
            // ... здесь единожды выполняется инициализация ...
        }
        return Text.instance;
    }
    public getType(): ItemTypes.text {
        return ItemTypes.text;
    }
    public getName() {
        return "Текст";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/text.jpg`;
    }
    public getDefaultItemParams(): ItemTextParams {
        return {
            ...this.getItemCommonParams(this.getType()),
            type: this.getType(),
            textParams: this.getTextParams(),
        };
    }
    public getTextParams(): TextParams {
        return {
            html: "Текст очень важен",
            textType: TextType.text,
            rootTag: TextTagType.paragraph,
            textAlign: TextAlign.inherit,
            color: "auto",
            ...TextTypeFabric(TextType.text),
            mobile: {
                redefine: false,
                textAlign: TextAlign.inherit,
                ...TextTypeFabric(TextType.text),
            },
        };
    }
    public getStyles(params: ItemTextParams) {
        return (
            this.getInnerStyles(params.textParams) +
            this.getItemCommonStyles(params)
        );
    }
    getInnerStyles(styles: TextParams) {
        return styleGenerator([
            {
                cssVariable: cssVariable.textColor,
                value: styles.color !== "auto" ? styles.color : undefined,
            },
            {
                cssVariable: cssVariable.fontSize,
                value: `${styles.fontSize}px`,
            },
            {
                cssVariable: cssVariable.fontWeight,
                value: `${styles.fontWeight}`,
            },
            {
                cssVariable: cssVariable.lineHeight,
                value: `${styles.lineHeight}`,
            },
            {
                cssVariable: cssVariable.letterSpacing,
                value: `${styles.letterSpacing}px`,
            },
            {
                cssVariable: cssVariable.textAlign,
                value: styles.textAlign,
            },
        ]);
    }
    public getMobileStyles(params: ItemTextParams) {
        let textParams = {
            ...params.textParams,
            fontSize: calibrateMobileFontSize(params.textParams.fontSize),
        };
        if (params.textParams.mobile.redefine) {
            textParams = { ...textParams, ...textParams.mobile };
        }
        return (
            styleGenerator([
                {
                    cssVariable: cssVariable.fontSize,
                    value: `${textParams.fontSize}px`,
                },
                {
                    cssVariable: cssVariable.fontWeight,
                    value: `${textParams.fontWeight}`,
                },
                {
                    cssVariable: cssVariable.lineHeight,
                    value: `${textParams.lineHeight}`,
                },
                {
                    cssVariable: cssVariable.letterSpacing,
                    value: `${textParams.letterSpacing}px`,
                },
                {
                    cssVariable: cssVariable.textAlign,
                    value: textParams.textAlign,
                },
            ]) + this.getMobileItemCommonStyles(params)
        );
    }
}
