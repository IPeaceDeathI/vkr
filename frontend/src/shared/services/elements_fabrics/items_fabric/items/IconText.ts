import { ElementsJustify, ItemIconParams, ItemTypes } from "@/types";
import { Item } from "./Item";
import { ItemIconTextParams } from "@/types/structure/items/IconText";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { collectStyle, styleGenerator } from "@/shared/services";
import { cssVariable } from "@/shared/constants/default_values";

export class IconText extends Item {
    protected static instance: IconText;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!IconText.instance) {
            IconText.instance = new IconText();
            // ... здесь единожды выполняется инициализация ...
        }
        return IconText.instance;
    }
    public getType(): ItemTypes.iconText {
        return ItemTypes.iconText;
    }
    public getName() {
        return "Иконка с описанием";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/icon-text.jpg`;
    }
    public getDefaultItemParams(): ItemIconTextParams {
        return {
            type: this.getType(),
            ...this.getItemCommonParams(this.getType()),
            showDescription: true,
            iconJustify: ElementsJustify.start,
            gapIconText: 10,
            gapText: 0,
            icon: Icon.getInstance().getIconInnerParams(),
            text: Text.getInstance().getTextParams(),
            description: {
                ...Text.getInstance().getTextParams(),
                fontSize: 12,
                fontWeight: 300,
            },
        };
    }
    public getStyles(params: ItemIconTextParams) {
        return (
            this.getItemCommonStyles(params) +
            styleGenerator([
                {
                    cssVariable: cssVariable.gapX,
                    value: `${params.gapIconText}px`,
                },
                {
                    cssVariable: cssVariable.gapY,
                    value: `${params.gapText}px`,
                },
                {
                    cssVariable: cssVariable.jstfContent,
                    value: `${params.iconJustify}`,
                },
            ])
        );
    }
    public getMobileStyles(params: ItemIconTextParams) {
        return this.getMobileItemCommonStyles(params);
    }
    public getAdditionalCombinedStyles(
        id: id,
        params: ItemIconTextParams
    ): string {
        const mainSelector = this.getDataElementSelector(id);
        const iconSelector = mainSelector + " .icon-wrp";
        const textSelector =
            mainSelector + " .item-icon-text__wrapper__text-wrapper__text";
        const descriptionSelector =
            mainSelector +
            " .item-icon-text__wrapper__text-wrapper__description";
        //buttonStyles
        const iconStyles = collectStyle(
            iconSelector,
            Icon.getInstance().getInnerStyles(params.icon)
        );
        const textStyles = collectStyle(
            textSelector,
            Text.getInstance().getInnerStyles(params.text)
        );
        const descriptionStyles = collectStyle(
            descriptionSelector,
            Text.getInstance().getInnerStyles(params.description)
        );
        return iconStyles + textStyles + descriptionStyles;
    }
}
