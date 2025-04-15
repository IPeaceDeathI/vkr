import { BlockBundle, Blocks } from "@/types";

export type StructureBlocksState = {
    blocks: Blocks;
    blocksComponentOPTIM: Map<
        string,
        {
            index: number;
            getBundle: () => BlockBundle;
            setBundle: (bundle: BlockBundle) => void;
        }
    >;
};
export const structure_blocks_state: StructureBlocksState = {
    blocks: new Map(),
    blocksComponentOPTIM: new Map(),
};
