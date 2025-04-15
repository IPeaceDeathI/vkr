import { ApiModel } from "./main";
import { z } from "zod";
import { TemplateCategoriesDataSchema } from "./TemplateCategories";
const getResponseUnitDataSchema = z.object({
    template_id: z.number(),
    status: z.number().nullable(),
    name: z.string(),
    preview_url: z.string().url().nullable(),
    structure: z.string().nullable(),
    last_structure: z.string().nullable(),
    template_created_at: z.string(),
    template_updated_at: z.string(),
    categories: z.array(TemplateCategoriesDataSchema),
});
const TemplateInfoSchema = z.object({
    limit: z.number(),
    count: z.number(),
    pages: z.number(),
    nextPage: z.string().url().nullable(),
    prevPage: z.string().url().nullable(),
});
export const TemplateSchema = z.object({
    name: z.string(),
    status: z.number().nullable(),
    preview_url: z.string().url().nullable(),
    structure: z.string().nullable(),
    last_structure: z.string().nullable(),
    categories: z.array(z.number()).min(1),
});
const getResponseManyDataSchema = z.object({
    info: TemplateInfoSchema,
    items: z.array(getResponseUnitDataSchema),
});
export type TemplateGetResponseData = z.infer<typeof getResponseUnitDataSchema>;
export type TemplatePostData = z.infer<typeof TemplateSchema>;
export type ManyTemplateGetResponseData = z.infer<
    typeof getResponseManyDataSchema
>;

export type TemplateManyQueryParams = {
    full: boolean;
    limit: number;
    page: number;
};

type GetUnitMethodParams = {
    type: "unit";
    id: number;
};
type GetManyMethodParams = {
    type: "many";
    queryParams: TemplateManyQueryParams;
};
export class ApiTemplate extends ApiModel {
    private static instance: ApiTemplate;
    private localBaseUrl = "constructor/template";
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiTemplate.instance) {
            ApiTemplate.instance = new ApiTemplate();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiTemplate.instance;
    }
    //TODO добавить типизацию для short
    public async GET(
        data: GetUnitMethodParams
    ): Promise<TemplateGetResponseData>;
    public async GET(
        data: GetManyMethodParams
    ): Promise<ManyTemplateGetResponseData>;
    public async GET(data: GetUnitMethodParams | GetManyMethodParams) {
        const schema =
            data.type === "unit"
                ? getResponseUnitDataSchema
                : getResponseManyDataSchema;
        const url =
            data.type === "unit"
                ? `${this.localBaseUrl}/${data.id}`
                : `${this.localBaseUrl}`;
        const params = data.type === "unit" ? undefined : data.queryParams;
        const result: TemplateGetResponseData | ManyTemplateGetResponseData =
            await this.get(
                {
                    url: url,
                    params: params,
                },
                schema
            );
        return result;
    }
    public async POST(data: TemplatePostData): Promise<0> {
        return this.post({ url: this.localBaseUrl, data: data }, z.number());
    }
    public async PUT(id: number, data: TemplatePostData): Promise<boolean> {
        return this.put(
            { url: `${this.localBaseUrl}/${id}`, data: data },
            z.boolean()
        );
    }
    public async DELETE(id: number): Promise<boolean> {
        return this.delete({ url: `${this.localBaseUrl}/${id}` }, z.boolean());
    }
}
