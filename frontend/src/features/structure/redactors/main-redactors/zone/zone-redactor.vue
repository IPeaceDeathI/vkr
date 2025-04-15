<template>
    <draggable-card
        noks-attach-dialog-target-inner
        v-if="$store.getters['environment/isEditable']"
        handle="v-toolbar"
        v-model="show"
        width="460px"
        height="480px"
    >
        <redactor-toolbar
            title="Контент-зона"
            :view-port-swapper="true"
            :spacer="false"
            @close-click="show = false"
        >
            <v-btn
                v-if="
                    zoneParams.type === ZoneTypes.column ||
                    zoneParams.type === ZoneTypes.card
                "
                color="editor"
                rounded="lg"
                variant="outlined"
                size="small"
                style="width: 50px; height: 36px"
                @click="applyStylesToAllZones()"
            >
                <v-icon size="x-large">mdi-set-all</v-icon>
                <v-tooltip activator="parent">{{
                    `Применить стиль ко всем ${
                        zoneParams.type === ZoneTypes.column
                            ? "колонкам"
                            : "карточкам"
                    }`
                }}</v-tooltip>
            </v-btn>
        </redactor-toolbar>

        <v-redactor-container>
            <!-- desktop -->
            <template v-if="$store.getters['environment/isDesktopViewport']">
                <top-side
                    :zoneStyles="zoneParams.styles"
                    @contrastColor="emit('contrastColor', $event)"
                    @update:zoneStyles="changeZoneStyles"
                />
                <v-row>
                    <v-col>
                        <v-divider />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <paddingsRedactor
                            v-model="paddings"
                            :inherit-padding="false"
                            type="desktop"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <elementsJustify
                            title="Выравнивание по ширине"
                            v-model="horizontalJustify"
                        />
                    </v-col>
                    <v-col>
                        <redactor-component-title>
                            Выравнивание по высоте
                        </redactor-component-title>
                        <v-btn-toggle v-model="verticalJustify">
                            <v-btn
                                icon="mdi-format-vertical-align-top"
                                :value="ElementsJustify.start"
                            ></v-btn>
                            <v-btn
                                icon="mdi-format-vertical-align-center"
                                :value="ElementsJustify.center"
                            ></v-btn>
                            <v-btn
                                icon="mdi-format-vertical-align-bottom"
                                :value="ElementsJustify.end"
                            ></v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <number-unit
                            v-model="minHeightEnabled"
                            v-model:number-value="minHeight"
                            v-model:unit="minHeightUnit"
                            :units="['px', 'vh']"
                            label="Задать минимальную высоту"
                        />
                    </v-col>
                </v-row>
            </template>
            <!-- mobile -->
            <template
                v-else-if="$store.getters['environment/isMobileViewport']"
            >
                <v-row>
                    <v-col>
                        <paddingsRedactor
                            v-model="mobilePadding"
                            v-model:inherit-padding="inheritMobilePadding"
                            type="mobile"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <elementsJustify
                            title="Выравнивание по ширине"
                            v-model="mobileHorizontalJustify"
                        />
                    </v-col>
                    <v-col>
                        <redactor-component-title>
                            Выравнивание по высоте
                        </redactor-component-title>
                        <v-btn-toggle v-model="mobileVerticalJustify">
                            <v-btn
                                icon="mdi-format-vertical-align-top"
                                :value="ElementsJustify.start"
                            />
                            <v-btn
                                icon="mdi-format-vertical-align-center"
                                :value="ElementsJustify.center"
                            />
                            <v-btn
                                icon="mdi-format-vertical-align-bottom"
                                :value="ElementsJustify.end"
                            />
                        </v-btn-toggle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <number-unit
                            v-model="mobileMinHeightEnabled"
                            v-model:number-value="mobileMinHeight"
                            v-model:unit="mobileMinHeightUnit"
                            :units="['px', 'vh']"
                            label="Задать минимальную высоту"
                        />
                    </v-col>
                </v-row>
            </template>
        </v-redactor-container>
    </draggable-card>
</template>
<script setup lang="ts">
import {
    ElementsJustify,
    Paddings,
    CardParams,
    ColumnParams,
    ZoneStylesMobileParams,
    ZoneStylesParams,
    ZoneTypes,
    CardStylesParams,
    ContrastColor,
    BlockTitleParams,
} from "@/types";
import {
    elementsJustify,
    numberUnit,
    paddingsRedactor,
    draggableCard,
    redactorToolbar,
} from "../../reusable-components";
import topSide from "./_top-side.vue";
import { computed, defineEmits, defineProps, toRefs, watch } from "vue";

//typing
enum tabType {
    desktop,
    mobile,
}

type Props = {
    modelValue: boolean;
    zoneParams: Omit<
        CardParams | ColumnParams | BlockTitleParams,
        "parentId" | "childrenIds"
    >;
};
type Emits = {
    contrastColor: [value: ContrastColor];
    applyStylesToAllZones: [value: CardStylesParams | ZoneStylesParams];
    "update:model-value": [value: boolean];
    "update:zoneParams": [
        value: Omit<
            BlockTitleParams | CardParams | ColumnParams,
            "parentId" | "childrenIds"
        >
    ];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { modelValue, zoneParams } = toRefs(props);

const show = computed<boolean>({
    get() {
        return modelValue.value;
    },
    set(value: boolean) {
        emit("update:model-value", value);
    },
});

const applyStylesToAllZones = function () {
    emit("applyStylesToAllZones", zoneParams.value.styles);
};

//Zonestyles
//common
const zoneStyles = computed<ZoneStylesParams>(() => {
    return zoneParams.value.styles;
});

const paddings = computed<Paddings>({
    get() {
        return zoneStyles.value.paddings;
    },
    set(value: Paddings) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: { ...zoneStyles.value, paddings: value },
        });
    },
});

