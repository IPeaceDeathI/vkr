import { CHANNEL_COMPAIGN_STATUS } from "./scheme";
import { ChannelCompaign } from "./types";

export const campaigns: Array<ChannelCompaign> = [
    {
        campaign_id: 1,
        name: "Теплые",
        created_at: "22/22/2222",
        status: CHANNEL_COMPAIGN_STATUS.ALLOWED,
    },
    {
        campaign_id: 2,
        name: "Холодные",
        created_at: "22/22/2222",
        status: CHANNEL_COMPAIGN_STATUS.IGNORE,
    },
    {
        campaign_id: 3,
        name: "Ледяные",
        created_at: "22/22/2222",
        status: CHANNEL_COMPAIGN_STATUS.ALLOWED,
    },
    {
        campaign_id: 4,
        name: "Горячие",
        created_at: "22/22/2222",
        status: CHANNEL_COMPAIGN_STATUS.ALLOWED,
    },
];
