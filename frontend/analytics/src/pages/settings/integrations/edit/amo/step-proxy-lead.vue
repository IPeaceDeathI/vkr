<template>
    <section class="amo-proxy-lead">
        <h3 class="amo-card__header">
            Инструкция по включению отправки заявок
        </h3>
        <p class="amo-card__paragraph mt-2">
            Распределив статусы вашей воронки по группам, вы уже будете видеть
            заявки в системе аналитики.
        </p>
        <p class="amo-card__paragraph mt-2">
            Для отслеживания источников заявок, необходимо настроить передачу в
            CRM дополнительного поля. Подробнее можете прочесть в документации.
        </p>
        <p class="amo-card__paragraph mt-2">
            Вы можете подключить формы вашего сайта к Roistat через интерфейс,
            тогда заявки из этих форм будут автоматически попадать в CRM.
        </p>
        <p class="amo-card__paragraph mt-2">
            Также передачу заявок в CRM можно настроить, добавив код на ваш
            сайт. Описание с примерами кода находится в нашей документации.
        </p>
        <p class="amo-card__paragraph mt-2">
            Если вы используете конструкторы сайтов, форм, сервисы обратного
            звонка, коллтрекинга для получения заявок, то можете настроить их в
            <router-link
                :to="{
                    name: ROUTE_NAMES.Settings_Integrations,
                }"
            >
                каталоге интеграций.</router-link
            >
        </p>

        <v-btn
            :to="{ ...route, query: { step: possibleSteps[3] } }"
            text="Продолжить"
            size="default"
            color="primary"
            class="mt-5"
        />
    </section>
</template>

<script setup lang="ts">
import { toRef, defineProps } from "vue";
import { Props } from "./useAmoStep";
import { RouterLink } from "vue-router";
import useAmoState from "./useAmoStep";
import { ROUTE_NAMES } from "@/pages";
import { useRoute } from "vue-router";
import { possibleSteps } from ".";

const props = defineProps<Props>();
const route = useRoute();
useAmoState(toRef(() => props.isOpen));
</script>

<style scoped></style>
