import axios from "axios";

export interface ListImg {
    id: number;
    authorName: string;
    authorLink: string;
    mini_img: string;
    full_img: string;
    regular_img: string;
    small_img: string;
    imgHeight: number;
    elemHeight: number;
    elemWidth: number;
}

interface Element {
    links?: {
        download?: string;
        // html?: string;
    };
    urls?: {
        thumb?: string;
        full?: string;
        regular?: string;
        small?: string;
    };
    user?: {
        name?: string;
        links?: {
            html?: string;
        };
    };
    height?: number;
    width?: number;
}

export interface PromisePhotos {
    config?: object;
    data?: {
        results?: Array<Element>;
    };
}

// const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
const clientId = "g4n12dNmBDxp8t6hCjlwD7LUstVLfAALbLOi6o4j6zE";

const UNSPLASH_ROOT = "https://api.unsplash.com";

export const getPhotosByQuery = (query: string, pageNum: number) => {
    return axios.get(
        `${UNSPLASH_ROOT}/search/photos?query=${query}&client_id=${clientId}&per_page=30&page=${pageNum}`
    ) as Promise<object>;
};
