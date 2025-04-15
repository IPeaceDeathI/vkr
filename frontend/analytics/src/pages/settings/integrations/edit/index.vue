<template>
    <v-fade-transition>
        <component
            :is="integrationEditComponent"
            :typeLeadSourceItntegration="integration?.type"
        />
    </v-fade-transition>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import AmoEdit from "./amo";
import YandexDirectEdit from "./yandex-direct";
import LeadSourceEdit from "./lead-source";
import LeadSourceWebhookEdit from "./lead-source-webhook";
import LeadSourceFlexberEdit from "./lead-source-flexbe";
import LeadSourceTildaEdit from "./lead-source-tilda";

import {
    INTEGRATION_CATEGORY,
    INTEGRATION_TYPE,
    IntegrationModel,
} from "@/entities/integrations";
import useAsyncState from "@/shared/composables/useAsyncState";
import { useRoute } from "vue-router";
import { watchEffect } from "vue";
import { router } from "@/app/providers";
import { ROUTE_NAMES } from "@/pages";
import { computed } from "vue";
import { useIntegrationStore } from "@/entities/integrations/store";

const route = useRoute();

const {
    data: integration,
    isLoading,
    isError,
    executeRequest,
} = useAsyncState({
    request: IntegrationModel.get,
    initialArgs: [
        parseInt(
            Array.isArray(route.params.statId) ? "-1" : route.params.statId
        ),
        parseInt(Array.isArray(route.params.id) ? "-1" : route.params.id),
    ],
});

watch(
    () => route.params,
    () => {
        executeRequest(
            parseInt(
                Array.isArray(route.params.statId) ? "-1" : route.params.statId
            ),
            parseInt(Array.isArray(route.params.id) ? "-1" : route.params.id)
        );
    }
);
watchEffect(() => {
    if (isError.value) {
        router.push({ name: ROUTE_NAMES.NotFound });
    }
});

const integrationEditComponent = computed<any | undefined>(() => {
    if (!integration.value) return undefined;

    switch (integration.value.integration_type) {
        case INTEGRATION_CATEGORY.CRM:
            return AmoEdit;
        case INTEGRATION_CATEGORY.ADVERTISING_CHANNELS:
            return YandexDirectEdit;
        case INTEGRATION_CATEGORY.LEAD_SOURCE:
            if (integration.value.type == 2) {
                return LeadSourceWebhookEdit;
            } else if (integration.value.type == 3) {
                return LeadSourceFlexberEdit;
            } else if (integration.value.type == 4) {
                return LeadSourceTildaEdit;
            } else {
                return LeadSourceEdit;
            }

        default:
            return undefined;
    }
});
onMounted(() => {
    if (integration.value) {
        useIntegrationStore().getLeadSourceIntegrationType(
            Number(integration.value.type)
        );
    }
    if (integration.value?.type == 2) {
        setTimeout(() => {
            useIntegrationStore().getSettingsWebhook(
                Number(route.params.id),
                Number(route.params.statId)
            );
        }, 200);
    }
});
</script>

<style scoped></style>
