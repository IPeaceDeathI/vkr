import { Api } from "@/shared/api";
import { TemplateManyQueryParams, TemplatePostData } from "@/shared/api/models";
export class TemplateModel {
    public static get(id: number) {
        return Api.Template().GET({ type: "unit", id: id });
    }
    public static getAll(queryParams: TemplateManyQueryParams) {
        return Api.Template().GET({
            type: "many",
            queryParams: queryParams,
        });
    }
    public static addNew(data: TemplatePostData) {
        return Api.Template().POST(data);
    }
    public static edit(id: number, data: TemplatePostData) {
        return Api.Template().PUT(id, data);
    }
    public static delete(id: number) {
        return Api.Template().DELETE(id);
    }
}
