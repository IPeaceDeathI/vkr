<template>
    <v-card flat title="Кампании">
        <template v-slot:text>
            <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                single-line
                variant="outlined"
                hide-details
            ></v-text-field>
        </template>

        <v-data-table :headers="headers" :items="desserts" :search="search">
            <template v-slot:[`item.number`]="{ index }">
                {{ index + 1 }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
                <v-switch
                    color="primary"
                    :model-value="item.status == 1 ? true : false"
                    @change="changeStatus(item.campaign_id, item.status)"
                ></v-switch>
            </template>
        </v-data-table>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChannelCompaign } from "@/entities/channel-campaign";
import { ChannelCampaignModel } from "@/entities/channel-campaign/model";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { YandexDirectModel } from "@/entities/yandex-direct/model";
import useAsyncState from "@/shared/composables/useAsyncState";
import { computed } from "vue";
type InfiniteScrollStatus = "ok" | "empty" | "loading" | "error";
const ITEMS_PER_PAGE = 10;
const currentPage = ref(0);
const items = ref<ChannelCompaign[]>([]);
const load = async ({
    done,
}: {
    done: (status: InfiniteScrollStatus) => void;
}) => {
    const result = await ChannelCampaignModel.getAll();
    items.value = items.value.concat(result);
    console.log("items==", items);
    done("empty");
    return;
};

const route = useRoute();
const {
    data,
    isLoading,
    isError,
    error,
    executeRequest = YandexDirectModel.putSettingChannel,
} = useAsyncState({
    immediate: true,
    request: YandexDirectModel.getCampaignChannels,
    initialArgs: [Number(route.params.statId), Number(route.params.id)],
});

const { error: errorCampaign, executeRequest: settingCampaign } = useAsyncState(
    {
        immediate: false,
        request: YandexDirectModel.putSettingCampaign,
    }
);
onMounted(() => {
    data;
});

const headers = ref([
    { key: "number", title: "№", text: "232" },
    { key: "status", title: "Аналитика" },
    {
        key: "name",
        title: "Название",
        sortable: false,
        align: "start",
        text: "232",
    },
    { key: "created_at", title: "Дата добавления", text: "232" },
]);
const desserts = ref(data);
const search = ref("");

const changeStatus = (campaignId: number, status: number) => {
    const statusUpdate = status == 1 ? 0 : 1;
    console.log("route.params", route);
    settingCampaign(Number(route.params.statId), Number(route.params.id), {
        campaigns: [{ id: campaignId, status: statusUpdate }],
    });
    console.log("Меняем статут кампании");
};
</script>

<style scoped></style>
