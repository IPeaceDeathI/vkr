<template>
    <v-row style="height: 347px">
        <v-col cols="4">
            <div style="width: 100%">
                <v-sheet
                    v-bind:style="{
                        'padding-bottom': '100%',
                        'background-size': 'cover',
                        'background-position': '50%',
                        'background-image': 'url(' + urlInsertImg + ')',
                    }"
                ></v-sheet>
            </div>

            <div class="w-100 mt-2">
                <upload-image-btn
                    class="mb-2"
                    @start="imageIsLoading = true"
                    @end="imageIsLoading = false"
                    @input="imageInsert"
                    >Загрузить</upload-image-btn
                >
                <v-btn
                    @click="showGallery = true"
                    block
                    prepend-icon="mdi-image-search-outline"
                    color="primary-darken-1"
                    :loading="imageIsLoading"
                >
                    Галерея
                </v-btn>
                <noks-modal
                    @imageSelected="loadImgsFromGallery"
                    v-model="showGallery"
                ></noks-modal>
            </div>
        </v-col>
        <v-col
            cols="8"
            style="height: 100%; overflow-y: auto"
            class="scrollable px-0 pt-0"
            ><v-col>
                <div class="pb-1">
                    <switchWithHint
                        disabled
                        label="Заполнить контейнер&nbsp;"
                        hint-text="Изображение целиком заполнит контейнер, в котором находится"
                        v-model="toggleFill"
                        :icon-type="InformationIconType.question"
                    />
                </div>
                <div class="pb-1">
                    <switchWithHint
                        disabled
                        label="Отключить сжатие&nbsp;"
                        hint-text="Отключает встроенные в Noks оптимизации, будет показано исходное изображение. Загрузка неоптимизированных изображений может значительно увеличить время загрузки страницы."
                        v-model="toggleOffArchiving"
                        :icon-type="InformationIconType.question"
                    />
                </div>
                <div class="pb-1">
                    <switchWithHint
                        label="Без отступов"
                        hint-text="Изображение будет игнорировать отступы контейнера? в котором находится."
                        v-model="paddingsOff"
                        :icon-type="InformationIconType.question"
                    />
                </div>
                <slot name="switches"></slot>
            </v-col>
            <v-row
                ><v-col
                    ><redactor-component-title
                        >Показывать описание</redactor-component-title
                    >
                    <v-btn-toggle v-model="selectedOverlay">
                        <v-btn :value="OverlayType.hide">Не показывать</v-btn>
                        <v-btn disabled :value="OverlayType.onHover"
                            >При наведении</v-btn
                        >
                        <v-btn disabled :value="OverlayType.forever"
                            >Всегда</v-btn
                        >
                    </v-btn-toggle></v-col
                ></v-row
            >

            <v-row v-if="selectedOverlay === OverlayType.hide"
                ><v-col>
                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            align-items: baseline;
                        "
                    >
                        <redactor-component-title style="flex: 0 0 auto">
                            Альтернативный текст&nbsp;
                        </redactor-component-title>
                        <information-icon
                            :close-delay="200"
                            max-width="350"
                            :text="'Этот текст будет показан вместо изображения, если оно не будет загружено'"
                            size="14"
                            :type="InformationIconType.question"
                        ></information-icon>
                    </div>
                    <v-text-field
                        disabled
                        v-if="selectedOverlay === OverlayType.hide"
                    ></v-text-field> </v-col
            ></v-row>
            <!--                DEVELOP:                         -->
            <template
                v-if="
                    selectedOverlay === OverlayType.onHover ||
                    selectedOverlay === OverlayType.forever
                "
            >
                <redactor-component-title>
                    Положение текста</redactor-component-title
                >
                <v-component-tabs v-model="tab2">
                    <v-tab :value="1">По центру</v-tab>
                    <v-tab :value="2">Слева</v-tab>
                </v-component-tabs>
                <redactor-component-title>
                    Заголовок изображения
                </redactor-component-title>
                <v-text-field></v-text-field>
                <redactor-component-title>
                    Описание изображения
                </redactor-component-title>
                <v-textarea variant="outlined"></v-textarea>
                <v-row>
                    <v-col cols="6" class="pl-0"
                        ><redactor-component-title>
                            Цвет затемнения
                        </redactor-component-title>
                        <color-editor
                            v-model="modelCoverColor"
                            :auto-color="false"
                        >
                        </color-editor>
                    </v-col>
                    <v-col cols="6"
                        ><redactor-component-title>
                            Цвет текста
                        </redactor-component-title>
                        <color-editor
                            v-model="modelTextColor"
                            :auto-color="true"
                        >
                        </color-editor>
                    </v-col>
                </v-row>
            </template>
            <v-row
                ><v-col><slot name="append"></slot></v-col></v-row></v-col
    ></v-row>
