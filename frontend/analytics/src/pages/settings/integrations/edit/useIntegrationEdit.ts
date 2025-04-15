import { ROUTE_NAMES } from "@/pages";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useIntegrationEdit = (possibleSteps: Array<string>) => {
    const route = useRoute();
    const router = useRouter();
    const step = ref(route.query.step as string);
    watch(
        () => route.query.step,
        (newStep) => {
            if (
                newStep === undefined ||
                typeof newStep !== "string" ||
                !possibleSteps.includes(newStep)
            ) {
                router.replace({
                    name: ROUTE_NAMES.Settings_Integrations_Edit,
                    query: { step: possibleSteps[0] },
                });
                return;
            }
            step.value = newStep;
        },
        { immediate: true }
    );
    return { step };
};
