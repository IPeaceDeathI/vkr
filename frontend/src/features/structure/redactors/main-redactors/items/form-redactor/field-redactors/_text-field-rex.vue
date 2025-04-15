<template>
    <v-row>
        <v-col>
            <v-switch label="Включить маску" v-model="isMask" />
        </v-col>
    </v-row>
    <v-row v-if="isMask">
        <v-col>
            <v-text-field v-model="customMask" />
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { Props, Emits } from "./_props&emits";
import { defineProps, defineEmits, computed, toRefs } from "vue";
import { TextFieldParams } from "@/types";
import { FormManager } from "@/shared/services";

//typing
type Mask = {
    enabled: boolean;
    value: string;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//select params
const { formParams, field_id } = toRefs(props);

const phoneParams = computed<TextFieldParams>(() => {
    return FormManager.getFieldTextParamsById(formParams.value, field_id.value);
});

const mask = computed<Mask>(() => {
    return phoneParams.value.mask;
});

const isMask = computed<boolean>({
    get() {
        return mask.value.enabled;
    },
    set(value: boolean) {
        emit("onChange", {
            ...phoneParams.value,
            mask: { ...phoneParams.value.mask, enabled: value },
        });
    },
});

const customMask = computed<string>({
    get() {
        return mask.value.value;
    },
    set(value: string) {
        emit("onChange", {
            ...phoneParams.value,
            mask: { ...phoneParams.value.mask, value: value },
        });
    },
});
</script>
<style lang="scss" scoped></style>
