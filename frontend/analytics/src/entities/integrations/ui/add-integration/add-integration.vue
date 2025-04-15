<template>
    <v-dialog
        v-model="isOpen"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
    >
        <v-card tag="section" class="add-integration">
            <v-toolbar
                tag="header"
                color="primary"
                class="add-integration__toolbar"
            >
                <v-toolbar-title>Добавление интеграции</v-toolbar-title>
                <v-btn icon="mdi-close" @click="isOpen = false" />
            </v-toolbar>
            <v-card-text class="add-integration__body">
                <article class="integration__search">
                    <h3 class="mb-2 ml-1">Поиск интеграций</h3>
                    <v-autocomplete
                        disabled
                        prepend-inner-icon="mdi-magnify"
                        auto-select-first
                        rounded="lg"
                        variant="outlined"
                        placeholder="Найти"
                        density="comfortable"
                        menu-icon=""
                    />
                </article>

                <article class="integration-category-chips mt-2">
                    <v-chip-group
                        multiple
                        color="secondary"
                        :model-value="
                            selectedCategories.map((value) => value + '')
                        "
                        @update:model-value="
                            selectedCategories = $event.map((value) =>
                                parseInt(value)
                            )
                        "
                    >
                        <v-chip
                            v-for="category in Object.keys(
                                INTEGRATION_CATEGORY
                            ).filter((v) => !isNaN(Number(v)))"
                            :key="category"
                            :value="category"
                            variant="outlined"
                            >{{ categoryToName[category] }}
                        </v-chip>
                    </v-chip-group>
                </article>

                <TransitionGroup
                    tag="ul"
                    name="slide-fade"
                    class="integration-gallery mt-2"
                >
                    <li
                        v-for="category in selectedCategories"
                        :key="category"
                        class="integration-gallery__category"
                    >
                        <h3>{{ categoryToName[category] }}</h3>
                        <ul
                            class="integration-gallery__category__cards-wrapper mt-2"
                        >
                            <integration-card
                                v-for="integration in categoryToIntegrations[
                                    category
                                ]"
                                :key="integration.id"
                                v-bind="integration"
                            />
                        </ul>
                    </li>
                </TransitionGroup>
            </v-card-text>
        </v-card>
    </v-dialog>

    <add-integration-modal
        v-if="selectedIntegration"
        @onClose="selectedIntegration = undefined"
        :name="selectedIntegration.name"
    >
        <component
            :is="selectedIntegration.component"
            @onClose="selectedIntegration = undefined"
            :id="selectedIntegration.createdIntegrationId"
        />
    </add-integration-modal>
    <success-dialog
        v-if="successAddingRoute"
        :route="successAddingRoute"
        @update:model-value="if (!$event) successAddingRoute = undefined;"
    />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, watch } from "vue";
import {
    CATEGORY_ADVERTISING_CHANNELS,
    CATEGORY_CRM,
    CATEGORY_LEAD_SOURCE,
    INTEGRATION_CATEGORY,
    INTEGRATION_TYPE,
} from "../../scheme";
import { IntegrationCard } from "./types";
import addIntegrationModal from "./add-integration-modal.vue";
import integrationCard from "./_integration-card.vue";
import successDialog from "./_success.vue";
import { RouteLocationRaw, useRoute } from "vue-router";
import { ROUTE_NAMES } from "@/pages";
import yandexDirect from "./yandex-direct/yandex-direct.vue";
import noksSite from "./noks-site/noks-site.vue";
import webhook from "./webhook/webhook.vue";
import { shallowRef } from "vue";
import { storeToRefs } from "pinia";
import { useStatStore } from "@/entities/stat/store";
import { useIntegrationStore } from "../../store";
type Props = {
    modelValue: boolean;
    preselectedCategories?: Array<INTEGRATION_CATEGORY>;
};
const props = defineProps<Props>();
type Emits = {
    "update:modelValue": [isOpen: boolean];
};
const emits = defineEmits<Emits>();
//categories
const categoryToName: any = {
    [INTEGRATION_CATEGORY.LEAD_SOURCE]: "Источники заявок",
    [INTEGRATION_CATEGORY.CRM]: "CRM",
    [INTEGRATION_CATEGORY.ADVERTISING_CHANNELS]: "Рекламные каналы",
};

const selectedCategories = ref<Array<INTEGRATION_CATEGORY>>([]);

