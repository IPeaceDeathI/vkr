import {
    INTEGRATION_CATEGORY,
    IntegrationModel,
} from "@/entities/integrations";
import { TreeNodeProps } from "./types";
import { useIntegrationStore } from "@/entities/integrations/store";
export function NodePropsFabric(category: INTEGRATION_CATEGORY): TreeNodeProps {
    switch (category) {
        case INTEGRATION_CATEGORY.LEAD_SOURCE:
            return {
                name: "Источник заявок",
                description:
                    "Интеграции, через которые пользователь может оставить заявку для последующей передачи в CRM",
                integrations: useIntegrationStore().getAllLeadSource,
            };
        case INTEGRATION_CATEGORY.ADVERTISING_CHANNELS:
            return {
                name: "Рекламные каналы",
                description:
                    "Подключите рекламные каналы, например, Яндекс.Директ, Google Ads, Яндекс.Маркет и т.д.",
                integrations: useIntegrationStore().getAllAdvertisingChannels,
            };
        case INTEGRATION_CATEGORY.CRM:
            return {
                name: "CRM",
                description:
                    "Настройте двусторонний обмен данными между LandingPage и CRM",
                integrations: useIntegrationStore().getAllCRM,
            };
    }
}
