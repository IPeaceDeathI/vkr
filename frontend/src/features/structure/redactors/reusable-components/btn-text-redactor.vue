<template>
    <div>
        <div>
            <v-label
                :class="
                    'font-weight-bold' +
                    (isDisabled === true ? ' text-primary-darken-1' : '')
                "
                >Текст</v-label
            >
        </div>
        <div class="pt-2 pl-0 justify-space-between d-flex">
            <color-editor
                v-model:model-value="color"
                :auto-color="true"
                :isDisabled="isDisabled"
            />
            <v-text-field
                suffix="px"
                v-model="size"
                type="number"
                style="max-width: 140px"
                :disabled="isDisabled"
            >
                <template v-slot:prepend-inner>
                    <v-icon icon="mdi-format-size" size="small" />
                </template>
            </v-text-field>
            <v-select
                v-model="weight"
                single-line
                :items="weights"
                item-value="value"
                hide-details
                variant="outlined"
                density="compact"
                color="primary-darken-2"
                style="max-width: 140px"
                :disabled="isDisabled"
            >
                <template v-slot:prepend-inner>
                    <v-label
                        style="
                            font-size: 17px;
                            font-weight: 500;
                            padding-bottom: 2px;
                        "
                    />
                </template>
                <template v-slot:item="{ props, item }">
                    <v-list-item
                        v-bind="props"
                        :title="item.title"
                        :value="item.value"
                    >
                        <template v-slot:prepend>
                            <div
                                :style="{
                                    fontWeight: item.value,
                                    marginRight: '5px',
                                    fontSize: '20px',
                                }"
                            >
                                T
                            </div>
                        </template>
                    </v-list-item>
                </template></v-select
            >
            <v-btn
                class="pa-0 mr-2"
                minWidth="36px"
                minHeight="36px"
                variant="outlined"
                color="primary-darken-1"
                flat
                :disabled="isDisabled"
            >
                <v-icon color="primary-darken-5" icon="mdi-cog" />
                <v-menu
                    activator="parent"
                    max-width="500px"
                    max-height="500px"
                    :close-on-content-click="false"
                    location="start top"
                    :disabled="isDisabled"
                >
                    <v-sheet>
                        <v-redactor-container>
                            <div class="ma-0">
                                <v-col cols="12" class="ma-0">
                                    <v-label
                                        class="font-weight-bold text-body-2 mb-2 text-secondary"
                                        >Цвет текста</v-label
                                    >
                                    <color-editor
                                        v-model:model-value="color"
                                        :auto-color="true"
                                    />
                                </v-col>
                            </div>
                            <div class="ma-0 d-flex">
                                <v-col cols="6">
                                    <v-label
                                        class="font-weight-bold text-body-2 mb-2 text-secondary"
                                    >
                                        Размер</v-label
                                    >
                                    <v-text-field
                                        suffix="px"
                                        v-model="size"
                                        type="number"
                                        style="width: 100%; max-width: 120px"
                                        variant="outlined"
                                        density="compact"
                                    />
                                </v-col>
                                <v-col cols="6">
                                    <v-label
                                        class="font-weight-bold text-body-2 mb-2 text-secondary"
                                        >Высота строки</v-label
                                    >
                                    <v-text-field
                                        suffix="%"
                                        v-model="line"
                                        type="number"
                                        variant="outlined"
                                        density="compact"
                                        style="width: 100%; max-width: 120px"
                                    />
                                </v-col>
                            </div>
                            <div class="ma-0 d-flex">
                                <v-col cols="6">
                                    <v-label
                                        class="font-weight-bold text-body-2 mb-2 text-secondary"
                                    >
                                        Толщина шрифта</v-label
                                    >
                                    <v-select
                                        v-model="weight"
                                        single-line
                                        :items="weights"
                                        item-value="value"
                                        hide-details
                                        variant="outlined"
                                        density="compact"
                                        style="width: 100%; max-width: 120px"
                                    >
                                        <template v-slot:item="{ props, item }">
                                            <v-list-item
                                                v-bind="props"
                                                :title="item.title"
                                                :value="item.value"
                                            >
                                                <template v-slot:prepend>
                                                    <div
                                                        :style="{
                                                            fontWeight:
                                                                item.value,
                                                            marginRight: '5px',
                                                            fontSize: '20px',
                                                        }"
                                                    >
                                                        T
                                                    </div>
                                                </template>
                                            </v-list-item>
                                        </template></v-select
                                    >
                                </v-col>
                                <v-col cols="6">
                                    <v-label
                                        class="font-weight-bold text-body-2 mb-2 text-secondary"
                                        >Межбукв. инт.</v-label
                                    >
                                    <v-text-field
                                        suffix="px"
                                        v-model="space"
                                        type="number"
                                        variant="outlined"
                                        density="compact"
                                        style="width: 100%; max-width: 120px"
                                    />
                                </v-col>
                            </div>
                            <div v-if="decoration !== undefined">
                                <v-col>
                                    <v-btn-group
                                        density="compact"
                                        color="primary-darken-1"
                                        style="min-width: 120px"
                                    >
                                        <v-btn
                                            :active="!!fontStyle"
                                            @click="style = 'italic'"
                                            flat
                                            size="small"
                                            style="min-width: 40px"
                                        >
                                            <v-icon
                                                size="medium"
                                                icon="mdi-format-italic"
                                            />
                                        </v-btn>
                                        <v-btn
                                            :active="isOverline"
                                            @click="
                                                decoration =
                                                    typeTextDecoration.overline
                                            "
                                            flat
                                            size="small"
                                            style="min-width: 40px"
                                        >
                                            <v-icon
                                                size="small"
                                                icon="mdi-format-strikethrough-variant"
                                            />
                                        </v-btn>
                                        <v-btn
                                            :active="isUnderline"
                                            @click="
                                                decoration =
                                                    typeTextDecoration.underline
                                            "
                                            flat
                                            size="small"
                                            style="min-width: 40px"
                                        >
                                            <v-icon
                                                size="medium"
                                                icon="mdi-format-underline"
                                            />
                                        </v-btn>
                                    </v-btn-group>
                                </v-col>
                            </div>
                        </v-redactor-container>
                    </v-sheet>
                </v-menu>
            </v-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import colorEditor from "@/shared/vuetify/components/color-editor.vue";
