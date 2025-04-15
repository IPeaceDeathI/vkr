<template>
    <template
        v-if="
            $store.getters['environment/isEditable'] &&
            $store.getters['environment/isDesktopViewport']
        "
    >
        <div>
            <div class="item-controls">
                <resize-handle-x
                    :side="side"
                    :color="color"
                    @start="isMove = true"
                    @stop="isMove = false"
                    @input="onInput"
                    @change="onChange"
                />
            </div>
            <div
                class="side-size-indicator-x"
                :class="side === ResizeHandleSides.left ? 'left' : 'right'"
            >
                <v-chip
                    class="chip"
                    variant="elevated"
                    color="editor"
                    rounded="lg"
                    v-show="isMove"
                >
                    {{ sideSize }} %
                </v-chip>
            </div>
        </div>
    </template>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ResizeHandleSides, resizeHandleX } from "@/shared/libs/resize_handle";
import { resizeHandlerMixin } from "./mixins";
import { DesktopSidesPadding } from "@/types";
export default defineComponent({
    mixins: [resizeHandlerMixin],
    components: {
        resizeHandleX,
    },
    props: {
        side: {
            type: Number as PropType<
                ResizeHandleSides.left | ResizeHandleSides.right
            >,
            default: ResizeHandleSides.left,
        },
    },
    emits: {
        onChange: () => true,
        "update:item-sides": (val: DesktopSidesPadding) => true,
    },
    computed: {
        sideSize: function (): number {
            if (this.side === ResizeHandleSides.left) {
                return this.itemSides.paddingLeft;
            } else {
                return this.itemSides.paddingRight;
            }
        },
        contrSideSize: function (): number {
            if (this.side === ResizeHandleSides.left) {
                return this.itemSides.paddingRight;
            } else {
                return this.itemSides.paddingLeft;
            }
        },
    },
    methods: {
        onInput(value: number, event: MouseEvent) {
            if (this.side === ResizeHandleSides.left) {
                this.onInputLeft(value, event);
            } else {
                this.onInputRight(value, event);
            }
        },
        onInputRight(value: number, event: MouseEvent) {
            const { px, perc } = this.getOffsets(
                value,
                event,
                this.$el.parentNode.parentNode.getBoundingClientRect().right
            );
            if (this.validValue(perc) && this.itemSides.paddingRight !== perc)
                this.$emit("update:item-sides", {
                    ...this.itemSides,
                    paddingRight: perc,
                });
        },
        onInputLeft(value: number, event: MouseEvent) {
            let { px, perc } = this.getOffsets(
                value,
                event,
                this.$el.parentNode.parentNode.getBoundingClientRect().left
            );
            px *= -1;
            perc *= -1;
            if (this.validValue(perc) && this.itemSides.paddingLeft !== perc)
                this.$emit("update:item-sides", {
                    ...this.itemSides,
                    paddingLeft: perc,
                });
        },
        getOffsets(value: number, event: MouseEvent, parentCoordinate: number) {
            const parentNode = this.$el.parentNode.parentNode as Element;
            const mouseXCoordinate = event.pageX;
            const parentNodeWidth = parentNode.clientWidth;
            const pixelOffset = parentCoordinate - mouseXCoordinate;
            const percentOffset = (pixelOffset / parentNodeWidth) * 100;
            return {
                px: Math.round(pixelOffset),
                perc: Math.round(percentOffset),
            };
        },
        validValue(value: number) {
            return value >= 0 && value + this.contrSideSize <= 90;
        },
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.side-size-indicator-x {
    position: absolute;
    z-index: calc(var(--base-z-index) + $editor-resize-hadl-z-index);
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/
    pointer-events: none;
    top: 50%;
    &.left {
        transform: translateX(-100%) translateY(-55%);
        left: -10px;
    }
    &.right {
        transform: translateX(100%) translateY(-55%);
        right: -10px;
    }
}
</style>
