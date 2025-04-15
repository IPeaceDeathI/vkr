import { MutationTree } from "vuex";
import { State } from "./state";
import { MutationTypes } from "../types/mutations";
import { PageFonts, TextTypes } from "@/types";
import { CodeInterface } from "@/types";

export type Mutations<S = State> = {
    [MutationTypes.SET_RULER](state: S, ruler: boolean): void;
    [MutationTypes.SET_GRIDS](state: S, grids: boolean): void;
    [MutationTypes.SET_NUM_GRIDS](state: S, grids: number): void;
    [MutationTypes.SET_COLOR_GRIDS](state: S, grids: string): void;
    [MutationTypes.SET_GAP_GRIDS](state: S, grids: number): void;
    [MutationTypes.SET_WIDTH_GRIDS](state: S, grids: number): void;
    [MutationTypes.SET_CARD_IS_DRAG](state: S, isDrag: boolean): void;
    [MutationTypes.SET_COLUMN_IS_DRAG](state: S, isDrag: boolean): void;
    [MutationTypes.SET_ITEM_IS_DRAG](state: S, isDrag: boolean): void;
    [MutationTypes.SET_EDITABLE](state: S, edited: boolean): void;
    [MutationTypes.SET_ENVIRONMENT_VIEWPORT](
        state: S,
        mode: "mobile" | "desktop"
    ): void;
    [MutationTypes.ADD_OPENED_REDACTOR](state: S, id: id): void;
    [MutationTypes.REMOVE_OPENED_REDACTOR](state: S, id: id): void;
    [MutationTypes.SET_REDEFINE_FONTS](state: S, val: boolean): void;
    [MutationTypes.SET_FONT_PAGE](state: S, font: PageFonts): void;
    [MutationTypes.SET_SHOW_WINDOW_PICKER](state: S, isShow: boolean): void;
    [MutationTypes.SET_CODE_HEAD_PAGE](state: S, code: CodeInterface): void;
    [MutationTypes.UPDATE_CODE_HEAD_PAGE](
        state: S,
        { id, updatedCode }: { id: number; updatedCode: CodeInterface }
    ): void;
    [MutationTypes.DELETE_CODE_HEAD_PAGE](state: S, id: number): void;

    [MutationTypes.SET_CODE_BODY_PAGE](state: S, code: CodeInterface): void;
    [MutationTypes.UPDATE_CODE_BODY_PAGE](
        state: S,
        { id, updatedCode }: { id: number; updatedCode: CodeInterface }
    ): void;
    [MutationTypes.DELETE_CODE_BODY_PAGE](state: S, id: number): void;

    // [MutationTypes.UPDATE_ARRAY_CODE_HEAD_PAGE](
    //     state: S,
    //     { updatedCode }: { updatedCode: Array<CodeInterface> }
    // ): void;

    [MutationTypes.UPDATE_ARRAY_CODE_BODY_PAGE](
        state: S,
        updatedCode: Array<CodeInterface>
    ): void;
    [MutationTypes.UPDATE_ARRAY_CODE_HEAD_PAGE](
        state: S,
        updatedCode: Array<CodeInterface>
    ): void;
};
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_RULER](state, ruler) {
        state.isRuler = ruler;
    },
    [MutationTypes.SET_GRIDS](state, grids) {
        state.isGrids = grids;
    },
    [MutationTypes.SET_NUM_GRIDS](state, grids) {
        state.numGrids = grids;
    },
    [MutationTypes.SET_COLOR_GRIDS](state, grids) {
        state.colorGrids = grids;
    },
    [MutationTypes.SET_GAP_GRIDS](state, grids) {
        state.gapGrids = grids;
    },
    [MutationTypes.SET_WIDTH_GRIDS](state, grids) {
        state.widthGrids = grids;
    },
    [MutationTypes.SET_CARD_IS_DRAG](state, isDrag) {
        state.cardIsDrag = isDrag;
    },
    [MutationTypes.SET_COLUMN_IS_DRAG](state, isDrag) {
        state.columnIsDrag = isDrag;
    },
    [MutationTypes.SET_ITEM_IS_DRAG](state, isDrag) {
        state.itemIsDrag = isDrag;
    },
    [MutationTypes.SET_EDITABLE](state, edited) {
        state.isEditable = edited;
    },
    [MutationTypes.SET_ENVIRONMENT_VIEWPORT](state, viewport) {
        state.environmentViewport = viewport;
    },
    [MutationTypes.ADD_OPENED_REDACTOR](state, id) {
        state.openedRedactors.push(id);
    },
    [MutationTypes.REMOVE_OPENED_REDACTOR](state, id) {
        state.openedRedactors = state.openedRedactors.filter(
            (elem) => elem !== id
        );
    },
    [MutationTypes.SET_REDEFINE_FONTS](state, val) {
        state.redefineFonts = val;
    },
    [MutationTypes.SET_FONT_PAGE](state, font) {
        state.pageFonts = font;
    },
    [MutationTypes.SET_SHOW_WINDOW_PICKER](state, isShow) {
        state.showWindowPicker = isShow;
    },
    [MutationTypes.SET_CODE_HEAD_PAGE](state, code) {
        state.pageCodeHead.push(code);
    },
    [MutationTypes.DELETE_CODE_HEAD_PAGE](state, id) {
        const index = state.pageCodeHead.findIndex((obj: any) => obj.id === id);
        state.pageCodeHead.splice(index, 1);
    },
    [MutationTypes.UPDATE_CODE_HEAD_PAGE](state, { id, updatedCode }) {
        const index = state.pageCodeHead.findIndex((obj: any) => obj.id == id);
        state.pageCodeHead[index] = updatedCode;
    },
    [MutationTypes.SET_CODE_BODY_PAGE](state, code) {
        state.pageCodeBody.push(code);
    },
    [MutationTypes.DELETE_CODE_BODY_PAGE](state, id) {
        const index = state.pageCodeBody.findIndex((obj: any) => obj.id === id);
        state.pageCodeBody.splice(index, 1);
    },
    [MutationTypes.UPDATE_CODE_BODY_PAGE](state, { id, updatedCode }) {
        const index = state.pageCodeBody.findIndex((obj: any) => obj.id == id);
        state.pageCodeBody[index] = updatedCode;
    },
    [MutationTypes.UPDATE_ARRAY_CODE_HEAD_PAGE](state, updatedCode) {
        if (updatedCode) {
            state.pageCodeHead.splice(0, state.pageCodeHead.length - 1);

            updatedCode.forEach((item: CodeInterface) => {
                console.log("mutation head item ==", item);
                state.pageCodeHead.push(item);
            });

            console.log("mutation head", state.pageCodeHead);
        }
    },
    [MutationTypes.UPDATE_ARRAY_CODE_BODY_PAGE](state, updatedCode) {
        if (updatedCode) {
            state.pageCodeBody.splice(0, state.pageCodeBody.length - 1);

            updatedCode.forEach((item: CodeInterface) => {
                console.log("mutation body item ==", item);
                state.pageCodeBody.push(item);
            });

            console.log("mutation body", state.pageCodeBody);
        }
    },
};