import { Color, TextDecoration } from "@/types";

export default defineComponent({
    props: {
        textColor: { type: String as PropType<Color>, required: true },
        fontSize: { type: Number, required: true },
        fontWeight: { type: Number, required: true },
        lineHeight: { type: Number, required: true },
        letterSpacing: { type: Number, required: true },
        fontStyle: { type: String, required: true },
        textDecoration: {
            type: String as PropType<TextDecoration>,
        },
        isDisabled: { type: Boolean },
        maxTextSize: {
            type: Number,
            default: 200,
        },
        minTextSize: {
            type: Number,
            default: 8,
        },
        maxLetterSpace: {
            type: Number,
            default: 50,
        },
        minLetterSpace: {
            type: Number,
            default: 0,
        },
        maxLineHeight: {
            type: Number,
            default: 400,
        },
        minLineHeight: {
            type: Number,
            default: 50,
        },
    },
    emits: {
        "update:text-color": function (value: Color) {
            return true;
        },
        "update:font-size": function (value: number) {
            return true;
        },
        "update:font-weight": function (value: number) {
            return true;
        },
        "update:line-height": function (value: number) {
            return true;
        },
        "update:letter-spacing": function (value: number) {
            return true;
        },
        "update:font-style": function (value: string) {
            return true;
        },
        "update:text-decoration": function (value: TextDecoration) {
            return true;
        },
    },
    components: {
        colorEditor,
    },
    data() {
        return {
            weights: [
                {
                    title: 300,
                    value: 300,
                },
                {
                    title: 400,
                    value: 400,
                },
                {
                    title: 500,
                    value: 500,
                },
                {
                    title: 700,
                    value: 700,
                },
            ],
            typeTextDecoration: {
                underline: TextDecoration.underline,
                overline: TextDecoration.overline,
                underAndOver: TextDecoration.underAndOver,
                none: TextDecoration.none,
            },
        };
    },
    computed: {
        color: {
            get() {
                return this.textColor;
            },
            set(value: Color) {
                this.$emit("update:text-color", value);
            },
        },
        size: {
            get() {
                return this.fontSize;
            },
            set(value: number) {
                value =
                    value > this.maxTextSize
                        ? this.maxTextSize
                        : value < this.minTextSize
                        ? this.minTextSize
                        : value;
                this.$emit("update:font-size", value);
            },
        },
        weight: {
            get() {
                return this.fontWeight;
            },
            set(value: number) {
                this.$emit("update:font-weight", value);
            },
        },
        line: {
            get() {
                return this.lineHeight;
            },
            set(value: number) {
                value =
                    value > this.maxLineHeight
                        ? this.maxLineHeight
                        : value < this.minLineHeight
                        ? this.minLineHeight
                        : value;
                this.$emit("update:line-height", value);
            },
        },
        space: {
            get() {
                return this.letterSpacing;
            },
            set(value: number) {
                value =
                    value > this.maxLetterSpace
                        ? this.maxLetterSpace
                        : value < this.minLetterSpace
                        ? this.minLetterSpace
                        : value;
                this.$emit("update:letter-spacing", value);
            },
        },
        style: {
            get() {
                return this.fontStyle;
            },
            set(value: string) {
                this.style.includes(value)
                    ? this.$emit("update:font-style", "")
                    : this.$emit("update:font-style", value);
            },
        },
        decoration: {
            get() {
                return this.textDecoration;
            },
            set(value: TextDecoration) {
                const isUnderline = value === TextDecoration.underline;
                switch (this.textDecoration) {
                    case TextDecoration.none:
                        this.$emit("update:text-decoration", value);
                        break;
                    case TextDecoration.overline:
                        isUnderline
                            ? this.$emit(
                                  "update:text-decoration",
                                  TextDecoration.underAndOver
                              )
                            : this.$emit(
                                  "update:text-decoration",
                                  TextDecoration.none
                              );
                        break;
                    case TextDecoration.underline:
                        !isUnderline
                            ? this.$emit(
                                  "update:text-decoration",
                                  TextDecoration.underAndOver
                              )
                            : this.$emit(
                                  "update:text-decoration",
                                  TextDecoration.none
                              );
                        break;
                    case TextDecoration.underAndOver:
                        isUnderline
                            ? this.$emit(
                                  "update:text-decoration",
                                  TextDecoration.overline
                              )
                            : this.$emit(
                                  "update:text-decoration",
                                  TextDecoration.underline
                              );
                        break;
                    default:
                        break;
                }
            },
        },
        isOverline() {
            return (
                this.decoration === TextDecoration.overline ||
                this.decoration === TextDecoration.underAndOver
            );
        },
        isUnderline() {
            return (
                this.decoration === TextDecoration.underline ||
                this.decoration === TextDecoration.underAndOver
            );
        },
    },
    methods: {},
});
</script>
<style lang="scss" scoped></style>
