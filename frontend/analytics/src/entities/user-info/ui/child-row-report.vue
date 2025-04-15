<template>
    <div class="children">
        <div
            v-for="(row, index1) in itemRowChildren"
            :key="row.info.hash_position"
            :class="[
                JSON.parse(row.info.position).GENERAL_NESTING,
                isOpenChild[row.info.hash_position] ? 'open' : 'close',
            ]"
        >
            <div class="body-row table-tr">
                <div
                    class="table-td-first table-td border-right-0 fixed-column"
                >
                    <div class="dimension-1">
                        <div class="item-bg"></div>
                        <div
                            class="open-level"
                            v-if="row.info.next.length > 0"
                            @click="
                                openChildChannel(
                                    index1,
                                    row.info.hash_position,
                                    row.info.next,
                                    row.info.position,
                                    row.info
                                )
                            "
                        >
                            <span v-if="!isOpenChild[row.info.hash_position]"
                                >+</span
                            >
                            <span v-if="isOpenChild[row.info.hash_position]"
                                >-</span
                            >
                        </div>

                        <div
                            v-if="row.info.icon"
                            class="view-icon-source icon-source dm-icon-container"
                        >
                            <img class="icon-source-img" :src="row.info.icon" />
                        </div>
                        <div class="dimension-text">
                            <div
                                class="dimension-name"
                                :title="row.info.row_name"
                                v-if="row.info"
                            >
                                {{ row.info.row_name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="table-td"
                    v-for="(tdItem, index) in itemRowTableColumns"
                    :key="index"
                >
                    <div>
                        <div>
                            {{
                                countVal({
                                    col: tdItem,
                                    val: row.column_data[
                                        tdItem as keyof AnaliticColumnData
                                    ],
                                })
                            }}
                            <b v-if="itemReportTableUnits">
                                {{ metricUnit(itemReportTableUnits[index]) }}
                            </b>
                        </div>
                    </div>
                </div>
            </div>
            <div class="children" v-if="getChildren(row) && row">
                <childRowReport
                    :item-row-children="getChildren(row)"
                    :item-row-table-columns="itemRowTableColumns"
                    :item-report-table-units="itemReportTableUnits"
                ></childRowReport>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: "childRowReport",
};
</script>
<script setup lang="ts">
import { defineProps, onMounted, computed, toRefs } from "vue";
import {
    AnaliticColumnData,
    AnaliticRowsInfo,
    AnaliticRowsItem,
    AnaliticRowsItemChildren,
    ReportModel,
    AnaliticColumnDataString,
} from "@/entities/report";
import { ref } from "vue";
import useAsyncState from "@/shared/composables/useAsyncState";
import { storeToRefs } from "pinia";
import { useReportStore } from "@/entities/report/store";
import { useRoute } from "vue-router";
import { metricUnit, countVal } from "@/shared/helpers/helpers";
interface Props {
    itemRowChildren: AnaliticRowsItem[];
    itemRowTableColumns: string[] | undefined;
    itemReportTableUnits: string[] | undefined;
}
const props = defineProps<Props>();
const { itemRowChildren, itemRowTableColumns, itemReportTableUnits } =
    toRefs(props);

// console.log(props);

const { selectedReportId, reportWithChild } = storeToRefs(useReportStore());

const isOpenChild = ref<{ [key: string]: boolean }>({});
const isAddChild = ref<{ [key: string]: boolean }>({});
const reportTableRows = computed(() => reportWithChild.value?.rows);
const route = useRoute();
const {
    data: reportChild,
    isLoading: postIsLoading,
    isError: postIsError,
    error: postError,
    executeRequest: executePost,
} = useAsyncState({
    request: ReportModel.getReportAnaliticChild,
    immediate: false,
});

const openChildChannel = (
    index: number,
    hash: string,
    next: string,
    position: string,
    row_info: AnaliticRowsInfo
) => {
    if (!isOpenChild.value[hash]) {
        isOpenChild.value[hash] = true;
        if (!isAddChild.value[hash]) {
            executePost(
                Number(route.params.statId),
                Number(selectedReportId.value),
                next,
                position
            );
            setTimeout(() => {
                useReportStore().fetchReportPushChild(
                    index,
                    reportChild.value,
                    hash
                );
                reportChild.value?.forEach((row: any) => {
                    isOpenChild.value[row.info.hash_position] = false;
                    isAddChild.value[row.info.hash_position] = false;
                });
            }, 600);
            isAddChild.value[hash] = true;
        }
    } else {
        isOpenChild.value[hash] = false;

        const getLevel = JSON.parse(position).GENERAL_NESTING;
        const main_creteria_name = row_info.main_criteria_name;
        const main_creteria_id = row_info.main_criteria_id;
        const includeParam = decodeURIComponent(row_info.next).includes(
            `[${main_creteria_name}]=${main_creteria_id}`
        );
    }
};

onMounted(() => {
    setTimeout(() => {
        reportTableRows.value?.forEach((row: any) => {
            isOpenChild.value[row.info.hash_position] = false;
            isAddChild.value[row.info.hash_position] = false;
        });
    }, 600);
});
const getChildren = (parentRow: any) => {
    return parentRow.children;
};
</script>

<style lang="css" scoped>
main.v-main {
    padding-top: 49px !important;
    padding-right: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
}

.table-body-header {
    height: 34px;
    background-color: rgb(250, 247, 233);
    margin-bottom: 0px;
    min-height: 32px;
}
.table-td {
    max-width: 140px;
    width: 110px;
    box-shadow: #f1f2f3 1px 0px 0px 0px;
    padding-left: 10px;
    justify-content: flex-start;
    /* border-right: 1px solid #f1f2f3; */
}
.table-td-first {
    max-width: 300px;
    box-shadow: #f1f2f3 1px 0px 0px 0px;
    padding-left: 20px;
    border-left-width: 0px;
    width: 300px;
    justify-content: flex-start !important;
}
.table-report {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    width: 100%;
    background-color: #f1f2f3;
    overflow-x: auto;
    max-height: calc(100vh - 3.3em);
}
.dimension-1 {
    display: flex;
    margin-right: 0.4em;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tools-container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(250, 247, 233);
}

.table-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: 12px;
    line-height: 0.7rem;
    background: #f1f2f3;
}

.resizer {
    z-index: 1000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100%;
    margin-left: -5px;

    width: 5px;
    cursor: col-resize;
}

.dimension-1 {
    display: flex;
    margin-right: 0.4em;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tools-container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.table-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: 12px;
    line-height: 0.7rem;
    background: #f1f2f3;
}

.resizer {
    z-index: 1000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100%;
    margin-left: -5px;
    width: 5px;
    cursor: col-resize;
}

#ue-loading-indicator {
    background-color: white;
    border: 7px solid #bbb;
    border: 7px solid rgba(150, 150, 150, 0.38);
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    border-radius: 15px;
    -webkit-box-shadow: 0 10px 50px rgba(0, 0, 0, 0.35);
    -moz-box-shadow: 0 10px 50px rgba(0, 0, 0, 0.35);
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.35);
    padding: 10px;
    margin-left: 330px;
    margin-top: 250px;
}
#ue-overlay {
    position: absolute;
    z-index: 100002;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #000;
    filter: alpha(opacity=10);
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=10)";
    opacity: 0.1;
}

#ue-overlay p {
    padding: 5px;
    color: #ddd;
    font: bold 14px arial, sans-serif;
    margin: 0;
    letter-spacing: -1px;
}

