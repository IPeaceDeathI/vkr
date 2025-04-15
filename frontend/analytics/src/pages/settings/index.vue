<template>
    <section class="main__card-section">
        <header>
            <h2>Выберите раздел</h2>
        </header>
        <article class="main__card-section__container">
            <v-card
                v-for="link in links"
                :key="link.name"
                @click="router.push(link.routePath)"
            >
                <v-card-title>{{ link.name }}</v-card-title>
            </v-card>
        </article>
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
                в HTML-коде страницы. Для корректного подсчёта статистики
                установите код счётчика на все страницы сайта. Просто скопируйте
                эту инструкцию и отдайте вашему разработчику.
            </p>

            <div>
                <pre>
                {{ statCounter }}
            </pre
                >
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
    </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTE_NAMES } from "..";
import { useStatStore } from "@/entities/stat/store";
import { storeToRefs } from "pinia";
const { statHash, statCounter } = storeToRefs(useStatStore());
type Link = {
    routePath: { name: string };
    name: string;
    icon: string;
};

const router = useRouter();
const links = ref<Array<Link>>([
    {
        routePath: { name: ROUTE_NAMES.Settings_Integrations },
        icon: "mdi-power-plug",
        name: "Настройки интеграций",
    },
]);
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
