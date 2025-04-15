import {
    BaseBGParams,
    CardsProportion,
    Color,
    ElementsJustify,
    Paddings,
} from "@/types";
import {
    CommonZoneParams,
    ZoneStylesMobileParams,
    ZoneStylesParams,
    ZoneTypes,
} from "./_common";

export interface WindowParams extends CommonZoneParams {
    type: ZoneTypes.window;
    styles: WindowStylesParams;
    previewSrc: string;
    publishId: number;
    secondChildrenIds: Array<id>;
    enableSecondColumn: boolean;
    //DEVELOP надо взять фон у блока и унифицировать сюда
    background: { throughСursor: boolean } & BaseBGParams;
    //END DEVELOP
}
export interface WindowStylesParams extends ZoneStylesParams {
    // TODO не работает вертикальное выравнинвание
    width: number;
    stretchOnWidth: boolean;
    height: "auto" | "100%";
    wrapperHorizontalJustify: ElementsJustify;
    wrapperVerticalJustify: ElementsJustify;
    mobile: WindowStylesMobileParams;
    wrapperPaddings: Paddings;
    showEffect: WindowShowEffect;
    cross: {
        crossPosition: WindowCrossPosition;
        path: string;
        size: number;
        color: Color;
    };
    //DEVELOP
    gapBetween: number; //расстояние между двумя колонкками
    cardProportion: CardsProportion;
    closeOnClickOutside: boolean;
    //END DEVELOP
}
export enum WindowCrossPosition {
    none = "none",
    inside = "inside",
    near = "near",
    outside = "outside",
}
export enum WindowShowEffect {
    appearance = "appearance",
    shift = "shift",
}
export interface WindowStylesMobileParams extends ZoneStylesMobileParams {
    width: number;
    stretchOnWidth: boolean;
    height: "auto" | "100%";
    wrapperHorizontalJustify: ElementsJustify;
    wrapperVerticalJustify: ElementsJustify;
    wrapperPaddings: Paddings;
    cross: {
        crossPosition: WindowCrossPosition;
        path: string;
        size: number;
        color: Color;
    };
    //DEVELOP
    changeOrder: boolean;
    gapBetween: number; //расстояние между двумя колонкками
    //END DEVELOP
}
