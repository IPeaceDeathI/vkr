import {
    BorderRadiusPresets,
    Color,
    EventTypes,
    Events,
    GoalsParams,
    IconVariant,
} from "@/types";
import { CommonItemsParams, ItemTypes } from "./_common";

export interface ItemIconParams extends CommonItemsParams {
    type: ItemTypes.icon;
    styles: {
        src: string;
        iconColor: Color;
        variant: IconVariant;
        sizeWrp: string;
        sizeIcon: {
            enabled: boolean;
            value: number;
        };
        borderRadius: {
            enabled: boolean;
            value: BorderRadiusPresets;
        };
        borderWidth: {
            enabled: boolean;
            value: number;
        };
        //DEVELOP
        userIcon: {
            enabled: boolean;
            value: string;
        };
        backgroundSize: {
            enabled: boolean;
        };
    };
    settings: {
        events: Events<EventTypes.onclick>;
        enableOnClick: boolean;
        enableOnHover: boolean;
        goals: {
            enabled: boolean;
            value: GoalsParams;
        };
    };
    //END DEVELOP
}
