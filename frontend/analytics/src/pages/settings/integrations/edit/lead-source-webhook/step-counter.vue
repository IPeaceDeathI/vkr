<template>
    <section class="amo-basic-settings">
        <h3 class="amo-card__header">Код счётчика</h3>
        <p>
            Счётчик нужен для корректной работы аналитики, ловца лидов,
            онлайн-чата. После встраивания кода счётчика на сайт вы можете
            проверить его работу, введя название сайта в поле «Проверка
            счётчика».
        </p>
        <h3 class="amo-card__header">Инструкция по установке</h3>
        <p>
            Установить код счётчика необходимо внутри тега
            <body></body>
            в HTML-коде страницы. Для корректного подсчёта статистики установите
            код счётчика на все страницы сайта. Просто скопируйте эту инструкцию
            и отдайте вашему разработчику.
        </p>

        <div>
            <pre>
                {{ statCounter }}
            </pre>
        </div>
        <v-btn
            size="default"
            variant="flat"
            color="primary"
            class="mt-2"
            @click="copyCounter"
        >
            Скопировать в буфер</v-btn
        >
    </section>
</template>
<script setup lang="ts">
import { computed, defineProps, onMounted, ref, toRef } from "vue";
import { Props } from "./useWebhookState";
import useWebhookState from "./useWebhookState";
import { useRoute } from "vue-router";
import useAsyncState from "@/shared/composables/useAsyncState";
import { WebhookModel } from "@/entities/webhook";
import { storeToRefs } from "pinia";
import { useIntegrationStore } from "@/entities/integrations/store";
import { useStatStore } from "@/entities/stat/store";
const { getWehookIntegration } = storeToRefs(useIntegrationStore());
const { statHash, statCounter } = storeToRefs(useStatStore());

const route = useRoute();
const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);

const webhookIntegration = ref(useIntegrationStore().getWehookIntegration);

const copyCounter = () => {
    if (statCounter.value) {
        navigator.clipboard.writeText(statCounter.value);
    }
};
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
