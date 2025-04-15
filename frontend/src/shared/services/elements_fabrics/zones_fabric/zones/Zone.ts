import {
    CommonZoneParams,
    ContrastColor,
    ElementVisibility,
    ElementsJustify,
    ImagePosition,
    ZoneBgTypes,
    ZoneBundle,
    ZoneParams,
    ZoneTypes,
} from "@/types";
import {
    collectMobileStyle,
    collectStyle,
    getSelector,
    styleCombiner,
    styleGenerator,
} from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";
import { getContrastColor } from "@/shared/helpers";
export class Zone {
    protected static instance: Zone;
    protected constructor() {
        // сделать что-нибудь...
    }
    protected getStyles(params: any): string {
        return "";
    }
    protected getMobileStyles(params: any): string {
        return "";
    }
    getBundle(): ZoneBundle {
        return {
            zoneParams: this.getDefaultParams("1"),
            items: [],
        };
    }
    public getDefaultParams(parentId: id): CommonZoneParams {
        return this.getZoneCommonParams(ZoneTypes.card, "1");
    }
    getCommonStyles(params: CommonZoneParams): string {
        const bg = params.styles.background;
        return styleGenerator([
            {
                cssVariable: cssVariable.bgColorOverlay,
                value: bg.image.blackout.enabled
                    ? bg.image.blackout.color
                    : "#00000000",
            },
            {
                cssVariable: cssVariable.bgColor,
                value: bg.color,
            },
            {
                cssVariable: cssVariable.boxShadow,
                value: styleCombiner.shadow(
                    params.styles.shadow.enabled
                        ? params.styles.shadow.shadow
                        : undefined
                ),
            },
            {
                cssVariable: cssVariable.brdRadius,
                value: styleCombiner.borderRadius(
                    params.styles.borderRadius.enabled
                        ? params.styles.borderRadius.value
                        : undefined
                ),
            },
            {
                cssVariable: cssVariable.minHeight,
                value: params.styles.minHeight.enabled
                    ? params.styles.minHeight.value +
                      params.styles.minHeight.unit
                    : "auto",
            },
            {
                cssVariable: cssVariable.paddings,
                value: styleCombiner.padding(params.styles.paddings),
            },
            {
                cssVariable: cssVariable.reversePaddings,
                value: styleCombiner.reversePadding(params.styles.paddings),
            },
            {
                cssVariable: cssVariable.textColor,
                value:
                    params.styles.background.type === ZoneBgTypes.none
                        ? undefined
                        : bg.textColor === "auto"
                        ? bg.contrastColor
                        : bg.textColor, // if(params.styles.background.type === ZoneBgTypes.none) { if(bg.textColor === "auto") {value: bg.contrastColor} else {value: bg.textColor} }
            },
            {
                cssVariable: cssVariable.contrastTextColor,
                value:
                    params.styles.background.type === ZoneBgTypes.none
                        ? undefined
                        : bg.textColor === "auto"
                        ? getContrastColor(bg.contrastColor)
                        : bg.contrastColor, // if(params.styles.background.type === ZoneBgTypes.none) { if(bg.textColor === "auto") {value: bg.contrastColor} else {value: bg.textColor} }
            },
            {
                cssVariable: cssVariable.jstfContent,
                value: params.styles.verticalJustify,
            },
            {
                cssVariable: cssVariable.bgPosition,
                value: bg.image.position,
            },
            {
                cssVariable: cssVariable.bgImage,
                value: `url(${bg.image.src})`,
            },
            {
                cssVariable: cssVariable.brd,
                value: params.styles.border.enabled
                    ? `${styleCombiner.border(
                          params.styles.border.borderColor,
                          params.styles.border.borderWidth
                      )}`
                    : undefined,
            },

            {
                cssVariable: cssVariable.zoneContentJustify,
                value: params.styles.horizontalJustify,
            },
            {
                cssVariable: cssVariable.textAlign,
                value: params.styles.horizontalJustify,
            },
        ]);
    }

    getCommonMobileStyles(params: CommonZoneParams): string {
        const mobile = params.styles.mobile;
        return styleGenerator([
            {
                cssVariable: cssVariable.minHeight,
                value: mobile.minHeight.enabled
                    ? mobile.minHeight.value + mobile.minHeight.unit
                    : "auto",
            },
            {
                cssVariable: cssVariable.paddings,
                value: mobile.inheritPadding
                    ? undefined
                    : styleCombiner.padding(mobile.paddings),
            },
            {
                cssVariable: cssVariable.jstfContent,
                value: mobile.verticalJustify,
            },
            {
                cssVariable: cssVariable.zoneContentJustify,
                value: mobile.horizontalJustify,
            },
            {
                cssVariable: cssVariable.textAlign,
                value: mobile.horizontalJustify,
            },
        ]);
    }
    getZoneCommonParams(
        type: ZoneTypes,
        parentId: id,
        childrenIds = []
    ): CommonZoneParams {
        return {
            visibility: ElementVisibility.all,
            type: type,
            parentId: parentId,
            childrenIds: childrenIds,
            styles: {
                background: {
                    type: ZoneBgTypes.color,
                    color: "#e6e6e6",
                    image: {
                        src: "",
                        position: ImagePosition.center,
                        blackout: {
                            enabled: false,
                            color: "#00000040",
                        },
                    },
                    contrastColor: ContrastColor.dark,
                    textColor: "auto",
                },
                borderRadius: {
                    enabled: false,
                    value: { tr: 10, tl: 10, br: 10, bl: 10 },
                },
                paddings: {
                    top: 10,
                    bottom: 10,
                    right: 10,
                    left: 10,
                },
                border: {
                    enabled: false,
                    borderWidth: 2,
                    borderColor: "#0000004d",
                },
                shadow: {
                    enabled: false,
                    shadow: {
                        blur: 20,
                        shift: 20,
                        angle: 180,
                        color: "#00000012",
                    },
                },
                verticalJustify: ElementsJustify.start,
                horizontalJustify: ElementsJustify.center,
                minHeight: {
                    enabled: true,
                    value: 150,
                    unit: "px",
                },
                mobile: {
                    inheritPadding: true,
                    paddings: {
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                    },
                    horizontalJustify: ElementsJustify.center,
                    verticalJustify: ElementsJustify.center,
                    minHeight: {
                        enabled: true,
                        value: 100,
                        unit: "px",
                    },
                },
            },
        };
    }
    //Можно переопределить, если нужно добавить дополнительные селекторы со стилями
    protected getAdditionalCombinedStyles(id: id, params: any): string {
        return "";
    }
    public getCombinedStyles(
        id: id,
        params: Omit<ZoneParams, "parentId" | "childrenIds">
    ): string {
        const selector = getSelector(id, ".zone", false);
        return (
            collectStyle(selector, this.getStyles(params)) +
            collectMobileStyle(selector, this.getMobileStyles(params)) +
            this.getAdditionalCombinedStyles(id, params)
        );
    }
}
