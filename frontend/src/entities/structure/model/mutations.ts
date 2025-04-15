import { MutationTree } from "vuex";
import { MutationTypes } from "../types/mutations";
import { State } from "./state";
import { balanceBodyLayoutColumn } from "@/entities/services";

import { ElementParams, ProjectBundle } from "@/types";

export type Mutations<S = State> = {
    [MutationTypes.SET_ELEMENT](
        state: S,
        data: { id: id; params: ElementParams }
    ): void;
    [MutationTypes.PUSH_CHILD_TO_BLOCK_AREA](state: S, id: id): void;
    [MutationTypes.PUSH_WINDOW_TO_BLOCK_AREA](state: S, id: id): void;
    [MutationTypes.SPLICE_CHILD_TO_BLOCK_AREA](
        state: S,
        data: { id: id; index: number }
    ): void;
    [MutationTypes.SET_BLOCK_AREA](state: S, id: id): void;
    [MutationTypes.SET_CHILDREN_TO_BLOCK_AREA](
        state: S,
        children: Array<id>
    ): void;

    [MutationTypes.DELETE_ELEMENT](state: S, id: id): void;
    [MutationTypes.DELETE_CHILD](state: S, childId: id): void;
    [MutationTypes.DELETE_WINDOW](state: S, id: id): void;
};

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_ELEMENT](state, data) {
        state.elements.set(data.id, data.params);
    },
    [MutationTypes.PUSH_CHILD_TO_BLOCK_AREA](state, id) {
        state.blockAreaChildren.push(id);
    },
    [MutationTypes.PUSH_WINDOW_TO_BLOCK_AREA](state, id) {
        state.windows.push(id);
    },
    [MutationTypes.SPLICE_CHILD_TO_BLOCK_AREA](state, { id, index }) {
        state.blockAreaChildren.splice(index, 0, id);
    },
    [MutationTypes.SET_BLOCK_AREA](state, id) {
        state.bloockArea = id;
    },
    [MutationTypes.SET_CHILDREN_TO_BLOCK_AREA](state, children) {
        state.blockAreaChildren = children;
    },

    [MutationTypes.DELETE_ELEMENT](state, id) {
        state.elements.delete(id);
    },
    [MutationTypes.DELETE_CHILD](state, childId) {
        state.blockAreaChildren = state.blockAreaChildren.filter(
            (elemntId) => elemntId !== childId
        );
    },
    [MutationTypes.DELETE_WINDOW](state, childId) {
        state.windows = state.windows.filter(
            (elemntId) => elemntId !== childId
        );
    },
};
