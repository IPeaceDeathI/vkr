import {
    Blackout,
    BlockHeaderParams,
    BorderRadius,
    Color,
    ContrastColor,
    ElementVisibility,
    ElementsJustify,
    EventTypes,
    Events,
    ImagePosition,
    Paddings,
    Shadow,
} from "@/types";
import { WindowParams } from "./Window";
import { BlockTitleParams } from "./BlockTitle";
import { ColumnParams } from "./Column";
import { CardParams } from "./Card";

//zone
export enum ZoneTypes {
    blockHeader = "blockHeader",
    blockTitle = "blockTitle",
    card = "card",
    column = "column",
    window = "window",
}

export type Zones = Map<id, ZoneParams>;

export type ZoneParams =
    | CardParams
    | ColumnParams
    | BlockHeaderParams
    | BlockTitleParams
    | WindowParams;

export interface CommonZoneParams {
    parentId: id;
    childrenIds: Array<id>;
    type: ZoneTypes;
    styles: ZoneStylesParams;
    //DEVELOP
    visibility: ElementVisibility;
    //END DEVELOP
}
export interface ZoneSettings {
    events: Events<EventTypes.onclick>;
    enableOnClick: boolean;
    enableOnHover: boolean;
}
export interface ZoneStylesParams {
    background: ZoneBgParams;
    shadow: {
        enabled: boolean;
        shadow: Shadow;
    };
    border: {
        enabled: boolean;
        borderColor: Color;
        borderWidth: number;
    };
    borderRadius: {
        enabled: boolean;
        value: BorderRadius;
    };
    paddings: Paddings;
    minHeight: {
        enabled: boolean;
        value: number;
        unit: "px" | "vh";
    };
    horizontalJustify: ElementsJustify;
    verticalJustify: ElementsJustify;
    mobile: ZoneStylesMobileParams;
}
export interface ZoneStylesMobileParams {
    inheritPadding: boolean;
    paddings: Paddings;
    horizontalJustify: ElementsJustify;
    verticalJustify: ElementsJustify;
    minHeight: {
        enabled: boolean;
        value: number;
        unit: "px" | "vh";
    };
}
export interface ZoneBgParams {
    type: ZoneBgTypes;
    color: Color;
    image: {
        src: string;
        position: ImagePosition;
        blackout: Blackout;
    };
    contrastColor: ContrastColor;
    textColor: Color;
}
export enum ZoneBgTypes {
    none,
    color,
    image,
}
