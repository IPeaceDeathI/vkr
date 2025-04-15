import {
    ElementsAlign,
    BodyLayoutCardParams,
    BodyLayoutType,
    CardsOrientation,
    GapTypes,
    ElementsJustify,
    StretchContent,
    MobileGapTypes,
    CardsProportion,
    ElementVisibility,
    IndicatorsSize,
    IndicatorsType,
    IndicatorsPosition,
    ArrowType,
    BtnPosition,
    CommonSliderParams,
} from "@/types";
import {
    collectMobileStyle,
    collectStyle,
    getSelector,
    styleGenerator,
} from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";
import { getContrastColor, getUUID } from "@/shared/helpers";
import { BlockBody } from "./BlockBody";
export class BlockLayoutCards extends BlockBody {
    protected static instance: BlockLayoutCards;
    protected constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!BlockLayoutCards.instance) {
            BlockLayoutCards.instance = new BlockLayoutCards();
            // ... здесь единожды выполняется инициализация ...
        }
        return BlockLayoutCards.instance;
    }
    public getType(): BodyLayoutType.cards {
        return BodyLayoutType.cards;
    }
    public getDefaultParams(): BodyLayoutCardParams {
        return {
            type: BodyLayoutType.cards,
            contentWidth: 24,
            cardsInRow: 3,
            elementsJustify: ElementsJustify.start,
            elementsAlign: ElementsAlign.stretch,
            gap: GapTypes.middle,
            strechContent: StretchContent.onGrid,
            cardsOrientation: CardsOrientation.vertical,
            cardProportion: CardsProportion.m,
            mobile: {
                cardsOrientation: CardsOrientation.vertical,
                gap: MobileGapTypes.middle,
                changeOrder: false,
            },
            sliderParams: {
                sliderId: getUUID(),
                enabled: false,
                visibility: ElementVisibility.all,
                sideSlides: {
                    enabled: false,
                    opacity: true,
                },
                indicatorsSize: IndicatorsSize.middle,
                indicatorsType: IndicatorsType.none,
                indicatorsPosition: IndicatorsPosition.outside,
                showOnHover: false,
                arrow: ArrowType.fullArrowBlackBg,
                btnPos: BtnPosition.inside,
                color: "#000000ff",
                cycleSlides: true,
                autoPlaySlider: {
                    enabled: false,
                    value: 6,
                },
            },
        };
    }
    public getStyles(params: BodyLayoutCardParams) {
        return styleGenerator([
            {
                cssVariable: cssVariable.elementsAlign,
                value: params.elementsAlign,
            },
            {
                cssVariable: cssVariable.jstfContent,
                value: params.elementsJustify,
            },
            { cssVariable: cssVariable.gapSize, value: params.gap },
            { cssVariable: cssVariable.width, value: params.strechContent },
        ]);
    }
    public getAdditionalCombinedStyles(id: string, params: any): string {
        const sliderParams = params.sliderParams;
        const selector = getSelector(id, ".splide__arrow", true);
        const hoverSelector = getSelector(
            id,
            ".block-body:hover .splide__arrow",
            false
        );
        const leftArrowSelector = getSelector(id, ".splide__arrow--prev", true);
        const rightArrowSelector = getSelector(
            id,
            ".splide__arrow--next",
            true
        );
        const paginationSelector = getSelector(id, ".splide__pagination", true);
        return (
            collectStyle(selector, this.getStylesForArrow(sliderParams)) +
            collectStyle(
                hoverSelector,
                this.getStylesForArrowHover(sliderParams)
            ) +
            collectStyle(
                leftArrowSelector,
                this.getStylesForLeftArrow(sliderParams)
            ) +
            collectStyle(
                rightArrowSelector,
                this.getStylesForRightArrow(sliderParams)
            ) +
            collectStyle(
                paginationSelector,
                this.getStylesForPagination(sliderParams)
            ) +
            collectMobileStyle(
                leftArrowSelector,
                this.getMobileStylesForLeftArrow(sliderParams)
            ) +
            collectMobileStyle(
                rightArrowSelector,
                this.getMobileStylesForRightArrow(sliderParams)
            )
        );
    }
    private getStylesForArrow(params: CommonSliderParams): string {
        return styleGenerator([
            //DEVELOP
            {
                cssVariable: cssVariable.opacity,
                value:
                    params.arrow == "smallArrowGrayBg" ||
                    params.arrow == "fullArrowGrayBg"
                        ? ".4"
                        : "1",
            },
            {
                cssVariable: cssVariable.visibility,
                value: params.showOnHover ? "hidden" : "visable",
            },
            {
                cssVariable: cssVariable.width,
                value:
                    params.indicatorsSize == "small"
                        ? "40px"
                        : params.indicatorsSize == "middle"
                        ? "45px"
                        : "50px",
            },
            {
                cssVariable: cssVariable.height,
                value:
                    params.indicatorsSize == "small"
                        ? "40px"
                        : params.indicatorsSize == "middle"
                        ? "45px"
                        : "50px",
            },
            {
                cssVariable: cssVariable.bgColor,
                value:
                    params.arrow == "smallArrow" ||
                    params.arrow == "fullArrow" ||
                    params.arrow == "smallArrowOutlined" ||
                    params.arrow == "fullArrowOutlined"
                        ? "transparent"
                        : params.color,
            },
            {
                cssVariable: cssVariable.textColor,
                value:
                    params.color === "auto"
                        ? undefined
                        : params.arrow == "smallArrow" ||
                          params.arrow == "fullArrow" ||
                          params.arrow == "smallArrowOutlined" ||
                          params.arrow == "fullArrowOutlined"
                        ? params.color
                        : getContrastColor(params.color),
            },
            {
                cssVariable: cssVariable.brd,
                value:
                    params.arrow == "smallArrowOutlined" ||
                    params.arrow == "fullArrowOutlined"
                        ? "2px solid " + params.color
                        : "0px solid #000000",
            },
            {
                cssVariable: cssVariable.display,
                value: params.arrow == "none" ? "none" : "flex",
            },
        ]);
    }
    private getStylesForArrowHover(params: CommonSliderParams): string {
        return styleGenerator([
            {
                cssVariable: cssVariable.visibility,
                value: "visable",
            },
        ]);
    }
    private getStylesForLeftArrow(params: CommonSliderParams): string {
        return styleGenerator([
            {
                cssVariable: cssVariable.top,
                value: "50%",
            },
            {
                cssVariable: cssVariable.left,
                value: params.btnPos == "inside" ? "0" : "0",
            },
            {
                cssVariable: cssVariable.translateX,
                value: `calc(${
                    sliderTraslateXByPosition[params.btnPos]
                }% + var(--gap-size))`,
            },
            {
                cssVariable: cssVariable.translateY,
                value: "-50%",
            },
        ]);
    }
    private getMobileStylesForLeftArrow(params: CommonSliderParams): string {
        const btnPos =
            params.btnPos === BtnPosition.outside
                ? BtnPosition.onBorder
                : params.btnPos;
        return styleGenerator([
            {
                cssVariable: cssVariable.translateX,
                value: `calc(${sliderTraslateXByPosition[btnPos]}% + var(--gap-size))`,
            },
        ]);
    }

    private getStylesForRightArrow(params: CommonSliderParams): string {
        return styleGenerator([
            {
                cssVariable: cssVariable.top,
                value: "50%",
            },
            {
                cssVariable: cssVariable.right,
                value: params.btnPos == "inside" ? "0" : "0",
            },
            {
                cssVariable: cssVariable.translateX,
                value: `calc(${
                    -1 * sliderTraslateXByPosition[params.btnPos]
                }% - var(--gap-size))`,
            },
            {
                cssVariable: cssVariable.translateY,
                value: "-50%",
            },
        ]);
    }
    private getMobileStylesForRightArrow(params: CommonSliderParams): string {
        const btnPos =
            params.btnPos === BtnPosition.outside
                ? BtnPosition.onBorder
                : params.btnPos;
        return styleGenerator([
            {
                cssVariable: cssVariable.translateX,
                value: `calc(${
                    -1 * sliderTraslateXByPosition[btnPos]
                }% - var(--gap-size))`,
            },
        ]);
    }
    private getStylesForPagination(params: CommonSliderParams): string {
        console.log(params.color);
        return styleGenerator([
            {
                cssVariable: cssVariable.color,
                value:
                    params.color === "auto"
                        ? "#000000ff"
                        : params.indicatorsType == "numbers" ||
                          params.indicatorsType == "dots"
                        ? params.color
                        : "transparent",
            },
        ]);
    }
}
const sliderTraslateXByPosition = {
    [BtnPosition.inside]: 35,
    [BtnPosition.onBorder]: -50,
    [BtnPosition.outside]: -135,
    [BtnPosition.bottom]: 0,
};
