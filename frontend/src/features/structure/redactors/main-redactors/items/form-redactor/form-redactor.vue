<!-- TODO еще одни табы "не показывать - при наведении - всегда" сделать чтобы при выборе показывались нужные элементы через v-if -->
<template>
    <draggable-card v-model="show" width="630px" height="450px">
        <redactor-toolbar
            v-model="tabs"
            :toggle-btns="tabsBtn"
            @close-click="closeRedactor"
        />
        <v-redactor-container>
            <template v-if="tabs === 'form'">
                <category-title style="margin-bottom: 4px">
                    Настройка полей
                </category-title>
                <fields-grid
                    v-model="grid"
                    :formParams="formParams"
                    @on-change="emit('onChange', $event)"
                />
                <v-row>
                    <v-col>
                        <v-divider class="mt-1" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <redactor-component-title>
                            Стиль поля
                        </redactor-component-title>
                        <v-btn-toggle
                            style="width: 100%; gap: 5px"
                            divided
                            class="pa-1"
                            selected-class="selected"
                            mandatory
                            v-model="inputColumns"
                        >
                            <v-btn
                                class="input-styles-preset-btn outlined"
                                variant="outlined"
                                :value="FormInputStyles.fill"
                                :flat="false"
                                :ripple="false"
                            >
                                <template v-slot:prepend>
                                    <v-icon>mdi-format-text</v-icon>
                                </template>
                            </v-btn>
                            <v-btn
                                class="input-styles-preset-btn"
                                variant="tonal"
                                :value="FormInputStyles.transparent"
                                :flat="false"
                                :ripple="false"
                            >
                                <template v-slot:prepend>
                                    <v-icon>mdi-format-text</v-icon>
                                </template>
                            </v-btn>
                            <!-- DEVELOP -->
                            <!-- <v-btn
                            class="input-styles-preset-btn underlined"
                            :value="FormInputStyles.underlined"
                            variant="outlined"
                            :flat="false"
                            :ripple="false"
                            ><template v-slot:prepend>
                                <v-icon>mdi-format-text</v-icon>
                            </template>
                        </v-btn> -->
                        </v-btn-toggle>
                    </v-col>
                </v-row>
                <category-title
                    style="margin-top: var(--redactor-line-spacing)"
                >
                    Настройка кнопки
                </category-title>
                <v-row>
                    <v-col>
                        <redactor-component-title>
                            Текст
                        </redactor-component-title>
                        <div class="d-flex">
                            <v-text-field v-model="buttonText" />
                            <v-btn
                                class="ml-3"
                                variant="tonal"
                                prepend-icon="mdi-tune-variant"
                                size="default"
                                @click="buttonStyleRedactorIsOpen = true"
                            >
                                Настроить стиль
                            </v-btn>
                            <v-btn
                                variant="tonal"
                                size="x-small"
                                style="width: 40px; height: 36px"
                                class="ml-3"
                            >
                                <v-icon size="large">
                                    mdi-arrange-send-to-back
                                </v-icon>
                                <v-tooltip activator="parent">
                                    Настроить положение кнопки
                                </v-tooltip>
                                <v-menu
                                    activator="parent"
                                    :close-on-content-click="false"
                                >
                                    <v-card class="pa-2" rounded="lg">
                                        <v-radio-group
                                            color="editor"
                                            class="button-position-selector"
                                            density="compact"
                                            v-model="buttonPosition"
                                        >
                                            <div
                                                class="d-flex justify-space-between"
                                                style="width: 100px"
                                            >
                                                <v-radio
                                                    :value="ButtonPosition.ttl"
                                                />
                                                <v-radio
                                                    :value="ButtonPosition.tc"
                                                />
                                                <v-radio
                                                    :value="ButtonPosition.ttr"
                                                />
                                            </div>
                                            <div
                                                class="d-flex justify-space-between"
                                                style="width: 160px"
                                            >
                                                <div class="vertical-group">
                                                    <v-radio
                                                        :value="
                                                            ButtonPosition.llt
                                                        "
                                                    />
                                                    <v-radio
                                                        :value="
                                                            ButtonPosition.lc
                                                        "
                                                    />
                                                    <v-radio
                                                        :value="
                                                            ButtonPosition.llb
                                                        "
                                                    />
                                                </div>
                                                <div
                                                    style="
                                                        display: flex;
                                                        flex-direction: column;
                                                        justify-content: center;
                                                    "
                                                >
                                                    <v-icon size="x-large">
                                                        mdi-format-list-bulleted
                                                    </v-icon>
                                                </div>
                                                <div class="vertical-group">
                                                    <v-radio
                                                        :value="
                                                            ButtonPosition.rrt
                                                        "
                                                    />
                                                    <v-radio
                                                        :value="
                                                            ButtonPosition.rc
                                                        "
                                                    />
                                                    <v-radio
                                                        :value="
                                                            ButtonPosition.rrb
                                                        "
                                                    />
                                                </div>
                                            </div>

                                            <div
                                                class="d-flex justify-space-between"
                                                style="width: 100px"
                                            >
                                                <v-radio
                                                    :value="ButtonPosition.bbl"
                                                />
                                                <v-radio
                                                    :value="ButtonPosition.bc"
                                                />
                                                <v-radio
                                                    :value="ButtonPosition.bbr"
                                                />
                                            </div>
                                        </v-radio-group>
                                    </v-card>
                                </v-menu>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <actions-redactor
                            :action-type="actions"
                            @update:actionType="actions = $event"
                            title="Действие после отправки"
                        />
                    </v-col>
                </v-row>
            </template>
            <template v-else-if="tabs === 'goals'">
                <goals-redactor v-model="goals">
                    <template v-slot:prepend>
                        <v-row>
                            <v-col>
                                <redactor-component-title
                                    hint="Чтобы понимать из какой формы отправлена заявка"
                                >
                                    Название формы
                                </redactor-component-title>
                                <v-text-field v-model="formName"></v-text-field>
                            </v-col>
                        </v-row>
                    </template>
                </goals-redactor>
            </template>
        </v-redactor-container>
        <draggable-inner-card
            v-model="buttonStyleRedactorIsOpen"
            width="580px"
            heightMin="120px"
        >
            <redactor-toolbar
                title="Стиль кнопки"
                :view-port-swapper="true"
                @close-click="buttonStyleRedactorIsOpen = false"
            />
            <button-style-redactor
                :params="buttonStyleParams"
                @onChange="changeButtonStyle"
            />
        </draggable-inner-card>
    </draggable-card>
