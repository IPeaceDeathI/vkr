import { Elements, ElementTypes, ZoneBundle } from "@/types";
import { getUUID } from "@/shared/helpers/helpers";
import {
    StructureItemsState,
    structure_items_state,
    StructureZonesState,
    structure_zones_state,
    StructureBlockBodiesState,
    structure_block_bodies_state,
    StructureBlocksState,
    structure_blocks_state,
} from "../modules";
export type State = {
    elements: Elements;
    bloockArea: id;
    blockAreaChildren: Array<id>;
    windows: Array<id>;
    blocks: StructureBlocksState;
    blockBodies: StructureBlockBodiesState;
    zones: StructureZonesState;
    items: StructureItemsState;
};
const tmp_area = getUUID();
export const state: State = {
    elements: new Map([
        [tmp_area, { type: ElementTypes.BlockArea, children: [] }],
    ]),
    bloockArea: tmp_area,
    blockAreaChildren: [],
    windows: [],
    blocks: structure_blocks_state,
    // blocks: new Map(),

    blockBodies: structure_block_bodies_state,
    zones: structure_zones_state,
    items: structure_items_state,
};
