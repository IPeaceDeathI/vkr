<!-- TODO Реализовать цели, подгрузку иконок пользователя, hover и onClick эффекты  -->
<template>
    <draggable-card v-model="show" width="595px" height="480px">
        <redactor-toolbar
            v-model="curTab"
            :toggle-btns="toggleBtns"
            @close-click="$emit('update:modelValue', false)"
        />
        <v-redactor-container>
            <template v-if="curTab === 'styles'">
                <v-row>
                    <v-col cols="6">
                        <v-btn
                            style="width: 100%; height: 100%"
                            color="primary-darken-1"
                            class="pa-2"
                            @click="isActive = true"
                        >
                            <template v-slot:default>
                                <v-sheet
                                    height="50px"
                                    width="50px"
                                    :color="
                                        variant === 'filled'
                                            ? 'black'
                                            : 'transparent'
                                    "
                                    :class="previewBorderRad"
                                    :style="{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        border: borderWidthEnabled
                                            ? borderWidthValue +
                                              'px solid black'
                                            : '',
                                    }"
                                >
                                    <svg
                                        class="svg-icon"
                                        :fill="
                                            variant === 'filled'
                                                ? 'white'
                                                : 'black'
                                        "
                                        viewBox="0 0 24 24"
                                        height="24px"
                                        width="24px"
                                    >
                                        <use :href="`${svgPath}`" />
                                    </svg>
                                </v-sheet>
                            </template>
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn
                            @click="isActive = true"
                            text="Каталог иконок"
                            block
                            prepend-icon="mdi-shape-square-rounded-plus"
                            rounded="lg"
                            color="primary-darken-1"
                        >
                            Каталог иконок
                            <icon-gallery
                                v-model="isActive"
                                @iconSelected="iconChange"
                            ></icon-gallery>
                        </v-btn>
                        <input id="fileUpload" type="file" hidden />
                        <v-divider
                            :thickness="10"
                            class="border-opacity-0"
                        ></v-divider>
                        <v-btn
                            disabled
                            @click="chooseImage"
                            text="Загрузить"
                            block
                            prepend-icon="mdi-upload"
                            rounded="lg"
                            color="primary-darken-1"
                        >
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <redactor-component-title
                            >Стиль</redactor-component-title
                        >
                        <v-btn-toggle v-model="variant">
                            <v-btn
                                icon="mdi mdi-star"
                                value="default"
                                style="font-size: 18px !important"
                            ></v-btn>
                            <v-btn
                                icon="mdi mdi-star-circle"
                                value="filled"
                                style="font-size: 20px !important"
                            ></v-btn>
                            <v-btn
                                icon="mdi mdi-star-circle-outline"
                                value="outlined"
                                style="font-size: 22px !important"
                            ></v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col cols="6">
                        <redactor-component-title
                            >Цвет</redactor-component-title
                        >
                        <color-editor :auto-color="true" v-model="IconColor" />
                    </v-col>
                </v-row>
                <v-row v-if="variantNoDefault">
                    <v-col cols="6">
                        <redactor-component-title
                            >Форма</redactor-component-title
                        >
                        <v-btn-toggle v-model="borderRad">
                            <v-btn
                                icon="mdi mdi-square"
                                :value="BorderRadiusPresets.none"
                            ></v-btn>
                            <v-btn
                                icon="mdi mdi-square-rounded"
                                :value="BorderRadiusPresets.roundedS"
                            >
                            </v-btn>
                            <v-btn
                                icon="mdi mdi-circle"
                                :value="BorderRadiusPresets.circle"
                            ></v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col cols="6">
                        <redactor-component-title v-if="borderWidthEnabled"
                            >Ширина границы</redactor-component-title
                        >
                        <v-btn-toggle
                            v-if="borderWidthEnabled"
                            v-model="borderWidthValue"
                        >
                            <v-btn value="1">1px</v-btn>
                            <v-btn value="2">2px</v-btn>
                            <v-btn value="3">3px</v-btn>
                            <v-btn value="5">5px</v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <redactor-component-title
                            >Размер</redactor-component-title
                        >
                        <v-btn-toggle v-model="presetSize">
                            <v-btn
                                icon="mdi mdi-circle"
                                value="46"
                                style="font-size: 8px !important"
                            ></v-btn>
                            <v-btn
                                icon="mdi mdi-circle"
                                value="60"
                                style="font-size: 10px !important"
                            ></v-btn>
                            <v-btn
                                icon="mdi mdi-circle"
                                value="80"
                                style="font-size: 12px !important"
                            ></v-btn>
                            <v-btn
                                icon="mdi mdi-circle"
                                value="100"
                                style="font-size: 16px !important"
                            ></v-btn>
                            <v-btn
                                icon="mdi mdi-cog"
                                ref="settingSizeButton"
                                value="editable"
                            ></v-btn>
                        </v-btn-toggle>
                    </v-col>
                    <v-col cols="6" class="d-flex align-end">
                        <btn-slider
                            v-if="sizeEditable"
                            v-model="computedSize"
                            @on-change="changeSize"
                            :max="100"
                            :min="16"
                            :step="1"
                            style="padding-top: 5px"
                        >
                            <template v-slot:append>
                                <v-text-field
                                    v-model="computedSize"
                                    suffix="px"
                                    style="width: 80px"
                                >
                                </v-text-field>
                            </template>
                        </btn-slider>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <redactor-component-title v-if="iconSizeEnabled"
                            >Размер иконки</redactor-component-title
                        >
                        <btn-slider
                            v-if="iconSizeEnabled"
                            v-model="iconSizeValue"
                            @on-change="changeIconSize"
                            :max="100"
                            :min="20"
                            :step="1"
                        >
                            <template v-slot:append>
                                <v-text-field
                                    v-model="iconSizeValue"
                                    single-line
                                    suffix="%"
                                    style="width: 80px"
                                    class="text-caption"
                                >
                                </v-text-field>
                            </template>
                        </btn-slider>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-divider />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div>
                            <v-switch
                                label="Эффект при наведении"
                                v-model="isHoverEffect"
                                disabled
                            />
                        </div>
                        <div v-if="isHoverEffect">
                            <v-divider
                                :thickness="20"
                                class="border-opacity-0"
                            ></v-divider>
                            <v-btn-toggle
                                v-model="hoverEffect"
                                :mandatory="false"
                            >
                                <v-btn value="scale">Увеличение</v-btn>
                                <v-btn value="opacity">Прозрачность</v-btn>
                                <v-btn value="color">Цвет</v-btn>
                            </v-btn-toggle>
                            <v-divider
                                :thickness="20"
                                class="border-opacity-0"
                            ></v-divider>
                        </div>
                        <div>
                            <v-switch
                                label="Действие при клике"
                                disabled
                            ></v-switch>
                        </div>
                    </v-col>
                </v-row>
            </template>
            <template v-else-if="curTab === 'goals'">
                <goals-redactor v-model="goals" />
            </template>
        </v-redactor-container>
    </draggable-card>
