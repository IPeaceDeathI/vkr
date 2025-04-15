<template>
    <draggable-inner-card width="500px" v-model="showRedactor"
        ><redactor-toolbar
            @close-click="showRedactor = false"
            title="Настроить слайдер"
        />
        <v-redactor-container>
            <v-row>
                <v-col cols="6" class="pt-0">
                    <redactor-component-title
                        >Размер индикаторов</redactor-component-title
                    >
                    <slot name="indicatorsSize" />
                </v-col>
                <v-col cols="6" class="pt-0">
                    <redactor-component-title
                        >Цвет индикаторов</redactor-component-title
                    >
                    <color-editor :auto-color="true" v-model="color" />
                </v-col>
            </v-row>
            <slot name="sliderEffect" />
            <v-row
                ><v-col class="px-0"><v-divider /></v-col
            ></v-row>
            <v-row
                ><v-col
                    ><redactor-component-title
                        >Вид стрелочек</redactor-component-title
                    >
                    <v-btn-group
                        class="d-flex justify-space-evenly"
                        v-model="arrowType"
                        density="comfortable"
                    >
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.none"
                            icon="mdi-cancel mdi-rotate-90"
                            color="#eaebeb"
                        />
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.smallArrowBlackBg"
                            color="#000000"
                            icon="mdi-chevron-left"
                        />
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.fullArrowBlackBg"
                            color="#000000"
                            icon="mdi-arrow-left"
                        />
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.smallArrowGrayBg"
                            color="#6a6a6a"
                            icon="mdi-chevron-left"
                        />
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.fullArrowGrayBg"
                            color="#6a6a6a"
                            icon="mdi-arrow-left"
                        />
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.smallArrowOutlined"
                            icon="mdi-chevron-left"
                            style="border: 2px solid #000000"
                        />
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.fullArrowOutlined"
                            icon="mdi-arrow-left"
                            style="border: 2px solid #000000"
                        />
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.smallArrow"
                            variant="text"
                            icon="mdi-chevron-left"
                        />
                        <v-btn
                            rounded="circle"
                            width="40px"
                            @click="arrowType = ArrowType.fullArrow"
                            variant="text"
                            icon="mdi-arrow-left"
                        /> </v-btn-group></v-col
            ></v-row>
            <v-row>
                <v-col>
                    <redactor-component-title
                        >Расположение кнопок</redactor-component-title
                    >
                    <slot name="btnsPos" />
                </v-col>
            </v-row>
            <v-row
                ><v-col>
                    <v-switch
                        label="Показывать при наведении"
                        v-model="showOnHover"
                    ></v-switch></v-col
            ></v-row>
            <v-row
                ><v-col class="px-0"><v-divider /></v-col
            ></v-row>
            <v-row>
                <v-col cols="6">
                    <redactor-component-title
                        >Вид индикаторов</redactor-component-title
                    >
                    <v-btn-toggle v-model="type">
                        <v-btn
                            icon="mdi-cancel mdi-rotate-90"
                            :value="IndicatorsType.none"
                            style="font-weight: 700; font-size: 16px !important"
                        />
                        <v-btn
                            icon="mdi-numeric"
                            style="font-size: 16px !important"
                            :value="IndicatorsType.numbers"
                        />
                        <!-- sort-numeric-variant -->
                        <v-btn
                            icon="mdi-dots-horizontal"
                            style="font-size: 16px !important"
                            :value="IndicatorsType.dots"
                        />
                        <slot name="indicatorsType" />
                        <!-- icon="mdi-view-gallery" -->
                    </v-btn-toggle> </v-col
                ><v-col
                    cols="6"
                    v-if="
                        type !== IndicatorsType.none &&
                        type !== IndicatorsType.lines
                    "
                >
                    <redactor-component-title
                        >Расположение</redactor-component-title
                    >
                    <v-btn-toggle v-model="pos">
                        <v-btn
                            :text="'Внутри'"
                            :value="IndicatorsPosition.inside"
                        />
                        <v-btn
                            :text="'Снаружи'"
                            :value="IndicatorsPosition.outside"
                        />
                    </v-btn-toggle> </v-col
            ></v-row>
            <v-row
                ><v-col class="px-0"><v-divider /></v-col
            ></v-row>
            <slot name="enableOnDevices" />
            <v-row
                ><v-col cols="7">
                    <switchWithHint
                        label="Зациклить слайды по кругу"
                        hint-text="Слайды будут повторятся при прокручивании. Доступно в режиме предпросмотра"
                        v-model="cycleSlides"
                        :icon-type="InformationIconType.question"
                    /> </v-col
            ></v-row>
            <slot name="showSideSlides" />
            <v-row
                ><v-col cols="6" class="pr-0">
                    <div class="pb-1">
                        <switchWithHint
                            label="Автопрокрутка слайдов&nbsp;"
                            hint-text="Слайдер будет прокручиваться с заданной скоростью."
                            v-model="autoPlaySlider"
                            :icon-type="InformationIconType.question"
                        />
                    </div> </v-col
                ><v-col v-if="autoPlaySlider" cols="6" class="pl-0 d-flex">
                    <btn-slider
                        v-model="autoPlayTime"
                        :max="60"
                        :min="1"
                        :step="1"
                    />
                    <v-text-field
                        v-model="autoPlayTime"
                        suffix="с"
                        style="max-width: 60px"
                    />
                </v-col>
            </v-row>
            <v-row
                ><v-col class="px-0"><v-divider /></v-col
            ></v-row>
            <slot name="scale" />
            <slot name="borderRadius" />
            <slot name="actionOnClick" />
        </v-redactor-container>
    </draggable-inner-card>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, computed, toRefs, defineSlots } from "vue";
