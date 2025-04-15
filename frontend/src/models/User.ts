import { Api } from "@/shared/api";
import { UserRightsGetResponseData } from "@/shared/api/models";
export type User = {
    rights: UserRightsGetResponseData;
};
export class UserModel {
    public static async get(): Promise<User> {
        return { rights: await Api.User().GET_RIGHTS() };
    }
}
