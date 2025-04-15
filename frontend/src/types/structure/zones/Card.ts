import {
    CommonZoneParams,
    ZoneSettings,
    ZoneStylesParams,
    ZoneTypes,
} from "./_common";

export interface CardParams extends CommonZoneParams {
    type: ZoneTypes.card;
    secondChildrenIds: Array<id>;
    styles: CardStylesParams;
    enableSecondColumn: boolean; // TODO убрать во время переделки и ориентироваться на родительский лайоут
    settings: ZoneSettings;
}

export interface CardStylesParams extends ZoneStylesParams {
    //DEVELOP
    gapBetween: number; //TODO убрать во время переделки и ориентироваться на родительский лайоут
    //END DEVELOP
}
