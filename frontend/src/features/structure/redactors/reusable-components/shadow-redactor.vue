<template>
    <div color="transparent">
        <div>
            <v-switch label="Тень" v-model="shadowEnabled" />
        </div>
        <div v-if="isShadow" align="center" class="pt-2 pl-0 d-flex">
            <v-btn-toggle
                style="width: 100%; gap: 5px; height: 50px"
                divided
                height="50px"
                selected-class="selected"
                mandatory
                v-model="presetValue"
            >
                <v-btn
                    class="shadow-preset-btn"
                    variant="plain"
                    value="1"
                    :flat="false"
                    :ripple="false"
                    ><template v-slot:default>
                        <div
                            class="shadow-preset-rect"
                            style="box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1)"
                        />
                    </template>
                </v-btn>
                <v-btn
                    class="shadow-preset-btn"
                    variant="plain"
                    value="2"
                    :flat="false"
                    :ripple="false"
                    ><template v-slot:default>
                        <div
                            class="shadow-preset-rect"
                            style="box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1)"
                        ></div>
                    </template>
                </v-btn>
                <v-btn
                    class="shadow-preset-btn"
                    variant="plain"
                    value="3"
                    :flat="false"
                    :ripple="false"
                    ><template v-slot:default>
                        <div
                            class="shadow-preset-rect"
                            style="box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1)"
                        ></div>
                    </template>
                </v-btn>
                <v-btn
                    class="shadow-preset-btn"
                    variant="plain"
                    value="settings"
                    :flat="false"
                    :ripple="false"
                    ><template v-slot:default>
                        <div
                            class="shadow-preset-rect"
                            style="box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1)"
                        >
                            <span class="mdi mdi-tune-variant" />
                        </div>
                        <v-menu
                            activator="parent"
                            open-on-click
                            :open-on-hover="false"
                            :close-on-content-click="false"
                            location="bottom right"
                        >
                            <v-sheet width="460">
                                <v-redactor-container>
                                    <div class="d-flex">
                                        <v-col cols="3">
                                            <v-sheet
                                                class="d-flex align-center flex-column"
                                            >
                                                <degree-picker
                                                    :incoming-degree="angle"
                                                    @on-input="inputAngle"
                                                    @on-change="changeShadow"
                                                ></degree-picker>
                                                <v-text-field
                                                    density="compact"
                                                    bg-color="primary-darken-1"
                                                    :model-value="angle"
                                                    @update:model-value="
                                                        changeAngle
                                                    "
                                                    type="number"
                                                    suffix="°"
                                                    single-line
                                                    class="text-caption mt-2"
                                                    max-width="60px"
                                                >
                                                </v-text-field>
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="9">
                                            <div>
                                                <v-col cols="12" class="pa-0">
                                                    <redactor-component-title
                                                        class="pb-2 text-body-2"
                                                        >Cдвиг</redactor-component-title
                                                    >
                                                    <btn-slider
                                                        v-model="shift"
                                                        @on-change="changeShift"
                                                        :max="25"
                                                        :min="0"
                                                        :step="1"
                                                    >
                                                        <template v-slot:append>
                                                            <v-text-field
                                                                v-model="shift"
                                                                suffix="px"
                                                                single-line
                                                                bg-color="primary-darken-1"
                                                                class="text-caption"
                                                                type="number"
                                                                :style="{
                                                                    maxWidth:
                                                                        '80px',
                                                                }"
                                                            />
                                                        </template>
                                                    </btn-slider>
                                                </v-col>
                                                <v-col cols="12" class="pa-0">
                                                    <redactor-component-title
                                                        class="pb-2 text-body-2"
                                                        >Размытие</redactor-component-title
                                                    >
                                                    <btn-slider
                                                        v-model="blur"
                                                        @on-change="changeBlur"
                                                        :max="25"
                                                        :min="0"
                                                        :step="1"
                                                    >
                                                        <template v-slot:append>
                                                            <v-text-field
                                                                density="compact"
                                                                bg-color="primary-darken-1"
                                                                v-model="blur"
                                                                suffix="px"
                                                                single-line
                                                                class="text-caption"
                                                                type="number"
                                                                max-width="80px"
                                                                :style="{
                                                                    maxWidth:
                                                                        '80px',
                                                                }"
                                                            />
                                                        </template>
                                                    </btn-slider>
                                                </v-col>
                                                <v-col cols="12" class="pa-0">
                                                    <redactor-component-title
                                                        class="pb-2 text-body-2"
                                                        >Цвет
                                                        тени</redactor-component-title
                                                    >
                                                    <color-editor
                                                        v-model:model-value="
                                                            color
                                                        "
                                                        :auto-color="false"
                                                    />
                                                </v-col>
                                            </div>
                                        </v-col>
                                    </div>
                                </v-redactor-container>
                            </v-sheet>
                        </v-menu>
                    </template>
                </v-btn>
            </v-btn-toggle>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Color, Shadow } from "@/types";