</template>

<script setup lang="ts">
import { Color, MediaImageParams, OverlayType } from "@/types";
import {
    defineProps,
    defineEmits,
    computed,
    shallowRef,
    onMounted,
    defineSlots,
    toRefs,
} from "vue";
import {
    informationIcon,
    InformationIconType,
} from "@/shared/libs/information-icon";
import {
    redactorComponentTitle,
    switchWithHint,
    uploadImageBtn,
} from "../../../reusable-components";
import { colorEditor } from "@/shared/vuetify";
import noksModal from "@/shared/libs/noks-modal/noks-modal.vue";

//typing
type Props = {
    params: MediaImageParams;
};

type Emits = {
    onChange: [value: MediaImageParams];
};

type Slots = {
    switches: undefined;
    append: undefined;
};

const slots = defineSlots<Slots>(); // "глобальная" переменная для слотов
const props = defineProps<Props>(); // "глобальная" переменная для пропсов потом в блоках ее деструктуризуем
const emit = defineEmits<Emits>(); // "глобальная" переменная для эмитов

//Блок работающий с video параметрами
const { params } = toRefs(props); // Деструктурируем глобальный объект пропсов через shallowRef в нужные нам свойства

const selectedOverlay = computed<OverlayType>({
    get() {
        return params.value.styles.overlay.enabled;
    },
    set(value: OverlayType) {
        emit("onChange", {
            ...params.value,
            styles: {
                ...params.value.styles,
                overlay: { ...params.value.styles.overlay, enabled: value },
            },
        });
    },
});

const paddingsOff = computed<boolean>({
    get() {
        console.log(1);
        return params.value.styles.paddingsOff;
    },
    set(value: boolean) {
        console.log(2);
        emit("onChange", {
            ...params.value,
            styles: { ...params.value.styles, paddingsOff: value },
        });
    },
});

const coverColor = computed<string>({
    get() {
        return params.value.styles.overlay.value.coverColor;
    },
    set(value: string) {
        if (params.value && params.value.styles.overlay) {
            emit("onChange", {
                ...params.value,
                styles: {
                    ...params.value.styles,
                    overlay: {
                        ...params.value.styles.overlay,
                        value: {
                            ...params.value.styles.overlay.value,
                            coverColor: value,
                        },
                    },
                },
            });
        }
    },
});

const textColor = computed<string>({
    get() {
        return params.value.styles.overlay.value.textColor;
    },
    set(value: string) {
        if (params.value && params.value.styles.overlay) {
            emit("onChange", {
                ...params.value,
                styles: {
                    ...params.value.styles,
                    overlay: {
                        ...params.value.styles.overlay,
                        value: {
                            ...params.value.styles.overlay.value,
                            textColor: value,
                        },
                    },
                },
            });
        }
    },
});

const toggleOffArchiving = computed<boolean>({
    get() {
        if (
            params.value.styles.imageParams.src &&
            params.value.styles.imageParams.src !== ""
        )
            return true;
        else return false;
    },
    set(value: boolean) {
        if (params.value) {
            if (
                params.value.styles.archiving &&
                params.value.styles.imageParams.src !== ""
            ) {
                emit("onChange", {
                    ...params.value,
                    styles: { ...params.value.styles, archiving: !value },
                });
            }
        }
    },
});

const toggleFill = computed<boolean>({
    //TODO
    get() {
        return false;
    },
    set(value: boolean) {
        console.log(value);
    },
});

//Блок для загрузки фото из галлереи и вставки фото при выборе
const imageIsLoading = shallowRef(false);
const urlInsertImg = shallowRef("@/assets/images/insertImage.jpg");

const loadImgsFromGallery = function (url: string) {
    imageIsLoading.value = true;
    imageInsert(url);
    imageIsLoading.value = false;
};

const imageInsert = async function (res: string) {
    urlInsertImg.value = res;
    if (params.value) {
        emit("onChange", {
            ...params.value,
            styles: {
                ...params.value.styles,
                imageParams: {
                    ...params.value.styles.imageParams,
                    src: res,
                },
            },
        });
    }
};

//Присвоение src фото в локальную переменную редактора на хуке Mounted
onMounted(() => {
    urlInsertImg.value = params.value.styles.imageParams.src;
});

//Переменные необходимые для работы редактора, DEVELOP
const tab2 = shallowRef(null);
const modelCoverColor = shallowRef<Color>("#000000");
const modelTextColor = shallowRef<Color>("auto");
const showGallery = shallowRef(false);
</script>
