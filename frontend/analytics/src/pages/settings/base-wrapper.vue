<template>
    <section class="settings-wrapper">
        <v-breadcrumbs
            class="main__header mb-4"
            tag="nav"
            :style="{ padding: 0 }"
            :items="fullPath"
        >
            <template #item="{ item }">
                <RouterLink :to="item.route">{{ item.title }}</RouterLink>
            </template>
        </v-breadcrumbs>
        <RouterView />
    </section>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import { useRouteFullPath } from "@/shared/composables/useRouteFullPath";
const { fullPath } = useRouteFullPath();
</script>

<style scoped></style>
