import { Mutations } from "./mutations";
import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { ActionTypes } from "../types/actions";
import { RootState } from "@/entities/store";
import { MutationTypes } from "../types/mutations";
import { PageFonts } from "@/types";
import { CodeInterface } from "@/types";

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
    [ActionTypes.PUT_RULER]({ commit }: AugmentedActionContext): void;
    [ActionTypes.REMOVE_RULER]({ commit }: AugmentedActionContext): void;

    [ActionTypes.PUT_GRIDS]({ commit }: AugmentedActionContext): void;
    [ActionTypes.REMOVE_GRIDS]({ commit }: AugmentedActionContext): void;

    [ActionTypes.PUT_CARD_IS_DRAG]({ commit }: AugmentedActionContext): void;
    [ActionTypes.REMOVE_CARD_IS_DRAG]({ commit }: AugmentedActionContext): void;

    [ActionTypes.PUT_COLUMN_IS_DRAG]({ commit }: AugmentedActionContext): void;
    [ActionTypes.REMOVE_COLUMN_IS_DRAG]({
        commit,
    }: AugmentedActionContext): void;

    [ActionTypes.PUT_ITEM_IS_DRAG]({ commit }: AugmentedActionContext): void;
    [ActionTypes.REMOVE_ITEM_IS_DRAG]({ commit }: AugmentedActionContext): void;
    [ActionTypes.CHANGE_NUM_GRIDS](
        { commit }: AugmentedActionContext,
        grids: number
    ): void;

    [ActionTypes.CHANGE_COLOR_GRIDS](
        { commit }: AugmentedActionContext,
        grids: string
    ): void;
    [ActionTypes.CHANGE_GAP_GRIDS](
        { commit }: AugmentedActionContext,
        grids: number
    ): void;
    [ActionTypes.CHANGE_WIDTH_GRIDS](
        { commit }: AugmentedActionContext,
        grids: number
    ): void;

    [ActionTypes.MAKE_EDITABLE]({ commit }: AugmentedActionContext): void;
    [ActionTypes.MAKE_UNEDITABLE]({ commit }: AugmentedActionContext): void;

    [ActionTypes.REDACTOR_IS_OPEN](
        { commit }: AugmentedActionContext,
        id: id
    ): void;
    [ActionTypes.REDACTOR_IS_CLOSE](
        { commit }: AugmentedActionContext,
        id: id
    ): void;
    [ActionTypes.SET_DESKTOP_VIEWPORT]({
        commit,
    }: AugmentedActionContext): Promise<void>;
    [ActionTypes.SET_MOBILE_VIEWPORT]({
        commit,
    }: AugmentedActionContext): Promise<void>;
    [ActionTypes.CHANGE_REDEFINE_FONTS](
        { commit }: AugmentedActionContext,
        val: boolean
    ): Promise<void>;
    [ActionTypes.CHANGE_FONT_PAGE](
        { commit }: AugmentedActionContext,
        font?: PageFonts
    ): Promise<void>;
    [ActionTypes.ADD_CODE_HEAD_PAGE](
        { commit }: AugmentedActionContext,
        code: CodeInterface
    ): Promise<void>;
    [ActionTypes.CHANGE_CODE_HEAD_PAGE](
        { commit }: AugmentedActionContext,
        { id, updatedCode }: { id: number; updatedCode: CodeInterface }
    ): void;
    [ActionTypes.DELETE_CODE_HEAD_PAGE](
        { commit }: AugmentedActionContext,
        id: number
    ): void;
    [ActionTypes.ADD_CODE_BODY_PAGE](
        { commit }: AugmentedActionContext,
        code: CodeInterface
    ): Promise<void>;
    [ActionTypes.CHANGE_CODE_BODY_PAGE](
        { commit }: AugmentedActionContext,
        { id, updatedCode }: { id: number; updatedCode: CodeInterface }
    ): void;
    [ActionTypes.DELETE_CODE_BODY_PAGE](
        { commit }: AugmentedActionContext,
        id: number
    ): void;

    [ActionTypes.CHANGE_ARRAY_CODE_HEAD_PAGE](
        { commit }: AugmentedActionContext,
        updatedCode: Array<CodeInterface>
    ): void;

    [ActionTypes.CHANGE_ARRAY_CODE_BODY_PAGE](
        { commit }: AugmentedActionContext,
        updatedCode: Array<CodeInterface>
    ): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
    [ActionTypes.PUT_RULER]({ commit }) {
        commit(MutationTypes.SET_RULER, true);
    },
    [ActionTypes.REMOVE_RULER]({ commit }) {
        commit(MutationTypes.SET_RULER, false);
    },

    [ActionTypes.PUT_GRIDS]({ commit }) {
        commit(MutationTypes.SET_GRIDS, true);
    },
    [ActionTypes.REMOVE_GRIDS]({ commit }) {
        commit(MutationTypes.SET_GRIDS, false);
    },

    [ActionTypes.PUT_CARD_IS_DRAG]({ commit }) {
        commit(MutationTypes.SET_CARD_IS_DRAG, true);
    },
    [ActionTypes.REMOVE_CARD_IS_DRAG]({ commit }) {
        commit(MutationTypes.SET_CARD_IS_DRAG, false);
    },
    [ActionTypes.PUT_COLUMN_IS_DRAG]({ commit }) {
        commit(MutationTypes.SET_COLUMN_IS_DRAG, true);
    },
    [ActionTypes.REMOVE_COLUMN_IS_DRAG]({ commit }) {
        commit(MutationTypes.SET_COLUMN_IS_DRAG, false);
    },

    [ActionTypes.PUT_ITEM_IS_DRAG]({ commit }) {
        commit(MutationTypes.SET_ITEM_IS_DRAG, true);
    },
    [ActionTypes.REMOVE_ITEM_IS_DRAG]({ commit }) {
        commit(MutationTypes.SET_ITEM_IS_DRAG, false);
    },
    [ActionTypes.CHANGE_NUM_GRIDS]({ commit }, number = 12) {
        commit(MutationTypes.SET_NUM_GRIDS, number);
    },

    [ActionTypes.CHANGE_COLOR_GRIDS]({ commit }, string = "#1976D243") {
        commit(MutationTypes.SET_COLOR_GRIDS, string);
    },
    [ActionTypes.CHANGE_GAP_GRIDS]({ commit }, number = 10) {
        commit(MutationTypes.SET_GAP_GRIDS, number);
    },
    [ActionTypes.CHANGE_WIDTH_GRIDS]({ commit }, number = 90) {
        commit(MutationTypes.SET_WIDTH_GRIDS, number);
    },
    [ActionTypes.MAKE_EDITABLE]({ commit }) {
        commit(MutationTypes.SET_EDITABLE, true);
    },
    [ActionTypes.MAKE_UNEDITABLE]({ commit }) {
        commit(MutationTypes.SET_EDITABLE, false);
    },
    [ActionTypes.REDACTOR_IS_OPEN]({ commit }, id) {
        commit(MutationTypes.ADD_OPENED_REDACTOR, id);
    },
    [ActionTypes.REDACTOR_IS_CLOSE]({ commit }, id) {
        commit(MutationTypes.REMOVE_OPENED_REDACTOR, id);
    },
    async [ActionTypes.SET_DESKTOP_VIEWPORT]({ commit }) {
        commit(MutationTypes.SET_ENVIRONMENT_VIEWPORT, "desktop");
    },
    async [ActionTypes.SET_MOBILE_VIEWPORT]({ commit }) {
        commit(MutationTypes.SET_ENVIRONMENT_VIEWPORT, "mobile");
    },
    async [ActionTypes.CHANGE_REDEFINE_FONTS]({ commit }, val) {
        commit(MutationTypes.SET_REDEFINE_FONTS, val);
    },
    async [ActionTypes.CHANGE_FONT_PAGE](
        { commit },
        font = {
            header1: "",
            header2: "",
            text: "",
            quote: "",
        }
    ) {
        commit(MutationTypes.SET_FONT_PAGE, font);
    },
    async [ActionTypes.ADD_CODE_HEAD_PAGE]({ commit }, code: CodeInterface) {
        commit(MutationTypes.SET_CODE_HEAD_PAGE, code);
    },

    [ActionTypes.CHANGE_CODE_HEAD_PAGE]({ commit }, { id, updatedCode }) {
        commit(MutationTypes.UPDATE_CODE_HEAD_PAGE, { id, updatedCode });
    },
    [ActionTypes.DELETE_CODE_HEAD_PAGE]({ commit }, id) {
        commit(MutationTypes.DELETE_CODE_HEAD_PAGE, id);
    },

    async [ActionTypes.ADD_CODE_BODY_PAGE]({ commit }, code: CodeInterface) {
        commit(MutationTypes.SET_CODE_BODY_PAGE, code);
    },
    [ActionTypes.CHANGE_CODE_BODY_PAGE]({ commit }, { id, updatedCode }) {
        commit(MutationTypes.UPDATE_CODE_BODY_PAGE, { id, updatedCode });
    },
    [ActionTypes.DELETE_CODE_BODY_PAGE]({ commit }, id) {
        commit(MutationTypes.DELETE_CODE_BODY_PAGE, id);
    },

    [ActionTypes.CHANGE_ARRAY_CODE_HEAD_PAGE]({ commit }, updatedCode) {
        commit(MutationTypes.UPDATE_ARRAY_CODE_HEAD_PAGE, updatedCode);
    },

    [ActionTypes.CHANGE_ARRAY_CODE_BODY_PAGE]({ commit }, updatedCode) {
        commit(MutationTypes.UPDATE_ARRAY_CODE_BODY_PAGE, updatedCode);
    },
};
