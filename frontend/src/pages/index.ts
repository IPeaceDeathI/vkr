import { RouteRecordRaw } from "vue-router";
export const routes: Array<RouteRecordRaw> = [
    {
        path: "/constructor2/dist/index.html",
        name: "main",
        component: () => import("./main"),
    },
];
