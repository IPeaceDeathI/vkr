import { defineComponent, PropType } from "vue";
import { ResizeHandleSides, ResizeHandleTypes } from "./types";

export default defineComponent({
    data() {
        return {
            ResizeHandleTypes: ResizeHandleTypes,
            lastVal: 0,
            initVal: 0,
        };
    },
    emits: {
        input(val: number, event: MouseEvent) {
            return true;
        },
        change(val: number) {
            return true;
        },
        stop() {
            return true;
        },
        start() {
            return true;
        },
    },
    props: {
        side: {
            type: Number as PropType<ResizeHandleSides>,
            default: ResizeHandleSides.top,
        },
        color: {
            type: String,
        },
        type: {
            type: String as PropType<ResizeHandleTypes>,
            default: ResizeHandleTypes.side,
        },
    },
    unmounted() {
        document.removeEventListener("mouseup", this.mouseUp);
    },
    methods: {
        mouseUp(event: MouseEvent) {
            this.$emit("change", this.initVal);
            this.$emit("stop");
            this.lastVal = 0;
            this.initVal = 0;
            document.removeEventListener("mousemove", this.mouseMove);
            document.removeEventListener("mouseup", this.mouseUp);
        },
        mouseMove() {
            console.error("empty");
        },
    },
});
