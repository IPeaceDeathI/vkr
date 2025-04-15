import {
    SWebhookComplex,
    SWebhookSettingsSource,
    WebhookComplex,
    WebhookSettings,
    WebhookSettingsSource,
} from "@/entities/webhook";
import { BaseApi } from "./BaseApi";
import { z } from "zod";

export class ApiFlexbe extends BaseApi {
    private static instance: ApiFlexbe;
    private stat_id = 0;
    private integration_id = 0;
    private localBaseUrl = ``;
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiFlexbe.instance) {
            ApiFlexbe.instance = new ApiFlexbe();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiFlexbe.instance;
    }
    public async postIntegrationSourceWebhook(stat_id: number) {
        const result: number = await this.post(
            {
                url: `/stat/${stat_id}/integration/source/webhook/flexbe`,
            },
            z.number()
        );
        return result;
    }
    public async getAuthWebHookFlexbe(integration_id: number, stat_id: number) {
        const result: WebhookComplex = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/flexbe/auth`,
            },
            SWebhookComplex
        );
        return result;
    }

    public async editSettingWebHookFlexbe(
        stat_id: number,
        integration_id: number,
        data: WebhookSettings
    ) {
        const result: boolean = await this.put(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/flexbe/setting`,
                data: data,
            },
            z.boolean()
        );

        return result;
    }

    public async getSettingSourceWebHookFlexbe(
        integration_id: number,
        stat_id: number
    ) {
        const result: WebhookSettingsSource = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/flexbe/setting`,
            },
            SWebhookSettingsSource
        );
        return result;
    }
}
