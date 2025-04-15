import { BlockBodies, BlockBodyBundle, ZoneBundle } from "@/types";

export type StructureBlockBodiesState = {
    blockBodies: BlockBodies;
    blockBodiesComponentOPTIM: Map<
        string,
        {
            getBundle: () => BlockBodyBundle;
            setBundle: (bundle: BlockBodyBundle) => void;
            pasteZone: (bundle: ZoneBundle, index: number) => void;
        }
    >;
};
export const structure_block_bodies_state: StructureBlockBodiesState = {
    blockBodies: new Map(),
    blockBodiesComponentOPTIM: new Map(),
};
