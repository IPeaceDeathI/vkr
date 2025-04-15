<template>
    <redactor-component-title>{{ title }} </redactor-component-title>
    <v-btn-toggle v-model="paddingPresets">
        <template v-if="type === 'desktop'">
            <v-btn v-for="btn in paddingBtns" :value="btn" :key="btn">
                <v-icon v-if="btn === 0"> mdi-cancel </v-icon>
                <v-icon v-else-if="btn === 'setting'"> mdi-cog </v-icon>
                <template v-else>{{ btn }}px</template>
            </v-btn>
        </template>
        <template v-else>
            <v-btn v-for="btn in mobilePaddingBtns" :value="btn" :key="btn">
                <v-icon v-if="btn === 0"> mdi-cancel </v-icon>
                <v-icon v-else-if="btn === 'setting'"> mdi-cog </v-icon>
                <v-icon v-else-if="btn === 'inherit'">
                    mdi-monitor
                    <v-tooltip actiovator="parent">
                        Автоматически (наследовать от ПК)
                    </v-tooltip>
                </v-icon>
                <template v-else>{{ btn }}px</template>
            </v-btn>
        </template>
    </v-btn-toggle>
    <div v-if="paddingPresets === 'setting'" class="d-flex">
        <v-col cols="6" class="pa-0 pr-2 pt-2">
            <redactor-component-title class="font-weight-regular">
                По горизонтали
            </redactor-component-title>
            <v-text-field
                type="number"
                v-model="horizontalPadding"
                suffix="px"
            />
        </v-col>
        <v-col cols="6" class="pa-0 pl-2 pt-2">
            <redactor-component-title class="font-weight-regular">
                По вертикали
            </redactor-component-title>
            <v-text-field type="number" v-model="verticalPadding" suffix="px" />
        </v-col>
    </div>
</template>

<script lang="ts">
import { Paddings } from "@/types";
import { PropType } from "vue";
import { defineComponent } from "vue";
type paddingSelectBtn = number | "setting";
type mobilePaddingSelectBtn = number | "setting" | "inherit";
export default defineComponent({
    props: {
        modelValue: {
            type: Object as PropType<Paddings>,
            required: true,
        },
        inheritPadding: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            default: "Отступ до контента",
        },
        type: {
            type: String as PropType<"mobile" | "desktop">,
            default: "desktop",
        },
    },
    emits: {
        "update:modelValue": (value: Paddings) => true,
        "update:inheritPadding": (value: boolean) => true,
    },
    data() {
        return {
            paddingAreaShow: false,
            paddingBtns: [
                0,
                15,
                25,
                30,
                40,
                50,
                "setting",
            ] as Array<paddingSelectBtn>,
            mobilePaddingBtns: [
                "inherit",
                0,
                10,
                15,
                20,
                30,
                "setting",
            ] as Array<mobilePaddingSelectBtn>,
        };
    },
    computed: {
        paddingPresets: {
            get(): number | "setting" | "inherit" {
                const obj = this.modelValue;
                const presets =
                    this.type === "mobile"
                        ? this.mobilePaddingBtns
                        : this.paddingBtns;
                if (this.inheritPadding) return "inherit";
                if (this.paddingAreaShow) return "setting";
                const paddingIsEquals = Object.keys(obj).every(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    (val, i, arr) => obj[val] === obj[arr[0]]
                );
                if (paddingIsEquals && presets.includes(obj.top))
                    return obj.top;
                else {
                    return "setting";
                }
            },
            set(value: mobilePaddingSelectBtn) {
                const tmp = this.modelValue;
                let tmpInherit = this.inheritPadding;
                if (value == "setting") {
                    this.paddingAreaShow = true;
                    tmpInherit = false;
                } else if (value === "inherit") {
                    tmpInherit = true;
                    this.paddingAreaShow = false;
                } else {
                    tmp.top = value;
                    tmp.bottom = value;
                    tmp.left = value;
                    tmp.right = value;
                    this.paddingAreaShow = false;
                    tmpInherit = false;
                }
                this.$emit("update:modelValue", tmp);
                this.$emit("update:inheritPadding", tmpInherit);
            },
        },
        horizontalPadding: {
            get(): number {
                return this.modelValue.left;
            },
            set(value: number) {
                const tmp = this.modelValue;
                tmp.left = value;
                tmp.right = value;
                this.$emit("update:modelValue", tmp);
            },
        },
        verticalPadding: {
            get(): number {
                return this.modelValue.top;
            },
            set(value: number) {
                const tmp = this.modelValue;
                tmp.top = value;
                tmp.bottom = value;
                this.$emit("update:modelValue", tmp);
            },
        },
    },
});
</script>

<style scoped style="scss"></style>
