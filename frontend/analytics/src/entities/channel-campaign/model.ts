import { campaigns } from "./mock.data";
export class ChannelCampaignModel {
    static async getAll() {
        return Promise.resolve(campaigns);
    }
}
