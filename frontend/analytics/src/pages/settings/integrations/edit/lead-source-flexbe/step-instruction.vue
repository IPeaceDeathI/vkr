<template>
    <section class="amo-basic-settings">
        <h3 class="amo-card__header">Инструкция по настройке Flexbe</h3>
        <p>
            Интеграция с флексби позволяет отслеживать заявки поситителей,
            оставленные на вашем сайте и автоматически создавать полученные лиды
            в CRM. Для интеграции Необходимо в настройках Flexbe зайти в раздел
            API и добавить webhook, а также в разделе Счетчики прописать код
            счетчика в секции другие счетчики.
        </p>

        <div>
            <b>URL:</b>
            <pre>{{ existComlex?.webhook_url }}</pre>
        </div>
    </section>
</template>
<script setup lang="ts">
import { computed, defineProps, toRef } from "vue";
import { Props } from "./useWebhookState";
import useWebhookState from "./useWebhookState";
import { useRoute } from "vue-router";
import useAsyncState from "@/shared/composables/useAsyncState";
import { WebhookModel } from "@/entities/webhook/model";

const route = useRoute();
const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);
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
