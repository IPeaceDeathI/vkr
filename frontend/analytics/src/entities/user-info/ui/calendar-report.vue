<template>
    <div class="card-calendar-box">
        <div
            class="card card-calendar flex justify-content-center p-calendar mr-2"
        >
            <Calendar
                v-model="dates"
                selectionMode="range"
                :manualInput="false"
                dateFormat="dd/mm/yy"
                showIcon
                iconDisplay="input"
                class="p-inputtext"
            />
        </div>
        <v-btn @click="doFiltering" color="primary">Фильтровать</v-btn>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useReportStore } from "@/entities/report/store";
import { storeToRefs } from "pinia";
import Calendar from "primevue/calendar";
import { useRoute } from "vue-router";
import { getDateFormat } from "@/shared/helpers/helpers";
const { selectedReportId, reportDate } = storeToRefs(useReportStore());
const route = useRoute();
const dateString = ref();
const dates = ref([]);

const doFiltering = () => {
    if (dates.value.length > 0) {
        const date_start = getDateFormat(dates.value[0]);
        const date_end = getDateFormat(dates.value[1]);
        dateString.value = `date[start]=${date_start}&date[end]=${date_end}`;
        useReportStore().setDateReport(dateString.value);
        setTimeout(() => {
            if (selectedReportId) {
                useReportStore().fetchReportById(
                    Number(route.params.statId),
                    Number(selectedReportId.value),
                    reportDate.value
                );
            }
        }, 600);

        // for (const prop of Object.keys(isOpenChild.value)) {
        //     delete isOpenChild.value[prop];
        // }
        // for (const prop of Object.keys(isAddChild.value)) {
        //     delete isAddChild.value[prop];
        // }
    }
};
</script>
<style lang="scss" scoped>
.card-calendar-box {
    padding: 0 1em 0.3em 0;
    display: flex;
    align-items: center;
    justify-content: end;
}
.card-calendar {
    width: 250px;
    height: 35px;
}
.card-calendar::v-deep .p-icon {
    top: 0 !important;
    bottom: 0 !important;
    margin: auto;
    right: 7px !important;
}
.p-datepicker-group-container :deep(.p-datepicker) {
    padding: 10px !important;
}
:deep(.p-datepicker-title) {
    padding-left: 10px !important;
}
.p-datepicker-header::v-deep {
    padding-left: 10px !important;
}
.table-td-first {
    position: sticky;
}
.card-calendar::v-deep input {
    padding-left: 10px;
    font-size: 14px;
}
.item-date {
    border: 1px solid #e8e9ea;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
    align-items: center;
    padding-left: 10px;
}
.item-date::v-deep .v-btn__append {
    margin: 0 !important;
}

.card-calendar::v-deep .p-icon {
    top: 0 !important;
    bottom: 0 !important;
    margin: auto;
    right: 7px !important;
}
.p-datepicker-group-container :deep(.p-datepicker) {
    padding: 10px !important;
}
:deep(.p-datepicker-title) {
    padding-left: 10px !important;
}
.p-datepicker-header::v-deep {
    padding-left: 10px !important;
}
.card-calendar::v-deep input {
    padding-left: 10px;
    font-size: 14px;
}
.p-inputtext {
    box-shadow: none !important;
    border-color: #9e9e9e;
}
</style>
