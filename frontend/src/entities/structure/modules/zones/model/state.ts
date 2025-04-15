import {
    CardsOrientation,
    ColumnCols,
    ItemBundle,
    ZoneBundle,
    Zones,
} from "@/types";

export type StructureZonesState = {
    zones: Zones;
    cards: Map<string, { setOrintation: (value: CardsOrientation) => void }>;
    columns: Map<
        string,
        {
            getCols: () => ColumnCols;
            setCols: (value: ColumnCols) => void;
            reduce: () => boolean;
            increase: () => boolean;
        }
    >;
    zoneComponents: Map<
        string,
        {
            getBundle: () => ZoneBundle;
            setBundle: (bundle: ZoneBundle) => void;
        }
    >;
    itemLists: Map<
        string,
        { pasteItemFromBundle: (bundle: ItemBundle, index: number) => void }
    >;
    headerItems: Map<string, ItemBundle>;
};
export const structure_zones_state: StructureZonesState = {
    zones: new Map(),
    zoneComponents: new Map(),
    cards: new Map(),
    columns: new Map(),
    itemLists: new Map(),
    headerItems: new Map(),
};
