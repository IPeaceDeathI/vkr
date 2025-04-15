import { RootState, Store } from "@/entities/store";
import { StructureBlockBodiesState as State } from "./state";
import { GetterTree } from "vuex";
import {
    BlockBodyParams,
    BodyLayoutCardParams,
    BodyLayoutType,
    BodyLayoutColumnParams,
} from "@/types";
import { CriticalError } from "@/shared/services/error_service";
import { BundleCollector } from "@/entities/services";

export type Getters = {
    getBlockBodyParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => BlockBodyParams;
    getBodyLayouCardParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => BodyLayoutCardParams;
    getBodyLayouColumnParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => BodyLayoutColumnParams;
};
export const getters: GetterTree<State, RootState> & Getters = {
    getBlockBodyParamsById: (state, getters, rootState) => (id) => {
        const params = state.blockBodies.get(id);
        const context = this as unknown as Store;
        if (params) return params;
        else
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Тело блока с id ${id} не найден`,
                targetId: id,
            });
    },
    getBodyLayouCardParamsById: (state, getters, rootState) => (id) => {
        const params = state.blockBodies.get(id);
        const context = this as unknown as Store;

        if (params && params.BodyLayoutParams.type === BodyLayoutType.cards)
            return params.BodyLayoutParams;
        else
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Тело блока с id ${id} не найден`,
                targetId: id,
            });
    },
    getBodyLayouColumnParamsById: (state, getters, rootState) => (id) => {
        const params = state.blockBodies.get(id);
        const context = this as unknown as Store;

        if (params && params.BodyLayoutParams.type === BodyLayoutType.columns)
            return params.BodyLayoutParams;
        else
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Тело блока с id ${id} не найден`,
                targetId: id,
            });
    },
};
