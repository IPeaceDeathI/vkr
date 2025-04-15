import {
    ItemTypes,
    ImageSize,
    ImagePosition,
    OverlayType,
    OverlayTextPosition,
    MediaImageParams,
    ItemImageParams,
    MediaType,
    IndicatorsSize,
    IndicatorsType,
    IndicatorsPosition,
    SliderEffect,
    ArrowType,
    BtnPosition,
    MediaSliderParams,
    MediaVideoParams,
    EventTypes,
    ActionTypes,
    VideoSrcType,
    ImageStylesParams,
    CommonSliderParams,
} from "@/types";
import {
    collectStyle,
    getSelector,
    styleCombiner,
    styleGenerator,
} from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";
import { Item } from "./Item";
import { getContrastColor, getUUID } from "@/shared/helpers";

export class Image extends Item {
    protected static instance: Image;
    private Slider: MediaSlider;
    private constructor() {
        super();
        this.Slider = new MediaSlider();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Image.instance) {
            Image.instance = new Image();
            // ... здесь единожды выполняется инициализация ...
        }
        return Image.instance;
    }
    public getType(): ItemTypes.image {
        return ItemTypes.image;
    }
    public getName() {
        return "Картинка";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/image.jpg`;
    }
    public getDefaultItemParams(): ItemImageParams {
        return {
            ...this.getItemCommonParams(this.getType()),
            type: this.getType(),
            mediaType: MediaType.image,
            imageParams: this.getDefaultIMageParams(),
            videoParams: this.getDefaultVideoParams(),
            sliderParams: this.Slider.getDefaultParams(),
            commonStyles: {
                minHeight: 0,
                backgroundSize: ImageSize.cover,
                borderRadius: {
                    enabled: false,
                    value: {
                        tl: 10,
                        tr: 10,
                        br: 10,
                        bl: 10,
                    },
                },
            },
        };
    }
    public getDefaultIMageParams(): MediaImageParams {
        return {
            styles: {
                imageParams: {
                    src: `${process.env.BASE_URL}images/items/orange.png`,
                    base_src: `${process.env.BASE_URL}images/items/orange.png`,
                },
                fill: false,
                archiving: true,
                paddingsOff: false,
                backgroundPosition: ImagePosition.center,
                alternativeText: false,
                overlay: {
                    enabled: OverlayType.hide,
                    value: {
                        coverColor: "#3333ff",
                        textColor: "#ff3333",
                    },
                    title: "",
                    description: "",
                    textPosition: OverlayTextPosition.center,
                },
            },
            settings: {
                events: [
                    {
                        [EventTypes.onclick]: {
                            [ActionTypes.none]: true,
                        },
                    },
                ],
            },
        };
    }

    public getDefaultVideoParams(): MediaVideoParams {
        return {
            src: "https://www.youtube.com/embed/ClC8aM5J2iM?enablejsapi=1", //video ID = ClC8aM5J2iM
            previewSrc: "https://i.ytimg.com/vi/ClC8aM5J2iM/maxresdefault.jpg",
            autoPlay: false,
            srcType: VideoSrcType.youTube,
            previewPosition: ImagePosition.center,
            cover: true,
            cycleAndHideInterface: false,
        };
    }
    public getStyles(params: ItemImageParams) {
        return (
            this.getItemCommonStyles(params) +
            styleGenerator([
                {
                    cssVariable: cssVariable.margins,
                    value: params.imageParams.styles.paddingsOff
                        ? `var(${cssVariable.reversePaddings}, 0px)`
                        : undefined,
                },
                {
                    cssVariable: cssVariable.bgImage,
                    value: `url("${params.imageParams.styles.imageParams.src}")`,
                },
                {
                    cssVariable: cssVariable.bgSize,
                    value: params.commonStyles.backgroundSize,
                },
                {
                    cssVariable: cssVariable.bgPosition,
                    value: params.imageParams.styles.backgroundPosition,
                },
                {
                    cssVariable: cssVariable.brdRadius,
                    value: styleCombiner.borderRadius(
                        params.commonStyles.borderRadius.enabled
                            ? params.commonStyles.borderRadius.value
                            : undefined
                    ),
                },
                {
                    cssVariable: cssVariable.bgColorOverlay,
                    value: params.imageParams.styles.overlay.enabled
                        ? params.imageParams.styles.overlay.value.coverColor
                        : undefined,
                },
                {
                    cssVariable: cssVariable.color,
                    value: params.imageParams.styles.overlay.enabled
                        ? params.imageParams.styles.overlay.value.textColor
                        : undefined,
                },
            ])
        );
    }
    public getMobileStyles(params: ItemImageParams) {
        return this.getMobileItemCommonStyles(params);
    }
    protected getAdditionalCombinedStyles(id: id, params: ItemImageParams) {
        return this.Slider.getStyles(params, id);
    }
}
class MediaSlider {
    constructor() {
        return;
    }
    public getDefaultParams(): MediaSliderParams {
        return {
            images: [
                {
                    imageParams: {
                        src: `${process.env.BASE_URL}images/items/orange.png`,
                        base_src: `${process.env.BASE_URL}images/items/orange.png`,
                    },
                    fill: false,
                    archiving: true,
                    paddingsOff: false,
                    backgroundPosition: ImagePosition.center,
                    alternativeText: false,
                    overlay: {
                        enabled: OverlayType.hide,
                        value: {
                            coverColor: "#3333ff",
                            textColor: "#ff3333",
                        },
                        title: "",
                        description: "",
                        textPosition: OverlayTextPosition.center,
                    },
                },
            ],
            indicatorsSize: IndicatorsSize.small,
            indicatorsType: IndicatorsType.none,
            indicatorsPosition: IndicatorsPosition.inside,
            color: "#ffffff",
            effect: SliderEffect.shift,
            arrow: ArrowType.fullArrowBlackBg,
            btnPos: BtnPosition.inside,
            sliderId: getUUID(),
            showOnHover: false,
            cycleSlides: true,
            autoPlaySlider: {
                enabled: false,
                value: 0,
            },
            settings: {
                events: [
                    {
                        [EventTypes.onclick]: {
                            [ActionTypes.none]: true,
                        },
                    },
                ],
            },
        };
    }
    public getStyles(params: ItemImageParams, itemId: string): string {
        return (
            this.getStylesForEachImage(params.sliderParams, itemId) +
            this.getStylesForArrows(params.sliderParams, itemId)
            // + this.getStylesForSomethingElse(params.sliderParams, itemId)
        );
    }
    private getStylesForArrows(
        params: CommonSliderParams,
        itemId: string
    ): string {
        const selector = getSelector(itemId, ".splide__arrow", true);
        const hoverSelector = getSelector(
            itemId,
            ".item-layout:hover .splide__arrow",
            false
        );
        const leftArrowSelector = getSelector(
            itemId,
            ".splide__arrow--prev",
            true
        );
        const rightArrowSelector = getSelector(
            itemId,
            ".splide__arrow--next",
            true
        );
        const paginationSelector = getSelector(
            itemId,
            ".splide__pagination",
            true
        );
        return (
            collectStyle(selector, this.getStylesForArrow(params)) +
            collectStyle(hoverSelector, this.getStylesForArrowHover(params)) +
            collectStyle(
                leftArrowSelector,
                this.getStylesForLeftArrow(params)
            ) +
            collectStyle(
                rightArrowSelector,
                this.getStylesForRightArrow(params)
            ) +
            collectStyle(
                paginationSelector,
                this.getStylesForPagination(params)
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
                    params.arrow == "smallArrow" ||
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
                value: params.btnPos == "inside" ? "0" : "-50%",
            },
            {
                cssVariable: cssVariable.translateY,
                value: "-50%",
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
                value: params.btnPos == "inside" ? "0" : "50%",
            },
            {
                cssVariable: cssVariable.translateY,
                value: "-50%",
            },
        ]);
    }
    private getStylesForPagination(params: CommonSliderParams): string {
        return styleGenerator([
            {
                cssVariable: cssVariable.color,
                value:
                    params.indicatorsType == "numbers" ||
                    params.indicatorsType == "dots"
                        ? params.color
                        : "transparent",
            },
        ]);
    }
    public getStylesForEachImage(
        params: MediaSliderParams,
        itemId: string
    ): string {
        return params.images.reduce((result, element, index) => {
            const selector = getSelector(itemId, ".img-" + index, true);
            return (
                result +
                collectStyle(selector, this.getInnerImageStyles(element))
            );
        }, "");
    }
    public getInnerImageStyles(params: ImageStylesParams): string {
        return styleGenerator([
            {
                cssVariable: cssVariable.bgImage,
                value: `url("${params.imageParams.src}")`,
            },
            {
                cssVariable: cssVariable.margins,
                value: params.paddingsOff
                    ? `var(${cssVariable.reversePaddings}, 0px)`
                    : undefined,
            },
        ]);
    }
}
export function getDefaultImageStylesParams(url?: string): ImageStylesParams {
    if (url) {
        styleGenerator([
            {
                cssVariable: cssVariable.bgImage,
                value: url,
            },
        ]);
        return {
            imageParams: { src: url, base_src: "" },
            fill: false,
            archiving: true,
            paddingsOff: false,
            backgroundPosition: ImagePosition.center,
            alternativeText: false,
            overlay: {
                enabled: OverlayType.hide,
                value: {
                    coverColor: "#3333ff",
                    textColor: "#ff3333",
                },
                title: "",
                description: "",
                textPosition: OverlayTextPosition.center,
            },
        };
    } else {
        return {
            imageParams: {
                src: `${process.env.BASE_URL}images/items/orange.png`,
                base_src: "",
            },
            fill: false,
            archiving: true,
            paddingsOff: false,
            backgroundPosition: ImagePosition.center,
            alternativeText: false,
            overlay: {
                enabled: OverlayType.hide,
                value: {
                    coverColor: "#3333ff",
                    textColor: "#ff3333",
                },
                title: "",
                description: "",
                textPosition: OverlayTextPosition.center,
            },
        };
    }
}
