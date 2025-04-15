import { Mutations } from "./mutations";
import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { ActionTypes } from "../types/actions";
import { RootState, Store } from "@/entities/store";
import { MutationTypes } from "../types/mutations";

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
    [ActionTypes.UPDATE_ADMIN](
        { commit }: AugmentedActionContext,
        value: boolean
    ): Promise<void>;
    [ActionTypes.UPDATE_BLOCK_CREATOR](
        { commit }: AugmentedActionContext,
        value: boolean
    ): Promise<void>;
    [ActionTypes.UPDATE_TESTER](
        { commit }: AugmentedActionContext,
        value: boolean
    ): Promise<void>;
    [ActionTypes.UPDATE_COMMON_USER](
        { commit }: AugmentedActionContext,
        value: boolean
    ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.UPDATE_ADMIN]({ commit }, value) {
        commit(MutationTypes.SET_ADMIN, value);
    },
    async [ActionTypes.UPDATE_TESTER]({ commit }, value) {
        commit(MutationTypes.SET_TESET, value);
    },
    async [ActionTypes.UPDATE_BLOCK_CREATOR]({ commit }, value) {
        commit(MutationTypes.SET_BLOCK_CREATOR, value);
    },
    async [ActionTypes.UPDATE_COMMON_USER]({ commit }, value) {
        commit(MutationTypes.SET_COMMON_USER, value);
    },
};
