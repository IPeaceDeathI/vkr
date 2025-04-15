import {
    CardsProportion,
    ElementsJustify,
    WindowCrossPosition,
    WindowParams,
    WindowShowEffect,
    WindowStylesMobileParams,
    WindowStylesParams,
    ZoneStylesMobileParams,
    ZoneStylesParams,
    ZoneTypes,
} from "@/types";
import {
    collectStyle,
    getSelector,
    styleGenerator,
    styleCombiner,
    collectMobileStyle,
} from "@/shared/services/style";
import { randomIntFromInterval } from "@/shared/helpers";
import { cssVariable } from "@/shared/constants/default_values";
import { Zone } from "./Zone";
import { defaultBaseBgParams } from "../../commonParams";

export class Window extends Zone {
    protected static instance: Window;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Window.instance) {
            Window.instance = new Window();
            // ... здесь единожды выполняется инициализация ...
        }
        return Window.instance;
    }
    public getType(): ZoneTypes.window {
        return ZoneTypes.window;
    }
    public getDefaultParams(parentId: id): WindowParams {
        const tmp = this.getZoneCommonParams(this.getType(), parentId);
        const result = {
            ...tmp,
            type: this.getType(),
            publishId: randomIntFromInterval(100000, 999999),
            previewSrc: "fsfsfs", // NEXT
            styles: this.convertCommoneStylesToWindow(tmp.styles),
            secondChildrenIds: [],
            enableSecondColumn: false,
            background: { ...defaultBaseBgParams(), throughСursor: false },
        };
        result.styles.shadow.enabled = false;
        result.styles.borderRadius.enabled = true;
        result.styles.background.color = "#ffffff";
        return result;
    }
    public getStyles(params: WindowParams) {
        const style = params.styles;
        return (
            styleGenerator([
                {
                    cssVariable: cssVariable.width,
                    value:
                        style.stretchOnWidth === true
                            ? "100%"
                            : style.width + "px",
                },
                {
                    cssVariable: cssVariable.height,
                    value: style.height,
                },
            ]) + this.getCommonStyles(params)
        );
    }

    public getMobileStyles(params: WindowParams) {
        const style = params.styles.mobile;
        return (
            styleGenerator([
                {
                    cssVariable: cssVariable.width,
                    value:
                        style.stretchOnWidth === true
                            ? "100%"
                            : style.width + "px",
                },
                {
                    cssVariable: cssVariable.height,
                    value: style.height,
                },
            ]) + this.getCommonMobileStyles(params)
        );
    }
    //Эти дополнительные стили применяются к другому селектору
    private getWindowOverlayStyles(params: WindowParams) {
        const style = params.styles;
        const animationName =
            style.showEffect === WindowShowEffect.appearance
                ? "fadeIn"
                : "slideDown";
        const animationReverseName =
            style.showEffect === WindowShowEffect.appearance
                ? "fadeOut"
                : "slideUp";
        return styleGenerator([
            {
                cssVariable: cssVariable.elementsAlign,
                value: style.wrapperVerticalJustify,
            },
            {
                cssVariable: cssVariable.jstfContent,
                value: style.wrapperHorizontalJustify,
            },
            {
                cssVariable: cssVariable.paddings,
                value: styleCombiner.padding(style.wrapperPaddings),
            },
            {
                cssVariable: cssVariable.animationName,
                value: animationName,
            },
            {
                cssVariable: cssVariable.animationReverseName,
                value: animationReverseName,
            },
        ]);
    }
    private getWindowOverlayMobileStyles(params: WindowParams) {
        const style = params.styles.mobile;
        return styleGenerator([
            {
                cssVariable: cssVariable.elementsAlign,
                value: style.wrapperVerticalJustify,
            },
            {
                cssVariable: cssVariable.jstfContent,
                value: style.wrapperHorizontalJustify,
            },
            {
                cssVariable: cssVariable.paddings,
                value: styleCombiner.padding(style.wrapperPaddings),
            },
        ]);
    }
    private getCrossStyles(params: WindowParams) {
        const style = params.styles;
        return styleGenerator([
            {
                cssVariable: cssVariable.contentWidth,
                value: style.cross.size + "px",
            },
            {
                cssVariable: cssVariable.height,
                value: style.cross.size + "px",
            },
            {
                cssVariable: cssVariable.right,
                value:
                    style.wrapperHorizontalJustify === ElementsJustify.end
                        ? "auto"
                        : "15px",
            },
            {
                cssVariable: cssVariable.left,
                value:
                    style.wrapperHorizontalJustify !== ElementsJustify.end
                        ? "auto"
                        : "15px",
            },

            {
                cssVariable: cssVariable.translateY,
                value:
                    style.wrapperVerticalJustify === ElementsJustify.start
                        ? "0%"
                        : "-100%",
            },
            {
                cssVariable: cssVariable.translateX,
                value:
                    style.wrapperHorizontalJustify === ElementsJustify.end
                        ? "calc(-100% - 15px)"
                        : "calc(100% + 15px)",
            },
            {
                cssVariable: cssVariable.crossDisplayInside,
                value:
                    style.cross.crossPosition === WindowCrossPosition.inside
                        ? "block"
                        : undefined,
            },
            {
                cssVariable: cssVariable.crossDisplayOutside,
                value:
                    style.cross.crossPosition === WindowCrossPosition.outside
                        ? "block"
                        : undefined,
            },
            {
                cssVariable: cssVariable.crossDisplayNear,
                value:
                    style.cross.crossPosition === WindowCrossPosition.near
                        ? "block"
                        : undefined,
            },
            {
                cssVariable: cssVariable.textColor,
                value:
                    style.cross.color === "auto"
                        ? "#4f4f4f"
                        : style.cross.color,
            },
        ]);
    }
    private getCrossMobileStyles(params: WindowParams) {
        const style = params.styles.mobile;
        return styleGenerator([
            {
                cssVariable: cssVariable.contentWidth,
                value: style.cross.size + "px",
            },
            {
                cssVariable: cssVariable.height,
                value: style.cross.size + "px",
            },
            {
                cssVariable: cssVariable.right,
                value:
                    style.wrapperHorizontalJustify === ElementsJustify.end
                        ? "auto"
                        : "15px",
            },
            {
                cssVariable: cssVariable.left,
                value:
                    style.wrapperHorizontalJustify !== ElementsJustify.end
                        ? "auto"
                        : "15px",
            },

            {
                cssVariable: cssVariable.translateY,
                value:
                    style.wrapperVerticalJustify === ElementsJustify.start
                        ? "0%"
                        : "-100%",
            },
            {
                cssVariable: cssVariable.translateX,
                value:
                    style.wrapperHorizontalJustify === ElementsJustify.end
                        ? "calc(-100% - 15px)"
                        : "calc(100% + 15px)",
            },
            {
                cssVariable: cssVariable.crossDisplayInside,
                value:
                    style.cross.crossPosition === WindowCrossPosition.inside
                        ? "block"
                        : "none",
            },
            {
                cssVariable: cssVariable.crossDisplayOutside,
                value:
                    style.cross.crossPosition === WindowCrossPosition.outside
                        ? "block"
                        : "none",
            },
            {
                cssVariable: cssVariable.crossDisplayNear,
                value:
                    style.cross.crossPosition === WindowCrossPosition.near
                        ? "block"
                        : "none",
            },
            {
                cssVariable: cssVariable.textColor,
                value:
                    style.cross.color === "auto"
                        ? "#4f4f4f"
                        : style.cross.color,
            },
        ]);
    }
    protected getAdditionalCombinedStyles(id: id, params: WindowParams) {
        const selector = getSelector(id, ".window-overlay-container", false);
        const selectorCross = getSelector(
            id,
            ["window-overlay-container", "close"],
            false
        );
        return (
            collectStyle(selector, this.getWindowOverlayStyles(params)) +
            collectStyle(selectorCross, this.getCrossStyles(params)) +
            collectMobileStyle(
                selector,
                this.getWindowOverlayMobileStyles(params)
            ) +
            collectMobileStyle(selectorCross, this.getCrossMobileStyles(params))
        );
    }
    private convertCommoneStylesToWindow(
        common: ZoneStylesParams
    ): WindowStylesParams {
        return {
            ...common,
            paddings: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50,
            },
            width: 400,
            stretchOnWidth: false,
            height: "auto",
            wrapperVerticalJustify: ElementsJustify.center,
            wrapperHorizontalJustify: ElementsJustify.center,
            wrapperPaddings: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50,
            },
            minHeight: {
                enabled: true,
                unit: "px",
                value: 80,
            },
            cross: {
                crossPosition: WindowCrossPosition.inside,
                path: `${process.env.BASE_URL}/svg/outlined/close.svg#icon`,
                size: 40,
                color: "auto",
            },
            showEffect: WindowShowEffect.appearance,
            closeOnClickOutside: true,
            cardProportion: CardsProportion.m,
            gapBetween: 40, //расстояние между двумя колонкками
            mobile: this.convertCommoneMobileStylesToWindow(common.mobile),
        };
    }
    private convertCommoneMobileStylesToWindow(
        common: ZoneStylesMobileParams
    ): WindowStylesMobileParams {
        return {
            ...common,
            width: 400,
            stretchOnWidth: true,
            height: "auto",
            wrapperVerticalJustify: ElementsJustify.center,
            wrapperHorizontalJustify: ElementsJustify.center,
            minHeight: {
                enabled: true,
                unit: "px",
                value: 50,
            },
            wrapperPaddings: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
            cross: {
                crossPosition: WindowCrossPosition.inside,
                path: `${process.env.BASE_URL}/svg/outlined/close.svg#icon`,
                size: 40,
                color: "auto",
            },
            changeOrder: false,
            gapBetween: 20, //расстояние между двумя колонкками
        };
    }
}
