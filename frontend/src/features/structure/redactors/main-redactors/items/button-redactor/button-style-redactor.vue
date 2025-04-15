<template>
    <v-redactor-container>
        <template v-if="$store.getters['environment/isDesktopViewport']">
            <v-row>
                <v-col>
                    <v-sheet
                        color="primary-darken-1"
                        class="ma-1 rounded"
                        style="padding: 13px 20px"
                    >
                        <v-sheet
                            class="align-center d-flex flex-row"
                            color="primary-darken-1"
                        >
                            <v-sheet
                                class="rounded-circle d-flex align-center justify-center"
                                color="primary-darken-2"
                                width="34px"
                                height="34px"
                            >
                                <v-icon icon="mdi-apps" />
                            </v-sheet>
                            &nbsp;&nbsp;Каталог пресетов кнопок
                            <v-spacer />
                            <v-btn color="black">Выбрать пресет</v-btn>
                        </v-sheet>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <color-redactor
                        v-model:is-filled="isFilled"
                        v-model:color="btnColor"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <border-redactor
                        v-model:is-border="isBorder"
                        v-model:color="borderColor"
                        v-model:width="borderWidth"
                        @on-change="changeBorderWidth"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <shadow-redactor
                        v-model:is-shadow="isShadow"
                        v-model:shadow-value="shadowValue"
                        @change:shadow-value="changeShadowValue"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <border-radius-redactor
                        v-model:is-border-radius="isBorderRadius"
                        v-model:border-radius="borderRadius"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <size-redactor
                        v-model:horizontal-size="horizontalSize"
                        v-model:vertical-size="verticalSize"
                        v-model:button-width="btnWidth"
                    />
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
                    <inner-icon-redactor
                        v-model:is-icon="isIcon"
                        v-model:icon-path="iconPath"
                        v-model:icon-size="iconSize"
                        v-model:icon-position="iconPosition"
                        @on-change="changeIconSize"
                    />
                </v-col>
            </v-row>
        </template>
        <template v-else-if="$store.getters['environment/isMobileViewport']">
            <v-row>
                <v-col>
                    <v-switch
                        label="Переопределить настройки для мобильных"
                        v-model="mobileEnabled"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <size-redactor
                        v-model:horizontal-size="mobileHorizontalSize"
                        v-model:vertical-size="mobileVerticalSize"
                        v-model:button-width="mobileBtnWidth"
                        :isDisabled="!mobileEnabled"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <btn-text-redactor
                        v-model:font-size="mobileFontSize"
                        v-model:font-weight="mobileFontWeight"
                        v-model:font-style="mobileFontStyle"
                        v-model:letter-spacing="mobileLetterSpacing"
                        v-model:line-height="mobileLineHeight"
                        v-model:text-color="mobileTextColor"
                        v-model:text-decoration="mobileTextDecoration"
                        :isDisabled="!mobileEnabled"
                    />
                </v-col>
            </v-row>
        </template>
    </v-redactor-container>
</template>
<script setup lang="ts">
import {
    BorderRadius,
    Color,
    ItemButtonStylesParams,
    TextDecoration,
    WidthType,
    Shadow,
    ButtonIconPosition,
} from "@/types";
import { computed, defineEmits, defineProps, toRefs } from "vue";
import {
    borderRedactor,
    borderRadiusRedactor,
    shadowRedactor,
    innerIconRedactor,
    sizeRedactor,
    btnTextRedactor,
    colorRedactor,
} from "@/features/structure/redactors/reusable-components";

//typing
type Props = { params: ItemButtonStylesParams };
type Emits = {
    "update:buttonStyle": [value: ItemButtonStylesParams];
    onChange: [value: ItemButtonStylesParams];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//item button styles params
const { params } = toRefs(props);
const textColor = computed<Color>({
    get() {
        return params.value.text.color;
    },
    set(value: Color): void {
        emit("onChange", {
            ...params.value,
            text: { ...params.value.text, color: value },
        });
    },
});

const fontSize = computed<number>({
    get() {
        return params.value.text.fontSize;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            text: { ...params.value.text, fontSize: value },
        });
    },
});

