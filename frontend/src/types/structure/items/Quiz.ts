import { BorderRadius, Color, Shadow } from "@/types";
import { CommonItemsParams, ItemTypes } from "./_common";
export interface ItemQuizParams extends CommonItemsParams {
    type: ItemTypes.quiz;
    quizId: number | false;
    styles: ItemQuizStyleParams;
}
export type ItemQuizStyleParams = {
    border: {
        enabled: boolean;
        borderColor: Color;
        borderWidth: number;
    };
    shadow: {
        enabled: boolean;
        value: Shadow;
    };
    borderRadius: {
        enabled: boolean;
        value: BorderRadius;
    };
};
