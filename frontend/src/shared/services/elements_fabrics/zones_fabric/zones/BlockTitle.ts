import { BlockTitleParams, ZoneBgTypes, ZoneTypes } from "@/types";
import { styleGenerator } from "@/shared/services/style";
import { Zone } from "./Zone";

export class BlockTitle extends Zone {
    protected static instance: BlockTitle;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!BlockTitle.instance) {
            BlockTitle.instance = new BlockTitle();
            // ... здесь единожды выполняется инициализация ...
        }
        return BlockTitle.instance;
    }
    public getType(): ZoneTypes.blockTitle {
        return ZoneTypes.blockTitle;
    }
    public getDefaultParams(
        parentId: id,
        childrenIds: Array<id> = []
    ): BlockTitleParams {
        const params = {
            ...this.getZoneCommonParams(this.getType(), parentId),
        };
        params.styles.background.type = ZoneBgTypes.none;
        return {
            ...params,
            settings: {
                events: [],
                enableOnClick: false,
                enableOnHover: false,
            },
            type: this.getType(),
        };
    }
    public getStyles(params: BlockTitleParams) {
        return styleGenerator([]) + this.getCommonStyles(params);
    }
    public getMobileStyles(params: BlockTitleParams) {
        return styleGenerator([]) + this.getCommonMobileStyles(params);
    }
}
