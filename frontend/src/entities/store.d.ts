import { StructureStore, State as StructureState } from "./structure";
import { ProjectStore, State as ProjectState } from "./project";
import { UserStore, State as UserState } from "./user";
import { EnvironmentStore, State as EnvironmentState } from "./environment";

export type RootState = {
    structure: StructureState;
    project: ProjectState;
    user: UserState;
    environment: EnvironmentState;
};
// type Store = StructureStore<Pick<RootState, "structure">>;
export type Store = StructureStore<Pick<RootState, "structure">> &
    ProjectStore<Pick<RootState, "project">> &
    UserStore<Pick<RootState, "user">> &
    EnvironmentStore<Pick<RootState, "environment">>;
