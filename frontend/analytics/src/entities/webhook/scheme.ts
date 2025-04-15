import { number, z } from "zod";

export enum IS_ENABLE {
    off = 0,
    on = 1,
}

export const SWebhookComplex = z.object({
    integration_id: z.number(),
    key: z.string(),
    webhook_url: z.string(),
});

export const SWebhookSettings = z.object({
    is_enable_sending_lead: z.nativeEnum(IS_ENABLE),
    is_enable_creating_lead_without_contacts: z.nativeEnum(IS_ENABLE),
});

export const SWebhookSettingsSource = z.object({
    integration_id: z.number(),
    is_enable_sending_lead: z.nativeEnum(IS_ENABLE),
    is_enable_creating_lead_without_contacts: z.nativeEnum(IS_ENABLE),
    created_at: z.string(),
    updated_at: z.string(),
});
