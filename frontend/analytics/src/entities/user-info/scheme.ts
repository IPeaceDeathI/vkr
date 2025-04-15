import { z } from "zod";

export const SUserInfoStat = z.object({
    stat_id: z.number(),
    flow_id: z.number(),
    user_id: z.number(),
    name: z.string(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});
