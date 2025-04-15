<template>
    <div class="handle" :style="styles">
        <div class="icon"></div>
    </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        side: {
            type: String as PropType<"t" | "b" | "r" | "l">,
            default: "t",
        },
        color: {
            type: String,
            default: "black",
        },
    },
    computed: {
        styles: function () {
            if (this.side === "l") {
                return {
                    top: "50%",
                    left: "0",
                    transform: "translateX(-50%) translateY(-50%)",
                };
            } else if (this.side === "r") {
                return {
                    top: "50%",
                    right: "0",
                    transform: "translateX(50%) translateY(-50%)",
                };
            } else if (this.side === "t") {
                return {
                    left: "50%",
                    top: "0",
                    transform: "translateY(-50%) translateX(-50%)",
                };
            } else if (this.side === "b") {
                return {
                    left: "50%",
                    bottom: "0",
                    transform: "translateY(50%) translateX(-50%)",
                };
            } else return {};
        },
        position: function (): "vertical" | "horizontal" {
            if (this.side === "l" || this.side === "r") {
                return "horizontal";
            } else return "vertical";
        },
        width: function (): string {
            if (this.position === "vertical") {
                return "24px";
            } else {
                return "18px";
            }
        },
        paddings: function (): string {
            if (this.position === "vertical") {
                return "6px 2px";
            } else {
                return "2px 6px";
            }
        },
        height: function (): string {
            if (this.position === "vertical") {
                return "18px";
            } else {
                return "24px";
            }
        },
        cursor: function (): string {
            if (this.position === "vertical") {
                return "ns-resize";
            } else {
                return "ew-resize";
            }
        },
    },
});
</script>

<style scoped lang="scss">
.handle {
    z-index: calc(var(--base-z-index, 0) + 800);
    position: absolute;
    bottom: 0;
    height: v-bind("height");
    width: v-bind("width");
    padding: v-bind("paddings");
    cursor: v-bind("cursor");
}
.icon {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid v-bind("color");
    border-radius: 30%;
}
.handle:hover .icon {
    box-shadow: 0 0 5px 1px v-bind("color");
}
</style>
