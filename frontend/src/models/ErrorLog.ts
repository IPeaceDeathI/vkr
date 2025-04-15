import { Api } from "@/shared/api";
export class ErrorModel {
    public static log(errors: string): Promise<boolean> {
        return Api.ErrorLog().POST(errors);
    }
}
