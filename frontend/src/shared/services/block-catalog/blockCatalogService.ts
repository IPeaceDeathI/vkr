import { store } from "@/app/providers";
import { BlockBundle, BlockParams } from "@/types";

export class BlockCatalogService {
    private static instance: BlockCatalogService;
    private static ref: any;

    static getInstance() {
        if (!BlockCatalogService.instance) {
            BlockCatalogService.instance = new BlockCatalogService();
            BlockCatalogService.ref =
                store.getters["environment/indexRef"].blockCatalog;
            // ... здесь единожды выполняется инициализация ...
        }
        return BlockCatalogService.instance;
    }

    static open(callback: (blockParams: BlockBundle) => void) {
        this.ref.open(callback);
    }
}

// export const BlockCatalogService = new BlockCatalogServiceClass();
