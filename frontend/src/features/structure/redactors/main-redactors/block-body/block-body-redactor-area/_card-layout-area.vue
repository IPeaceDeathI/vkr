<template>
    <switched-list-item
        title="Режим слайдера"
        v-model="sliderIsEnabled"
        @click="sliderRedactorIsOpen = true"
        prepend-icon="mdi-folder-multiple-image"
    >
        <div>Настроить</div>
    </switched-list-item>
    <common-slider-redactor
        :modelValue="sliderRedactorIsOpen"
        :params="sliderParams"
        @onChange="changeSliderParams"
        @update:modelValue="(value: boolean)=>{sliderRedactorIsOpen = value}"
    >
        <template #indicatorsSize>
            <v-btn-toggle v-model="arrowSize">
                <v-btn
                    icon="mdi mdi-circle"
                    :value="IndicatorsSize.small"
                    style="font-size: 8px !important"
                />
                <v-btn
                    icon="mdi mdi-circle"
                    :value="IndicatorsSize.middle"
                    style="font-size: 12px !important"
                />
                <v-btn
                    icon="mdi mdi-circle"
                    :value="IndicatorsSize.large"
                    style="font-size: 16px !important"
                />
            </v-btn-toggle>
        </template>
        <template #btnsPos>
            <v-btn-toggle v-model="arrowPosition">
                <v-btn :text="'Внутри'" :value="BtnPosition.inside" />
                <v-btn :text="'На границе'" :value="BtnPosition.onBorder" />
                <v-btn :text="'Снаружи'" :value="BtnPosition.outside" />
                <v-btn disabled :text="'Снизу'" :value="BtnPosition.bottom" />
            </v-btn-toggle>
        </template>
        <template #showSideSlides>
            <v-row>
                <v-col>
                    <v-switch
                        v-model="sideSlidesEnabled"
                        label="Отображать боковые слайды"
                    />
                </v-col>
            </v-row>
        </template>
        <template #enableOnDevices>
            <v-row>
                <v-col cols="6">
                    <redactor-component-title
                        hint="Выберите устройства, на которых будет включен режим 'слайдер'"
                        >Включить на устройствах</redactor-component-title
                    >
                    <viewport-visibility-redactor v-model="sliderVisibility" />
                </v-col>
            </v-row>
        </template>
    </common-slider-redactor>
    <v-row>
        <v-col>
            <div>
                <redactor-component-title>
                    Растянуть контент
                </redactor-component-title>
                <v-btn-toggle v-model="stretchContent">
                    <v-btn :value="StretchContent.onGrid">По сетке</v-btn>
                    <v-btn :value="StretchContent.onScreen"> По экрану </v-btn>
                </v-btn-toggle>
            </div>
        </v-col>
        <v-col v-if="stretchContent === StretchContent.onGrid">
            <div>
                <redactor-component-title
                    hint="На сайте используется 24-колоночная сетка, вы можете ограничить ширину контента меньшим количеством колонок."
                >
                    Ширина контента
                </redactor-component-title>
                <btn-slider
                    style="margin-inline-start: 0px"
                    min="14"
                    max="24"
                    show-ticks="always"
                    tick-size="4"
                    step="2"
                    v-model="contentWidth"
                    @on-change="changeContentWidth"
                >
                    <template v-slot:append>
                        <v-text-field
                            style="width: 50px"
                            readonly
                            v-model="contentWidth"
                        />
                    </template>
                </btn-slider>
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <redactor-component-title>
                Ориентация карточек
            </redactor-component-title>
            <v-btn-toggle v-model="cardsOrientation">
                <v-btn
                    prepend-icon="mdi-pan-vertical"
                    :value="CardsOrientation.vertical"
                >
                    Вертикальная
                </v-btn>
                <v-btn
                    prepend-icon="mdi-pan-horizontal"
                    :value="CardsOrientation.horizontal"
                >
                    Горизонтальная
                </v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>
    <v-row style="margin: 0 -5px">
        <v-col
            v-for="card in balancedCardsInRowSelectors"
            :key="card.value"
            cols="4"
        >
            <v-hover v-slot="{ isHovering, props }">
                <v-card
                    class="cards-in-row-pickers"
                    :class="{ selected: cardsInRow === card.value }"
                    :elevation="isHovering && cardsInRow !== card.value ? 8 : 1"
                    v-bind="props"
                    @click="cardsInRow = card.value"
                >
                    <v-img :src="card.imageSrc"></v-img>
                    <v-card-subtitle
                        style="opacity: 1"
                        class="d-flex justify-center text-subtitle-2 font-weight-regular"
                        >{{ card.value }}</v-card-subtitle
                    >
                </v-card>
            </v-hover>
        </v-col>
    </v-row>

    <v-row>
        <v-col>
            <redactor-component-title
                hint="Выравнивание карточек разной высоты"
            >
                Вертикальное выравнивание
            </redactor-component-title>
            <v-btn-toggle
                v-model="elementsAlign"
                :disabled="disableElementsAlign"
            >
                <v-btn
                    :value="ElementsAlign.start"
                    icon="mdi-align-vertical-top"
                />
                <v-btn
                    :value="ElementsAlign.center"
                    icon="mdi-align-vertical-center"
                />
                <v-btn
                    :value="ElementsAlign.end"
                    icon="mdi-align-vertical-bottom"
                />
                <v-btn :value="ElementsAlign.stretch" icon="mdi-view-week" />
            </v-btn-toggle>
        </v-col>
        <v-col>
            <elements-justify
                v-model="elementsJustify"
                :disabled="disableJustContent"
                hint="Горизонтальное выравнивание последних карточек применяется, когда количество карточек в секции не кратно выбранному количеству карточек в ряд"
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="6">
            <redactor-component-title>
                Отступ между карточками
            </redactor-component-title>
            <v-btn-toggle v-model="gapSize">
                <v-btn icon="mdi-cancel" :value="GapTypes.none" />
                <v-btn :value="GapTypes.middle">25px</v-btn>
                <v-btn :value="GapTypes.large">50px</v-btn>
            </v-btn-toggle>
        </v-col>
        <v-col v-if="cardsOrientation === CardsOrientation.horizontal" cols="6">
            <redactor-component-title>
                Пропорция карточек
            </redactor-component-title>
            <v-btn-toggle v-model="cardsProportion">
                <v-btn :value="CardsProportion.ll">
                    <v-icon icon="mdi-chevron-double-left" size="large" />
                    <v-tooltip>30% | 70%</v-tooltip>
                </v-btn>
                <v-btn :value="CardsProportion.l">
                    <v-icon icon="mdi-chevron-left" size="large" />
                    <v-tooltip>40% | 60%</v-tooltip>
                </v-btn>
                <v-btn :value="CardsProportion.m">
                    <v-icon icon="mdi-unfold-more-vertical" size="large" />
                    <v-tooltip>50% | 50%</v-tooltip>
                </v-btn>
                <v-btn :value="CardsProportion.r">
                    <v-icon icon="mdi-chevron-right" size="large" />
                    <v-tooltip>60% | 40%</v-tooltip>
                </v-btn>
                <v-btn :value="CardsProportion.rr">
                    <v-icon icon="mdi-chevron-double-right" size="large" />
                    <v-tooltip>70% | 30%</v-tooltip>
                </v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, toRefs, computed, shallowRef } from "vue";
