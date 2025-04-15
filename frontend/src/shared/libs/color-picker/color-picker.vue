<template>
    <v-menu activator="parent" min-width="25px" :close-on-content-click="false">
        <div
            class="clrpickrSizer"
            :class="{ 'auto-color': autoColor }"
            style="position: relative; width: 276px; height: auto"
        >
            <ColorPicker
                lang="En"
                is-widget
                format="hex8"
                use-type="both"
                v-model:pureColor="pureColor"
                v-model:gradientColor="gradientColor"
                picker-type="chrome"
                round-history
                v-on:pureColorChange="
                    () => {
                        // bgColor = val;
                    }
                "
                v-on:gradientColorChange="
                    () => {
                        // bgColor = val;
                    }
                "
            >
            </ColorPicker>
            <v-icon v-if="isEyeDropper" class="eyeDropper" @click="eyeDrop()"
                >mdi-eyedropper</v-icon
            >
            <v-icon v-if="autoColor" class="autoColor" @click="autoColorIcon()"
                >mdi-invert-colors</v-icon
            >
        </div>
    </v-menu>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import "./style.css";
import { ColorPicker } from "vue3-colorpicker";
import { getContrastColor } from "@/shared/helpers/helpers";
import { ColorInputWithoutInstance } from "tinycolor2";

import { Color, ContrastColor } from "@/types";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { CommonError } from "@/shared/services/error_service";
export default defineComponent({
    name: "color-picker",
    components: {
        ColorPicker,
    },
    props: {
        modelValue: {
            type: Boolean,
        },
        initialColor: { type: String as PropType<ColorInputWithoutInstance> },
        gradColor: { type: String as PropType<ColorInputWithoutInstance> },
        autoColor: { type: Boolean, required: true },
    },
    emits: {
        "update:model-value": function (val: boolean) {
            return true;
        },
        "update:initialColor": function (val: Color) {
            return val;
        },
        "update:gradColor": function (val: Color) {
            return val;
        },
        contrastColor: function (val: ContrastColor) {
            return val;
        },
    },
    data() {
        return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            isEyeDropper: !!window.EyeDropper,
        };
    },
    computed: {
        isAutoColor: function () {
            if (!this.autoColor) {
                // НЕ РАБОТАЕТ потому что при поиске в DOM дереве элемента .vc-alpha-slider[data-v-18925ba6] в нем еще нет
                // const colorBar = document.querySelector(
                //     ".vc-alpha-slider[data-v-18925ba6]"
                // ) as HTMLElement;
                // colorBar.style.width = "90%";
            }
            return this.autoColor;
        },
        contrastColor: function () {
            const color = this.initialColor as Color;
            if (color === "auto") {
                this.$emit("contrastColor", ContrastColor.dark);
                return "#000000" as Color;
            } else if (color.match("linear-gradient")) {
                const point1 =
                    color.substring(
                        color.indexOf(",") + 2,
                        color.indexOf(")") - 3
                    ) + ")";
                const tmp = color.substring(color.indexOf("%"));
                const point2 =
                    tmp.substring(tmp.indexOf("r"), tmp.indexOf(")") - 3) + ")";
                let tmpContrastColor = "#ffffff" as Color;
                if (
                    getContrastColor(point1) == getContrastColor(point2) &&
                    getContrastColor(point1) == "#000000"
                ) {
                    tmpContrastColor = "#000000" as Color;
                }
                this.$emit("contrastColor", ContrastColor.light);
                return tmpContrastColor;
            } else {
                const res =
                    getContrastColor(color) === "#000000"
                        ? ContrastColor.dark
                        : ContrastColor.light;
                this.$emit("contrastColor", res);
                return res;
            }
        },
        showPicker: {
            get() {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
        pureColor: {
            get() {
                return this.initialColor;
            },
            set(value: Color) {
                this.$emit("update:initialColor", value);
            },
        },
        gradientColor: {
            get() {
                return this.gradColor as Color;
            },
            set(value: Color) {
                this.$emit("update:gradColor", value);
            },
        },
    },
    methods: {
        closeRedactor() {
            this.showPicker = false;
        },
        autoColorIcon() {
            if (this.autoColor) {
                this.pureColor = "auto";
            } else return;
        },
        eyeDrop() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            if (!window.EyeDropper) {
                alert("Your browser does not support this feature");
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // eslint-disable-next-line
            const eyeDropper = new EyeDropper();
            eyeDropper
                .open()
                .then((res: { sRGBHex: string }) => {
                    const tmpSizer = document.querySelector(
                        ".clrpickrSizer"
                    ) as HTMLElement;
                    if (tmpSizer.offsetHeight <= 333) {
                        this.pureColor = res.sRGBHex as Color;
                    } else if (tmpSizer.offsetHeight > 333) {
                        const tmpGradientStop = document.querySelector(
                            ".vc-gradient__stop--current"
                        ) as HTMLElement;
                        if (tmpGradientStop.getAttribute("title") == "Start") {
                            //linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)
                            const substr = this.gradientColor?.substring(
                                this.gradientColor.indexOf(",") + 2,
                                this.gradientColor.indexOf(")") + 1
                            );
                            // const pattern = /rgba\(\d+, \d+, \d+, \d+\)/;

                            const r = parseInt(res.sRGBHex.slice(1, 3), 16);
                            const g = parseInt(res.sRGBHex.slice(3, 5), 16);
                            const b = parseInt(res.sRGBHex.slice(5, 7), 16);
                            const hex2rgb =
                                "rgba(" + r + ", " + g + ", " + b + ")";

                            if (substr) {
                                const result = this.gradientColor?.replace(
                                    substr,
                                    hex2rgb
                                ) as Color;
                                this.gradientColor = result as Color;
                            }
                        } else if (
                            tmpGradientStop.getAttribute("title") == "End"
                        ) {
                            //linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)
                            const substr1 = this.gradientColor?.substring(
                                this.gradientColor.indexOf("%")
                                // this.gradientColor.indexOf("rgba") - 2
                            );
                            if (substr1) {
                                const substr2 = substr1.substring(
                                    substr1.indexOf("r"),
                                    substr1.indexOf(")") + 1
                                );
                                const r = parseInt(res.sRGBHex.slice(1, 3), 16);
                                const g = parseInt(res.sRGBHex.slice(3, 5), 16);
                                const b = parseInt(res.sRGBHex.slice(5, 7), 16);
                                const hex2rgb =
                                    "rgba(" + r + ", " + g + ", " + b + ")";

                                if (substr2) {
                                    const result = this.gradientColor?.replace(
                                        substr2,
                                        hex2rgb
                                    );
                                    this.gradientColor = result as Color;
                                }
                            }
                        }
                    }
                })
                .catch((err: any) => {
                    throw new CommonError({
                        bundle: "not structure error",
                        message: "Пипетка не поддерживается браузером",
                    });
                });
        },
    },
});
</script>
<style lang="scss">
.auto-color .vc-alpha-slider {
    width: 75% !important;
}
.vc-alpha-slider {
    width: 88% !important;
}
</style>
