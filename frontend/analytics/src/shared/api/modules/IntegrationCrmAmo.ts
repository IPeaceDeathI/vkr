import { SStat, Stat, StatPost, StatPostTo } from "@/entities/stat";
import { BaseApi } from "./BaseApi";
import { z } from "zod";

import { AmoExistComplex, SAmoIntegrationExistComplex } from "@/entities/amo";

export class ApiIntegrationCrmAmo extends BaseApi {
    private static instance: ApiIntegrationCrmAmo;

    private constructor() {
        super();
    }
    // public static getInstance(): ApiIntegrationCrmAmo {
    //     if (!ApiIntegrationCrmAmo.instance) {
    //         ApiIntegrationCrmAmo.instance = new ApiIntegrationCrmAmo();
    //     }
    //     return ApiIntegrationCrmAmo.instance;
    // }
    // public async getComplexIntegrationCRM(
    //     integration_id: number,
    //     stat_id: number
    // ) {
    //     const result: AmoExistComplex = await this.get(
    //         {
    //             url: `${this.BASE_URL}/api/stat/${stat_id}/integration/${integration_id}/crm/amocrm/exist_complex`,
    //         },
    //         SAmoIntegrationExistComplex
    //     );
    //     return result;
    // }
    // public async GetAllIntegrationCRM(stat_id: number) {
    //     const result: Array<any> = await this.get(
    //         {
    //             url: `${this.BASE_URL}/api/stat/${stat_id}/integration`,
    //         },
    //         SIntegrationCRM
    //     );
    //     return result;
    // }
    // public async PostIntagrationCRM(name: StatPostTo) {
    //     const result: number = await this.post(
    //         {
    //             url: this.BASE_URL + this.API_BASE_URL,
    //             data: name,
    //         },
    //         z.number()
    //     );
    //     return result;
    // }
}
