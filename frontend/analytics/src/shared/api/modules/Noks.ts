import { BaseApi } from "./BaseApi";
import { z } from "zod";
import {
    AmoExistComplex,
    AmoPipeline,
    AmoPostSetting,
    AmoUserFull,
    SAmoIntegrationExistComplex,
    SAmoPipeline,
    SAmoUserFull,
} from "@/entities/amo";
import {
    NoksComplex,
    NoksSites,
    SNoksComplex,
    NoksSitesItem,
    SNoksSitesItem,
    SNoksSites,
} from "@/entities/noks";

const SApiCrmAmoGetUrl = z.string().url();

export class ApiNoks extends BaseApi {
    private static instance: ApiNoks;
    private stat_id = 0;
    private integration_id = 0;
    private localBaseUrl = ``;
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiNoks.instance) {
            ApiNoks.instance = new ApiNoks();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiNoks.instance;
    }
    public async getExistComplex(integration_id: number, stat_id: number) {
        const result: NoksComplex = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/noks/exist_complex`,
            },
            SNoksComplex
        );
        return result;
    }

    public async postIntegrationSource(stat_id: number, name: string) {
        const result: number = await this.post(
            {
                url: `/stat/${stat_id}/integration/source/noks`,
                data: { name: name },
            },
            z.number()
        );
        return result;
    }
    public async postAuthSource(
        stat_id: number,
        integration_id: number,
        site_id: number
    ) {
        const result: boolean = await this.post(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/noks/auth`,
                data: { site_id: site_id },
            },
            z.boolean()
        );
        return result;
    }
    public async getSitesNoks(integration_id: number, stat_id: number) {
        const result: NoksSites = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}/source/noks/entity/site`,
            },
            SNoksSites
        );
        return result;
    }
}
