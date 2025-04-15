import { Api } from "@/shared/api";
import { TemplateCategoriesGetResponseData } from "@/shared/api/models";
export class TemplateCategoriesModel {
    private static categories: null | TemplateCategoriesGetResponseData = null; //cache
    public static async get() {
        if (TemplateCategoriesModel.categories === null) {
            TemplateCategoriesModel.categories =
                await Api.TemplateCategories().GET();
        }
        return TemplateCategoriesModel.categories;
    }
}
