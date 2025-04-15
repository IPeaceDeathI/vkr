import { Stat, StatHash, StatPost, StatPostTo } from "./types";
// import { Stats } from "./mock.data";
import { randomNumberFromInterval } from "@/shared/helpers";
import { setAsyncTimeout } from "@/shared/libs/async";
import { ApiStat } from "@/shared/api/modules";
export class StatModel {
    static async getAllStat(): Promise<Array<Stat>> {
        return ApiStat.getInstance().GET();
    }

    static async postStat(name: StatPostTo): Promise<number> {
        return ApiStat.getInstance().PostStat(name);
    }

    static async getStatById(stat_id: number): Promise<Stat> {
        return ApiStat.getInstance().GET_BYID(stat_id);
    }
    static async GetStatCounterModel(stat_id: number): Promise<string> {
        return ApiStat.getInstance().GetStatCounter(stat_id);
    }
    static async GetHashStatModel(stat_id: number): Promise<StatHash> {
        return ApiStat.getInstance().GetHashStat(stat_id);
    }

    //prefer use Pinia useUserInfo for state sync
    // static addStat(statParams: UserInfoStatPost): Promise<number> {
    //     //id
    //     return Promise.resolve(randomNumberFromInterval(1, 10000));
    // }
}
