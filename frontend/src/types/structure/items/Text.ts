import { Color, TextAlign } from "@/types";
import { CommonItemsParams, ItemTypes } from "./_common";

export interface ItemTextParams extends CommonItemsParams {
    type: ItemTypes.text;
    textParams: TextParams;
}
export interface TextParams {
    html: string;
    textType: TextType;
    rootTag: TextTagType;
    fontSize: number;
    lineHeight: number;
    fontWeight: number;
    letterSpacing: number;
    textAlign: TextAlign;
    color: Color;
    mobile: {
        redefine: boolean;
        fontSize: number;
        lineHeight: number;
        fontWeight: number;
        textAlign: TextAlign.inherit;
        letterSpacing: number;
    };
}
export enum TextType {
    header = "header",
    subheader = "subheader",
    text = "text",
    quote = "quote",
}
export enum TextTagType {
    paragraph = "p",
    h1 = "h1",
    h2 = "h2",
    h3 = "h3",
    h4 = "h4",
    h5 = "h5",
    h6 = "h6",
    div = "div",
}
