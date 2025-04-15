import { ItemIconParams } from "./Icon";
import { ElementsJustify } from "../styles";
import { CommonItemsParams, ItemTypes } from "./_common";
import { TextParams } from "./Text";

export interface ItemIconTextParams extends CommonItemsParams {
    type: ItemTypes.iconText;
    showDescription: boolean;
    iconJustify: ElementsJustify;
    gapIconText: number;
    gapText: number;
    icon: Pick<ItemIconParams, "styles" | "settings">;
    text: TextParams;
    description: TextParams;
}