watch(
    () => props.preselectedCategories,

    (newVal) => {
        selectedCategories.value = newVal === undefined ? [] : newVal;
    }
);

//integrations

type SelectedIntegration = {
    createdIntegrationId: number;
    name: string;
    component: any;
};
const selectedIntegration = shallowRef<SelectedIntegration | undefined>(
    undefined
);

//route after show success model
const successAddingRoute = ref<RouteLocationRaw | undefined>(undefined);

const categoryToIntegrations: {
    [key in INTEGRATION_CATEGORY]: Array<IntegrationCard>;
} = {
    [INTEGRATION_CATEGORY.CRM]: [
        {
            id: 2,
            name: "amoCRM",
            image: require("@/assets/integrations/amo.png"),
            integration_category: INTEGRATION_CATEGORY.CRM,
            type: CATEGORY_CRM.amoCRM,
            onSuccess: (value) => {
                successAddingRoute.value = {
                    name: ROUTE_NAMES.Settings_Integrations_Edit,
                    params: { id: value },
                };
            },
        },
    ],
    [INTEGRATION_CATEGORY.LEAD_SOURCE]: [
        {
            id: 1,
            name: "LandingPage",
            image: require("@/assets/integrations/lp.svg"),
            integration_category: INTEGRATION_CATEGORY.LEAD_SOURCE,
            type: CATEGORY_LEAD_SOURCE.NOKS_SITE,
            onSuccess: (value) => {
                selectedIntegration.value = {
                    createdIntegrationId: value,
                    name: "Noks.Site",
                    component: noksSite,
                };
            },
        },
        {
            id: 4,
            name: "Через Webhook",
            image: require("@/assets/integrations/webhook.png"),
            integration_category: INTEGRATION_CATEGORY.LEAD_SOURCE,
            type: CATEGORY_LEAD_SOURCE.WEBHOOK,
            onSuccess: (value) => {
                successAddingRoute.value = {
                    name: ROUTE_NAMES.Settings_Integrations_Edit,
                    params: { id: value },
                };
            },
        },
        {
            id: 5,
            name: "Flexbe",
            image: require("@/assets/integrations/flb2.svg"),
            integration_category: INTEGRATION_CATEGORY.LEAD_SOURCE,
            type: CATEGORY_LEAD_SOURCE.FLEXBE,
            onSuccess: (value) => {
                successAddingRoute.value = {
                    name: ROUTE_NAMES.Settings_Integrations_Edit,
                    params: { id: value },
                };
            },
        },
        {
            id: 6,
            name: "Tilda",
            image: require("@/assets/integrations/tld.png"),
            integration_category: INTEGRATION_CATEGORY.LEAD_SOURCE,
            type: CATEGORY_LEAD_SOURCE.TILDA,
            onSuccess: (value) => {
                successAddingRoute.value = {
                    name: ROUTE_NAMES.Settings_Integrations_Edit,
                    params: { id: value },
                };
            },
        },
    ],
    [INTEGRATION_CATEGORY.ADVERTISING_CHANNELS]: [
        {
            id: 3,
            name: "Яндекс.Директ",
            image: require("@/assets/integrations/yandex-direct.png"),
            integration_category: INTEGRATION_CATEGORY.ADVERTISING_CHANNELS,
            type: CATEGORY_ADVERTISING_CHANNELS.YANDEX_DIRECT,
            onSuccess: (value) => {
                selectedIntegration.value = {
                    createdIntegrationId: value,
                    name: "Яндекс.Директ",
                    component: yandexDirect,
                };
            },
        },
    ],
};
//component
const isOpen = computed<boolean>({
    get: () => {
        return props.modelValue;
    },
    set: (value) => {
        emits("update:modelValue", value);
    },
});
const { stats, selectedStatId } = storeToRefs(useStatStore());

const isAddIntegration = () => {
    console.log("stats", stats);
};
</script>

<style scoped lang="scss">
// TODO переместить все бордеры в конфиг

.add-integration__body {
    display: flex;
    flex-direction: column;
}
.integration-gallery {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.integration-gallery__category__cards-wrapper {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(5, 1fr);
    @media screen {
        @media (max-width: 1000px) {
            grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 800px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 600px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 400px) {
            grid-template-columns: 1fr;
        }
    }
}
</style>
