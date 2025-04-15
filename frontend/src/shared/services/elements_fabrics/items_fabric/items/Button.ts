import {
    ItemButtonParams,
    EventTypes,
    WidthType,
    ItemTypes,
    ButtonIconPosition,
    TextDecoration,
    ItemButtonStylesParams,
    ActionTypes,
} from "@/types";
import { styleCombiner, styleGenerator } from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";
import { getContrastColor } from "@/shared/helpers";
import { Item } from "./Item";
import { getDefaultGoalsParams } from "../../commonParams";

export class Button extends Item {
    protected static instance: Button;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Button.instance) {
            Button.instance = new Button();
            // ... здесь единожды выполняется инициализация ...
        }
        return Button.instance;
    }
    public getType(): ItemTypes.button {
        return ItemTypes.button;
    }
    public getName() {
        return "Кнопка";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/button.jpg`;
    }
    public getDefaultItemParams(parentId: id): ItemButtonParams {
        return {
            ...this.getItemCommonParams(this.getType()),
            type: this.getType(),
            styles: {
                background: {
                    enabled: true,
                    value: "#000000",
                },
                text: {
                    color: "auto",
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: 147,
                    letterSpacing: 0,
                    fontStyle: "",
                    textDecoration: TextDecoration.none,
                },
                borderRadius: {
                    enabled: true,
                    value: {
                        tl: 15,
                        tr: 15,
                        bl: 15,
                        br: 15,
                    },
                },
                border: {
                    enabled: true,
                    borderWidth: 2,
                    borderColor: "#000000",
                },
                shadow: {
                    enabled: false,
                    value: {
                        shift: 5,
                        angle: 120,
                        blur: 2,
                        color: "#000000",
                    },
                },
                icon: {
                    enabled: false,
                    position: ButtonIconPosition.left,
                    path: `${process.env.BASE_URL}/svg/outlined/markunread.svg#icon`,
                    size: 20,
                },
                size: {
                    padding: {
                        horizontal: 22,
                        vertical: 12,
                    },
                },
                widthType: WidthType.auto,
                mobile: {
                    enabled: false,
                    size: {
                        padding: {
                            horizontal: 22,
                            vertical: 12,
                        },
                    },
                    text: {
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: 500,
                        lineHeight: 147,
                        letterSpacing: 0,
                        fontStyle: "",
                        textDecoration: TextDecoration.none,
                    },
                    widthType: WidthType.auto,
                },
            },
            text: "Оставить заявку",
            settings: {
                events: [
                    {
                        [EventTypes.onclick]: {
                            [ActionTypes.none]: true,
                        },
                    },
                ],
                goals: getDefaultGoalsParams(),
            },
        };
    }
    public getByStylesParams(styles: ItemButtonStylesParams) {
        return styleGenerator([
            {
                cssVariable: cssVariable.width,
                value: styles.widthType,
            },
            {
                cssVariable: cssVariable.bgColor,
                value: styles.background.enabled
                    ? styles.background.value
                    : undefined,
            },
            {
                cssVariable: cssVariable.brdRadius,
                value: styles.borderRadius.enabled
                    ? `${styleCombiner.borderRadius(styles.borderRadius.value)}`
                    : undefined,
            },
            {
                cssVariable: cssVariable.brd,
                value: styles.border.enabled
                    ? `${styleCombiner.border(
                          styles.border.borderColor,
                          styles.border.borderWidth
                      )}`
                    : undefined,
            },
            {
                cssVariable: cssVariable.boxShadow,
                value: styles.shadow.enabled
                    ? `${styleCombiner.shadow(styles.shadow.value)}`
                    : undefined,
            },
            {
                cssVariable: cssVariable.flexDirection,
                value:
                    styles.icon.enabled &&
                    styles.icon.position === ButtonIconPosition.right
                        ? "row-reverse"
                        : "row",
            },
            {
                cssVariable: cssVariable.contentWidth,
                value: styles.icon.enabled
                    ? styles.icon.size + "px"
                    : undefined,
            },
            {
                cssVariable: cssVariable.height,
                value: styles.icon.enabled
                    ? styles.icon.size + "px"
                    : undefined,
            },
            {
                cssVariable: cssVariable.marginLeft,
                value: styles.icon.enabled
                    ? styles.icon.position === "right"
                        ? "10px"
                        : "0px"
                    : undefined,
            },
            {
                cssVariable: cssVariable.marginRight,
                value: styles.icon.enabled
                    ? styles.icon.position === "left"
                        ? "10px"
                        : "0px"
                    : undefined,
            },
            {
                cssVariable: cssVariable.paddings,
                value: `${styleCombiner.axisPadding(styles.size.padding)}`,
            },
            {
                cssVariable: cssVariable.textColor,
                value:
                    styles.text.color !== "auto"
                        ? styles.text.color
                        : styles.background.enabled
                        ? getContrastColor(styles.background.value)
                        : styles.border.enabled
                        ? styles.border.borderColor
                        : undefined,
            },
            {
                cssVariable: cssVariable.fontSize,
                value: `${styles.text.fontSize}px`,
            },
            {
                cssVariable: cssVariable.fontWeight,
                value: `${styles.text.fontWeight}`,
            },
            {
                cssVariable: cssVariable.fontStyle,
                value: `${styles.text.fontStyle}`,
            },
            {
                cssVariable: cssVariable.textDecoration,
                value: `${styles.text.textDecoration}`,
            },
            {
                cssVariable: cssVariable.lineHeight,
                value: `${styles.text.lineHeight}%`,
            },
            {
                cssVariable: cssVariable.letterSpacing,
                value: `${styles.text.letterSpacing}px`,
            },
        ]);
    }
    protected getStyles(params: ItemButtonParams) {
        return (
            this.getItemCommonStyles(params) +
            this.getByStylesParams(params.styles)
        );
    }
    public getByStylesParamsMobile(styles: ItemButtonStylesParams) {
        return styles.mobile.enabled
            ? styleGenerator([
                  {
                      cssVariable: cssVariable.paddings,
                      value: `${styleCombiner.axisPadding(
                          styles.mobile.size.padding
                      )}`,
                  },
                  {
                      cssVariable: cssVariable.width,
                      value: styles.mobile.widthType,
                  },
                  {
                      cssVariable: cssVariable.textColor,
                      value:
                          styles.mobile.text.color !== "auto"
                              ? styles.mobile.text.color
                              : styles.background.enabled
                              ? getContrastColor(styles.background.value)
                              : styles.border.enabled
                              ? styles.border.borderColor
                              : undefined,
                  },
                  {
                      cssVariable: cssVariable.fontSize,
                      value: ` ${styles.mobile.text.fontSize}px`,
                  },
                  {
                      cssVariable: cssVariable.fontWeight,
                      value: `${styles.mobile.text.fontWeight}`,
                  },
                  {
                      cssVariable: cssVariable.fontStyle,
                      value: `${styles.mobile.text.fontStyle}`,
                  },
                  {
                      cssVariable: cssVariable.textDecoration,
                      value: `${styles.mobile.text.textDecoration}`,
                  },
                  {
                      cssVariable: cssVariable.lineHeight,
                      value: `${styles.mobile.text.lineHeight}%`,
                  },
                  {
                      cssVariable: cssVariable.letterSpacing,
                      value: `${styles.mobile.text.letterSpacing}px`,
                  },
              ])
            : "";
    }
    protected getMobileStyles(params: ItemButtonParams) {
        return (
            this.getMobileItemCommonStyles(params) +
            this.getByStylesParamsMobile(params.styles)
        );
    }
    // public getCombinedStyles(id: id, params: ItemButtonParams): string;
}
