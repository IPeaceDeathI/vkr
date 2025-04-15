import {
    SWebhookComplex,
    SWebhookSettingsSource,
    WebhookComplex,
    WebhookSettings,
    WebhookSettingsSource,
} from "@/entities/webhook";
import { BaseApi } from "./BaseApi";
import { z } from "zod";

export class ApiTilda extends BaseApi {
    private static instance: ApiTilda;
    private stat_id = 0;
    private integration_id = 0;
    private localBaseUrl = ``;
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiTilda.instance) {
            ApiTilda.instance = new ApiTilda();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiTilda.instance;
    }
    public async postIntegrationSourceWebhook(stat_id: number) {
        const result: number = await this.post(
            {
                url: `/stat/${stat_id}/integration/source/webhook/tilda`,
            },
            z.number()
        );
        return result;
    }
    public async getAuthWebHookTilda(integration_id: number, stat_id: number) {
        const result: WebhookComplex = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/tilda/auth`,
            },
            SWebhookComplex
        );
        return result;
    }

    public async editSettingWebHookTilda(
        stat_id: number,
        integration_id: number,
        data: WebhookSettings
    ) {
        const result: boolean = await this.put(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/tilda/setting`,
                data: data,
            },
            z.boolean()
        );

        return result;
    }

    public async getSettingSourceWebHookTilda(
        integration_id: number,
        stat_id: number
    ) {
        const result: WebhookSettingsSource = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/tilda/setting`,
            },
            SWebhookSettingsSource
        );
        return result;
    }
}