const fontWeight = computed<number>({
    get() {
        return params.value.text.fontWeight;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            text: { ...params.value.text, fontWeight: value },
        });
    },
});

const lineHeight = computed<number>({
    get() {
        return params.value.text.lineHeight;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            text: { ...params.value.text, lineHeight: value },
        });
    },
});

const letterSpacing = computed<number>({
    get() {
        return params.value.text.letterSpacing;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            text: { ...params.value.text, letterSpacing: value },
        });
    },
});
const fontStyle = computed<string>({
    get() {
        return params.value.text.fontStyle;
    },
    set(value: string): void {
        emit("onChange", {
            ...params.value,
            text: { ...params.value.text, fontStyle: value },
        });
    },
});

const textDecoration = computed<TextDecoration>({
    get() {
        return params.value.text.textDecoration;
    },
    set(value: TextDecoration): void {
        emit("onChange", {
            ...params.value,
            text: { ...params.value.text, textDecoration: value },
        });
    },
});

const btnWidth = computed<WidthType>({
    get() {
        return params.value.widthType;
    },
    set(value: WidthType): void {
        emit("onChange", { ...params.value, widthType: value });
    },
});

const btnColor = computed<Color>({
    get() {
        return params.value.background.value;
    },
    set(value: Color): void {
        emit("onChange", {
            ...params.value,
            background: { ...params.value.background, value: value },
        });
    },
});

const isFilled = computed<boolean>({
    get() {
        return params.value.background.enabled;
    },
    set(value: boolean): void {
        emit("onChange", {
            ...params.value,
            background: { ...params.value.background, enabled: value },
        });
    },
});

const borderRadius = computed<BorderRadius>({
    get() {
        return params.value.borderRadius.value;
    },
    set(value: BorderRadius): void {
        emit("onChange", {
            ...params.value,
            borderRadius: { ...params.value.borderRadius, value: value },
        });
    },
});

const isBorderRadius = computed<boolean>({
    get() {
        return params.value.borderRadius.enabled;
    },
    set(value: boolean): void {
        emit("onChange", {
            ...params.value,
            borderRadius: { ...params.value.borderRadius, enabled: value },
        });
    },
});

const isBorder = computed<boolean>({
    get() {
        return params.value.border.enabled;
    },
    set(value: boolean): void {
        emit("onChange", {
            ...params.value,
            border: { ...params.value.border, enabled: value },
        });
    },
});

const borderWidth = computed<number>({
    get() {
        return params.value.border.borderWidth;
    },
    set(value: number): void {
        const tmp = params.value;
        tmp.border.borderWidth = value;
    },
});

const borderColor = computed<Color>({
    get() {
        return params.value.border.borderColor;
    },
    set(value: Color): void {
        emit("onChange", {
            ...params.value,
            border: { ...params.value.border, borderColor: value },
        });
    },
});

const isShadow = computed<boolean>({
    get() {
        return params.value.shadow.enabled;
    },
    set(value: boolean): void {
        emit("onChange", {
            ...params.value,
            shadow: { ...params.value.shadow, enabled: value },
        });
    },
});

const shadowValue = computed<Shadow>({
    get() {
        return params.value.shadow.value;
    },
    set(value: Shadow): void {
        emit("onChange", {
            ...params.value,
            shadow: { ...params.value.shadow, value: value },
        });
    },
});

const isIcon = computed<boolean>({
    get() {
        return params.value.icon.enabled;
    },
    set(value: boolean): void {
        emit("onChange", {
            ...params.value,
            icon: { ...params.value.icon, enabled: value },
        });
    },
});

const iconPath = computed<string>({
    get() {
        return params.value.icon.path;
    },
    set(value: string): void {
        emit("onChange", {
            ...params.value,
            icon: { ...params.value.icon, path: value },
        });
    },
});

