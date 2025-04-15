import { MutationTree } from "vuex";
import { State } from "./state";
import { MutationTypes } from "../types/mutations";
export type Mutations<S = State> = {
    [MutationTypes.SET_ADMIN](state: S, value: boolean): void;
    [MutationTypes.SET_TESET](state: S, value: boolean): void;
    [MutationTypes.SET_BLOCK_CREATOR](state: S, value: boolean): void;
    [MutationTypes.SET_COMMON_USER](state: S, value: boolean): void;
};
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_ADMIN](state, value) {
        state.admin = value;
    },
    [MutationTypes.SET_TESET](state, value) {
        state.tester = value;
    },
    [MutationTypes.SET_BLOCK_CREATOR](state, value) {
        state.blockCreator = value;
    },
    [MutationTypes.SET_COMMON_USER](state, value) {
        if (!value) return;
        state.admin = false;
        state.tester = false;
        state.blockCreator = false;
    },
};
