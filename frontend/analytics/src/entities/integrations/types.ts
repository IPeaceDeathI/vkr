import {
    SIntegration,
    SIntegrationItem,
    SIntegrationItemAdvChannels,
    SIntegrationItemCrm,
    SIntegrationItemLeadSource,
} from "./scheme";
import { z } from "zod";

export type Integration = z.infer<typeof SIntegration>;
export type IntegrationItem = z.infer<typeof SIntegrationItem>;
// export type IntegrationItemCrm = z.infer<typeof SIntegrationItemCrm>;
// export type IntegrationItemLeadSource = z.infer<
//     typeof SIntegrationItemLeadSource
// >;
// export type IntegrationItemAdvChannels = z.infer<
//     typeof SIntegrationItemAdvChannels
// >;
