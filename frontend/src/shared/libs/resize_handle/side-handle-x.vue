<template>
    <div
        v-if="type === ResizeHandleTypes.side"
        class="x-handle"
        @mousedown="mouseDown"
        :style="styles"
    >
        <div class="icon"></div>
    </div>
    <div v-else class="x-handle-space handle-space" @mousedown="mouseDown">
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
    name: "side-handle-x",
    mixins: [resizeHadle],
    methods: {
        mouseDown(event: MouseEvent) {
            document.addEventListener("mousemove", this.mouseMove);
            document.addEventListener("mouseup", this.mouseUp);
            this.lastVal = event.screenX;
            this.$emit("start");
        },
        mouseMove(event: MouseEvent) {
            if (event.which == 0) {
                this.mouseUp(event);
                return;
            }
            const change = this.lastVal - event.screenX;
            if (change !== 0) this.$emit("input", change, event);

            // if (change > 0) this.$emit("input", change, event);
            this.initVal += change;
            this.lastVal = event.screenX;
        },
    },
    computed: {
        styles: function () {
            if (this.side === ResizeHandleSides.left) {
                return { left: "0", transform: "translateX(-50%)" };
            } else if (this.side === ResizeHandleSides.right) {
                return { right: "0", transform: "translateX(50%)" };
            } else if (this.side === ResizeHandleSides.center) {
                return { left: "50%", transform: "translateX(-50%)" };
            } else {
                return {};
            }
        },
    },
});
</script>

<style scoped lang="scss">
@import "./index.scss";
.x-handle {
    z-index: calc(var(--base-z-index, 0) + 800);
    position: absolute;
    margin: auto;
    bottom: 0;
    top: 0;
    height: 24px;
    width: 18px;
    padding: 2px 6px;
    cursor: ew-resize;
}
.icon {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid v-bind("color");
    border-radius: 30%;
}
.x-handle:hover .icon {
    box-shadow: 0 0 5px 1px v-bind("color");
}
.x-handle-space {
    position: absolute;
    top: 0;
    left: 0;
    cursor: col-resize;
}
.handle-space {
    color: v-bind("color");
}
</style>
