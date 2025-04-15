import { ActionTree, ActionContext } from "vuex";
import { StructureItemsState as State } from "./state";
import { Mutations } from "./mutations";
import { ActionTypes } from "../types/actions";
import { MutationTypes } from "../types/mutations";
import { ItemParams } from "@/types";
import { RootState } from "@/entities/store";
import { getUUID } from "@/shared/helpers/helpers";

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
    [ActionTypes.TMP](
        { commit }: AugmentedActionContext,
        data: { index?: number; parentZoneId: id; params: ItemParams }
    ): Promise<void>;
}
export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.TMP](
        { commit, state },
        { index = 0, parentZoneId, params }
    ) {
        const id = getUUID();
        // commit(MutationTypes.SET_ELEMENT, {
        //     id: id,
        //     params: {
        //         parentId: parentZoneId,
        //         children: [],
        //         type: ElementTypes.Item,
        //     },
        // });
        // commit(MutationTypes.SET_CHILD_TO_ELEMENT, {
        //     id: parentZoneId,
        //     childId: id,
        //     index: index,
        // });
        commit(MutationTypes.SET_ITEM, { id: id, params: params });
    },
};
