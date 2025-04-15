import { ProjectBundle } from "@/types";

export type State = {
    id: number;

    //page
    pageURI: string;
    //site
    siteId: number;
    siteAccessCode: number;
    siteSubDomain: string;

    empty: boolean;
    loadProject: (projectBundle: ProjectBundle) => void;
};
export const state: State = {
    id: 0,
    siteId: -1,
    pageURI: "",
    siteAccessCode: 0,
    siteSubDomain: "",
    empty: false,
    loadProject: () => {
        return;
    },
};
