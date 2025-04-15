import { z } from "zod";

export const SStat = z.object({
    stat_id: z.number(),
    flow_id: z.number(),
    user_id: z.number(),
    name: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const SStatHash = z.object({
    stat_id: z.number(),
    hash_stat_id: z.string(),
});
