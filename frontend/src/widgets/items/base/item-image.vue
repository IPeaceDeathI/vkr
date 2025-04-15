<template>
    <item-content>
        <div ref="wrp">
            <template v-if="params.mediaType === MediaType.image">
                <div class="content-bg-image" />
                <div class="content-overlay-text">
                    <div class="overlay-text-wrapper">
                        <div class="text-title" />
                        <div class="text-main" />
                    </div>
                </div>
            </template>
            <template v-if="params.mediaType === MediaType.slider">
                <slider-wrapper
                    :params="params.sliderParams"
                    :slider-effect="params.sliderParams.effect"
                >
                    <li
                        v-for="(image, index) in params.sliderParams.images"
                        :key="image.imageParams.src"
                        class="splide__slide"
                        :class="'img-' + index"
                    >
                        <div class="content-bg-image" />
                        <div class="content-overlay-text">
                            <div class="overlay-text-wrapper">
                                <div class="text-title" />
                                <div class="text-main" />
                            </div>
                        </div>
                    </li>
                </slider-wrapper>
            </template>
            <template v-if="params.mediaType === MediaType.video">
                <video-wrapper
                    :item-image-params="params"
                    :params="params.videoParams"
                />
            </template>
        </div>
    </item-content>
    <redactor-overlay
        :itemId="id"
        v-slot="{
            show,
            setShow,
        }: {
            show: boolean,
            setShow: (value: boolean) => void,
        }"
    >
        <media-redactor
            :params="params"
            :modelValue="show"
            @update:modelValue="setShow"
            @onChange="updateParams"
            :parent-selector="wrp"
        />
    </redactor-overlay>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>

<script setup lang="ts">
import { shallowRef, toRefs, triggerRef } from "vue";
import itemContent from "./_item-content.vue";
import { redactorOverlay } from "@/features/structure";
import { mediaRedactor } from "@/features/structure";
import {
    ItemBundle,
    ItemImageParams,
    ItemParams,
    ItemTypes,
    MediaType,
} from "@/types";
import { sliderWrapper, videoWrapper } from "../sub_items";
import { useItem } from "./useItem";

type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
const { id } = toRefs(props);
const params = shallowRef<ItemImageParams>(
    structuredClone(commonParamsToImage(props.itemParams))
);
const { wrp, styles, getMeAsBundle } = useItem(params, id);

const updateParams = (val: ItemImageParams) => {
    params.value = val;
    triggerRef(params);
};

defineExpose({ getMeAsBundle });
//service
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToImage(bundle: ItemParams): ItemImageParams {
    if (bundle.type === ItemTypes.image) {
        return bundle;
    } else throw "not image";
}
</script>

<style scoped></style>
