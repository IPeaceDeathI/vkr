<template>
    <RouterView />
</template>

<script setup lang="ts">
import { useStatStore } from "@/entities/stat/store";
import { computed, onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
const statId = computed(() => route.params.statId);
onMounted(() => {
    useStatStore().getStatInfoById(Number(statId.value));
});
</script>

<style scoped></style>
