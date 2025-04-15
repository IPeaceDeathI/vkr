import {
    BlockHeaderParams,
    BlockHeaderStyles,
    HeaderRows,
    ItemTypes,
    ZoneBgTypes,
    ZoneBundle,
    ZoneTypes,
} from "@/types";
import { styleGenerator } from "@/shared/services/style";
import { Zone } from "./Zone";
import { cssVariable, gridWidth } from "@/shared/constants/default_values";
import { ElementsFabric } from "../../ElementsFabric";

export class BlockHeader extends Zone {
    protected static instance: BlockHeader;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!BlockHeader.instance) {
            BlockHeader.instance = new BlockHeader();
            // ... здесь единожды выполняется инициализация ...
        }
        return BlockHeader.instance;
    }
    public getType(): ZoneTypes.blockHeader {
        return ZoneTypes.blockHeader;
    }
    public getDefaultParams(
        parentId: id,
        isSecondRow = false
    ): BlockHeaderParams {
        const commonParams = {
            ...this.getZoneCommonParams(this.getType(), parentId),
        };
        commonParams.styles.background.type = ZoneBgTypes.none;
        const headerStyles: BlockHeaderStyles = {
            isFixed: {
                enabled: false,
                value: {
                    bgColor: "auto",
                    textColor: "auto",
                    fixedRows: HeaderRows.all,
                    blur: 0,
                    paddings: {
                        top: "10",
                        bottom: "10",
                    },
                },
            },
            divider: {
                isDivider: false,
                dividerColor: "#8E8E8E",
            },
            isBurgerMenu: true,
        };
        return {
            ...commonParams,
            headerStyles: headerStyles,
            mainDividerWidth: gridWidth,
            pairsWidth: [],
            isSecondRow: isSecondRow,
            type: this.getType(),
        };
    }
    public getStyles(params: BlockHeaderParams) {
        const style = params.headerStyles;
        return styleGenerator([
            {
                cssVariable: cssVariable.dividerColor,
                value: style.divider.dividerColor,
            },
        ]); //common stylesне нужный, так как они просто НЕ НУЖНЫ
    }

    public getMobileStyles(params: BlockHeaderParams) {
        return styleGenerator([]); //common styles не нужный, так как они просто НЕ НУЖНЫ
    }
    public getBundle(isSecondRow = false): ZoneBundle {
        const tmp = {
            zoneParams: this.getDefaultParams("", isSecondRow),
            items: [
                ElementsFabric.getItemsFabric()
                    .getItem(ItemTypes.headerDivider)
                    .getBundle(),
            ],
        };
        return tmp;
    }
}
