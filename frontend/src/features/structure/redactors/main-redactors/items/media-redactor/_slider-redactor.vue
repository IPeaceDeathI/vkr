<template>
    <draggable
        class="v-row ma-0"
        v-model="imgArray"
        group="slider-media"
        v-bind="dragOptions"
        item-key="imageParams"
        :swapThreshold="1"
    >
        <template #item="{ element, index }">
            <v-col cols="4">
                <v-img
                    class="imageInSlider"
                    :src="element.imageParams.src"
                    :width="200"
                    :aspect-ratio="1 / 1"
                    cover
                    ><v-btn
                        class="deleteImageFromSlider"
                        color="secondary-darken-2"
                        v-if="imageIsNotSingle"
                        position="absolute"
                        :style="{ right: '5px', top: '5px' }"
                        icon="mdi-delete"
                        size="x-small"
                        @click="deleteImage(index)"
                    ></v-btn
                ></v-img>
            </v-col>
        </template>
    </draggable>
    <!-- <v-divider class="border-opacity-25 mt-4"></v-divider> -->
    <v-row
        ><v-col cols="4"
            ><upload-image-btn
                @start="imageIsLoading = true"
                @end="imageIsLoading = false"
                @input="imageInsert"
                >Загрузить</upload-image-btn
            >
        </v-col>
        <v-col cols="1" class="pl-0">
            <v-btn
                @click="showGallery = true"
                block
                color="primary-darken-1"
                :loading="imageIsLoading"
                ><v-icon size="20">mdi-image-search-outline</v-icon></v-btn
            >
            <noks-modal
                @imageSelected="loadImgsFromGallery"
                v-model="showGallery"
            ></noks-modal
        ></v-col>
        <v-spacer />
        <v-col cols="4" class="d-flex justify-end"
            ><v-btn
                variant="outlined"
                block
                flat
                prependIcon="mdi-cog"
                @click="showInnerRedactor = true"
                >Настроить слайдер
            </v-btn>
        </v-col>
        <common-slider-redactor
            :modelValue="showInnerRedactor"
            :params="params"
            @onChange="paramsHasChangedFromInnerSlider"
            @update:modelValue="(value: boolean)=>{showInnerRedactor = value}"
        >
            <template #indicatorsSize>
                <v-btn-toggle v-model="size">
                    <v-btn
                        icon="mdi mdi-circle"
                        :value="IndicatorsSize.small"
                        style="font-size: 8px !important"
                    />
                    <v-btn
                        icon="mdi mdi-circle"
                        :value="IndicatorsSize.large"
                        style="font-size: 16px !important"
                    />
                </v-btn-toggle>
            </template>
            <template #sliderEffect>
                <v-row>
                    <v-col cols="7">
                        <redactor-component-title
                            >Слайдер эффект</redactor-component-title
                        >
                        <v-btn-toggle v-model="sliderEffect">
                            <v-btn
                                :text="'Сдвиг'"
                                :value="SliderEffect.shift"
                            />
                            <v-btn
                                :text="'Растворение'"
                                :value="SliderEffect.dissolution"
                            />
                        </v-btn-toggle>
                    </v-col>
                </v-row>
            </template>
            <template #btnsPos>
                <v-btn-toggle v-model="btnsPosition">
                    <v-btn :text="'Внутри'" :value="BtnPosition.inside" />
                    <v-btn :text="'На границе'" :value="BtnPosition.onBorder" />
                </v-btn-toggle>
            </template>
            <template #indicatorsType>
                <!-- TODO реализовать галерею -->
                <v-btn
                    disabled
                    icon="mdi-view-gallery"
                    style="font-size: 16px !important"
                    :value="IndicatorsType.lines"
                />
            </template>
            <template #showSideSlides></template>
            <template #scale>
                <v-row
                    ><v-col>
                        <switchWithHint
                            label="Масштабировать&nbsp;"
                            hint-text="Изображение будет масштабировано, чтобы полностью заполнить пространство элемента. Часть изображения может быть скрыта."
                            v-model="toggleSize"
                            :icon-type="InformationIconType.question"
                        /> </v-col
                ></v-row>
            </template>
            <template #borderRadius></template>
            <template #actionOnClick>
                <v-row
                    ><v-col>
                        <redactor-component-title>
                            Действие при клике</redactor-component-title
                        >
                        <v-select
                            disabled
                            z-index="10000011"
                            hide-details
                            clearable
                            density="compact"
                            :items="[
                                'Перейти по ссылке',
                                'Скролл к секции',
                                'Отправить e-mail',
                                'Позвонить',
                                'Скачать файл',
                                'Увеличить картинку',
                                'Выполнить код',
                            ]"
                            variant="outlined"
                        /> </v-col
                ></v-row>
            </template>
        </common-slider-redactor>
    </v-row>
