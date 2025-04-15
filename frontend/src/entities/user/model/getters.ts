import { GetterTree } from "vuex";
import { State } from "./state";
import { RootState } from "@/entities/store";

export type Getters = {
    getIsAdmin(state: State): boolean;
    getIsTester(state: State): boolean;
    getIsBlockCreator(state: State): boolean;
    getIsCommonUser(state: State): boolean;
};

export const getters: GetterTree<State, RootState> & Getters = {
    getIsAdmin: (state) => state.admin,
    getIsTester: (state) => state.tester,
    getIsBlockCreator: (state) => state.blockCreator,
    getIsCommonUser: (state) =>
        state.admin || state.tester || state.blockCreator,
};
