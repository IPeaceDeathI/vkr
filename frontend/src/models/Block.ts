import { Api } from "@/shared/api";
import {
    PUTdata,
    POSTdata,
    ShortBlockDataArrayWrapper,
    BlockDataArrayWrapper,
} from "@/shared/api/models";
import { BlockStatus } from "@/shared/api/validation/Block";
enum queryFlag {
    true = 1,
    false = 0,
}

interface QueryParams {
    my?: queryFlag;
    limit?: number;
    offset?: number;
    category_id?: Array<number>;
}

export class BlocksModel {
    public static getAll(
        data: QueryParams = {}
    ): Promise<BlockDataArrayWrapper> {
        return Api.Blocks().GET({
            status: [BlockStatus.PUBLISHED],
            ...data,
            short: queryFlag.false,
        });
    }
    public static getAllShort(
        data: Omit<QueryParams, "short"> = {}
    ): Promise<ShortBlockDataArrayWrapper> {
        return Api.Blocks().GET({
            status: [BlockStatus.PUBLISHED],
            ...data,
            short: queryFlag.true,
        });
    }
    public static getShortById(
        blockId: number,
        data?: Omit<QueryParams, "short">
    ): Promise<ShortBlockDataArrayWrapper> {
        return Api.Blocks().GET(
            {
                status: [BlockStatus.PUBLISHED],
                ...data,
                short: queryFlag.true,
            },
            blockId
        );
    }
    public static getBlockById(
        blockId: number,
        data?: QueryParams
    ): Promise<BlockDataArrayWrapper> {
        return Api.Blocks().GET(
            {
                status: [BlockStatus.PUBLISHED],
                ...data,
                short: queryFlag.false,
            },
            blockId
        );
    }
    public static updateBlock(
        data: PUTdata,
        blockId: number
    ): Promise<boolean> {
        return Api.Blocks().PUT(data, blockId);
    }
    public static deleteBlock(data: number): Promise<boolean> {
        return Api.Blocks().DELETE(data);
    }
    public static addBlock(data: POSTdata): Promise<number> {
        return Api.Blocks().POST({ status: BlockStatus.PUBLISHED, ...data });
    }
}
