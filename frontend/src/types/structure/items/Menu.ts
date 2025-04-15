import { Color, TextDecoration } from "../styles";
import { CommonItemsParams, ItemTypes } from "./_common";
export interface ItemMenuParams extends CommonItemsParams {
    // or navmenu
    type: ItemTypes.menu;
    items: Array<MenuItem>;
    style: MenuStyle;
}
export type MenuItem = MenuItemLink | MenuItemDrop;
export type MenuItemLink = {
    type: "link";
    name: string;
    link: string;
    targetBlank: boolean;
};
//DEVELOPвсю механику раскрывающегося меню

type MenuItemDrop = {
    type: "drop";
    name: string;
    items: Array<MenuItem>;
};
//END DEVELOP

export type MenuStyle = {
    menuOrientation: "horizontal" | "vertical";
    text: {
        color: Color;
        fontSize: number;
        fontWeight: number;
        lineHeight: number;
        letterSpacing: number;
        fontStyle: string;
        textDecoration: TextDecoration;
    };
    gap: number;
    //DEVELOP
    separators: {
        enable: boolean;
        color: Color;
        size: number;
        type: "point" | "vertical" | "slash" | "more" | "dash";
        thickness: "small" | "middle" | "large";
    };
    hoverEffect: {
        type: "emphasize" | "animation" | "lightening" | "color";
        lineColor: Color;
        textColor: Color;
        lineWeight: number;
        opacity: number;
    };
    openDropMenu: "click" | "hover";
    collapseDoNotFilItems: boolean;
    //END DEVELOP
    mobile: MenuMobileStyle;
};
export type MenuMobileStyle = {
    redefine: boolean;
    menuOrientation: "horizontal" | "vertical";
    gap: number;
    text: {
        color: Color;
        fontSize: number;
        fontWeight: number;
        lineHeight: number;
        letterSpacing: number;
        fontStyle: string;
    };
};
