<template>
    <div>
        <div>
            <v-switch label="Обводка" v-model="borderEnabled" />
        </div>
        <div v-if="isBorder" align="center" class="d-flex pt-2">
            <color-editor v-model="borderColor" :auto-color="false" />
            <btn-slider
                v-model="borderWidth"
                @on-change="changeBorderWidth"
                :max="10"
                :min="1"
                :step="1"
                class="ml-3"
            >
                <template v-slot:append>
                    <v-text-field
                        v-model="borderWidth"
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
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Color } from "@/types";
import { PropType } from "vue";
import colorEditor from "@/shared/vuetify/components/color-editor.vue";
import btnSlider from "./btn-slider.vue";

export default defineComponent({
    props: {
        isBorder: Boolean,
        color: {
            type: String as PropType<Color>,
            required: true,
        },
        width: {
            type: Number,
            required: true,
        },
        minValue: {
            type: Number,
            default: 1,
        },
        maxValue: {
            type: Number,
            default: 10,
        },
    },
    emits: {
        "update:is-border": function (value: boolean) {
            return true;
        },
        onChange: (value: number) => true,
        "update:width": function (value: number) {
            return true;
        },
        "update:color": function (value: Color) {
            return true;
        },
    },
    components: {
        colorEditor,
        btnSlider,
    },
    data() {
        return {
            showPicker: false,
        };
    },
    computed: {
        borderEnabled: {
            get() {
                return this.isBorder;
            },
            set(value: boolean) {
                this.$emit("update:is-border", value);
            },
        },
        borderColor: {
            get() {
                return this.color;
            },
            set(value: Color) {
                this.$emit("update:color", value);
            },
        },
        borderWidth: {
            get() {
                return this.width;
            },
            set(value: number) {
                value =
                    value > this.maxValue
                        ? this.maxValue
                        : value < this.minValue
                        ? this.minValue
                        : value;
                this.$emit("update:width", value);
            },
        },
    },
    methods: {
        changeBorderWidth(value: number) {
            this.$emit("onChange", value);
        },
    },
});
</script>
<style lang="scss" scoped></style>
