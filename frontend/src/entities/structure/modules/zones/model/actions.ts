import { ActionTree, ActionContext } from "vuex";
import { StructureZonesState as State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes, ColumnShiftDirection } from "../types/actions";
import { MutationTypes } from "../types/mutations";
import {
    ElementTypes,
    ItemParams,
    MAX_COLS_SIZE,
    MIN_COLS_SIZE,
    ZoneTypes,
} from "@/types";
import { RootState, Store } from "@/entities/store";
import { getUUID } from "@/shared/helpers/helpers";
import { BundleCollector, ColumnShiftService } from "@/entities/services";
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
    [ActionTypes.ADD_ITEM_TO_ZONE](
        { commit }: AugmentedActionContext,
        data: { index?: number; parentZoneId: id; params: ItemParams }
    ): Promise<id>;
    [ActionTypes.ADD_SECONDS_ITEM_TO_ZONE](
        { commit }: AugmentedActionContext,
        data: { parentZoneId: id; params: ItemParams }
    ): Promise<id>;
    [ActionTypes.SHIFT_COLUMNS](
        { commit }: AugmentedActionContext,
        data: {
            blockBodyId: id;
            index: number;
            shiftDirection: ColumnShiftDirection;
        }
    ): Promise<boolean>;
    [ActionTypes.INCREASE_COLUMN](
        { commit }: AugmentedActionContext,
        id: id
    ): Promise<boolean>;
    [ActionTypes.REDUCE_COLUMN](
        { commit }: AugmentedActionContext,
        id: id
    ): Promise<boolean>;
    [ActionTypes.UPDATE_CHILDREN](
        { commit }: AugmentedActionContext,
        data: { zoneId: id; children: Array<id> }
    ): Promise<void>;
    [ActionTypes.REMOVE_ITEM](
        { commit }: AugmentedActionContext,
        data: { zoneID: id; itemID: id }
    ): Promise<void>;
    [ActionTypes.CLEAR](
        { commit }: AugmentedActionContext,
        zoneID: id
    ): Promise<void>;
}
export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.ADD_ITEM_TO_ZONE]({ commit, state }, data) {
        const context = this as unknown as Store;
        const zoneParams = state.zones.get(data.parentZoneId);
        if (zoneParams === undefined) {
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `zone with id ${data.parentZoneId} is not has not`,
            });
        }
        // data.params.parentId = data.parentZoneId;
        const itemID = getUUID();
        context.commit("structure/SET_ELEMENT", {
            id: itemID,
            params: { type: ElementTypes.Item },
        });
        context.commit("structure/items/SET_ITEM", {
            id: itemID,
            params: data.params,
        });
        commit(MutationTypes.SET_ITEM_TO_CHILDREN, {
            index: data.index,
            id: data.parentZoneId,
            childId: itemID,
        });
        return itemID;
    },
    //TMP
    async [ActionTypes.ADD_SECONDS_ITEM_TO_ZONE]({ commit, state }, data) {
        const context = this as unknown as Store;
        const zoneParams = state.zones.get(data.parentZoneId);
        if (zoneParams === undefined) {
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `zone with id ${data.parentZoneId} is not has not`,
            });
        }
        if (zoneParams.type !== ZoneTypes.card) {
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `zone with id ${data.parentZoneId} is not has card`,
            });
        }
        // data.params.parentId = data.parentZoneId;
        const itemID = getUUID();
        context.commit("structure/SET_ELEMENT", {
            id: itemID,
            params: { type: ElementTypes.Item },
        });
        context.commit("structure/items/SET_ITEM", {
            id: itemID,
            params: data.params,
        });
        zoneParams.secondChildrenIds.push(itemID);
        return itemID;
    },
    async [ActionTypes.SHIFT_COLUMNS]({ commit }, data) {
        const result = ColumnShiftService.shiftColumn(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            this,
            data.blockBodyId,
            data.index,
            data.shiftDirection
        );
        return result;
    },
    async [ActionTypes.INCREASE_COLUMN]({ commit, state }, id) {
        const column = state.zones.get(id);
        const context = this as unknown as Store;

        if (column === undefined || column.type !== ZoneTypes.column) {
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `zone with id ${id} is not a column`,
                targetId: id,
            });
        }
        if (column.cols >= MAX_COLS_SIZE) {
            return false;
        } else {
            column.cols += 1;
            return true;
        }
    },
    async [ActionTypes.REDUCE_COLUMN]({ commit, state }, id) {
        const column = state.zones.get(id);
        const context = this as unknown as Store;

        if (column === undefined || column.type !== ZoneTypes.column) {
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `zone with id ${id} is not a column`,
                targetId: id,
            });
        }
        if (column.cols <= MIN_COLS_SIZE) {
            return false;
        } else {
            column.cols -= 1;
            return true;
        }
    },
    async [ActionTypes.UPDATE_CHILDREN](
        { commit, state },
        { zoneId, children }
    ) {
        const context = this as unknown as Store;
        const zone = state.zones.get(zoneId);
        if (zone === undefined) return;
        //ЕБИЕТСЬ ТУТ САМИ Я ЗАЕБАЛСЯ
        const childrensBeforeUpdate = zone.childrenIds ?? [];
        //remove parent id from old child
        childrensBeforeUpdate.forEach((child_id) => {
            if (!children.includes(child_id)) {
                commit(MutationTypes.DELETE_CHILD, {
                    id: zoneId,
                    childId: child_id,
                });
                //TODO тут не чиститься parentID у айтемо, но я уже заебался
            }
        });
        //add parent id to new child
        children.forEach((childrenId) => {
            context.commit("structure/items/SET_PARENT", {
                id: childrenId,
                parentId: zoneId,
            });
        });
        commit(MutationTypes.SET_CHILDREN, {
            id: zoneId,
            children: children,
        });
    },
    async [ActionTypes.REMOVE_ITEM]({ commit }, { zoneID, itemID }) {
        const context = this as unknown as Store;
        commit(MutationTypes.DELETE_CHILD, { id: zoneID, childId: itemID });
        context.commit("structure/items/DELETE_ITEM", itemID);
        context.commit("structure/DELETE_ELEMENT", itemID);
    },
    async [ActionTypes.CLEAR]({ dispatch, state }, zoneID) {
        const context = this as unknown as Store;
        const zone = state.zones.get(zoneID);
        if (zone === undefined)
            throw new CriticalError({
                bundle: BundleCollector.collectProject(context),
                message: `zone with ${zoneID} is undefined`,
                targetId: zoneID,
            });
        zone.childrenIds.forEach((childId) => {
            dispatch(ActionTypes.REMOVE_ITEM, {
                zoneID: zoneID,
                itemID: childId,
            });
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const tmp = zone.secondChildrenIds;
        if (tmp !== undefined) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            tmp.forEach((childId) => {
                dispatch(ActionTypes.REMOVE_ITEM, {
                    zoneID: zoneID,
                    itemID: childId,
                });
            });
        }
    },
};
