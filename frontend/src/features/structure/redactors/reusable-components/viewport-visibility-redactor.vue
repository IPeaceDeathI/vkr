<template>
    <v-btn-toggle v-model="visibility">
        <v-btn icon="mdi-monitor-cellphone" :value="ElementVisibility.all" />
        <v-btn icon="mdi-monitor" :value="ElementVisibility.pc" />
        <v-btn icon="mdi-cellphone" :value="ElementVisibility.mobile" />
        <v-btn
            v-if="showHidden"
            icon="mdi-cancel"
            :value="ElementVisibility.hidden"
        />
    </v-btn-toggle>
</template>
<script lang="ts">
import { ElementVisibility } from "@/types";
import { PropType } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        modelValue: {
            type: String as PropType<ElementVisibility>,
            required: true,
        },
        showHidden: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        "update:model-value": (val: ElementVisibility) => true,
    },
    data() {
        return { ElementVisibility: ElementVisibility };
    },
    computed: {
        visibility: {
            get(): ElementVisibility {
                return this.modelValue;
            },
            set(value: ElementVisibility) {
                this.$emit("update:model-value", value);
            },
        },
    },
});
</script>
<style lang="scss" scoped></style>