import {
    CardsContentWidth,
    StretchContent,
    CardsOrientation,
    CardsInRow,
    ElementsAlign,
    ElementsJustify,
    GapTypes,
    CommonSliderParams,
    BodyLayoutCardParams,
    IndicatorsSize,
    SliderCardsParams,
    BtnPosition,
    ElementVisibility,
    CardsProportion,
} from "@/types";
import {
    btnSlider,
    commonSliderRedactor,
    viewportVisibilityRedactor,
} from "@/features/structure/redactors/reusable-components";
import { switchedListItem } from "@/features/structure/redactors/reusable-components";

//typing
type cardsInRowRedactors = {
    value: CardsInRow;
    imageSrc: string;
};

type Props = {
    params: BodyLayoutCardParams;
};

type Emits = {
    "update:bodyLayoutParams": [value: BodyLayoutCardParams];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { params } = toRefs(props);

//cardLayoutParams
const stretchContent = computed<StretchContent>({
    get() {
        return params.value.strechContent;
    },
    set(value: StretchContent) {
        if (value === StretchContent.onScreen) {
            contentWidth.value = 24;
        }
        emit("update:bodyLayoutParams", {
            ...params.value,
            strechContent: value,
        });
    },
});

const contentWidth = computed<CardsContentWidth>({
    get() {
        return params.value.contentWidth;
    },
    set(value: CardsContentWidth) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            contentWidth: value,
        });
    },
});

const changeContentWidth = function (value: number): void {
    contentWidth.value = value as CardsContentWidth;
};

const cardsOrientation = computed<CardsOrientation>({
    get() {
        return params.value.cardsOrientation;
    },
    set(value: CardsOrientation) {
        if (value === CardsOrientation.horizontal && cardsInRow.value > 3) {
            cardsInRow.value = 3;
        }
        emit("update:bodyLayoutParams", {
            ...params.value,
            cardsOrientation: value,
        });
    },
});

const balancedCardsInRowSelectors = computed<
    {
        value: CardsInRow;
        imageSrc: string;
    }[]
>(() => {
    if (cardsOrientation.value === CardsOrientation.horizontal) {
        return cardsInRowSelectorsHorizontal.value;
    } else {
        return cardsInRowSelectorsVertical.value;
    }
});

const cardsProportion = computed<CardsProportion>({
    get() {
        return params.value.cardProportion;
    },
    set(value: CardsProportion) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            cardProportion: value,
        });
    },
});

const cardsInRow = computed<CardsInRow>({
    get() {
        return params.value.cardsInRow;
    },
    set(value: CardsInRow) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            cardsInRow: value,
        });
    },
});

