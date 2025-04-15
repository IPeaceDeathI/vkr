<template>
    <template v-if="$store.getters['environment/isEditable']">
        <select-gallery
            :variant="galleryVariant.image"
            :items="items"
            :absolute="true"
            @pasteItem="$emit('paste')"
        />
    </template>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { selectGallery, galleryVariant } from "@/shared/libs/select_gallery";
import { ElementsFabric } from "@/shared/services/elements_fabrics";
export default defineComponent({
    components: {
        selectGallery,
    },
    emits: {
        paste: () => true,
    },
    data() {
        return {
            galleryVariant: galleryVariant,
            items: ElementsFabric.getItemsFabric()
                .getItemsShort()
                .map((obj) => {
                    return {
                        id: obj.type as string,
                        name: obj.name,
                        preview: obj.preview,
                    };
                }),
        };
    },
});
</script>
<style lang="scss" scoped></style>
