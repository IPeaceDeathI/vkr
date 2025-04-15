import { ActionTree, ActionContext } from "vuex";
import { State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "../types/actions";
import { MutationTypes } from "../types/mutations";
import { ElementTypes, WindowParams, ZoneTypes } from "@/types";
import { RootState, Store } from "@/entities/store";
import {
    StructureItemsNamespacedMutations as ItemsMutations,
    StructureZonesNamespacedMutations as ZonesMutations,
    StructureBlocksNamespacedMutations as BloksMutations,
    StructureBlockBodiesNamespacedMutations as BloksBodiesMutations,
} from "../modules";
import { getUUID, randomIntFromInterval } from "@/shared/helpers";

export type AugmentedActionContext = {
    commit<
        K extends keyof Mutations,
        I extends keyof ItemsMutations,
        Z extends keyof ZonesMutations,
        BB extends keyof BloksBodiesMutations,
        B extends keyof BloksMutations
    >(
        key: K | I | Z | BB | B,
        payload:
            | Parameters<Mutations[K]>[1]
            | Parameters<ItemsMutations[I]>[1]
            | Parameters<ZonesMutations[Z]>[1]
            | Parameters<BloksBodiesMutations[BB]>[1]
            | Parameters<BloksMutations[B]>[1]
    ):
        | ReturnType<Mutations[K]>
        | ReturnType<ItemsMutations[I]>
        | ReturnType<BloksMutations[B]>
        | ReturnType<BloksBodiesMutations[BB]>
        | ReturnType<ZonesMutations[Z]>;
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1]
    ): ReturnType<Actions[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
    [ActionTypes.ADD_BLOCK_AREA]({
        commit,
    }: AugmentedActionContext): Promise<id>;
    [ActionTypes.ELEMENT_CHANGED](
        { commit }: AugmentedActionContext,
        id: id
    ): Promise<void>;
    [ActionTypes.ADD_CHILDREN_TO_BLOCK_AREA](
        { commit }: AugmentedActionContext,
        children_id: id,
        index?: number
    ): Promise<void>;
    [ActionTypes.UPDATE_CHILDREN_TO_BLOCK_AREA](
        { commit }: AugmentedActionContext,
        children: Array<id>
    ): Promise<void>;
    [ActionTypes.ADD_WINDOW_TO_BLOCK_AREA](
        { commit }: AugmentedActionContext,
        windowParams: WindowParams
    ): Promise<id>;
    [ActionTypes.REMOVE_WINDOW_FROM_BLOCK_AREA](
        { commit }: AugmentedActionContext,
        id: id
    ): Promise<void>;
    [ActionTypes.REMOVE_BLOCK](
        { commit }: AugmentedActionContext,
        blockID: id
    ): Promise<void>;
    [ActionTypes.CLEAR]({ commit }: AugmentedActionContext): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.ADD_BLOCK_AREA]({ commit }) {
        const blockAreaId = getUUID();
        commit(MutationTypes.SET_BLOCK_AREA, blockAreaId);
        const data = {
            id: blockAreaId,
            params: { type: ElementTypes.BlockArea, children: [] },
        };
        commit(MutationTypes.SET_ELEMENT, data);
        return blockAreaId;
    },
    async [ActionTypes.ADD_CHILDREN_TO_BLOCK_AREA]({ commit }, childrenId) {
        commit(MutationTypes.PUSH_CHILD_TO_BLOCK_AREA, childrenId);
    },
    async UPDATE_CHILDREN_TO_BLOCK_AREA({ commit }, children) {
        commit(MutationTypes.SET_CHILDREN_TO_BLOCK_AREA, children);
    },
    async [ActionTypes.REMOVE_WINDOW_FROM_BLOCK_AREA]({ commit }, id) {
        const context = this as unknown as Store;
        commit(MutationTypes.DELETE_WINDOW, id);
        await context.dispatch("structure/zones/CLEAR", id);
        context.commit("structure/DELETE_ELEMENT", id);
    },
    async [ActionTypes.ADD_WINDOW_TO_BLOCK_AREA](
        { commit, state },
        windowParams
    ) {
        windowParams.parentId = state.bloockArea;
        const id = getUUID();
        const context = this as unknown as Store;
        while (!publishIdValidate(context, windowParams.publishId)) {
            windowParams.publishId = randomIntFromInterval(100000, 999999);
        }
        context.commit("structure/SET_ELEMENT", {
            id: id,
            params: { type: ElementTypes.Zone },
        });
        context.commit("structure/zones/SET_ZONE", {
            id: id,
            params: windowParams,
        });
        commit(MutationTypes.PUSH_WINDOW_TO_BLOCK_AREA, id);
        return id;
    },
    async [ActionTypes.ELEMENT_CHANGED]({ commit }, id) {
        // console.log("item_change", id);
    },
    async [ActionTypes.REMOVE_BLOCK]({ commit }, blockID) {
        const context = this as unknown as Store;
        commit(MutationTypes.DELETE_CHILD, blockID);
        await context.dispatch("structure/blocks/CLEAR", blockID);
        context.commit("structure/blocks/DELETE_BLOCK", blockID);
        context.commit("structure/DELETE_ELEMENT", blockID);
    },
    async [ActionTypes.CLEAR]({ state }) {
        const context = this as unknown as Store;
        const tasks = [] as Array<Promise<void>>;
        state.blockAreaChildren.forEach((blockId) => {
            tasks.push(context.dispatch("structure/REMOVE_BLOCK", blockId));
        });

        await Promise.all(tasks);
    },
};
function publishIdValidate(store: Store, publishId: number) {
    for (const id of store.state.structure.windows) {
        const windowParams = store.state.structure.zones.zones.get(id);
        if (
            windowParams &&
            windowParams.type === ZoneTypes.window &&
            windowParams.publishId === publishId
        ) {
            return false;
        }
    }
    return true;
}
