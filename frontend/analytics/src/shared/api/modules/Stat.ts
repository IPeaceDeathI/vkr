import {
    SStat,
    SStatHash,
    Stat,
    StatHash,
    StatPost,
    StatPostTo,
} from "@/entities/stat";
import { BaseApi } from "./BaseApi";
import { string, z } from "zod";

export class ApiStat extends BaseApi {
    private static instance: ApiStat;
    private readonly API_BASE_URL = "/stat";
    // private stat_id: number;
    // private integration_id: number;
    private constructor() {
        super();
    }
    public static getInstance(): ApiStat {
        if (!ApiStat.instance) {
            ApiStat.instance = new ApiStat();
        }
        return ApiStat.instance;
    }
    public async GET() {
        const result: Array<Stat> = await this.get(
            {
                url: this.API_BASE_URL,
            },
            z.array(SStat)
        );
        return result;
    }

    public async GET_BYID(stat_id: number) {
        const result: Stat = await this.get(
            {
                url: `${this.API_BASE_URL}/${stat_id}`,
            },
            SStat
        );
        return result;
    }
    public async PostStat(name: StatPostTo) {
        const result: number = await this.post(
            {
                url: this.API_BASE_URL,
                data: name,
            },
            z.number()
        );
        return result;
    }

    public async GetStatCounter(stat_id: number) {
        const result: string = await this.get(
            {
                url: `${this.API_BASE_URL}/${stat_id}/counter`,
            },
            z.string()
        );
        return result;
    }

    public async GetHashStat(stat_id: number) {
        const result: StatHash = await this.get(
            {
                url: `${this.API_BASE_URL}/${stat_id}/hash_stat_id`,
            },
            SStatHash
        );
        return result;
    }
}