const horizontalJustify = computed<ElementsJustify>({
    get() {
        return zoneStyles.value.horizontalJustify;
    },
    set(value: ElementsJustify) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: { ...zoneStyles.value, horizontalJustify: value },
        });
    },
});

const verticalJustify = computed<ElementsJustify>({
    get() {
        return zoneStyles.value.verticalJustify;
    },
    set(value: ElementsJustify) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: { ...zoneStyles.value, verticalJustify: value },
        });
    },
});

const minHeightEnabled = computed<boolean>({
    get() {
        return zoneStyles.value.minHeight.enabled;
    },
    set(value: boolean) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                minHeight: { ...zoneStyles.value.minHeight, enabled: value },
            },
        });
    },
});

const minHeight = computed<number>({
    get() {
        return zoneStyles.value.minHeight.value;
    },
    set(value: number) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                minHeight: { ...zoneStyles.value.minHeight, value: value },
            },
        });
    },
});

const minHeightUnit = computed<"px" | "vh">({
    get() {
        return zoneStyles.value.minHeight.unit;
    },
    set(value: "px" | "vh") {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                minHeight: { ...zoneStyles.value.minHeight, unit: value },
            },
        });
    },
});

const changePaddings = function (value: Paddings) {
    emit("update:zoneParams", {
        ...zoneParams.value,
        styles: {
            ...zoneStyles.value,
            paddings: value,
        },
    });
};
//END Zonestyles

// Zonemobile
//mobile
const zoneMobile = computed<ZoneStylesMobileParams>(() => {
    return zoneStyles.value.mobile;
});

const mobilePadding = computed<Paddings>({
    get() {
        return zoneMobile.value.paddings;
    },
    set(value: Paddings) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                mobile: {
                    ...zoneMobile.value,
                    paddings: value,
                },
            },
        });
    },
});

const inheritMobilePadding = computed<boolean>({
    get() {
        return zoneMobile.value.inheritPadding;
    },
    set(value: boolean) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                mobile: {
                    ...zoneMobile.value,
                    inheritPadding: value,
                },
            },
        });
    },
});

const mobileHorizontalJustify = computed<ElementsJustify>({
    get() {
        return zoneMobile.value.horizontalJustify;
    },
    set(value: ElementsJustify) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                mobile: {
                    ...zoneMobile.value,
                    horizontalJustify: value,
                },
            },
        });
    },
});

const mobileVerticalJustify = computed<ElementsJustify>({
    get() {
        return zoneMobile.value.verticalJustify;
    },
    set(value: ElementsJustify) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                mobile: {
                    ...zoneMobile.value,
                    verticalJustify: value,
                },
            },
        });
    },
});

const mobileMinHeightEnabled = computed<boolean>({
    get() {
        return zoneMobile.value.minHeight.enabled;
    },
    set(value: boolean) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                mobile: {
                    ...zoneMobile.value,
                    minHeight: {
                        ...zoneMobile.value.minHeight,
                        enabled: value,
                    },
                },
            },
        });
    },
});

const mobileMinHeight = computed<number>({
    get() {
        return zoneMobile.value.minHeight.value;
    },
    set(value: number) {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                mobile: {
                    ...zoneMobile.value,
                    minHeight: {
                        ...zoneMobile.value.minHeight,
                        value: value,
                    },
                },
            },
        });
    },
});

const mobileMinHeightUnit = computed<"px" | "vh">({
    get() {
        return zoneMobile.value.minHeight.unit;
    },
    set(value: "px" | "vh") {
        emit("update:zoneParams", {
            ...zoneParams.value,
            styles: {
                ...zoneStyles.value,
                mobile: {
                    ...zoneMobile.value,
                    minHeight: {
                        ...zoneMobile.value.minHeight,
                        unit: value,
                    },
                },
            },
        });
    },
});

const changeMobilePaddings = function (value: Paddings) {
    zoneMobile.value.paddings = value;
    emit("update:zoneParams", {
        ...zoneParams.value,
        styles: {
            ...zoneStyles.value,
            mobile: {
                ...zoneMobile.value,
                paddings: value,
            },
        },
    });
};
//END Zonemobile

const changeZoneStyles = function (value: ZoneStylesParams) {
    emit("update:zoneParams", {
        ...zoneParams.value,
        styles: value,
    });
};

watch(minHeightUnit, (value: "px" | "vh", lastValue: "px" | "vh") => {
    if (value === "px" || lastValue === "vh") {
        minHeight.value = Math.round(
            document.documentElement.clientHeight * (minHeight.value / 100)
        );
    } else if (value === "vh" || lastValue === "px") {
        minHeight.value = Math.round(
            (minHeight.value / document.documentElement.clientHeight) * 100
        );
    }
});
//OPTIMIZATION возможно придется отказаться
// minHeightEnabled(value: boolean) {
//     if (value) {
//         const height = document.querySelector(
//             `[data-el-id="${this.id}"]`
//         )?.clientHeight;
//         if (height !== undefined) {
//             this.minHeight = height;
//             this.minHeightUnit = "px";
//         }
//     }
// },
</script>
<style lang="scss" scoped></style>
