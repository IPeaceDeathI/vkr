<template>
    <template v-if="$store.getters['environment/isEditable']">
        <div
            class="item-controls"
            :class="{
                'size-handle-is-move': isMove,
                'percent-padding-bottom': isPercentPaddingB,
            }"
        >
            <resize-handle-y
                :side="side"
                :color="color"
                @input="onInput"
                @change="onChange"
                @start="isMove = true"
                @stop="isMove = false"
            />
            <div
                class="side-size-indicator-y"
                :class="side === ResizeHandleSides.top ? 'top' : 'bottom'"
            >
                <v-chip
                    class="chip"
                    variant="elevated"
                    rounded="lg"
                    color="editor"
                    v-show="isMove"
                    :prepend-icon="
                        $store.getters['environment/isMobileViewport']
                            ? 'mdi-cellphone'
                            : ''
                    "
                >
                    {{ sideSize + sideUnit }}
                </v-chip>
            </div>
        </div>
    </template>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ResizeHandleSides, resizeHandleY } from "@/shared/libs/resize_handle";
import { resizeHandlerMixin } from "./mixins";
import { ItemTypesWithPercPaddingB } from "@/shared/services/elements_fabrics/items_fabric/ItemsFabric";
import { DesktopSidesPadding, ItemTypes, MobileSidesPadding } from "@/types";
export default defineComponent({
    mixins: [resizeHandlerMixin],
    components: {
        resizeHandleY,
    },
    props: {
        side: {
            type: Number as PropType<
                ResizeHandleSides.bottom | ResizeHandleSides.top
            >,
            default: ResizeHandleSides.top,
        },
        itemMobileSides: {
            type: Object as PropType<MobileSidesPadding>,
            required: true,
        },
        type: {
            type: String as PropType<ItemTypes>,
            required: true,
        },
    },
    emits: {
        onChange: () => true,
        "update:itemSides": (val: DesktopSidesPadding) => true,
        "update:itemMobileSides": (val: MobileSidesPadding) => true,
    },
    computed: {
        sideSize: function (): number {
            if (this.side === ResizeHandleSides.top) {
                return this.paddingTop ?? "?";
            } else {
                return this.paddingBottom ?? "?";
            }
        },
        paddingTop: {
            get(): number {
                if (this.$store.getters["environment/isDesktopViewport"]) {
                    return this.itemSides.paddingTop;
                } else {
                    return this.itemMobileSides.paddingTop !== false &&
                        this.itemMobileSides.paddingTop !== true
                        ? this.itemMobileSides.paddingTop
                        : this.itemSides.paddingTop;
                }
            },
            set(value: number) {
                if (this.$store.getters["environment/isDesktopViewport"]) {
                    this.$emit("update:itemSides", {
                        ...this.itemSides,
                        paddingTop: value,
                    });
                } else {
                    this.$emit("update:itemMobileSides", {
                        ...this.itemMobileSides,
                        paddingTop: value,
                    });
                }
            },
        },
        paddingBottom: {
            get(): number {
                if (this.$store.getters["environment/isDesktopViewport"]) {
                    return this.itemSides.paddingBottom;
                } else {
                    return this.itemMobileSides.paddingBottom !== false &&
                        this.itemMobileSides.paddingBottom !== true
                        ? this.itemMobileSides.paddingBottom
                        : this.itemSides.paddingBottom;
                }
            },
            set(value: number) {
                if (this.$store.getters["environment/isDesktopViewport"]) {
                    this.$emit("update:itemSides", {
                        ...this.itemSides,
                        paddingBottom: value,
                    });
                } else {
                    this.$emit("update:itemMobileSides", {
                        ...this.itemMobileSides,
                        paddingBottom: value,
                    });
                }
            },
        },
        isPercentPaddingB() {
            return ItemTypesWithPercPaddingB.includes(this.type);
        },
        sideUnit: function (): "%" | "px" {
            if (
                this.isPercentPaddingB &&
                this.side === ResizeHandleSides.bottom
            ) {
                return "%";
            }
            return "px";
        },
    },
    methods: {
        onInput(value: number, event: MouseEvent) {
            if (this.side === ResizeHandleSides.top)
                this.onInputTop(value, event);
            else {
                this.onInputBottom(value, event);
            }
        },
        onInputTop(value: number, event: MouseEvent) {
            if (this.validValue(this.paddingTop + value))
                this.paddingTop += value;
        },
        getOffsets(value: number, event: MouseEvent, parentCoordinate: number) {
            const parentNode = this.$el.parentNode.parentNode as Element;
            const mouseYCoordinate = event.clientY;
            const parentNodeHeight = parentNode.clientWidth;
            const pixelOffset = parentCoordinate - mouseYCoordinate;
            const percentOffset = (pixelOffset / parentNodeHeight) * 100;
            return {
                px: Math.round(pixelOffset),
                perc: Math.round(percentOffset),
            };
        },
        onInputBottom(value: number, event: MouseEvent) {
            let { px, perc } = this.getOffsets(
                value,
                event,
                this.$el.parentNode
                    .querySelector(".item-container")
                    .getBoundingClientRect().bottom
            );
            px *= -1;
            perc *= -1;
            if (ItemTypesWithPercPaddingB.includes(this.type)) {
                if (this.paddingBottom !== perc) {
                    this.paddingBottom += perc;
                }
            } else {
                if (this.validValue(px) && this.paddingBottom !== px) {
                    this.paddingBottom = px;
                }
            }
        },
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.side-size-indicator-y {
    position: absolute;
    z-index: calc(var(--base-z-index) + $editor-resize-hadl-z-index);
    left: 50%;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently*/
    pointer-events: none;
    &.top {
        top: 0;
        transform: translateX(-50%) translateY(40%);
    }
    &.bottom {
        bottom: 0;
        transform: translateX(-50%) translateY(-40%);
    }
}
</style>
