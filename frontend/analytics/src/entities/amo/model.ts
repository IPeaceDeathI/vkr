import { setAsyncTimeout } from "@/shared/libs/async";
// import {
//     amoIntegration,
//     pipelineStatuses,
//     amoFields,
//     amoPipelines,
//     amoUsers,
// } from "./mock.data";
import {
    AmoExistComplex,
    AmoField,
    AmoPipeline,
    AmoPipelineStatus,
    AmoPostSetting,
    AmoPostSettingAllocation,
    AmoUser,
    AmoUrl,
    AmoPipelineItems,
    AmoPipelineStatusItems,
} from "./types";
import { ApiAmo } from "@/shared/api/modules";
export class AmoModel {
    // static amoIntegration = amoIntegration;
    // // static pipelineStatuses = pipelineStatuses;
    // static amoFields = amoFields;
    // static amoPipelines = amoPipelines;
    // static amoUsers = amoUsers;

    static async getIntegrationExistComplex(
        integration_id: number,
        stat_id: number
    ): Promise<AmoExistComplex> {
        const result = await ApiAmo.getInstance().getComplexIntegrationCRM(
            integration_id,
            stat_id
        );

        return result;
    }

    static async getUrlForIntegration(
        integration_id: number,
        stat_id: number
    ): Promise<AmoUrl> {
        await setAsyncTimeout(2000);
        if (stat_id != undefined && integration_id != undefined) {
            const result = await ApiAmo.getInstance().GET_URL(
                integration_id,
                stat_id
            );
            return result;
        } else {
            return Promise.reject(
                new Error("stat_id or integration_id is undefined")
            );
        }
    }

    static postSettingsAllocation(
        stat_id: number,
        integration_id: number,
        settings: Array<AmoPostSettingAllocation>
    ): Promise<boolean> {
        return ApiAmo.getInstance().putAmoSettingAllocation(
            integration_id,
            stat_id,
            settings
        );
    }

    static async getAllStatusByPipeline(
        integration_id: number,
        stat_id: number
    ): Promise<Array<AmoPipelineStatusItems>> {
        const result = await ApiAmo.getInstance().getStatusIntegrationCRM(
            integration_id,
            stat_id
        );

        return result.items;
    }

    static async postSetting(
        integration_id: number,
        stat_id: number,
        settings: AmoPostSetting
    ): Promise<boolean> {
        await setAsyncTimeout(2000);
        return ApiAmo.getInstance().settingCRMAmo(
            stat_id,
            integration_id,
            settings
        );
    }
    static async getAllFields(
        integration_id: number,
        stat_id: number
    ): Promise<Array<AmoPipelineItems>> {
        const result = await ApiAmo.getInstance().getFieldIntegrationCRM(
            integration_id,
            stat_id
        );
        return result.items;
    }
    static async getAllPipeline(
        integration_id: number,
        stat_id: number
    ): Promise<Array<AmoPipelineItems>> {
        const result = await ApiAmo.getInstance().getPipelineIntegrationCRM(
            integration_id,
            stat_id
        );
        return result.items;
    }
    static async getAllUsers(
        integration_id: number,
        stat_id: number
    ): Promise<Array<AmoUser>> {
        const result = await ApiAmo.getInstance().getUserIntegrationCRM(
            integration_id,
            stat_id
        );
        return result.items;
    }
}
