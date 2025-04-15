import { GetterTree } from "vuex";
import { State } from "./state";
import { RootState, Store } from "@/entities/store";
import { ElementTypes, ElementParams } from "@/types";
import { ElementTypeParams } from "../types/getters";
import { CriticalError } from "@/shared/services/error_service";
import { BundleCollector } from "@/entities/services";
export type Getters = {
    getElementParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => ElementParams;
    getBlockAreaId(state: State): id;
    getBlockAreaChildren(state: State): Array<id>;
    getElementTypeParamsById(
        state: State
    ): (id: id) => ElementTypeParams | undefined;
    getElementIds(state: State): IterableIterator<id>;
    getWindows(state: State): Array<id>;
};

export const getters: GetterTree<State, RootState> & Getters = {
    getElementParamsById: (state, getters, rootState) => (id) => {
        const params = state.elements.get(id);
        if (params) return params;
        else {
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Элемент с id ${id} не найден`,
                targetId: id,
            });
        }
    },
    getElementTypeParamsById: (state) => (id) => {
        //TODO переписать на вызовы других соседжних геттеров
        switch (state.elements.get(id)?.type) {
            case ElementTypes.Block:
                return state.blocks.blocks.get(id);
            case ElementTypes.BlockBody:
                return state.blockBodies.blockBodies.get(id);
            case ElementTypes.Zone:
                return state.zones.zones.get(id);
            case ElementTypes.Item:
                return state.items.items.get(id);
            default:
                return undefined;
        }
    },
    getBlockAreaChildren: (state) => {
        return state.blockAreaChildren;
    },
    getBlockAreaId: (state) => {
        return state.bloockArea;
    },
    getElementIds: (state) => {
        return state.elements.keys();
    },
    getWindows: (state) => {
        return state.windows;
    },
};
