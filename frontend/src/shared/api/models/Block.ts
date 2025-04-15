import { ApiModel } from "./main";
import {
    blockIdSchema,
    shortBlockDataArraySchema,
    blockDataArraySchema,
    BlockStatus,
} from "../validation/Block";
import { z } from "zod";
import { BlockBundle, BlockParams } from "@/types";
enum queryFlag {
    true = 1,
    false = 0,
}

export interface Category {
    id: number;
    name: string;
    position: number;
}
export type ShortBlockData = Omit<BlockData, "structure">;
// export interface ShortBlockData {
//     id: number;
//     name: string;
//     preview_src: string | null;
//     user_id: number;
// }
export interface BlockData {
    id: number;
    name: string;
    preview_src: string | null;
    status: BlockStatus;
    structure?: string;
    created_at: string;
    updated_at: string;
    categories: Array<Category>;
    favourite: number;
    user_id: number;
}
export type ShortBlockDataArrayWrapper = {
    info: {
        count: number;
        limit: number;
        next_page: string | null;
        pages: number;
        prev_page: string | null;
    };
    items: ShortBlockDataArray;
};
export type BlockDataArrayWrapper = {
    info: {
        count: number;
        limit: number;
        next_page: string | null;
        pages: number;
        prev_page: string | null;
    };
    items: BlockDataArray;
};
export type ShortBlockDataArray = Array<ShortBlockData>;
export type BlockDataArray = Array<BlockData>;
type blockId = number;
export interface POSTdata {
    name: string;
    //TODO ВРЕМЕННО ЖДУМ Дениса, когда он дойдет до изучения структуры
    my?: queryFlag;
    structure?: string; // blockBundle
    preview_src?: string;
    category_id: Array<number>;
    status?: BlockStatus | null;
}
export interface GETqueryParams {
    my?: queryFlag;
    short: queryFlag.false;
    limit?: number;
    offset?: number;
    page?: number;
    status?: Array<BlockStatus>;
    categoryId?: Array<number>;
}
export interface GETqueryParamsShort {
    my?: queryFlag;
    short: queryFlag.true;
    limit?: number;
    offset?: number;
    page?: number;
    status?: Array<BlockStatus>;
    categoryId?: Array<number>;
}
export type PUTdata = Partial<POSTdata>;
export class ApiBlock extends ApiModel {
    private static instance: ApiBlock;
    private localBaseUrl = "/constructor/blocks";
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiBlock.instance) {
            ApiBlock.instance = new ApiBlock();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiBlock.instance;
    }
    public async POST(data: POSTdata): Promise<blockId> {
        return this.post(
            {
                url: `${this.localBaseUrl}`,
                data: data,
            },
            blockIdSchema
        );
    }
    public async DELETE(blockId: blockId): Promise<boolean> {
        const result: boolean = await this.delete(
            {
                url: `${this.localBaseUrl}/${blockId}`,
            },
            z.boolean()
        );
        return result;
    }
    public PUT(data: PUTdata, blockId: number): Promise<boolean> {
        return this.put(
            {
                url: `${this.localBaseUrl}/${blockId}`,
                data: data,
            },
            z.boolean()
        );
    }
    public GET(
        data: GETqueryParams,
        blockId?: blockId
    ): Promise<BlockDataArrayWrapper>;
    public GET(
        data: GETqueryParamsShort,
        blockId?: blockId
    ): Promise<ShortBlockDataArrayWrapper>;

    public GET(data: GETqueryParams | GETqueryParamsShort, blockId?: blockId) {
        return this.get(
            {
                url: blockId
                    ? `${this.localBaseUrl}/${blockId}`
                    : `${this.localBaseUrl}`,
                params: data,
            },
            data.short !== queryFlag.false
                ? blockDataArraySchema
                : shortBlockDataArraySchema
        );
    }
}
