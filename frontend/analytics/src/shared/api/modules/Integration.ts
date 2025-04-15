import { z } from "zod";
import { BaseApi } from "./BaseApi";
import {
    Integration,
    SIntegration,
    SIntegrationItem,
    IntegrationItem,
} from "@/entities/integrations";

export class ApiIntegration extends BaseApi {
    private static instance: ApiIntegration;
    private constructor() {
        super();
    }
    public static getInstance(): ApiIntegration {
        if (!ApiIntegration.instance) {
            ApiIntegration.instance = new ApiIntegration();
        }
        return ApiIntegration.instance;
    }
    public async getAllIntegration(stat_id: number) {
        const result: Integration = await this.get(
            {
                url: `/stat/${stat_id}/integration`,
            },
            SIntegration
        );
        return result.items;
    }

    public async getIntegrationById(
        stat_id: number,
        integration_id: number
    ): Promise<Array<IntegrationItem>> {
        const result: Array<IntegrationItem> = await this.get(
            {
                url: `/stat/${stat_id}/integration/${integration_id}`,
            },
            z.array(SIntegrationItem)
        );
        return result;
    }
}
