import { BlockParams, ElementVisibility, TextColorAutoTypes } from "@/types";
import { styleGenerator } from "../../style";
import { cssVariable } from "@/shared/constants/default_values";
import { getContrastColor, randomIntFromInterval } from "@/shared/helpers";
import { defaultBaseBgParams } from "../commonParams";

export class Block {
    private static instance: Block;
    private constructor() {
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Block.instance) {
            Block.instance = new Block();
            // ... здесь единожды выполняется инициализация ...
        }
        return Block.instance;
    }
    public getDefaultParams(
        parentId: id,
        BlockBodies: Array<id> = []
    ): BlockParams {
        return {
            parentId: parentId,
            childrenBlockBodiesId: BlockBodies,
            headerIsEnabled: false,
            blockTitle: false,
            blockTitleIsEnabled: false,
            footer: false,
            footerIsEnabled: false,
            tabs: false,
            blockCParams: {
                visibility: ElementVisibility.all,
                anchor: {
                    enable: false,
                    value: "b" + randomIntFromInterval(10000000, 99999999),
                },
                height: "auto",
                classes: [],
            },
            baseBGParams: defaultBaseBgParams(),
            topSpacerHeight: 70,
            bottomSpacerHeight: 70,
        };
    }
    public getStyles(
        params: Omit<
            BlockParams,
            "blockTitle" | "parentId" | "childrenBlockBodiesId"
        >
    ) {
        const bg = params.baseBGParams;
        const textColor =
            params.baseBGParams.textColorAutoType === TextColorAutoTypes.auto
                ? getContrastColor(bg.color.backgroundColor)
                : params.baseBGParams.textColorAutoType;

        return styleGenerator([
            {
                cssVariable: cssVariable.height,
                value:
                    params.blockCParams.height === "auto"
                        ? "auto"
                        : params.blockCParams.height + "vh",
            },
            {
                cssVariable: cssVariable.bgColor,
                value: bg.color.backgroundColor,
            },
            {
                cssVariable: cssVariable.bgImage,
                value: `url("${bg.image.backgroundImage.src}")`,
            },
            {
                cssVariable: cssVariable.bgColorOverlay,
                value: bg.blackout.color,
            },
            {
                cssVariable: cssVariable.bgPosition,
                value: bg.image.backgroundPosition,
            },
            {
                cssVariable: cssVariable.topSideHeight,
                value: params.topSpacerHeight + "px",
            },
            {
                cssVariable: cssVariable.bottomSideHeight,
                value: params.bottomSpacerHeight + "px",
            },
            {
                cssVariable: cssVariable.textColor,
                value: textColor,
            },
            {
                cssVariable: cssVariable.contrastTextColor,
                value: getContrastColor(textColor),
            },
        ]);
    }
}
