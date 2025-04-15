//elements
export type Elements = Map<id, ElementParams>;

export interface ElementParams {
    type: ElementTypes;
}

export enum ElementTypes {
    BlockArea = "blockArea",
    Block = "block",
    BlockBody = "blockBody",
    Zone = "zone",
    Item = "item",
}
