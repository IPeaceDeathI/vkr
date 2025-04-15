<template>
    <v-dialog
        activator="parent"
        width="800"
        transition="dialog-bottom-transition"
        v-model="isOpen"
    >
        <v-card>
            <v-toolbar color="primary" density="compact" size="small">
                <v-toolbar-title>Создать отчет</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpen = false">
                    <v-icon icon="mdi-close" />
                </v-btn>
            </v-toolbar>

            <div class="card" id="card-stepper">
                <Stepper orientation="vertical" class="p-stepper">
                    <StepperPanel header="Шаблон">
                        <template #content="{ nextCallback }">
                            <div class="flex flex-column h-12rem">
                                <v-row no-gutters>
                                    <v-col cols="12" sm="7">
                                        <v-sheet
                                            class="mt-2 mb-2 pa-2 list-wrp list-template"
                                        >
                                            <ul>
                                                <li
                                                    v-for="(
                                                        item, index
                                                    ) in reportTemplate"
                                                    key="item.report_type"
                                                    @click="toggleActive(index)"
                                                    :class="
                                                        item.active
                                                            ? 'active'
                                                            : ''
                                                    "
                                                >
                                                    {{ item.name
                                                    }}<span
                                                        v-if="item.active"
                                                        class="mdi mdi-check"
                                                    ></span>
                                                </li>
                                            </ul>
                                        </v-sheet>
                                    </v-col>
                                    <v-col cols="12" sm="5">
                                        <!-- <v-sheet class="ma-2 pa-2">
                                            One of three columns
                                        </v-sheet> -->
                                    </v-col>
                                </v-row>
                            </div>
                            <div class="flex py-4">
                                <Button
                                    label="Далее"
                                    class="next-btn"
                                    @click="nextCallback"
                                />
                            </div>
                        </template>
                    </StepperPanel>
                    <StepperPanel header="Показатели">
                        <template #content="{ prevCallback, nextCallback }">
                            <div class="flex flex-column h-12rem">
                                <span
                                    v-if="selectTypeReport < 0"
                                    style="color: red"
                                    >Необходимо выбрать тип отчета</span
                                >
                                <v-row no-gutters v-if="selectTypeReport > 0">
                                    <v-col cols="12" sm="6">
                                        <div class="title-step">
                                            Список показателей
                                        </div>

                                        <v-sheet class="mt-2 mb-2 pa-2">
                                            <v-text-field
                                                class="mb-2"
                                                v-model="search"
                                                label="Поиск"
                                                prepend-inner-icon="mdi-magnify"
                                                variant="outlined"
                                                hide-details
                                                single-line
                                            ></v-text-field>
                                            <div class="list-wrp">
                                                <ul>
                                                    <li
                                                        v-for="item in listFields"
                                                        :key="item.name"
                                                        @click="pushList(item)"
                                                    >
                                                        {{ item.header }}
                                                    </li>
                                                </ul>
                                            </div>
                                        </v-sheet>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <div class="title-step">
                                            Колонки в таблице
                                        </div>

                                        <v-sheet class="ma-2 pa-2 table-sheet">
                                            <p class="subtitle-step">
                                                Колонки которые будут
                                                отображаться в отчете
                                            </p>
                                            <draggable
                                                v-model="listColumnTableSelect"
                                                class="list-wrp list-selected-wrp"
                                                group="people"
                                                item-key="id"
                                            >
                                                <template
                                                    #item="{ element, index }"
                                                >
                                                    <div class="item-column">
                                                        <div
                                                            class="item-column-num"
                                                        >
                                                            {{ index + 1 }}.
                                                        </div>
                                                        <div
                                                            class="column-control"
                                                        >
                                                            <div
                                                                class="drop-btn"
                                                            >
                                                                <v-btn
                                                                    flat
                                                                    icon="mdi-drag-vertical"
                                                                    variant="text"
                                                                    size="xsmall"
                                                                    class="btn-drag btn-codes"
                                                                />
                                                            </div>
                                                            <div
                                                                class="item-column-name"
                                                            >
                                                                {{
                                                                    element.header
                                                                }}
                                                            </div>
                                                            <div>
                                                                <v-btn
                                                                    flat
                                                                    icon="mdi-delete-outline"
                                                                    variant="text"
                                                                    size="xsmall"
                                                                    class="btn-drag btn-codes"
                                                                    @click="
                                                                        deleteElement(
                                                                            index
                                                                        )
                                                                    "
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </draggable>
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                            <div class="flex py-4 gap-2">
                                <Button
                                    label="Назад"
                                    severity="secondary"
                                    @click="prevCallback"
                                />
                                <Button
                                    label="Далее"
                                    class="next-btn"
                                    @click="nextCallback"
                                />
                            </div>
                        </template>
                    </StepperPanel>
                    <StepperPanel header="Название">
                        <template #content="{ prevCallback }">
                            <div class="flex flex-column h-12rem">
                                <v-row no-gutters>
                                    <v-col cols="12" sm="6">
                                        <v-sheet
                                            class="ma-2 pa-2 sheet-height table-sheet"
                                        >
                                            <v-text-field
                                                class="mb-2"
                                                v-model="nameReport"
                                                label="Название отчета"
                                                variant="outlined"
                                                hide-details
                                                single-line
                                            ></v-text-field>
                                            <span
                                                v-if="selectTypeReport < 0"
                                                style="color: red"
                                                >Не выбран тип отчета</span
                                            ><span
                                                v-if="!errorName"
                                                style="color: red"
                                                >Введите имя отчета</span
                                            >
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </div>
                            <div class="flex py-4">
                                <Button
                                    label="Назад"
                                    severity="secondary"
                                    @click="prevCallback"
                                />
                                <Button
                                    label="Создать"
                                    class="next-btn"
                                    severity="secondary"
                                    @click="
                                        saveReport(
                                            listColumnTableSelect,
                                            nameReport
                                        )
                                    "
                                />
                            </div>
                        </template>
                    </StepperPanel>
                </Stepper>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import useAsyncState from "@/shared/composables/useAsyncState";
