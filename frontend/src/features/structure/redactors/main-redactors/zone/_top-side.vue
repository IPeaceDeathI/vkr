<template>
    <v-row>
        <v-col>
            <v-btn-toggle v-model="backgroundType">
                <v-btn :value="ZoneBgTypes.none">Без фона</v-btn>
                <v-btn :value="ZoneBgTypes.color">Цвет</v-btn>
                <v-btn :value="ZoneBgTypes.image">Изображение</v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>
    <template v-if="backgroundType === ZoneBgTypes.color">
        <v-row>
            <v-col>
                <redactor-component-title> Цвет фона </redactor-component-title>
                <color-editor
                    :auto-color="false"
                    v-model="backgroundColor"
                    @contrastColor="emit('contrastColor', $event)"
                />
            </v-col>
            <v-col>
                <redactor-component-title>
                    Цвет текста
                </redactor-component-title>
                <colorEditor
                    :auto-color="true"
                    v-model="textColor"
                    @contrastColor="emit('contrastColor', $event)"
                />
            </v-col>
        </v-row>
    </template>
    <template v-if="backgroundType === ZoneBgTypes.image">
        <v-row>
            <v-col>
                <v-img cover class="demo-window" :src="bgImageSrc" rounded="0">
                    <template v-if="bgImageSrc !== ''" v-slot:placeholder>
                        <div
                            class="d-flex align-center justify-center fill-height"
                        >
                            <v-progress-circular
                                color="grey-lighten-4"
                                indeterminate
                            />
                        </div>
                    </template>
                    <div
                        v-if="bgImageSrc === ''"
                        class="d-flex fill-height"
                        style="background-color: #fafafa"
                    ></div>
                </v-img>
            </v-col>
            <v-col>
                <upload-image-btn
                    @start="imageIsLoading = true"
                    @end="imageIsLoading = false"
                    @input="setBgImage"
                />
                <v-btn
                    :loading="imageIsLoading"
                    block
                    class="mt-2"
                    prepend-icon="mdi-image-search-outline"
                    @click="showImageGallery = true"
                >
                    Галерея
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <redactor-component-title>
                    Цвет текста
                </redactor-component-title>
                <colorEditor :auto-color="true" v-model="textColor" />
            </v-col>
        </v-row>
        <v-row v-if="zoneStyles.background.image.src !== ''">
            <v-col cols="6">
                <v-switch label="Затемнение" v-model="blackout" />
                <color-editor
                    v-if="blackout"
                    class="pt-1"
                    v-model="blackoutColor"
                    :autoColor="false"
                />
            </v-col>
        </v-row>
    </template>
    <v-row>
        <v-col>
            <borderRedactor
                v-model:is-border="isBorder"
                v-model:color="borderColor"
                v-model:width="borderWidth"
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <shadowRedactor
                v-model:is-shadow="isShadow"
                v-model:shadow-value="shadowValue"
                @change:shadow-value="changeShadowValue"
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <borderRadiusRedactor
                v-model:is-border-radius="isBorderRadius"
                v-model:border-radius="borderRadius"
            />
        </v-col>
    </v-row>
    <noks-modal @imageSelected="setBgImage" v-model="showImageGallery" />
</template>

<script setup lang="ts">
import noksModal from "@/shared/libs/noks-modal/noks-modal.vue";
import {
    ZoneStylesParams,
    ZoneBgTypes,
    Color,
    ContrastColor,
    BorderRadius,
    Shadow,
    CardStylesParams,
} from "@/types";
import {
    borderRedactor,
    borderRadiusRedactor,
    shadowRedactor,
    uploadImageBtn,
} from "../../reusable-components";
import { colorEditor } from "@/shared/vuetify";
import { shallowRef, toRefs, computed } from "vue";

