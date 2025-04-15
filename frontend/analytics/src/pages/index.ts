import { RouteRecordRaw } from "vue-router";
import Routing from "./index.vue";
// import { IntegrationModel } from "@/entities/integrations";
export enum ROUTE_NAMES {
    Main = "Main",
    NotFound = "NotFound",
    Forbidden = "Forbidden",
    Settings = "Settings",
    Stats = "Stats",
    MultiChannelAnalytics = "MultiChannelAnalytics",
    Settings_Integrations_Edit = "Settings_Integrations_Edit",
    Settings_Integrations = "Settings_Integrations",
    Settings_Calculations = "Settings_Calculations",
}
export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: ROUTE_NAMES.Main,
        redirect: (to) => {
            return { name: ROUTE_NAMES.Stats };
        },
    },
    //404
    {
        path: "/:pathMatch(.*)*",
        name: ROUTE_NAMES.NotFound,
        component: () => import("./errors/404"),
        meta: { name: "Страница не найдена", routeName: ROUTE_NAMES.NotFound },
    },
    {
        path: "/errors/403",
        name: ROUTE_NAMES.Forbidden,
        component: () => import("./errors/403"),
    },
    {
        path: "/stats/:statId?/",
        meta: {
            name: "CardStat",
            isStatPath: true,
            routeName: ROUTE_NAMES.Stats,
        },
        children: [
            {
                path: "",
                name: ROUTE_NAMES.Stats,
                meta: { name: "Настройки", routeName: ROUTE_NAMES.Stats },
                component: () => import("./stat"),
            },
            {
                path: "multichannel",
                component: () => import("./multichannel-analytics"),
                name: ROUTE_NAMES.MultiChannelAnalytics,
                meta: {
                    name: "Отчеты",
                    routeName: ROUTE_NAMES.MultiChannelAnalytics,
                },
            },
            {
                path: "calculations",
                component: () => import("./settings-calculations"),
                name: ROUTE_NAMES.Settings_Calculations,
                meta: {
                    name: "Пользовательские показатели",
                    routeName: ROUTE_NAMES.Settings_Calculations,
                },
            },
            {
                path: "settings",
                component: () => import("./settings/base-wrapper.vue"),
                meta: {
                    name: "Настройки",
                    routeName: ROUTE_NAMES.Settings,
                },
                children: [
                    {
                        path: "integrations/",
                        component: () => import("./settings/integrations"),
                        meta: {
                            name: "Управление интеграциями",
                            routeName: ROUTE_NAMES.Settings_Integrations,
                        },
                        children: [
                            {
                                path: ":id(\\d+)/edit",
                                name: ROUTE_NAMES.Settings_Integrations_Edit,
                                component: () =>
                                    import("./settings/integrations/edit"),
                                meta: {
                                    name: "Настройка интеграции",
                                    routeName:
                                        ROUTE_NAMES.Settings_Integrations_Edit,
                                },
                            },
                            {
                                //TODO Очень нужен мобильный адаптив
                                path: "",
                                name: ROUTE_NAMES.Settings_Integrations,
                                meta: {
                                    name: "Управление интеграциями",
                                    routeName:
                                        ROUTE_NAMES.Settings_Integrations,
                                },
                                component: () =>
                                    import("./settings/integrations/main"),
                            },
                        ],
                    },
                    {
                        path: "",
                        name: ROUTE_NAMES.Settings,
                        meta: {
                            name: "Настройки",
                            routeName: ROUTE_NAMES.Settings,
                        },
                        component: () => import("./settings/index.vue"),
                    },
                ],
            },
        ],
    },
];

export { Routing };
