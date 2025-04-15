<template>
    <div v-if="baseBGParams.selectedBg !== BlockBgTypes.none" class="block-bg">
        <div
            v-if="
                baseBGParams.selectedBg === BlockBgTypes.image ||
                (baseBGParams.selectedBg === BlockBgTypes.video &&
                    baseBGParams.video.basicBG.selectedBasicBg === 'image')
            "
            class="layer holder-image"
        />
        <div
            v-if="baseBGParams.selectedBg === BlockBgTypes.video"
            class="layer holder-video"
        />
        <div
            v-if="
                baseBGParams.selectedBg === BlockBgTypes.color ||
                (baseBGParams.selectedBg === BlockBgTypes.video &&
                    baseBGParams.video.basicBG.selectedBasicBg === 'image')
            "
            class="layer holder-color"
        />
        <div
            v-if="baseBGParams.blackout.enabled"
            class="layer holder-overlay"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { BaseBGParams, BlockBgTypes } from "@/types";
import { PropType } from "vue";
export default defineComponent({
    props: {
        baseBGParams: {
            type: Object as PropType<BaseBGParams>,
            required: true,
        },
    },
    data() {
        return {
            BlockBgTypes: BlockBgTypes,
        };
    },
});
</script>
