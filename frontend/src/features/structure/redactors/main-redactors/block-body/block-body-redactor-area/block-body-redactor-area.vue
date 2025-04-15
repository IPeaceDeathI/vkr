<template>
    <component
        :params="blockBodyParams.BodyLayoutParams"
        :is="areaType"
        @update:bodyLayoutParams="emit('update:bodyLayoutParams', $event)"
    ></component>
</template>
<script setup lang="ts">
import {
    BlockBodyParams,
    BodyLayoutCardParams,
    BodyLayoutColumnParams,
    BodyLayoutParams,
    BodyLayoutType,
} from "@/types";
import { defineEmits, defineProps, toRefs, computed } from "vue";
import cardLayoutArea from "./_card-layout-area.vue";
import columnLayoutArea from "./_column-layout-area.vue";

//typing
type BlockBodyParamsForRedactor = Omit<
    BlockBodyParams,
    "parentId" | "childrenIds"
>;

type Props = {
    blockBodyParams: BlockBodyParamsForRedactor;
};

type Emits = {
    "update:bodyLayoutParams": [
        value: BodyLayoutCardParams | BodyLayoutColumnParams
    ];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//block body params
const { blockBodyParams } = toRefs(props);

const areaType = computed<any>(() => {
    switch (blockBodyParams.value.BodyLayoutParams.type) {
        case BodyLayoutType.cards:
            return cardLayoutArea;
        case BodyLayoutType.columns:
            return columnLayoutArea;
        default:
            return "";
    }
});
</script>
<style lang="scss" scoped></style>
