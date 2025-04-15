import {
    BodyLayoutColumnParams,
    ElementsAlign,
    GapTypes,
    StretchContent,
} from "@/types";
import { BodyLayoutCardParams } from "./BodyLayoutCard";

export type BlockBodies = Map<id, BlockBodyParams>;
export type BlockBodyParams = {
    parentId: id;
    childrenIds: Array<id>;
    BodyLayoutParams: BodyLayoutParams;
};

//body layout
export type BodyLayoutParams = BodyLayoutCardParams | BodyLayoutColumnParams;

export interface BodyLayoutCommonParams {
    elementsAlign: ElementsAlign;
    gap: GapTypes;
    strechContent: StretchContent;
}
export enum BodyLayoutType {
    cards = "card",
    columns = "column",
}
