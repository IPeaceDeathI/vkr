import { RootState, Store } from "@/entities/store";
import { StructureZonesState as State } from "./state";
import {
    ZoneParams,
    CommonZoneParams,
    CardParams,
    ColumnParams,
    BlockTitleParams,
    ZoneTypes,
    WindowParams,
    BlockHeaderParams,
    ItemParams,
    ItemBundle,
} from "@/types";
import { GetterTree } from "vuex";
import { CriticalError } from "@/shared/services/error_service";
import { BundleCollector } from "@/entities/services";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

type HeadersItems = {
    id: string;
    params: ItemBundle;
};
export type Getters = {
    hasBurgerHeader(state: State, getters: Getters): boolean;
    hasHeader(state: State, getters: Getters): boolean;
    getHeaders(
        state: State,
        getters: any,
        rootState: RootState
    ): () => Array<id>;
    getZoneParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => ZoneParams;
    getCommonZoneParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => CommonZoneParams;
    getCardParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => CardParams;
    getColumnParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => ColumnParams;
    getWindowParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => WindowParams;
    getBlockTitleParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => BlockTitleParams;
    getBlockHeaderParamsById(
        state: State,
        getters: Getters,
        rootState: RootState
    ): (id: id) => BlockHeaderParams;
    getHeaderItems(state: State): () => HeadersItems[];
};
export const getters: GetterTree<State, RootState> & Getters = {
    hasBurgerHeader: (state, getters) => {
        return getters.getHeaders.length > 0;
    },
    hasHeader: (state, getters) => {
        return getters.getHeaders.length > 0;
    },
    getHeaders: (state, getters, rootState) => () => {
        const result: Array<id> = [];
        // eslint-disable-next-line no-useless-catch
        try {
            state.zoneComponents.forEach((zone, id) => {
                if (
                    zone.getBundle().zoneParams.type === ZoneTypes.blockHeader
                ) {
                    result.push(id);
                }
            });
        } catch (error) {
            //
        }
        return result;
    },
    getZoneParamsById: (state, getters, rootState) => (id) => {
        const params = state.zones.get(id);

        if (params) return params;
        else {
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не найден`,
                targetId: id,
            });
        }
    },
    getCommonZoneParamsById: (state, getters, rootState) => (id) => {
        const params = state.zones.get(id);

        if (params) return params;
        else {
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не найден`,
                targetId: id,
            });
        }
    },
    getCardParamsById: (state, getters, rootState) => (id) => {
        const params = state.zones.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ZoneTypes.card) {
            return params;
        } else {
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не карточка`,
                targetId: id,
            });
        }
    },
    getWindowParamsById: (state, getters, rootState) => (id) => {
        const params = state.zones.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ZoneTypes.window) {
            return params;
        } else {
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не окно`,
                targetId: id,
            });
        }
    },
    getColumnParamsById: (state, getters, rootState) => (id) => {
        const params = state.zones.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ZoneTypes.column) {
            return params;
        } else {
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не колонка`,
                targetId: id,
            });
        }
    },
    getBlockTitleParamsById: (state, getters, rootState) => (id) => {
        const params = state.zones.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не найден`,
                targetId: id,
            });
        if (params.type === ZoneTypes.blockTitle) {
            return params;
        } else {
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не block title`,
                targetId: id,
            });
        }
    },
    getBlockHeaderParamsById: (state, getters, rootState) => (id) => {
        const params = state.zones.get(id);

        if (params === undefined)
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не найдена`,
                targetId: id,
            });
        if (params.type === ZoneTypes.blockHeader) {
            return params;
        } else {
            throw new CriticalError({
                bundle: JSON.stringify(rootState),
                message: `Зона с id ${id} не block header`,
                targetId: id,
            });
        }
    },
    getHeaderItems: (state) => () => {
        const result: HeadersItems[] = [];
        state.headerItems.forEach((headerItem: ItemBundle, id: string) => {
            result.push({
                id: id,
                params: headerItem,
            });
        });
        return result;
    },
};
