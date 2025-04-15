<template>
    <v-row
        ><v-col cols="8"
            ><v-row
                ><redactor-component-title
                    >Ссылка на видео</redactor-component-title
                >
                <v-spacer></v-spacer>
                <upload-video @input="videoInsert"></upload-video>
            </v-row>
            <v-row> <v-text-field v-model="link"></v-text-field></v-row>
            <v-row
                ><v-input class="pt-1 pb-2 text-caption"
                    >Поддерживается
                    <a
                        style="text-decoration: none"
                        class="text-editor"
                        href="https://youtube.com"
                        target="_blank"
                    >
                        &nbsp;YouTube&nbsp;
                    </a>
                    и видео формата MP4</v-input
                ></v-row
            ><v-row
                ><switchWithHint
                    label="Автовоспроизведение (без звука)&nbsp;"
                    hint-text="Опция может не работать при включённом режиме энергосбережения в браузере Safari на macOS"
                    v-model="toggleAutoPlay"
                    :icon-type="InformationIconType.question"
            /></v-row>
            <v-row v-if="params.autoPlay"
                ><switchWithHint
                    label="Зациклить и скрыть интерфейс&nbsp;"
                    hint-text="Опция зацикливает воспроизведение видео и скрывает панель управления просмотром"
                    v-model="toggleCycle"
                    :icon-type="InformationIconType.question"
            /></v-row>
            <v-row v-else
                ><switchWithHint
                    :disabled="
                        params.cover === true || params.cover === false
                            ? false
                            : true
                    "
                    label="Включить обложку с кнопкой «play»&nbsp;"
                    hint-text="Для оптимизации страницы включите опцию, видео будет загружено после клика по обложке. Для воспроизведения видео необходим второй клик."
                    v-model="toggleCover"
                    :icon-type="InformationIconType.question"
            /></v-row>
            <v-row>
                <switchWithHint
                    v-if="params.srcType === VideoSrcType.download"
                    label="Масштабировать&nbsp;"
                    hint-text="Видео будет масштабировано, чтобы полностью заполнить пространство элемента. Часть изображения может быть скрыта."
                    v-model="toggleSize"
                    :icon-type="InformationIconType.question"
                />
            </v-row>
            <border-radius-redactor
                v-model:is-border-radius="toggleBorderRadius"
                v-model:border-radius="borderRadius" /></v-col
        ><v-col cols="4">
            <redactor-component-title>Обложка видео</redactor-component-title>
            <v-sheet
                @click="chooseFile()"
                class="cover-bg d-flex justify-center align-center"
                width="100%"
                height="calc(100% - 30px)"
                :color="
                    params.previewSrc == '' ? '#30343b' : 'primary-darken-1'
                "
                :style="{
                    backgroundSize: params.cover === true ? 'cover' : 'contain',
                    backgroundImage: 'url(' + params.previewSrc + ')',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                }"
                ><div v-if="params.previewSrc == ''" class="upload-cover">
                    <v-icon>mdi-upload</v-icon>Загрузить
                </div>
                <template v-else>
                    <v-btn
                        class="delete-cover"
                        color="secondary-darken-2"
                        position="absolute"
                        :style="{
                            right: '5px',
                            top: '5px',
                        }"
                        icon="mdi-delete"
                        size="x-small"
                        @click="deleteCover"
                    ></v-btn>
                    <div class="change-cover text-primary">
                        <v-icon>mdi-upload</v-icon>Загрузить
                    </div>
                </template>
                <input
                    v-on:change="loadImage($event)"
                    type="file"
                    hidden
                    ref="inputFile" /></v-sheet></v-col
    ></v-row>
</template>
<script setup lang="ts">
import {
    BorderRadius,
    ImageSize,
    MediaVideoParams,
    VideoSrcType,
} from "@/types";
import { fileListToArray, getYtVideoId } from "@/shared/helpers";
import {
    defineProps,
    defineEmits,
    toRef,
    computed,
    shallowRef,
    toRefs,
} from "vue";
import { useMediaCommonStyles } from "./useMediaCommonStyles";
import { ImagesModel } from "@/models";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { InformationIconType } from "@/shared/libs/information-icon";
import {
    borderRadiusRedactor,
    redactorComponentTitle,
    switchWithHint,
    uploadVideo,
} from "../../../reusable-components";

//typing
type Props = {
    params: MediaVideoParams;
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
    onChange: [value: MediaVideoParams];
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

//Блок работающий с video параметрами и common Styles
const { params, commonStyles } = toRefs(props); // Деструктурируем глобальный объект пропсов через shallowRef в нужные нам свойства

const { toggleSize, borderRadius, toggleBorderRadius } = useMediaCommonStyles(
    toRef(() => commonStyles.value),
    (value) => {
        emit("onChangeCommonStyles", value);
    }
);

const toggleCover = computed<boolean>({
    get() {
        return params.value.cover ?? false;
    },
    set(value: boolean) {
        if (params.value.cover != undefined) {
            emit("onChange", { ...params.value, cover: value });
        }
    },
});

const toggleAutoPlay = computed<boolean>({
    get() {
        return params.value.autoPlay;
    },
    set(value: boolean) {
        emit("onChange", { ...params.value, autoPlay: value, cover: false });
    },
});

const toggleCycle = computed<boolean>({
    get() {
        return params.value.cycleAndHideInterface;
    },
    set(value: boolean) {
        emit("onChange", { ...params.value, cycleAndHideInterface: value });
    },
});

const link = computed<string>({
    get() {
        if (params.value.srcType === VideoSrcType.youTube) {
            return "youtu.be/" + getYtVideoId(params.value.src);
        } else return params.value.src;
    },
    set(value: string) {
        emit("onChange", {
            ...params.value,
            src:
                "//www.youtube.com/embed/" +
                getYtVideoId(value) +
                "?enablejsapi=1",
            previewSrc:
                "//i.ytimg.com/vi/" +
                getYtVideoId(value) +
                "/maxresdefault.jpg",
        });
    },
});

//блок для выбора, загрузки и удаления обложки, а так же для вставки видео
const imageIsLoading = shallowRef(false);

const chooseFile = function () {
    const inputFile = shallowRef("" as unknown as HTMLElement);
    inputFile.value.click();
};

const loadImage = async function (event: Event) {
    imageIsLoading.value = true;
    try {
        const el = event.target as HTMLInputElement;
        if (el.files) {
            const files = el.files;
            if (files) {
                const result = ImagesModel.getImage(fileListToArray(files));
                result.then((res) => {
                    params.value.previewSrc = res.result[0].src;
                });
            }
        }
    } catch (error) {
        NotificationService.common().error({
            text: "Не удалось загрузить картинку",
        });
    }
    imageIsLoading.value = false;
};

const deleteCover = function () {
    params.value.previewSrc = "";
};

const videoInsert = async function (res: string) {
    if (params.value) {
        emit("onChange", {
            ...params.value,
            src: res,
            srcType: VideoSrcType.download,
            previewSrc: "",
        });
    }
};
</script>
