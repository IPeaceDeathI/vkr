import { z } from "zod";

export enum CHANNEL_COMPAIGN_STATUS {
    IGNORE = 0,
    ALLOWED = 1,
}
export const SChannelCompaign = z.object({
    campaign_id: z.number(),
    name: z.string(),
    created_at: z.string().datetime(),
    status: z.nativeEnum(CHANNEL_COMPAIGN_STATUS),
});
