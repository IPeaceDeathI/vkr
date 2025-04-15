import { z } from "zod";
import { BlockParams } from "./block";
import { BlockBodyParams } from "./blockBodies";
import { ItemParams } from "./items";
import { ZoneParams } from "./zones";
import { PageFonts } from "./styles";

export interface ProjectBundle {
    //ОБЯЗАТЕЛЬНО НЕ должен  зависить от аккаунта (должна быть возможность скинуть любому человеку, и чтоб у него работало)
    structure: BlockAreaBundle;
    fonts: {
        redefine: boolean;
        pageFonts?: PageFonts;
    };
}

export interface BlockAreaBundle {
    blocks: Array<BlockBundle>;
    windows: Array<ZoneBundle>;
}

export interface BlockBundle {
    blockParams: Omit<
        BlockParams,
        "parentId" | "childrenBlockBodiesId" | "blockTitle"
    >;
    header: ZoneBundle | false;
    headerSecondRow?: ZoneBundle | false; // LEGACY
    blockTitle: ZoneBundle | false;
    blockBodies: Array<BlockBodyBundle>;
}

export const blockBundleSchema = z.object({
    blockParams: z.object({}),
    blockTitle: z.object({}).or(z.boolean()),
    header: z.object({}).or(z.boolean()),
    headerSecondRow: z.object({}).or(z.boolean()).optional(),
    blockBodies: z.array(z.object({})),
});

export interface BlockBodyBundle {
    blockBodyParams: Omit<BlockBodyParams, "parentId" | "childrenIds">;
    zones: Array<ZoneBundle>;
}
export interface ZoneBundle {
    zoneParams: Omit<ZoneParams, "parentId" | "childrenIds">;
    items: Array<ItemBundle>;
    secondItems?: Array<ItemBundle>;
}
export const zoneBundleSchema = z.object({
    zoneParams: z.object({}),
    items: z.array(z.object({})),
    secondItems: z.array(z.object({})).optional(),
});
export type ItemBundle = Omit<ItemParams, "parentId">;
