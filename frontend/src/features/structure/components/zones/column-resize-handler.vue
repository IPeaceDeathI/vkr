<template>
    <div class="column-resize-handler" ref="element" :class="className">
        <div class="column-resize-handle-wrapper item-controls">
            <resize-handle-x
                :color="color"
                :type="ResizeHandleTypes.space"
                @input="input"
                @change="$emit('onChange')"
            ></resize-handle-x>
        </div>
    </div>
</template>
<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
import { GapClass } from "./types";
import {
    ResizeHandleTypes,
    resizeHandleX,
    ResizeHandleSides,
} from "@/shared/libs/resize_handle";
import { themeVariable } from "@/shared/constants/default_values";
import { ColumnShiftDirection } from "@/entities/structure/modules/zones/types/actions";

export default defineComponent({
    props: {
        index: {
            type: Number,
            required: true,
        },
        className: {
            type: String as PropType<GapClass>,
            default: GapClass.middle,
        },
        shiftColumn: {
            type: Function as PropType<
                (val: {
                    index: number;
                    shiftDirection: ColumnShiftDirection;
                }) => boolean
            >,
            required: true,
        },
    },
    data() {
        return {
            ResizeHandleTypes: ResizeHandleTypes,
            ResizeHandleSides: ResizeHandleSides,
            color: themeVariable.editor,
            currentOffset: 0,
        };
    },
    components: {
        resizeHandleX,
    },

    methods: {
        input(val: number) {
            val *= -1;
            const target = this.$refs.element as Element;
            const columnLayout = target.closest(".columns-layout");
            this.currentOffset += val;
            if (columnLayout) {
                if (
                    Math.abs(this.currentOffset) >
                    Math.abs(columnLayout.clientWidth / 24)
                ) {
                    let direction: ColumnShiftDirection = "right";
                    let index = this.index - 1;
                    if (Math.sign(this.currentOffset) === -1) {
                        direction = "left";
                        index = this.index;
                    }
                    const result = this.shiftColumn({
                        index,
                        shiftDirection: direction,
                    });
                    if (result) {
                        this.currentOffset = 0;
                    }
                }
            }
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.column-resize-handler {
    &.gap-none {
        width: 10px;
    }
    &.gap-middle {
        width: 20px;
    }
    &.gap-large {
        width: 36px;
    }
    height: 100%;
    position: absolute;
    z-index: calc(var(--base-z-index) + $column-resize-handle-z-index);
    left: 0;
    top: 0;
    transform: translateX(-50%);
}
.column-resize-handle-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
