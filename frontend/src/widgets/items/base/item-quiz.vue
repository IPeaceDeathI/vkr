<template>
    <item-content>
        <div class="quiz-container" ref="wrp">
            <div class="quiz-border"></div>
            <iframe v-if="params.quizId !== false" class="text" :src="src" />
            <v-img
                v-else
                class="align-center"
                :src="selectQuizPath"
                cover
                style="position: static"
                gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
                <div class="text-white text-h4">Выберите квиз</div>
            </v-img>
        </div>
    </item-content>
    <redactor-overlay :itemId="id" v-slot="{ show, setShow }">
        <quiz-redactor
            :id="id"
            :parent-selector="wrp"
            :modelValue="show"
            :quizParams="params"
            @update:quizParams="updateParams"
            @update:model-value="setShow"
        />
    </redactor-overlay>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>

<script setup lang="ts">
import { shallowRef, toRefs, triggerRef } from "vue";
import itemContent from "./_item-content.vue";
import { redactorOverlay } from "@/features/structure";
import { quizRedactor } from "@/features/structure";
import { ItemBundle, ItemParams, ItemQuizParams, ItemTypes } from "@/types";
import { useItem } from "./useItem";
import { computed } from "vue";
import { useStore } from "@/app/providers";
import { NOKS_HOST } from "@/shared/config";
type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
const { id } = toRefs(props);
const params = shallowRef<ItemQuizParams>(
    structuredClone(commonParamsToQuiz(props.itemParams))
);
const selectQuizPath = `${process.env.BASE_URL}images/select-quiz.jpg`;
const { wrp, styles, getMeAsBundle } = useItem(params, id);

const updateParams = (val: ItemQuizParams) => {
    params.value = val;
    triggerRef(params);
};
const store = useStore();
const src = computed(() => {
    if (store.getters["environment/isEditable"]) {
        return `${NOKS_HOST}quiz/preview/${params.value.quizId}`;
    } else {
        return `https://noks.ru/quiz/show/${params.value.quizId}`;
    }
});

defineExpose({ getMeAsBundle });
//service
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToQuiz(bundle: ItemParams): ItemQuizParams {
    if (bundle.type === ItemTypes.quiz) {
        return bundle;
    } else throw "not Quiz";
}
</script>

<style scoped></style>
