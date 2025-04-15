import { WidgetArea, WidgetStatus } from "@/types";
import { z } from "zod";

const ResponseDataSchema = z.object({
    widget_id: z.number(),
    site_page_id: z.number(),
    status: z.nativeEnum(WidgetStatus),
    name: z.string(),
    css: z.string().nullable(),
    js: z.string().nullable(),
    html: z.string().nullable(),
    file: z.string().nullable(),
    area: z.nativeEnum(WidgetArea),
    created_at: z.string(),
    updated_at: z.string(),
    position: z.number(),
});
export const getResponseDataSchema = z.array(ResponseDataSchema);
