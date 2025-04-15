import { number, z } from "zod";

export const SAmoInfo = z.object({
    limit: z.number(),
    count: z.number(),
    pages: z.number(),
    nextPage: z.string().nullable(),
    prevPage: z.string().nullable(),
});

export const SAmoIntegrationExistComplex = z.object({
    auth: z.boolean(),
    setting: z.optional(z.boolean()),
    status_allocation: z.boolean(),
});

export const SAmoAmoPipelineStatusItems = z.object({
    id: z.number(),
    pipeline_id: z.number(),
    name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    show_name: z.string(),
});
export const SAmoAmoPipelineStatus = z.object({
    info: SAmoInfo,
    items: z.array(SAmoAmoPipelineStatusItems),
});
export const SAmoField = z.object({
    id: z.number(),
    integration_id: z.number(),
    name: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
export const SAmoPipelineItems = z.object({
    id: z.number(),
    integration_id: z.number(),
    name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});
export const SAmoPipeline = z.object({
    info: SAmoInfo,
    items: z.array(SAmoPipelineItems),
});

export const SAmoUser = z.object({
    id: z.number(),
    integration_id: z.number(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.string(),
    updated_at: z.string(),
});
export const SAmoUserFull = z.object({
    info: SAmoInfo,
    items: z.array(SAmoUser),
});

export const SAmoUrl = z.string().url();

export const SAmoFieldFull = z.object({
    info: SAmoInfo,
    items: z.array(SAmoField),
});

export const SAmoSettingAllocation = z.object({
    integration_id: z.number(),
    status_id: z.number(),
    pipeline_id: z.number(),
    status_allocation: z.number(),
});
