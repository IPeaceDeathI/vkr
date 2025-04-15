import { Color } from "../styles";
import { CommonZoneParams, ZoneTypes } from "./_common";

export enum HeaderRows {
    first = "first",
    second = "second",
    all = "all",
}

export interface BlockHeaderStyles {
    isFixed: {
        enabled: boolean;
        value: {
            bgColor: Color;
            textColor: Color;
            fixedRows: HeaderRows;
            blur: number;
            paddings: {
                top: string;
                bottom: string;
            };
        };
    };
    divider: {
        isDivider: boolean;
        dividerColor: Color;
    };
    isBurgerMenu: boolean;
}

export interface BlockHeaderParams extends CommonZoneParams {
    // Здесь хранятся styles и visibility из стандартных параметров Зоны, но НЕ используются
    //Для добавление и удаления item'ов из зедера использую собственные actions хедера
    type: ZoneTypes.blockHeader;
    isSecondRow: boolean;
    mainDividerWidth: number;
    pairsWidth: Array<{ item: number; divider: number }>; //ширина пар {item / divider}
    headerStyles: BlockHeaderStyles;
}
