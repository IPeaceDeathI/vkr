import { createStore } from "vuex";
import { isDevEnv } from "@/shared/config";
import { store as structure, NAMESPACE } from "@/entities/structure";
import {
    store as environment,
    NAMESPACE as ENV_NAMESPACE,
} from "@/entities/environment";
import {
    store as project,
    NAMESPACE as PROJECT_NAMESPACE,
} from "@/entities/project";
import { store as user, NAMESPACE as USER_NAMESPACE } from "@/entities/user";
import { Store } from "@/entities/store";
import { RootState } from "@/entities/store";

export const store = createStore<RootState>({
    strict: !!isDevEnv,
    modules: {
        [NAMESPACE]: structure,
        [PROJECT_NAMESPACE]: project,
        [USER_NAMESPACE]: user,
        [ENV_NAMESPACE]: environment,
    },
});
declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $store: Store;
    }
}
export function useStore(): Store {
    return store as Store;
}
