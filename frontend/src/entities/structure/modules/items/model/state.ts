import { ItemBundle, Items } from "@/types";

export type StructureItemsState = {
    items: Items;
    itemsComponentOPTIM: Map<
        string,
        {
            getBundle: () => ItemBundle;
            setBundle: (bundle: ItemBundle) => void;
            getWidth: () => number | "100%" | undefined;
            setWidth: (bundle: number | "100%" | undefined) => void;
        }
    >;
};
export const structure_items_state: StructureItemsState = {
    items: new Map(),
    itemsComponentOPTIM: new Map(),
};
