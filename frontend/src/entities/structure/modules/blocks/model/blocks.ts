import { Store as VuexStore, Module } from "vuex";
import { Getters, getters } from "./getters";
import { StructureBlocksState, structure_blocks_state as state } from "./state";
import { Actions, actions } from "./actions";
import { Mutations, mutations } from "./mutations";
import { RootState } from "@/entities/store";
export const STRUCTURE_BLOCKS_NAMESPACE = "blocks";
export type STRUCTURE_BLOCKS_NAMESPACE_TYPE = "blocks";
type Namespaced<T, N extends string> = {
    [P in keyof T & string as `${N}/${P}`]: T[P];
};
export type StructureBlocksNamespacedGetters = Namespaced<
    Getters,
    STRUCTURE_BLOCKS_NAMESPACE_TYPE
>;
export type StructureBlocksNamespacedMutations = Namespaced<
    Mutations,
    STRUCTURE_BLOCKS_NAMESPACE_TYPE
>;
export type StructureBlocksNamespacedActions = Namespaced<
    Actions,
    STRUCTURE_BLOCKS_NAMESPACE_TYPE
>;

export const structure_blocks_store: Module<StructureBlocksState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export { StructureBlocksState };