//OPTIMIZATION
const disableJustContent = computed<boolean>(() => {
    // const blocksCountInBlockBody = params.value.
    //     // $store.getters[
    //     //     "structure/blockBodies/getBlockBodyParamsById"
    //     // ](id).childrenIds.length ?? 0;
    // return blocksCountInBlockBody % cardsInRow === 0;
    return false;
});

const disableElementsAlign = computed<boolean>(() => {
    return cardsInRow.value < 2;
});

const elementsAlign = computed<ElementsAlign>({
    get() {
        return params.value.elementsAlign;
    },
    set(value: ElementsAlign) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            elementsAlign: value,
        });
    },
});

const elementsJustify = computed<ElementsJustify>({
    get() {
        return params.value.elementsJustify;
    },
    set(value: ElementsJustify) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            elementsJustify: value,
        });
    },
});

const gapSize = computed<GapTypes>({
    get() {
        return params.value.gap;
    },
    set(value: GapTypes) {
        emit("update:bodyLayoutParams", { ...params.value, gap: value });
    },
});

const sliderParams = computed<SliderCardsParams>(() => {
    return params.value.sliderParams;
});

const changeSliderParams = function (value: CommonSliderParams) {
    emit("update:bodyLayoutParams", {
        ...params.value,
        sliderParams: { ...params.value.sliderParams, ...value },
    });
};

//slider params
const sliderIsEnabled = computed<boolean>({
    get() {
        return sliderParams.value.enabled;
    },
    set(value: boolean) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            sliderParams: { ...sliderParams.value, enabled: value },
        });
    },
});

const arrowSize = computed<IndicatorsSize>({
    get() {
        return sliderParams.value.indicatorsSize;
    },
    set(value: IndicatorsSize) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            sliderParams: { ...sliderParams.value, indicatorsSize: value },
        });
    },
});

const arrowPosition = computed<BtnPosition>({
    get() {
        return sliderParams.value.btnPos;
    },
    set(value: BtnPosition) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            sliderParams: { ...sliderParams.value, btnPos: value },
        });
    },
});

const sideSlidesEnabled = computed<boolean>({
    get() {
        return sliderParams.value.sideSlides.enabled;
    },
    set(value: boolean) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            sliderParams: {
                ...sliderParams.value,
                sideSlides: {
                    ...sliderParams.value.sideSlides,
                    enabled: value,
                },
            },
        });
    },
});

const sliderVisibility = computed<ElementVisibility>({
    get() {
        return sliderParams.value.visibility;
    },
    set(value: ElementVisibility) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            sliderParams: { ...sliderParams.value, visibility: value },
        });
    },
});

//переменные для работы с template
const sliderRedactorIsOpen = shallowRef(false);
const cardsInRowSelectorsVertical = shallowRef<Array<cardsInRowRedactors>>([
    {
        value: 1,
        imageSrc: `${process.env.BASE_URL}images/cardsInRow1.png`,
    },
    {
        value: 2,
        imageSrc: `${process.env.BASE_URL}images/cardsInRow2.png`,
    },
    {
        value: 3,
        imageSrc: `${process.env.BASE_URL}images/cardsInRow3.png`,
    },
    {
        value: 4,
        imageSrc: `${process.env.BASE_URL}images/cardsInRow4.png`,
    },
    {
        value: 5,
        imageSrc: `${process.env.BASE_URL}images/cardsInRow5.png`,
    },
]);
const cardsInRowSelectorsHorizontal = shallowRef<Array<cardsInRowRedactors>>([
    {
        value: 1,
        imageSrc: `${process.env.BASE_URL}images/cardsInRowH1.png`,
    },
    {
        value: 2,
        imageSrc: `${process.env.BASE_URL}images/cardsInRowH2.png`,
    },
    {
        value: 3,
        imageSrc: `${process.env.BASE_URL}images/cardsInRowH3.png`,
    },
]);
</script>
<style lang="scss" scoped>
.cards-in-row-pickers {
    padding: 5px;
    cursor: pointer;
    &.selected::after {
        content: "";
        display: block;
        position: absolute;
        width: 18px;
        height: 18px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiM0NzczRkYiIGN4PSIxMCIgY3k9IjEwIiByPSIxMCIvPjxwYXRoIGQ9Ik03LjcwNyAxMC4yOTNMNyA5LjU4NiA1LjU4NiAxMWwuNzA3LjcwNyAxLjQxNC0xLjQxNHpNOSAxM2wtLjcwNy43MDcuNzA3LjcwNy43MDctLjcwN0w5IDEzem01LjcwNy00LjI5M0wxNS40MTQgOCAxNCA2LjU4NmwtLjcwNy43MDcgMS40MTQgMS40MTR6bS04LjQxNCAzbDIgMiAxLjQxNC0xLjQxNC0yLTItMS40MTQgMS40MTR6bTMuNDE0IDJsNS01LTEuNDE0LTEuNDE0LTUgNSAxLjQxNCAxLjQxNHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4K);
        background-repeat: no-repeat;
        pointer-events: none;
        right: 0;
        top: 0;
        margin-top: 5px;
        margin-right: 5px;
        transition: opacity 0.2s, transform 0.3s ease-out;
    }
}
</style>
