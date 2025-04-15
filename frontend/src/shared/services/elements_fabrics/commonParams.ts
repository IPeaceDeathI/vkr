import {
    ArrowType,
    BackgroundEffects,
    BaseBGParams,
    BlockBgTypes,
    GoalsParams,
    ImagePosition,
    MainGoals,
    TextColorAutoTypes,
    VideoSrcType,
} from "@/types";
export function getDefaultGoalsParams(): GoalsParams {
    return {
        mainGoal: MainGoals.empty,
        goalName: "",
        goalCode: "",
    };
}
export function defaultBaseBgParams(): BaseBGParams {
    return {
        selectedBg: BlockBgTypes.color,
        color: {
            backgroundColor: "#f5f5f5ff",
        },
        image: {
            backgroundPosition: ImagePosition.center,
            backgroundImage: {
                src: "",
                base_src: "",
            },
            disableArchive: false,
            bgEffect: BackgroundEffects.none,
        },
        video: {
            src: "",
            srcType: VideoSrcType.download,
            basicBG: {
                selectedBasicBg: false,
                color: "#f5f5f5ff",
                image: {
                    backgroundPosition: ImagePosition.center,
                    backgroundImage: {
                        src: "",
                        base_src: "",
                    },
                },
                bgEffect: BackgroundEffects.none,
                notPlayOnMobile: true,
            },
        },
        blackout: {
            enabled: false,
            color: "#00000040",
        },
        textColorAutoType: TextColorAutoTypes.auto,
    };
}
type ArrowFabric = { [key in ArrowType]: string };
export const ArrowFabric: ArrowFabric = {
    [ArrowType.none]: ``,
    [ArrowType.fullArrow]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" fill="var(currentColor)"/></svg>`,
    [ArrowType.fullArrowBlackBg]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" fill="var(currentColor)"/></svg>`,
    [ArrowType.fullArrowGrayBg]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" fill="var(currentColor)"/></svg>`,
    [ArrowType.fullArrowOutlined]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" fill="var(currentColor)"/></svg>`,
    [ArrowType.smallArrow]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="var(currentColor)"/></svg>`,
    [ArrowType.smallArrowBlackBg]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="var(currentColor)"/></svg>`,
    [ArrowType.smallArrowGrayBg]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="var(currentColor)"/></svg>`,
    [ArrowType.smallArrowOutlined]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" fill="var(currentColor)"/></svg>`,
};
