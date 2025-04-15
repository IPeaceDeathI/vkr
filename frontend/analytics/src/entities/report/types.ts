import * as Schemes from "./scheme";
import { z } from "zod";

export type Reports = z.infer<typeof Schemes.SReport>;
export type ReportItem = z.infer<typeof Schemes.SReportItem>;
export type ReportData = z.infer<typeof Schemes.SReportData>;
export type ReportAnalitic = z.infer<typeof Schemes.SReportAnalitic>;
export type AnaliticRowsItem = z.infer<typeof Schemes.SAnaliticRowsItem>;
export type AnaliticColumnData = z.infer<typeof Schemes.SAnaliticColumnData>;
export type AnaliticRows = z.infer<typeof Schemes.SAnaliticRows>;
export type AnaliticRowsInfo = z.infer<typeof Schemes.SAnaliticRowsInfo>;
export type AnaliticRowsItemChildren = z.infer<
    typeof Schemes.SAnaliticRowsItemChildren
>;
export type ReportAnaliticChild = z.infer<typeof Schemes.SReportAnaliticChild>;

export type Children = z.infer<typeof Schemes.SAnaliticRows>;

const SChildren: z.ZodType<Children> = Schemes.SAnaliticRows.extend({
    children: z.array(z.lazy(() => SChildren)).optional(),
});

export type ReportInfo = z.infer<typeof Schemes.SReportInfo>;

export type ReportInfoFields = z.infer<typeof Schemes.SReportInfoFields>;
export type AnaliticColumnDataString = z.infer<
    typeof Schemes.SAnaliticColumnDataString
>;
