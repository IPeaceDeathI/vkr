<!-- TODO ДОДУМАТЬ ЛОГИКУ АВТО ЦВЕТА -->
<template>
    <redactor-component-title hint="Применяется к элементам с цветом авто">
        Цвет текста
    </redactor-component-title>
    <v-btn-toggle v-model="bgColor">
        <v-btn :value="textColorAutoTypes.auto">
            <v-icon size="large">mdi-invert-colors</v-icon>
            <v-tooltip>Авто цвет текста</v-tooltip>
        </v-btn>
        <v-btn :value="textColorAutoTypes.light">
            <v-icon size="large">mdi-palette-outline</v-icon>
            <v-tooltip>Светлый текст</v-tooltip>
        </v-btn>
        <v-btn :value="textColorAutoTypes.dark">
            <v-icon size="large"> mdi-palette</v-icon>
            <v-tooltip>Темный текст</v-tooltip>
        </v-btn>
    </v-btn-toggle>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { redactorComponentTitle } from "./";
import { TextColorAutoTypes } from "@/types";
import { PropType } from "vue";
export default defineComponent({
    components: {
        redactorComponentTitle,
    },
    props: {
        modelValue: String as PropType<TextColorAutoTypes>,
    },
    emits: {
        "update:model-value": (value: TextColorAutoTypes) => true,
    },
    data() {
        return {
            textColorAutoTypes: TextColorAutoTypes,
        };
    },
    computed: {
        bgColor: {
            get() {
                return this.modelValue;
            },
            set(value: TextColorAutoTypes) {
                this.$emit("update:model-value", value);
            },
        },
    },
});
</script>
<style lang="scss" scoped></style>
