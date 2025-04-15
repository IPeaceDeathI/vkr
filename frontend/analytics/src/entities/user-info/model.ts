import { UserInfoStat, UserInfoStatPost } from "./types";
// import { userInfoStats } from "./mock.data";
import { randomNumberFromInterval } from "@/shared/helpers";
import { setAsyncTimeout } from "@/shared/libs/async";
import { ApiStat } from "@/shared/api/modules";
export class UserInfoModel {
    static async getAllStat(): Promise<Array<UserInfoStat>> {
        return ApiStat.getInstance().GET();
    }
    //prefer use Pinia useUserInfo for state sync
    static addStat(statParams: UserInfoStatPost): Promise<number> {
        //id
        return Promise.resolve(randomNumberFromInterval(1, 10000));
    }
}
