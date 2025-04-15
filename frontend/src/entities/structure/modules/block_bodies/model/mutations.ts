import { MutationTree } from "vuex";
import { MutationTypes } from "../types/mutations";
import { StructureBlockBodiesState as State } from "./state";
import { BlockBodyParams } from "@/types";

export type Mutations<S = State> = {
    [MutationTypes.SET_BLOCK_BODY](
        state: S,
        data: { id: id; params: BlockBodyParams }
    ): void;
    [MutationTypes.PUSH_CHILD_TO_BLOCK_BODY](
        state: S,
        data: { id: id; zoneID: id }
    ): void;
    [MutationTypes.SPLICE_CHILD_TO_BLOCK_BODY](
        state: S,
        data: { id: id; zoneID: id; index: number }
    ): void;
    [MutationTypes.SET_CHILDREN](
        state: S,
        data: { id: id; children: Array<id> }
    ): void;
    [MutationTypes.DELETE_BLOCK_BODY](state: S, id: id): void;
    [MutationTypes.DELETE_CHILD](
        state: S,
        data: { blockBodyID: id; childId: id }
    ): void;
};
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_BLOCK_BODY](state, data) {
        state.blockBodies.set(data.id, data.params);
    },
    [MutationTypes.PUSH_CHILD_TO_BLOCK_BODY](state, data) {
        const blockBody = state.blockBodies.get(data.id);
        if (blockBody) blockBody.childrenIds.push(data.zoneID);
    },
    [MutationTypes.SPLICE_CHILD_TO_BLOCK_BODY](state, data) {
        const blockBody = state.blockBodies.get(data.id);
        if (blockBody) blockBody.childrenIds.splice(data.index, 0, data.zoneID);
    },
    [MutationTypes.SET_CHILDREN](state, { id, children }) {
        const blockBody = state.blockBodies.get(id);
        if (blockBody === undefined) return;
        blockBody.childrenIds = children;
    },
    [MutationTypes.DELETE_BLOCK_BODY](state, id) {
        state.blockBodies.delete(id);
    },
    [MutationTypes.DELETE_CHILD](state, { blockBodyID, childId }) {
        const blockBody = state.blockBodies.get(blockBodyID);
        if (blockBody) {
            blockBody.childrenIds = blockBody.childrenIds?.filter(
                (elemntId) => elemntId !== childId
            );
        }
    },
};