import { StatPost, StatPostTo } from "@/entities/stat/types";
import { useReportStore } from "@/entities/report/store";
import { ReportData, ReportInfo, ReportModel } from "@/entities/report";
import { useRoute } from "vue-router";
import Stepper from "primevue/stepper";
import StepperPanel from "primevue/stepperpanel";

import draggable from "vuedraggable";
import Button from "primevue/button";

import { VCardItem } from "vuetify/lib/components/index.mjs";

const isOpen = ref(false);
const name = ref("");

//TODO перенести в библу для валидаций
const maxLengthRule = (value: string) => {
    if (value.length > 15) return "Длина поля не должна превышать 15";
    return true;
};

const collectStat = (): ReportData => {
    return {
        name: name.value,
        report_type: 1,
        show_columns: [],
    };
};

const form = ref();
const showSuccessMessage = ref(true);
watch(isOpen, () => {
    showSuccessMessage.value = false;
});

const route = useRoute();
const statId = computed(() => route.params.statId);
const addReport = async () => {
    if (!form.value) return;
    if (!(await form.value.validate()).valid) return;
    executePost(Number(route.params.statId), collectStat());
};
const onAddSuccess = () => {
    showSuccessMessage.value = true;
    setTimeout(() => {
        isOpen.value = false;
    }, 1500);
};

const {
    isLoading: postIsLoading,
    isError: postIsError,
    error: postError,
    executeRequest: executePost,
} = useAsyncState({
    request: useReportStore().postReport,
    immediate: false,
    onSuccess: onAddSuccess,
});

