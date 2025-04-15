<template>
    <v-card tag="section" class="yandex-direct-edit">
        <v-toolbar density="compact" color="primary">
            <v-toolbar-title tag="h1">Яндекс.Директ</v-toolbar-title>

            <template #extension>
                <v-tabs
                    v-model="tab"
                    align-tabs="center"
                    color="primary-darken-4"
                    grow
                    v-if="statusIntegration?.ready_to_configure"
                >
                    <v-tab :value="TABS.CAMPAIGN">{{ TABS.CAMPAIGN }}</v-tab>
                    <v-tab :value="TABS.CHANNEL">{{ TABS.CHANNEL }}</v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-sheet class="pa-4 text-center mx-auto" elevation="12">
            <v-expand-transition>
                <span
                    class="text-error"
                    v-if="!statusIntegration?.ready_to_configure"
                    >Интеграция в процессе</span
                >
            </v-expand-transition>
            <v-expand-transition>
                <span
                    class="text-success"
                    v-if="statusIntegration?.ready_to_configure"
                >
                    Интеграция настроена
                </span>
            </v-expand-transition>
        </v-sheet>

        <v-window
            v-model="tab"
            class="yandex-direct-edit__window"
            v-if="statusIntegration?.ready_to_configure"
        >
            <v-window-item :value="TABS.CAMPAIGN">
                <campaign-c />
            </v-window-item>
            <v-window-item :value="TABS.CHANNEL">
                <channel-c />
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import campaignC from "./_campaign.vue";
import channelC from "./_channel.vue";
import { onMounted } from "vue";
import { YandexDirectModel } from "@/entities/yandex-direct/model";
import { router } from "@/app/providers";
import { useRoute } from "vue-router";
import useAsyncState from "@/shared/composables/useAsyncState";
import { watch } from "vue";
import { YandexDirectAuth } from "@/entities/yandex-direct/types";

enum TABS {
    CAMPAIGN = "Кампании",
    CHANNEL = "Каналы",
}
const tab = ref<TABS>(TABS.CAMPAIGN);
const route = useRoute();
const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);

const {
    data: status,
    isLoading,
    isError,
    error,
    executeRequest,
} = useAsyncState({
    immediate: true,
    request: YandexDirectModel.getExistChannel,
    initialArgs: [Number(statId.value), Number(integrationId.value)],
});

const statusIntegration = ref<YandexDirectAuth>();
watch(status, (newVal) => {
    console.log("newVal", newVal);
    statusIntegration.value = newVal;
});

onMounted(async () => {
    // const response = await YandexDirectModel.getExistChannel(
    //     Number(statId),
    //     Number(integrationId)
    // );
    // console.log("response yd", response);
    // try {
    //     const response = await YandexDirectModel.getCampaignChannels(5, 5);
    //     console.log("response yd", response);
    //     // sites.value = response;
    //     // siteNames.value = sites.value.map((item) => item.name);
    //     // console.log("sites.value", siteNames);
    // } catch (error) {
    //     console.error("Ошибка при загрузке сайтов:", error);
    // }
});
</script>

<style scoped></style>
