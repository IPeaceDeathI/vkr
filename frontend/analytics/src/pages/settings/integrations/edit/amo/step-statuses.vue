<template>
    <section class="amo-statuses">
        <h3 class="amo-card__header">
            Загрузка заявок из CRM: распределение статусов
        </h3>
        <p class="amo-card__paragraph">
            Распределите статусы ваших заявок по трем группам статусов, которые
            затем будут учитываться в аналитике как сделки в работе, оплаченные
            или отмененные сделки. Статусы, которые не нужно учитывать в
            аналитике оставьте в группе "не учитываются".
        </p>
        <p class="amo-card__paragraph mt-2">
            После распределения статусов заказы из CRM будут загружены в ваш
            проект в течение часа.
        </p>

        <div class="amo-statuses__container mt-3">
            <status-card
                v-for="card in cards"
                ref="cardRefs"
                :allocation-id="card.id"
                :title="card.title"
                :hint="card.hint"
                :is-loading="isLoading"
                :item-list="card.itemList"
                :header-classes="card.headerClasses"
                :key="card.id"
            />
        </div>
        <div class="amo-statuses__action mt-4">
            <v-btn
                size="default"
                color="primary"
                @click="saveAndContinue()"
                :loading="isPostLoading"
            >
                {{ postButtonText }}
                <v-tooltip
                    activator="parent"
                    text="Сохранить распределение статусов и продолжить настройку"
                />
            </v-btn>
        </div>

        <v-scale-transition>
            <span v-if="isError" class="text-error">{{ error }}</span>
            <span v-if="postIsError" class="text-error">{{ postError }}</span>
        </v-scale-transition>
    </section>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, toRef, watch } from "vue";
import { Props } from "./useAmoStep";
import useAmoState from "./useAmoStep";
import statusCard from "./_status_card.vue";
import useAsyncState from "@/shared/composables/useAsyncState";
import {
    AmoModel,
    AmoPipelineItems,
    AmoPipelineStatus,
    AmoPipelineStatusItems,
    AmoPostSettingAllocation,
} from "@/entities/amo";
import { CARDS_TYPE, cardsToAllocationStatus } from "./types";
import { useRoute, useRouter } from "vue-router";
import { possibleSteps } from ".";
import { ApiAmo } from "@/shared/api/modules";

type Card = {
    id: CARDS_TYPE;
    title: string;
    hint: string;
    headerClasses: string;
    itemList: Array<AmoPipelineStatusItems>;
};
const router = useRouter();
const route = useRoute();
const props = defineProps<Props>();

const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);

//getStatuses
const {
    data: statuses,
    isLoading,
    isError,
    error,
    executeRequest,
} = useAsyncState({
    immediate: true,
    request: AmoModel.getAllStatusByPipeline,
    initialArgs: [Number(integrationId.value), Number(statId.value)],
});

// useAmoState(
//     toRef(() => props.isOpen),
//     () => {
//         executeRequest(Number(integrationId.value), Number(statId.value));
//     }
// );

watch(statuses, (newVal) => {
    //TODO добавить проверку на то, установлены ли уже статусы и если да, то вывдить данные с другого Api
    if (newVal === undefined) return;

    const undefiCard = cards.value.find(
        (card) => card.id === CARDS_TYPE.UNDEFINED
    );

    const inProgCard = cards.value.find(
        (card) => card.id === CARDS_TYPE.IN_PROGRESS
    );
    const paidCard = cards.value.find((card) => card.id === CARDS_TYPE.PAID);
    const canseledCard = cards.value.find(
        (card) => card.id === CARDS_TYPE.CANSELED
    );
    if (undefiCard && inProgCard && paidCard && canseledCard) {
        undefiCard.itemList = newVal;
        inProgCard.itemList = [];
        paidCard.itemList = [];
        canseledCard.itemList = [];
    }
});

//cards
const cardRefs = ref<Array<typeof statusCard>>([]);
const cards = ref<Card[]>([
    {
        id: CARDS_TYPE.UNDEFINED,
        title: "Не учитываются",
        hint: "Сделки, которые не будут учитываться Roistat. Например, мусорные сделки или дубли",
        headerClasses: "bg-background",
        itemList: [],
    },
    {
        id: CARDS_TYPE.IN_PROGRESS,
        title: "В работе",
        hint: "Сделки в процессе. Например, сделки в процессе переговоров или отгрузки товара",
        headerClasses: "bg-primary",
        itemList: [],
    },
    {
        id: CARDS_TYPE.PAID,
        hint: "Сделки, по которым совершена оплата или точно будет совершена оплата",
        title: "Оплаченные",
        headerClasses: "bg-success",
        itemList: [],
    },
    {
        id: CARDS_TYPE.CANSELED,
        title: "Отмененные",
        hint: "Отмененные сделки. Например, отказ или возврат товара",
        headerClasses: "bg-error",
        itemList: [],
    },
]);

//post
const postButtonText = ref("Сохранить и продолжить");

const saveAndContinue = () => {
    isPostLoading.value = true;
    let settingsAllocation: Array<AmoPostSettingAllocation> = [];

    cardRefs.value.forEach((cardComponent) => {
        const cardId = cardComponent.allocationId as CARDS_TYPE;
        if (cardId === CARDS_TYPE.UNDEFINED) return;
        const statuses: Array<AmoPostSettingAllocation> = (
            cardComponent.getStatusList().value as Array<AmoPipelineStatusItems>
        ).map((status) => {
            return {
                status_id: status.id,
                status_allocation: cardsToAllocationStatus[cardId],
                pipeline_id: status.pipeline_id,
            };
        });
        settingsAllocation = settingsAllocation.concat(statuses);
    });
    // executePost(Number(statId.value),Number(integrationId.value,settingsAllocation),
    executePost(
        Number(integrationId.value),
        Number(statId.value),
        settingsAllocation
    );
};

const onPostSuccess = (data: boolean) => {
    postButtonText.value = "Сохранено";
    setTimeout(() => {
        router
            .push({
                ...route,
                query: { step: possibleSteps[2] },
            })
            .finally(() => {
                postButtonText.value = "Сохранить и продолжить";
            });
    }, 1000);
};
//после наж кнопки сохранить
const {
    isLoading: isPostLoading,
    isError: postIsError,
    error: postError,
    executeRequest: executePost,
} = useAsyncState({
    request: AmoModel.postSettingsAllocation,
    immediate: false,
    onSuccess: onPostSuccess,
});
</script>

<style scoped>
.amo-statuses__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px 40px;
}
@media (max-width: 1200px) {
    .amo-statuses__container {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 600px) {
    .amo-statuses__container {
        grid-template-columns: repeat(1, 1fr);
    }
}
.amo-statuses__container__card {
    border: 1px red solid;
    width: 100%;
}
.amo-statuses-card__header {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
body {
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard syntax */
}
</style>