const listColumnTableSelect = ref([{ header: "", name: "" }]);
const listColumnTable = ref();
const search = ref("");
const nameReport = ref("");
const errorName = ref(true);
const saveReport = (columns: any, name: string) => {
    const columnName = columns.map((item: any) => item.name);
    if (
        selectTypeReport.value > 0 &&
        columnName.length > 0 &&
        name.length > 0
    ) {
        ReportModel.postReport(Number(route.params.statId), {
            name: name,
            report_type: Number(selectTypeReport.value),
            show_columns: columnName,
        });
    }
    if (name.length == 0) {
        errorName.value = false;
    } else {
        errorName.value = true;
    }
};
interface templateRep {
    name: string;
    report_type: number;
    active: boolean;
}
const reportTemplate = ref<Array<templateRep>>();
const selectTypeReport = ref(-1);
const reportInfo = ref();
onMounted(async () => {
    reportInfo.value = await ReportModel.getReportInfoAll();
    setTimeout(() => {
        reportTemplate.value = reportInfo.value
            .filter((item: ReportInfo) => item.implementation == true)
            .map((item: any) => ({
                name: item.name,
                report_type: item.type,
                active: false,
            }));
    }, 600);
});
const listFields = computed(() => {
    if (search.value != "") {
        return listColumnTable.value.filter((name: any) =>
            name.header.toLowerCase().includes(search.value.toLowerCase())
        );
    } else {
        return listColumnTable.value;
    }
});

const toggleActive = (index: number) => {
    if (reportTemplate.value != undefined) {
        reportTemplate.value.forEach((item) => {
            item.active = false;
        });
        reportTemplate.value[index].active = true;
        selectTypeReport.value = reportTemplate.value[index].report_type;
        if (selectTypeReport.value) {
            ReportModel.getReportInfo(selectTypeReport.value).then(
                (repItems: any) => {
                    listColumnTableSelect.value = repItems.map((item: any) => ({
                        header: item.header,
                        name: item.name,
                    }));
                    listColumnTable.value = repItems;
                }
            );
        }
    }
};
const deleteElement = (index: number) => {
    listColumnTableSelect.value.splice(index, 1);
};

const pushList = (item: any) => {
    const isFind = listColumnTableSelect.value.find(
        (itemList: any) => itemList.name === item.name
    );
    if (isFind === undefined) {
        listColumnTableSelect.value.push(item);
    }
};
</script>

<style>
.add-stat-dialog__success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5em;
    padding-bottom: 10px;
}
.p-stepper .p-stepper-panel.p-stepper-panel-active .p-stepper-number {
    background: #119a22;
    border-color: #119a22;
}
.p-stepper .p-stepper-header .p-stepper-number::after {
    box-shadow: none;
}
.p-stepper {
    padding: 30px;
    background: #f1f2f3;
}
.p-stepper-vertical .p-stepper-toggleable-content {
    background: #f1f2f3;
}
#card-stepper .p-stepper-content {
    padding-left: 1rem !important;
}
#card-stepper .p-stepper-separator {
    flex: 0 0 auto;
    width: 2px;
    height: auto;
    margin-inline-start: calc(13px + 2px);
}
.p-stepper-vertical .p-stepper-toggleable-content {
    display: flex;
    flex: 1 1 auto;
}
.p-stepper-header {
    margin: 5px 0;
}
.p-stepper-title {
    padding: 0 10px;
}
.list-wrp {
    height: 260px;
    overflow-y: auto;
}
.list-selected-wrp {
    height: 286px;
}
.list-wrp ul {
    padding-left: 0;
}
.list-wrp ul li {
    padding: 5px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
}
.list-wrp ul li:hover {
    background-color: #e5f4f9;
    cursor: pointer;
}
.title-step {
    font-weight: 700;
    margin: 0 0 10px 10px;
}
.p-button {
    font-size: 14px;
    height: 28px;
    padding: 0 10px;
}
.p-button.next-btn {
    background-color: #119a22;
    color: #fff;
}
.item-column {
    display: flex;
    align-items: center;
}
.item-column-num {
    margin-right: 0;
    width: 22px;
    font-size: 13px;
}
.item-column-name {
    width: 82%;
    font-size: 14px;
}
.item-column .v-btn--icon .v-icon {
    color: #888888;
}
.table-sheet {
    background: transparent;
}
.column-control {
    display: flex;
    align-items: center;
    padding: 5px 0;
    background: #ffffff;
    border-bottom: 1px solid #f1f2f3;
    width: 100%;
}
.subtitle-step {
    margin: 0 0 10px;
    font-size: 13px;
}
.sheet-height {
    min-height: 200px;
}
.p-stepper-toggleable-content {
    height: 425px;
}
.p-stepper {
    min-height: 620px;
}
.list-template li.active {
    background-color: #e5f4f9;
}
.list-template .mdi {
    color: #119a22;
}
</style>
