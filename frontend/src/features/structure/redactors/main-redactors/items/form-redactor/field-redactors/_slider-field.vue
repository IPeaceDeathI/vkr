<template>
    <v-row>
        <v-col>
            <redactor-component-title>От</redactor-component-title>
            <v-text-field type="number" v-model="from" />
        </v-col>
        <v-col>
            <redactor-component-title>До</redactor-component-title>
            <v-text-field type="number" v-model="to" />
        </v-col>
        <v-col>
            <redactor-component-title>Шаг</redactor-component-title>
            <v-text-field type="number" v-model="step" />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-switch
                v-model="unitEnabled"
                label="Отображать единицу измерения"
            />
        </v-col>
    </v-row>
    <v-expand-transition>
        <v-row v-if="unitEnabled">
            <v-col>
                <redactor-component-title>Преффикс</redactor-component-title>
                <v-text-field placeholder="$" v-model="unitPrefix" />
            </v-col>
            <v-col>
                <redactor-component-title>Суффикс</redactor-component-title>
                <v-text-field placeholder="м²" v-model="unitSuffix" />
            </v-col>
        </v-row>
    </v-expand-transition>
    <v-row>
        <v-col>
            <v-switch v-model="range" label="Диапазон" />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn-toggle v-model="showValue">
                <v-btn text="Скрыть" value="hidden" />
                <v-btn text="Крайние" value="limits" />
                <v-btn text="Заполнить" value="complex" />
            </v-btn-toggle>
        </v-col>
    </v-row>
    <v-expand-transition>
        <v-row v-if="showValue === 'limits'">
            <v-col>
                <v-switch
                    v-model="extremeEnable"
                    label="Задать текстовые описания"
                />
            </v-col>
        </v-row>
    </v-expand-transition>
    <v-expand-transition>
        <v-row v-if="extremeEnable && showValue === 'limits'">
            <v-col>
                <redactor-component-title>Текст слева</redactor-component-title>
                <v-text-field v-model="extremeLeft" />
            </v-col>
            <v-col>
                <redactor-component-title>
                    Текст справа
                </redactor-component-title>
                <v-text-field v-model="extremeRight" />
            </v-col>
        </v-row>
    </v-expand-transition>
</template>
<script setup lang="ts">
import { Props, Emits } from "./_props&emits";
import { defineProps, defineEmits, computed, toRefs } from "vue";
import { SliderFieldParams } from "@/types";
import { FormManager } from "@/shared/services";

//typing
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//slider params
const { formParams, field_id } = toRefs(props);

const sliderParams = computed<SliderFieldParams>(() => {
    return FormManager.getFieldSliderParamsById(
        formParams.value,
        field_id.value
    );
});

const from = computed<number>({
    get() {
        return sliderParams.value.from;
    },
    set(value: number) {
        emit("onChange", { ...sliderParams.value, from: value });
    },
});

const to = computed<number>({
    get() {
        return sliderParams.value.to;
    },
    set(value: number) {
        emit("onChange", { ...sliderParams.value, to: value });
    },
});

const step = computed<number>({
    get() {
        return sliderParams.value.step;
    },
    set(value: number) {
        emit("onChange", { ...sliderParams.value, step: value });
    },
});

const unitEnabled = computed<boolean>({
    get() {
        return sliderParams.value.unit.enable;
    },
    set(value: boolean) {
        emit("onChange", {
            ...sliderParams.value,
            unit: { ...sliderParams.value.unit, enable: value },
        });
    },
});

const unitPrefix = computed<string>({
    get() {
        return sliderParams.value.unit.prefix;
    },
    set(value: string) {
        emit("onChange", {
            ...sliderParams.value,
            unit: { ...sliderParams.value.unit, prefix: value },
        });
    },
});

const unitSuffix = computed<string>({
    get() {
        return sliderParams.value.unit.suffix;
    },
    set(value: string) {
        emit("onChange", {
            ...sliderParams.value,
            unit: { ...sliderParams.value.unit, suffix: value },
        });
    },
});

const range = computed<boolean>({
    get() {
        return sliderParams.value.enableRange;
    },
    set(value: boolean) {
        emit("onChange", { ...sliderParams.value, enableRange: value });
    },
});

const showValue = computed<"hidden" | "limits" | "complex">({
    get() {
        return sliderParams.value.showValue.type;
    },
    set(value: "hidden" | "limits" | "complex") {
        emit("onChange", {
            ...sliderParams.value,
            showValue: { ...sliderParams.value.showValue, type: value },
        });
    },
});

const extremeEnable = computed<boolean>({
    get() {
        return sliderParams.value.showValue.extremeParams.enableTextDescription;
    },
    set(value: boolean) {
        emit("onChange", {
            ...sliderParams.value,
            showValue: {
                ...sliderParams.value.showValue,
                extremeParams: {
                    ...sliderParams.value.showValue.extremeParams,
                    enableTextDescription: value,
                },
            },
        });
    },
});

const extremeLeft = computed<string>({
    get() {
        return sliderParams.value.showValue.extremeParams.left;
    },
    set(value: string) {
        emit("onChange", {
            ...sliderParams.value,
            showValue: {
                ...sliderParams.value.showValue,
                extremeParams: {
                    ...sliderParams.value.showValue.extremeParams,
                    left: value,
                },
            },
        });
    },
});

const extremeRight = computed<string>({
    get() {
        return sliderParams.value.showValue.extremeParams.right;
    },
    set(value: string) {
        emit("onChange", {
            ...sliderParams.value,
            showValue: {
                ...sliderParams.value.showValue,
                extremeParams: {
                    ...sliderParams.value.showValue.extremeParams,
                    right: value,
                },
            },
        });
    },
});
</script>
<style lang="scss" scoped></style>
