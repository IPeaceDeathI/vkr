import { IntegrationItem } from "./types";
import { ApiIntegration } from "@/shared/api/modules/Integration";
import { ApiAmo, ApiYandexDirect } from "@/shared/api/modules";
import {
    CATEGORY_ADVERTISING_CHANNELS,
    CATEGORY_CRM,
    CATEGORY_LEAD_SOURCE,
    INTEGRATION_CATEGORY,
    INTEGRATION_STATUS,
    INTEGRATION_TYPE,
} from "./scheme";
import { postYandexDirectIntegration } from "../yandex-direct";
import { ApiNoks } from "@/shared/api/modules/Noks";
import { ApiWebHook } from "@/shared/api/modules/WebHook";
import { ApiFlexbe } from "@/shared/api/modules/Flexbe";
import { ApiTilda } from "@/shared/api/modules/Tilda";
export class IntegrationModel {
    static async getAll(stat_id: number): Promise<Array<IntegrationItem>> {
        return ApiIntegration.getInstance().getAllIntegration(stat_id);
    }

    static async get(
        stat_id: number,
        integration_id: number
    ): Promise<IntegrationItem> {
        const result = await ApiIntegration.getInstance().getIntegrationById(
            stat_id,
            integration_id
        );

        return result[0];
    }

    static async postIntegration(
        stat_id: number,
        status: INTEGRATION_STATUS,
        type: number,
        data: postYandexDirectIntegration,
        integration_type: INTEGRATION_CATEGORY
    ): Promise<number> {
        switch (integration_type) {
            case INTEGRATION_CATEGORY.LEAD_SOURCE:
                if (type === CATEGORY_LEAD_SOURCE.NOKS_SITE) {
                    return ApiNoks.getInstance().postIntegrationSource(
                        stat_id,
                        "Название сайта"
                    );
                } else if (type === CATEGORY_LEAD_SOURCE.WEBHOOK) {
                    return ApiWebHook.getInstance().postIntegrationSourceWebhook(
                        stat_id
                    );
                } else if (type === CATEGORY_LEAD_SOURCE.FLEXBE) {
                    return ApiFlexbe.getInstance().postIntegrationSourceWebhook(
                        stat_id
                    );
                } else if (type === CATEGORY_LEAD_SOURCE.TILDA) {
                    return ApiTilda.getInstance().postIntegrationSourceWebhook(
                        stat_id
                    );
                } else {
                    return 0;
                }
                break;
            case INTEGRATION_CATEGORY.CRM:
                if (type === CATEGORY_CRM.amoCRM) {
                    return ApiAmo.getInstance().postIntegrationCRM(
                        stat_id,
                        status
                    );
                } else {
                    return 0;
                }
                break;
            case INTEGRATION_CATEGORY.ADVERTISING_CHANNELS:
                if (type === CATEGORY_ADVERTISING_CHANNELS.YANDEX_DIRECT) {
                    return ApiYandexDirect.getInstance().POST_INTEGRATION(
                        stat_id,
                        { name: "" }
                    );
                } else {
                    return 0;
                }
                break;
            default:
                return ApiNoks.getInstance().postIntegrationSource(
                    stat_id,
                    "Название сайта"
                );
        }
    }
}
