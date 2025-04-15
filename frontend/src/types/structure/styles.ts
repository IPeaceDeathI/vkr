export interface Paddings {
    top: number;
    bottom: number;
    left: number;
    right: number;
}
export interface axisPadding {
    horizontal: number;
    vertical: number;
}
export interface SidesPadding {
    desktop: DesktopSidesPadding;
    mobile: MobileSidesPadding;
}

export interface DesktopSidesPadding extends MobileSidesPadding {
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
}
export interface MobileSidesPadding {
    paddingTop: number | boolean;
    paddingBottom: number | boolean;
}
export enum ElementVisibility { // Не менять значения enum к нему привязоны стили аттрибута data-noks-element-visibility
    all = "all",
    pc = "pc",
    mobile = "mobile",
    hidden = "hidden",
}
export enum WidthType {
    stretch = "100%",
    auto = "auto",
}
export enum ImageSize {
    cover = "cover",
    contain = "contain",
}
export enum ImagePosition {
    center = "center",
}
export enum TextDecoration {
    underline = "underline",
    overline = "line-through",
    underAndOver = "underline line-through",
    none = "none",
}
export interface Background {
    color: Color;
}
export interface Shadow {
    color: Color;
    angle: number;
    shift: number;
    blur: number;
}
export interface BorderRadius {
    tl: number;
    tr: number;
    bl: number;
    br: number;
}
export interface Size {
    padding: {
        horizontal: number;
        vertical: number;
    };
}
export interface OverlayColor {
    coverColor: string;
    textColor: string;
}
export enum OverlayTextPosition {
    center = "center",
    left = "left",
}
export enum OverlayType {
    hide = "hide",
    onHover = "on-hover",
    forever = "forever",
}
export interface Blackout {
    enabled: boolean;
    color: string;
}
export enum TextAlign {
    inherit = "inherit",
    left = "left",
    center = "center",
    right = "right",
    justify = "justify",
}
// export interface Filter {
//     brightness: number;
// }
export enum IconVariant {
    default = "default",
    filled = "filled",
    outlined = "outlined",
}
export enum ButtonIconPosition {
    left = "left",
    right = "right",
}
export enum BorderRadiusPresets {
    none = "0",
    roundedS = "15",
    circle = "50",
}
export enum ElementsAlign {
    start = "flex-start",
    center = "center",
    end = "flex-end",
    stretch = "stretch",
}
export enum ElementsJustify {
    start = "start",
    center = "center",
    end = "end",
}
export enum FlexDirection {
    row = "row",
    column = "column",
    rowR = "row-reverse",
    columnR = "column-reverse",
}
export enum GapTypes {
    none = "0px",
    middle = "13px",
    large = "25px",
}
export enum MobileGapTypes {
    none = "0px",
    xsmall = "10px",
    small = "15px",
    middle = "20px",
    large = "30px",
    xlarge = "50px",
}
export enum StretchContent {
    onScreen = "100vw",
    onGrid = `1150px`,
}
export enum TextColorAutoTypes {
    auto = "auto",
    light = "#ffffff",
    dark = "#000000",
}
export enum ContrastColor {
    light = "#ffffff",
    dark = "#000000",
}
export interface ImageParams {
    src: string;
    base_src: string;
}
export interface CommonSliderParams {
    indicatorsSize: IndicatorsSize;
    indicatorsType: IndicatorsType;
    indicatorsPosition: IndicatorsPosition;
    showOnHover: boolean;
    arrow: ArrowType;
    btnPos: BtnPosition;
    color: Color;
    cycleSlides: boolean;
    sliderId: id;
    autoPlaySlider: {
        enabled: boolean;
        value: number;
    };
}
export enum IndicatorsSize {
    small = "small",
    middle = "middle",
    large = "large",
}
export enum IndicatorsType {
    none = "none",
    numbers = "numbers",
    dots = "dots",
    lines = "lines",
}
export enum IndicatorsPosition {
    inside = "inside",
    outside = "outside",
}

export enum ArrowType {
    none = "none",
    smallArrowBlackBg = "smallArrowBlackBg",
    fullArrowBlackBg = "fullArrowBlackBg",
    smallArrowGrayBg = "smallArrowGrayBg",
    fullArrowGrayBg = "fullArrowGrayBg",
    smallArrowOutlined = "smallArrowOutlined",
    fullArrowOutlined = "fullArrowOutlined",
    smallArrow = "smallArrow",
    fullArrow = "fullArrow",
}

export enum BtnPosition {
    inside = "inside",
    onBorder = "onBorder",
    outside = "outside", //only cards
    //DEVELOP
    bottom = "bottom", //only cards
    // END DEVELOP
}
type HEX = `#${string}`;
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type GRADIENT =
    `linear-gradient(${number}deg, ${RGBA} ${number}%, ${RGBA} ${number}%)`;
export type Color = HEX | RGB | RGBA | GRADIENT | "auto";
//add new custom type
export enum TextTypes {
    header1 = "header-1",
    header2 = "header-2",
    text = "type-text",
    quote = "type-quote",
}
//type
export interface PageFonts {
    header1: string;
    header2: string;
    text: string;
    quote: string;
}
export enum BackgroundEffects {
    none = "none",
    fixed = "fixed",
    parallax = "parallax",
}
export enum VideoSrcType {
    download = "download",
    youTube = "youTube",
}
