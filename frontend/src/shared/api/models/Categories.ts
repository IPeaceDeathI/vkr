import {
    getResponseDataSchema,
    postResponseDataSchema,
} from "../validation/Categories";

import { ApiModel } from "./main";

type CategoryId = number;
export interface CategoriesData {
    category_id: number;
    category_name: string;
    category_position: number;
}
export interface CategoriesPOSTData {
    category_name: string;
    category_position?: number;
}

export class ApiCategories extends ApiModel {
    private static instance: ApiCategories;
    private localBaseUrl = "/constructor/categories_blocks";
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiCategories.instance) {
            ApiCategories.instance = new ApiCategories();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiCategories.instance;
    }
    public async POST(data: CategoriesPOSTData): Promise<CategoryId> {
        return this.post(
            {
                url: `${this.localBaseUrl}`,
                data: data,
            },
            postResponseDataSchema
        );
    }
    public GET(): Promise<Array<CategoriesData>> {
        return this.get(
            {
                url: `${this.localBaseUrl}`,
            },
            getResponseDataSchema
        );
    }
}
