<template>
    <v-dialog off-margin-overlay-content :width="width" :attach="attach">
        <v-card
            elevation="12"
            :width="width"
            :min-height="heightMin"
            :max-height="heightMax"
            rounded="5px"
            color="editorBg"
        >
            <slot />
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        attach: {
            type: String,
            default: "[noks-attach-dialog-target]",
        },
        width: {
            type: String,
            required: true,
        },
        heightMin: {
            type: String,
        },
        heightMax: {
            type: String,
        },
    },
});
</script>
<style></style>
