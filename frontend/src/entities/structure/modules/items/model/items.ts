import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    Module,
} from "vuex";
import { Getters, getters } from "./getters";
import { StructureItemsState, structure_items_state as state } from "./state";
import { Actions, actions } from "./actions";
import { Mutations, mutations } from "./mutations";
import { RootState } from "@/entities/store";
export const STRUCTURE_ITEMS_NAMESPACE = "items";
export type STRUCTURE_ITEMS_NAMESPACE_TYPE = "items";
type Namespaced<T, N extends string> = {
    [P in keyof T & string as `${N}/${P}`]: T[P];
};
export type StructureItemsNamespacedGetters = Namespaced<
    Getters,
    STRUCTURE_ITEMS_NAMESPACE_TYPE
>;
export type StructureItemsNamespacedMutations = Namespaced<
    Mutations,
    STRUCTURE_ITEMS_NAMESPACE_TYPE
>;
export type StructureItemsNamespacedActions = Namespaced<
    Actions,
    STRUCTURE_ITEMS_NAMESPACE_TYPE
>;

// type Namespaced = Namespaced<Mutations, "structure">;

export const structure_items_store: Module<StructureItemsState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export { StructureItemsState };
