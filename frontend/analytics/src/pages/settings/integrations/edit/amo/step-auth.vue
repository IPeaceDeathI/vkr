<template>
    <v-btn
        :loading="isLoading"
        color="primary"
        variant="flat"
        size="default"
        :href="data"
        text="Авторизовать приложение"
        v-show="!existComlex?.status_allocation"
    />

    <v-scroll-x-transition>
        <span class="ml-3 text-medium-emphasis" v-if="isLoading">
            Загружаем ссылку для авторизации
        </span>
    </v-scroll-x-transition>

    <v-scale-transition>
        <span v-if="isError" class="text-error">{{ error }}</span>
    </v-scale-transition>
</template>

<script setup lang="ts">
import useAsyncState from "@/shared/composables/useAsyncState";
import { AmoModel } from "@/entities/amo";
import { defineProps } from "vue";
import { Props } from "./useAmoStep";
import useAmoState from "./useAmoStep";
import { toRef } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { watch } from "vue";
import { watchEffect } from "vue";

const route = useRoute();
const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);
const { data, isLoading, executeRequest, isError, error } = useAsyncState({
    request: AmoModel.getUrlForIntegration,
    initialArgs: [Number(route.params.id), Number(route.params.statId)],
});

const { data: existComlex, executeRequest: updateExistComplex } = useAsyncState(
    {
        immediate: true,
        request: AmoModel.getIntegrationExistComplex,
        initialArgs: [Number(integrationId.value), Number(statId.value)],
    }
);

const props = defineProps<Props>();

useAmoState(
    toRef(() => props.isOpen),
    () => {
        executeRequest(Number(integrationId.value), Number(statId.value));
    }
);
</script>

<style scoped></style>
