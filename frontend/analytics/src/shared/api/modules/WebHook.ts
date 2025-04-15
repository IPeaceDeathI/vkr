import {
    SWebhookComplex,
    SWebhookSettingsSource,
    WebhookComplex,
    WebhookSettings,
    WebhookSettingsSource,
} from "@/entities/webhook";
import { BaseApi } from "./BaseApi";
import { z } from "zod";

export class ApiWebHook extends BaseApi {
    private static instance: ApiWebHook;
    private stat_id = 0;
    private integration_id = 0;
    private localBaseUrl = ``;
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiWebHook.instance) {
            ApiWebHook.instance = new ApiWebHook();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiWebHook.instance;
    }
    public async postIntegrationSourceWebhook(stat_id: number) {
        const result: number = await this.post(
            {
                url: `/stat/${stat_id}/integration/source/webhook/standart`,
            },
            z.number()
        );
        return result;
    }
    public async getExistComplex(integration_id: number, stat_id: number) {
        const result: WebhookComplex = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/standart/auth`,
            },
            SWebhookComplex
        );
        return result;
    }

    public async editSettingSourceWebhook(
        stat_id: number,
        integration_id: number,
        data: WebhookSettings
    ) {
        const result: boolean = await this.put(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/standart/setting`,
                data: data,
            },
            z.boolean()
        );

        return result;
    }

    public async getSettingSourceWebhook(
        integration_id: number,
        stat_id: number
    ) {
        const result: WebhookSettingsSource = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/webhook/standart/setting`,
            },
            SWebhookSettingsSource
        );
        return result;
    }
}
