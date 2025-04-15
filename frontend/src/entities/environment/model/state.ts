import { PageFonts } from "@/types";
import { CodeInterface } from "@/types";

export type State = {
    [x: string]: any;
    isRuler: boolean;
    environmentViewport: "desktop" | "mobile";
    isGrids: boolean;
    numGrids: number;
    colorGrids: string;
    gapGrids: number;
    widthGrids: number;
    cardIsDrag: boolean;
    columnIsDrag: boolean;
    itemIsDrag: boolean;
    isEditable: boolean;
    openedRedactors: Array<id>;
    redefineFonts: boolean;
    pageFonts: PageFonts;
    viewportScale: number;
    indexRef: any;
    showWindowPicker: boolean;
    pageCodeHead: Array<CodeInterface>;
    pageCodeBody: Array<CodeInterface>;
};
export const state: State = {
    isRuler: false,
    environmentViewport: "desktop",
    isGrids: false,
    numGrids: 12,
    colorGrids: "#1976D243",
    gapGrids: 10,
    widthGrids: 90,
    cardIsDrag: false,
    columnIsDrag: false,
    itemIsDrag: false,
    isEditable: true,
    openedRedactors: [],
    redefineFonts: false,
    pageFonts: {
        header1: "Roboto",
        header2: "Roboto",
        text: "Roboto",
        quote: "Playfair Display",
    },
    viewportScale: 1,
    indexRef: "",
    showWindowPicker: false,
    pageCodeHead: [],
    pageCodeBody: [],
};
