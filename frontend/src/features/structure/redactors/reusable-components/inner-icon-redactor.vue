<template>
    <div>
        <div>
            <v-switch label="Иконка" v-model="iconEnabled" />
        </div>
        <div v-if="iconEnabled" class="pt-2 pl-0 d-flex">
            <v-btn
                @click="iconActive = true"
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
                    <use :href="`${iconPath}`" />
                </svg>
                <icon-gallery v-model="iconActive" @iconSelected="setPath" />
            </v-btn>
            <v-btn
                @click="iconChangeActive = true"
                color="primary-darken-1"
                minHeight="36px"
                flat
            >
                Выбрать
                <icon-gallery
                    v-model="iconChangeActive"
                    @iconSelected="setPath"
                />
            </v-btn>
            <btn-slider
                v-model="size"
                @on-change="changeSize"
                :max="36"
                :min="10"
                :step="1"
                style="height: 36px"
                class="mx-3"
            >
                <template v-slot:append>
                    <v-text-field
                        v-model="size"
                        suffix="px"
                        single-line
                        class="text-caption"
                        flat
                    />
                </template>
            </btn-slider>
            <v-btn-toggle
                mandatory
                v-model="position"
                style="height: 36px; max-width: 70px"
                variant="outlined"
            >
                <v-btn
                    value="left"
                    icon="mdi-arrow-collapse-left"
                    size="small"
                />
                <v-btn
                    value="right"
                    icon="mdi-arrow-collapse-right"
                    size="small"
                />
            </v-btn-toggle>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import iconGallery from "@/shared/libs/icon-gallery/icon-gallery.vue";
import { ButtonIconPosition } from "@/types";
import { PropType } from "vue";
import btnSlider from "./btn-slider.vue";

export default defineComponent({
    props: {
        isIcon: Boolean,
        iconSize: { type: Number, required: true },
        iconPosition: {
            type: String as PropType<ButtonIconPosition>,
            required: true,
        },
        iconPath: String,
        minSize: {
            type: Number,
            default: 10,
        },
        maxSize: {
            type: Number,
            default: 36,
        },
    },
    components: {
        iconGallery,
        btnSlider,
    },
    emits: {
        onChange: (value: number) => true,
        "update:is-icon": function (value: boolean) {
            return true;
        },
        "update:icon-path": function (value: string) {
            return true;
        },
        "update:icon-size": function (value: number) {
            return true;
        },
        "update:icon-position": function (value: ButtonIconPosition) {
            return true;
        },
    },
    data() {
        return {
            iconActive: false,
            iconChangeActive: false,
        };
    },
    computed: {
        iconEnabled: {
            get() {
                return this.isIcon;
            },
            set(value: boolean) {
                this.$emit("update:is-icon", value);
            },
        },
        path: {
            get() {
                return this.iconPath;
            },
            set(value: string) {
                this.$emit("update:icon-path", value);
            },
        },
        size: {
            get() {
                return this.iconSize;
            },
            set(value: number) {
                value =
                    value > this.maxSize
                        ? this.maxSize
                        : value < this.minSize
                        ? this.minSize
                        : value;
                this.$emit("update:icon-size", value);
            },
        },
        position: {
            get() {
                return this.iconPosition;
            },
            set(value: ButtonIconPosition) {
                this.$emit("update:icon-position", value);
            },
        },
    },
    methods: {
        setPath(path: string) {
            this.path = path;
        },
        changeSize(value: number) {
            this.$emit("onChange", value);
        },
    },
    watch: {},
});
</script>
<style lang="scss" scoped></style>
