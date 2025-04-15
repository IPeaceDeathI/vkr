<template>
    <v-switch v-model="value">
        <template v-slot:label
            >{{ label }}
            <information-icon
                :close-delay="200"
                max-width="350"
                :text="hintText"
                size="14"
                :type="iconType"
                class="if-icon-media-redactor"
            ></information-icon></template
    ></v-switch>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
    InformationIconType,
    informationIcon,
} from "@/shared/libs/information-icon";
import { PropType } from "vue";
export default defineComponent({
    components: {
        informationIcon,
    },
    data() {
        return {
            InformationIconType: InformationIconType,
        };
    },
    props: {
        modelValue: { type: Boolean, required: true },
        iconType: {
            type: String as PropType<InformationIconType>,
            default: InformationIconType.question,
        },
        hintText: { type: String, required: true },
        label: { type: String },
    },
    computed: {
        value: {
            get(): boolean {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
    },
});
</script>
<style lang="scss" scoped></style>
