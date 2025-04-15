import { GetterTree } from "vuex";
import { State, state } from "./state";
import { RootState } from "@/entities/store";
import { PageFonts } from "@/types";
import { CodeInterface } from "@/types";

export type Getters = {
    isRuler(state: State): boolean;
    isGrids(state: State): boolean;
    numGrids(state: State): number;
    colorGrids(state: State): string;
    gapGrids(state: State): number;
    widthGrids(state: State): number;
    elementIsDragging(state: State): boolean;
    cardIsDrag(state: State): boolean;
    columnIsDrag(state: State): boolean;
    itemIsDrag(state: State): boolean;
    isEditable(state: State): boolean;
    isMobileViewport(state: State): boolean;
    isDesktopViewport(state: State): boolean;
    getOpenedRedators(state: State): Array<id>;
    redefineFonts(state: State): boolean;
    pageFonts(state: State): PageFonts;
    viewportScale(state: State): number;
    indexRef(state: State): any;
    showWindowPicker(state: State): boolean;
    pageCodeHead(state: State): Array<CodeInterface>;
    pageCodeBody(state: State): Array<CodeInterface>;
};
export const getters: GetterTree<State, RootState> & Getters = {
    isRuler: (state) => state.isRuler,
    isGrids: (state) => state.isGrids,
    numGrids: (state) => state.numGrids,
    colorGrids: (state) => state.colorGrids,
    gapGrids: (state) => state.gapGrids,
    widthGrids: (state) => state.widthGrids,
    elementIsDragging: (state) =>
        state.cardIsDrag || state.columnIsDrag || state.itemIsDrag,
    cardIsDrag: (state) => state.cardIsDrag,
    columnIsDrag: (state) => state.columnIsDrag,
    itemIsDrag: (state) => state.itemIsDrag,
    isEditable: (state) => state.isEditable,
    isMobileViewport: (state) => state.environmentViewport === "mobile",
    isDesktopViewport: (state) => state.environmentViewport === "desktop",
    getOpenedRedators: (state) => state.openedRedactors,
    redefineFonts: (state) => state.redefineFonts,
    pageFonts: (state) => state.pageFonts,
    viewportScale: (state) => state.viewportScale,
    indexRef: (state) => state.indexRef,
    showWindowPicker: (state) => state.showWindowPicker,
    pageCodeHead: (state) => state.pageCodeHead,
    pageCodeBody: (state) => state.pageCodeBody,
};
