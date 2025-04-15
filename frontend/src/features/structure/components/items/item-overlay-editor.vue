<template>
    <template v-if="$store.getters['environment/isEditable']">
        <div class="item-overlay-editor" :class="{ show: show }">
            <div class="editor-layout top">
                <slot name="top" />
            </div>
            <div class="editor-layout bottom">
                <slot name="bottom" />
            </div>
        </div>
    </template>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        show: {
            type: Boolean,
            default: true,
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.editor-layout {
    position: relative;
    left: 0;
    width: 100%;
    height: 50%;
    z-index: calc(var(--base-z-index) + $editor-item-overlay-editor-z-index);
    opacity: 0;
    &.top {
        top: 0;
    }
    &.bottom {
        bottom: 0;
    }
    &:hover {
        opacity: 1;
        transition: opacity 0.4s;
    }
}
.item-overlay-editor {
    position: absolute;
    width: 100%;
    opacity: 0;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #0000001a;
    visibility: hidden;
    &:hover {
        opacity: 1;
    }
    &.show {
        visibility: visible;
    }
}
</style>
