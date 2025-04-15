export type categoryid = number;
export enum previewType {
    icon,
    image,
}
export enum ElementTypes {
    Block = "block",
    BlockBody = "blockBody",
}
export interface category {
    id: categoryid;
    title: string;
}
export interface item {
    id: number;
    id_cat: categoryid;
    previewType?: previewType;
    preview?: string;
    title: string;
}
export interface selectImageParams {
    src: string;
    base_src: string;
    archiving: boolean;
}
