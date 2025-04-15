<template>
    <div>
        <div class="d-flex">
            <v-label
                :class="
                    'font-weight-bold' +
                    (isDisabled === true ? ' text-primary-darken-1' : '')
                "
                >Размер</v-label
            >
            <v-spacer />
            <v-btn
                variant="text"
                append-icon="mdi-chevron-down"
                color="secondary-lighten-3"
                :disabled="isDisabled"
            >
                Пресеты
                <v-menu
                    activator="parent"
                    open-on-click
                    :open-on-hover="false"
                    :close-on-content-click="false"
                    location="bottom right"
                    :disabled="isDisabled"
                >
                    <v-btn-toggle v-model="presetSize">
                        <v-btn size="30px" density="compact" value="small">
                            <v-icon size="x-small"> mdi-crop-square </v-icon>
                            <v-tooltip activator="parent" location="top"
                                >Маленький</v-tooltip
                            >
                        </v-btn>
                        <v-btn size="30px" density="compact" value="medium">
                            <v-icon size="medium"> mdi-crop-square </v-icon>
                            <v-tooltip activator="parent" location="top"
                                >Средний</v-tooltip
                            >
                        </v-btn>
                        <v-btn size="30px" density="compact" value="large">
                            <v-icon size="small"> mdi-crop-square </v-icon>
                            <v-tooltip activator="parent" location="top"
                                >Большой</v-tooltip
                            >
                        </v-btn>
                    </v-btn-toggle>
                </v-menu>
            </v-btn>
        </div>
        <div class="pt-2 pl-0 d-flex">
            <v-col cols="6" class="pa-0">
                <v-text-field
                    suffix="px"
                    v-model="hSize"
                    type="number"
                    class="mr-2"
                    :disabled="isDisabled"
                >
                    <template v-slot:prepend-inner>
                        <v-icon icon="mdi-arrow-split-vertical" size="small" />
                    </template>
                </v-text-field>
            </v-col>
            <v-col cols="6" class="pa-0">
                <v-text-field
                    suffix="px"
                    v-model="vSize"
                    type="number"
                    class="ml-2"
                    :disabled="isDisabled"
                >
                    <template v-slot:prepend-inner>
                        <v-icon
                            icon="mdi-arrow-split-horizontal"
                            size="small"
                        />
                    </template>
                </v-text-field>
            </v-col>
        </div>
        <div class="pt-1">
            <v-switch
                v-model="width"
                label="Растянуть по ширине"
                :disabled="isDisabled"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { WidthType } from "@/types";
import { defineComponent } from "vue";
import { PropType } from "vue";

type Sizes = "small" | "medium" | "large";

export default defineComponent({
    props: {
        buttonWidth: { type: String as PropType<WidthType>, required: true },
        horizontalSize: { type: Number, required: true },
        verticalSize: { type: Number, required: true },
        isDisabled: { type: Boolean },
        maxVerticalSize: {
            type: Number,
            default: 250,
        },
        minVerticalSize: {
            type: Number,
            default: 0,
        },
        maxHorizontalSize: {
            type: Number,
            default: 250,
        },
        minHorizontalSize: {
            type: Number,
            default: 0,
        },
    },
    emits: {
        "update:horizontal-size": function (value: number) {
            return true;
        },
        "update:vertical-size": function (value: number) {
            return true;
        },
        "update:button-width": function (value: WidthType) {
            return true;
        },
    },
    data() {
        return {
            isActive: false,
            presetSizes: {
                small: {
                    vertical: 10,
                    horizontal: 20,
                },
                medium: {
                    vertical: 12,
                    horizontal: 22,
                },
                large: {
                    vertical: 16,
                    horizontal: 30,
                },
            },
        };
    },
    computed: {
        width: {
            get() {
                return this.buttonWidth === WidthType.stretch ? true : false;
            },
            set(value: boolean) {
                this.$emit(
                    "update:button-width",
                    value ? WidthType.stretch : WidthType.auto
                );
            },
        },
        hSize: {
            get() {
                return this.horizontalSize;
            },
            set(value: number) {
                value =
                    value > this.maxHorizontalSize
                        ? this.maxHorizontalSize
                        : value < this.minHorizontalSize
                        ? this.minHorizontalSize
                        : value;
                this.$emit("update:horizontal-size", Number(value));
            },
        },
        vSize: {
            get() {
                return this.verticalSize;
            },
            set(value: number) {
                value =
                    value > this.maxVerticalSize
                        ? this.maxVerticalSize
                        : value < this.minVerticalSize
                        ? this.minVerticalSize
                        : value;
                this.$emit("update:vertical-size", Number(value));
            },
        },
        presetSize: {
            get() {
                return this.checkPresetSizes();
            },
            set(value: Sizes) {
                this.$emit(
                    "update:horizontal-size",
                    this.presetSizes[value].horizontal
                );
                this.$emit(
                    "update:vertical-size",
                    this.presetSizes[value].vertical
                );
                return value;
            },
        },
    },
    methods: {
        checkPresetSizes() {
            const keys = Object.keys(this.presetSizes) as Sizes[];
            return (
                keys.find((key: Sizes) => {
                    return (
                        this.presetSizes[key].horizontal === this.hSize &&
                        this.presetSizes[key].vertical === this.vSize
                    );
                }) || ""
            );
        },
    },
});
</script>
<style lang="scss" scoped></style>
