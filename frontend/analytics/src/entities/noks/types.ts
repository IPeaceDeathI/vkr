import { DB_BOOLEAN } from "@/shared/types";
import * as Schemes from "./scheme";
import { z } from "zod";

export type NoksSites = z.infer<typeof Schemes.SNoksSites>;
export type NoksComplex = z.infer<typeof Schemes.SNoksComplex>;

export type NoksSitesItem = z.infer<typeof Schemes.SNoksSitesItem>;
// export type WebhookComplex = z.infer<typeof Schemes.SWebhookComplex>;
