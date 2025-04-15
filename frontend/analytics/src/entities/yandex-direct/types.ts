import { z } from "zod";
import {
    SCampaigns,
    SYandexDirectAuth,
    SYandexDirectCampaign,
    SYandexDirectCampaignData,
    SYandexDirectSetting,
} from "./scheme";

export type putYandexDirectSetting = {
    add_new_campaign: number | null;
    import_template_campaign: string | null;
};

export type postYandexDirectIntegration = {
    name: string | null;
};

export type putYandexDirectCampaign = {
    campaigns: [{ id: number; status: number }];
};

export type postYandexDirectAuth = {
    token: string;
};

export type YandexDirectAuth = z.infer<typeof SYandexDirectAuth>;
export type YandexDirectSetting = z.infer<typeof SYandexDirectSetting>;

export type YandexDirectCampaign = z.infer<typeof SYandexDirectCampaign>;
export type YandexDirectCampaignData = z.infer<
    typeof SYandexDirectCampaignData
>;
export type Campaigns = z.infer<typeof SCampaigns>;
