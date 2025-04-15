import { z } from "zod";

export const SYandexDirectEntity = z.object({
    campaign_id: z.number(),
    name: z.string(),
    status: z.number(), // 0 or 1
    created_at: z.string().datetime(),
});
