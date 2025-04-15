import { ItemsFabric } from "./items_fabric";
import { ZonesFabric } from "./zones_fabric";
import { BlockBodyFabric } from "./block_body_fabric";
import { Block } from "./block";
export class ElementsFabric {
    static getBlock() {
        return Block.getInstance();
    }
    static getBlockBody() {
        return BlockBodyFabric.getInstance();
    }
    static getZonesFabric() {
        return ZonesFabric.getInstance();
    }
    static getItemsFabric() {
        return ItemsFabric.getInstance();
    }
}
