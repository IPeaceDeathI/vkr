import {
    AnaliticRowsItem,
    ReportAnalitic,
    ReportData,
    ReportInfo,
    ReportInfoFields,
    ReportItem,
} from "./types";
import { ApiReport } from "@/shared/api/modules/Report";
export class ReportModel {
    static async getAllReport(stat_id: number): Promise<Array<ReportItem>> {
        return ApiReport.getInstance().getAllReport(stat_id);
    }
    static async postReport(
        stat_id: number,
        data: ReportData
    ): Promise<number> {
        return ApiReport.getInstance().postReport(stat_id, data);
    }
    static async getReportById(
        stat_id: number,
        report_id: number
    ): Promise<ReportItem> {
        return ApiReport.getInstance().getReportById(stat_id, report_id);
    }
    static async getReportAnalitic(
        stat_id: number,
        report_id: number,
        date: string
    ): Promise<ReportAnalitic> {
        return ApiReport.getInstance().getReportAnalitic(
            stat_id,
            report_id,
            date
        );
    }
    static async getReportAnaliticChild(
        stat_id: number,
        report_id: number,
        next: string,
        data: string
    ): Promise<Array<AnaliticRowsItem>> {
        const result = await ApiReport.getInstance().getReportAnaliticSub(
            stat_id,
            report_id,
            next,
            data
        );
        return result.rows;
    }

    static async getReportInfo(
        report_type: number
    ): Promise<Array<ReportInfoFields>> {
        const result = await ApiReport.getInstance().getReportInfoByType(
            report_type
        );
        return result.fields;
    }
    static async getReportInfoAll(): Promise<Array<ReportInfo>> {
        const result = await ApiReport.getInstance().getReportInfo();
        return result;
    }
}
