import { DeepMergeTwoTypes } from "@/shared/libs/deep_type_merge";
import { BlockBodyParams, BlockParams, ItemParams, ZoneParams } from "@/types";
export type ElementTypeParams = DeepMergeTwoTypes<
    BlockParams,
    DeepMergeTwoTypes<
        BlockBodyParams,
        DeepMergeTwoTypes<ZoneParams, ItemParams>
    >
>;
