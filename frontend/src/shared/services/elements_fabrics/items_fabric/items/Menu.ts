import { ItemTypes, ItemMenuParams, MenuStyle, TextDecoration } from "@/types";
import { Item } from "./Item";
import { styleCombiner, styleGenerator } from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";

export class Menu extends Item {
    protected static instance: Menu;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Menu.instance) {
            Menu.instance = new Menu();
            // ... здесь единожды выполняется инициализация ...
        }
        return Menu.instance;
    }
    public getType(): ItemTypes.menu {
        return ItemTypes.menu;
    }
    public getName() {
        return "Меню";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/menu.jpg`;
    }
    public getDefaultItemParams(parentId: id): ItemMenuParams {
        const commonStyles = this.getItemCommonParams(this.getType());
        return {
            ...commonStyles,
            type: this.getType(),
            items: [
                { type: "link", name: "Услуги", link: "", targetBlank: false },
                { type: "link", name: "Отзывы", link: "", targetBlank: false },
                {
                    type: "link",
                    name: "Контакты",
                    link: "",
                    targetBlank: false,
                },
            ],
            style: this.getStyleParams(),
        };
    }
    public getStyles(params: ItemMenuParams) {
        const styles = params.style;
        return (
            this.getItemCommonStyles(params) +
            styleGenerator([
                {
                    cssVariable: cssVariable.flexDirection,
                    value:
                        styles.menuOrientation === "horizontal"
                            ? "row"
                            : "column",
                },
                { cssVariable: cssVariable.gapX, value: styles.gap / 2 + "px" },
                { cssVariable: cssVariable.gapY, value: styles.gap / 4 + "px" },
                {
                    cssVariable: cssVariable.textColor,
                    value:
                        styles.text.color !== "auto"
                            ? styles.text.color
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
            ])
        );
    }
    public getMobileStyles(params: ItemMenuParams) {
        const commonStyles = this.getMobileItemCommonStyles(params);
        const mobileStyleParams = params.style.mobile;
        if (!mobileStyleParams.redefine) {
            return commonStyles;
        }
        return (
            styleGenerator([
                {
                    cssVariable: cssVariable.flexDirection,
                    value:
                        mobileStyleParams.menuOrientation === "horizontal"
                            ? "row"
                            : "column",
                },
                {
                    cssVariable: cssVariable.gapX,
                    value: mobileStyleParams.gap / 2 + "px",
                },
                {
                    cssVariable: cssVariable.gapY,
                    value: mobileStyleParams.gap / 4 + "px",
                },
                {
                    cssVariable: cssVariable.textColor,
                    value:
                        mobileStyleParams.text.color !== "auto"
                            ? mobileStyleParams.text.color
                            : undefined,
                },
                {
                    cssVariable: cssVariable.fontSize,
                    value: `${mobileStyleParams.text.fontSize}px`,
                },
                {
                    cssVariable: cssVariable.fontWeight,
                    value: `${mobileStyleParams.text.fontWeight}`,
                },
                {
                    cssVariable: cssVariable.fontStyle,
                    value: `${mobileStyleParams.text.fontStyle}`,
                },
                {
                    cssVariable: cssVariable.lineHeight,
                    value: `${mobileStyleParams.text.lineHeight}%`,
                },
                {
                    cssVariable: cssVariable.letterSpacing,
                    value: `${mobileStyleParams.text.letterSpacing}px`,
                },
            ]) + commonStyles
        );
    }
    private getStyleParams(): MenuStyle {
        return {
            menuOrientation: "horizontal",
            text: {
                color: "auto",
                fontSize: 16,
                fontWeight: 300,
                lineHeight: 137,
                letterSpacing: 0,
                fontStyle: "",
                textDecoration: TextDecoration.none,
            },
            gap: 24,
            separators: {
                enable: false,
                color: "auto",
                size: 50,
                type: "point",
                thickness: "middle",
            },
            hoverEffect: {
                type: "emphasize",
                lineColor: "auto",
                textColor: "auto",
                lineWeight: 1,
                opacity: 80,
            },
            openDropMenu: "click",
            collapseDoNotFilItems: false,
            mobile: {
                redefine: false,
                menuOrientation: "vertical",
                text: {
                    color: "auto",
                    fontSize: 16,
                    fontWeight: 300,
                    lineHeight: 137,
                    letterSpacing: 0,
                    fontStyle: "",
                },
                gap: 24,
            },
        };
    }
}
