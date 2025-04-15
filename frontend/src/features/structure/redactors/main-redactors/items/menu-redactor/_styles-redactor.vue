<template>
    <template v-if="$store.getters['environment/isDesktopViewport']">
        <v-row>
            <v-col>
                <redactor-component-title>
                    Ориентация меню
                </redactor-component-title>
                <v-btn-toggle v-model="menuOrientation">
                    <v-btn text="Горизонтально" value="horizontal" />
                    <v-btn text="Вертикально" value="vertical" />
                </v-btn-toggle>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <btn-text-redactor
                    v-model:font-size="fontSize"
                    v-model:font-weight="fontWeight"
                    v-model:font-style="fontStyle"
                    v-model:letter-spacing="letterSpacing"
                    v-model:line-height="lineHeight"
                    v-model:text-color="textColor"
                    v-model:text-decoration="textDecoration"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <redactor-component-title
                    >Отступ между пунктами
                </redactor-component-title>
                <v-btn-toggle v-model="gapSize">
                    <v-btn text="12px" :value="12" />
                    <v-btn text="24px" :value="24" />
                    <v-btn text="48px" :value="48" />
                    <v-btn icon="mdi-cog" :value="'settings'" />
                </v-btn-toggle>
            </v-col>
            <v-col class="d-flex align-end">
                <v-slide-x-transition>
                    <div v-show="gapSize === 'settings'" class="w-100">
                        <btn-slider
                            v-model="gap"
                            @on-change="changeGap"
                            step="1"
                            max="100"
                            min="6"
                        >
                            <template v-slot:append>
                                <v-text-field
                                    v-model="gap"
                                    density="compact"
                                    type="number"
                                    suffix="px"
                                    style="width: 85px"
                                />
                            </template>
                        </btn-slider>
                    </div>
                </v-slide-x-transition>
            </v-col>
        </v-row>
    </template>
</template>

<script setup lang="ts">
import { btnTextRedactor, btnSlider } from "../../../reusable-components";
import { Color, MenuStyle, TextDecoration } from "@/types";
import {
    onBeforeMount,
    watch,
    defineProps,
    defineEmits,
    toRefs,
    shallowRef,
    computed,
} from "vue";

//typing
type GapSize = 12 | 24 | 48 | "settings";

type Props = {
    modelValue: MenuStyle;
};

type Emits = {
    "update:modelValue": [value: MenuStyle];
    "change:modelValue": [value: MenuStyle];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//modelValue params
const { modelValue } = toRefs(props);

//Gap size
const gapSize = shallowRef<GapSize>("settings");

const changeGap = function (value: number) {
    emit("change:modelValue", {
        ...modelValue.value,
        gap: value,
    });
};

watch(gapSize, (value: GapSize) => {
    if (value !== "settings") {
        changeGap(value);
    }
});

//onBeforeMount
onBeforeMount(() => {
    if (modelValue.value.gap === 12) gapSize.value = 12;
    else if (modelValue.value.gap === 24) gapSize.value = 24;
    else if (modelValue.value.gap === 48) gapSize.value = 48;
});

//using params
const menuOrientation = computed<"horizontal" | "vertical">({
    get() {
        return modelValue.value.menuOrientation;
    },
    set(value: "horizontal" | "vertical") {
        emit("change:modelValue", {
            ...modelValue.value,
            menuOrientation: value,
        });
    },
});

const textColor = computed<Color>({
    get() {
        return modelValue.value.text.color;
    },
    set(value: Color): void {
        emit("change:modelValue", {
            ...modelValue.value,
            text: { ...modelValue.value.text, color: value },
        });
    },
});

const fontSize = computed<number>({
    get() {
        return modelValue.value.text.fontSize;
    },
    set(value: number): void {
        emit("change:modelValue", {
            ...modelValue.value,
            text: { ...modelValue.value.text, fontSize: value },
        });
    },
});

const fontWeight = computed<number>({
    get() {
        return modelValue.value.text.fontWeight;
    },
    set(value: number): void {
        emit("change:modelValue", {
            ...modelValue.value,
            text: { ...modelValue.value.text, fontWeight: value },
        });
    },
});

const lineHeight = computed<number>({
    get() {
        return modelValue.value.text.lineHeight;
    },
    set(value: number): void {
        emit("change:modelValue", {
            ...modelValue.value,
            text: { ...modelValue.value.text, lineHeight: value },
        });
    },
});

const letterSpacing = computed<number>({
    get() {
        return modelValue.value.text.letterSpacing;
    },
    set(value: number): void {
        emit("change:modelValue", {
            ...modelValue.value,
            text: { ...modelValue.value.text, letterSpacing: value },
        });
    },
});

const fontStyle = computed<string>({
    get() {
        return modelValue.value.text.fontStyle;
    },
    set(value: string): void {
        emit("change:modelValue", {
            ...modelValue.value,
            text: { ...modelValue.value.text, fontStyle: value },
        });
    },
});

const textDecoration = computed<TextDecoration>({
    get() {
        return modelValue.value.text.textDecoration;
    },
    set(value: TextDecoration): void {
        emit("change:modelValue", {
            ...modelValue.value,
            text: { ...modelValue.value.text, textDecoration: value },
        });
    },
});

const gap = computed<number>({
    get() {
        return modelValue.value.gap;
    },
    set(value: number) {
        emit("update:modelValue", {
            ...modelValue.value,
            gap: value,
        });
    },
});
</script>
<style scoped lang="scss"></style>