.ue-tab-container {
    z-index: 100001 !important;
    position: fixed;
    bottom: 0px;
    right: 40px;
}
.ue-button {
    border: 1px solid #fff;
    box-shadow: rgba(255, 255, 255, 0.247059) 1px 1px 1px inset,
        rgba(0, 0, 0, 0.498039) 0px 1px 3px;
    font: bold 14px Arial, sans-serif;
    line-height: 1em;
    overflow: hidden;
    cursor: pointer;
    top: 0%;
    z-index: 9999;
    display: block;
    background-position: center 0px;
    background-repeat: no-repeat;
    background-color: #038cd5;
    float: bottom;
    -webkit-transition: 0.3s ease-out background-color,
        0.1s ease-out padding-bottom;
    -moz-transition: 0.3s ease-out background-color,
        0.1s ease-out padding-bottom;
}
.ue-button:hover {
    background-color: #039ae7;
    padding-bottom: 3px;
}
.ue-right {
    border-right-width: 0px;
    border-style: solid none solid solid;
    border-radius: 4px 0px 0px 4px;
}
.ue-bottom {
    float: left;
    border-bottom-width: 0px;
    border-style: solid solid solid solid;
    border-radius: 4px 4px 0px 0px;
}
.ue-top {
    float: left;
    border-top-width: 0px;
    border-style: solid solid solid solid;
    border-radius: 0px 0px 4px 4px;
}
.ue-left.ue-button {
    left: 0px;
    border-left-width: 0px;
    border-style: solid solid solid none;
    border-radius: 0 4px 4px 0;
}
.ue-left.ue-button #ueTabLabel {
    padding: 0px 0px 0px 0px !important;
    border-radius: 0 4px 4px 0;
}
.ue-right.ue-button #ueTabLabel {
    padding: 10px 0px 0px 0px !important;
}
.ue-button.ue-chat.ue-bottom,
.ue-button.ue-chat.ue-top {
    float: left;
    margin-right: 5px;
}
.ue-button.ue-chat.ue-left,
.ue-button.ue-chat.ue-right {
    margin-bottom: 5px;
}
.ue-button.ue-hidden {
    opacity: 0;
    filter: alpha(opacity=0);
    display: none;
}
.ue-tab-container {
    z-index: 100001 !important;
    position: fixed;
    bottom: 0px;
    right: 40px;
}
.ue-button {
    border: 1px solid #fff;
    box-shadow: rgba(255, 255, 255, 0.247059) 1px 1px 1px inset,
        rgba(0, 0, 0, 0.498039) 0px 1px 3px;
    font: bold 14px Arial, sans-serif;
    line-height: 1em;
    overflow: hidden;
    cursor: pointer;
    top: 0%;
    z-index: 9999;
    display: block;
    background-position: center 0px;
    background-repeat: no-repeat;
    background-color: #038cd5;
    float: bottom;
    -webkit-transition: 0.3s ease-out background-color,
        0.1s ease-out padding-bottom;
    -moz-transition: 0.3s ease-out background-color,
        0.1s ease-out padding-bottom;
}
.ue-button:hover {
    background-color: #039ae7;
    padding-bottom: 3px;
}
.ue-right {
    border-right-width: 0px;
    border-style: solid none solid solid;
    border-radius: 4px 0px 0px 4px;
}
.ue-bottom {
    float: left;
    border-bottom-width: 0px;
    border-style: solid solid solid solid;
    border-radius: 4px 4px 0px 0px;
}
.ue-top {
    float: left;
    border-top-width: 0px;
    border-style: solid solid solid solid;
    border-radius: 0px 0px 4px 4px;
}
.ue-left.ue-button {
    left: 0px;
    border-left-width: 0px;
    border-style: solid solid solid none;
    border-radius: 0 4px 4px 0;
}
.ue-left.ue-button #ueTabLabel {
    padding: 0px 0px 0px 0px !important;
    border-radius: 0 4px 4px 0;
}
.ue-right.ue-button #ueTabLabel {
    padding: 10px 0px 0px 0px !important;
}
.ue-button.ue-chat.ue-bottom,
.ue-button.ue-chat.ue-top {
    float: left;
    margin-right: 5px;
}
.ue-button.ue-chat.ue-left,
.ue-button.ue-chat.ue-right {
    margin-bottom: 5px;
}
.ue-button.ue-hidden {
    opacity: 0;
    filter: alpha(opacity=0);
    display: none;
}

.body-row {
    background: #fff;
}

.body-row:hover {
    background: #f9f9f9;
}

.table-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-size: 12px;
    line-height: 0.7rem;
    background: #f1f2f3;
}
.body-row {
    background: #fff;
}

