import { DB_BOOLEAN } from "@/shared/types";
import * as Schemes from "./scheme";
import { z } from "zod";

export type WebhookComplex = z.infer<typeof Schemes.SWebhookComplex>;

export type WebhookSettings = z.infer<typeof Schemes.SWebhookSettings>;
export type WebhookSettingsSource = z.infer<
    typeof Schemes.SWebhookSettingsSource
>;
