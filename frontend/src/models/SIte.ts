import { Api } from "@/shared/api";
import { SiteGetSettingResponseData } from "@/shared/api/models";
import { SiteData } from "@/types";
export class SiteModel {
    public static async getSetting(id: number): Promise<SiteData> {
        return SiteModel.convertApiToModel(await Api.Site().GET_SETTING(id));
    }
    private static convertApiToModel(
        data: SiteGetSettingResponseData
    ): SiteData {
        return {
            accessCode: data.access_code,
            subDomain: data.sub_domain,
            preview: data.preview,
        };
    }
}
