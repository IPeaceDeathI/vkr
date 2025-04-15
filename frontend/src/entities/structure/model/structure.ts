import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    Module,
    ModuleTree,
} from "vuex";
import { Getters, getters } from "./getters";
import {
    StructureItemsActions,
    StructureItemsGetters,
    StructureItemsMutations,
    structure_items_store,
    STRUCTURE_ITEMS_NAMESPACE,
    StructureZonesActions,
    StructureZonesGetters,
    StructureZonesMutations,
    structure_zones_store,
    STRUCTURE_ZONES_NAMESPACE,
    StructureBlockBodiesActions,
    StructureBlockBodiesGetters,
    StructureBlockBodiesMutations,
    structure_block_bodies_store,
    STRUCTURE_BLOCK_BODIES_NAMESPACE,
    StructureBlocksActions,
    StructureBlocksGetters,
    StructureBlocksMutations,
    structure_blocks_store,
    STRUCTURE_BLOCKS_NAMESPACE,
} from "../modules";
import { State, state } from "./state";
import { Actions, actions } from "./actions";
import { Mutations, mutations } from "./mutations";
import { RootState } from "@/entities/store";
export const NAMESPACE = "structure";
type Namespaced<T, N extends string> = {
    [P in keyof T & string as `${N}/${P}`]: T[P];
};
export type StructureNamespacedGetters = Namespaced<Getters, "structure">;
export type StructureNamespacedMutations = Namespaced<Mutations, "structure">;
export type StructureNamespacedActions = Namespaced<Actions, "structure">;

type UnionNamespacedGetters = StructureNamespacedGetters &
    Namespaced<StructureItemsGetters, "structure/items"> &
    Namespaced<StructureBlocksGetters, "structure/blocks"> &
    Namespaced<StructureBlockBodiesGetters, "structure/blockBodies"> &
    Namespaced<StructureZonesGetters, "structure/zones">;
type UnionNamespacedMutations = StructureNamespacedMutations &
    Namespaced<StructureItemsMutations, "structure/items"> &
    Namespaced<StructureBlocksMutations, "structure/blocks"> &
    Namespaced<StructureBlockBodiesMutations, "structure/blockBodies"> &
    Namespaced<StructureZonesMutations, "structure/zones">;
type UnionNamespacedActions = StructureNamespacedActions &
    Namespaced<StructureItemsActions, "structure/items"> &
    Namespaced<StructureBlocksActions, "structure/blocks"> &
    Namespaced<StructureBlockBodiesActions, "structure/blockBodies"> &
    Namespaced<StructureZonesActions, "structure/zones">;

const modules: ModuleTree<RootState> = {
    [STRUCTURE_ITEMS_NAMESPACE]: structure_items_store,
    [STRUCTURE_ZONES_NAMESPACE]: structure_zones_store,
    [STRUCTURE_BLOCKS_NAMESPACE]: structure_blocks_store,
    [STRUCTURE_BLOCK_BODIES_NAMESPACE]: structure_block_bodies_store,
};
// type Namespaced = Namespaced<Mutations, "structure">;

export const store: Module<State, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules,
};
export type StructureStore<S = State> = Omit<
    VuexStore<S>,
    "getters" | "commit" | "dispatch"
> & {
    getters: {
        [K in keyof UnionNamespacedGetters]: ReturnType<
            UnionNamespacedGetters[K]
        >;
    };
} & {
    commit<K extends keyof UnionNamespacedMutations>(
        key: K,
        payload: Parameters<UnionNamespacedMutations[K]>[1],
        options?: CommitOptions
    ): ReturnType<UnionNamespacedMutations[K]>;
} & {
    dispatch<K extends keyof UnionNamespacedActions>(
        key: K,
        payload: Parameters<UnionNamespacedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<UnionNamespacedActions[K]>;
};

export { State };
