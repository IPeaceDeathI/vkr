import {
    ReportAnalitic,
    ReportData,
    ReportItem,
    AnaliticRows,
    SReportAnalitic,
    SReportItem,
    SAnaliticRows,
    SReportInfo,
    ReportInfo,
} from "@/entities/report";
import { BaseApi } from "./BaseApi";
import { z } from "zod";

export class ApiReport extends BaseApi {
    private static instance: ApiReport;
    private readonly API_BASE_URL = "/stat";

    private constructor() {
        super();
    }
    public static getInstance(): ApiReport {
        if (!ApiReport.instance) {
            ApiReport.instance = new ApiReport();
        }
        return ApiReport.instance;
    }
    public async getAllReport(stat_id: number) {
        const result: Array<ReportItem> = await this.get(
            {
                url: `/stat/${stat_id}/report`,
            },
            z.array(SReportItem)
        );
        return result;
    }
    public async getReportById(stat_id: number, report_id: number) {
        const result: ReportItem = await this.get(
            {
                url: `/stat/${stat_id}/report/${report_id}`,
            },
            SReportItem
        );
        return result;
    }
    public async postReport(stat_id: number, data: ReportData) {
        const result: number = await this.post(
            {
                url: `/stat/${stat_id}/report`,
                data: data,
            },
            z.number()
        );
        return result;
    }

    public async getReportAnalitic(
        stat_id: number,
        report_id: number,
        date: string
    ) {
        const result: ReportAnalitic = await this.post(
            {
                url: `/stat/${stat_id}/report/${report_id}/analytic_data?${date}`,
            },
            SReportAnalitic
        );

        return result;
    }
    public async getReportAnaliticSub(
        stat_id: number,
        report_id: number,
        next: string,
        data: string
    ) {
        const result: ReportAnalitic = await this.post(
            {
                url: `/stat/${stat_id}/report/${report_id}/analytic_data${next}`,
                data: { position: data },
            },
            SReportAnalitic
        );
        return result;
    }

    public async getReportInfoByType(report_type: number) {
        const result: ReportInfo = await this.get(
            {
                url: `/stat/report/info/type/${report_type}`,
            },

            SReportInfo
        );
        return result;
    }
    public async getReportInfo() {
        const result: Array<ReportInfo> = await this.get(
            {
                url: `/stat/report/info`,
            },

            z.array(SReportInfo)
        );
        return result;
    }
}