const iconSize = computed<number>({
    get() {
        return params.value.icon.size;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            icon: { ...params.value.icon, size: value },
        });
    },
});

const iconPosition = computed<ButtonIconPosition>({
    get() {
        return params.value.icon.position;
    },
    set(value: ButtonIconPosition): void {
        emit("onChange", {
            ...params.value,
            icon: { ...params.value.icon, position: value },
        });
    },
});

const horizontalSize = computed<number>({
    get() {
        return params.value.size.padding.horizontal;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            size: {
                ...params.value.size,
                padding: { ...params.value.size.padding, horizontal: value },
            },
        });
    },
});

const verticalSize = computed<number>({
    get() {
        return params.value.size.padding.vertical;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            size: {
                ...params.value.size,
                padding: { ...params.value.size.padding, vertical: value },
            },
        });
    },
});

const mobileEnabled = computed<boolean>({
    get() {
        return params.value.mobile.enabled;
    },
    set(value: boolean): void {
        emit("onChange", {
            ...params.value,
            mobile: { ...params.value.mobile, enabled: value },
        });
    },
});

const mobileTextColor = computed<Color>({
    get() {
        return params.value.mobile.text.color;
    },
    set(value: Color): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                text: { ...params.value.mobile.text, color: value },
            },
        });
    },
});

const mobileFontSize = computed<number>({
    get() {
        return params.value.mobile.text.fontSize;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                text: { ...params.value.mobile.text, fontSize: value },
            },
        });
    },
});

const mobileFontWeight = computed<number>({
    get() {
        return params.value.mobile.text.fontWeight;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                text: { ...params.value.mobile.text, fontWeight: value },
            },
        });
    },
});

const mobileLineHeight = computed<number>({
    get() {
        return params.value.mobile.text.lineHeight;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                text: { ...params.value.mobile.text, lineHeight: value },
            },
        });
    },
});

const mobileLetterSpacing = computed<number>({
    get() {
        return params.value.mobile.text.letterSpacing;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                text: { ...params.value.mobile.text, letterSpacing: value },
            },
        });
    },
});

const mobileFontStyle = computed<string>({
    get() {
        return params.value.mobile.text.fontStyle;
    },
    set(value: string): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                text: { ...params.value.mobile.text, fontStyle: value },
            },
        });
    },
});

const mobileTextDecoration = computed<TextDecoration>({
    get() {
        return params.value.mobile.text.textDecoration;
    },
    set(value: TextDecoration): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                text: { ...params.value.mobile.text, textDecoration: value },
            },
        });
    },
});

const mobileHorizontalSize = computed<number>({
    get() {
        return params.value.mobile.size.padding.horizontal;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                size: {
                    ...params.value.mobile.size,
                    padding: {
                        ...params.value.mobile.size.padding,
                        horizontal: value,
                    },
                },
            },
        });
    },
});

const mobileVerticalSize = computed<number>({
    get() {
        return params.value.mobile.size.padding.vertical;
    },
    set(value: number): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                size: {
                    ...params.value.mobile.size,
                    padding: {
                        ...params.value.mobile.size.padding,
                        vertical: value,
                    },
                },
            },
        });
    },
});

const mobileBtnWidth = computed<WidthType>({
    get() {
        return params.value.mobile.widthType;
    },
    set(value: WidthType): void {
        emit("onChange", {
            ...params.value,
            mobile: {
                ...params.value.mobile,
                widthType: value,
            },
        });
    },
});

//
const changeShadowValue = function (value: Shadow): void {
    emit("onChange", {
        ...params.value,
        shadow: {
            ...params.value.shadow,
            value: value,
        },
    });
};
const changeBorderWidth = function (value: number) {
    emit("onChange", {
        ...params.value,
        border: {
            ...params.value.border,
            borderWidth: value,
        },
    });
};
const changeIconSize = function (value: number) {
    emit("onChange", {
        ...params.value,
        icon: {
            ...params.value.icon,
            size: value,
        },
    });
};
</script>
<style lang="scss" scoped></style>
