import {
    CommonItemsParams,
    ItemButtonParams,
    ItemIconParams,
    ItemTextParams,
    ItemParams,
    ItemTypes,
    ItemFormParams,
    MediaType,
    ItemImageParams,
    ItemQuizParams,
    ItemMenuParams,
    ItemHeaderDividerParams,
} from "@/types";
import { StructureItemsState as State } from "./state";
import { GetterTree } from "vuex";
import { RootState, Store } from "@/entities/store";
import { CriticalError } from "@/shared/services/error_service";
import { ItemIconTextParams } from "@/types/structure/items/IconText";

export type Getters = {
    getItemParamsById(state: State): (id: id) => ItemParams;
    getCommonItemParamsById(state: State): (id: id) => CommonItemsParams;
    getFormParamsById(state: State): (id: id) => ItemFormParams;
    getHeaderDividerParamsById(
        state: State
    ): (id: id) => ItemHeaderDividerParams;
    getButtonParamsById(state: State): (id: id) => ItemButtonParams;
    getImageParamsById(state: State): (id: id) => ItemImageParams;
    getQuizParamsById(state: State): (id: id) => ItemQuizParams;
    getIconParamsById(state: State): (id: id) => ItemIconParams;
    getMenuParamsById(state: State): (id: id) => ItemMenuParams;
    getTextParamsById(state: State): (id: id) => ItemTextParams;
    // getIconTextParamsById(state: State): (id: id) => ItemIconTextParams;
};
export const getters: GetterTree<State, RootState> & Getters = {
    getItemParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params) return params;
        else
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
    },
    getCommonItemParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        return params;
    },
    getHeaderDividerParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ItemTypes.headerDivider) {
            return params;
        } else {
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не divider`,
                targetId: id,
            });
        }
    },
    getButtonParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ItemTypes.button) {
            return params;
        } else {
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        }
    },
    getFormParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ItemTypes.form) {
            return params;
        } else {
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не форма`,
                targetId: id,
            });
        }
    },
    getImageParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ItemTypes.image) {
            return params;
        } else {
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не картинка`,
                targetId: id,
            });
        }
    },
    getQuizParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        if (params.type !== ItemTypes.quiz)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не квиз`,
                targetId: id,
            });
        return params;
    },
    getMenuParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        if (params.type !== ItemTypes.menu)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не меню`,
                targetId: id,
            });
        return params;
    },
    getIconParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ItemTypes.icon) {
            return params;
        } else {
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не иконка`,
                targetId: id,
            });
        }
    },
    getTextParamsById: (state) => (id) => {
        const params = state.items.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ItemTypes.text) {
            return params;
        } else {
            throw new CriticalError({
                bundle: "",
                message: `Итем с id ${id} не текст`,
                targetId: id,
            });
        }
    },
    // getIconTextParamsById: (state) => (id) => {
    //     const params = state.items.get(id);

    //     if (params === undefined)
    //         throw new CriticalError({
    //             bundle: "",
    //             message: `Итем с id ${id} не найден`,
    //             targetId: id,
    //         });
    //     if (params.type === ItemTypes.iconText) {
    //         return params;
    //     } else {
    //         throw new CriticalError({
    //             bundle: "",
    //             message: `Итем с id ${id} не иконка с текстом`,
    //             targetId: id,
    //         });
    //     }
    // },
};
