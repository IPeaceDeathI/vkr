import { BaseApi } from "./BaseApi";
import { z } from "zod";
import {
    AmoExistComplex,
    AmoPipeline,
    AmoPipelineStatus,
    AmoPostSetting,
    AmoUserFull,
    SAmoIntegrationExistComplex,
    SAmoPipeline,
    SAmoUserFull,
    AmoPostSettingAllocation,
    SAmoAmoPipelineStatus,
    SAmoSettingAllocation,
    AmoSettingAllocation,
} from "@/entities/amo";
// import { INTEGRATION_STATUS } from "@/entities/integration/scheme";

const SApiCrmAmoGetUrl = z.string().url();

export type ApiCrmAmoGetUrl = z.infer<typeof SApiCrmAmoGetUrl>;

export class ApiAmo extends BaseApi {
    private static instance: ApiAmo;
    private stat_id = 0;
    private integration_id = 0;
    private localBaseUrl = ``;
    private constructor() {
        super();
        // this.stat_id = stat_id;
        // this.integration_id = integration_id;
        // this.localBaseUrl = `stat/${stat_id}/integration/crm/amocrm/${integration_id}/`;
    }
    static getInstance() {
        if (!ApiAmo.instance) {
            ApiAmo.instance = new ApiAmo();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiAmo.instance;
    }
    public async GET_URL(
        integration_id: number,
        stat_id: number
    ): Promise<ApiCrmAmoGetUrl> {
        const result: ApiCrmAmoGetUrl = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/create_url`,
            },
            SApiCrmAmoGetUrl
        );
        return result;
    }

    public async getComplexIntegrationCRM(
        integration_id: number,
        stat_id: number
    ) {
        const result: AmoExistComplex = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/exist_complex`,
            },
            SAmoIntegrationExistComplex
        );
        return result;
    }

    public async postIntegrationCRM(stat_id: number, status: any) {
        const result: number = await this.post(
            {
                url: `/stat/${stat_id}/integration/crm/amocrm`,
                data: { status: 1 },
            },
            z.number()
        );
        console.log("result", result);
        return result;
    }

    public async getPipelineIntegrationCRM(
        integration_id: number,
        stat_id: number
    ) {
        const result: AmoPipeline = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/entity/pipeline`,
            },
            SAmoPipeline
        );
        return result;
    }
    public async getUserIntegrationCRM(
        integration_id: number,
        stat_id: number
    ) {
        const result: AmoUserFull = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/entity/user`,
            },
            SAmoUserFull
        );
        return result;
    }
    public async getStatusIntegrationCRM(
        integration_id: number,
        stat_id: number
    ) {
        const result: AmoPipelineStatus = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/entity/status`,
            },
            SAmoAmoPipelineStatus
        );
        return result;
    }
    public async getFieldIntegrationCRM(
        integration_id: number,
        stat_id: number
    ) {
        const result: AmoPipeline = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/entity/field`,
            },
            SAmoPipeline
        );
        return result;
    }

    public async settingCRMAmo(
        integration_id: number,
        stat_id: number,
        settings: AmoPostSetting
    ) {
        const result: boolean = await this.put(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/setting`,
                data: settings,
            },
            z.boolean()
        );
        return result;
    }

    public async putAmoSettingAllocation(
        stat_id: number,
        integration_id: number,
        statuses: Array<AmoPostSettingAllocation>
    ) {
        const result: boolean = await this.put(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/setting_allocation`,
                data: { statuses: statuses },
            },
            z.boolean()
        );
        return result;
    }
    public async getAmoSettingAllocation(
        stat_id: number,
        integration_id: number
    ) {
        const result: Array<AmoSettingAllocation> = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/crm/amocrm/setting_allocation`,
            },
            SAmoSettingAllocation
        );
        return result;
    }
}
