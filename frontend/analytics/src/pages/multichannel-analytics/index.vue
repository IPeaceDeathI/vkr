<template>
    <p class="px-4 mt-3 mb-3" v-if="integrationLength <= 0">
        <v-alert border="start" color="info" variant="tonal">
            Нет ни одной интеграции. Перейдите на
            <a target="_blank" :href="statIdLink">страницу настроек</a>
            и настройте интеграции для получения отчета
        </v-alert>
    </p>
    <div class="mt-3 mb-3" v-if="integrationLength > 0">
        <v-row no-gutters justify="space-between">
            <v-col cols="12" sm="5"
                ><div class="flex align-center report-selector-wrp">
                    <div>
                        <v-select
                            density="compact"
                            variant="outlined"
                            color="secondary"
                            no-data-text="Отчеты не найдены"
                            return-object
                            class="report-selector"
                            v-model="activeReport"
                            :items="listReports"
                            @update:modelValue="changeReport"
                        >
                        </v-select>
                    </div>
                    <div>
                        <v-btn
                            size="default"
                            density="compact"
                            icon
                            class="ml-2"
                            color="#eee"
                            variant="flat"
                        >
                            <v-icon icon="mdi-cog" />
                            <v-tooltip
                                activator="parent"
                                text="Создать отчет"
                            />
                            <add-report-setting />
                        </v-btn>
                    </div></div
            ></v-col>
            <v-col cols="12" sm="6">
                <calendar-report></calendar-report>
            </v-col>
        </v-row>
    </div>
    <report-table v-if="integrationLength > 0"></report-table>
</template>
<script lang="ts">
import { computed, ref, onMounted, defineProps } from "vue";
import { useRoute } from "vue-router";
import reportTable from "@/entities/user-info/ui/report-table.vue";
import calendarReport from "@/entities/user-info/ui/calendar-report.vue";
import { useReportStore } from "@/entities/report/store";
import { storeToRefs } from "pinia";
import addReportSetting from "@/entities/user-info/ui/add-report-setting.vue";
import useAsyncState from "@/shared/composables/useAsyncState";
import { IntegrationModel } from "@/entities/integrations/model";
import { getDateFormat } from "@/shared/helpers/helpers";

export default {
    name: "report-items",
};
</script>

<script setup lang="ts">
const route = useRoute();

const { reports, selectedReportId, reportById, reportWithChild, reportDate } =
    storeToRefs(useReportStore());

const statIdLink = computed(
    () => `/stats/${route.params.statId}/settings/integrations/`
);

const {
    data: integration,
    isLoading,
    isError,
    executeRequest,
} = useAsyncState({
    request: IntegrationModel.getAll,
    initialArgs: [
        parseInt(
            Array.isArray(route.params.statId) ? "-1" : route.params.statId
        ),
    ],
});
const integrationLength = ref();

onMounted(() => {
    setTimeout(() => {
        integrationLength.value = integration.value?.length;
    }, 600);
});
const listReports = ref<Array<string>>();
const activeReport = ref();
const dateString = ref();
interface Props {
    dateString: string;
}

const props = defineProps<Props>();
onMounted(async () => {
    let d = new Date();
    const date_start = getDateFormat(d.setMonth(d.getMonth() - 1));
    const date_end = getDateFormat(new Date());
    dateString.value = `date[start]=${date_start}&date[end]=${date_end}`;

    useReportStore().setDateReport(dateString.value);

    useReportStore().init(Number(route.params.statId));
    useReportStore().fetchReport(Number(route.params.statId));

    setTimeout(() => {
        listReports.value = useReportStore().getAllReports?.map(
            (item: any) => item.name
        );
        if (reports.value != undefined && selectedReportId.value != undefined) {
            activeReport.value = reports.value
                .filter(
                    (item: any) =>
                        item.report_id === Number(selectedReportId.value)
                )
                .map((item: any) => item.name);
        }
    }, 300);
    setTimeout(() => {
        console.log("dateString.value", reportDate.value);
        if (selectedReportId && reportDate) {
            useReportStore().fetchReportById(
                Number(route.params.statId),
                Number(selectedReportId.value),
                reportDate.value
            );
        }
    }, 600);
});
const changeReport = () => {
    if (reports.value != undefined) {
        const idReport = reports.value
            .filter((item: any) => item.name === activeReport.value)
            .map((item: any) => item.report_id);

        useReportStore().setSelectedReportId(Number(idReport));

        useReportStore().fetchReportById(
            Number(route.params.statId),
            Number(idReport),
            reportDate.value
        );
        console.log("reportById", reportById);
    }
};
</script>
<style lang="scss" scoped>
.report-selector-wrp {
    display: flex;
    align-items: center;
    font-size: 14px;
}
.report-selector-wrp input {
    height: 100%;
}
</style>
<style scoped lang="scss">
$height: 35px;
.report-selector {
    border-radius: 5px;
    width: 250px;
    height: $height;
    padding-right: 2px;
    box-shadow: none !important;

    & ::v-deep(.v-input__control) {
        height: $height;
    }
    & ::v-deep(.v-field__field) {
        height: $height;
    }
    & ::v-deep(.v-field) {
        padding-right: 2px;
        background: #ffffff;
        border-color: #e8e9ea;
    }
    & ::v-deep(.v-field__input) {
        padding: 2px 8px;
        margin-top: -4px;
        font-size: 13px;
    }
}
</style>
