<template>
    <LeftMenu />
    <v-app class="rounded rounded-md admin-app">
        <noks-app-bar
            :is-mobile="isMobile"
            @click-nav-icon="isExpandNav = !isExpandNav"
            class="panel-top"
        />
        <!-- <v-navigation-drawer
            disable-resize-watcher
            :rail="rail"
            v-model="isExpandNav"
            :permanent="isPermanent"
            :expand-on-hover="expandOnHover"
        >
            <v-list density="compact" nav>
                <v-list-item
                    v-for="link in links"
                    :key="link.name"
                    exact
                    :title="link.name"
                    :prepend-icon="link.icon"
                    :to="link.routePath"
                >
                    <v-tooltip activator="parent" :text="link.name" />
                </v-list-item>
            </v-list>
        </v-navigation-drawer> -->
        <v-main class="bg-background">
            <Routing />
        </v-main>
    </v-app>
</template>
<script setup lang="ts">
import { ROUTE_NAMES, Routing } from "@/pages";
import { computed, watch } from "vue";
import { ref } from "vue";
import { useDisplay } from "vuetify";
import noksAppBar from "./app-bar.vue";
import { RouteLocationRaw, useRoute } from "vue-router";
import { onMounted } from "vue";
import { useStatStore } from "@/entities/stat/store";

import LeftMenu from "@/components/ui/LeftMenuNew.vue";
import storeSettings from "@/shared/storeSettings";
// import { provide } from "vue";
// storeSettings().setId(document)
// provide('settings', storeSettings().getId())

const rail = ref(false);
const expandOnHover = ref(false);
const isMobile = ref(false);
const isExpandNav = ref(false);
const display = useDisplay();
const isPermanent = ref(true);
watch(
    display.name,
    (newVal) => {
        switch (newVal) {
            //mobile
            case "xs":
                rail.value = false;
                expandOnHover.value = false;
                isMobile.value = true;
                isExpandNav.value = false;
                isPermanent.value = false;
                break;
            //laptop
            case "sm":
            case "md":
                rail.value = true;
                expandOnHover.value = true;
                isMobile.value = false;
                isExpandNav.value = true;
                isPermanent.value = true;
                break;

            //desktop
            case "lg":
            case "xl":
            case "xxl":
                rail.value = false;
                expandOnHover.value = false;
                isMobile.value = false;
                isExpandNav.value = true;
                isPermanent.value = true;
                break;
        }
    },
    { immediate: true }
);

type Link = {
    routePath: RouteLocationRaw;
    name: string;
    icon: string;
};
const links = ref<Array<Link>>([
    {
        routePath: {
            name: ROUTE_NAMES.Main,
        },
        name: "Главная страница",
        icon: "mdi-home-account",
    },
    {
        routePath: {
            name: ROUTE_NAMES.MultiChannelAnalytics,
        },
        name: "Отчеты",
        icon: "mdi-graph-outline",
    },
    {
        routePath: {
            name: ROUTE_NAMES.Settings,
        },
        name: "Настройки",
        icon: "mdi-cog",
    },
    {
        routePath: {
            name: ROUTE_NAMES.Settings_Calculations,
        },
        name: "Пользовательские показатели",
        icon: "mdi-account-group",
    },
]);
// const route = useRoute();
// const statId = computed(() => route.params.statId);

onMounted(() => {
    const { init } = useStatStore();
    //TODO Добавить обработку ошибок инициализации
    init();
});
</script>

<style>
@import "./index.scss";

.admin-app {
    padding-left: 65px;
}
.panel-top {
    left: 65px !important;
}
</style>
