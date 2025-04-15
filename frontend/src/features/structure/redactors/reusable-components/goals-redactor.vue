<template>
    <slot name="prepend" />
    <v-row class="disabled">
        <v-col>
            <redactor-component-title
                hint="Зависит от выбранного действия и не может быть изменена. Фиксируется если вы используете готовые интеграции с аналитикой."
            >
                Основная цель
            </redactor-component-title>
            <v-text-field v-model="mainGoal" />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <redactor-component-title
                hint="Укажите собственный идентификатор цели."
            >
                Название цели
            </redactor-component-title>
            <v-text-field v-model="goalName" />
        </v-col>
    </v-row>
    <v-row class="disabled">
        <v-col>
            <redactor-component-title
                hint="Вы можете указать любой JavaScript или HTML код, код будет вставлен на страницу по окончанию выбранного действия. Оборачивать код в тег не обязательно."
            >
                Произвольный код цели
            </redactor-component-title>
            <textarea v-model="goalCode" />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { GoalsParams, MainGoals } from "@/types";
import { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: Object as PropType<GoalsParams>,
            required: true,
        },
    },
    emits: {
        "update:modelValue": (value: GoalsParams) => true,
    },
    computed: {
        goals: {
            get(): GoalsParams {
                return this.modelValue;
            },
            set(value: GoalsParams) {
                this.$emit("update:modelValue", value);
            },
        },
        mainGoal: {
            get(): string {
                return this.modelValue.mainGoal === MainGoals.empty
                    ? ""
                    : this.modelValue.mainGoal;
            },
            set(value: MainGoals) {
                this.goals = { ...this.goals, mainGoal: value };
            },
        },
        goalName: {
            get(): string {
                return this.modelValue.goalName;
            },
            set(value: string) {
                this.goals = { ...this.goals, goalName: value };
            },
        },
        goalCode: {
            get(): string {
                return this.modelValue.goalCode;
            },
            set(value: string) {
                this.goals = { ...this.goals, goalCode: value };
            },
        },
    },
});
</script>

<style lang="scss" scoped>
.disabled {
    pointer-events: none;
    opacity: 0.4;
}
</style>