.body-row:hover {
    background: #f9f9f9;
}
.first-new-toolbar-wrap .compare-types-select[data-v-7e6cef28] {
    display: inline-flex;
    margin-left: 5px;
    font-size: 14px;
}
.first-new-toolbar-wrap .compare-periods-wrap[data-v-7e6cef28] {
    display: flex;
    margin-left: 20px;
    flex: 1 0 auto;
}
.first-new-toolbar-wrap .compare-periods-label[data-v-7e6cef28] {
    display: inline;
}
.date-picker-wrap[data-v-7e6cef28] {
    min-width: 352px;
}
.compare-table-settings[data-v-7e6cef28] {
    display: flex;
    align-items: center;
    padding-left: 20px;
}
.compare-table-setting[data-v-7e6cef28]:not(:last-child) {
    margin-right: 16px;
}
@media (max-width: 1450px) {
    .compare-table-setting[data-v-7e6cef28] {
        width: 140px;
    }
}
.compare-periods-actions[data-v-7e6cef28] {
    display: flex;
    align-items: center;
}
.download-compare-report[data-v-7e6cef28] {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    color: #1b2a30;
    cursor: pointer;
    background: #ffffff;
    padding: 0 8px;
    height: 34px;
}
.download-compare-report[data-v-7e6cef28]:hover {
    background: #f7f8f9;
}
@media (max-width: 1350px) {
    .download-compare-report .download-text[data-v-7e6cef28] {
        display: none;
    }
}
.download-notification-popup[data-v-7e6cef28] {
    width: 350px;
}
.icon-wrapper[data-v-7e6cef28] {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #767f83;
}
.delete-period-block[data-v-7e6cef28] {
    cursor: pointer;
    color: #d1d4d6;
    margin-left: 16px;
}
.hide-compare-periods-button-block[data-v-7e6cef28] {
    height: 0;
    position: relative;
    outline: 1px solid #ffffff;
}
.hide-compare-periods-button[data-v-7e6cef28] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f4f4f5;
    color: #2589ff;
    border-radius: 50%;
    cursor: pointer;
}
.hide-compare-periods-button-text[data-v-7e6cef28] {
    border-bottom: 1px dashed #2589ff;
}
.slide-enter-active[data-v-7e6cef28] {
    transition-duration: 0.2s;
    transition-timing-function: ease-in;
}
.slide-leave-active[data-v-7e6cef28] {
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.slide-enter-to[data-v-7e6cef28],
.slide-leave[data-v-7e6cef28] {
    max-height: 100px;
    overflow: hidden;
}
.slide-enter[data-v-7e6cef28],
.slide-leave-to[data-v-7e6cef28] {
    overflow: hidden;
    max-height: 0;
}
.second-new-toolbar-wrap[data-v-7e6cef28] {
    border-bottom: 1px solid rgba(43, 36, 24, 0.1);
}

.sticky-scrollable-wrapper[data-v-744e665a] {
    position: relative;
    height: auto;
}

.root[data-v-76f51792] {
    display: flex;
    padding: 8px 20px;
}
.alert-link[data-v-76f51792] {
    color: #2589ff;
    text-decoration: underline;
}
.alert-link[data-v-76f51792]:hover {
    text-decoration: none;
}

.comparison-period-report-wrapper[data-v-59b67674] {
    position: relative;
    z-index: 1;
}
.comparison-period-report-module[data-v-59b67674] .sticky-scrollable-layout {
    position: static !important;
}

.marker-cell[data-v-e9ca88fa] {
    font-size: 12px;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.marker-cell img[data-v-e9ca88fa] {
    margin-right: 5px;
    object-fit: none;
}

.actions-header[data-v-73398cf0] {
    margin-left: 4px;
}

.actions-cell[data-v-84b3ce34] {
    display: flex;
    background: #ffffff;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.actions-cell .action[data-v-84b3ce34] {
    color: #2589ff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    flex: auto;
}
.actions-cell .action[data-v-84b3ce34]:last-child {
    cursor: default;
    border-right: none;
}
.actions-cell .action:last-child img[data-v-84b3ce34] {
    width: 16px;
    height: 16px;
}
.border[data-v-84b3ce34] {
    border-left: 1px solid #e8eaea;
}

.device-cell[data-v-73816742] {
    font-size: 12px;
}
.device-cell img[data-v-73816742] {
    object-fit: none;
}

.status-cell[data-v-59565190] {
    font-size: 12px;
    color: #ffffff;
    height: 16px;
    border-radius: 4px;
    overflow: hidden;
    padding: 0 8px;
    white-space: nowrap;
    display: flex;
    align-items: center;
}
.custom-status[data-v-59565190] {
    color: #1b2a30;
}

.cell-wrapper[data-v-13f5e3ba] {
    max-width: 100%;
    white-space: nowrap;
}
.cutter[data-v-13f5e3ba] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.column-settings[data-v-5c8cbd03] {
    width: 800px;
    min-height: 250px;
    background: #ffffff;
    position: absolute;
    z-index: 10000;
    top: 33px;
    right: -13px;
    box-shadow: 0 10px 20px rgba(27, 42, 48, 0.25);
    cursor: initial;
}
.column-settings .column-settings-header[data-v-5c8cbd03] {
    height: 41px;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d8d9;
}
.column-settings .column-settings-header div[data-v-5c8cbd03] {
    margin-top: 5px;
}
.column-settings .column-settings-header .header-text[data-v-5c8cbd03] {
    color: #1b2a30;
    font-weight: 700;
    font-size: 14px;
}
.column-settings .column-settings-header .rs-help-close[data-v-5c8cbd03] {
    margin-right: 10px;
}
.column-settings
    .column-settings-content
    .column-settings-control[data-v-5c8cbd03] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px 0 20px;
    background-color: #f6f7f8;
    height: 48px;
}
.column-settings
    .column-settings-content
    .column-settings-control
    .show-only-more-two-visits-switch[data-v-5c8cbd03] {
    font-size: 14px;
    color: #1b2a30;
}
.column-settings
    .column-settings-content
    .column-settings-control
    .attribution-model[data-v-5c8cbd03] {
    color: #767f83;
}
.column-settings .column-settings-content .columns-list[data-v-5c8cbd03] {
    display: flex;
    overflow: auto;
    padding: 10px 20px;
}
.column-settings
    .column-settings-content
    .columns-list
    .columns-list-col[data-v-5c8cbd03] {
    padding-right: 20px;
    color: #1b2a30;
    font-size: 14px;
}

.header[data-v-3cc062e4] {
    min-width: 1170px;
    max-width: 1240px;
    display: flex;
    justify-content: space-between;
}
.header .header-text[data-v-3cc062e4] {
    display: flex;
    align-items: center;
    font-weight: 900;
}
.header .header-text .subtitle[data-v-3cc062e4] {
    font-size: 14px;
    margin-left: 10px;
    color: #767f83;
    font-weight: 400;
}
.header .header-controls[data-v-3cc062e4] {
    display: flex;
    align-items: center;
}
.header .header-controls .controlls-icons-group[data-v-3cc062e4] {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 13px;
    margin-left: 10px;
    border-left: 1px solid #e8eaea;
    border-right: 1px solid #e8eaea;
}
.header .header-controls .controlls-icons-group > div[data-v-3cc062e4] {
    color: rgba(27, 42, 48, 0.4);
    cursor: pointer;
}
.header .header-controls .controlls-icons-group .icon-wrap[data-v-3cc062e4] {
    margin-right: 10px;
}
.header
    .header-controls
    .controlls-icons-group
    .icon-wrap.active[data-v-3cc062e4] {
    color: #50c3fe;
}
.header
    .header-controls
    .controlls-icons-group
    .column-settings-wrap[data-v-3cc062e4] {
    position: relative;
    margin: 0;
}
.header
    .header-controls
    .controlls-icons-group
    .column-settings-wrap
    .column-settings-trigger.active[data-v-3cc062e4] {
    color: #50c3fe;
}
.header .search-wrapper[data-v-3cc062e4] {
    position: relative;
}
.header .search-wrapper .help-wrapper[data-v-3cc062e4] {
    position: absolute;
    border-radius: 5px;
    z-index: 5000;
    background: #ffffff;
    width: 297px;
    border: 1px solid #e8eaea;
    left: -72px;
    top: 34px;
    font-size: 13px;
    font-weight: normal;
}
.header .search-wrapper .help-wrapper .text-holder[data-v-3cc062e4] {
    padding: 10px;
    position: relative;
    z-index: 4000;
    background: #ffffff;
    user-select: none;
    border-radius: 5px;
}
.header .search-wrapper .help-wrapper[data-v-3cc062e4]:after {
    content: "";
    position: absolute;
    z-index: 3000;
    top: -11px;
    left: 262px;
    border: 6px solid transparent;
    border-bottom: 6px solid #495559;
}
.header .search-wrapper .help-wrapper[data-v-3cc062e4]:before {
    content: "";
    position: absolute;
    z-index: 3002;
    height: 5px;
    top: -11px;
    left: 262px;
    border: 6px solid transparent;
    border-bottom: 6px solid #ffffff;
}
@media (max-width: 1366px) {
    .header[data-v-3cc062e4] {
        min-width: 1020px;
        max-width: 1090px;
    }
}

.card-header-info-block[data-v-c36bf012] {
    display: flex;
    align-items: center;
    padding: 6px 10px 6px 22px;
    box-shadow: inset 0 -1px 0 0 #d7d8d9;
}
.card-header-main[data-v-c36bf012] {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px 10px 16px 22px;
    box-shadow: inset 0 -1px 0 0 #d7d8d9;
}
.profit-block-plug[data-v-c36bf012] {
    display: flex;
    flex-direction: column;
    flex: 1;
}
.inner-profit-block .profit-block-value[data-v-c36bf012] {
    color: #66c400;
}
.profit-block-value[data-v-c36bf012],
.profit-block-math-sign[data-v-c36bf012] {
    font-size: 18px;
    color: #1b2a30;
    font-weight: 600;
}
.diff-line-height[data-v-c36bf012] {
    line-height: 22px;
}
.profit-block-title[data-v-c36bf012] {
    color: #767f83;
    font-size: 12px;
}
.deal-status[data-v-c36bf012] {
    border-radius: 4px;
    padding: 3px 9px;
    color: #ffffff;
}
.revenue-block[data-v-c36bf012],
.cost-price-block[data-v-c36bf012],
.inner-profit-block[data-v-c36bf012],
.math-sign-block[data-v-c36bf012] {
    display: flex;
    flex-direction: column;
    padding-right: 7px;
}
.inner-profit-block[data-v-c36bf012] {
    padding-right: 0;
}
.profit-block[data-v-c36bf012] {
    border: 1px dashed #66c400;
    border-radius: 6px;
    display: flex;
    padding: 5px 10px 5px;
    margin-left: 10px;
}
.status-wrapper[data-v-c36bf012] {
    display: flex;
    max-width: 211px;
}
.link-wrapper[data-v-c36bf012] {
    font-weight: 600;
    font-size: 18px;
    color: #0069e5;
}
.card-title-wrapper[data-v-c36bf012] {
    display: flex;
    align-items: center;
    padding-top: 2px;
}
.link-wrapper[data-v-c36bf012],
.card-title[data-v-c36bf012],
.status-wrapper[data-v-c36bf012] {
    padding-right: 10px;
}
.card-title[data-v-c36bf012] {
    font-weight: 600;
    font-size: 18px;
}
.card-header-wrapper[data-v-c36bf012] {
    display: flex;
    flex-direction: column;
}
.deal-name-wrapper[data-v-c36bf012] {
    display: flex;
    align-items: center;
    max-width: 211px;
}
.external-link[data-v-c36bf012] {
    font-size: 13px;
}
.country-flag-holder[data-v-c36bf012] {
    display: flex;
    align-items: center;
    padding-right: 5px;
}
.country-flag-holder img[data-v-c36bf012] {
    height: 14px;
}
.user-location[data-v-c36bf012] {
    display: flex;
    align-items: baseline;
}
.card-info-item[data-v-c36bf012] {
    display: flex;
    padding-right: 15px;
    color: #767f83;
    font-size: 14px;
}
.card-info-item-interval[data-v-c36bf012] {
    padding-right: 0;
}
.card-info-item-visit[data-v-c36bf012] {
    color: #0069e5;
    cursor: pointer;
}
.card-info-item-visit[data-v-c36bf012]:hover {
    text-decoration: underline;
}
.cutter[data-v-c36bf012] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.external-tooltip-link[data-v-c36bf012] {
    color: #0069e5;
}
.external-tooltip-link[data-v-c36bf012]:hover {
    color: rgba(0, 105, 229, 0.6);
    text-decoration: underline;
}
.tooltip-holder[data-v-c36bf012] {
    display: flex;
    align-items: center;
    padding-left: 5px;
}
.help[data-v-c36bf012] {
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 24px;
    padding: 0 6px;
}
.city-text[data-v-c36bf012] {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.custom-field-wrapper[data-v-69d04f98] {
    display: flex;
    align-items: center;
    box-shadow: inset 0 -1px 0 0 #d7d8d9;
    line-height: 24px;
}
.field-name[data-v-69d04f98] {
    font-size: 13px;
    font-weight: 600;
    color: #1b2a30;
    padding-right: 20px;
    display: flex;
}
.name-holder[data-v-69d04f98] {
    white-space: nowrap;
}
.field-value[data-v-69d04f98],
.empty-value[data-v-69d04f98] {
    font-size: 13px;
    font-weight: 400;
    color: #767f83;
}
.field-value[data-v-69d04f98] {
    display: flex;
}
.empty-value[data-v-69d04f98] {
    font-weight: 600;
}
.cutter[data-v-69d04f98] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.contacts-root[data-v-6bc9a190] {
    display: flex;
    align-items: start;
    font-size: 13px;
    line-height: 18px;
}
.contacts-root .icon-holder[data-v-6bc9a190] {
    margin-right: 10px;
    color: #767f83;
}
.contacts-root .contacts-holder[data-v-6bc9a190] {
    font-weight: 400;
}
.contacts-root .contacts-holder.without-icon[data-v-6bc9a190] {
    padding-left: 19px;
}
.contacts-root .contacts-holder .trunc-text[data-v-6bc9a190] {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    min-width: 0;
}
.contacts-root .copy-button-holder[data-v-6bc9a190] {
    margin-left: 10px;
    color: #0069e5;
    cursor: pointer;
}

.client-info-wrapper[data-v-e2955640] {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
    box-shadow: inset 0 -1px 0 0 #d7d8d9;
}
.client-info-section[data-v-e2955640] {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.client-info-section-bottom[data-v-e2955640] {
    display: flex;
    flex-direction: column;
}
.client-info-title[data-v-e2955640],
.ltv-title[data-v-e2955640],
.client-name-holder[data-v-e2955640],
.ltv-value-holder[data-v-e2955640] {
    margin-bottom: 3px;
}
.client-info-title[data-v-e2955640],
.ltv-title[data-v-e2955640] {
    font-size: 14px;
    font-weight: 400;
    color: #767f83;
}
.client-name-holder[data-v-e2955640] {
    padding-right: 15px;
    color: #0069e5;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}
.ltv-value-holder[data-v-e2955640] {
    font-size: 16px;
    font-weight: 400;
    display: flex;
    flex-shrink: 0;
}
.deals-count[data-v-e2955640] {
    margin-top: 8px;
    color: #767f83;
    font-size: 14px;
    font-weight: 400;
}
.contacts-wrapper[data-v-e2955640] {
    margin-bottom: 8px;
}
.expand-button[data-v-e2955640] {
    display: flex;
    justify-content: center;
    background: #f4f4f5;
    border-radius: 50px;
    cursor: pointer;
}
.expand-button-icon[data-v-e2955640] {
    transform-origin: center;
}
.expand-button-icon.expanded[data-v-e2955640] {
    transform: rotate(180deg);
}

.client-order-wrapper[data-v-745eefd0] {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-left: 3px solid #2589ff;
    box-shadow: inset 0 -1px 0 0 #d7d8d9;
    background: #f4f4f5;
}
.linked-order[data-v-745eefd0] {
    cursor: pointer;
    background: #ffffff;
    border-left: 3px transparent;
}
.order-section[data-v-745eefd0] {
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
}
.section-header[data-v-745eefd0] {
    color: #767f83;
    font-size: 12px;
    font-weight: 400;
}
.order-name[data-v-745eefd0] {
    width: 70%;
    word-break: break-word;
    color: #767f83;
    font-size: 14px;
    font-weight: 600;
}
.status-wrapper[data-v-745eefd0] {
    display: flex;
    max-width: 130px;
}
.order-status[data-v-745eefd0] {
    border-radius: 4px;
    padding: 3px 9px;
    color: #ffffff;
}
.cutter[data-v-745eefd0] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.revenue-value[data-v-745eefd0] {
    font-weight: 600;
    font-size: 16px;
    color: #1b2a30;
}
.revenue-value-wrapper[data-v-745eefd0] {
    display: flex;
    justify-content: flex-end;
    width: calc(48% - 20px);
}

.visit-item-wrapper[data-v-a23e879a] {
    display: flex;
}
.visit-item-info[data-v-a23e879a] {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 8px 10px 8px 30px;
    background: #ffffff;
}
.visit-info-header[data-v-a23e879a] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 7px;
}
.visit-date[data-v-a23e879a],
.user-location[data-v-a23e879a] {
    font-size: 14px;
    font-weight: 400;
    color: #767f83;
    display: flex;
    padding-right: 15px;
}
.visit-info-date[data-v-a23e879a] {
    align-items: center;
    margin-right: 20px;
}
.country-flag-holder[data-v-a23e879a] {
    display: flex;
    margin-right: 5px;
}
.country-flag-holder img[data-v-a23e879a] {
    height: 14px;
}
.visit-info-site[data-v-a23e879a],
.visit-referrer[data-v-a23e879a] {
    font-size: 12px;
    font-weight: 400;
    color: #0069e5;
}
.visit-info-site[data-v-a23e879a]:hover,
.visit-referrer[data-v-a23e879a]:hover {
    color: rgba(0, 105, 229, 0.6);
    text-decoration: underline;
}
.visit-referrer[data-v-a23e879a] {
    display: flex;
    flex-shrink: 0;
}
.visit-info-date[data-v-a23e879a],
.visit-info-site[data-v-a23e879a],
.visit-info-channel[data-v-a23e879a] {
    display: flex;
    align-items: center;
}
.visit-info-channel[data-v-a23e879a] {
    word-break: break-word;
    display: flex;
    align-items: flex-start;
    padding-right: 15px;
}
.visit-info-channel img[data-v-a23e879a] {
    height: 16px;
    padding-right: 5px;
}
.visit-attribution-weight-wrapper[data-v-a23e879a] {
    display: flex;
    justify-content: flex-end;
    position: relative;
    width: 75px;
    flex-shrink: 0;
}
.visit-attribution-weight-bar[data-v-a23e879a] {
    display: flex;
    background: #e8eaea;
    box-shadow: inset 0 0 0 1px #d7d8d9;
}
.visit-attribution-weight-value[data-v-a23e879a] {
    display: flex;
    align-items: center;
    position: absolute;
    left: 10px;
    height: 20px;
    line-height: 20px;
    color: #767f83;
    font-weight: 400;
    font-size: 13px;
    top: calc(50% - 11px);
}
.visit-ball-count[data-v-a23e879a] {
    display: flex;
    width: 20px;
    height: 20px;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    right: -9px;
    transform: translateY(-50%);
    border-radius: 50%;
    font-size: 13px;
    font-weight: 400;
}
.visit-first[data-v-a23e879a] {
    background: #2589ff;
    box-shadow: inset 0 0 0 1px #2589ff;
    color: #fff;
}
.visit-between[data-v-a23e879a] {
    background: #ffffff;
    box-shadow: inset 0 0 0 1px #d7d8d9;
    color: #a4aaac;
}
.visit-last[data-v-a23e879a] {
    background: #66c400;
    box-shadow: inset 0 0 0 1px #66c400;
    color: #ffffff;
}
.visit-period-wrapper[data-v-a23e879a] {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
}
.visit-separator[data-v-a23e879a] {
    position: absolute;
    left: -3px;
    top: 8px;
    background: #d7d8d9;
    border-radius: 50%;
    height: 8px;
    width: 8px;
}
.deal-visit-period[data-v-a23e879a] {
    position: relative;
    display: flex;
    align-items: center;
    height: 24px;
    margin-left: 74px;
    padding-left: 10px;
    box-shadow: inset 1px 0 0 0 #d7d8d9;
}
.visit-section[data-v-a23e879a] {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.deal-card-wrapper[data-v-55f66afb] {
    display: flex;
    width: 100%;
    flex-direction: row;
    background: #f4f4f5;
}
.deal-card-wrapper.with-aside[data-v-55f66afb] {
    max-height: 654px;
}
.deal-card-main[data-v-55f66afb] {
    width: 950px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    background: #ffffff;
}
.loader[data-v-55f66afb] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.deal-card-aside[data-v-55f66afb] {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 340px;
    background: #ffffff;
    margin-left: 12px;
    box-shadow: inset 0 0 0 0 #d7d8d9, -1px 0 0 0 #d7d8d9;
}
.deal-header-wrapper[data-v-55f66afb] {
    display: flex;
    align-items: center;
    padding: 0 8px 0 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: #2589ff;
}
.visits-history-wrapper[data-v-55f66afb] {
    display: flex;
    flex-direction: column;
    padding: 15px 0 20px 22px;
    max-height: 295px;
    background: #f4f4f5;
    box-shadow: inset 0 -1px 0 0 #d7d8d9;
}
.visits-history-title[data-v-55f66afb] {
    font-size: 14px;
    font-weight: 600;
    color: #1b2a30;
    margin-bottom: 10px;
}
.visits-history-holder[data-v-55f66afb] {
    overflow-y: auto;
}
.additional-fields-wrapper[data-v-55f66afb] {
    display: flex;
    flex-direction: column;
    padding: 15px 22px;
    overflow-y: auto;
}
.additional-fields[data-v-55f66afb] {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-column-gap: 2%;
}
.status-row[data-v-55f66afb] {
    font-size: 14px;
    line-height: 26px;
    display: flex;
    border-bottom: 1px solid #d7d8d9;
}
.status-header[data-v-55f66afb] {
    padding: 3px 0;
    font-weight: 600;
}
.status-name[data-v-55f66afb] {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 300px;
}
.status-start-date[data-v-55f66afb],
.status-duration[data-v-55f66afb] {
    display: flex;
    align-items: center;
    justify-content: center;
}
.status-start-date[data-v-55f66afb] {
    width: 280px;
}
.status-duration[data-v-55f66afb] {
    width: 300px;
}
.products-row[data-v-55f66afb] {
    font-size: 14px;
    line-height: 22px;
    padding: 2px 0;
    border-top: 1px solid #d7d8d9;
    display: flex;
}
.no-border[data-v-55f66afb] {
    border: none;
}
.products-header[data-v-55f66afb] {
    padding: 4px 0;
    font-weight: 600;
}
.products-name[data-v-55f66afb] {
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
}
.products-name > span[data-v-55f66afb] {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.products-help[data-v-55f66afb] {
    flex: none;
    margin-left: 8px;
    align-items: center;
}
.products-help-content[data-v-55f66afb] {
    max-height: 300px;
    overflow-y: scroll;
    padding: 4px 8px;
    margin: 10px 0;
}
.products-help-content[data-v-55f66afb]::-webkit-scrollbar-thumb {
    background-color: rgba(209, 212, 214, 0.2);
}
.products-help-row[data-v-55f66afb] {
    display: flex;
    align-items: center;
    font-size: 13px;
}
.products-help-row .products-help-title[data-v-55f66afb] {
    font-weight: 600;
    margin-right: 4px;
}
.products-quantity[data-v-55f66afb],
.products-cost[data-v-55f66afb],
.products-price[data-v-55f66afb] {
    display: flex;
    align-items: center;
    flex: none;
    justify-content: center;
}
.products-cost[data-v-55f66afb],
.products-price[data-v-55f66afb] {
    width: 180px;
}
.products-quantity[data-v-55f66afb] {
    width: 150px;
}
.products-quantity[data-v-55f66afb],
.products-price[data-v-55f66afb] {
    padding-left: 8px;
}
.client-order-holder[data-v-55f66afb] {
    overflow-y: auto;
    flex-grow: 1;
}
.client-orders-paginator[data-v-55f66afb] {
    padding: 10px;
}

.table-wrapper[data-v-1d90f067] {
    min-width: 960px;
    max-width: 1240px;
    min-height: 400px;
    max-height: 800px;
    padding: 0px;
    overflow: auto;
}
@media (max-height: 930px) {
    .table-wrapper[data-v-1d90f067] {
        max-height: 545px;
    }
}
@media (max-width: 1366px) {
    .table-wrapper[data-v-1d90f067] {
        max-width: 1090px;
    }
}

.delete-button-block[data-v-7484d347] {
    display: flex;
    align-items: center;
    margin-left: 32px;
}
.delete-button[data-v-7484d347] {
    margin-left: 12px;
}
.delete-confirm[data-v-7484d347] {
    margin-top: 10px;
}
.delete-confirm span[data-v-7484d347] {
    margin-left: 5px;
}

.notification-wrapper[data-v-002812c7] {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 5px 7px rgba(0, 0, 0, 0.25);
}
.notification-wrapper .content[data-v-002812c7] {
    display: flex;
    align-items: center;
    padding: 13px 0;
    background: #0f181b;
    opacity: 0.9;
    border-radius: 4px 0 0 4px;
}
.notification-wrapper .content .icon[data-v-002812c7] {
    padding: 0 12px;
    color: #66c400;
}
.notification-wrapper .content .image[data-v-002812c7] {
    padding: 0 12px;
}
.notification-wrapper .content .image img[data-v-002812c7] {
    width: 18px;
}
.notification-wrapper .content .text[data-v-002812c7] {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 13px;
    color: #ffffff;
    padding-right: 10px;
}
.notification-wrapper .close-notification[data-v-002812c7] {
    padding: 19px 16px;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    background: #0f181b;
    opacity: 0.9;
    border-radius: 0 4px 4px 0;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #ffffff;
    cursor: pointer;
}
.notification-wrapper .close-notification[data-v-002812c7]:hover {
    opacity: 0.85;
}
.notification-wrapper .close-notification[data-v-002812c7]:active {
    opacity: 0.9;
}

.error[data-v-a84f797a] {
    min-width: 960px;
    max-width: 1240px;
}
.footer-block[data-v-a84f797a] {
    display: flex;
}
.deal-list-paginator[data-v-a84f797a] {
    height: 34px;
    display: flex;
    align-items: center;
}
.delete-deal-block[data-v-a84f797a] {
    margin-left: 52px;
}
.notification-excel-status[data-v-a84f797a] {
    position: absolute;
    top: 10px;
    right: 9px;
    z-index: 9999;
}
.notification-excel-status-enter-active[data-v-a84f797a],
.notification-excel-status-leave-active[data-v-a84f797a] {
    transition: right 1000ms ease;
}
.notification-excel-status-enter[data-v-a84f797a],
.notification-excel-status-leave-to[data-v-a84f797a] {
    right: -9999px;
}

.level-column[data-v-0ec002b5] {
    width: 100%;
    display: flex;
    align-items: center;
}
.level-column img[data-v-0ec002b5] {
    margin-right: 4px;
    height: 16px;
}
.tooltip-wrapper[data-v-0ec002b5] {
    width: 100%;
    padding-right: 16px;
}
.level-text[data-v-0ec002b5] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.clickable[data-v-0ec002b5] {
    cursor: pointer;
}
.total-title[data-v-0ec002b5] {
    color: #8f989c;
}

.visit-target a[data-v-3f6c638a] {
    font-size: 12px;
    color: #0069e5;
}
.visit-target a[data-v-3f6c638a]:hover {
    text-decoration: underline;
}

.visit-refer[data-v-2b29a307] {
    margin-bottom: 7px;
}
.visit-refer a[data-v-2b29a307] {
    font-size: 12px;
    color: #0069e5;
}
.visit-refer a[data-v-2b29a307]:hover {
    text-decoration: underline;
}

.visit-info[data-v-01563c36] {
    display: flex;
    width: 100%;
    padding: 15px 20px;
    background: #f1f2f3;
}
.visit-info .visit-info-left[data-v-01563c36] {
    width: 70%;
}
.visit-info .visit-date-and-location[data-v-01563c36] {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    color: #a4aaac;
}
.visit-info .visit-date-and-location .visit-date[data-v-01563c36] {
    margin-right: 20px;
}
.visit-info .visit-date-and-location .visit-location[data-v-01563c36] {
    display: flex;
    align-items: center;
}
.visit-info .visit-date-and-location .visit-location img[data-v-01563c36] {
    width: 18px;
    height: 11px;
    margin-right: 6px;
}
.visit-info .visit-channel[data-v-01563c36],
.visit-info .visit-agent[data-v-01563c36],
.visit-info .visit-os[data-v-01563c36] {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}
.visit-info .visit-channel img[data-v-01563c36],
.visit-info .visit-agent img[data-v-01563c36],
.visit-info .visit-os img[data-v-01563c36] {
    width: 16px;
    height: 16px;
    margin-right: 6px;
}
.visit-info .visit-agent[data-v-01563c36],
.visit-info .visit-os[data-v-01563c36] {
    justify-content: flex-end;
}
.visit-info .visit-info-right[data-v-01563c36] {
    width: 30%;
    text-align: right;
}

.order-item[data-v-0cc35aff] {
    display: flex;
    align-items: center;
    margin-top: 10px;
}
.order-item .order-link[data-v-0cc35aff] {
    color: #0069e5;
    cursor: pointer;
}
.order-item .order-link[data-v-0cc35aff]:hover {
    text-decoration: underline;
}
.order-item .order-status-wrapper[data-v-0cc35aff] {
    margin-left: 10px;
}
.order-item .order-revenue[data-v-0cc35aff] {
    margin-left: 10px;
}
.order-item .order-revenue .order-revenue-sum[data-v-0cc35aff] {
    font-weight: bold;
}
.order-item .order-status[data-v-0cc35aff] {
    display: inline-block;
    margin-left: 7px;
    padding: 0 8px;
    box-shadow: #d7d8d9 0 0 0 1px inset;
    font-size: 13px;
    line-height: 20px;
    color: #767f83;
    border-radius: 4px;
}

.order-info[data-v-2261382d] {
    padding: 10px 20px 20px 20px;
    max-height: calc(100vh - 298px);
    overflow: scroll;
}
.order-info .order-info-title[data-v-2261382d] {
    font-size: 14px;
    font-weight: 600;
    line-height: 24px;
}

.visit-card-wrapper[data-v-c3ca2014] {
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    min-height: 200px;
    width: 920px;
}
.visit-card-info[data-v-c3ca2014] {
    padding: 15px 20px;
    background: #f1f2f3;
}
.visit-header-wrapper[data-v-c3ca2014] {
    padding: 8px 0;
}
.visit-header-wrapper .visit-id[data-v-c3ca2014] {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
}
.loader[data-v-c3ca2014] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.layout {
    position: fixed;
    top: 40px;
    right: 0;
    bottom: 0;
    z-index: 1500;
}

.header[data-v-86c02fce] {
    min-width: 1170px;
    max-width: 1240px;
    display: flex;
    justify-content: space-between;
}
.header .header-text[data-v-86c02fce] {
    display: flex;
    align-items: center;
    font-weight: 900;
}
.header .header-text .subtitle[data-v-86c02fce] {
    font-size: 14px;
    margin-left: 10px;
    color: #767f83;
    font-weight: 400;
}
.header .header-controlls[data-v-86c02fce] {
    display: flex;
    align-items: center;
}
.header .header-controlls .controlls-icons-group[data-v-86c02fce] {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 13px;
    border-left: 1px solid #e8eaea;
    border-right: 1px solid #e8eaea;
}
.header .header-controlls .controlls-icons-group div[data-v-86c02fce] {
    color: rgba(27, 42, 48, 0.4);
    cursor: pointer;
}

.comment[data-v-3c6b04aa] {
    display: flex;
    flex: 1;
    width: 100%;
}
.comment .text-view[data-v-3c6b04aa] {
    display: flex;
    align-items: center;
    width: 100%;
}
.comment .text-view span[data-v-3c6b04aa] {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.comment .text-view .empty-comment[data-v-3c6b04aa] {
    color: #767f83;
}
.comment .text-view .edit-control[data-v-3c6b04aa] {
    margin-left: auto;
    color: #2589ff;
    cursor: pointer;
}
.comment .text-view .tooltip-block[data-v-3c6b04aa] {
    min-width: 0;
}
.comment .input-view[data-v-3c6b04aa] {
    display: flex;
    flex: 1;
}
.comment .input-view .input-wrap[data-v-3c6b04aa] {
    width: 160px;
}
.comment .input-view .controls[data-v-3c6b04aa] {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
}
.comment .input-view .controls .control[data-v-3c6b04aa] {
    margin-left: 12px;
    cursor: pointer;
}
.comment .input-view .controls .save[data-v-3c6b04aa] {
    color: #2589ff;
}
.comment .input-view .controls .delete[data-v-3c6b04aa] {
    color: #ff4f00;
}

.geo[data-v-7dbc3fbc] {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}
.geo img[data-v-7dbc3fbc] {
    object-fit: contain;
    margin-right: 5px;
    width: 16px;
}
.geo .value[data-v-7dbc3fbc] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.lead[data-v-10adde36] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 13px;
    color: #1b2a30;
}
.lead .link-wrap[data-v-10adde36] {
    margin-left: 10px;
    color: #0069e5;
}

.record[data-v-c5774862] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.status-cell[data-v-34a0f890] {
    font-size: 13px;
    height: 16px;
    border-radius: 4px;
    overflow: hidden;
    white-space: nowrap;
    display: flex;
    align-items: center;
    color: #1b2a30;
}
.status-cell .missing[data-v-34a0f890] {
    padding: 0 8px;
    background: #f35050;
    color: #ffffff;
    line-height: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-shadow: #f35050 0px 0px 0px 1px inset;
}

.visit[data-v-7552c941] {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
}
.visit img[data-v-7552c941] {
    width: 16px;
    margin-right: 5px;
}
.visit .value[data-v-7552c941] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.visit .utm[data-v-7552c941] {
    margin-left: 4px;
    padding-top: 4px;
    color: #767f83;
}

.decimal-part[data-v-dab615ac] {
    font-size: 12px;
}

.tags[data-v-16468734] {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.tags-add-block[data-v-16468734] {
    cursor: pointer;
    color: #2589ff;
}
.tags-info[data-v-16468734] {
    width: 100%;
    min-width: 0;
}
.tags-content[data-v-16468734] {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.tags-items[data-v-16468734] {
    width: 100%;
    display: flex;
    overflow: hidden;
    margin-right: 4px;
}
.tags-label[data-v-16468734] {
    background-color: #8f989c;
    color: #ffffff;
    font-size: 13px;
    min-width: calc(33.3% - 8px);
    margin-right: 8px;
    padding: 4px 12px;
    border-radius: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
}
.tags-more-label[data-v-16468734] {
    background-color: #d1d4d6;
    color: #495559;
}
.tooltip-content[data-v-16468734] {
    width: 400px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.tooltip-content .tags-label[data-v-16468734] {
    margin-bottom: 8px;
}
.tags-create-content[data-v-16468734] {
    width: 250px;
    padding: 12px 16px;
}
.tags-create-header[data-v-16468734] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
.tags-create-footer[data-v-16468734] {
    margin-top: 12px;
    color: #0069e5;
}

.table-wrapper[data-v-9172a43a] {
    min-width: 960px;
    max-width: 1240px;
    height: 400px;
    padding: 0px;
    overflow: auto;
}

.call-list-paginator[data-v-522d83dc] {
    display: flex;
    align-items: center;
    padding: 8px;
}

.client-info-wrapper[data-v-617d3c43] {
    display: flex;
    flex-direction: column;
}
.client-info-section[data-v-617d3c43] {
    display: flex;
    padding: 20px 20px 14px;
    box-shadow: inset 0 -1px 0 0 #d1d4d6;
}
.client-email[data-v-617d3c43],
.client-phone[data-v-617d3c43],
.client-name[data-v-617d3c43],
.client-days[data-v-617d3c43],
.client-location[data-v-617d3c43] {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 6px;
}
.client-name[data-v-617d3c43] {
    color: #1b2a30;
    font-size: 18px;
    font-weight: 900;
}
.client-name.crm[data-v-617d3c43] {
    padding-right: 5px;
    color: #0069e5;
}
.icon-holder.crm[data-v-617d3c43] {
    color: #0069e5;
    font-size: 12px;
    margin-bottom: 6px;
}
.icon-holder[data-v-617d3c43] {
    padding-right: 10px;
    font-size: 15px;
    color: #767f83;
}
.payment-progress-section[data-v-617d3c43] {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    box-shadow: inset 0 -1px 0 0 #d1d4d6;
}
.progress-value-item[data-v-617d3c43] {
    display: flex;
    flex-direction: column;
}
.progress-value-title[data-v-617d3c43] {
    font-size: 12px;
    color: #767f83;
    font-weight: 400;
    line-height: 24px;
}
.progress-value[data-v-617d3c43] {
    font-size: 14px;
    font-weight: 700;
    color: #1b2a30;
    line-height: 24px;
}
.visits-geographic[data-v-617d3c43] {
    padding: 20px;
    display: flex;
    flex-direction: column;
}
.visit-geo-title[data-v-617d3c43] {
    font-size: 14px;
    font-weight: 700;
    color: #1b2a30;
    padding-bottom: 12px;
}
.geo-item[data-v-617d3c43] {
    display: flex;
    align-items: center;
}
.visit-city[data-v-617d3c43] {
    color: #1b2a30;
    margin-right: 8px;
    font-size: 14px;
}
.visit-date[data-v-617d3c43] {
    color: #767f83;
    font-size: 13px;
}
.country-flag-holder[data-v-617d3c43] {
    display: flex;
    align-items: center;
    padding-right: 8px;
}
.country-flag-holder img[data-v-617d3c43] {
    height: 14px;
}
.client-info-section .avatar[data-v-617d3c43] {
    border-radius: 50%;
    width: 96px;
    height: 96px;
    overflow: hidden;
    margin-right: 16px;
    border: 2px solid #0069e5;
}
.client-info-section .avatar img[data-v-617d3c43] {
    height: 100%;
}
.client-info-section .empty-avatar[data-v-617d3c43] {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #0069e5;
    border: 2px solid #0069e5;
    width: 96px;
    height: 96px;
    overflow: hidden;
    margin-right: 16px;
}
.client-info-section .empty-name[data-v-617d3c43] {
    font-size: 32px;
    font-weight: bolder;
    color: #f4f4f5;
}

.event-text-wrapper[data-v-5de3048b] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    display: flex;
    flex: 1;
}

.event-text-wrapper[data-v-6cfec7d8] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
}
.event-text-wrapper .text-holder[data-v-6cfec7d8] {
    font-style: italic;
}
.event-text-wrapper .event-section[data-v-6cfec7d8] {
    display: flex;
    line-height: 20px;
}
.event-text-wrapper .event-section .status[data-v-6cfec7d8] {
    color: #ffffff;
    font-size: 13px;
    background: #2589ff;
    border-radius: 4px;
    padding: 0 8px;
    margin-top: 4px;
}

.event-text-wrapper[data-v-26f68471] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    flex: 1;
}
.event-text-wrapper .text-holder[data-v-26f68471] {
    font-style: italic;
}

.event-text-wrapper[data-v-33f88b4b] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
}
.event-text-wrapper .text-holder[data-v-33f88b4b] {
    font-style: italic;
}

.event-text-wrapper[data-v-59fa3032] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    display: flex;
    flex: 1;
}
.event-text-wrapper .status[data-v-59fa3032] {
    display: flex;
    color: #ffffff;
    font-size: 13px;
    background: #2589ff;
    border-radius: 4px;
    padding: 0 8px;
    margin-left: 4px;
}

.event-text-wrapper[data-v-86716c96] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    display: flex;
    flex: 1;
}

.event-text-wrapper[data-v-792cce29] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    flex: 1;
}
.event-text-wrapper .event-link[data-v-792cce29] {
    color: #0069e5;
    word-break: break-all;
}
.event-text-wrapper .event-link[data-v-792cce29]:hover {
    color: rgba(0, 105, 229, 0.6);
    text-decoration: underline;
}

.event-text-wrapper[data-v-36b224e6] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    flex: 1;
}
.event-text-wrapper .event-link[data-v-36b224e6] {
    color: #0069e5;
    word-break: break-all;
}
.event-text-wrapper .event-link[data-v-36b224e6]:hover {
    color: rgba(0, 105, 229, 0.6);
    text-decoration: underline;
}
.event-text-wrapper .status[data-v-36b224e6] {
    color: #ffffff;
    font-size: 13px;
    border-radius: 4px;
    padding: 0 8px;
    margin-top: 4px;
    display: inline-block;
}

