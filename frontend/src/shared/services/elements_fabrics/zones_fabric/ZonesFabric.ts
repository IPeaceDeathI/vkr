import { ZoneTypes } from "@/types";
import * as Zones from "./zones";

export class ZonesFabric {
    private static instance: ZonesFabric;
    private constructor() {
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!ZonesFabric.instance) {
            ZonesFabric.instance = new ZonesFabric();
            // ... здесь единожды выполняется инициализация ...
        }
        return ZonesFabric.instance;
    }

    getZone(zoneType: ZoneTypes.card): Zones.Card;
    getZone(zoneType: ZoneTypes.column): Zones.Column;
    getZone(zoneType: ZoneTypes.blockTitle): Zones.BlockTitle;
    getZone(zoneType: ZoneTypes.blockHeader): Zones.BlockHeader;
    getZone(zoneType: ZoneTypes.window): Zones.Window;
    getZone(
        zoneType: ZoneTypes
    ):
        | Zones.Card
        | Zones.Column
        | Zones.BlockHeader
        | Zones.BlockTitle
        | Zones.Window;
    getZone(zoneType: ZoneTypes) {
        switch (zoneType) {
            case ZoneTypes.card:
                return Zones.Card.getInstance();
            case ZoneTypes.column:
                return Zones.Column.getInstance();
            case ZoneTypes.blockHeader:
                return Zones.BlockHeader.getInstance();
            case ZoneTypes.blockTitle:
                return Zones.BlockTitle.getInstance();
            case ZoneTypes.window:
                return Zones.Window.getInstance();
            default:
                return Zones.Card.getInstance();
        }
    }
}
