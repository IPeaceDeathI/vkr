import main from "./index.vue";
export default main;

import { RouteLocationNormalizedLoaded } from "vue-router";
import { StepperItem } from "@/shared/libs/url-stepper";
import stepInstruction from "./step-instruction.vue";
import stepCustom from "./step-custom.vue";
import stepCounter from "./step-counter.vue";

export enum WEBHOOK_STEPS {
    INSTRUCTION,
    CUSTOM_BEHAVIOR,
    COUNTER,
}
export const possibleSteps = ["guide", "custom_settings", "counter"];
export const getSteps = (
    routeLocation: RouteLocationNormalizedLoaded
): Array<StepperItem> => {
    return [
        {
            id: WEBHOOK_STEPS.INSTRUCTION,
            name: "Инструкция по настройке",
            route: { ...routeLocation, query: { step: possibleSteps[0] } },
            component: stepInstruction,
            isComplite: false,
        },
        {
            id: WEBHOOK_STEPS.CUSTOM_BEHAVIOR,
            name: "Настройка поведения",
            route: { ...routeLocation, query: { step: possibleSteps[1] } },
            component: stepCustom,
            isComplite: false,
        },
        {
            id: WEBHOOK_STEPS.COUNTER,
            name: "Код счетчика",
            route: { ...routeLocation, query: { step: possibleSteps[2] } },
            component: stepCounter,
            isComplite: false,
        },
    ];
};
