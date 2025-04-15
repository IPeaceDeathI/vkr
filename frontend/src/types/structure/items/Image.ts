import {
    BorderRadius,
    CommonSliderParams,
    EventTypes,
    Events,
    ImageParams,
    ImagePosition,
    ImageSize,
    OverlayColor,
    OverlayTextPosition,
    OverlayType,
    VideoSrcType,
} from "@/types";
import { CommonItemsParams, ItemTypes } from "./_common";

export interface ItemImageParams extends CommonItemsParams {
    type: ItemTypes.image;
    mediaType: MediaType;
    imageParams: MediaImageParams;
    videoParams: MediaVideoParams;
    sliderParams: MediaSliderParams;
    commonStyles: {
        minHeight: number;
        backgroundSize: ImageSize;
        borderRadius: {
            enabled: boolean;
            value: BorderRadius;
        };
    };
}
export interface MediaImageParams {
    styles: ImageStylesParams;
    settings: {
        events: Events<EventTypes.onclick>;
    };
}
export interface MediaVideoParams {
    src: string;
    previewSrc: string;
    srcType: VideoSrcType;
    previewPosition: ImagePosition;
    autoPlay: boolean;
    cover?: boolean; //LEGACY
    cycleAndHideInterface: boolean;
}
export interface MediaSliderParams extends CommonSliderParams {
    images: Array<ImageStylesParams>;
    effect: SliderEffect;
    settings: {
        events: Events<EventTypes.onclick>;
    };
}
export enum SliderEffect { //only media slider
    shift = "shift",
    dissolution = "dissolution",
}
export enum MediaType {
    image = "image",
    slider = "slider",
    video = "video",
}

export interface ImageStylesParams {
    imageParams: ImageParams;
    //DEVELOP
    fill: boolean; //false - картинка задается с помощью padding-bottom. true - с помощью width: 100%
    paddingsOff: boolean;
    archiving: boolean;
    backgroundPosition: ImagePosition;
    alternativeText: string | false;
    overlay: {
        enabled: OverlayType;
        value: OverlayColor;
        title: string;
        description: string;
        textPosition: OverlayTextPosition;
    };
    //END DEVELOP
}