import {
    btnSlider,
    draggableInnerCard,
    redactorToolbar,
    switchWithHint,
} from ".";
import {
    ArrowType,
    Color,
    CommonSliderParams,
    IndicatorsPosition,
    IndicatorsType,
} from "@/types";
import { colorEditor } from "@/shared/vuetify";
import { InformationIconType } from "@/shared/libs/information-icon/types";

//typing
// тут указываем типы пропсов, эмиттов, слотов и обЪявляем "глобальные" переменные для доступа к ним в шаблоне и скриптам
type Props = {
    modelValue: boolean;
    params: CommonSliderParams;
};

type Emits = {
    "update:modelValue": [value: boolean]; //Обязательно объявляем тут тип эмита, чтобы было удобно читать компонент и тип отображался в родительском компоненте
    onChange: [value: CommonSliderParams];
};

type Slots = {
    indicatorsSize: undefined;
    sliderEffect: undefined;
    btnsPos: undefined;
    indicatorsType: undefined;
    enableOnDevices: undefined;
    showSideSlides: undefined;
    scale: undefined;
    borderRadius: undefined;
    actionOnClick: undefined;
};

const slots = defineSlots<Slots>(); // "глобальная" переменная для слотов
const props = defineProps<Props>(); // "глобальная" переменная для пропсов потом в блоках ее деструктуризуем
const emit = defineEmits<Emits>(); // "глобальная" переменная для эмитов

//common slider params
//Блок работающий с common slider параметрами
const { params } = toRefs(props); // Деструктурируем глобальный объект пропсов через shallowRef в нужные нам свойства

const type = computed<IndicatorsType>({
    get() {
        return params.value.indicatorsType;
    },
    set(value: IndicatorsType) {
        emit("onChange", { ...params.value, indicatorsType: value });
    },
});

const pos = computed<IndicatorsPosition>({
    get() {
        return params.value.indicatorsPosition;
    },
    set(value: IndicatorsPosition) {
        emit("onChange", { ...params.value, indicatorsPosition: value });
    },
});

const color = computed<Color>({
    get() {
        return params.value.color;
    },
    set(value: Color) {
        emit("onChange", { ...params.value, color: value });
    },
});

const arrowType = computed<ArrowType>({
    get() {
        return params.value.arrow;
    },
    set(value: ArrowType) {
        emit("onChange", { ...params.value, arrow: value });
    },
});

const showOnHover = computed<boolean>({
    get() {
        return params.value.showOnHover;
    },
    set(value: boolean) {
        emit("onChange", { ...params.value, showOnHover: value });
    },
});

const cycleSlides = computed<boolean>({
    get() {
        return params.value.cycleSlides;
    },
    set(value: boolean) {
        emit("onChange", { ...params.value, cycleSlides: value });
    },
});

const autoPlaySlider = computed<boolean>({
    get() {
        return params.value.autoPlaySlider.enabled;
    },
    set(value: boolean) {
        emit("onChange", {
            ...params.value,
            autoPlaySlider: { ...params.value.autoPlaySlider, enabled: value },
        });
    },
});

const autoPlayTime = computed<number>({
    get() {
        return autoPlaySlider.value
            ? Number(params.value.autoPlaySlider.value)
            : 1;
    },
    set(num: number) {
        emit("onChange", {
            ...params.value,
            autoPlaySlider: { ...params.value.autoPlaySlider, value: num },
        });
    },
});

//modelValue *(можешь добавлять такие пояснялки к своим блокам)*
// этот блок работает с управлением состостоянием редактора - открыт/закрыт, так как он используется везде, то он нам не очень интересен и мы его кидаем в самый низ
const showRedactor = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});
</script>
<style lang="scss"></style>
