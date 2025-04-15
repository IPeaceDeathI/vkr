<template>
    <v-row>
        <v-col>
            <v-switch label="Включить маску" v-model="isMask" />
        </v-col>
    </v-row>
    <template v-if="isMask">
        <v-row>
            <v-col>
                <v-switch
                    label="Использовать свою маску"
                    v-model="useCustomMask"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-switch
                    label="Отображать формат маски"
                    v-model="showMaskFormat"
                />
            </v-col>
        </v-row>
        <v-row v-if="useCustomMask">
            <v-col>
                <v-text-field v-model="customMask" />
            </v-col>
        </v-row>
    </template>
</template>
<script setup lang="ts">
import { FormManager } from "@/shared/services";
import { PhoneFieldParams } from "@/types";
import { Props, Emits } from "./_props&emits";
import { computed, defineProps, defineEmits, toRefs } from "vue";

//typing
type Mask = {
    enabled: boolean;
    useCustomMask: boolean;
    customMask: string;
    baseMask: "+{7}(000)000-00-00";
    showMaskFormat: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//form params
const { formParams, field_id } = toRefs(props);

const phoneParams = computed<PhoneFieldParams>(() => {
    return FormManager.getFieldPhoneParamsById(
        formParams.value,
        field_id.value
    );
});

const mask = computed<Mask>(() => {
    return phoneParams.value.mask;
});

const isMask = computed<boolean>({
    get() {
        return mask.value.enabled;
    },
    set(value: boolean) {
        console.log({
            ...phoneParams.value,
            mask: { ...phoneParams.value.mask, enabled: value },
        });
        emit("onChange", {
            ...phoneParams.value,
            mask: { ...phoneParams.value.mask, enabled: value },
        });
    },
});

const useCustomMask = computed<boolean>({
    get() {
        return mask.value.useCustomMask;
    },
    set(value: boolean) {
        emit("onChange", {
            ...phoneParams.value,
            mask: { ...phoneParams.value.mask, useCustomMask: value },
        });
    },
});

const customMask = computed<string>({
    get() {
        return mask.value.customMask;
    },
    set(value: string) {
        emit("onChange", {
            ...phoneParams.value,
            mask: { ...phoneParams.value.mask, customMask: value },
        });
    },
});

const showMaskFormat = computed<boolean>({
    get() {
        return mask.value.showMaskFormat;
    },
    set(value: boolean) {
        emit("onChange", {
            ...phoneParams.value,
            mask: { ...phoneParams.value.mask, showMaskFormat: value },
        });
    },
});
</script>
<style lang="scss" scoped></style>
