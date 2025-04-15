import { defineStore } from "pinia";
import { Stat, StatHash, StatPost, StatPostTo } from "./types";
import { StatModel } from "./model";
import { string } from "zod";
export const useStatStore = defineStore("stat", {
    state: () => ({
        stats: undefined as undefined | Array<Stat>,
        selectedStatId: undefined as undefined | number,
        statCounter: undefined as undefined | string,
        statHash: undefined as undefined | StatHash,
    }),
    getters: {
        getAllStat: (state) => {
            return state.stats;
        },
    },
    actions: {
        async fetchStat() {
            this.stats = undefined;
            const stats = await StatModel.getAllStat();
            this.stats = stats;
            if (this.stats.length > 0) {
                this.selectedStatId = this.stats[0].stat_id;

                // const statHash = await StatModel.GetHashStatModel(
                //     this.selectedStatId
                // );
                // this.statHash = statHash;
                // const statCounter = await StatModel.GetStatCounterModel(
                //     this.selectedStatId
                // );
                // this.statCounter = statCounter;
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
        async getStatInfoById(stat_id: number) {
            if (this.selectedStatId != undefined) {
                const statHash = await StatModel.GetHashStatModel(
                    this.selectedStatId
                );
                this.statHash = statHash;
                const statCounter = await StatModel.GetStatCounterModel(
                    this.selectedStatId
                );
                this.statCounter = statCounter;
            }
        },
        async postStat(nameStat: StatPostTo): Promise<number> {
            const result = await StatModel.postStat(nameStat);
            const statByNewId = await StatModel.getStatById(result);

            if (result && this.stats && statByNewId) {
                this.stats.push(statByNewId);
            }
            return result;
        },
        async init(): Promise<boolean> {
            try {
                await Promise.all([this.fetchStat()]);
                return true;
            } catch (error) {
                return false;
            }
        },
    },
});