</template>
<script setup lang="ts">
import { toRefs, computed, shallowRef, defineEmits, defineProps } from "vue";
import {
    draggableInnerCard,
    redactorToolbar,
    draggableCard,
    categoryTitle,
    goalsRedactor,
    actionsRedactor,
} from "@/features/structure/redactors/reusable-components";
import fieldsGrid from "./fields-grid.vue";
import {
    ElementsJustify,
    EventActions,
    FlexDirection,
    FormInputStyles,
    GoalsParams,
    ItemButtonStylesParams,
    ItemFormParams,
} from "@/types";
import { buttonStyleRedactor } from "../button-redactor";

//typing
type Tabs = "form" | "goals";

enum ButtonPosition {
    llt = "llt",
    lc = "lc",
    llb = "llb",
    rrt = "rrt",
    rc = "rc",
    rrb = "rrb",
    ttl = "ttl",
    tc = "tc",
    ttr = "ttr",
    bbl = "bbl",
    bc = "bc",
    bbr = "bbr",
}
type ButtonPositionAdapter = {
    [key in ButtonPosition]: {
        justify: ElementsJustify;
        flexDirection: FlexDirection;
    };
};
const buttonPositionAdapter: ButtonPositionAdapter = {
    [ButtonPosition.bbl]: {
        justify: ElementsJustify.start,
        flexDirection: FlexDirection.column,
    },
    [ButtonPosition.ttl]: {
        justify: ElementsJustify.start,
        flexDirection: FlexDirection.columnR,
    },
    [ButtonPosition.rrt]: {
        justify: ElementsJustify.start,
        flexDirection: FlexDirection.row,
    },
    [ButtonPosition.llt]: {
        justify: ElementsJustify.start,
        flexDirection: FlexDirection.rowR,
    },
    [ButtonPosition.bc]: {
        justify: ElementsJustify.center,
        flexDirection: FlexDirection.column,
    },
    [ButtonPosition.tc]: {
        justify: ElementsJustify.center,
        flexDirection: FlexDirection.columnR,
    },
    [ButtonPosition.rc]: {
        justify: ElementsJustify.center,
        flexDirection: FlexDirection.row,
    },
    [ButtonPosition.lc]: {
        justify: ElementsJustify.center,
        flexDirection: FlexDirection.rowR,
    },
    [ButtonPosition.bbr]: {
        justify: ElementsJustify.end,
        flexDirection: FlexDirection.column,
    },
    [ButtonPosition.ttr]: {
        justify: ElementsJustify.end,
        flexDirection: FlexDirection.columnR,
    },
    [ButtonPosition.rrb]: {
        justify: ElementsJustify.end,
        flexDirection: FlexDirection.row,
    },
    [ButtonPosition.llb]: {
        justify: ElementsJustify.end,
        flexDirection: FlexDirection.rowR,
    },
};

type Props = {
    formParams: ItemFormParams;
    modelValue: boolean;
};

