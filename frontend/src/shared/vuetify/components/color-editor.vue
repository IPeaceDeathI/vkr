<!-- TODO добавить валидацию  на прозрачность и цвет-->
<template>
    <div class="editor-wrapper">
        <v-text-field
            variant="outlined"
            maxlength="7"
            v-model="colorBuffer"
            density="compact"
            class="noks-color-editor"
            :suffix="!isOpacity ? opacity + '%' : undefined"
            :disabled="isDisabled"
            ><!-- 
            v-model="colorText"
         -->
            <template v-slot:prepend-inner="{}">
                <div style="width: 25px">
                    <v-btn
                        elevation="0"
                        size="small"
                        height="25px"
                        rounded="xs"
                        block
                        :style="
                            color !== 'auto'
                                ? 'background: ' + color
                                : 'background: #4444444d'
                        "
                        @click="callColorPicker"
                    >
                        <v-icon size="large" :color="contrClr || '#ffffff'">
                            <!-- 
                            :color="isBright ? 'black' : 'white'"
                         -->
                            mdi-palette
                        </v-icon>
                    </v-btn>
                    <colorPicker
                        v-if="showPicker"
                        :auto-color="auto"
                        v-model="showPicker"
                        v-model:initialColor="color"
                        v-model:gradColor="color"
                    ></colorPicker>
                </div>
            </template>
        </v-text-field>
    </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { colorPicker } from "@/shared/libs/color-picker";
import { Color, ContrastColor } from "@/types";
import { getContrastColor } from "@/shared/helpers";
export default defineComponent({
    name: "v-color-edior",
    components: { colorPicker },
    props: {
        modelValue: {
            type: String as PropType<Color>,
            required: true,
        },
        autoColor: {
            type: Boolean,
            required: true,
        },
        isDisabled: {
            type: Boolean,
        },
    },
    emits: {
        "update:model-value": function (val: Color) {
            return true;
        },
        contrastColor: function (val: ContrastColor) {
            return val;
        },
    },
    methods: {
        callColorPicker() {
            // const tmp = this.$refs.clickTarget as HTMLFormElement;
            // tmp.click();
            this.showPicker = true;
        },
    },
    data() {
        return {
            showPicker: false as boolean,
            opacityVal: "" as string,
            contrClr: "#" as Color,
            auto: this.autoColor as boolean,
        };
    },
    mounted() {
        if (this.autoColor && this.modelValue == "auto") {
            this.isOpacity = true;
        }
        this.contrClr = getContrastColor(this.color);
    },
    computed: {
        isOpacity: {
            get() {
                return this.auto;
            },
            set(value: boolean) {
                this.auto = value;
            },
        },
        color: {
            get() {
                return this.modelValue;
            },
            set(value: Color) {
                this.$emit("update:model-value", value);
                if (value === "auto") {
                    if (!this.autoColor) {
                        this.contrClr = ContrastColor.dark;
                        this.$emit("contrastColor", ContrastColor.dark);
                    }
                } else if (value.match("linear-gradient")) {
                    const point1 =
                        value.substring(
                            value.indexOf(",") + 2,
                            value.indexOf(")") - 3
                        ) + ")";
                    const tmp = value.substring(value.indexOf("%"));
                    const point2 =
                        tmp.substring(tmp.indexOf("r"), tmp.indexOf(")") - 3) +
                        ")";
                    let tmpContrastColor = "#ffffff" as Color;
                    if (
                        getContrastColor(point1) == getContrastColor(point2) &&
                        getContrastColor(point1) == "#000000"
                    ) {
                        tmpContrastColor = "#000000" as Color;
                    }
                    this.contrClr = tmpContrastColor;
                    this.$emit("contrastColor", ContrastColor.light);
                } else {
                    const res =
                        getContrastColor(value) === "#000000"
                            ? ContrastColor.dark
                            : ContrastColor.light;
                    this.contrClr = res;
                    this.$emit("contrastColor", res);
                }
            },
        },
        colorBuffer: {
            get() {
                if (this.color.match("gradient")) {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.isOpacity = true;
                    return "gradient";
                } else if (this.color.match("auto")) {
                    return "auto";
                } else {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.isOpacity = false;
                    if (this.color.length > 7) {
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.opacity = this.color.substring(7, 9);
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        const tmpColor = this.color.substring(0, 7) as Color;
                        return tmpColor;
                    } else {
                        return this.color;
                    }
                }
            },
            set(value: Color | "") {
                if (
                    (value.match("#") &&
                        value !== "" &&
                        value !== "#" &&
                        value.length <= 7) ||
                    value === "auto"
                ) {
                    this.$emit("update:model-value", value);
                    setTimeout(() => {
                        if (this.color == "auto") {
                            this.auto = true;
                        } else {
                            this.auto = false;
                        }
                    }, 0);
                } else if (value.match("#") && value.length > 7) {
                    this.$emit(
                        "update:model-value",
                        value.substring(0, 7) as Color
                    );
                    this.opacityVal = value.substring(7, 9);
                } else if (value == "") {
                    this.$emit("update:model-value", "#aaaaaa");
                }
            },
        },
        contrastColor: function () {
            if (this.color === "auto") {
                if (!this.autoColor) {
                    this.$emit("contrastColor", ContrastColor.dark);
                    return "#000000" as Color;
                } else return false;
            } else if (this.color.match("linear-gradient")) {
                const point1 =
                    this.color.substring(
                        this.color.indexOf(",") + 2,
                        this.color.indexOf(")") - 3
                    ) + ")";
                const tmp = this.color.substring(this.color.indexOf("%"));
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
                    getContrastColor(this.color) === "#000000"
                        ? ContrastColor.dark
                        : ContrastColor.light;
                this.$emit("contrastColor", res);
                return res;
            }
        },
        opacity: {
            get() {
                if (this.opacityVal !== "") {
                    return Math.round(
                        parseInt(this.opacityVal, 16) / 2.55
                    ) as unknown as string;
                } else {
                    return "100";
                }
            },
            set(value: string) {
                this.opacityVal = value;
            },
        },
    },
});
</script>
<style scoped>
.editor-wrapper {
    position: relative;
    width: 155px;
}

.opacity-wrapper {
    width: 25px;
    position: absolute;
    right: 30px;
    z-index: calc(var(--base-z-index, 0) + 10000);
    bottom: 10px;
    display: flex;
    opacity: 0.7;
}

.opacity-wrapper input {
    outline: none;
}

.opacity-wrapper input::-webkit-outer-spin-button,
.opacity-wrapper input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}

.opacity-wrapper input[type="number"] {
    -moz-appearance: textfield;
}

.hidden-input-color {
    width: 0px;
    height: 0px;
    opacity: 0;
    position: absolute;
}
</style>
