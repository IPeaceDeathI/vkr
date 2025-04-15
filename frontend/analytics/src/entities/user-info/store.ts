import { defineStore } from "pinia";
import { UserInfoStat, UserInfoStatPost } from "./types";
import { UserInfoModel } from "./model";
export const useUserInfoStore = defineStore("user-info", {
    state: () => ({
        stats: undefined as undefined | Array<UserInfoStat>,
        selectedStatId: undefined as undefined | number,
    }),
    getters: {},
    actions: {
        async fetchUser() {
            this.stats = undefined;
            const stats = await UserInfoModel.getAllStat();
            this.stats = stats;
            if (this.stats.length > 0) {
                this.selectedStatId = this.stats[0].stat_id;
            }
        },
        setSelectedStatId(id: number): boolean {
            //Если id отсутсвует у юзера
            if (
                !this.stats?.find((stat) => {
                    return stat.stat_id === id;
                })
            ) {
                return false;
            }
            this.selectedStatId = id;
            return true;
        },
        async addStat(statParams: UserInfoStatPost): Promise<number> {
            const result = await UserInfoModel.addStat(statParams);
            // if (result && this.stats) {
            //     this.stats.push({
            //         stat_id: result,
            //         ...statParams,
            //         created_at: Date.now().toString(),
            //     });
            // }
            return result;
        },
        async init(): Promise<boolean> {
            try {
                await Promise.all([this.fetchUser()]);
                return true;
            } catch (error) {
                return false;
            }
        },
    },
});