//typing
type Props = {
    zoneStyles: ZoneStylesParams | CardStylesParams;
};
type Emits = {
    contrastColor: [value: ContrastColor];
    "update:zoneStyles": [value: ZoneStylesParams];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { zoneStyles } = toRefs(props);

//blackout
const blackout = computed<boolean>({
    get() {
        return zoneStyles.value.background.image.blackout.enabled;
    },
    set(value: boolean) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            background: {
                ...zoneStyles.value.background,
                image: {
                    ...zoneStyles.value.background.image,
                    blackout: {
                        ...zoneStyles.value.background.image.blackout,
                        enabled: value,
                    },
                },
            },
        });
    },
});

const blackoutColor = computed<Color>({
    get() {
        return zoneStyles.value.background.image.blackout.color as Color;
    },
    set(value: Color) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            background: {
                ...zoneStyles.value.background,
                image: {
                    ...zoneStyles.value.background.image,
                    blackout: {
                        ...zoneStyles.value.background.image.blackout,
                        color: value,
                    },
                },
            },
        });
    },
});

//background
const backgroundType = computed<ZoneBgTypes>({
    get() {
        return zoneStyles.value.background.type;
    },
    set(value: ZoneBgTypes) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            background: { ...zoneStyles.value.background, type: value },
        });
    },
});

const backgroundColor = computed<Color>({
    get() {
        return zoneStyles.value.background.color;
    },
    set(value: Color) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            background: { ...zoneStyles.value.background, color: value },
        });
    },
});

const textColor = computed<Color>({
    get() {
        return zoneStyles.value.background.textColor;
    },
    set(value: Color) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            background: { ...zoneStyles.value.background, textColor: value },
        });
    },
});

const bgImageSrc = computed<string>({
    get() {
        return zoneStyles.value.background.image.src;
    },
    set(value: string) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            background: {
                ...zoneStyles.value.background,
                image: { ...zoneStyles.value.background.image, src: value },
            },
        });
    },
});

const borderRadius = computed<BorderRadius>({
    get() {
        return zoneStyles.value.borderRadius.value;
    },
    set(value: BorderRadius) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            borderRadius: {
                ...zoneStyles.value.borderRadius,
                value: value,
            },
        });
    },
});

const isBorderRadius = computed<boolean>({
    get() {
        return zoneStyles.value.borderRadius.enabled;
    },
    set(value: boolean) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            borderRadius: {
                ...zoneStyles.value.borderRadius,
                enabled: value,
            },
        });
    },
});

const isBorder = computed<boolean>({
    get() {
        return zoneStyles.value.border.enabled;
    },
    set(value: boolean) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            border: {
                ...zoneStyles.value.border,
                enabled: value,
            },
        });
    },
});

const borderWidth = computed<number>({
    get() {
        return zoneStyles.value.border.borderWidth;
    },
    set(value: number) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            border: {
                ...zoneStyles.value.border,
                borderWidth: value,
            },
        });
    },
});

const borderColor = computed<Color>({
    get() {
        return zoneStyles.value.border.borderColor;
    },
    set(value: Color) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            border: {
                ...zoneStyles.value.border,
                borderColor: value,
            },
        });
    },
});

const isShadow = computed<boolean>({
    get() {
        return zoneStyles.value.shadow.enabled;
    },
    set(value: boolean) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            shadow: {
                ...zoneStyles.value.shadow,
                enabled: value,
            },
        });
    },
});

const shadowValue = computed<Shadow>({
    get() {
        return zoneStyles.value.shadow.shadow;
    },
    set(value: Shadow) {
        emit("update:zoneStyles", {
            ...zoneStyles.value,
            shadow: {
                ...zoneStyles.value.shadow,
                shadow: value,
            },
        });
    },
});

//переменные для шаблона
const imageIsLoading = shallowRef(false);
const showImageGallery = shallowRef(false);

const setBgImage = function (src: string) {
    bgImageSrc.value = src;
};
const changeShadowValue = function (value: Shadow) {
    emit("update:zoneStyles", {
        ...zoneStyles.value,
        shadow: {
            ...zoneStyles.value.shadow,
            shadow: value,
        },
    });
};
</script>

<style scoped lans="scss"></style>
