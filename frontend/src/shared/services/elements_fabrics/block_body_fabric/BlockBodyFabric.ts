import { BodyLayoutType } from "@/types";
import * as BodyLayouts from "./block_layout";

export class BlockBodyFabric {
    private static instance: BlockBodyFabric;
    private constructor() {
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!BlockBodyFabric.instance) {
            BlockBodyFabric.instance = new BlockBodyFabric();
            // ... здесь единожды выполняется инициализация ...
        }
        return BlockBodyFabric.instance;
    }
    getBodyLayout(
        bodyLayoutType: BodyLayoutType.cards
    ): BodyLayouts.BlockLayoutCards;
    getBodyLayout(
        bodyLayoutType: BodyLayoutType.columns
    ): BodyLayouts.BlockLayoutColumns;
    getBodyLayout(
        bodyLayoutType: BodyLayoutType
    ): BodyLayouts.BlockLayoutCards | BodyLayouts.BlockLayoutColumns;
    getBodyLayout(bodyLayoutType: BodyLayoutType) {
        switch (bodyLayoutType) {
            case BodyLayoutType.cards:
                return BodyLayouts.BlockLayoutCards.getInstance();
            case BodyLayoutType.columns:
                return BodyLayouts.BlockLayoutColumns.getInstance();
            default:
                return BodyLayouts.BlockLayoutCards.getInstance();
        }
    }
}
