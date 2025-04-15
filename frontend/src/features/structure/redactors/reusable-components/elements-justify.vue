<template>
    <redactor-component-title :hint="hint">
        {{ title }}
    </redactor-component-title>
    <v-btn-toggle v-model="model" :disabled="disabled">
        <v-btn icon="mdi-format-align-left" :value="ElementsJustify.start" />
        <v-btn icon="mdi-format-align-center" :value="ElementsJustify.center" />
        <v-btn icon="mdi-format-align-right" :value="ElementsJustify.end" />
    </v-btn-toggle>
</template>
<script lang="ts">
import { ElementsJustify } from "@/types";
import { defineComponent, PropType } from "vue";
export default defineComponent({
    props: {
        modelValue: {
            type: String as PropType<ElementsJustify>,
        },
        hint: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "Горизонтальное выравнивание",
        },
    },
    emits: {
        "update:model-value": (value: ElementsJustify) => true,
    },
    data() {
        return {
            ElementsJustify: ElementsJustify,
        };
    },
    computed: {
        model: {
            get() {
                return this.modelValue;
            },
            set(value: ElementsJustify) {
                this.$emit("update:model-value", value);
            },
        },
    },
});
</script>
<style lang="scss" scoped></style>
