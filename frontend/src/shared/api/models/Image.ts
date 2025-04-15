import { ApiModel } from "./main";
import { postResponseImageSchema } from "../validation/Image";

export interface Result {
    src: string;
    path_files: string;
    status: boolean;
    old_name: string;
    new_name: string;
    errors: Array<string>;
    size: number;
    resize?: Array<string>;
}

export interface ImagePOSTResponse {
    status: boolean;
    result: Array<Result>;
    errors: Array<string>;
}

export class ApiImage extends ApiModel {
    private static instance: ApiImage;
    private constructor() {
        super();
        this.pathToData = [];
    }
    static getInstance() {
        if (!ApiImage.instance) {
            ApiImage.instance = new ApiImage();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiImage.instance;
    }
    public async POST(
        data: FormData,
        resize = false
    ): Promise<ImagePOSTResponse> {
        return this.post(
            {
                baseURL:
                    process.env.VUE_APP_NOKS_BUILD == "true"
                        ? "https://noks-d1.ru"
                        : "https://noks-d1.ru/dev",
                url: resize ? "resize" : "",
                data: data,
            },
            postResponseImageSchema
        );
    }
}
