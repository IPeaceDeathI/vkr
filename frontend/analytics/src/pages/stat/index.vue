<template>
    <section class="stat-wrapper">
        <v-data-table
            :headers="tableTitle"
            item-value="name"
            :items="tableDataArray"
            class="text-center"
        >
            <template v-slot:[`item.name_pr`]="{ item }">
                <div
                    @click="navigate(item.number_pr)"
                    class="name-project"
                    style="text-align: left"
                >
                    {{ item.name_pr }}
                </div>
                <!-- <div class="name-email">email@mail.ru</div> -->
            </template>

            <template v-slot:[`item.fast_pr`]="{ item }">
                <v-btn
                    color="primary"
                    small
                    variant="plain"
                    icon="mdi-chart-box-outline"
                    @click="navigateTo(item.fast_pr)"
                ></v-btn>
            </template>

            <template v-slot:[`item.status_pr`]="{ item }">
                <v-btn
                    v-if="item.status_pr"
                    color="primary"
                    small
                    variant="plain"
                    icon="mdi-heart-pulse"
                ></v-btn>
            </template>
            <template v-slot:[`item.accesses_pr`]="{ item }">
                <v-btn color="primary" disabled :href="item.accesses_pr">
                    Настроить
                </v-btn>
            </template>
        </v-data-table>
    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted, computed } from "vue";

// import { ApiStat } from "@/shared/api/modules/Stat";
// import { UserInfoStat } from "@/entities/user-info/types";
import { StatModel } from "@/entities/stat/model";
import { useStatStore } from "@/entities/stat/store";
import { Stat } from "@/entities/stat/types";

import { router } from "@/app/providers";
import { ROUTE_NAMES } from "@/pages";
import { Ref } from "vue";
import { YandexDirectAuth } from "@/entities/yandex-direct/types";
export interface tableData {
    number_pr: number;
    name_pr: string;
    visits_pr: number | null;
    leads_pr: number | null;
    revenue_pr: number | null;
    fast_pr: string;
    status_pr: true;
    upd_deals_pr: string;
    accesses_pr: boolean;
}
// TODO Ссылка на отчеты и уведомления ??
const linkToReposts = "/analitics/report/";
const linkToNotifications = "/analitics/notifications/";
//TODO Разбить на блоки бизнес логику
// const desserts = [
//     {
//         number_pr: 256195,
//         name_pr: "Проект без названия",
//         visits_pr: 78,
//         leads_pr: 24,
//         revenue_pr: 1000000,
//         fast_pr: "link1",
//         status_pr: true,
//         upd_deals_pr: "2 секунды назад",
//         accesses_pr: "botton",
//     },
// ];

// const result = ref(desserts);

const statistics = ref<Stat[]>([]);

const getStatistics = async () => {
    try {
        const result = await StatModel.getAllStat();
        statistics.value = result;
    } catch (error) {
        console.error("Error fetching statistics:", error);
    }
};

const navigateTo = (value: string) => {};

const { stats, selectedStatId } = storeToRefs(useStatStore());
const { setSelectedStatId } = useStatStore();

const selectedStat = computed<Stat | undefined>({
    get: () => {
        return stats.value?.find((stat) => {
            return stat.stat_id === selectedStatId.value;
        });
    },
    set: (value) => {
        if (!value) return;
        const setResult = setSelectedStatId(value.stat_id);
        if (setResult) {
            router
                .push({
                    name: ROUTE_NAMES.Main,
                    params: { statId: value.stat_id },
                })
                .then(() => {
                    router.go(0);
                });
        }
    },
});

const headers = [
    // {
    //     title: "№",
    //     align: "start",
    //     sortable: true,
    //     key: "number_pr",
    // },
    {
        title: "Название проекта",
        key: "name_pr",
        align: "start",
        sortable: false,
        width: 200,
    },
    {
        title: "Визиты за месяц",
        key: "visits_pr",
        align: "start",
        sortable: true,
    },
    { title: "Заявки", key: "leads_pr", align: "start", sortable: true },
    { title: "Выручка", key: "revenue_pr", align: "start", sortable: true },
    // {
    //     title: "Быстрый переход",
    //     key: "fast_pr",
    //     align: "start",
    //     sortable: false,
    // },
    {
        title: "Статус проекта",
        key: "status_pr",
        align: "start",
        sortable: false,
    },
    {
        title: "Обновление сделок",
        key: "upd_deals_pr",
        align: "start",
        sortable: false,
    },
    // { title: "Доступы", key: "accesses_pr", align: "start", sortable: false },
];
const tableTitle = ref<any[]>(headers);
// Создаём новый массив объектов типа tableData
const statComputed = computed(() => {
    return stats.value?.map((obj: any) => {
        return {
            number_pr: obj.stat_id,
            name_pr: obj.name,
            visits_pr: 0,
            leads_pr: 0,
            revenue_pr: 0,
            fast_pr: "",
            status_pr: true,
            upd_deals_pr: "",
            accesses_pr: "path",
        };
    });
});
const tableDataArray = ref(statComputed);
const navigate = (id: number) => {
    router.push({
        name: ROUTE_NAMES.MultiChannelAnalytics,
        params: { statId: id },
    });
};
</script>

<style scoped>
.name-project {
    text-decoration: underline;
}
.name-project:hover {
    cursor: pointer;
}

.name-email {
    text-align: left;
    font-size: 0.8em;
    color: #888;
}
</style>
