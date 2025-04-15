<template>
    <text-redactor
        :item-id="id"
        :model-value="props.textParams"
        @update:model-value="updateParams"
        v-if="$store.getters['environment/isEditable']"
    />
    <component
        :is="props.textParams.rootTag"
        v-else
        v-html="props.textParams.html"
    />
</template>

<script setup lang="ts">
import { textRedactor } from "@/features/structure";
import { TextParams } from "@/types";
type Props = {
    textParams: TextParams;
    id: string;
};
const props = defineProps<Props>();
type Emits = {
    "update:textParams": [value: TextParams];
};
const emit = defineEmits<Emits>();

const updateParams = (val: TextParams) => {
    emit("update:textParams", val);
};
</script>

<style scoped></style>
