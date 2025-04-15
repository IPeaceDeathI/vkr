<template>
    <v-btn :prepend-icon="label ? icon : undefined" :size="size">
        <template v-slot:prepend v-if="label">
            <v-icon
                :icon="icon"
                :color="colorIcon"
                :class="classIcon"
                size="large"
            ></v-icon>
        </template>
        <template v-if="!label">
            <v-icon
                :icon="icon"
                :color="colorIcon"
                :class="classIcon"
                size="large"
            ></v-icon>
        </template>

        {{ label }}
        <v-tooltip
            v-if="tooltipText != ''"
            activator="parent"
            :location="tooltipPosition ? 'top' : 'bottom'"
        >
            {{ tooltipText }}
        </v-tooltip>
        <slot />
    </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        icon: { type: String, default: "" },
        colorIcon: { type: String, default: "primary" },
        size: { type: String, default: "small" },
        label: { type: String, default: "" },
        classBtn: { type: String, default: "" },
        classIcon: { type: String, default: "" },
        navigateTo: String,
        methodName: String,
        tooltipPosition: {
            type: String,
            validator(value: string) {
                // The value must match one of these strings
                return ["top", "bottom", "left", "right"].includes(value);
            },
            default: "bottom",
        },
        tooltipText: { type: String, default: "" },
    },
    methods: {
        handleButtonClick() {
            if (this.navigateTo) {
                this.$router.push(this.navigateTo);
            } else if (this.methodName) {
                this.$emit("method-clicked", this.methodName);
            }
        },
    },
});
</script>