type Emits = {
    onChange: [value: ItemFormParams];
    "update:modelValue": [value: boolean];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//form params
const { formParams, modelValue } = toRefs(props);

const show = computed<boolean>({
    get() {
        return modelValue.value;
    },
    set(value: boolean): void {
        emit("update:modelValue", value);
    },
});

const formName = computed<string>({
    get() {
        return formParams.value.settings.goals.formName;
    },
    set(value: string) {
        emit("onChange", {
            ...formParams.value,
            settings: {
                ...formParams.value.settings,
                goals: { ...formParams.value.settings.goals, formName: value },
            },
        });
    },
});

const goals = computed<GoalsParams>({
    get() {
        return formParams.value.settings.goals;
    },
    set(value: GoalsParams) {
        emit("onChange", {
            ...formParams.value,
            settings: {
                ...formParams.value.settings,
                goals: {
                    ...value,
                    formName: formParams.value.settings.goals.formName,
                },
            },
        });
    },
});

const actions = computed<EventActions>({
    get() {
        return formParams.value.settings.events[0].afterFormSend;
    },
    set(value: EventActions) {
        const tmpParams = structuredClone(formParams.value);
        tmpParams.settings.events[0].afterFormSend = value;
        emit("onChange", tmpParams);
    },
});

const grid = computed<(string | false)[][]>({
    get() {
        return [...formParams.value.fieldsGrid];
    },
    set(value: Array<Array<string | false>>): void {
        emit("onChange", { ...formParams.value, fieldsGrid: value });
    },
});

const inputColumns = computed<FormInputStyles>({
    get() {
        return formParams.value.inputsStyle;
    },
    set(value: FormInputStyles): void {
        emit("onChange", { ...formParams.value, inputsStyle: value });
    },
});
const buttonText = computed<string>({
    get() {
        return formParams.value.buttonText;
    },
    set(value: string): void {
        emit("onChange", { ...formParams.value, buttonText: value });
    },
});

const buttonPosition = computed<ButtonPosition | undefined>({
    get() {
        const tmp = (
            Object.keys(buttonPositionAdapter) as ButtonPosition[]
        ).find((key) => {
            return (
                buttonPositionAdapter[key].justify ===
                    formParams.value.justify &&
                buttonPositionAdapter[key].flexDirection ===
                    formParams.value.flexDirection
            );
        });
        return tmp;
    },
    set(value: ButtonPosition | undefined): void {
        if (!value) return;
        const { justify, flexDirection } = buttonPositionAdapter[value];
        emit("onChange", {
            ...formParams.value,
            justify: justify,
            flexDirection: flexDirection,
        });
        return undefined;
    },
});

const buttonStyleParams = computed<ItemButtonStylesParams>({
    get() {
        return formParams.value.buttonStyles;
    },
    set(value: ItemButtonStylesParams): void {
        emit("onChange", { ...formParams.value, buttonStyles: value });
    },
});

//переменные и функции для работы с версткой
const tabs = shallowRef<Tabs>("form");
const tabsBtn = shallowRef([
    { value: "form", text: "Форма" },
    { value: "goals", text: "Цели" },
]);
const buttonStyleRedactorIsOpen = shallowRef(false);

const changeButtonStyle = function (value: ItemButtonStylesParams): void {
    emit("onChange", { ...formParams.value, buttonStyles: value });
};

//modelValue
const closeRedactor = function (): void {
    emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
.input-styles-preset-btn {
    display: block;
    position: relative;
    flex-grow: 1;
    flex-shrink: 0;
    border-radius: 0;
    cursor: pointer;
    &::before {
        content: "";
        position: absolute;
        display: block;
        width: 18px;
        height: 18px;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiM0NzczRkYiIGN4PSIxMCIgY3k9IjEwIiByPSIxMCIvPjxwYXRoIGQ9Ik03LjcwNyAxMC4yOTNMNyA5LjU4NiA1LjU4NiAxMWwuNzA3LjcwNyAxLjQxNC0xLjQxNHpNOSAxM2wtLjcwNy43MDcuNzA3LjcwNy43MDctLjcwN0w5IDEzem01LjcwNy00LjI5M0wxNS40MTQgOCAxNCA2LjU4NmwtLjcwNy43MDcgMS40MTQgMS40MTR6bS04LjQxNCAzbDIgMiAxLjQxNC0xLjQxNC0yLTItMS40MTQgMS40MTR6bTMuNDE0IDJsNS01LTEuNDE0LTEuNDE0LTUgNSAxLjQxNCAxLjQxNHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4K);
        background-repeat: no-repeat;
        pointer-events: none;
        right: 3px;
        top: 3px;
        opacity: 0;
        z-index: calc(var(--base-z-index) + 1);
        transition: opacity 0.2s, transform 0.3s ease-out;
    }
    &.selected::v-deep .v-btn__overlay {
        opacity: 0;
    }
    &.selected::before {
        opacity: 1;
    }
    &.outlined::v-deep .v-btn__underlay {
        background-color: white;
    }
    &.underlined {
        border: none;
        border-bottom: solid 1px rgba(128, 128, 128, 0.438);
    }
    &.underlined::v-deep .v-btn__underlay {
        background-color: white;
    }
}
.button-position-selector::v-deep .v-selection-control {
    flex: none;
}
.button-position-selector::v-deep .v-selection-control-group {
    align-items: center;
}
.vertical-group {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
