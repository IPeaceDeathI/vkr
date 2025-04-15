import { Store as VuexStore, Module } from "vuex";
import { Getters, getters } from "./getters";
import { StructureZonesState, structure_zones_state as state } from "./state";
import { Actions, actions } from "./actions";
import { Mutations, mutations } from "./mutations";
import { RootState } from "@/entities/store";
export const STRUCTURE_ZONES_NAMESPACE = "zones";
export type STRUCTURE_ZONES_NAMESPACE_TYPE = "zones";
type Namespaced<T, N extends string> = {
    [P in keyof T & string as `${N}/${P}`]: T[P];
};
export type StructureZonesNamespacedGetters = Namespaced<
    Getters,
    STRUCTURE_ZONES_NAMESPACE_TYPE
>;
export type StructureZonesNamespacedMutations = Namespaced<
    Mutations,
    STRUCTURE_ZONES_NAMESPACE_TYPE
>;
export type StructureZonesNamespacedActions = Namespaced<
    Actions,
    STRUCTURE_ZONES_NAMESPACE_TYPE
>;

// type Namespaced = Namespaced<Mutations, "structure">;

export const structure_zones_store: Module<StructureZonesState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export { StructureZonesState };
