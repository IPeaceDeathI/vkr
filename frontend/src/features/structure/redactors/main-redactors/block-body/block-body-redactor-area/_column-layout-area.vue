<template>
    <v-row>
        <v-col>
            <redactor-component-title>
                Растянуть контент
            </redactor-component-title>
            <v-btn-toggle v-model="stretchContent">
                <v-btn :value="StretchContent.onGrid">По сетке</v-btn>
                <v-btn :value="StretchContent.onScreen"> По экрану </v-btn>
            </v-btn-toggle>
        </v-col>
        <v-col>
            <redactor-component-title
                hint="Выравнивание карточек разной высоты"
            >
                Вертикальное выравнивание
            </redactor-component-title>
            <v-btn-toggle v-model="elementsAlign">
                <v-btn
                    :value="ElementsAlign.start"
                    icon="mdi-align-vertical-top"
                />
                <v-btn
                    :value="ElementsAlign.center"
                    icon="mdi-align-vertical-center"
                />
                <v-btn
                    :value="ElementsAlign.end"
                    icon="mdi-align-vertical-bottom"
                />
                <v-btn :value="ElementsAlign.stretch" icon="mdi-view-week" />
            </v-btn-toggle>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="6">
            <redactor-component-title>
                Отступ между карточками
            </redactor-component-title>
            <v-btn-toggle v-model="gapSize">
                <v-btn icon="mdi-cancel" :value="GapTypes.none" />
                <v-btn :value="GapTypes.middle">25px</v-btn>
                <v-btn :value="GapTypes.large">50px</v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { toRefs, defineEmits, defineProps, computed } from "vue";
import {
    StretchContent,
    ElementsAlign,
    GapTypes,
    BodyLayoutColumnParams,
} from "@/types";
import { menuParams } from "@/shared/libs/tree-menu";

//typing
type Props = {
    params: BodyLayoutColumnParams;
};
type Emits = {
    "update:bodyLayoutParams": [value: BodyLayoutColumnParams];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { params } = toRefs(props);

// BodyLayoutColumnParams
const stretchContent = computed<StretchContent>({
    get() {
        return params.value.strechContent;
    },
    set(value: StretchContent) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            strechContent: value,
        });
    },
});
const elementsAlign = computed<ElementsAlign>({
    get() {
        return params.value.elementsAlign;
    },
    set(value: ElementsAlign) {
        emit("update:bodyLayoutParams", {
            ...params.value,
            elementsAlign: value,
        });
    },
});
const gapSize = computed<GapTypes>({
    get() {
        return params.value.gap;
    },
    set(value: GapTypes) {
        emit("update:bodyLayoutParams", { ...params.value, gap: value });
    },
});
</script>
<style lang="scss" scoped>
.cards-in-row-pickers {
    padding: 5px;
    cursor: pointer;
    &.selected::after {
        content: "";
        display: block;
        position: absolute;
        width: 18px;
        height: 18px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiM0NzczRkYiIGN4PSIxMCIgY3k9IjEwIiByPSIxMCIvPjxwYXRoIGQ9Ik03LjcwNyAxMC4yOTNMNyA5LjU4NiA1LjU4NiAxMWwuNzA3LjcwNyAxLjQxNC0xLjQxNHpNOSAxM2wtLjcwNy43MDcuNzA3LjcwNy43MDctLjcwN0w5IDEzem01LjcwNy00LjI5M0wxNS40MTQgOCAxNCA2LjU4NmwtLjcwNy43MDcgMS40MTQgMS40MTR6bS04LjQxNCAzbDIgMiAxLjQxNC0xLjQxNC0yLTItMS40MTQgMS40MTR6bTMuNDE0IDJsNS01LTEuNDE0LTEuNDE0LTUgNSAxLjQxNCAxLjQxNHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4K);
        background-repeat: no-repeat;
        pointer-events: none;
        right: 0;
        top: 0;
        margin-top: 5px;
        margin-right: 5px;
        transition: opacity 0.2s, transform 0.3s ease-out;
    }
}
</style>
