<template>
    <div ref="container" class="add-btn-container" :class="myClass">
        <v-icon
            class="add-icon"
            data-constructor-add-block-btn
            size="small"
            color="primary"
            @click.stop="click"
            >mdi-plus
        </v-icon>
        <div class="hover-line"></div>
        <v-tooltip open-delay="500" activator="parent">
            Добавить блок
        </v-tooltip>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { AddButtonSides, AddButtonPosition } from "./types";
import { PropType } from "vue";
export default defineComponent({
    emits: ["click"],
    props: {
        side: {
            type: Number as PropType<AddButtonSides>,
            default: AddButtonSides.top,
        },
        position: {
            type: String as PropType<AddButtonPosition>,
            default: AddButtonPosition.relative,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        if (this.hidden)
            document.addEventListener("mousemove", this.mouseEvent);
    },
    unmounted() {
        document.removeEventListener("mousemove", this.mouseEvent);
    },
    data() {
        return {
            AddButtonSides: AddButtonSides,
        };
    },
    computed: {
        myClass: function () {
            let result = [];
            if (!this.hidden) {
                result.push("show");
            }
            let position =
                this.side === AddButtonSides.top
                    ? "add-btn-container-top"
                    : "add-btn-container-bottom";
            if (this.side == AddButtonSides.center) {
                position = "add-btn-container-center";
            }
            result.push(position);
            return result;
        },
    },
    methods: {
        click() {
            this.$emit("click");
        },
        mouseEvent: function (e: MouseEvent) {
            const el = this.$refs.container as Element;
            const elY = el.getBoundingClientRect().top;
            const mY = e.clientY;
            if (Math.abs(elY - mY) < 100) {
                el.classList.add("show");
            } else el.classList.remove("show");
        },
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.add-btn-container {
    position: v-bind(position);
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    z-index: calc(var(--base-z-index) + $editor-add-block-btns-z-index);
    opacity: 0;
    transition: opacity 0.2s;
    &.show {
        opacity: 1;
    }
    &.add-btn-container-center {
        top: 50%;
        transform: translateY(-50%);
    }
    &.add-btn-container-bottom {
        top: unset;
        bottom: 0;
    }
}
.hover-line {
    position: absolute;
    z-index: calc(
        var(--base-z-index) + calc($editor-add-block-btns-z-index - 1)
    );
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;
    display: none;
    .add-btn-container-center & {
        top: 50%;
        transform: translateY(-50%);
    }
    .add-btn-container-bottom & {
        top: unset;
        bottom: 0;
    }
}
.add-icon:hover + .hover-line {
    display: block;
    background-color: $theme-editor;
}
.add-icon {
    background-color: $theme-editor;
    position: absolute;
    z-index: calc(var(--base-z-index) + $editor-add-block-btns-z-index);
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    top: 0;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.8;
    padding: 12px;
    .add-btn-container-center & {
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .add-btn-container-bottom & {
        top: unset;
        bottom: 0;
        transform: translateX(-50%) translateY(50%);
    }
    &:hover {
        opacity: 1;
    }
}
</style>
