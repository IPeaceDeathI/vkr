<template>
    <v-row>
        <v-col cols="5">
            <v-radio-group
                color="editor"
                class="window-position-selector"
                density="compact"
                v-model="windowPosition"
            >
                <div class="d-flex justify-space-between" style="width: 100%">
                    <v-radio :value="WindowPosition.tl" />
                    <v-radio :value="WindowPosition.t" />
                    <v-radio :value="WindowPosition.tr" />
                </div>
                <div class="d-flex justify-space-between" style="width: 100%">
                    <v-radio :value="WindowPosition.l" />
                    <v-radio :value="WindowPosition.c" />
                    <v-radio :value="WindowPosition.r" />
                </div>
                <div class="d-flex justify-space-between" style="width: 100%">
                    <v-radio :value="WindowPosition.bl" />
                    <v-radio :value="WindowPosition.b" />
                    <v-radio :value="WindowPosition.br" />
                </div>
            </v-radio-group>
        </v-col>
        <v-col cols="7">
            <div>
                <v-switch
                    v-model="stretchOnWidth"
                    label="Растянуть по ширине"
                />
            </div>
            <div>
                <v-switch
                    v-model="stretchOnHeight"
                    label="Растянуть по высоте"
                />
            </div>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <btn-slider
                :disabled="stretchOnWidth"
                v-model="width"
                @on-change="changeWidth"
                :max="1150"
                :min="150"
                :step="5"
                class="cols-slider"
            >
                <template v-slot:append>
                    <v-text-field
                        :model-value="width"
                        @update:model-value="changeWidth(parseInt($event))"
                        suffix="px"
                        single-line
                        class="text-caption"
                        type="number"
                        :style="{
                            maxWidth: '80px',
                        }"
                        flat
                    />
                </template>
            </btn-slider>
        </v-col>
        <v-col>
            <btn-slider
                v-model="minHeight"
                @on-change="changeMinHeight"
                :max="2000"
                :min="5"
                :step="10"
                class="cols-slider"
            >
                <template v-slot:append>
                    <v-text-field
                        :model-value="minHeight"
                        @update:model-value="changeMinHeight(parseInt($event))"
                        suffix="px"
                        single-line
                        class="text-caption"
                        type="number"
                        :style="{
                            maxWidth: '80px',
                        }"
                        flat
                    />
                </template>
            </btn-slider>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { ElementsJustify } from "@/types";
import { PropType } from "vue";
import { defineComponent } from "vue";
import { btnSlider } from "@/features/structure/redactors/reusable-components";

enum WindowPosition {
    t = "t",
    tr = "tr",
    tl = "tl",
    r = "r",
    c = "c",
    l = "l",
    b = "b",
    br = "br",
    bl = "bl",
}
type WindowPositionAdapter = {
    [key in WindowPosition]: {
        horizontalJustify: ElementsJustify;
        verticalJustify: ElementsJustify;
    };
};
const windowPositionAdapter: WindowPositionAdapter = {
    [WindowPosition.t]: {
        horizontalJustify: ElementsJustify.center,
        verticalJustify: ElementsJustify.start,
    },
    [WindowPosition.tr]: {
        horizontalJustify: ElementsJustify.end,
        verticalJustify: ElementsJustify.start,
    },
    [WindowPosition.tl]: {
        horizontalJustify: ElementsJustify.start,
        verticalJustify: ElementsJustify.start,
    },
    [WindowPosition.c]: {
        horizontalJustify: ElementsJustify.center,
        verticalJustify: ElementsJustify.center,
    },
    [WindowPosition.r]: {
        horizontalJustify: ElementsJustify.end,
        verticalJustify: ElementsJustify.center,
    },
    [WindowPosition.l]: {
        horizontalJustify: ElementsJustify.start,
        verticalJustify: ElementsJustify.center,
    },
    [WindowPosition.b]: {
        horizontalJustify: ElementsJustify.center,
        verticalJustify: ElementsJustify.end,
    },
    [WindowPosition.br]: {
        horizontalJustify: ElementsJustify.end,
        verticalJustify: ElementsJustify.end,
    },
    [WindowPosition.bl]: {
        horizontalJustify: ElementsJustify.start,
        verticalJustify: ElementsJustify.end,
    },
};
export interface LayoutProps {
    width: number;
    minHeight: { enabled: boolean; value: number; unit: "px" | "vh" };
    height: "auto" | "100%";
    stretchOnWidth: boolean;
    wrapperHorizontalJustify: ElementsJustify;
    wrapperVerticalJustify: ElementsJustify;
}
export default defineComponent({
    props: {
        modelValue: {
            type: Object as PropType<LayoutProps>,
            required: true,
        },
    },
    emits: {
        "update:model-value": (value: LayoutProps) => true,
        onChange: (value: LayoutProps) => true,
    },
    data() {
        return {
            WindowPosition: WindowPosition,
        };
    },
    components: {
        btnSlider,
    },
    computed: {
        windowPosition: {
            get(): WindowPosition | undefined {
                return (
                    Object.keys(windowPositionAdapter) as WindowPosition[]
                ).find((key) => {
                    return (
                        windowPositionAdapter[key].horizontalJustify ===
                            this.modelValue.wrapperHorizontalJustify &&
                        windowPositionAdapter[key].verticalJustify ===
                            this.modelValue.wrapperVerticalJustify
                    );
                });
            },
            set(value: WindowPosition) {
                const { horizontalJustify, verticalJustify } =
                    windowPositionAdapter[value];

                const tmp = this.modelValue;
                tmp.wrapperHorizontalJustify = horizontalJustify;
                tmp.wrapperVerticalJustify = verticalJustify;
                this.$emit("onChange", tmp);
            },
        },
        stretchOnWidth: {
            get(): boolean {
                return this.modelValue.stretchOnWidth;
            },
            set(value: boolean) {
                const tmp = this.modelValue;
                tmp.stretchOnWidth = value;
                this.$emit("onChange", tmp);
            },
        },
        stretchOnHeight: {
            get(): boolean {
                return this.modelValue.height === "100%";
            },
            set(value: boolean) {
                const tmp = this.modelValue;
                tmp.height = value === true ? "100%" : "auto";
                this.$emit("onChange", tmp);
            },
        },
        width: {
            get(): number {
                return this.modelValue.width;
            },
            set(value: number) {
                const tmp = this.modelValue;
                tmp.width = value;
                this.$emit("update:model-value", tmp);
            },
        },
        minHeight: {
            get(): number {
                return this.modelValue.minHeight.value;
            },
            set(value: number) {
                const tmp = this.modelValue;
                tmp.minHeight.value = value;
                this.$emit("update:model-value", tmp);
            },
        },
    },
    methods: {
        changeWidth(value: number) {
            const tmp = this.modelValue;
            tmp.width = value;
            this.$emit("onChange", tmp);
        },
        changeMinHeight(value: number) {
            const tmp = this.modelValue;
            tmp.minHeight.value = value;
            this.$emit("onChange", tmp);
        },
    },
});
</script>

<style scoped lang="scss">
.cols-slider {
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
</style>
