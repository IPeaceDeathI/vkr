import { defineStore } from "pinia";
import { ReportModel } from "./model";
import {
    ReportAnalitic,
    ReportData,
    ReportItem,
    ReportAnaliticChild,
} from "./types";

export const useReportStore = defineStore("report", {
    state: () => ({
        reports: undefined as undefined | Array<ReportItem>,
        selectedReportId: undefined as undefined | number,
        reportById: undefined as undefined | ReportAnalitic,
        reportWithChild: undefined as undefined | ReportAnaliticChild,
        reportDate: "" as string,
    }),
    getters: {
        getAllReports: (state) => {
            return state.reports;
        },
        getReportById: (state) => {
            return state.reportById;
        },
    },
    actions: {
        async fetchReport(stat_id: number) {
            this.reports = undefined;
            const report = await ReportModel.getAllReport(stat_id);
            this.reports = report;
            if (this.reports.length > 0) {
                this.selectedReportId = this.reports[0].report_id;
            } else {
                const report_first = await this.postReport(stat_id, {
                    report_type: 1,
                    name: "Основной",
                    show_columns: [],
                });
                this.selectedReportId = report_first;
            }
        },
        async fetchReportById(
            stat_id: number,
            report_id: number,
            date: string
        ) {
            this.reportById = undefined;
            this.reportWithChild = undefined;
            const report = await ReportModel.getReportAnalitic(
                stat_id,
                report_id,
                date
            );

            this.reportById = report;
            report?.rows.forEach((row: any) => {
                row.children = [];
            });
            this.reportWithChild = report as ReportAnaliticChild;
        },
        fetchReportPushChild(index: number, child: any, hash: string) {
            if (this.reportWithChild) {
                addObjectToArrayByKey(this.reportWithChild.rows, hash, child);
            }
        },
        setDateReport(date: string) {
            this.reportDate = date;
        },
        setSelectedReportId(id: number): boolean {
            //Если id отсутсвует у юзера
            if (
                !this.reports?.find((report) => {
                    return report.report_id === id;
                })
            ) {
                return false;
            }
            this.selectedReportId = id;
            return true;
        },
        async postReport(stat_id: number, data: ReportData): Promise<number> {
            const result = await ReportModel.postReport(stat_id, data);
            const statByNewId = await ReportModel.getReportById(
                stat_id,
                result
            );

            if (result && this.reports && statByNewId) {
                this.reports.push(statByNewId);
            }
            return result;
        },
        async init(stat_id: number): Promise<boolean> {
            try {
                await Promise.all([this.fetchReport(stat_id)]);
                return true;
            } catch (error) {
                return false;
            }
        },
    },
});

function addObjectToArrayByKey(rows: any[], key: string, childToAdd: any) {
    for (const row of rows) {
        if (row.info.hash_position === key && row) {
            if (!row.children) {
                row.children = []; // Создание массива, если он еще не существует
            }
            for (let i = 0; i < childToAdd.length; i++) {
                row.children.push(childToAdd[i]);
            }
            return true; // Объект найден и добавлен, завершаем поиск
        }
        // Проверяем дочерние объекты, если они есть
        if (row.children && row.children.length > 0) {
            const childAdded = addObjectToArrayByKey(
                row.children,
                key,
                childToAdd
            );
            if (childAdded) {
                return true; // Объект найден и добавлен в дочерний массив
            }
        }
    }
    return false; // Объект с указанным хешем не найден в этом массиве и его дочерних массивах
}
