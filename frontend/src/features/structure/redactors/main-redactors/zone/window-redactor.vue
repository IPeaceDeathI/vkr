<template>
    <draggable-card
        v-if="$store.getters['environment/isEditable']"
        handle="v-toolbar"
        v-model="show"
        width="480px"
        height="480px"
    >
        <redactor-toolbar
            v-model="currTab"
            :toggle-btns="tabsBtn"
            :view-port-swapper="true"
            @close-click="show = false"
        />
        <v-redactor-container>
            <!-- desktop -->
            <template v-if="$store.getters['environment/isDesktopViewport']">
                <!-- TODO это работает но надо решить проблему с типизацией onChange -->
                <top-side
                    :zoneStyles="windowParamsStyles"
                    @update:zoneStyles="
                        windowParamsStyles = Object.assign(
                            {},
                            windowParamsStyles,
                            $event
                        )
                    "
                />
                <v-row>
                    <v-col>
                        <v-divider />
                    </v-col>
                </v-row>
                <windowLayout
                    v-model="windowLayoutParams"
                    @onChange="changeWindowLayoutParams"
                />
                <v-row>
                    <v-col>
                        <paddingsRedactor
                            title="Отступ от краёв экрана"
                            v-model="wrapperPaddings"
                            :inherit-padding="false"
                            type="desktop"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <paddingsRedactor
                            title="Отступ до контента"
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
                    <v-col>
                        <redactor-component-title>
                            Эффект появления
                        </redactor-component-title>
                        <v-btn-toggle v-model="windowShowEffect">
                            <v-btn :value="WindowShowEffect.appearance">
                                Появление
                            </v-btn>
                            <v-btn :value="WindowShowEffect.shift">Сдвиг</v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <redactor-component-title>
                            Показывать крестик
                        </redactor-component-title>
                        <v-btn-toggle v-model="crossPosition">
                            <v-btn :value="WindowCrossPosition.none">Нет</v-btn>
                            <v-btn :value="WindowCrossPosition.inside">
                                Внутри
                            </v-btn>
                            <v-btn :value="WindowCrossPosition.near">
                                Рядом
                            </v-btn>
                            <v-btn :value="WindowCrossPosition.outside">
                                Снаружи
                            </v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex">
                        <v-btn
                            @click="iconGalleryActive = true"
                            class="pa-0 mr-2"
                            minWidth="36px"
                            minHeight="36px"
                            variant="outlined"
                            color="primary-darken-1"
                            flat
                        >
                            <svg
                                class="svg-icon"
                                fill="#000000"
                                viewBox="0 0 24 24"
                                height="18px"
                                width="18px"
                            >
                                <use :href="`${iconPath}`"></use>
                            </svg>
                            <iconGallery
                                v-model="iconGalleryActive"
                                @iconSelected="iconPath = $event"
                            />
                        </v-btn>
                        <colorEditor v-model="iconColor" :autoColor="true" />
                        <btn-slider
                            v-model="iconSize"
                            @on-change="changeIconSize"
                            :max="56"
                            :min="20"
                            :step="1"
                            style="height: 36px"
                            class="mx-3"
                        >
                            <template v-slot:append>
                                <v-text-field
                                    v-model="iconSize"
                                    suffix="px"
                                    single-line
                                    flat
                                />
                            </template>
                        </btn-slider>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-switch
                            v-model="closeOnClickOutside"
                            label="Закрывать при клике на внешнюю область"
                        />
                    </v-col>
                </v-row>
            </template>
            <!-- mobile -->
            <template
                v-else-if="$store.getters['environment/isMobileViewport']"
            >
                <windowLayout
                    v-model="windowLayoutMobileParams"
                    @onChange="changeWindowLayoutMobileParams"
                />
                <v-row>
                    <paddingsRedactor
                        title="Отступ от краёв экрана"
                        v-model="wrapperPaddingsMobile"
                        :inherit-padding="false"
                        type="desktop"
                    />
                </v-row>
                <v-row>
                    <paddingsRedactor
                        title="Отступ до контента"
                        v-model="paddingsMobile"
                        v-model:inherit-padding="inheritMobilePadding"
                        type="mobile"
                    />
                </v-row>
                <v-row>
                    <v-col>
                        <redactor-component-title>
                            Показывать крестик
                        </redactor-component-title>
                        <v-btn-toggle v-model="crossPositionMobile">
                            <v-btn :value="WindowCrossPosition.none">Нет</v-btn>
                            <v-btn :value="WindowCrossPosition.inside">
                                Внутри
                            </v-btn>
                            <v-btn :value="WindowCrossPosition.outside">
                                Снаружи
                            </v-btn>
                        </v-btn-toggle>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="d-flex">
                        <colorEditor
                            v-model="iconColorMobile"
                            :autoColor="true"
                        />
                        <btn-slider
                            v-model="iconSizeMobile"
                            @on-change="changeIconSizeMobile"
                            :max="56"
                            :min="20"
                            :step="1"
                            style="height: 36px"
                            class="mx-3"
                        >
                            <template v-slot:append>
                                <v-text-field
                                    v-model="iconSizeMobile"
                                    suffix="px"
                                    single-line
                                    class="text-caption"
                                    flat
                                />
                            </template>
                        </btn-slider>
                    </v-col>
                </v-row>
            </template>
        </v-redactor-container>
    </draggable-card>
