import { ItemTypes, ItemHeaderDividerParams, ItemBundle } from "@/types";
import { Item } from "./Item";
import { styleCombiner, styleGenerator } from "@/shared/services/style";
import { cssVariable, gridWidth } from "@/shared/constants/default_values";

export class HeaderDivider extends Item {
    protected static instance: HeaderDivider;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!HeaderDivider.instance) {
            HeaderDivider.instance = new HeaderDivider();
            // ... здесь единожды выполняется инициализация ...
        }
        return HeaderDivider.instance;
    }
    public getType(): ItemTypes.headerDivider {
        return ItemTypes.headerDivider;
    }
    public getName() {
        return "Глобальный квиз";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/quiz.jpg`;
    }
    public getDefaultItemParams(
        parentId: id,
        width = gridWidth
    ): ItemHeaderDividerParams {
        const commonStyles = this.getItemCommonParams(this.getType());
        return {
            ...commonStyles,
            type: this.getType(),
            width: width,
        };
    }
    public getStyles(params: ItemHeaderDividerParams) {
        return styleGenerator([
            //commonstylesтут будут только мешать читать типы структуры
            {
                cssVariable: cssVariable.layoutWidth,
                value:
                    params.width === "100%" || params.width === undefined
                        ? "100%"
                        : params.width + "px",
            },
            {
                cssVariable: cssVariable.display,
                value: params.width === 0 ? "none" : "inline-flex",
            },
        ]);
    }
    public getMobileStyles(params: ItemHeaderDividerParams) {
        //commonstylesтут будут только мешать читать типы структуры
        return "";
    }
    public getBundle(width = gridWidth): ItemBundle {
        return { ...this.getDefaultItemParams("", width) };
    }
}
