import { STATUS_ALLOCATION } from "@/entities/amo";
export enum CARDS_TYPE {
    UNDEFINED = 0,
    IN_PROGRESS = 1,
    PAID = 2,
    CANSELED = 3,
}
export const cardsToAllocationStatus: {
    [key in
        | CARDS_TYPE.IN_PROGRESS
        | CARDS_TYPE.PAID
        | CARDS_TYPE.CANSELED]: STATUS_ALLOCATION;
} = {
    [CARDS_TYPE.PAID]: STATUS_ALLOCATION.PAID,
    [CARDS_TYPE.IN_PROGRESS]: STATUS_ALLOCATION.IN_PROGRESS,
    [CARDS_TYPE.CANSELED]: STATUS_ALLOCATION.CANCELED,
};

export const formFieldsOptions: {
    hideDetails: boolean;
    itemTitle: string;
    itemValue: string;
    returnObject: boolean;
    clearable: boolean;
    class: string;
    noDataText: string;
} = {
    clearable: true,
    hideDetails: false,
    itemTitle: "name",
    itemValue: "id",
    returnObject: false,
    class: "mt-2",
    noDataText: "Результатов не найдено",
};
