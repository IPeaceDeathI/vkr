<template>
    <draggable-card
        v-model="show"
        :width="selectedTab === Tabs.quiz ? '680px' : '480px'"
        :height="selectedTab === Tabs.quiz ? '480px' : '380px'"
    >
        <redactor-toolbar
            v-model="selectedTab"
            :toggle-btns="tabsBtn"
            @close-click="show = false"
        >
        </redactor-toolbar>
        <v-redactor-container>
            <quiz-tab
                v-if="selectedTab === Tabs.quiz"
                :selectedQuiz="selectedQuiz"
                @update:selectedQuiz="selectedQuiz = $event"
                :show="show"
            />
            <template v-else-if="selectedTab === Tabs.style">
                <v-row>
                    <v-col>
                        <border-redactor
                            v-model:is-border="isBorder"
                            v-model:color="borderColor"
                            v-model:width="borderWidth"
                            @on-change="changeBorderWidth"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <shadow-redactor
                            v-model:is-shadow="isShadow"
                            v-model:shadow-value="shadowValue"
                            @change:shadow-value="changeShadowValue"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <border-radius-redactor
                            v-model:is-border-radius="isBorderRadius"
                            v-model:border-radius="borderRadius"
                        />
                    </v-col>
                </v-row>
            </template>
        </v-redactor-container>
    </draggable-card>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, toRefs, shallowRef, computed } from "vue";
import {
    draggableCard,
    redactorToolbar,
    borderRadiusRedactor,
    borderRedactor,
    shadowRedactor,
} from "../../../reusable-components";
import {
    BorderRadius,
    Color,
    ItemQuizParams,
    ItemQuizStyleParams,
    Shadow,
} from "@/types";
import quizTab from "./_quiz-tab.vue";

//typing
enum Tabs {
    quiz = "quiz",
    style = "style",
}

export interface GalleryItem {
    id: number;
    name: string;
}

type Props = {
    quizParams: ItemQuizParams;
    modelValue: boolean;
};

type Emits = {
    "update:quizParams": [value: ItemQuizParams];
    "update:modelValue": [value: boolean];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//items params
const { quizParams, modelValue } = toRefs(props);

const borderRadius = computed<BorderRadius>({
    get() {
        return quizStyleParams.value.borderRadius.value;
    },
    set(value: BorderRadius): void {
        emit("update:quizParams", {
            ...quizParams.value,
            styles: {
                ...quizStyleParams.value,
                borderRadius: {
                    ...quizStyleParams.value.borderRadius,
                    value: value,
                },
            },
        });
    },
});
const isBorderRadius = computed<boolean>({
    get() {
        return quizStyleParams.value.borderRadius.enabled;
    },
    set(value: boolean): void {
        emit("update:quizParams", {
            ...quizParams.value,
            styles: {
                ...quizStyleParams.value,
                borderRadius: {
                    ...quizStyleParams.value.borderRadius,
                    enabled: value,
                },
            },
        });
    },
});
const isBorder = computed<boolean>({
    get() {
        return quizStyleParams.value.border.enabled;
    },
    set(value: boolean): void {
        emit("update:quizParams", {
            ...quizParams.value,
            styles: {
                ...quizStyleParams.value,
                border: {
                    ...quizStyleParams.value.border,
                    enabled: value,
                },
            },
        });
    },
});
const borderWidth = computed<number>({
    get() {
        return quizStyleParams.value.border.borderWidth;
    },
    set(value: number): void {
        emit("update:quizParams", {
            ...quizParams.value,
            styles: {
                ...quizStyleParams.value,
                border: {
                    ...quizStyleParams.value.border,
                    borderWidth: value,
                },
            },
        });
    },
});
const borderColor = computed<Color>({
    get() {
        return quizStyleParams.value.border.borderColor;
    },
    set(value: Color): void {
        emit("update:quizParams", {
            ...quizParams.value,
            styles: {
                ...quizStyleParams.value,
                border: {
                    ...quizStyleParams.value.border,
                    borderColor: value,
                },
            },
        });
    },
});
const isShadow = computed<boolean>({
    get() {
        return quizStyleParams.value.shadow.enabled;
    },
    set(value: boolean): void {
        emit("update:quizParams", {
            ...quizParams.value,
            styles: {
                ...quizStyleParams.value,
                shadow: {
                    ...quizStyleParams.value.shadow,
                    enabled: value,
                },
            },
        });
    },
});
const shadowValue = computed<Shadow>({
    get() {
        return quizStyleParams.value.shadow.value;
    },
    set(value: Shadow): void {
        emit("update:quizParams", {
            ...quizParams.value,
            styles: {
                ...quizStyleParams.value,
                shadow: {
                    ...quizStyleParams.value.shadow,
                    value: value,
                },
            },
        });
    },
});
const quizStyleParams = computed<ItemQuizStyleParams>(() => {
    return quizParams.value.styles;
});
const selectedQuiz = computed<number | false>({
    get() {
        return quizParams.value.quizId;
    },
    set(value: number | false) {
        emit("update:quizParams", {
            ...quizParams.value,
            quizId: value,
        });
    },
});

const changeShadowValue = function (value: Shadow): void {
    emit("update:quizParams", {
        ...quizParams.value,
        styles: {
            ...quizStyleParams.value,
            shadow: {
                ...quizStyleParams.value.shadow,
                value: value,
            },
        },
    });
};

const changeBorderWidth = function (value: number) {
    emit("update:quizParams", {
        ...quizParams.value,
        styles: {
            ...quizStyleParams.value,
            border: {
                ...quizStyleParams.value.border,
                borderWidth: value,
            },
        },
    });
};

//переменные для template
const selectedTab = shallowRef(Tabs.quiz);
const tabsBtn = shallowRef([
    { value: Tabs.quiz, text: "Квиз" },
    { value: Tabs.style, text: "Стиль" },
]);

//model value
const show = computed<boolean>({
    get() {
        return modelValue.value;
    },
    set(value: boolean) {
        emit("update:modelValue", value);
    },
});
</script>
<style lang="scss" scoped></style>
