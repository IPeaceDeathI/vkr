import { MutationTree } from "vuex";
import { MutationTypes } from "../types/mutations";
import { StructureZonesState as State } from "./state";
import { BlockHeaderParams, ZoneParams } from "@/types";

export type Mutations<S = State> = {
    [MutationTypes.SET_ZONE](
        state: S,
        data: { id: id; params: ZoneParams }
    ): void;
    [MutationTypes.PUSH_ITEM_TO_CHILDREN](
        state: S,
        data: { id: id; childId: id }
    ): void;

    [MutationTypes.SET_CHILDREN](
        state: S,
        data: { id: id; children: Array<id> }
    ): void;

    [MutationTypes.SET_PARENT](state: S, data: { id: id; parentId: id }): void;
    [MutationTypes.SET_ITEM_TO_CHILDREN](
        state: S,
        data: { id: id; childId: id; index?: number }
    ): void;
    [MutationTypes.DELETE_ZONE](state: S, id: id): void;
    [MutationTypes.DELETE_CHILD](state: S, data: { id: id; childId: id }): void;
};
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_ZONE](state, data) {
        state.zones.set(data.id, data.params);
    },
    [MutationTypes.PUSH_ITEM_TO_CHILDREN](state, data) {
        const zone = state.zones.get(data.id);
        if (zone === undefined) return;
        zone.childrenIds.push(data.childId);
    },

    [MutationTypes.SET_CHILDREN](state, { id, children }) {
        const zone = state.zones.get(id);
        if (zone === undefined) return;
        ``;
        zone.childrenIds = children;
    },

    [MutationTypes.SET_PARENT](state, { id, parentId }) {
        const zone = state.zones.get(id);
        if (zone) zone.parentId = parentId;
    },
    [MutationTypes.SET_ITEM_TO_CHILDREN](state, data) {
        const zone = state.zones.get(data.id);
        if (zone === undefined) return;
        if (data.index !== undefined) {
            zone.childrenIds.splice(data.index, 0, data.childId);
        } else {
            zone.childrenIds.push(data.childId);
        }
    },
    [MutationTypes.DELETE_ZONE](state, id) {
        state.zones.delete(id);
    },
    [MutationTypes.DELETE_CHILD](state, { id, childId }) {
        const zone = state.zones.get(id);
        if (zone) {
            zone.childrenIds = zone.childrenIds?.filter(
                (elemntId) => elemntId !== childId
            );
        }
    },
};
