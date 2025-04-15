import { ItemTypes, ItemQuizParams } from "@/types";
import { Item } from "./Item";
import { styleCombiner, styleGenerator } from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";

export class Quiz extends Item {
    protected static instance: Quiz;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Quiz.instance) {
            Quiz.instance = new Quiz();
            // ... здесь единожды выполняется инициализация ...
        }
        return Quiz.instance;
    }
    public getType(): ItemTypes.quiz {
        return ItemTypes.quiz;
    }
    public getName() {
        return "Глобальный квиз";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/quiz.jpg`;
    }
    public getDefaultItemParams(parentId: id): ItemQuizParams {
        const commonStyles = this.getItemCommonParams(this.getType());
        return {
            ...commonStyles,
            type: this.getType(),
            quizId: false,
            styles: {
                borderRadius: {
                    enabled: false,
                    value: {
                        tl: 15,
                        tr: 15,
                        bl: 15,
                        br: 15,
                    },
                },
                border: {
                    enabled: false,
                    borderWidth: 2,
                    borderColor: "#000000",
                },
                shadow: {
                    enabled: false,
                    value: {
                        shift: 5,
                        angle: 120,
                        blur: 2,
                        color: "#000000",
                    },
                },
            },
        };
    }
    public getStyles(params: ItemQuizParams) {
        const styles = params.styles;
        return (
            this.getItemCommonStyles(params) +
            styleGenerator([
                {
                    cssVariable: cssVariable.brdRadius,
                    value: styles.borderRadius.enabled
                        ? `${styleCombiner.borderRadius(
                              styles.borderRadius.value
                          )}`
                        : undefined,
                },
                {
                    cssVariable: cssVariable.brd,
                    value: styles.border.enabled
                        ? `${styleCombiner.border(
                              styles.border.borderColor,
                              styles.border.borderWidth
                          )}`
                        : undefined,
                },
                {
                    cssVariable: cssVariable.boxShadow,
                    value: styles.shadow.enabled
                        ? `${styleCombiner.shadow(styles.shadow.value)}`
                        : undefined,
                },
            ])
        );
    }
    public getMobileStyles(params: ItemQuizParams) {
        return this.getMobileItemCommonStyles(params);
    }
}
