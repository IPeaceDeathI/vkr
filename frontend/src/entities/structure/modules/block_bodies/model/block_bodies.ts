import { Store as VuexStore, Module } from "vuex";
import { Getters, getters } from "./getters";
import {
    StructureBlockBodiesState,
    structure_block_bodies_state as state,
} from "./state";
import { Actions, actions } from "./actions";
import { Mutations, mutations } from "./mutations";
import { RootState } from "@/entities/store";
export const STRUCTURE_BLOCK_BODIES_NAMESPACE = "blockBodies";
export type STRUCTURE_BLOCK_BODIES_NAMESPACE_TYPE = "blockBodies";
type Namespaced<T, N extends string> = {
    [P in keyof T & string as `${N}/${P}`]: T[P];
};
export type StructureBlockBodiesNamespacedGetters = Namespaced<
    Getters,
    STRUCTURE_BLOCK_BODIES_NAMESPACE_TYPE
>;
export type StructureBlockBodiesNamespacedMutations = Namespaced<
    Mutations,
    STRUCTURE_BLOCK_BODIES_NAMESPACE_TYPE
>;
export type StructureBlockBodiesNamespacedActions = Namespaced<
    Actions,
    STRUCTURE_BLOCK_BODIES_NAMESPACE_TYPE
>;

export const structure_block_bodies_store: Module<
    StructureBlockBodiesState,
    RootState
> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export { StructureBlockBodiesState };
