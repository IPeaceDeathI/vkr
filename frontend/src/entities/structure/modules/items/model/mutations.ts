import { MutationTree } from "vuex";
import { MutationTypes } from "../types/mutations";
import { StructureItemsState as State } from "./state";
import { ItemParams } from "@/types";

export type Mutations<S = State> = {
    [MutationTypes.SET_ITEM](
        state: S,
        data: { id: id; params: ItemParams }
    ): void;
    [MutationTypes.SET_PARENT](state: S, data: { id: id; parentId: id }): void;
    [MutationTypes.DELETE_ITEM](state: S, id: id): void;
};
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_ITEM](state, data) {
        state.items.set(data.id, data.params);
    },
    [MutationTypes.SET_PARENT](state, { id, parentId }) {
        const item = state.items.get(id);
        // if (item) item.parentId = parentId;
    },
    [MutationTypes.DELETE_ITEM](state, id) {
        state.items.delete(id);
    },
};
