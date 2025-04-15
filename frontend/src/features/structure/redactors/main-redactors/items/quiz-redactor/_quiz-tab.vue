<template>
    <loading-sheet
        v-if="quizzes === 'loading'"
        style="height: 432px; opacity: 0.5"
    />
    <template v-else>
        <v-row>
            <v-col>
                <div v-if="selectedQuiz === false" class="text-h6">
                    Квиз не выбран
                </div>
                <div
                    v-else-if="!quizzes.some((el) => el.id === selectedQuiz)"
                    class="text-h6"
                >
                    Выбранный квиз отсутсвует в базе
                </div>
                <template v-else>
                    <redactorComponentTitle>
                        Выбранный квиз
                    </redactorComponentTitle>
                    <div class="d-flex align-end justify-space-between">
                        <div class="text-body-1">
                            {{ selectedQuizName }}
                        </div>
                        <v-btn
                            size="small"
                            prepend-icon="mdi-close"
                            variant="tonal"
                            class="ml-2"
                            @click="$emit('update:selectedQuiz', false)"
                        >
                            Отменить выбор
                        </v-btn>
                    </div>
                </template>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-divider />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div
                    class="d-flex justify-space-between w-100 align-end text-subtitle-1"
                >
                    <redactorComponentTitle
                        hint="Глобальный квиз можно вставить на любую страницу Вашего аккаунта. Изменение глобального квиза автоматически применяются на ВСЕХ страницах, где он был использован. Это позволяет быстро и централизовано обновлять структуру вопросника, а также не тратить время на создание одинаковых объектов"
                    >
                        Мои квизы
                    </redactorComponentTitle>
                    <div>
                        <v-btn
                            size="small"
                            rounded="lg"
                            variant="tonal"
                            @click="updateQuizzes"
                        >
                            <v-icon size="default">mdi-reload</v-icon>
                            <v-tooltip activator="parent">
                                Обновить список квизов
                            </v-tooltip>
                        </v-btn>
                        <v-btn
                            class="ml-2"
                            color="editor"
                            variant="flat"
                            prepend-icon="mdi-plus"
                            target="_blank"
                            :href="`${NOKS_HOST}quiz/add`"
                        >
                            <v-tooltip activator="parent">
                                После добавления вопросника, обновите список
                                ваших квизов, нажав на кнопку слева.
                            </v-tooltip>
                            Добавить
                        </v-btn>
                    </div>
                </div>

                <quizGallery
                    class="pa-0"
                    :items="quizzes"
                    @select="emit('update:selectedQuiz', $event)"
                />
            </v-col>
        </v-row>
    </template>
</template>
<script setup lang="ts">
import { QuizModel } from "@/models/Quiz";
import quizGallery, { GalleryItem } from "./quiz-gallery.vue";
import { loadingSheet } from "@/shared/helpers/components";
import { NOKS_HOST } from "@/shared/config";
import {
    watch,
    onBeforeMount,
    defineProps,
    defineEmits,
    toRefs,
    shallowRef,
    computed,
} from "vue";

//typing
type Props = {
    show: boolean;
    selectedQuiz: number | false;
};

type Emits = {
    "update:selectedQuiz": [value: number | false];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//quiz params
const { show, selectedQuiz } = toRefs(props);
const quizzes = shallowRef<"loading" | GalleryItem[]>("loading");

const selectedQuizName = computed<string>(() => {
    if (selectedQuiz.value && quizzes.value !== "loading") {
        return (
            quizzes.value.find((el) => el.id === selectedQuiz.value)?.name ?? ""
        );
    }
    return "";
});

const updateQuizzes = function () {
    quizzes.value = "loading";
    QuizModel.getAll().then((quizArr) => {
        quizzes.value = quizArr.map((quiz) => {
            return {
                id: quiz.quiz_id,
                name: quiz.quiz_title,
            };
        });
    });
};

watch(show, (value: boolean) => {
    if (value) {
        updateQuizzes();
    } else {
        quizzes.value = "loading";
    }
});

//onBeforeMounted
onBeforeMount(() => {
    updateQuizzes();
});
</script>
<style lang="scss" scoped></style>
