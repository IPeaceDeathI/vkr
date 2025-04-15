<template>
    <draggable-dialog
        off-margin-overlay-content
        :handle="handle"
        :parent-selector="parentSelector"
        transition="scale-transition"
        :width="width"
    >
        <v-card
            elevation="12"
            :width="width"
            :min-height="height"
            rounded="5px"
            color="editorBg"
            noks-attach-dialog-target
        >
            <slot />
        </v-card>
    </draggable-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { draggableDialog } from "@/shared/libs/draggable_dialog";

export default defineComponent({
    components: {
        draggableDialog,
    },
    props: {
        parentSelector: {
            type: HTMLElement,
        },
        width: {
            type: String,
            required: true,
        },
        height: {
            type: String,
        },
        handle: {
            type: String,
            default: "v-toolbar",
        },
    },
});
</script>
<style></style>
