import { Api } from "@/shared/api";
import { GetResponseData } from "@/shared/api/models";
import { PageData } from "@/types";
export class PageModel {
    public static async getSetting(id: number): Promise<PageData> {
        return PageModel.convertApiToModel(await Api.Page().GET(id));
    }
    private static convertApiToModel(data: GetResponseData): PageData {
        return {
            uri: data.site_page.uri ?? "",
        };
    }
}
