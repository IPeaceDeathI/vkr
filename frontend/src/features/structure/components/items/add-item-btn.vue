<template>
    <template v-if="$store.getters['environment/isEditable']">
        <add-button
            class="add-item-btn item-controls"
            :side="side"
            :position="position"
            @click="dialogOpened = true"
            :hidden="hidden"
        />
        <items-gallery
            :dialogOpened="dialogOpened"
            @select="add"
            @closeWithoutSelected="dialogOpened = false"
            @paste="$emit('paste')"
        />
    </template>
</template>
<script lang="ts">
import itemsGallery from "./items-gallery.vue";
import {
    addButton,
    AddButtonSides,
    AddButtonPosition,
} from "@/shared/helpers/components";
import { ElementsFabric } from "@/shared/services/elements_fabrics";
import { ItemBundle, ItemParams } from "@/types";
import { defineComponent, PropType } from "vue";
export default defineComponent({
    components: {
        addButton,
        itemsGallery,
    },
    props: {
        side: {
            type: Number as PropType<AddButtonSides>,
        },
        position: {
            type: String as PropType<AddButtonPosition>,
            default: AddButtonPosition.absolute,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
    },
    emits: {
        addItem: (itemBundle: ItemBundle) => true,
        paste: () => true,
    },
    data() {
        return {
            dialogOpened: false,
        };
    },
    methods: {
        add(type: string) {
            const bundle = ElementsFabric.getItemsFabric()
                .getItem(type)
                .getBundle();
            this.$emit("addItem", bundle);
            this.dialogOpened = false;
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.add-zone-btn {
    position: absolute;
    z-index: calc(var(--base-z-index) + $editor-add-item-btn-area-z-index);
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
}
</style>
