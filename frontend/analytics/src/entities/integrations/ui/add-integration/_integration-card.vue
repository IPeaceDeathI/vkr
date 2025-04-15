<template>
    <li class="integration-gallery__card" @click="add">
        <div
            v-if="isAmoIntegration && name == 'amoCRM'"
            class="d-flex justify-end w-100"
        >
            <v-icon
                size="small"
                icon="mdi-check-circle"
                color="success"
                class="mr-2"
            >
            </v-icon>
        </div>

        <img :src="image" />
        {{ name }}

        <v-fade-transition>
            <v-progress-linear
                v-if="isLoading"
                indeterminate
                absolute
                class="integration-gallery__card__progress"
                color="secondary"
            />
        </v-fade-transition>
        <v-fade-transition>
            <span v-if="isError" class="text-error">{{ error }}</span>
        </v-fade-transition>
    </li>
    <!-- <noks-site
        :is-open="isModalOpen"
        v-if="integration_category === 1 && isModalOpen == true"
    /> -->
</template>

<script setup lang="ts">
import { defineProps, onMounted, computed } from "vue";
import { IntegrationCard } from "./types";
import { toRefs } from "vue";
import useAsyncState from "@/shared/composables/useAsyncState";
import { useIntegrationStore } from "../../store";
import { useRoute } from "vue-router";
import { INTEGRATION_CATEGORY, INTEGRATION_STATUS } from "../../scheme";
import { ref } from "vue";
import NoksSite from "./noks-site/noks-site.vue";

const props = defineProps<IntegrationCard>();
const { name, image, onSuccess, type, integration_category } = toRefs(props);
const { data, isLoading, isError, error, executeRequest } = useAsyncState({
    immediate: false,
    onSuccess: onSuccess.value,
    request: useIntegrationStore().add,
});
console.log("integration_category", integration_category, "name=", name);
// Определение состояния модального окна
const isModalOpen = ref(false);

const route = useRoute();
const statId = computed(() => route.params.statId);
const add = () => {
    if (isLoading.value) return;

    executeRequest(
        Number(statId.value),
        INTEGRATION_STATUS.IN_PROGRESS,
        type.value,
        { name: "" },
        integration_category.value
    );
};

onMounted(() => {
    useIntegrationStore().updateIntegrationList(Number(statId.value));
});

const amoIntegration = ref(useIntegrationStore().getAmoCRM);
const isAmoIntegration = computed(() => {
    return amoIntegration.value.length > 0;
});
</script>

<style scoped lang="scss">
$border: #d1d4d6 solid 1px;

.integration-gallery__card {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 150px;
    width: 100%;
    border: $border;
    border-radius: 0.8em;
    flex-grow: 0;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.5);
    }
    & img {
        width: 100px;
    }
}
.integration-gallery__card__progress {
    top: unset !important;
    bottom: 5px;
}
.active-class-amo {
    // background-color: greenyellow;
}
.integration-gallery__card.active-class-amo:hover {
    transform: translateY(0);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
}
.text-error {
    font-size: 12px;
    line-height: 1.2;
    padding: 0 10px 10px;
}
</style>
