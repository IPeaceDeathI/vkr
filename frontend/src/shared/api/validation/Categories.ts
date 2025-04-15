import { z } from "zod";

export const getResponseData = z.object({
    category_id: z.number(),
    category_name: z.string(),
    category_position: z.number(),
});
export const getResponseDataSchema = z.array(getResponseData);
export const postResponseDataSchema = z.number();
