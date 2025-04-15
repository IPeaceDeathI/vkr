// import { ApiYandexDirect } from "@/shared/api/modules/YandexDirect";
import { ApiYandexDirect } from "@/shared/api/modules";
import {
    YandexDirectAuth,
    YandexDirectSetting,
    putYandexDirectSetting,
    postYandexDirectIntegration,
    putYandexDirectCampaign,
    postYandexDirectAuth,
} from "./types";
// import { ApiYandexDirect } from "../../api/modules/YandexDirect";

export class YandexDirectModel {
    // SETTING CHANNEL YANDEX DIRECT
    static async putSettingChannel(
        stat_id: number,
        integration_id: number,
        data: putYandexDirectSetting
    ): Promise<boolean> {
        return ApiYandexDirect.getInstance().PUT_SETTING(
            stat_id,
            integration_id,
            data
        );
    }

    // INTEGRATION CHANNEL YANDEX.DIRECT
    static async postIntegrationChannel(
        stat_id: number,
        data: postYandexDirectIntegration
    ): Promise<number> {
        return ApiYandexDirect.getInstance().POST_INTEGRATION(stat_id, data);
    }

    // SETTING CAMPAIGN
    static async putSettingCampaign(
        stat_id: number,
        integration_id: number,
        data: putYandexDirectCampaign
    ): Promise<boolean> {
        return ApiYandexDirect.getInstance().PUT_CAMPAIGN(
            stat_id,
            integration_id,
            data
        );
    }

    // SETTING CHANNEL YANDEX DIRECT
    static async getSettingChannel(
        stat_id: number,
        integration_id: number
    ): Promise<YandexDirectSetting> {
        return ApiYandexDirect.getInstance().GET_SETTING(
            stat_id,
            integration_id
        );
    }

    // AUTH CHANNEL YANDEX DIRECT
    static async postAuthChannel(
        stat_id: number,
        integration_id: number,
        data: postYandexDirectAuth
    ): Promise<boolean> {
        return ApiYandexDirect.getInstance().POST_AUTH(
            stat_id,
            integration_id,
            data
        );
    }

    // EXIST COMPLEX CHANNEL YANDEX.DIRECT
    static async getExistChannel(
        stat_id: number,
        integration_id: number
    ): Promise<YandexDirectAuth> {
        return ApiYandexDirect.getInstance().GET_EXIST(stat_id, integration_id);
    }

    static async getCampaignChannels(stat_id: number, integration_id: number) {
        return ApiYandexDirect.getInstance().getCampaignChannels(
            stat_id,
            integration_id
        );
    }
}
