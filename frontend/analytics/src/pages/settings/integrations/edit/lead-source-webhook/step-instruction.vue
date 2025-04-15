<template>
    <section class="amo-basic-settings">
        <h3 class="amo-card__header">Инструкция по настройке</h3>
        <p>Типовая интеграция, которая принимает данные через WebHook.</p>

        <p>Отправляйте данные в теле запроса в следующем формате:</p>
        <div>
            <pre>
{
    "title" : "Название сделки",
    "name" : "Имя клиента",
    "email" : "test@test.test",
    "phone" : "+79876543210",
    "comment" : "Комментарий проксилида",
    "roistat_visit" : "123456", //значение куки roistat_visit у пользователя
    "fields": {
        "site": "example.com",
        "source": "vk"
    }
}
            </pre>
            <b>Webhook URL:</b>
            <pre>{{ existComlex?.webhook_url }}</pre>
        </div>
    </section>
</template>
<script setup lang="ts">
import { computed, defineProps, toRef } from "vue";
import { Props } from "./useWebhookState";
// import useWebhookState from "./useWebhookState";
import { useRoute } from "vue-router";
import useAsyncState from "@/shared/composables/useAsyncState";
import { IS_ENABLE, WebhookModel } from "@/entities/webhook";
import { useIntegrationStore } from "@/entities/integrations/store";

import { storeToRefs } from "pinia";
const { integrationLeadSourceType } = storeToRefs(useIntegrationStore());

const route = useRoute();
const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);
// const integrationLeadSourceType = computed(
//     () => useIntegrationStore().integrationLeadSourceType
// );

// onMounted(() => {
//     useIntegrationStore().getLeadSourceIntegrationType(
//         Number(statId.value),
//         Number(integrationId.value)
//     );
// });

// console.log("integrationLeadSourceType", integrationLeadSourceType.value);
// console.log("existComlex", existComlex.value);

// type Props = {
//     typeLeadSourceItntegration: number;
// };
const props = defineProps<Props>();

const { data: existComlex, executeRequest } = useAsyncState({
    immediate: true,
    request: WebhookModel.getSourceWebhook,
    initialArgs: [
        Number(integrationId.value),
        Number(statId.value),
        Number(props.typeLeadSourceItntegration),
    ],
});
</script>
<style scoped>
pre {
    display: block;
    padding: 9.5px;
    margin: 20px 0;
    font-size: 13px;
    line-height: 1.42857143;
    word-break: break-all;
    word-wrap: break-word;
    color: #333333;
    background-color: #f5f5f5;
    border: 1px solid #cccccc;
    border-radius: 4px;
}
</style>
