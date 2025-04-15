import { GetterTree } from "vuex";
import { State } from "./state";
import { RootState } from "@/entities/store";

export type Getters = {
    getId(state: State): number;

    getPageURI(state: State): string;

    getSiteId(state: State): number;
    getSiteAccessCode(state: State): number;
    getSiteSubDomain(state: State): string;

    isEmpty(state: State): boolean;
};

export const getters: GetterTree<State, RootState> & Getters = {
    getId: (state) => state.id,

    getPageURI: (state) => state.pageURI,

    getSiteId: (state) => state.siteId,
    getSiteAccessCode: (state) => state.siteAccessCode,
    getSiteSubDomain: (state) => state.siteSubDomain,

    isEmpty: (state) => state.empty,
};
