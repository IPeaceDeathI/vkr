import { MutationTree } from "vuex";
import { MutationTypes } from "../types/mutations";
import { StructureBlocksState as State } from "./state";
import { BlockParams } from "@/types";

export type Mutations<S = State> = {
    [MutationTypes.SET_BLOCK](
        state: S,
        data: { id: id; params: BlockParams }
    ): void;
    [MutationTypes.SET_BLOCK_TITLE_TO_BLOCK](
        state: S,
        data: { blockId: id; blockTitleId: id }
    ): void;
    // [MutationTypes.SET_BLOCK_HEADER_TO_BLOCK](
    //     state: S,
    //     data: { blockId: id; blockHeaderId: id }
    // ): void;
    // [MutationTypes.SET_BLOCK_HEADER_SECOND_ROW_TO_BLOCK](
    //     state: S,
    //     data: { blockId: id; blockHeaderId: id }
    // ): void;
    [MutationTypes.PUSH_CHILD_TO_BLOCK](
        state: S,
        data: { blockId: id; blockBodyId: id }
    ): void;
    [MutationTypes.SET_CHILDREN](
        state: S,
        data: { id: id; children: Array<id> }
    ): void;
    [MutationTypes.DELETE_BLOCK](state: S, id: id): void;
    [MutationTypes.DELETE_BLOCK_TITLE_FROM_BLOCK](state: S, id: id): void;
    // [MutationTypes.DELETE_BLOCK_HEADER_FROM_BLOCK](state: S, id: id): void;
    // [MutationTypes.DELETE_BLOCK_HEADER_SECOND_ROW_FROM_BLOCK](
    //     state: S,
    //     id: id
    // ): void;
    [MutationTypes.DELETE_CHILD](
        state: S,
        data: { blockID: id; childId: id }
    ): void;
};
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_BLOCK](state, data) {
        state.blocks.set(data.id, data.params);
    },
    [MutationTypes.SET_BLOCK_TITLE_TO_BLOCK](state, data) {
        const block = state.blocks.get(data.blockId);
        if (block) block.blockTitle = data.blockTitleId;
    },
    // [MutationTypes.SET_BLOCK_HEADER_TO_BLOCK](state, data) {
    //     const block = state.blocks.get(data.blockId);
    //     // if (block) block.header = data.blockHeaderId;
    // },
    // [MutationTypes.SET_BLOCK_HEADER_SECOND_ROW_TO_BLOCK](state, data) {
    //     const block = state.blocks.get(data.blockId);
    //     // if (block) block.headerSecondRow = data.blockHeaderId;
    // },
    [MutationTypes.PUSH_CHILD_TO_BLOCK](state, data) {
        const block = state.blocks.get(data.blockId);
        if (block) block.childrenBlockBodiesId.push(data.blockBodyId);
    },
    [MutationTypes.SET_CHILDREN](state, { id, children }) {
        const block = state.blocks.get(id);
        if (block === undefined) return;
        block.childrenBlockBodiesId = children;
    },
    [MutationTypes.DELETE_BLOCK](state, id) {
        state.blocks.delete(id);
    },
    [MutationTypes.DELETE_BLOCK_TITLE_FROM_BLOCK](state, id) {
        const block = state.blocks.get(id);
        if (block) {
            block.blockTitle = false;
            block.blockTitleIsEnabled = false;
        }
    },
    // [MutationTypes.DELETE_BLOCK_HEADER_FROM_BLOCK](state, id) {
    //     const block = state.blocks.get(id);
    //     if (block) {
    //         // block.header = false;
    //         block.headerIsEnabled = false;
    //     }
    // },
    // [MutationTypes.DELETE_BLOCK_HEADER_SECOND_ROW_FROM_BLOCK](state, id) {
    //     const block = state.blocks.get(id);
    //     if (block) {
    //         // block.headerSecondRow = false;
    //         // block.headerSecondRowIsEnabled = false;
    //     }
    // },
    [MutationTypes.DELETE_CHILD](state, { blockID, childId }) {
        const block = state.blocks.get(blockID);
        if (block) {
            block.childrenBlockBodiesId = block.childrenBlockBodiesId.filter(
                (elemntId) => elemntId !== childId
            );
        }
    },
};
