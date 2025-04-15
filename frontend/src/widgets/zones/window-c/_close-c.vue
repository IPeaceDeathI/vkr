<template>
    <div
        data-noks-window-close
        class="close"
        :class="`close-${position}`"
        @click="$emit('close')"
    >
        <div class="close-icon">
            <svg viewBox="0 0 24 24">
                <use :href="iconPath" />
            </svg>
        </div>
    </div>
</template>
<script lang="ts">
import { WindowCrossPosition } from "@/types";
import { PropType } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        position: {
            type: String as PropType<WindowCrossPosition>,
            required: true,
        },
        iconPath: {
            type: String,
            default: "",
        },
    },
    emits: {
        close: () => true,
    },
});
</script>
