import { DB_BOOLEAN } from "@/shared/types";
import * as Schemes from "./scheme";
import { z } from "zod";
export enum STATUS_ALLOCATION {
    IN_PROGRESS = 1,
    PAID = 2,
    CANCELED = 3,
}
export type AmoExistComplex = z.infer<
    typeof Schemes.SAmoIntegrationExistComplex
>;
export type AmoPipelineStatus = z.infer<typeof Schemes.SAmoAmoPipelineStatus>;
export type AmoPipelineStatusItems = z.infer<
    typeof Schemes.SAmoAmoPipelineStatusItems
>;
export type AmoPostSettingAllocation = {
    status_id: number;
    status_allocation: STATUS_ALLOCATION;
    pipeline_id: number;
};
export type AmoPostSetting = {
    responsible_user_id: number | null;
    pipeline_id: number | null;
    profit: number | null;
    cost: number | null;
    revenue: number | null;
    filter: number | null;
    send_leads_to_unsorted: DB_BOOLEAN | null;
    filtering_value: string | null; //regex
    form_id: string | null;
    form_name: string | null;
};
export type AmoField = z.infer<typeof Schemes.SAmoField>;
export type AmoPipeline = z.infer<typeof Schemes.SAmoPipeline>;
export type AmoUser = z.infer<typeof Schemes.SAmoUser>;
export type AmoUserFull = z.infer<typeof Schemes.SAmoUserFull>;
export type AmoUrl = z.infer<typeof Schemes.SAmoUrl>;
export type AmoPipelineItems = z.infer<typeof Schemes.SAmoPipelineItems>;
export type AmoSettingAllocation = z.infer<
    typeof Schemes.SAmoSettingAllocation
>;
