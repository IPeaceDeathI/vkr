import { ApiModel } from "./main";
import { postResponseVideoSchema } from "../validation/Video";

export interface ResultVideo {
    src: string;
    path_files: string;
    status: boolean;
    old_name: string;
    new_name: string;
    errors: Array<string>;
    size: number;
}

export interface VideoPOSTResponse {
    status: boolean;
    result: Array<ResultVideo>;
    errors: Array<string>;
}

export class ApiVideo extends ApiModel {
    private static instance: ApiVideo;
    private constructor() {
        super();
        this.pathToData = [];
    }
    static getInstance() {
        if (!ApiVideo.instance) {
            ApiVideo.instance = new ApiVideo();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiVideo.instance;
    }
    public async POST(data: FormData): Promise<VideoPOSTResponse> {
        return this.post(
            {
                baseURL: "https://noks-d1.ru",
                data: data,
            },
            postResponseVideoSchema
        );
    }
}