</template>
<script lang="ts" setup>
import {
    computed,
    shallowRef,
    defineEmits,
    defineProps,
    toRef,
    toRefs,
} from "vue";
import {
    switchWithHint,
    commonSliderRedactor,
    uploadImageBtn,
} from "../../../reusable-components";
import {
    BorderRadius,
    BtnPosition,
    CommonSliderParams,
    ImageSize,
    ImageStylesParams,
    IndicatorsSize,
    IndicatorsType,
    MediaSliderParams,
    SliderEffect,
} from "@/types";
import { getDefaultImageStylesParams } from "@/shared/services/elements_fabrics/items_fabric/items";
import {
    informationIcon,
    InformationIconType,
} from "@/shared/libs/information-icon";
import { useMediaCommonStyles } from "./useMediaCommonStyles";
import noksModal from "@/shared/libs/noks-modal";
import draggable from "vuedraggable";

//typing
// тут указываем типы пропсов, эмиттов, слотов и обЪявляем "глобальные" переменные для доступа к ним в шаблоне и скриптам
type Props = {
    params: MediaSliderParams;
    commonStyles: {
        minHeight: number;
        backgroundSize: ImageSize;
        borderRadius: {
            enabled: boolean;
            value: BorderRadius;
        };
    };
};

type Emits = {
    onChange: [value: MediaSliderParams];
    onChangeCommonStyles: [
        value: {
            minHeight: number;
            backgroundSize: ImageSize;
            borderRadius: {
                enabled: boolean;
                value: BorderRadius;
            };
        }
    ];
};

const props = defineProps<Props>(); // "глобальная" переменная для пропсов потом в блоках ее деструктуризуем
const emit = defineEmits<Emits>(); // "глобальная" переменная для эмитов

//media slider params
//Блок работающий с media slider параметрами
const { params, commonStyles } = toRefs(props); // Деструктурируем глобальный объект пропсов через shallowRef в нужные нам свойства

const imgArray = computed<Array<ImageStylesParams>>({
    get() {
        return params.value.images;
    },
    set(value: Array<ImageStylesParams>) {
        emit("onChange", { ...params.value, images: value });
    },
});

const size = computed<IndicatorsSize>({
    get() {
        return params.value.indicatorsSize;
    },
    set(value: IndicatorsSize) {
        emit("onChange", { ...params.value, indicatorsSize: value });
    },
});

const sliderEffect = computed<SliderEffect>({
    get() {
        return params.value.effect;
    },
    set(value: SliderEffect) {
        emit("onChange", { ...params.value, effect: value });
    },
});

const btnsPosition = computed<BtnPosition>({
    get() {
        return params.value.btnPos;
    },
    set(value: BtnPosition) {
        emit("onChange", { ...params.value, btnPos: value });
    },
});

const { toggleSize } = useMediaCommonStyles(
    toRef(() => commonStyles.value),
    (value) => {
        emit("onChangeCommonStyles", value);
    }
);

const paramsHasChangedFromInnerSlider = (value: CommonSliderParams) => {
    emit("onChange", Object.assign({}, params.value, value));
};

//imageGallery
//Блок работающий с массивом изображений
const imageIsLoading = shallowRef(false);
const showGallery = shallowRef(false);
const showInnerRedactor = shallowRef(false);

const imageIsNotSingle = computed<boolean>(() => {
    return imgArray.value.length > 1 ? true : false;
});

const loadImgsFromGallery = (url: string) => {
    imageIsLoading.value = true;
    addImageToArray(getDefaultImageStylesParams(url));
    imageIsLoading.value = false;
};

const imageInsert = (url: string) => {
    imageIsLoading.value = true;
    addImageToArray(getDefaultImageStylesParams(url));
    imageIsLoading.value = false;
};

const addImageToArray = async function (res: ImageStylesParams) {
    if (params.value) {
        const tmpImages = [...params.value.images];
        console.log(tmpImages, res);
        tmpImages.push(res);
        emit("onChange", {
            ...params.value,
            images: tmpImages,
        });
    }
};

const deleteImage = (index: number) => {
    const tempArr = [...imgArray.value];
    tempArr.splice(index, 1);
    imgArray.value = tempArr;
};

//VueDraggable
//Опции для draggable
const dragOptions = computed(() => {
    return {
        animation: 400,
        disabled: false,
        ghostClass: "noks-draggable-img-ghost",
        dragClass: "noks-draggable-img-drag",
        chosenClass: "noks-draggable-img-chosen",
        forceFallback: true,
        fallbackClass: "noks-draggable-img-fallback",
        fallbackTolerance: 10,
        scrollSensitivity: 200,
        fallbackOnBody: true,
    };
});
</script>
<style lang="scss"></style>
