import { store } from "@/app/providers";
import { BlockData } from "@/shared/api/models";
import { BlockBundle } from "@/types";

export class BlockRedactorService {
    private static instance: BlockRedactorService;
    private static ref: any;

    static getInstance() {
        if (!BlockRedactorService.instance) {
            BlockRedactorService.instance = new BlockRedactorService();
            BlockRedactorService.ref =
                store.getters["environment/indexRef"].blockRedactor;
            // ... здесь единожды выполняется инициализация ...
        }
        return BlockRedactorService.instance;
    }

    static open(block: BlockBundle | Array<BlockData>) {
        this.ref.open(block);
    }
}
