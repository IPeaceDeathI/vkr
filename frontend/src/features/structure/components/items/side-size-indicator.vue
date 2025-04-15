<template>
    <div
        v-if="$store.getters['environment/isEditable']"
        class="side-size-indicator item-controls"
        :class="side"
    />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SideSizeIndicatorSides } from "./types";
export default defineComponent({
    props: {
        side: {
            type: String as PropType<SideSizeIndicatorSides>,
            required: true,
        },
    },
});
</script>
<style lang="scss" scoped></style>
