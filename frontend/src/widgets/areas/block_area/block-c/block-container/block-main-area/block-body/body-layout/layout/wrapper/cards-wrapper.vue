<template>
    <div
        class="cards-container"
        :class="colsClass"
        :data-gallery-slider-visibility="
            bodyLayoutParams.sliderParams.enabled
                ? bodyLayoutParams.sliderParams.visibility
                : undefined
        "
    >
        <draggable
            v-if="!bodyLayoutParams.sliderParams.enabled"
            class="cards-wrapper not-slider"
            :model-value="zones"
            :class="{
                'show-landing-strip': $store.getters['environment/cardIsDrag'],
            }"
            group="cards"
            itemKey="id"
            @start="$store.dispatch('environment/PUT_CARD_IS_DRAG', undefined)"
            @end="endDrag"
            :data-noks-cards="bodyLayoutParams.cardsInRow"
            v-bind="dragOption"
        >
            <template #item="{ element, index }">
                <card-c
                    :key="index"
                    :id="element.id"
                    :card-bundle="element.bundle"
                    :cols="childCols"
                    :orientation="bodyLayoutParams.cardsOrientation"
                    @applyStylesToAllZones="applyStylesToAllZones"
                    @on-clone="cloneCard(index)"
                    @on-delete="deleteCard(index)"
                >
                </card-c>
            </template>
        </draggable>

        <slider-wrapper
            v-else
            :params="bodyLayoutParams.sliderParams"
            :slider-effect="SliderEffect.shift"
            :side-slides="bodyLayoutParams.sliderParams.sideSlides.enabled"
            variant="card"
            ref="slider"
        >
            <draggable
                class="cards-wrapper splide__list"
                :model-value="zones"
                :class="{
                    'show-landing-strip':
                        $store.getters['environment/cardIsDrag'],
                }"
                group="cards"
                itemKey="id"
                @start="
                    $store.dispatch('environment/PUT_CARD_IS_DRAG', undefined)
                "
                @end="endDrag"
                :data-noks-cards="bodyLayoutParams.cardsInRow"
                v-bind="dragOption"
            >
                <template #item="{ element, index }">
                    <card-c
                        class="splide__slide"
                        :key="element.id"
                        :id="element.id"
                        :card-bundle="element.bundle"
                        :cols="childCols"
                        :orientation="bodyLayoutParams.cardsOrientation"
                        @applyStylesToAllZones="applyStylesToAllZones"
                        @on-clone="cloneCard(index)"
                        @on-delete="deleteCard(index)"
                    >
                    </card-c>
                </template>
            </draggable>
        </slider-wrapper>
    </div>
</template>

<script setup lang="ts">
import {
    BodyLayoutCardParams,
    CardParams,
    CardStylesParams,
    CardsOrientation,
    CardsProportion,
    CommonZoneParams,
    SliderEffect,
    ZoneBundle,
    ZoneStylesParams,
} from "@/types";
import cardC from "@/widgets/zones/card-c/card-c.vue";
import draggable from "vuedraggable";
import { sliderWrapper } from "@/widgets/items/sub_items";
import { ref, defineProps, toRefs, computed, triggerRef, onMounted } from "vue";
import useWrapper from "./useWrapper";
import { watch } from "vue";
import { useStore } from "vuex";

type CardsOrientationToCols = { [key in CardsProportion]: Array<number> };
const cardsOrientationToCols: CardsOrientationToCols = {
    [CardsProportion.ll]: [7, 17],
    [CardsProportion.l]: [9, 15],
    [CardsProportion.m]: [12, 12],
    [CardsProportion.r]: [15, 9],
    [CardsProportion.rr]: [17, 7],
};
type Props = {
    bodyLayoutParams: BodyLayoutCardParams;
    zones: { id: string; bundle: ZoneBundle }[];
};

const props = defineProps<Props>();
const emit = defineEmits<{
    deleteZone: [value: number];
    cloneZone: [{ bundle: ZoneBundle; index: number }];
    "update:zones": [value: { id: string; bundle: ZoneBundle }[]];
    "update:bodyLayoutParams": [value: BodyLayoutCardParams];
}>();
const { zones: propsZones, bodyLayoutParams } = toRefs(props);
const updateZones = (value: { id: string; bundle: ZoneBundle }[]) => {
    emit("update:zones", value);
};
const {
    zones,
    dragOption,
    getZoneBundles,
    getZoneBundleByIndex,
    getCardById,
    endDrag,
} = useWrapper(propsZones, updateZones);
const colsClass = computed<any>(() => {
    return {
        [`col-${bodyLayoutParams.value.contentWidth}`]: true,
        "has-slider": bodyLayoutParams.value.sliderParams.enabled,
    };
});
const childCols = computed<Array<number | undefined>>(() => {
    if (bodyLayoutParams.value.cardsOrientation === CardsOrientation.vertical) {
        return [undefined, undefined];
    } else {
        return cardsOrientationToCols[bodyLayoutParams.value.cardProportion];
    }
});

const cloneCard = function (index: number) {
    const bundle = getZoneBundleByIndex(index);
    emit("cloneZone", { bundle: bundle, index: index + 1 });
};

const deleteCard = function (index: number) {
    emit("deleteZone", index);
};

// applyStylesToAllZones
const applyStylesToAllZones = function (value: ZoneStylesParams) {
    zones.value.forEach((zone) => {
        zone.bundle.zoneParams.styles = value;
    });
};

defineExpose({
    getZoneBundles,
});

watch(
    () => {
        return bodyLayoutParams.value.sliderParams.enabled;
    },
    () => {
        const tmp: { id: string; bundle: ZoneBundle }[] = zones.value.map(
            ({ id }, index) => {
                return { id, bundle: getZoneBundleByIndex(index) };
            }
        );
        zones.value = tmp;
    },
    { flush: "sync" }
);
watch(
    () => {
        return bodyLayoutParams.value.cardsOrientation;
    },
    (newOrientation) => {
        if (
            newOrientation === CardsOrientation.horizontal &&
            bodyLayoutParams.value.cardsInRow >= 4
        ) {
            emit("update:bodyLayoutParams", {
                ...bodyLayoutParams.value,
                cardsInRow: 3,
            });
        }
        zones.value.forEach(({ id }) => {
            getCardById(id).setOrintation(newOrientation);
        });
    }
);

//slider
const slider = ref<typeof sliderWrapper>();
watch(
    () => props.bodyLayoutParams,
    () => {
        if (slider.value) slider.value.renderSlider();
    },
    { flush: "post", deep: true }
);
watch(
    () => zones.value.length,
    () => {
        if (slider.value) slider.value.renderSlider();
    },
    { flush: "post" }
);
</script>
<style scoped></style>