</template>
<script setup lang="ts">
import {
    defineProps,
    defineEmits,
    toRefs,
    shallowRef,
    computed,
    watch,
    onBeforeMount,
} from "vue";
import { colorEditor } from "@/shared/vuetify";
import { Color, GoalsParams, ItemIconParams } from "@/types";
import { IconVariant } from "@/types";
import { BorderRadiusPresets } from "@/types";
import { iconGallery } from "@/shared/libs/icon-gallery";
import {
    draggableCard,
    goalsRedactor,
} from "@/features/structure/redactors/reusable-components";
import {
    btnSlider,
    redactorToolbar,
} from "@/features/structure/redactors/reusable-components";

//typing
type Props = {
    iconParams: Pick<ItemIconParams, "styles" | "settings">;
    modelValue: boolean;
};

type Emits = {
    "update:modelValue": [value: boolean];
    onChange: [value: Pick<ItemIconParams, "styles" | "settings">];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//on Before Mount
onBeforeMount(() => {
    initSize();
});

//icon params
const { iconParams, modelValue } = toRefs(props);

const goals = computed<GoalsParams>({
    get() {
        return iconParams.value.settings.goals.value;
    },
    set(value: GoalsParams) {
        emit("onChange", {
            ...iconParams.value,
            settings: {
                ...iconParams.value.settings,
                goals: { ...iconParams.value.settings.goals, value: value },
            },
        });
    },
});

const presetSize = shallowRef<string>("46");

const computedSize = computed<number>({
    get() {
        return presetSize.value !== "editable"
            ? Number(presetSize.value)
            : Number(iconParams.value.styles.sizeWrp);
    },
    set(value: number) {
        size.value = String(value);
    },
});

const sizeEditable = computed<boolean>(() => {
    return presetSize.value === "editable";
});

const variantNoDefault = computed<boolean>(() => {
    return variant.value !== "default";
});

const variantIsOutlined = computed<boolean>(() => {
    return variant.value === "outlined";
});

const previewBorderRad = computed<string>(() => {
    if (variant.value === "default") {
        return "";
    }
    switch (borderRad.value) {
        case "0":
            return "rounded-0";
        case "15":
            return "rounded-lg";
        case "50":
            return "rounded-circle";
        default:
            return "rounded-0";
    }
});

const IconColor = computed<Color>({
    get() {
        return iconParams.value.styles.iconColor;
    },
    set(value: Color) {
        emit("onChange", {
            ...iconParams.value,
            styles: { ...iconParams.value.styles, iconColor: value },
        });
    },
});

const size = computed<string>({
    get() {
        return iconParams.value.styles.sizeWrp;
    },
    set(value: string) {
        value = Number(value) > 100 ? "100" : Number(value) < 16 ? "16" : value;
        emit("onChange", {
            ...iconParams.value,
            styles: { ...iconParams.value.styles, sizeWrp: value },
        });
    },
});

const variant = computed<IconVariant>({
    get() {
        return iconParams.value.styles.variant;
    },
    set(value: IconVariant) {
        emit("onChange", {
            ...iconParams.value,
            styles: { ...iconParams.value.styles, variant: value },
        });
    },
});
const borderRad = computed<BorderRadiusPresets>({
    get() {
        return iconParams.value.styles.borderRadius.value;
    },
    set(value) {
        emit("onChange", {
            ...iconParams.value,
            styles: {
                ...iconParams.value.styles,
                borderRadius: {
                    ...iconParams.value.styles.borderRadius,
                    value: value,
                },
            },
        });
    },
});

const iconSizeValue = computed<number>({
    get() {
        return iconParams.value.styles.sizeIcon.value;
    },
    set(value: number) {
        value = value > 100 ? 100 : value < 0 ? 0 : value;
        emit("onChange", {
            ...iconParams.value,
            styles: {
                ...iconParams.value.styles,
                sizeIcon: { ...iconParams.value.styles.sizeIcon, value: value },
            },
        });
    },
});

const iconSizeEnabled = computed<boolean>({
    get() {
        return iconParams.value.styles.sizeIcon.enabled;
    },
    set(value: boolean) {
        emit("onChange", {
            ...iconParams.value,
            styles: {
                ...iconParams.value.styles,
                sizeIcon: {
                    ...iconParams.value.styles.sizeIcon,
                    enabled: value,
                },
            },
        });
    },
});

const borderWidthEnabled = computed<boolean>({
    get() {
        return iconParams.value.styles.borderWidth.enabled;
    },
    set(value: boolean) {
        emit("onChange", {
            ...iconParams.value,
            styles: {
                ...iconParams.value.styles,
                borderWidth: {
                    ...iconParams.value.styles.borderWidth,
                    enabled: value,
                },
            },
        });
    },
});

const borderWidthValue = computed<number>({
    get() {
        return iconParams.value.styles.borderWidth.value;
    },
    set(value: number) {
        emit("onChange", {
            ...iconParams.value,
            styles: {
                ...iconParams.value.styles,
                borderWidth: {
                    ...iconParams.value.styles.borderWidth,
                    value: value,
                },
            },
        });
    },
});

const svgPath = computed<string>({
    get() {
        return iconParams.value.styles.src;
    },
    set(value: string) {
        emit("onChange", {
            ...iconParams.value,
            styles: {
                ...iconParams.value.styles,
                src: value,
            },
        });
    },
});

const changeSize = function (value: number) {
    computedSize.value = value;
};

const changeIconSize = function (value: number) {
    iconSizeValue.value = value;
};

const iconChange = function (value: string) {
    svgPath.value = value;
};

const initSize = function () {
    switch (size.value) {
        case "46":
        case "60":
        case "80":
        case "100":
            presetSize.value = size.value;
            break;

        default:
            presetSize.value = "editable";
            computedSize.value = Number(size.value);
            break;
    }
};

watch(computedSize, (value: string | number) => {
    size.value = String(value);
});

watch(variant, (variant: string) => {
    if (variant !== "default") {
        iconSizeEnabled.value = true;
    } else {
        iconSizeEnabled.value = false;
    }
    if (variant !== "outlined") {
        borderWidthEnabled.value = false;
    } else {
        borderWidthEnabled.value = true;
    }
});

const chooseImage = function () {
    document.getElementById("fileUpload")?.click();
};

//переменные для template
const curTab = shallowRef<string>("styles");
const isHoverEffect = shallowRef<boolean>(false);
const hoverEffect = shallowRef<string>("");
const isActive = shallowRef<boolean>(false);
const toggleBtns = shallowRef<Array<{ text: string; value: string }>>([
    { text: "Стили", value: "styles" },
    { text: "Цели", value: "goals" },
]);

//model value
const show = computed<boolean>({
    get() {
        return modelValue.value;
    },
    set(value: boolean) {
        emit("update:modelValue", value);
    },
});
</script>
<style lang="scss" scoped>
.movable {
    cursor: move;
}
</style>