.event-text-wrapper[data-v-28d9a606] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 1px;
    margin-bottom: 8px;
    line-height: 20px;
    flex: 1;
}
.event-text-wrapper .download-rec[data-v-28d9a606] {
    color: #0069e5;
    word-break: break-all;
    cursor: pointer;
}
.event-text-wrapper .download-rec[data-v-28d9a606]:hover {
    color: rgba(0, 105, 229, 0.6);
    text-decoration: underline;
}

.simple-event-wrapper[data-v-b23b1f3e] {
    display: flex;
}
.simple-event-wrapper .event-text-wrapper[data-v-b23b1f3e] {
    color: #1b2a30;
    font-size: 13px;
    padding-top: 2px;
    margin-bottom: 10px;
}
.simple-event-wrapper .event-text-wrapper .text-holder[data-v-b23b1f3e] {
    font-style: italic;
}
.simple-event-wrapper .icon-wrapper[data-v-b23b1f3e] {
    margin-right: 16px;
    border: 1px solid;
    display: flex;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    font-size: 11px;
}

.layout {
    position: fixed;
    top: 40px;
    right: 0;
    bottom: 0;
    z-index: 1499;
}

@keyframes SpinnerAnimation {
    0% {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.Spinner {
    animation: SpinnerAnimation 1.25s infinite linear;
    border: 4px solid #038cd5;
    border-right-color: transparent !important;
    border-radius: 1pc;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    overflow: hidden;
    text-indent: -9999px;
}

.view-icon-source {
    display: flex;
    flex: 0 0 auto;
    box-sizing: border-box;
}
.icon-type-2 {
    width: 5px;
}

.notifyjs-corner {
    position: fixed;
    margin: 5px;
    z-index: 1050;
}

.notifyjs-corner .notifyjs-wrapper,
.notifyjs-corner .notifyjs-container {
    position: relative;
    display: block;
    height: inherit;
    width: inherit;
    margin: 3px;
}

.notifyjs-wrapper {
    z-index: 1;
    position: absolute;
    display: inline-block;
    height: 0;
    width: 0;
}

.notifyjs-container {
    display: none;
    z-index: 1;
    position: absolute;
    cursor: pointer;
}

[data-notify-text],
[data-notify-html] {
    position: relative;
}

.notifyjs-arrow {
    position: absolute;
    z-index: 2;
    width: 0;
    height: 0;
}

.table-tr {
    display: flex;
    align-items: stretch;
    height: 34px;
    margin-bottom: 0px;
}
.table-tr:hover [class*="iconsContainer"] {
    display: flex;
}
.table-tr:hover [class*="utm"] {
    display: block;
}
.table-tr:hover [class*="icon"] {
    display: flex;
}
.table-tr:hover [class*="clickable"] {
    cursor: pointer;
    color: #0878b4;
    font-weight: 600;
}
.table-tr:hover [class*="iconWrapper"] {
    display: flex;
}

.table-th {
    display: flex;
    align-items: center;
    flex: none;
    padding: 0 8px 0 5px;
    vertical-align: middle;
    border-left: 1px solid #f1f2f3;
    /* border-bottom: 1px solid #f1f2f3; */
    cursor: pointer;
    position: relative;
    background: rgb(255, 255, 255);
    /* box-shadow: #f1f2f3 1px 0px 0px 0px; */
    padding-left: 9px;

    max-width: 110px;
    width: 110px;
}
.table-th-first {
    max-width: 300px;
    width: 300px;
}
.container-th {
    flex: 1;
    display: flex;
    min-width: 0;
    justify-content: flex-start;
}
.text-th {
    font-size: 12px;
    line-height: 0.7rem;
    font-weight: 600;
    min-width: 0;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
}

.infoCell {
    display: flex;
    position: relative;
    align-items: center;
    overflow: hidden;
}
.infoCellText- {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
}

.resizer {
    z-index: 1000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100%;
    margin-left: -5px;

    width: 5px;
    cursor: col-resize;
}

.resizer:hover {
    background: rgba(230, 230, 230, 0.5);
}

.levelsFilterItem-2145058326:last-child {
    padding-bottom: 0;
}

.option {
    flex: 0 0 auto;
    cursor: pointer;
    line-height: 1rem;
    padding: 0.2rem 1rem;
    /* border-top: 1px solid #f1f2f3; */
}

.optionTitle-2 {
    flex-direction: column;
    margin-right: auto;
    font-family: PTSans, sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
    color: #1b2a30;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.option:hover {
    background-color: #e5f3fb;
}

.table-head {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 34px;
    background: #fff;
    /* border-top: 1px solid #f1f2f3; */
    /* border-bottom: 1px solid #f1f2f3; */
}
.table-head .table-th {
    justify-content: flex-end;
}
.table-head .table-td.table-td-first {
    justify-content: flex-start;
}
.infoCell-1 {
    display: flex;
    position: relative;
    min-width: 0;
}

.title-1 {
    margin-right: 5px;
    min-width: 0;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
    /* overflow: hidden; */
}
.icon-question {
    font-size: 10px;
    color: #b0b9bd;
    font-weight: 900;
}

.table-td {
    display: flex;
    align-items: center;
    flex: none;
    padding: 0 8px 0 10px;
    vertical-align: middle;
    overflow: hidden;
    background: inherit;
    /* border-bottom: 1px solid #f1f2f3; */
    /* border-left: 1px solid #f1f2f3; */
    justify-content: flex-end;
}

.icon-source {
    width: 16px;
    height: 16px;
    overflow: hidden;
    align-items: center;
    margin-right: 5px;
}
.icon-source-img {
    margin: 0;
    padding: 0;
    border: 0;
    width: inherit;
}

.dimension-1 {
    display: flex;
    min-width: 0;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-items: center;
}

/* ======================================= */
/* === PIXEL TO PIXEL === */

.table-head {
    position: sticky;
    top: 0;
    z-index: 20;
    background-color: #fff;
}
.table-head .table-td-first {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 30;
    background-color: #fff;
    font-size: 12px;
    font-weight: bold;
}
.table-body .table-td-first {
    position: sticky;
    left: 0;
    z-index: 10;
}

.table-tr {
    border-bottom: 1px solid #f1f2f3;
}
.item-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: 0;
}

.dimension-text {
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-flex;
}
.dimension-name {
    display: inline-block;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.open-level {
    font-size: 14px;
    font-weight: 700;
    color: #0878b4;
    width: 15px;
    min-width: 15px;
    flex: 0 0 0%;
    cursor: pointer;
    z-index: 2;
}

.dm-icon-container img {
    max-width: 100%;
    max-height: 100%;
}

.min-value {
    border-bottom: 1px solid #e0571a;
    line-height: 14px;
}

.average {
    font-weight: 600;
}

.progress-wrap {
    flex: 1;
    height: 20px;
    line-height: 20px;
    position: relative;
    background-color: #f3f4f4;
    border-radius: 3px;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.first-column {
    position: sticky;
    left: 146px;
    z-index: 100;
    box-shadow: #f1f2f3 1px 0px 0px 0px;
    padding-left: 20px;
    border-left-width: 0px;
    width: 300px;
    justify-content: flex-start;
}
.maxValue-186541386 {
    /* border-bottom: 1px solid #70c316; */
    line-height: 14px;
}

.table-td-first {
    /* border-color: #e8e9ea; */
}
.SOURCE_LVL_2 .table-td-first {
    /* padding-left: 15px; */
    /* width: calc(300px - 22px * 1); */
    /* left: calc(22px * 1); */
    border-left: calc(22px * 1) solid #f1f2f3;
}
.SOURCE_LVL_3 .table-td-first {
    /* padding-left: 30px; */
    /* width: calc(300px - 22px * 2); */
    /* left: calc(22px * 2); */
    border-left: calc(22px * 2) solid #f1f2f3;
}
.SOURCE_LVL_4 .table-td-first {
    /* padding-left: 45px; */
    /* width: calc(300px - 22px * 3); */
    /* left: calc(22px * 3); */
    border-left: calc(22px * 3) solid #f1f2f3;
}
.SOURCE_LVL_5 .table-td-first {
    /* padding-left: 60px; */
    /* width: calc(300px - 22px * 4); */
    /* left: calc(22px * 4); */
    border-left: calc(22px * 4) solid #f1f2f3;
}
.SOURCE_LVL_6 .table-td-first {
    /* padding-left: 75px; */
    /* width: calc(300px - 22px * 5); */
    /* left: calc(22px * 5); */
    border-left: calc(22px * 5) solid #f1f2f3;
}

.table-head {
    position: sticky;
    top: calc(34px * 0);
    z-index: 120;
}
.table-avg-sum {
    position: sticky;
    top: calc(34px * 1);
    z-index: 110;
}
.SOURCE_LVL_1 .body-row.table-tr {
    position: sticky;
    top: calc(34px * 2);
    z-index: 90;
}
.SOURCE_LVL_2 .body-row.table-tr {
    position: sticky;
    top: calc(34px * 3);
    z-index: 80;
}
.SOURCE_LVL_3 .body-row.table-tr {
    position: sticky;
    top: calc(34px * 4);
    z-index: 70;
}
.SOURCE_LVL_4 .body-row.table-tr {
    position: sticky;
    top: calc(34px * 5);
    z-index: 60;
}
.SOURCE_LVL_5 .body-row.table-tr {
    position: sticky;
    top: calc(34px * 6);
    z-index: 50;
}
.SOURCE_LVL_6 .body-row.table-tr {
    position: sticky;
    top: calc(34px * 7);
    z-index: 40;
}

.SOURCE_LVL_1.close + .SOURCE_LVL_2,
.SOURCE_LVL_1.close + .SOURCE_LVL_3,
.SOURCE_LVL_1.close + .SOURCE_LVL_4,
.SOURCE_LVL_1.close + .SOURCE_LVL_5,
.SOURCE_LVL_1.close + .SOURCE_LVL_6 {
    display: none;
}
.SOURCE_LVL_2.close ~ .SOURCE_LVL_3 {
    display: none;
}
.SOURCE_LVL_3.close ~ .SOURCE_LVL_4 {
    display: none;
}
.SOURCE_LVL_4.close ~ .SOURCE_LVL_5 {
    display: none;
}
.SOURCE_LVL_5.close ~ .SOURCE_LVL_6 {
    display: none;
}

.SOURCE_LVL_1 > .children .table-td-first .dimension-1 {
    padding-left: 10px;
}
.SOURCE_LVL_2 > .children .table-td-first .dimension-1 {
    padding-left: 20px;
}
.SOURCE_LVL_3 > .children .table-td-first .dimension-1 {
    padding-left: 30px;
}
.SOURCE_LVL_4 > .children .table-td-first .dimension-1 {
    padding-left: 40px;
}
.SOURCE_LVL_5 > .children .table-td-first .dimension-1 {
    padding-left: 45px;
}
.SOURCE_LVL_1.close .children,
.SOURCE_LVL_2.close .children,
.SOURCE_LVL_3.close .children,
.SOURCE_LVL_4.close .children,
.SOURCE_LVL_5.close .children,
.SOURCE_LVL_6.close .children {
    display: none;
}

.table-td-first {
    position: sticky;
}

.table-td b {
    color: #b4b4b4;
    font-size: 0.8em;
}
.table-body > div > .table-parent.open .table-parent-tr {
    height: 8px;
    background: #dfe2e7;
}
.fixed-column {
    position: sticky;
    left: 0;
    z-index: 1;
    background: #ffffff;
}
</style>
