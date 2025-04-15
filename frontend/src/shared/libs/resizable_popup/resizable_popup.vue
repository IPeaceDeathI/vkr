<!-- /TODO переделать для луюого количестваслотов и табов  -->
<!-- TODO  Разобрать компонент и убрать биздес логигу в features -->
<!-- TODO переключение вкладок переложить на другой компонент -->
<template>
    <vue-resizable
        ref="edit_menu_wrapper"
        :maxWidth="maxW"
        :maxHeight="maxH"
        :left="left"
        :top="top"
        :active="[]"
        dragSelector="[data-noks-edit-menu-drag]"
        class="edit-menu-wrapper"
    >
        <slot></slot>
    </vue-resizable>
</template>

<script lang="ts">
import VueResizable from "vue-resizable/src/components/vue-resizable.vue";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        VueResizable,
    },

    props: {
        maxWidth: Number,
        maxHeight: Number,
        left: {
            type: Number,
            default: 0,
        },
        top: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            maxW: this.maxWidth ?? 550,
            maxH: this.maxHeight ?? 800,
        };
    },
});
</script>

<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.win-item {
    padding: 1em;
    padding-top: 0;
    height: 93%;
}

[data-noks-edit-menu-drag] {
    cursor: move;
}
</style>
