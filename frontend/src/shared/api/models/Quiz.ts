import { NOKS_HOST } from "@/shared/config";
import { ApiModel } from "./main";
import { z } from "zod";

const getResponseDataSchema = z.array(
    z.object({
        quiz_id: z.number(),
        quiz_title: z.string(),
    })
);

export type QuizGetResponseData = z.infer<typeof getResponseDataSchema>;

type GetMethods = "getAllShortQuiz";

export class ApiQuiz extends ApiModel {
    private static instance: ApiQuiz;
    private constructor() {
        super();
    }
    static getInstance() {
        if (!ApiQuiz.instance) {
            ApiQuiz.instance = new ApiQuiz();
            // ... здесь единожды выполняется инициализация ...
        }
        return ApiQuiz.instance;
    }
    public async GET(method: GetMethods): Promise<QuizGetResponseData> {
        const result: QuizGetResponseData = await this.get(
            {
                baseURL: `${NOKS_HOST}constructor/api`,
                url: `quizs`,
                params: { method: method },
            },
            getResponseDataSchema
        );
        return result;
    }
}
