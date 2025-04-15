import { CommonItemsParams, ItemTypes } from "./_common";
export interface ItemHeaderDividerParams extends CommonItemsParams {
    //наследование ради типизации паддинги и визабилити не используются
    type: ItemTypes.headerDivider;
}
