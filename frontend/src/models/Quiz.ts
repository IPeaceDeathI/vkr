import { Api } from "@/shared/api";
import { QuizGetResponseData } from "@/shared/api/models";
export class QuizModel {
    public static getAll(): Promise<QuizGetResponseData> {
        return Api.Quiz().GET("getAllShortQuiz");
    }
}
