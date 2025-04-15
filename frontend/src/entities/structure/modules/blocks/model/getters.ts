import { RootState, Store } from "@/entities/store";
import { StructureBlocksState as State } from "./state";
import { BlockParams } from "@/types";
import { GetterTree } from "vuex";
import { CriticalError } from "@/shared/services/error_service";

export type Getters = {
    getBlockParamsById(state: State): (id: id) => BlockParams;
};
export const getters: GetterTree<State, RootState> & Getters = {
    getBlockParamsById: (state) => (id) => {
        const params = state.blocks.get(id);
        if (params) return params;
        else
            throw new CriticalError({
                bundle: "",
                message: `Блок с id ${id} не найден`,
                targetId: id,
            });
    },
};
