<template>
    <draggable-card
        v-if="$store.getters['environment/isEditable']"
        v-model="show"
        width="680px"
        handle="v-toolbar"
    >
        <redactor-toolbar @close-click="show = false" :title="'МЕДИА'" />
        <v-redactor-container style="overflow-x: unset">
            <v-row>
                <v-col>
                    <v-btn-toggle v-model="selectedMedia">
                        <v-btn :value="mediaTypes.image">Изображение</v-btn>
                        <v-btn :value="mediaTypes.slider">Слайдер</v-btn>
                        <v-btn :value="mediaTypes.video">Видео</v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
            <!-- image -->
            <template v-if="selectedMedia === mediaTypes.image">
                <imageRedactor
                    :params="params.imageParams"
                    @onChange="paramsHasChangedFromImage"
                >
                    <template #switches>
                        <div class="pb-1">
                            <switchWithHint
                                label="Масштабировать&nbsp;"
                                hint-text="Изображение будет масштабировано, чтобы полностью заполнить пространство элемента. Часть изображения может быть скрыта."
                                v-model="toggleSize"
                                :icon-type="InformationIconType.question"
                            />
                        </div>
                        <border-radius-redactor
                            v-model:is-border-radius="toggleBorderRadius"
                            v-model:border-radius="borderRadius"
                        />
                    </template>
                    <template #append>
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
                        ></v-select>
                    </template>
                </imageRedactor>
            </template>

            <!-- slider -->
            <template v-if="selectedMedia === mediaTypes.slider">
                <slider-redactor
                    @onChange="paramsHasChangedFromSlider"
                    @onChangeCommonStyles="commonStylesHasChangedFromSlider"
                    :params="params.sliderParams"
                    :common-styles="params.commonStyles"
                />
            </template>

            <!-- video -->
            <template v-if="selectedMedia === mediaTypes.video">
                <video-redactor
                    :params="params.videoParams"
                    :common-styles="params.commonStyles"
                    @onChange="paramsHasChangedFromVideo"
                    @onChangeCommonStyles="commonStylesHasChangedFromSlider"
                />
            </template>
        </v-redactor-container>
    </draggable-card>
</template>

<script lang="ts" setup>
import {
    shallowRef,
    computed,
    defineEmits,
    defineProps,
    toRef,
    toRefs,
} from "vue";
import {
    borderRadiusRedactor,
    draggableCard,
    redactorToolbar,
    switchWithHint,
} from "../../../reusable-components";
import {
    BorderRadius,
    ImageSize,
    ItemImageParams,
    MediaImageParams,
    MediaSliderParams,
    MediaType,
    MediaVideoParams,
} from "@/types";
import imageRedactor from "./_image-redactor.vue";
import sliderRedactor from "./_slider-redactor.vue";
import videoRedactor from "./_video-redactor.vue";
import { InformationIconType } from "@/shared/libs/information-icon";
import { useMediaCommonStyles } from "./useMediaCommonStyles";

//typing *(можешь добавлять такие пояснялки к своим блокам)*
// тут указываем типы пропсов, эмиттов, слотов и обЪявляем "глобальные" переменные для доступа к ним в шаблоне и скриптам
type Props = {
    modelValue: boolean; //Обязательно дублируем тут тип модели, чтобы было удобно читать компонент
    params: ItemImageParams;
};

type Emits = {
    "update:modelValue": [value: boolean]; //Обязательно объявляем тут тип эмита, чтобы было удобно читать компонент и тип отображался в родительском компоненте
    "update:params": [value: boolean];
    onChange: [value: ItemImageParams];
};

const props = defineProps<Props>(); // "глобальная" переменная для просов потом в блоках ее деструктуризуем
const emit = defineEmits<Emits>(); // "глобальная" переменная для эмитов
const mediaTypes = shallowRef(MediaType); // "глобальная" переменная enum для шаблонов

//media params *(можешь добавлять такие пояснялки к своим блокам)*
//Блок работающий с media параметрами
const { params } = toRefs(props); // Деструктурируем глобальный объект пропсов через toRefs в нужные нам свойства

const selectedMedia = computed<MediaType>({
    get() {
        return params.value.mediaType;
    },
    set(value: MediaType) {
        emit("onChange", { ...params.value, mediaType: value });
    },
});

const { toggleSize, borderRadius, toggleBorderRadius } = useMediaCommonStyles(
    toRef(() => params.value.commonStyles),
    (value) => {
        emit("onChange", { ...params.value, commonStyles: value });
    }
);

const paramsHasChangedFromImage = (value: MediaImageParams) => {
    emit("onChange", { ...params.value, imageParams: value });
};

const paramsHasChangedFromSlider = (value: MediaSliderParams) => {
    emit("onChange", { ...params.value, sliderParams: value });
};

const paramsHasChangedFromVideo = (value: MediaVideoParams) => {
    emit("onChange", { ...params.value, videoParams: value });
};

const commonStylesHasChangedFromSlider = (value: {
    minHeight: number;
    backgroundSize: ImageSize;
    borderRadius: {
        enabled: boolean;
        value: BorderRadius;
    };
}) => {
    emit("onChange", { ...params.value, commonStyles: value });
};

//modelValue *(можешь добавлять такие пояснялки к своим блокам)*
// этот блок работает с управлением состостоянием редактора - открыт/закрыт, так как он используется везде, то он нам не очень интересен и мы его кидаем в самый низ
// const modelValue = defineModel<boolean>({ required: true });
const closeRedactor = () => {
    show.value = false;
};

const show = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>
<style lang="scss"></style>
