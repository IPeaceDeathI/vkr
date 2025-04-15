<template>
    <div class="cards-layout container">
        <cards-wrapper
            ref="cardsWrapperRef"
            @cloneZone="emit('cloneZone', $event)"
            @deleteZone="emit('deleteZone', $event)"
            :zones="zones"
            :body-layout-params="bodyLayoutParams"
            @update:body-layout-params="emit('update:bodyLayoutParams', $event)"
            @update:zones="emit('update:zones', $event)"
        />
    </div>
</template>

<script setup lang="ts">
import { BodyLayoutCardParams, ZoneBundle } from "@/types";
import cardsWrapper from "./wrapper/cards-wrapper.vue";
import { defineProps, ref, toRefs } from "vue";
import { CriticalError } from "@/shared/services/error_service";
type Props = {
    bodyLayoutParams: BodyLayoutCardParams;
    zones: { id: string; bundle: ZoneBundle }[];
};

const props = defineProps<Props>();
const emit = defineEmits<{
    cloneZone: [{ bundle: ZoneBundle; index: number }];
    deleteZone: [value: number];
    "update:zones": [value: { id: string; bundle: ZoneBundle }[]];
    "update:bodyLayoutParams": [value: BodyLayoutCardParams];
}>();
const { zones, bodyLayoutParams } = toRefs(props);
const cardsWrapperRef = ref<typeof cardsWrapper>();
//OPTIMIZATION сделать подробнеую ошибку через WarningError, если getZoneBundles не найдено
const getZoneBundles = function (): Array<ZoneBundle> {
    if (cardsWrapperRef.value) return cardsWrapperRef.value.getZoneBundles();
    else
        throw new CriticalError({
            message: "Критическая ошибка при сборке пакетов зон",
        });
};

defineExpose({
    getZoneBundles,
});
</script>
