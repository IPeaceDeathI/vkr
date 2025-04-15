<template>
    <section class="amo-basic-settings">
        <h3 class="amo-card__header">Инструкция по настройке Tilda</h3>
        <p>
            Интеграция с Tilda позволяет отслеживать заявки поситителей,
            оставленные на вашем сайте и автоматически создавать полученные лиды
            в CRM. Для интеграции Необходимо в настройках Tilda зайти в раздел
            Мои сайты - необходимый сайт- Настройки - Формы - Сервисы приема
            данных из форм.
        </p>
        <p>
            ВЫбрать Webhook? скопировать адрес ниже, отметить галочки посылать
            cookies и сохранить.
        </p>
        <p>
            В каждой форме должен быть подключен соответствующий сервис во
            вкладке Контент.
        </p>
        <p>
            Чтобы из форм генгерировались лиды необходимо наличие хотя бы одного
            из полей формы: phone, email,
        </p>
        <p>
            Дополнительно при формировании лида могут быть использованы поля
            формы: name, comment.
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
