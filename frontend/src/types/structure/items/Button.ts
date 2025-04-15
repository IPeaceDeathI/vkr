import {
    BorderRadius,
    ButtonIconPosition,
    Color,
    EventTypes,
    Events,
    GoalsParams,
    Shadow,
    Size,
    TextDecoration,
    WidthType,
} from "@/types";
import { CommonItemsParams, ItemTypes } from "./_common";

export interface ItemButtonParams extends CommonItemsParams {
    type: ItemTypes.button;
    styles: ItemButtonStylesParams;
    text: string;
    settings: {
        events: Events<EventTypes.onclick>;
        goals?: GoalsParams; //LEGACYSUPPORT
    };
}
export interface ItemButtonStylesParams {
    background: {
        enabled: boolean;
        value: Color;
    };
    size: Size;
    widthType: WidthType;
    borderRadius: {
        enabled: boolean;
        value: BorderRadius;
    };
    border: {
        enabled: boolean;
        borderColor: Color;
        borderWidth: number;
    };
    shadow: {
        enabled: boolean;
        value: Shadow;
    };
    icon: {
        enabled: boolean;
        position: ButtonIconPosition;
        path: string;
        size: number;
    };
    text: {
        color: Color;
        fontSize: number;
        fontWeight: number;
        lineHeight: number;
        letterSpacing: number;
        fontStyle: string;
        textDecoration: TextDecoration;
    };
    mobile: {
        enabled: boolean;
        size: Size;
        text: {
            color: Color;
            fontSize: number;
            fontWeight: number;
            lineHeight: number;
            letterSpacing: number;
            fontStyle: string;
            textDecoration: TextDecoration;
        };
        widthType: WidthType;
    };
}
