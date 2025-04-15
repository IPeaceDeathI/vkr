<template>
    <div class="block-spacer" :class="side">
        <blockSpacerResize :side="side" v-model="heigth" />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { blockSpacerResize } from "@/features/structure";
export default defineComponent({
    props: {
        modelValue: {
            type: Number,
            required: true,
        },
        side: {
            type: String as PropType<"top" | "bottom">,
            required: true,
        },
    },
    emits: {
        "update:modelValue": (value: number) => true,
    },
    computed: {
        heigth: {
            get(): number {
                return this.modelValue;
            },
            set(value: number) {
                this.$emit("update:modelValue", value);
            },
        },
    },
    components: {
        blockSpacerResize,
    },
});
</script>