import { PropType } from "vue";
import colorEditor from "@/shared/vuetify/components/color-editor.vue";
import degreePicker from "@/shared/libs/degree-picker/degree-picker.vue";
import { cathetsToAngle, offsetToShift } from "@/shared/helpers";
import btnSlider from "./btn-slider.vue";

interface Offset {
    x: number;
    y: number;
}

export default defineComponent({
    props: {
        isShadow: Boolean,
        shadowValue: { type: Object as PropType<Shadow>, required: true },
        minBlur: {
            type: Number,
            default: 0,
        },
        maxBlur: {
            type: Number,
            default: 25,
        },
        minShift: {
            type: Number,
            default: 0,
        },
        maxShift: {
            type: Number,
            default: 25,
        },
    },
    components: {
        colorEditor,
        degreePicker,
        btnSlider,
    },
    emits: {
        "update:is-shadow": function (value: boolean) {
            return true;
        },
        "update:shadow-value": function (value: Shadow) {
            return true;
        },
        "change:shadow-value": function (value: Shadow) {
            return true;
        },
    },
    data() {
        return {
            showPicker: false,
            presetValue: "",
            firstPreset: {
                shift: 7,
                angle: 180,
                blur: 7,
                color: "#00000007",
            } as Shadow,
            secondPreset: {
                shift: 15,
                angle: 180,
                blur: 15,
                color: "#00000007",
            } as Shadow,
            thirdPreset: {
                shift: 20,
                angle: 180,
                blur: 20,
                color: "#00000007",
            } as Shadow,
            maxDegree: 360,
        };
    },
    computed: {
        shadowEnabled: {
            get() {
                return this.isShadow;
            },
            set(value: boolean) {
                this.$emit("update:is-shadow", value);
            },
        },
        shadow: {
            get() {
                return this.shadowValue;
            },
            set(shadowValue: Shadow) {
                this.$emit("update:shadow-value", shadowValue);
            },
        },
        shift: {
            get() {
                return this.shadow.shift;
            },
            set(value: number) {
                value = this.validateInput(value, this.maxShift, this.minShift);
                this.shadow = {
                    blur: this.blur,
                    shift: value,
                    angle: this.angle,
                    color: this.color,
                };
            },
        },
        angle: {
            get() {
                return this.shadow.angle;
            },
            set(value: number) {
                value = this.validateInput(value, this.maxDegree);
                this.shadow = {
                    blur: this.blur,
                    shift: this.shift,
                    angle: value,
                    color: this.color,
                };
            },
        },
        blur: {
            get() {
                return this.shadowValue.blur;
            },
            set(value: number) {
                value = this.validateInput(value, this.maxBlur, this.minBlur);
                this.shadow = {
                    blur: value,
                    shift: this.shift,
                    angle: this.angle,
                    color: this.color,
                };
            },
        },
        color: {
            get() {
                return this.shadowValue.color;
            },
            set(value: Color) {
                this.shadow = {
                    blur: this.blur,
                    shift: this.shift,
                    angle: this.angle,
                    color: value,
                };
                setTimeout(() => {
                    this.$emit("change:shadow-value", this.shadow);
                });
            },
        },
    },
    methods: {
        offsetToAngle(offset: Offset) {
            return cathetsToAngle(offset.x, offset.y);
        },
        offsetToShift(offset: Offset) {
            return offsetToShift(offset.x, offset.y);
        },
        inputAngle(val: number) {
            this.angle = val;
        },
        changeShadow() {
            setTimeout(() => {
                this.$emit("change:shadow-value", this.shadow);
            }, 0);
        },
        changeAngle(value: string) {
            this.angle = Number(value);

            this.changeShadow();
        },
        validateInput(value: number, maxValue: number, minValue = 0) {
            return !value
                ? minValue
                : value < minValue
                ? minValue
                : value > maxValue
                ? maxValue
                : value;
        },
        comapareObjects(firstObject: any, secondObject: any) {
            return Object.keys(firstObject).every(
                (k) => firstObject[k] === secondObject[k]
            );
        },
        changeShift(value: number) {
            this.$emit("change:shadow-value", this.shadow);
        },
        changeBlur(value: number) {
            this.$emit("change:shadow-value", this.shadow);
        },
    },
    watch: {
        presetValue(value: string) {
            switch (value) {
                case "1":
                    this.shadow = this.firstPreset;
                    break;
                case "2":
                    this.shadow = this.secondPreset;
                    break;
                case "3":
                    this.shadow = this.thirdPreset;
                    break;

                default:
                    this.presetValue = "settings";
                    break;
            }
        },
    },
    mounted() {
        this.presetValue = this.comapareObjects(
            this.shadowValue,
            this.firstPreset
        )
            ? "1"
            : this.comapareObjects(this.shadowValue, this.secondPreset)
            ? "2"
            : this.comapareObjects(this.shadowValue, this.thirdPreset)
            ? "3"
            : "settings";
    },
});
</script>
<style lang="scss" scoped>
.shadow-preset-btn {
    display: block;
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    flex-shrink: 0;
    background-color: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    &:hover .shadow-preset-rect {
        bottom: 15px;
    }
    &::before {
        content: "";
        position: absolute;
        display: block;
        width: 18px;
        height: 18px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiM0NzczRkYiIGN4PSIxMCIgY3k9IjEwIiByPSIxMCIvPjxwYXRoIGQ9Ik03LjcwNyAxMC4yOTNMNyA5LjU4NiA1LjU4NiAxMWwuNzA3LjcwNyAxLjQxNC0xLjQxNHpNOSAxM2wtLjcwNy43MDcuNzA3LjcwNy43MDctLjcwN0w5IDEzem01LjcwNy00LjI5M0wxNS40MTQgOCAxNCA2LjU4NmwtLjcwNy43MDcgMS40MTQgMS40MTR6bS04LjQxNCAzbDIgMiAxLjQxNC0xLjQxNC0yLTItMS40MTQgMS40MTR6bTMuNDE0IDJsNS01LTEuNDE0LTEuNDE0LTUgNSAxLjQxNCAxLjQxNHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4K);
        background-repeat: no-repeat;
        pointer-events: none;
        right: 8px;
        top: 8px;
        opacity: 0;
        z-index: calc(var(--base-z-index) + 1);
        transition: opacity 0.2s, transform 0.3s ease-out;
    }
    &.selected::before {
        opacity: 1;
    }
}
.shadow-preset-rect {
    position: relative;
    bottom: 10px;
    left: 16px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 6px;
    height: 34px;
    width: 100%;
    background: #fff;
    transition: bottom 0.2s ease;
}
</style>
