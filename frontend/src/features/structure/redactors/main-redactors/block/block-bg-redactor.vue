<template>
    <v-row>
        <v-col>
            <v-btn-toggle v-model="selectedBg">
                <v-btn :value="BlockBgTypes.color">Цвет</v-btn>
                <v-btn :value="BlockBgTypes.image">Картинка</v-btn>
                <v-btn disabled :value="BlockBgTypes.video">Видео</v-btn>
                <v-btn :value="BlockBgTypes.none">Без фона</v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>

    <!-- color -->
    <template v-if="selectedBg === BlockBgTypes.color">
        <v-row>
            <v-col>
                <v-btn
                    :style="{ background: bgColor }"
                    class="demo-window"
                    rounded="0"
                    disabled
                >
                    <colorPicker
                        v-if="showPicker"
                        v-model:autoColor="auto"
                        v-model="showPicker"
                        v-model:initialColor="bgColor"
                    />
                    <v-icon
                        style="font-size: 50px"
                        size="x-large"
                        :color="bgContrastColor"
                    >
                        mdi-format-color-fill
                    </v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <redactor-component-title>Цвет фона</redactor-component-title>
                <color-editor v-model="bgColor" :autoColor="false" />
                <!-- TODO -->
            </v-col>
            <v-col>
                <text-color-toggle v-model="textColorAuto" />
            </v-col>
        </v-row>
    </template>
    <!-- image -->
    <template v-else-if="selectedBg === BlockBgTypes.image">
        <v-row>
            <v-col>
                <!-- TODO НЕ ЗАБЫТЬ ПРО РЕДАКТИРОВАНИЕ КАРТИНКИ И ПОКАЗ ВREAL TIME РЕЗУЛЬАТА -->
                <v-img
                    cover
                    class="demo-window"
                    :src="resizedImage"
                    rounded="0"
                >
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
                <div class="d-flex mt-4">
                    <div class="w-50 pr-2">
                        <upload-image-btn
                            @start="imageIsLoading = true"
                            @end="imageIsLoading = false"
                            @input="setBgImage"
                        />
                    </div>
                    <div class="w-50 pl-2">
                        <v-btn
                            block
                            :loading="imageIsLoading"
                            prepend-icon="mdi-image-search-outline"
                            @click="showImageGallery = true"
                        >
                            Галерея
                        </v-btn>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <text-color-toggle v-model="textColorAuto" />
            </v-col>
        </v-row>
        <v-row>
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
        <noks-modal @imageSelected="setBgImage" v-model="showImageGallery" />
    </template>
    <!-- video -->
    <template v-else-if="selectedBg === BlockBgTypes.video"> </template>
    <!-- none -->
    <template v-else-if="selectedBg === BlockBgTypes.none">
        <v-row>
            <v-col cols="6">
                <text-color-toggle v-model="textColorAuto" />
            </v-col>
        </v-row>
    </template>
</template>
<script setup lang="ts">
import {
    defineProps,
    defineEmits,
    toRefs,
    shallowRef,
    computed,
    onBeforeMount,
    ref,
} from "vue";
import { colorPicker } from "@/shared/libs/color-picker";
import {
    BaseBGParams,
    BlockBgTypes,
    Color,
    ContrastColor,
    TextColorAutoTypes,
} from "@/types";
import { textColorToggle, uploadImageBtn } from "../../reusable-components";
import noksModal from "@/shared/libs/noks-modal/noks-modal.vue";
import { colorEditor } from "@/shared/vuetify";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { fileListToArray, getContrastColor } from "@/shared/helpers";
import { ImagesModel } from "@/models";
import { getResizingImageByContainerWidth } from "@/shared/services";

//typing
type Props = {
    bgParams: BaseBGParams;
};

type Emits = {
    onChange: [value: BaseBGParams];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// base bg params
const { bgParams } = toRefs(props);

const selectedBg = computed<BlockBgTypes>({
    get() {
        return bgParams.value.selectedBg;
    },
    set(value: BlockBgTypes) {
        emit("onChange", { ...bgParams.value, selectedBg: value });
    },
});

const bgColor = computed<Color>({
    get() {
        return bgParams.value.color.backgroundColor;
    },
    set(value: Color) {
        emit("onChange", {
            ...bgParams.value,
            color: { ...bgParams.value.color, backgroundColor: value },
        });
    },
});

const bgContrastColor = computed(() => {
    return getContrastColor(bgColor.value);
});

const textColorAuto = computed<TextColorAutoTypes>({
    get() {
        return bgParams.value.textColorAutoType;
    },
    set(value: TextColorAutoTypes) {
        emit("onChange", { ...bgParams.value, textColorAutoType: value });
    },
});

//image
const imageIsLoading = shallowRef(false);
const resizedImage = shallowRef("");

const bgImageSrc = computed<string>({
    get() {
        return bgParams.value.image.backgroundImage.src;
    },
    set(value: string) {
        changeResizedImage(value);
        emit("onChange", {
            ...bgParams.value,
            image: {
                ...bgParams.value.image,
                backgroundImage: {
                    ...bgParams.value.image.backgroundImage,
                    src: value,
                    base_src: value,
                },
            },
        });
    },
});

const changeResizedImage = async function (value: string) {
    resizedImage.value = await getResizingImageByContainerWidth(value, 600);
};

const loadImage = async function (event: Event) {
    imageIsLoading.value = true;
    try {
        const el = event.target as HTMLInputElement;
        if (el.files) {
            const files = el.files;
            if (files) {
                const result = await ImagesModel.getImageResize(
                    fileListToArray(files)
                );
                setBgImage(result.result[0].src);
            }
        }
    } catch (error) {
        NotificationService.common().error({
            text: "Не удалось загрузить картинку",
        });
    }

    imageIsLoading.value = false;
};

const setBgImage = function (src: string): void {
    bgImageSrc.value = src;
};

//blackout
const blackout = computed<boolean>({
    get() {
        return bgParams.value.blackout.enabled;
    },
    set(value: boolean) {
        emit("onChange", {
            ...bgParams.value,
            blackout: { ...bgParams.value.blackout, enabled: value },
        });
    },
});

const blackoutColor = computed<Color>({
    get() {
        return bgParams.value.blackout.color as Color;
    },
    set(value: Color) {
        emit("onChange", {
            ...bgParams.value,
            blackout: { ...bgParams.value.blackout, color: value },
        });
    },
});

// MB TODO
// const chooseFile = function () {
//     const inputFile = shallowRef(null);
//     if (inputFile.value) inputFile.value.click();
// };

//on before mount
onBeforeMount(() => {
    resizedImage.value = bgImageSrc.value;
});

//переменные для template
const auto = shallowRef<boolean>(false);
const showImageGallery = shallowRef(false);
const showPicker = shallowRef<boolean>(false);
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.demo-window {
    width: 100%;
    height: 160px;
}
</style>
