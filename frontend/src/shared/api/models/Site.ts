import { ApiModel } from "./main";
import { z } from "zod";

const getSettingResponseDataSchema = z.object({
    access_code: z.number(),
    sub_domain: z.string(),
    preview: z.string().url().nullable(),
    code_head: z.string().nullable(),
    code_body: z.string().nullable(),
});

export type SiteGetSettingResponseData = z.infer<
    typeof getSettingResponseDataSchema
>;

export class ApiSite extends ApiModel {
    private localBaseUrl = "site/";
    private static instance: ApiSite;
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiSite.instance) {
            ApiSite.instance = new ApiSite();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiSite.instance;
    }
    public async GET_SETTING(
        siteID: number
    ): Promise<SiteGetSettingResponseData> {
        const result: SiteGetSettingResponseData = await this.get(
            {
                url: `${this.localBaseUrl}${siteID}/setting`,
            },
            getSettingResponseDataSchema
        );
        return result;
    }
}
