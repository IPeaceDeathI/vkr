import { ElementVisibility, SidesPadding } from "@/types";
import { ItemButtonParams } from "./Button";
import { ItemQuizParams } from "./Quiz";
import { ItemImageParams } from "./Image";
import { ItemTextParams } from "./Text";
import { ItemIconParams } from "./Icon";
import { ItemFormParams } from "./Form";
import { ItemMenuParams } from "./Menu";
import { ItemIconTextParams } from "./IconText";
import { ItemHeaderDividerParams } from "./HeaderDivider";

//Должен совпадать с названием класса, к которову применяются стили
export enum ItemTypes {
    button = "item-button",
    image = "item-image",
    text = "item-text",
    icon = "item-icon",
    form = "item-form",
    quiz = "item-quiz",
    menu = "item-navmenu",
    headerDivider = "item-header-divider",
    iconText = "item-icon-text",
}

export type Items = Map<id, ItemParams>;
export type ItemParams =
    | ItemButtonParams
    | ItemQuizParams
    | ItemImageParams
    | ItemMenuParams
    | ItemTextParams
    | ItemFormParams
    | ItemHeaderDividerParams
    | ItemIconTextParams
    | ItemIconParams;

export interface CommonItemsParams {
    paddings: SidesPadding;
    visibility: ElementVisibility;
    width?: "100%" | number; // LEGACY (for header)
}
