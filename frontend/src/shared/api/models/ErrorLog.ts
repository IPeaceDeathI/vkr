import { NOKS_HOST } from "@/shared/config";
import { ApiModel } from "./main";
import { z } from "zod";

export class ApiError extends ApiModel {
    private static instance: ApiError;
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiError.instance) {
            ApiError.instance = new ApiError();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiError.instance;
    }
    public async POST(errors: string): Promise<boolean> {
        const result: boolean = await this.post(
            {
                url: `/constructor/log`,
                data: errors,
            },
            z.any()
        );
        return result;
    }
}
