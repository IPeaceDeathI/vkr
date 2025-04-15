<template>
    <draggable-card v-model="show" width="560px" height="255px">
        <redactor-toolbar
            v-model="Tabs"
            :toggle-btns="tabsBtn"
            :view-port-swapper="Tabs === 'styles'"
            @close-click="$emit('update:modelValue', false)"
        />
        <v-redactor-container v-if="Tabs == 'button'">
            <v-row align="center" justify="start" class="pb-2">
                <v-col>
                    <redactor-component-title style="flex: 0 0 auto">
                        Текст
                    </redactor-component-title>
                    <v-text-field v-model="buttonText" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-divider class="border-opacity-50" />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <actions-redactor
                        :action-type="action"
                        @update:actionType="action = $event"
                    />
                </v-col>
            </v-row>
        </v-redactor-container>
        <v-redactor-container v-else-if="Tabs == 'goals'">
            <goals-redactor v-model="goals" />
        </v-redactor-container>
        <button-style-redactor
            v-if="Tabs == 'styles'"
            :params="buttonStyleParams"
            @onChange="changeButtonStyle"
        />
    </draggable-card>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, toRefs, computed, shallowRef } from "vue";
import {
    actionsRedactor,
    redactorToolbar,
    draggableCard,
    goalsRedactor,
} from "@/features/structure/redactors/reusable-components";
import {
    ItemButtonParams,
    ItemButtonStylesParams,
} from "@/types/structure/items";
import buttonStyleRedactor from "./button-style-redactor.vue";
import { EventActions, GoalsParams } from "@/types";
import { getDefaultGoalsParams } from "@/shared/services/elements_fabrics";

//typing
type Props = { modelValue: boolean; params: ItemButtonParams };
type Emits = {
    "update:modelValue": [value: boolean];
    onChange: [value: ItemButtonParams];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//item button params
const { params } = toRefs(props);

const action = computed<EventActions>({
    get() {
        return params.value.settings.events[0].onclick;
    },
    set(value: EventActions): void {
        const tmpParams = {
            ...params.value,
            settings: {
                ...params.value.settings,
                events: {
                    ...params.value.settings.events,
                    0: { ...params.value.settings.events[0], onclick: value },
                },
            },
        };
        emit("onChange", tmpParams); //TODO проверить работает ли таким способом, без params.value.settings.events[0].onclick = value;
    },
});

const buttonStyleParams = computed<ItemButtonStylesParams>({
    get() {
        return params.value.styles;
    },
    set(value: ItemButtonStylesParams): void {
        emit("onChange", { ...params.value, styles: value });
    },
});

const buttonText = computed<string>({
    get() {
        return params.value.text;
    },
    set(value: string): void {
        emit("onChange", { ...params.value, text: value });
    },
});

const goals = computed<GoalsParams>({
    get() {
        return params.value.settings.goals ?? getDefaultGoalsParams();
    },
    set(value: GoalsParams) {
        emit("onChange", {
            ...params.value,
            settings: { ...params.value.settings, goals: value },
        });
    },
});

const changeButtonStyle = function (value: ItemButtonStylesParams): void {
    emit("onChange", { ...params.value, styles: value });
};

//model value
const show = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const closeRedactor = function (): void {
    show.value = false;
};

//переменные для template
const Tabs = shallowRef<string>("button");
const tabsBtn = shallowRef([
    { value: "button", text: "Кнопка" },
    { value: "styles", text: "Стиль" },
    { value: "goals", text: "Цели" },
]);
</script>
<style lang="scss" scoped></style>
