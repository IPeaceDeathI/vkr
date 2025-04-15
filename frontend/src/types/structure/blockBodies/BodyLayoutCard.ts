import {
    CommonSliderParams,
    ElementVisibility,
    ElementsJustify,
    MobileGapTypes,
} from "@/types";
import { BodyLayoutCommonParams, BodyLayoutType } from "./_common";

export interface BodyLayoutCardParams extends BodyLayoutCommonParams {
    type: BodyLayoutType.cards;
    elementsJustify: ElementsJustify;
    contentWidth: CardsContentWidth;
    cardsInRow: CardsInRow;
    //DEVELOP
    cardsOrientation: CardsOrientation;
    cardProportion: CardsProportion; // АККУРАТНО стили вешаются на fiirst-child тоесть карочка должна быть непосредственный ребенком  layout
    mobile: {
        cardsOrientation: CardsOrientation;
        gap: MobileGapTypes;
        changeOrder: boolean;
    };
    //END DEVELOP
    sliderParams: SliderCardsParams;
}
//TODO Улучшить визуаль number \пагинации, как во флексби
export interface SliderCardsParams extends CommonSliderParams {
    enabled: boolean;
    visibility: ElementVisibility;
    sideSlides: {
        enabled: boolean;
        opacity: boolean; //DEVELOP
    };
}
export type CardsContentWidth = 14 | 16 | 18 | 20 | 22 | 24;
export type CardsInRow = 1 | 2 | 3 | 4 | 5;
export enum CardsOrientation {
    horizontal = "horizontal",
    vertical = "vertical",
}
export enum CardsProportion {
    ll,
    l,
    m,
    r,
    rr,
}