</template>

<script setup lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import windowLayout from "./_window-layout.vue";
import { LayoutProps } from "./_window-layout.vue";
import {
    WindowShowEffect,
    WindowCrossPosition,
    Color,
    Paddings,
    WindowParams,
    WindowStylesParams,
    WindowStylesMobileParams,
    ElementsJustify,
    ZoneTypes,
} from "@/types";
import { iconGallery } from "@/shared/libs/icon-gallery";
import { colorEditor } from "@/shared/vuetify";
import { btnSlider } from "@/features/structure/redactors/reusable-components";
import { PropType } from "vue";
import {
    paddingsRedactor,
    redactorToolbar,
    elementsJustify,
    draggableCard,
} from "../../reusable-components";

import topSide from "./_top-side.vue";
import { computed } from "vue";
enum Tabs {
    window,
    bg,
}
type Props = {
    windowParams: Omit<WindowParams, "parentId" | "childrenIds">;
    modelValue: boolean;
};
const props = defineProps<Props>();
type Emits = {
    "update:model-value": [boolean];
    "update:windowParams": [Omit<WindowParams, "parentId" | "childrenIds">];
};
const emit = defineEmits<Emits>();
const { windowParams, modelValue } = toRefs(props);
const currTab = ref<Tabs>(Tabs.window);
const tabsBtn = [
    {
        icon: "mdi-view-compact-outline",
        text: "Окно",
        value: Tabs.window,
    },
    { icon: "mdi-palette-outline", text: "Фон", value: Tabs.bg },
];
const iconGalleryActive = ref<boolean>(false);
const show = computed<boolean>({
    get() {
        return modelValue.value;
    },
    set(value: boolean) {
        emit("update:model-value", value);
    },
});
const windowParamsStyles = computed<WindowStylesParams>({
    get() {
        return windowParams.value.styles;
    },
    set(value: WindowStylesParams) {
        emit("update:windowParams", {
            ...windowParams.value,
            styles: value,
        });
    },
});
const windowParamsMobileStyles = computed<WindowStylesMobileParams>({
    get() {
        return windowParams.value.styles.mobile;
    },
    set(value: WindowStylesMobileParams) {
        emit("update:windowParams", {
            ...windowParams.value,
            styles: { ...windowParams.value.styles, mobile: value },
        });
    },
});
const windowLayoutParams = computed<LayoutProps>({
    get(): LayoutProps {
        return windowParamsStyles.value;
    },
    set(value: LayoutProps) {
        const tmp = windowParamsStyles.value;
        windowParamsStyles.value = {
            ...tmp,
            width: value.width,
            height: value.height,
            wrapperHorizontalJustify: value.wrapperHorizontalJustify,
            wrapperVerticalJustify: value.wrapperVerticalJustify,
            minHeight: value.minHeight,
        };
    },
});
const windowLayoutMobileParams = computed<LayoutProps>({
    get() {
        return windowParamsMobileStyles.value;
    },
    set(value) {
        const tmp = windowParamsMobileStyles.value;
        windowParamsMobileStyles.value = {
            ...tmp,
            width: value.width,
            height: value.height,
            wrapperHorizontalJustify: value.wrapperHorizontalJustify,
            wrapperVerticalJustify: value.wrapperVerticalJustify,
            minHeight: value.minHeight,
        };
    },
});
const windowShowEffect = computed<WindowShowEffect>({
    get() {
        return windowParamsStyles.value.showEffect;
    },
    set(value) {
        windowParamsStyles.value = {
            ...windowParamsStyles.value,
            showEffect: value,
        };
    },
});
const crossPosition = computed<WindowCrossPosition>({
    get() {
        return windowParamsStyles.value.cross.crossPosition;
    },
    set(value) {
        const tmp = windowParamsStyles.value.cross;
        tmp.crossPosition = value;
        windowParamsStyles.value = {
            ...windowParamsStyles.value,
            cross: tmp,
        };
    },
});
const crossPositionMobile = computed<WindowCrossPosition>({
    get() {
        return windowParamsMobileStyles.value.cross.crossPosition;
    },
    set(value) {
        const tmp = windowParamsMobileStyles.value.cross;
        tmp.crossPosition = value;
        windowParamsMobileStyles.value = {
            ...windowParamsMobileStyles.value,
            cross: tmp,
        };
    },
});
const iconPath = computed<string>({
    get() {
        return windowParamsStyles.value.cross.path;
    },
    set(value) {
        const tmp = windowParamsStyles.value.cross;
        tmp.path = value;
        windowParamsStyles.value = {
            ...windowParamsStyles.value,
            cross: tmp,
        };
    },
});
const iconColor = computed<Color>({
    get() {
        return windowParamsStyles.value.cross.color;
    },
    set(value) {
        const tmp = windowParamsStyles.value.cross;
        tmp.color = value;
        windowParamsStyles.value = {
            ...windowParamsStyles.value,
            cross: tmp,
        };
    },
});
const iconSize = computed<number>({
    get() {
        return windowParamsStyles.value.cross.size;
    },
    set(value) {
        const tmp = windowParamsStyles.value.cross;
        tmp.size = value;
        windowParamsStyles.value = {
            ...windowParamsStyles.value,
            cross: tmp,
        };
    },
});
const iconColorMobile = computed<Color>({
    get() {
        return windowParamsMobileStyles.value.cross.color;
    },
    set(value) {
        const tmp = windowParamsMobileStyles.value.cross;
        tmp.color = value;
        windowParamsMobileStyles.value = {
            ...windowParamsMobileStyles.value,
            cross: tmp,
        };
    },
});
const iconSizeMobile = computed<number>({
    get() {
        return windowParamsMobileStyles.value.cross.size;
    },
    set(value) {
        const tmp = windowParamsMobileStyles.value.cross;
        tmp.size = value;
        windowParamsMobileStyles.value = {
            ...windowParamsMobileStyles.value,
            cross: tmp,
        };
    },
});
const closeOnClickOutside = computed<boolean>({
    get() {
        return windowParamsStyles.value.closeOnClickOutside;
    },
    set(value) {
        windowParamsStyles.value = {
            ...windowParamsStyles.value,
            closeOnClickOutside: value,
        };
    },
});
const paddings = computed<Paddings>({
    get() {
        return windowParamsStyles.value.paddings;
    },
    set(value) {
        windowParamsStyles.value = {
            ...windowParamsStyles.value,
            paddings: value,
        };
    },
});
const wrapperPaddings = computed<Paddings>({
    get() {
        return props.windowParams.styles.wrapperPaddings;
    },
    set(value) {
        windowParamsStyles.value = {
            ...windowParamsStyles.value,
            wrapperPaddings: value,
        };
    },
});
const paddingsMobile = computed<Paddings>({
    get() {
        return windowParamsMobileStyles.value.paddings;
    },
    set(value) {
        windowParamsMobileStyles.value = {
            ...windowParamsMobileStyles.value,
            paddings: value,
        };
    },
});
const wrapperPaddingsMobile = computed<Paddings>({
    get() {
        return windowParamsMobileStyles.value.wrapperPaddings;
    },
    set(value) {
        windowParamsMobileStyles.value = {
            ...windowParamsMobileStyles.value,
            wrapperPaddings: value,
        };
    },
});
const inheritMobilePadding = computed<boolean>({
    get() {
        return windowParamsMobileStyles.value.inheritPadding;
    },
    set(value) {
        windowParamsMobileStyles.value = {
            ...windowParamsMobileStyles.value,
            inheritPadding: value,
        };
    },
});
const horizontalJustify = computed<ElementsJustify>({
    get() {
        return windowParamsStyles.value.horizontalJustify;
    },
    set(value) {
        windowParamsMobileStyles.value = {
            ...windowParamsMobileStyles.value,
            horizontalJustify: value,
        };
    },
});
const verticalJustify = computed<ElementsJustify>({
    get() {
        return windowParamsStyles.value.verticalJustify;
    },
    set(value: ElementsJustify) {
        windowParamsMobileStyles.value = {
            ...windowParamsMobileStyles.value,
            verticalJustify: value,
        };
    },
});
const changeWindowLayoutParams = (value: LayoutProps) => {
    windowLayoutParams.value = value;
    //TODO change
};
const changeWindowLayoutMobileParams = (value: LayoutProps) => {
    windowLayoutMobileParams.value = value;
    //TODO change
};
const changeIconSize = (value: number) => {
    iconSize.value = value;
    //TODO change
};
const changeIconSizeMobile = (value: number) => {
    iconSizeMobile.value = value;
    //TODO change
};
</script>

<style scoped style="scss"></style>
