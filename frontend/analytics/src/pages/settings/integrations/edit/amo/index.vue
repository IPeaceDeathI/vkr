<template>
    <section class="amo-edit">
        <h1 class="mb-2">amoCrm</h1>

        <url-stepper :steps="steps" :selected-id="selectedId" />
    </section>
</template>

<script setup lang="ts">
import { RouteLocationNamedRaw, useRoute } from "vue-router";
import { useIntegrationEdit } from "../useIntegrationEdit";
import UrlStepper, { StepperItem } from "@/shared/libs/url-stepper";
import { getSteps, possibleSteps, AMO_STEPS } from "./index";
import { computed, watch } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import useAsyncState from "@/shared/composables/useAsyncState";
import { AmoModel, AmoExistComplex } from "@/entities/amo";
import { shallowRef } from "vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useIntegrationStore } from "@/entities/integrations/store";
// import useAsyncState2 from "@/shared/composables/useAsyncArg";
const { integrationList } = storeToRefs(useIntegrationStore());

const route = useRoute();
const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);
useIntegrationEdit(possibleSteps);
const {
    data: existComlex,
    isLoading,
    isError,
    error,
    executeRequest: updateExistComplex,
} = useAsyncState({
    immediate: true,
    request: AmoModel.getIntegrationExistComplex,
    initialArgs: [Number(integrationId.value), Number(statId.value)],
});

const steps = shallowRef<Array<StepperItem>>(getSteps(route));
onBeforeRouteUpdate(() => {
    updateExistComplex;
});
watch(
    existComlex,
    (newVal) => {
        if (!newVal) return;
        steps.value = steps.value.map((step) => {
            if (step.id === AMO_STEPS.AUTH) {
                return { ...step, isComplite: newVal.auth };
            } else if (step.id === AMO_STEPS.SETTINGS) {
                return { ...step, isComplite: newVal.setting };
            } else if (step.id === AMO_STEPS.STATUSES) {
                return { ...step, isComplite: newVal.status_allocation };
            } else return step;
        });
    },
    { immediate: true }
);

// onMounted(() => {
//     useIntegrationStore().init(Number(statId.value));
// });

const selectedId = computed(() => {
    const currRoute = steps.value.find((step) => {
        return (
            (step.route as RouteLocationNamedRaw)?.query?.step ===
            route.query.step
        );
    });
    if (currRoute) return currRoute.id;
    else return 0;
});
</script>

<style scoped>
:deep(.amo-card__header) {
    font-size: 1.1rem;
}
:deep(.amo-card__paragraph) {
    font-size: 0.9em;
}
</style>
