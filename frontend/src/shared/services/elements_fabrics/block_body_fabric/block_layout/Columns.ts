import {
    BodyLayoutColumnParams,
    BodyLayoutType,
    ElementsAlign,
    GapTypes,
    StretchContent,
} from "@/types";
import { styleGenerator } from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";
import { BlockBody } from "./BlockBody";

export class BlockLayoutColumns extends BlockBody {
    protected static instance: BlockLayoutColumns;
    protected constructor() {
        super();
        // сделать что-нибудь...
    }
    public getType(): BodyLayoutType.columns {
        return BodyLayoutType.columns;
    }
    static getInstance() {
        if (!BlockLayoutColumns.instance) {
            BlockLayoutColumns.instance = new BlockLayoutColumns();
            // ... здесь единожды выполняется инициализация ...
        }
        return BlockLayoutColumns.instance;
    }
    public getDefaultParams(): BodyLayoutColumnParams {
        return {
            type: BodyLayoutType.columns,
            elementsAlign: ElementsAlign.stretch,
            gap: GapTypes.middle,
            strechContent: StretchContent.onGrid,
            mobile: {
                changeOrder: false,
            },
        };
    }
    public getStyles(params: BodyLayoutColumnParams) {
        return styleGenerator([
            {
                cssVariable: cssVariable.elementsAlign,
                value: params.elementsAlign,
            },
            { cssVariable: cssVariable.gapSize, value: params.gap },
            { cssVariable: cssVariable.width, value: params.strechContent },
        ]);
    }
}
