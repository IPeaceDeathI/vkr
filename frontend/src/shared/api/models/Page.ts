import { ApiModel } from "./main";
import { z } from "zod";

export interface PostPutData {
    structure?: string;
    last_structure?: string;
    html?: string;
    style?: string;
    preview_src?: string;
}
const getResponseDataSchema = z.object({
    id: z.number(),
    page_id: z.number(),
    user_id: z.number(),
    structure: z.string().nullable(),
    last_structure: z.string().nullable(),
    html: z.string().nullable(),
    style: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    site_page: z.object({
        id: z.number(),
        id_user_create: z.number().nullable(),
        uri: z.string().nullable(),
        hash_uri: z.string().nullable(),
        title: z.string().nullable(),
        description: z.string().nullable(),
        id_site: z.number().nullable(),
        views: z.number().nullable(),
        add_date_time: z.string(),
        update_date_time: z.string(),
        preview_src: z.string().nullable(),
        status: z.number(),
    }),
});
export type GetResponseData = z.infer<typeof getResponseDataSchema>;

export class ApiPage extends ApiModel {
    private static instance: ApiPage;
    private localBaseUrl = "/constructor/pages";
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiPage.instance) {
            ApiPage.instance = new ApiPage();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiPage.instance;
    }
    public async GET(site_page_id: number): Promise<GetResponseData> {
        const result: GetResponseData = await this.get(
            {
                url: `${this.localBaseUrl}/${site_page_id}`,
            },
            getResponseDataSchema
        );
        return result;
    }
    public async POST(site_page_id: number, data: PostPutData): Promise<null> {
        const result: null = await this.post(
            {
                url: `${this.localBaseUrl}/${site_page_id}`,
                data: data,
            },
            z.null()
        );
        return result;
    }
    public async PUT(
        site_page_id: number,
        data: PostPutData
    ): Promise<boolean> {
        const result: boolean = await this.put(
            {
                url: `${this.localBaseUrl}/${site_page_id}`,
                data: data,
            },
            z.boolean()
        );
        return result;
    }
}
