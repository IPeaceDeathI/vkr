import { z } from "zod";
//WARNING ЕСЛИ БУДЕШЬ МЕНЯТЬ  enum ПРОВЕРЬ ВСЕ Object.keys(INTEGRATION_CATEGORY) да и вообще проверить add-integration
export enum INTEGRATION_CATEGORY {
    LEAD_SOURCE = 1,
    CRM = 2,
    ADVERTISING_CHANNELS = 3,
}

// export enum INTEGRATION_TYPE {
//     AMO = 1,
//     YANDEX_DIRECT = 2,
//     NOKS = 3,
// }

export const INTEGRATION_TYPE = {
    [INTEGRATION_CATEGORY.LEAD_SOURCE]: {
        NOKS_SITE: 1,
        WEBHOOK: 2,
        FLEXBE: 3,
        TILDA: 4,
    },
    [INTEGRATION_CATEGORY.CRM]: {
        amoCRM: 1,
    },
    [INTEGRATION_CATEGORY.ADVERTISING_CHANNELS]: {
        YANDEX_DIRECT: 1,
        GOOGLE_ADSENSE: 2,
    },
};

export const Info = z.object({
    limit: z.number(),
    count: z.number(),
    pages: z.number(),
    nextPage: z.string().nullable(),
    prevPage: z.string().nullable(),
});
export const SIntegrationItem = z.object({
    stat_id: z.number(),
    integration_id: z.number(),
    integration_type: z.nativeEnum(INTEGRATION_CATEGORY),
    integration_created_at: z.string(),
    integration_updated_at: z.string(),
    type: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});
// export const SIntegrationItem = z.object({
//     stat_id: z.number(),
//     integration_id: z.number(),
//     integration_type: z.nativeEnum(INTEGRATION_CATEGORY),
//     integration_created_at: z.string(),
//     integration_updated_at: z.string(),
//     type: z.nativeEnum(INTEGRATION_TYPE),
//     created_at: z.string(),
//     updated_at: z.string(),
// });

export const SIntegration = z.object({
    info: Info,
    items: z.array(SIntegrationItem),
});
//old
export enum INTEGRATION_STATUS {
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "ERROR",
    IN_PROGRESS = "IN_PROGRESS",
}

export enum CATEGORY_LEAD_SOURCE {
    NOKS_SITE = 1,
    WEBHOOK = 2,
    FLEXBE = 3,
    TILDA = 4,
}
export enum CATEGORY_CRM {
    amoCRM = 1,
}
export enum CATEGORY_ADVERTISING_CHANNELS {
    YANDEX_DIRECT = 1,
    GOOGLE_ADSENSE = 2,
}
export const SIntegrationItemCrm = z.object({
    stat_id: z.number(),
    integration_id: z.number(),
    integration_type: z.nativeEnum(INTEGRATION_CATEGORY),
    integration_created_at: z.string(),
    integration_updated_at: z.string(),
    type: z.nativeEnum(CATEGORY_CRM),
    created_at: z.string(),
    updated_at: z.string(),
});
export const SIntegrationItemLeadSource = z.object({
    stat_id: z.number(),
    integration_id: z.number(),
    integration_type: z.nativeEnum(INTEGRATION_CATEGORY),
    integration_created_at: z.string(),
    integration_updated_at: z.string(),
    type: z.nativeEnum(CATEGORY_LEAD_SOURCE),
    created_at: z.string(),
    updated_at: z.string(),
});
export const SIntegrationItemAdvChannels = z.object({
    stat_id: z.number(),
    integration_id: z.number(),
    integration_type: z.nativeEnum(INTEGRATION_CATEGORY),
    integration_created_at: z.string(),
    integration_updated_at: z.string(),
    type: z.nativeEnum(CATEGORY_ADVERTISING_CHANNELS),
    created_at: z.string(),
    updated_at: z.string(),
});
