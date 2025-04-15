import { ApiModel } from "./main";
import { z } from "zod";

const getResponseDataSchema = z.object({
    admin: z.boolean(),
    tester: z.boolean(),
    block_creator: z.boolean(),
});

export type UserRightsGetResponseData = z.infer<typeof getResponseDataSchema>;

export class ApiUser extends ApiModel {
    private static instance: ApiUser;
    private localBaseUrl = "users/";
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiUser.instance) {
            ApiUser.instance = new ApiUser();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiUser.instance;
    }
    public async GET_RIGHTS(): Promise<UserRightsGetResponseData> {
        const result: UserRightsGetResponseData = await this.get(
            {
                url: `${this.localBaseUrl}rights`,
            },
            getResponseDataSchema
        );
        return result;
    }
}
