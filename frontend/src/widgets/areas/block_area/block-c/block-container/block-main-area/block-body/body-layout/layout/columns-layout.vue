<template>
    <div class="columns-layout container">
        <columns-wrapper
            ref="columnsWrapperRef"
            :zones="props.zones"
            :body-layout-params="props.bodyLayoutParams"
            @cloneZone="emit('cloneZone', $event)"
            @deleteZone="emit('deleteZone', $event)"
            @update:zones="emit('update:zones', $event)"
        />
    </div>
</template>

<script setup lang="ts">
import { BodyLayoutCardParams, ZoneBundle } from "@/types";
import columnsWrapper from "./wrapper/columns-wrapper.vue";
import { defineProps, ref } from "vue";
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
}>();
const columnsWrapperRef = ref<typeof columnsWrapper>();
//OPTIMIZATION сделать подробнеую ошибку через WarningError, если  getZoneBundles не найдено
const getZoneBundles = function (): Array<ZoneBundle> {
    if (columnsWrapperRef.value) {
        return columnsWrapperRef.value.getZoneBundles();
    } else
        throw new CriticalError({
            message: "Критическая ошибка при сборке пакетов зон",
        });
};

defineExpose({
    getZoneBundles,
});
</script>
