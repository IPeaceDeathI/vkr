import {
    BackgroundEffects,
    Blackout,
    Color,
    ElementVisibility,
    ImageParams,
    ImagePosition,
    TextColorAutoTypes,
    VideoSrcType,
} from "@/types";
//block
export type Blocks = Map<id, BlockParams>;

export enum BlockTypes {
    common = "common",
    global = "global",
}
export type BlockParams = {
    blockCParams: BlockCParams;
    baseBGParams: BaseBGParams;
    //DEVELOP
    headerIsEnabled: boolean;
    blockTitle: false | id;
    blockTitleIsEnabled: boolean;
    footer: false | id;
    footerIsEnabled: boolean;
    //TODO не забыть удалять элеенты после сохранения
    tabs: boolean;
    //END DEVELOP
    parentId: id;
    childrenBlockBodiesId: Array<id>;
    topSpacerHeight: number;
    bottomSpacerHeight: number;
};
export type BlockCParams = {
    height: number | "auto";
    anchor: {
        enable: boolean;
        value: string;
    };
    //DEVELOP
    visibility: ElementVisibility;
    classes: Array<string>;
    //END DEVELOP
};
export type BaseBGParams = {
    selectedBg: BlockBgTypes;
    color: {
        backgroundColor: Color;
    };
    image: {
        backgroundImage: ImageParams;
        backgroundPosition: ImagePosition;
        //DEVELOP
        disableArchive: boolean;
        bgEffect: BackgroundEffects;
        //END DEVELOP
    };
    //DEVELOP
    video: {
        src: string;
        srcType: VideoSrcType;
        basicBG: {
            selectedBasicBg: false | "color" | "image";
            color: Color;
            image: {
                backgroundImage: ImageParams;
                backgroundPosition: ImagePosition;
            };
            bgEffect: BackgroundEffects;
            notPlayOnMobile: boolean;
        };
    };
    //END DEVELOP
    blackout: Blackout;
    textColorAutoType: TextColorAutoTypes;
};
export enum BlockBgTypes {
    none = "none",
    color = "color",
    image = "image",
    video = "video",
}
