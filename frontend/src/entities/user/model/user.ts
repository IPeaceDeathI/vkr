import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    Module,
} from "vuex";
import { Getters, getters } from "./getters";
import { State, state } from "./state";
import { Actions, actions } from "./actions";
import { Mutations, mutations } from "./mutations";
import { RootState } from "@/entities/store";

export const NAMESPACE = "user";
type Namespaced<T, N extends string> = {
    [P in keyof T & string as `${N}/${P}`]: T[P];
};
type NamespacedGetters = Namespaced<Getters, "user">;
type NamespacedMutations = Namespaced<Mutations, "user">;
type NamespacedActions = Namespaced<Actions, "user">;

export const store: Module<State, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
export type UserStore<S = State> = Omit<
    VuexStore<S>,
    "getters" | "commit" | "dispatch"
> & {
    getters: {
        [K in keyof NamespacedGetters]: ReturnType<NamespacedGetters[K]>;
    };
} & {
    commit<K extends keyof NamespacedMutations>(
        key: K,
        payload: Parameters<NamespacedMutations[K]>[1],
        options?: CommitOptions
    ): ReturnType<NamespacedMutations[K]>;
} & {
    dispatch<K extends keyof NamespacedActions>(
        key: K,
        payload: Parameters<NamespacedActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<NamespacedActions[K]>;
};

export { State };
