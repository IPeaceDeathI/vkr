<template>
    <template-catalog v-model="$store.getters['project/isEmpty']" />
    <block-header />
    <block-ruler v-if="$store.getters['environment/isRuler']"></block-ruler>
    <div class="main-block-area-container">
        <div
            class="main-block-area"
            :class="{
                'viewport-is-mobile':
                    $store.getters['environment/isMobileViewport'],
            }"
        >
            <block-grids
                :numColumns="$store.getters['environment/numGrids']"
                :colorColumns="$store.getters['environment/colorGrids']"
                :gapColumns="$store.getters['environment/gapGrids']"
                :widthColumns="$store.getters['environment/widthGrids']"
                :widthContainer="
                    $store.getters['environment/isDesktopViewport'] ? 1200 : 400
                "
                v-if="$store.getters['environment/isGrids']"
            />
            <block-area />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import blockHeader from "@/widgets/areas/menu_area/block-header/block-header.vue";
import blockRuler from "@/widgets/areas/menu_area/block-header/block-ruler.vue";
import blockGrids from "@/widgets/areas/menu_area/block-header/block-grids.vue";
import blockArea from "@/widgets/areas/block_area/block-area.vue";
import { templateCatalog } from "@/shared/services/template_catalog";

export default defineComponent({
    components: {
        blockHeader,
        blockRuler,
        blockGrids,
        blockArea,
        templateCatalog,
    },
    data() {
        return {
            url: process.env.BASE_URL,
            msg: "Hello",
            show: true,
        };
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.main-block-area-container {
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.main-block-area.viewport-is-mobile {
    width: $mobileViewPortWidth;
}
</style>
