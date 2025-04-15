import { z } from "zod";

export const SReportItem = z.object({
    report_id: z.number(),
    report_type: z.number(),
    name: z.string(),
    order_nesting: z.array(z.array(z.number())),
    show_columns: z.array(z.string()),
    created_at: z.string(),
    updated_at: z.string(),
});
export const SReport = z.array(SReportItem);
export const SReportData = z.object({
    name: z.string(),
    report_type: z.number(),
    // order_nesting: z.array(z.number()),
    show_columns: z.array(z.string()),
});
export const SAnaliticRowsInfo = z.object({
    row_name: z.string(),
    next: z.string(),
    position: z.string(),
    hash_position: z.string(),
    main_criteria_id: z.optional(z.number()),
    main_criteria_name: z.optional(z.string()),
    icon: z.string().nullable(),
});
// integration_id: z.number(),
// main_criteria_id: z.number(),
// main_criteria_name: z.string(),
// channel_name: z.string(),
// campaign_name: z.string(),
// group_name: z.string(),
// criteria: z.string(),
// is_autotargeting: z.number(),
export const SAnaliticColumnData = z.object({
    clicks: z.optional(z.number()),
    conversions: z.optional(z.number()),
    impressions: z.optional(z.number()),
    percent_conversion: z.optional(z.number()),
    ctr: z.optional(z.number()),
    total_consumption: z.optional(z.number()),
    price_goal: z.optional(z.number()),
    cpc: z.optional(z.number()),
    avg_cost_per_thousand_impressions: z.optional(z.number()),
    count_leads_canceled: z.optional(z.number()),
    count_leads_in_progress: z.optional(z.number()),
    count_leads_paid: z.optional(z.number()),
    count_leads: z.optional(z.number()),
    visits: z.optional(z.number()),
    profit: z.optional(z.number()),
    revenue: z.optional(z.number()),
});
export const SAnaliticColumnDataString = z.object({
    clicks: z.optional(z.string()),
    conversions: z.optional(z.string()),
    impressions: z.optional(z.string()),
    percent_conversion: z.optional(z.string()),
    ctr: z.optional(z.string()),
    total_consumption: z.optional(z.string()),
    price_goal: z.optional(z.string()),
    cpc: z.optional(z.string()),
    avg_cost_per_thousand_impressions: z.optional(z.string()),
    count_leads_canceled: z.optional(z.string()),
    count_leads_in_progress: z.optional(z.string()),
    count_leads_paid: z.optional(z.string()),
    count_leads: z.optional(z.string()),
    visits: z.optional(z.string()),
    profit: z.optional(z.string()),
    revenue: z.optional(z.string()),
});

//row
export const SAnaliticRowsItem = z.object({
    info: SAnaliticRowsInfo,
    column_data: SAnaliticColumnData,
});

export const SAnaliticRows = z.object({
    rows: z.array(SAnaliticRowsItem),
});

export const SReportAnalitic = z.object({
    columns_header: z.optional(SAnaliticColumnDataString),
    columns: z.array(z.string()),
    columns_type: SAnaliticColumnDataString, //z.object({}),
    rows: z.array(SAnaliticRowsItem),
});

// SAnaliticColumnDataString,

// .default([
//     "visits",
//     "percent_conversion",
//     "count_leads",
//     "clicks",
//     "ctr",
//     "conversions",
//     "impressions",
//     "total_consumption",
//     "cpc",
//     "avg_cost_per_thousand_impressions",
//     "price_goal",
// ])
//with dhildren
export const SAnaliticRowsItemChildren = z.object({
    info: SAnaliticRowsInfo,
    column_data: SAnaliticColumnData,
    children: z.array(z.any()),
});
export const SReportAnaliticChild = z.object({
    columns_header: SAnaliticColumnDataString,
    columns: z.array(z.string()),
    columns_type: SAnaliticColumnDataString,
    rows: z.array(SAnaliticRowsItemChildren),
});

export const SReportInfoFields = z.object({
    name: z.string(),
    header: z.string(),
    type_column: z.string(),
});

export const SReportInfo = z.object({
    show_fields: z.array(z.string()),
    order_nesting: z.array(z.array(z.number())),
    nesting: z.array(
        z.object({
            value: z.number(),
            header: z.string(),
        })
    ),
    name: z.string(),
    type: z.number(),
    fields: z.array(SReportInfoFields),
    implementation: z.boolean(),
});
