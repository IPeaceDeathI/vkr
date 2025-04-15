<template>
    <template v-if="$store.getters['environment/isEditable']">
        <div
            class="block-spacer-resize"
            :class="{ drag: isDraggable }"
            v-on-drag="{
                onInput: onInput,
                onStop: onStop,
                onStart: onStart,
            }"
        ></div>
        <div class="block-spacer-resize-indicator">
            <v-chip
                class="size-indicator"
                color="black"
                variant="flat"
                size="small"
                >{{ heigth }}px</v-chip
            >
        </div>
    </template>
</template>
<script lang="ts">
import { Сoordinates } from "@/app";
import { PropType } from "vue";
import { defineComponent } from "vue";
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
    data() {
        return {
            isDraggable: false,
            currentOffset: 0,
            step: 5,
        };
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
        top() {
            return this.side === "top" ? "0px" : "auto";
        },
        bottom() {
            return this.side === "bottom" ? "0px" : "auto";
        },
    },

    methods: {
        onInput(val: Сoordinates, event: MouseEvent) {
            if (this.side === "bottom") val.y *= -1;
            this.currentOffset += val.y;
            if (Math.abs(this.currentOffset) < this.step) return;
            if (
                this.validateSide(
                    this.heigth + this.step * Math.sign(this.currentOffset)
                )
            )
                this.heigth += this.step * Math.sign(this.currentOffset);
            this.currentOffset = 0;
        },
        onStop(val: string) {
            this.isDraggable = false;
        },
        onStart() {
            this.isDraggable = true;
        },
        validateSide(val: number) {
            return val > 0;
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.block-spacer-resize {
    opacity: 0;
    position: absolute;
    height: 5px;
    width: 100%;
    top: v-bind(top);
    background-color: black;
    bottom: v-bind(bottom);
    z-index: calc(var(--base-z-index) + $block-bg-overlay-z-index);
    cursor: row-resize;
    pointer-events: all;
    &:hover,
    &.drag {
        opacity: 0.2;
    }
    &:hover + .block-spacer-resize-indicator {
        background-size: 6px;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-repeat: repeat;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 6 6%27%3E%3Cpath d=%27M0 6l6-6M-.75.75l1.5-1.5m4.5 7.5l1.5-1.5%27 stroke=%27%23999%27/%3E%3C/svg%3E");
    }
    &.drag + .block-spacer-resize-indicator {
        background-size: 6px;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-repeat: repeat;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 6 6%27%3E%3Cpath d=%27M0 6l6-6M-.75.75l1.5-1.5m4.5 7.5l1.5-1.5%27 stroke=%27%23999%27/%3E%3C/svg%3E");
        & .size-indicator {
            opacity: 1;
        }
    }
}
.block-spacer-resize-indicator {
    position: absolute;
    display: none;
    height: 100%;
    width: 100%;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/
}
.size-indicator {
    opacity: 0;
}
</style>
