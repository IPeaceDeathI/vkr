import { Integration, IntegrationItem } from "@/entities/integrations";

export type TreeNodeProps = {
    name: string;
    description: string;
    integrations: Array<IntegrationItem>;
};
