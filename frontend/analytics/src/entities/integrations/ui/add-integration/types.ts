import { INTEGRATION_CATEGORY, INTEGRATION_TYPE } from "../..";

export type IntegrationCard = {
    id: number;
    name: string;
    image: string;
    type: number;
    integration_category: INTEGRATION_CATEGORY;
    onSuccess: (value: number) => void;
};
