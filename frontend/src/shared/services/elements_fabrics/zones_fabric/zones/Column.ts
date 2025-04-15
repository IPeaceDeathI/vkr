import { ColumnParams, ZoneTypes } from "@/types";
import { styleGenerator } from "@/shared/services/style";
import { Zone } from "./Zone";

export class Column extends Zone {
    protected static instance: Column;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Column.instance) {
            Column.instance = new Column();
            // ... здесь единожды выполняется инициализация ...
        }
        return Column.instance;
    }
    public getType(): ZoneTypes.column {
        return ZoneTypes.column;
    }
    public getDefaultParams(
        parentId: id,
        childrenIds: Array<id> = []
    ): ColumnParams {
        return {
            cols: 24,
            ...this.getZoneCommonParams(this.getType(), parentId),
            settings: {
                events: [],
                enableOnClick: false,
                enableOnHover: false,
            },
            type: this.getType(),
        };
    }
    public getStyles(params: ColumnParams) {
        return styleGenerator([]) + this.getCommonStyles(params);
    }
    public getMobileStyles(params: ColumnParams) {
        return styleGenerator([]) + this.getCommonMobileStyles(params);
    }
}
