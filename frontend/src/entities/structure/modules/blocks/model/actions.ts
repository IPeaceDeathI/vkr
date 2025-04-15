import { ActionTree, ActionContext } from "vuex";
import { StructureBlocksState as State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "../types/actions";
import { MutationTypes } from "../types/mutations";
import { RootState, Store } from "@/entities/store";
import { getUUID } from "@/shared/helpers/helpers";
import { ElementsFabric } from "@/shared/services/elements_fabrics";
import {
    BlockBodyParams,
    BlockHeaderParams,
    BlockParams,
    BlockTitleParams,
    BodyLayoutType,
    ElementTypes,
    ZoneTypes,
} from "@/types";
import {
    StructureNamespacedActions,
    StructureNamespacedMutations,
} from "@/entities/structure/model";
import { BlockBodyFabric } from "@/shared/services/elements_fabrics/block_body_fabric";
import { ZonesFabric } from "@/shared/services/elements_fabrics/zones_fabric";
import { CriticalError } from "@/shared/services/error_service";
import { BundleCollector } from "@/entities/services";
export type AugmentedActionContext = {
    commit<
        K extends keyof Mutations,
        S extends keyof StructureNamespacedMutations
    >(
        key: K | S,
        payload:
            | Parameters<Mutations[K]>[1]
            | Parameters<StructureNamespacedMutations[S]>[1]
    ): ReturnType<Mutations[K]> | ReturnType<StructureNamespacedMutations[S]>;
    dispatch<
        K extends keyof Actions,
        S extends keyof StructureNamespacedActions
    >(
        key: K | S,
        payload:
            | Parameters<Actions[K]>[1]
            | Parameters<StructureNamespacedActions[S]>[1]
    ): ReturnType<Actions[K]> | ReturnType<StructureNamespacedActions[S]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
    [ActionTypes.ADD_BLOCK](
        { commit }: AugmentedActionContext,
        data: { index?: number; parentBlockArea: id; params?: BlockParams }
    ): Promise<id>;
    [ActionTypes.ADD_BLOCK_BODY_TO_BLOCK](
        { commit }: AugmentedActionContext,
        data: {
            index?: number;
            blockId: id;
            childrenParamsChildrenIds?: Array<id>; // массив детей blockbody(zones)
            childrenParams?: BlockBodyParams;
        }
    ): Promise<id>;
    [ActionTypes.REMOVE_BLOCK_BODY_FROM_BLOCK](
        { commit }: AugmentedActionContext,
        data: {
            blockId: id;
            blockBodyID: id;
        }
    ): Promise<void>;
    [ActionTypes.ADD_BLOCK_TITLE_TO_BLOCK](
        { commit }: AugmentedActionContext,
        data: {
            blockId: id;
            params?: BlockTitleParams;
        }
    ): Promise<id>;
    //TODO доделать
    [ActionTypes.REMOVE_BLOCK_TITLE_FROM_BLOCK](
        { commit }: AugmentedActionContext,
        data: {
            blockId: id;
            blockTitleId: id;
        }
    ): Promise<void>;
    [ActionTypes.ADD_BLOCK_HEADER_TO_BLOCK](
        { commit }: AugmentedActionContext,
        data: {
            blockId: id;
            params?: BlockHeaderParams;
        }
    ): Promise<id>;
    [ActionTypes.REMOVE_BLOCK_HEADER_FROM_BLOCK](
        { commit }: AugmentedActionContext,
        data: {
            blockId: id;
            // blockHeaderId: id;
        }
    ): Promise<void>;
    [ActionTypes.ADD_BLOCK_HEADER_SECOND_ROW_TO_BLOCK](
        { commit }: AugmentedActionContext,
        data: {
            blockId: id;
            params?: BlockHeaderParams;
        }
    ): Promise<id>;
    [ActionTypes.REMOVE_BLOCK_HEADER_SECOND_ROW_FROM_BLOCK](
        { commit }: AugmentedActionContext,
        data: {
            blockId: id;
            blockHeaderSRId: id;
        }
    ): Promise<void>;
    [ActionTypes.CLEAR](
        { commit }: AugmentedActionContext,
        blockID: id
    ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.ADD_BLOCK](
        { commit, dispatch },
        {
            index,
            parentBlockArea,
            params = ElementsFabric.getBlock().getDefaultParams(
                parentBlockArea
            ),
        }
    ) {
        const id = getUUID();
        const context = this as unknown as Store;
        context.commit("structure/SET_ELEMENT", {
            id: id,
            params: { type: ElementTypes.Block },
        });
        if (index !== undefined) {
            context.commit("structure/SPLICE_CHILD_TO_BLOCK_AREA", {
                id: id,
                index: index,
            });
        } else {
            context.commit("structure/PUSH_CHILD_TO_BLOCK_AREA", id);
        }
        commit(MutationTypes.SET_BLOCK, {
            id: id,
            params: params,
        });

        return id;
    },
    async [ActionTypes.ADD_BLOCK_BODY_TO_BLOCK](
        { commit },
        {
            blockId,
            childrenParams = {
                parentId: blockId,
                childrenIds: [],
                BodyLayoutParams: BlockBodyFabric.getInstance()
                    .getBodyLayout(BodyLayoutType.columns)
                    .getDefaultParams(),
            },
        }
    ) {
        const context = this as unknown as Store;
        const blockBodyId = getUUID();
        context.commit("structure/SET_ELEMENT", {
            id: blockBodyId,
            params: { type: ElementTypes.BlockBody },
        });
        context.commit("structure/blockBodies/SET_BLOCK_BODY", {
            id: blockBodyId,
            params: childrenParams,
        });
        commit(MutationTypes.PUSH_CHILD_TO_BLOCK, {
            blockId: blockId,
            blockBodyId: blockBodyId,
        });
        return blockBodyId;
    },
    //TODOдобавить проверку на наличие указанного ребенка ВО ВСЕ ЭЛЕМЕНТЫ
    async [ActionTypes.REMOVE_BLOCK_BODY_FROM_BLOCK](
        { commit },
        { blockId, blockBodyID }
    ) {
        const context = this as unknown as Store;
        commit(MutationTypes.DELETE_CHILD, {
            blockID: blockId,
            childId: blockBodyID,
        });
        await context.dispatch("structure/blockBodies/CLEAR", blockBodyID);
        context.commit("structure/blockBodies/DELETE_BLOCK_BODY", blockBodyID);
        context.commit("structure/DELETE_ELEMENT", blockBodyID);
    },
    async [ActionTypes.ADD_BLOCK_TITLE_TO_BLOCK](
        { commit },
        {
            blockId,
            params = ZonesFabric.getInstance()
                .getZone(ZoneTypes.blockTitle)
                .getDefaultParams(blockId, []),
        }
    ) {
        const context = this as unknown as Store;
        const blockTitleId = getUUID();
        params.parentId = blockId;
        context.commit("structure/zones/SET_ZONE", {
            id: blockTitleId,
            params: params,
        });
        context.commit("structure/SET_ELEMENT", {
            id: blockTitleId,
            params: { type: ElementTypes.Zone },
        });

        commit(MutationTypes.SET_BLOCK_TITLE_TO_BLOCK, {
            blockId: blockId,
            blockTitleId: blockTitleId,
        });
        return blockTitleId;
    },
    //TODO доделать
    async [ActionTypes.REMOVE_BLOCK_TITLE_FROM_BLOCK](
        { commit, state },
        { blockId, blockTitleId }
    ) {
        const context = this as unknown as Store;
        commit(MutationTypes.DELETE_BLOCK_TITLE_FROM_BLOCK, blockId);
        await context.dispatch("structure/zones/CLEAR", blockTitleId);
        context.commit("structure/DELETE_ELEMENT", blockTitleId);
    },

    async [ActionTypes.CLEAR]({ dispatch, commit, state }, blockID) {
        const block = state.blocks.get(blockID);
        const context = this as unknown as Store;
        if (block === undefined)
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `block with id ${block} is undefined`,
                targetId: block,
            });
        const blockTitleId = block.blockTitle;
        // const blockHeader = block.header;
        // const blockHeaderSR = block.headerSecondRow;
        const tasks: Array<Promise<void>> = [];
        // TODO вернуть после того, как доделаем action
        if (blockTitleId !== false) {
            tasks.push(
                context.dispatch(
                    "structure/blocks/REMOVE_BLOCK_TITLE_FROM_BLOCK",
                    {
                        blockId: blockID,
                        blockTitleId: blockTitleId,
                    }
                )
            );
        }
        if (block.headerIsEnabled) {
            tasks.push(
                context.dispatch(
                    "structure/blocks/REMOVE_BLOCK_HEADER_FROM_BLOCK",
                    {
                        blockId: blockID,
                        // blockHeaderId: blockHeader,
                    }
                )
            );
        }
        // tasks.push(
        //     context.dispatch(
        //         "structure/blocks/REMOVE_BLOCK_HEADER_SECOND_ROW_FROM_BLOCK",
        //         {
        //             blockId: blockID,
        //             // blockHeaderSRId: blockHeaderSR,
        //         }
        //     )
        // );
        block.childrenBlockBodiesId.forEach((childId) => {
            tasks.push(
                dispatch(ActionTypes.REMOVE_BLOCK_BODY_FROM_BLOCK, {
                    blockID: blockID,
                    blockBodyID: childId,
                })
            );
        });
        await Promise.all(tasks);
    },
    async [ActionTypes.ADD_BLOCK_HEADER_TO_BLOCK](
        { commit },
        {
            blockId,
            params = ZonesFabric.getInstance()
                .getZone(ZoneTypes.blockHeader)
                .getDefaultParams(blockId),
        }
    ) {
        const context = this as unknown as Store;
        params.parentId = blockId;
        const blockHeaderId = getUUID();
        context.commit("structure/zones/SET_ZONE", {
            id: blockHeaderId,
            params: params,
        });
        context.commit("structure/SET_ELEMENT", {
            id: blockHeaderId,
            params: { type: ElementTypes.Zone },
        });

        // commit(MutationTypes.SET_BLOCK_HEADER_TO_BLOCK, {
        //     blockId: blockId,
        //     blockHeaderId: blockHeaderId,
        // });
        return blockHeaderId;
    },
    async [ActionTypes.ADD_BLOCK_HEADER_SECOND_ROW_TO_BLOCK](
        { commit },
        {
            blockId,
            params = ZonesFabric.getInstance()
                .getZone(ZoneTypes.blockHeader)
                .getDefaultParams(blockId, true),
        }
    ) {
        const context = this as unknown as Store;
        params.parentId = blockId;
        const blockHeaderId = getUUID();
        context.commit("structure/zones/SET_ZONE", {
            id: blockHeaderId,
            params: params,
        });
        context.commit("structure/SET_ELEMENT", {
            id: blockHeaderId,
            params: { type: ElementTypes.Zone },
        });

        // commit(MutationTypes.SET_BLOCK_HEADER_SECOND_ROW_TO_BLOCK, {
        //     blockId: blockId,
        //     blockHeaderId: blockHeaderId,
        // });
        return blockHeaderId;
    },
    async [ActionTypes.REMOVE_BLOCK_HEADER_FROM_BLOCK](
        { commit, state },
        { blockId } // { blockId, blockHeaderId }
    ) {
        const context = this as unknown as Store;
        // commit(MutationTypes.DELETE_BLOCK_HEADER_FROM_BLOCK, blockId);
        // await context.dispatch("structure/zones/CLEAR", blockHeaderId);
        // context.commit("structure/DELETE_ELEMENT", blockHeaderId);
    },
    async [ActionTypes.REMOVE_BLOCK_HEADER_SECOND_ROW_FROM_BLOCK](
        { commit, state },
        { blockId } // { blockId, blockHeaderSRId }
    ) {
        const context = this as unknown as Store;
        // commit(
        //     MutationTypes.DELETE_BLOCK_HEADER_SECOND_ROW_FROM_BLOCK,
        //     blockId
        // );
        // await context.dispatch("structure/zones/CLEAR", blockHeaderSRId);
        // context.commit("structure/DELETE_ELEMENT", blockHeaderSRId);
    },
};
