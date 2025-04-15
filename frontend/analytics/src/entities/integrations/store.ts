import { defineStore } from "pinia";
import { Integration, IntegrationItem } from "./types";
import { IntegrationModel } from "./model";
import {
    INTEGRATION_CATEGORY,
    INTEGRATION_STATUS,
    INTEGRATION_TYPE,
    CATEGORY_CRM,
} from "./scheme";
import { postYandexDirectIntegration } from "../yandex-direct";
import { WebhookModel, WebhookSettingsSource } from "../webhook";
import { intersection } from "zod";
import { ApiIntegration } from "@/shared/api/modules/Integration";

export const useIntegrationStore = defineStore("integration-store", {
    state: () => ({
        integrationListIsUpdating: true as boolean,
        integrationListUpdatingError: false as false | string,
        integrationList: [] as Array<IntegrationItem>,
        integrationWebhookSettings: undefined as
            | undefined
            | WebhookSettingsSource,
        integrationLeadSourceType: -1 as number,
    }),
    getters: {
        getAllCRM: (state) => {
            return state.integrationList.filter((int) => {
                return int.integration_type === INTEGRATION_CATEGORY.CRM;
            });
        },
        getAmoCRM: (state) => {
            return state.integrationList.filter((int) => {
                return (
                    int.type === CATEGORY_CRM.amoCRM &&
                    int.integration_type === INTEGRATION_CATEGORY.CRM
                );
            });
        },
        getWehookIntegration: (state) => {
            return state.integrationList.filter((int) => {
                return (
                    int.type ===
                        INTEGRATION_TYPE[INTEGRATION_CATEGORY.LEAD_SOURCE]
                            .WEBHOOK &&
                    int.integration_type === INTEGRATION_CATEGORY.LEAD_SOURCE
                );
            });
        },
        getAllLeadSource: (state) => {
            return state.integrationList.filter((int) => {
                return (
                    int.integration_type === INTEGRATION_CATEGORY.LEAD_SOURCE
                );
            });
        },
        getAllAdvertisingChannels: (state) => {
            return state.integrationList.filter((int) => {
                return (
                    int.integration_type ===
                    INTEGRATION_CATEGORY.ADVERTISING_CHANNELS
                );
            });
        },
    },

    actions: {
        async updateIntegrationList(stat_id: number) {
            this.integrationListIsUpdating = true;
            this.integrationListUpdatingError = false;
            try {
                this.integrationList = await IntegrationModel.getAll(stat_id);
            } catch (error: any) {
                this.integrationListUpdatingError = error.toString
                    ? error.toString()
                    : "При обновлении интеграция произошла ошибка";
            }
            this.integrationListIsUpdating = true;
        },
        async add(
            stat_id: number,
            status: INTEGRATION_STATUS,
            type: number,
            data: postYandexDirectIntegration,
            integration_type: INTEGRATION_CATEGORY
        ): Promise<number> {
            const result = await IntegrationModel.postIntegration(
                stat_id,
                status,
                type,
                data,
                integration_type
            );
            const addedIntegration = await IntegrationModel.get(
                stat_id,
                result
            );

            this.integrationList.push(addedIntegration);

            //По полученному id получить информацию об интеграции и положить в стору.
            return result;
        },
        async getLeadSourceIntegrationType(integration_type: number) {
            // const result =
            //     await ApiIntegration.getInstance().getIntegrationById(
            //         stat_id,
            //         integration_id
            //     );
            // console.log("getLeadSourceIntegrationType", result[0].type);
            this.integrationLeadSourceType = integration_type;
        },
        async getSettingsWebhook(
            stat_id: number,
            integration_id: number
        ): Promise<WebhookSettingsSource | undefined> {
            const result = await WebhookModel.getSettingSourceWebhook(
                stat_id,
                integration_id,
                this.integrationLeadSourceType
            );
            this.integrationWebhookSettings = result;
            return result;
        },
        async init(stat_id: number): Promise<boolean> {
            try {
                await Promise.all([this.updateIntegrationList(stat_id)]);
                return true;
            } catch (error) {
                return false;
            }
        },

        async remove(id: number) {
            // console.log("remove");
            // const result = await IntegrationModel.delete(id);
            // if (result) {
            //     this.integrationList = this.integrationList.filter(
            //         (value) => value.id !== id
            //     );
            // }
            return true;
        },
    },
});
