<template>
    <section class="amo-basic-settings">
        <h3 class="amo-card__header">Настройка поведения</h3>

        <div class="amo-basic-settings__body">
            <div class="amo-basic-settings__body__switch-container">
                <v-switch
                    id="amo-send-lead-setting1"
                    color="primary"
                    class="amo-basic-settings__body__switch-container__switch"
                    v-model="sendToCrm"
                />

                <label for="amo-send-lead-setting1">
                    Отправлять заявки в CRM
                    <information-icon
                        information="Если отключено, то лиды будут создаваться в нашем списке отправленных заявок, но не будут отправляться в CRM."
                    />
                </label>
            </div>
            <div class="amo-basic-settings__body__switch-container">
                <v-switch
                    id="amo-send-lead-setting2"
                    color="primary"
                    class="amo-basic-settings__body__switch-container__switch"
                    v-model="addWithoutContact"
                />

                <label for="amo-send-lead-setting2">
                    Создавать заявки без контактных данных
                    <information-icon
                        information="Отправить заявку в CRM-систему даже в случае отсутствия контактных данных клиента."
                    />
                </label>
            </div>
            <v-btn
                size="default"
                variant="flat"
                color="primary"
                class="mt-2"
                :loading="postIsLoading"
                @click="onSaveClick"
            >
                Сохранить
            </v-btn>
        </div>
    </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import informationIcon from "@/shared/libs/information-icon/information_icon.vue";
import useAsyncState from "@/shared/composables/useAsyncState";
import { IS_ENABLE, WebhookModel } from "@/entities/webhook";
import { useRoute } from "vue-router";
import { useIntegrationStore } from "@/entities/integrations/store";
import { storeToRefs } from "pinia";
import { Props } from "./useWebhookState";
const { integrationWebhookSettings } = storeToRefs(useIntegrationStore());

const route = useRoute();
const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);

const sendToCrm = ref();

const addWithoutContact = ref();

const {
    data: resultPut,
    isLoading: postIsLoading,
    error: postError,
    isError: postIsError,
    executeRequest: putRequest,
} = useAsyncState({
    request: WebhookModel.putSettingSourceWebhook,
    immediate: false,
});
const props = defineProps<Props>();
const {
    data: resultGet,
    isLoading: getIsLoading,
    error: getError,
    isError: getIsError,
    executeRequest: getRequest,
} = useAsyncState({
    request: WebhookModel.getSettingSourceWebhook,
    immediate: true,
    initialArgs: [
        Number(integrationId.value),
        Number(statId.value),
        Number(props.typeLeadSourceItntegration),
    ],
});

onMounted(async () => {
    setTimeout(() => {
        resultGet.value?.is_enable_sending_lead == 1
            ? (sendToCrm.value = true)
            : (sendToCrm.value = false);

        resultGet.value?.is_enable_creating_lead_without_contacts == 1
            ? (addWithoutContact.value = true)
            : (addWithoutContact.value = false);
    }, 200);

    // setTimeout(() => {
    //     integrationWebhookSettings.value?.is_enable_sending_lead ===
    //     IS_ENABLE.on
    //         ? (sendToCrm.value = true)
    //         : (sendToCrm.value = false);
    //     integrationWebhookSettings.value
    //         ?.is_enable_creating_lead_without_contacts === IS_ENABLE.on
    //         ? (addWithoutContact.value = true)
    //         : (addWithoutContact.value = false);
    // }, 300);
});

const onSaveClick = async () => {
    putRequest(
        Number(integrationId.value),
        Number(statId.value),
        {
            is_enable_sending_lead: sendToCrm.value ? 1 : 0,
            is_enable_creating_lead_without_contacts: addWithoutContact.value
                ? 1
                : 0,
        },
        Number(props.typeLeadSourceItntegration)
    );
    setTimeout(() => {
        getRequest(
            Number(integrationId.value),
            Number(statId.value),
            Number(props.typeLeadSourceItntegration)
        );
        setTimeout(() => {
            resultGet.value?.is_enable_sending_lead == 1
                ? (sendToCrm.value = true)
                : (sendToCrm.value = false);

            resultGet.value?.is_enable_creating_lead_without_contacts == 1
                ? (addWithoutContact.value = true)
                : (addWithoutContact.value = false);
        }, 200);
    }, 200);
};
</script>

<style scoped>
.amo-basic-settings__body__switch-container {
    display: flex;
    align-items: center;
}
.amo-basic-settings__body__switch-container__switch {
    flex: unset;
    margin-right: 1em;
    padding-left: 10px;
}
</style>
