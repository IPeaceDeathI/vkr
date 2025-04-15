import { number, z } from "zod";

export const SNoksSitesItem = z.object({
    site_id: z.number(),
    name: z.string(),
});

export const SNoksSites = z.array(SNoksSitesItem);

export const SNoksComplex = z.object({
    auth: z.boolean(),
    setting: z.boolean(),
});
// export const SWebhookComplex = z.object({
//     integration_id: z.number(),
//     key: z.string(),
//     webhook_url: z.string(),
// });
