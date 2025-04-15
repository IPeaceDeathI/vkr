import { ApiNoks } from "@/shared/api/modules/Noks";
import { setAsyncTimeout } from "@/shared/libs/async";
import {
    WebhookComplex,
    WebhookSettings,
    WebhookSettingsSource,
} from "./types";
import { ApiWebHook } from "@/shared/api/modules/WebHook";
import { ApiIntegration } from "@/shared/api/modules/Integration";
import { ApiFlexbe } from "@/shared/api/modules/Flexbe";
import { ApiTilda } from "@/shared/api/modules/Tilda";
// import { NoksSites } from "./types";

export class WebhookModel {
    // static async postIntegration(
    //     stat_id: number,
    //     name: string
    // ): Promise<number> {
    //     return ApiNoks.getInstance().postIntegrationSource(stat_id, name);
    // }

    // static async postIntegrationAuthSource(
    //     stat_id: number,
    //     integration_id: number,
    //     site_id: number
    // ): Promise<boolean> {
    //     return ApiNoks.getInstance().postAuthSource(
    //         stat_id,
    //         integration_id,
    //         site_id
    //     );
    // }

    static async getSourceWebhook(
        integration_id: number,
        stat_id: number,
        integration_type: number
    ): Promise<WebhookComplex | undefined> {
        if (integration_type == 2) {
            return ApiWebHook.getInstance().getExistComplex(
                integration_id,
                stat_id
            );
        } else if (integration_type == 3) {
            return ApiFlexbe.getInstance().getAuthWebHookFlexbe(
                integration_id,
                stat_id
            );
        } else if (integration_type == 4) {
            return ApiTilda.getInstance().getAuthWebHookTilda(
                integration_id,
                stat_id
            );
        } else {
            return;
            // return ApiWebHook.getInstance().getExistComplex(
            //     integration_id,
            //     stat_id
            // );
        }
    }
    static async putSettingSourceWebhook(
        integration_id: number,
        stat_id: number,
        data: WebhookSettings,
        integration_type: number
    ): Promise<boolean> {
        if (integration_type == 2) {
            return ApiWebHook.getInstance().editSettingSourceWebhook(
                stat_id,
                integration_id,
                data
            );
        } else if (integration_type == 3) {
            return ApiFlexbe.getInstance().editSettingWebHookFlexbe(
                stat_id,
                integration_id,
                data
            );
        } else if (integration_type == 4) {
            return ApiTilda.getInstance().editSettingWebHookTilda(
                stat_id,
                integration_id,
                data
            );
        } else {
            return ApiWebHook.getInstance().editSettingSourceWebhook(
                stat_id,
                integration_id,
                data
            );
        }
    }
    static async getSettingSourceWebhook(
        integration_id: number,
        stat_id: number,
        integration_type: number
    ): Promise<WebhookSettingsSource | undefined> {
        if (integration_type == 2) {
            return ApiWebHook.getInstance().getSettingSourceWebhook(
                integration_id,
                stat_id
            );
        } else if (integration_type == 3) {
            return ApiFlexbe.getInstance().getSettingSourceWebHookFlexbe(
                integration_id,
                stat_id
            );
        } else if (integration_type == 4) {
            return ApiTilda.getInstance().getSettingSourceWebHookTilda(
                integration_id,
                stat_id
            );
        } else {
            return;
        }
    }
}
