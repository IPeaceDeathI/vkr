import { StepperItem } from "@/shared/libs/url-stepper";
import stepAuth from "./step-auth.vue";
import stepStatuses from "./step-statuses.vue";
import stepProxyLead from "./step-proxy-lead.vue";
import stepSettings from "./step-settings.vue";
import stepBasicSettings from "./step-basic-settings.vue";

import { RouteLocationNormalizedLoaded } from "vue-router";

import index from "./index.vue";
export default index;
export const possibleSteps = [
    "oauth",
    "statuses",
    "proxy_lead",
    "settings",
    "basic_settings",
];
export enum AMO_STEPS {
    AUTH,
    STATUSES,
    PROXY_LEAD,
    SETTINGS,
    BASIC_SETTINGS,
}
export const getSteps = (
    routeLocation: RouteLocationNormalizedLoaded
): Array<StepperItem> => {
    return [
        {
            id: AMO_STEPS.AUTH,
            name: "Авторизация",
            route: { ...routeLocation, query: { step: possibleSteps[0] } },
            component: stepAuth,
            isComplite: false,
        },
        {
            id: AMO_STEPS.STATUSES,
            name: "Загрузка заявок из CRM: распределение статусов",
            route: { ...routeLocation, query: { step: possibleSteps[1] } },
            component: stepStatuses,
            isComplite: false,
        },
        {
            id: AMO_STEPS.PROXY_LEAD,
            name: "Инструкция по включению отправки заявок",
            route: { ...routeLocation, query: { step: possibleSteps[2] } },
            component: stepProxyLead,
            isComplite: true,
            isLoading: false,
        },
        {
            id: AMO_STEPS.SETTINGS,
            name: "Загрузка заявок из CRM: расширенные настройки",
            route: { ...routeLocation, query: { step: possibleSteps[3] } },
            component: stepSettings,
            isComplite: false,
        },
        {
            id: AMO_STEPS.BASIC_SETTINGS,
            name: "Отправка заявок в CRM-систему: базовые настройки",
            route: { ...routeLocation, query: { step: possibleSteps[4] } },
            component: stepBasicSettings,
            isComplite: false,
        },
    ];
};
