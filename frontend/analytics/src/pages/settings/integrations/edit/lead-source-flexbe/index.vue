<template>
    <v-card tag="section" class="yandex-direct-edit">
        <v-toolbar density="compact" color="primary">
            <v-toolbar-title tag="h1">Flexbe</v-toolbar-title>
        </v-toolbar>

        <url-stepper
            :steps="steps"
            :selected-id="selectedId"
            :type-lead-source-itntegration="props.typeLeadSourceItntegration"
        />
    </v-card>
</template>

<script setup lang="ts">
import { WebhookModel } from "@/entities/webhook";
import useAsyncState from "@/shared/composables/useAsyncState";
import UrlStepper, { StepperItem } from "@/shared/libs/url-stepper";
import { computed, ref, shallowRef, watch } from "vue";

import { onMounted } from "vue";
import {
    onBeforeRouteUpdate,
    RouteLocationNamedRaw,
    useRoute,
} from "vue-router";
import { getSteps, WEBHOOK_STEPS, possibleSteps } from "./index";
import { AMO_STEPS } from "../amo";
import { useIntegrationEdit } from "../useIntegrationEdit";
import { useIntegrationStore } from "@/entities/integrations/store";
import { Props } from "./useWebhookState";
useIntegrationEdit(possibleSteps);

const route = useRoute();

const steps = shallowRef<Array<StepperItem>>(getSteps(route));

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
const props = defineProps<Props>();
</script>

<style scoped></style>
