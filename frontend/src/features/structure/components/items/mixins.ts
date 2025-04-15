import { defineComponent, PropType } from "vue";
import { themeVariable } from "@/shared/constants/default_values";
import { ResizeHandleSides } from "@/shared/libs/resize_handle";
import { DesktopSidesPadding, MobileSidesPadding } from "@/types";

export const resizeHandlerMixin = defineComponent({
    props: {
        itemSides: {
            type: Object as PropType<DesktopSidesPadding>,
            required: true,
        },
    },

    data() {
        return {
            ResizeHandleSides: ResizeHandleSides,
            color: themeVariable.editor,
            isMove: false,
            traveledPixels: 0,
        };
    },
    methods: {
        onChange() {
            this.traveledPixels = 0;
            this.$emit("onChange");
        },
        validValue(value: number) {
            return value >= 0;
        },
    },
});
