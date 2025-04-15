<template>
    <div color="transparent">
        <div class="d-flex">
            <v-switch label="Скругление" v-model="borderEnabled" />
            <v-btn
                v-if="isBorderRadius"
                variant="text"
                append-icon="mdi-chevron-down"
                color="secondary-lighten-3"
            >
                Пресеты
                <v-menu
                    activator="parent"
                    open-on-click
                    :open-on-hover="false"
                    :close-on-content-click="false"
                    location="bottom right"
                >
                    <v-btn-toggle
                        v-model="presetRadius"
                        selected-class="selected"
                    >
                        <v-btn
                            size="30px"
                            density="compact"
                            value="5"
                            style="overflow: hidden; position: relative"
                        >
                            <div
                                class="preset-icon-container"
                                style="border-radius: 0px"
                            ></div>
                            <v-tooltip activator="parent" location="top"
                                >5px</v-tooltip
                            >
                        </v-btn>
                        <v-btn size="30px" density="compact" value="10">
                            <div
                                class="preset-icon-container"
                                style="border-radius: 5px"
                            ></div>
                            <v-tooltip activator="parent" location="top"
                                >10px</v-tooltip
                            >
                        </v-btn>
                        <v-btn size="30px" density="compact" value="50"
                            ><div
                                class="preset-icon-container"
                                style="border-radius: 50px"
                            ></div>
                            <v-tooltip activator="parent" location="top"
                                >50px</v-tooltip
                            >
                        </v-btn>
                    </v-btn-toggle>
                </v-menu>
            </v-btn>
        </div>
        <div v-if="borderEnabled" align="center" class="pt-2 pl-0 d-flex">
            <v-col cols="3" class="pa-0">
                <v-btn-toggle
                    density="comfortable"
                    variant="outlined"
                    v-model="toggleOne"
                    shaped
                    mandatory
                    class="mr-3"
                    style="width: auto !important"
                >
                    <v-btn :value="false">
                        <v-icon>mdi-crop-square</v-icon>
                    </v-btn>
                    <v-btn :value="true">
                        <v-icon>mdi-crop-free</v-icon>
                    </v-btn>
                </v-btn-toggle>
            </v-col>
            <v-col cols="9" class="pa-0 pl-2">
                <div v-if="!toggleOne" class="d-flex">
                    <v-text-field
                        v-model="oneBorderRadius"
                        type="number"
                        density="compact"
                        variant="outlined"
                        style="max-width: 80px"
                    />
                </div>
                <template v-else-if="toggleOne">
                    <div class="d-flex">
                        <v-col
                            height="38px"
                            cols="3"
                            class="pa-0"
                            v-for="(item, index) in iconsForBorderRadiuses"
                            :key="index"
                        >
                            <v-text-field
                                @update:model-value="borderRad = borderRad"
                                v-model="borderRad[item.key]"
                                type="number"
                                density="compact"
                                variant="outlined"
                                style="font-size: 10px"
                                class="mr-1"
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon size="small" :icon="item.icon" />
                                </template>
                            </v-text-field>
                        </v-col>
                    </div>
                </template>
            </v-col>
        </div>
    </div>
</template>
<script lang="ts">
type BorderKeys = "tl" | "tr" | "bl" | "br";
interface iconsInterface {
    key: BorderKeys;
    icon: string;
}
import { defineComponent } from "vue";
import { BorderRadius } from "@/types";
import { PropType } from "vue";
export default defineComponent({
    props: {
        isBorderRadius: Boolean,
        borderRadius: {
            type: Object as PropType<BorderRadius>,
            required: true,
        },
        minValue: {
            type: Number,
            default: 0,
        },
        maxValue: {
            type: Number,
            default: 999,
        },
    },
    emits: {
        "update:is-border-radius": function (value: boolean) {
            return true;
        },
        "update:border-radius": function (value: BorderRadius) {
            return true;
        },
    },
    data() {
        return {
            iconsForBorderRadiuses: [
                { key: "tl", icon: "mdi-rounded-corner mdi-rotate-270" },
                { key: "tr", icon: "mdi-rounded-corner" },
                { key: "br", icon: "mdi-rounded-corner mdi-rotate-90" },
                { key: "bl", icon: "mdi-rounded-corner mdi-rotate-180" },
            ] as iconsInterface[],
            toggleOne: true,
            presetBrad: "",
        };
    },
    computed: {
        borderEnabled: {
            get() {
                return this.isBorderRadius;
            },
            set(value: boolean) {
                this.$emit("update:is-border-radius", value);
            },
        },
        oneBorderRadius: {
            get() {
                return this.borderRadius.tl;
            },
            set(value: number) {
                value =
                    value > this.maxValue
                        ? this.maxValue
                        : value < this.minValue
                        ? this.minValue
                        : value;
                const radius: BorderRadius = {
                    bl: value,
                    br: value,
                    tl: value,
                    tr: value,
                };
                this.$emit("update:border-radius", radius);
            },
        },
        presetRadius: {
            get() {
                return this.borderRadiusIsOne() ? this.borderRadius.tl : "";
            },
            set(value: number) {
                const radius: BorderRadius = {
                    bl: value,
                    br: value,
                    tl: value,
                    tr: value,
                };
                this.$emit("update:border-radius", radius);
            },
        },
        borderRad: {
            get() {
                return this.borderRadius;
            },
            set(value: BorderRadius) {
                this.$emit("update:border-radius", value);
            },
        },
    },
    methods: {
        borderRadiusIsOne() {
            return Object.values(this.borderRadius).every(
                (el) => el === this.borderRadius.bl
            );
        },
    },
    watch: {
        toggleOne(value: boolean) {
            if (!value) {
                this.oneBorderRadius = this.borderRadius.bl;
            }
        },
    },
    mounted() {
        if (this.borderRadiusIsOne()) {
            this.toggleOne = false;
        } else {
            this.toggleOne = true;
        }
    },
});
</script>
<style lang="scss" scoped>
.preset-icon-container {
    position: relative;
    width: 23px;
    width: 15px;
    height: 15px;
    top: 0;
    left: 0;
    overflow: hidden;
}
.preset-icon-container::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    top: 2px;
    left: 19px;
    left: 2px;
    width: 20px;
    height: 20px;
    border: 2px solid #898b8f;
}
button:hover .preset-icon-container::after {
    border-color: black;
}
.selected .preset-icon-container::after {
    border-color: black;
}
</style>
