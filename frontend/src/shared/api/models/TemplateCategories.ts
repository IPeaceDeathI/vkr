import { ApiModel } from "./main";
import { z } from "zod";
export const TemplateCategoriesDataSchema = z.object({
    created_at: z.string(),
    updated_at: z.string(),
    name: z.string(),
    category_id: z.number(),
});

const getResponseDataSchema = z.array(TemplateCategoriesDataSchema);

export type TemplateCategoriesGetResponseData = z.infer<
    typeof getResponseDataSchema
>;

export class ApiTemplateCategories extends ApiModel {
    private static instance: ApiTemplateCategories;
    private localBaseUrl = "constructor/template_category";
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiTemplateCategories.instance) {
            ApiTemplateCategories.instance = new ApiTemplateCategories();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiTemplateCategories.instance;
    }
    public async GET(): Promise<TemplateCategoriesGetResponseData> {
        const result: TemplateCategoriesGetResponseData = await this.get(
            {
                url: `${this.localBaseUrl}`,
            },
            getResponseDataSchema
        );
        return result;
    }
}
