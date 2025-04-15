import { MutationTree } from "vuex";
import { State } from "./state";
import { MutationTypes } from "../types/mutations";
import { ProjectBundle } from "@/types";
export type Mutations<S = State> = {
    [MutationTypes.SET_ID](state: S, id: number): void;
    [MutationTypes.SET_PAGE_URI](state: S, uri: string): void;
    [MutationTypes.SET_SITE_ID](state: S, id: number): void;
    [MutationTypes.SET_SUB_DOMAIN](state: S, subDomain: string): void;
    [MutationTypes.SET_ACCESS_CODE](state: S, accessCode: number): void;
    [MutationTypes.SET_EMPTY](state: S, status: boolean): void;
    [MutationTypes.SET_LOAD_PROJECT](
        state: S,
        loadProject: (projectBundle: ProjectBundle) => void
    ): void;
};
export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.SET_ID](state, id) {
        state.id = id;
    },
    [MutationTypes.SET_PAGE_URI](state, uri) {
        state.pageURI = uri;
    },
    [MutationTypes.SET_SITE_ID](state, id) {
        state.siteId = id;
    },
    [MutationTypes.SET_SUB_DOMAIN](state, subDomain) {
        state.siteSubDomain = subDomain;
    },
    [MutationTypes.SET_ACCESS_CODE](state, accessCode) {
        state.siteAccessCode = accessCode;
    },
    [MutationTypes.SET_EMPTY](state, status) {
        state.empty = status;
    },
    [MutationTypes.SET_LOAD_PROJECT](state, loadProject) {
        state.loadProject = loadProject;
    },
};
