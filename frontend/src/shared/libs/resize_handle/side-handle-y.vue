<template>
    <div
        v-if="type === ResizeHandleTypes.side"
        class="y-handle"
        @mousedown="mouseDown"
        :style="styles"
    >
        <div class="icon"></div>
    </div>
    <div v-else class="y-handle-space handle-space" @mousedown="mouseDown">
        <svg
            class="beacon-svg"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path
                d="M17.63,5.84C17.27,5.33 16.67,5 16,5H5A2,2 0 0,0 3,7V17A2,2 0 0,0 5,19H16C16.67,19 17.27,18.66 17.63,18.15L22,12L17.63,5.84Z"
            />
        </svg>
        <span class="beacon"></span>
    </div>
</template>

<script lang="ts">
import resizeHadle from "./mixin";
import { ResizeHandleSides } from "./types";
import { defineComponent } from "vue";
export default defineComponent({
    name: "side-handle-y",
    mixins: [resizeHadle],
    methods: {
        mouseDown(event: MouseEvent) {
            document.addEventListener("mousemove", this.mouseMove);
            document.addEventListener("mouseup", this.mouseUp);
            this.lastVal = event.screenY;
            this.$emit("start");
        },
        mouseMove(event: MouseEvent) {
            const change = this.lastVal - event.screenY;
            if (change !== 0) this.$emit("input", change, event);
            this.initVal += change;
            this.lastVal = event.screenY;
        },
    },
    computed: {
        styles: function () {
            if (this.side === ResizeHandleSides.bottom) {
                return { bottom: "0", transform: "translateY(50%)" };
            } else if (this.side === ResizeHandleSides.top) {
                return { top: "0", transform: "translateY(-50%)" };
            } else if (this.side === ResizeHandleSides.center) {
                return { top: "50%", transform: "translateY(-50%)" };
            } else {
                return {};
            }
        },
    },
});
</script>

<style scoped type="scss">
.y-handle {
    height: 18px;
    z-index: calc(var(--base-z-index, 0) + 800);
    cursor: ns-resize;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    padding: 6px 2px;
    width: 24px;
}
.icon {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid v-bind("color");
    border-radius: 30%;
}
.handle-space {
    color: v-bind("color");
}
.y-handle:hover .icon {
    box-shadow: 0 0 5px 1px v-bind("color");
}
</style>
