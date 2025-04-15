import { ActionTree, ActionContext } from "vuex";
import { StructureBlockBodiesState as State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "../types/actions";
import { MutationTypes } from "../types/mutations";
import { RootState, Store } from "@/entities/store";
import { getUUID } from "@/shared/helpers/helpers";
import { BodyLayoutType, ElementTypes, ZoneParams, ZoneTypes } from "@/types";

import { BundleCollector, balanceBodyLayoutColumn } from "@/entities/services";
import { CriticalError } from "@/shared/services/error_service";

export type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
    dispatch<K extends keyof Actions>(
        key: K,
        payload: Parameters<Actions[K]>[1]
    ): ReturnType<Actions[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

export interface Actions {
    [ActionTypes.ADD_ZONE_TO_BLOCK_BODY](
        { commit }: AugmentedActionContext,
        data: {
            index?: number;
            blockBodyId: id;
            zoneParams: ZoneParams;
        }
    ): Promise<id | false>;
    [ActionTypes.APPLY_STYLES_TO_ALL_ZONES](
        { commit }: AugmentedActionContext,
        data: { blockBodyID: id; zoneID: id }
    ): Promise<void>;
    [ActionTypes.UPDATE_CHILDREN](
        { commit }: AugmentedActionContext,
        data: { blockBodyID: id; children: Array<id> }
    ): Promise<void>;
    [ActionTypes.REMOVE_ZONE](
        { commit }: AugmentedActionContext,
        data: { blockBodyID: id; zoneID: id }
    ): Promise<void>;
    [ActionTypes.CLEAR](
        { commit }: AugmentedActionContext,
        blockBodyID: id
    ): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.ADD_ZONE_TO_BLOCK_BODY](
        { commit },
        { index, blockBodyId, zoneParams }
    ) {
        zoneParams.parentId = blockBodyId;
        const id = getUUID();
        const context = this as unknown as Store;
        if (
            zoneParams.type === ZoneTypes.column &&
            context.getters["structure/blockBodies/getBlockBodyParamsById"](
                blockBodyId
            ).childrenIds.length >= 6
        ) {
            return false;
        }
        context.commit("structure/SET_ELEMENT", {
            id: id,
            params: { type: ElementTypes.Zone },
        });
        context.commit("structure/zones/SET_ZONE", {
            id: id,
            params: zoneParams,
        });

        //TODO тут хуйня какая-та переделать
        if (
            zoneParams.type === ZoneTypes.card ||
            zoneParams.type === ZoneTypes.column
        ) {
            if (index !== undefined) {
                commit(MutationTypes.SPLICE_CHILD_TO_BLOCK_BODY, {
                    id: blockBodyId,
                    zoneID: id,
                    index: index,
                });
            } else {
                commit(MutationTypes.PUSH_CHILD_TO_BLOCK_BODY, {
                    id: blockBodyId,
                    zoneID: id,
                });
            }
            if (zoneParams.type === ZoneTypes.column) {
                balanceBodyLayoutColumn(context, blockBodyId);
            }
        }
        return id;
    },
    async [ActionTypes.APPLY_STYLES_TO_ALL_ZONES](
        { commit },
        { blockBodyID, zoneID }
    ) {
        const context = this as unknown as Store;
        const blockBodiesParams =
            context.getters["structure/blockBodies/getBlockBodyParamsById"](
                blockBodyID
            );
        const zoneStyleParams =
            context.getters["structure/zones/getCommonZoneParamsById"](
                zoneID
            ).styles;
        blockBodiesParams.childrenIds.forEach((zone) => {
            context.getters["structure/zones/getCommonZoneParamsById"](
                zone
            ).styles = structuredClone(zoneStyleParams);
        });
    },
    async [ActionTypes.REMOVE_ZONE](
        { commit, state },
        { blockBodyID, zoneID }
    ) {
        const context = this as unknown as Store;
        const zone = state.blockBodies.get(blockBodyID);
        if (zone === undefined) {
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `blockBody with id ${blockBodyID} is undefined`,
                targetId: blockBodyID,
            });
        }
        commit(MutationTypes.DELETE_CHILD, {
            blockBodyID: blockBodyID,
            childId: zoneID,
        });
        //TODOбез него не работает удаление блока, если в нем есть колонка с кароинкой(надо разобраться, в чем проблема )
        setTimeout(() => {
            context.dispatch("structure/zones/CLEAR", zoneID);
            context.commit("structure/zones/DELETE_ZONE", zoneID);
            context.commit("structure/DELETE_ELEMENT", zoneID);
        });
        if (zone.BodyLayoutParams.type === BodyLayoutType.columns) {
            balanceBodyLayoutColumn(context, blockBodyID, true);
        }
    },
    async [ActionTypes.UPDATE_CHILDREN](
        { commit, state },
        { blockBodyID, children }
    ) {
        const context = this as unknown as Store;
        const blockBody = state.blockBodies.get(blockBodyID);
        if (blockBody === undefined) return;
        //ЕБИЕТСЬ ТУТ САМИ Я ЗАЕБАЛСЯ
        const childrensBeforeUpdate = blockBody.childrenIds ?? [];
        //remove parent id from old child
        childrensBeforeUpdate.forEach((child_id) => {
            if (!children.includes(child_id)) {
                commit(MutationTypes.DELETE_CHILD, {
                    blockBodyID: blockBodyID,
                    childId: child_id,
                });
                //TODO тут не чиститься parentID у айтемо, но я уже заебался
            }
        });
        //add parent id to new child
        children.forEach((childrenId) => {
            context.commit("structure/zones/SET_PARENT", {
                id: childrenId,
                parentId: blockBodyID,
            });
        });
        commit(MutationTypes.SET_CHILDREN, {
            id: blockBodyID,
            children: children,
        });
        if (blockBody.BodyLayoutParams.type == BodyLayoutType.columns) {
            balanceBodyLayoutColumn(context, blockBodyID, true);
        }
    },
    async [ActionTypes.CLEAR]({ dispatch, state }, blockBodyID) {
        const context = this as unknown as Store;
        const blockBody = state.blockBodies.get(blockBodyID);
        if (blockBody === undefined) {
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `blockBody with id ${blockBodyID} is undefined`,
                targetId: blockBodyID,
            });
        }
        blockBody.childrenIds.forEach((childId) => {
            dispatch(ActionTypes.REMOVE_ZONE, {
                blockBodyID: blockBodyID,
                zoneID: childId,
            });
        });
    },
};
