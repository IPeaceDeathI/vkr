<template>
    <draggable-inner-card v-model="show" width="460px" height="300px">
        <redactor-toolbar
            title="Настройки"
            @close-click="$emit('update:modelValue', false)"
        />
        <v-redactor-container>
            <v-row>
                <v-col>
                    <redactor-component-title>
                        Название
                    </redactor-component-title>
                    <v-text-field v-model="name" focused />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <redactor-component-title>
                        Ссылка или действие
                    </redactor-component-title>
                    <v-text-field v-model="link" focused />
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-switch
                        :disabled="!canTarget"
                        label="Открывать в новом окне"
                        v-model="targetBlank"
                    />
                </v-col>
            </v-row>
        </v-redactor-container>
    </draggable-inner-card>
</template>
<script setup lang="ts">
import {
    draggableInnerCard,
    redactorToolbar,
} from "@/features/structure/redactors/reusable-components";
import { defineProps, defineEmits, toRefs, computed } from "vue";
import { MenuItemLink } from "@/types";

//typing
type Props = {
    itemParams: MenuItemLink;
    modelValue: boolean;
};

type Emits = {
    onChange: [value: MenuItemLink];
    "update:itemParams": [value: MenuItemLink];
    "update:modelValue": [value: boolean];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//item params
const { itemParams, modelValue } = toRefs(props);

const itemType = computed<"link" | "drop">(() => {
    return itemParams.value.type;
});

const name = computed<string>({
    get() {
        return itemParams.value.name;
    },
    set(value: string) {
        emit("update:itemParams", {
            ...itemParams.value,
            name: value,
        });
    },
});

const link = computed<string>({
    get() {
        return itemParams.value.link;
    },
    set(value: string) {
        emit("update:itemParams", {
            ...itemParams.value,
            link: value,
        });
    },
});

const targetBlank = computed<boolean>({
    get() {
        return itemParams.value.targetBlank;
    },
    set(value: boolean) {
        emit("update:itemParams", {
            ...itemParams.value,
            targetBlank: value,
        });
    },
});

const canTarget = computed<boolean>(() => {
    return link.value[0] !== "#";
});

//modelValue
const show = computed<boolean>({
    get() {
        return modelValue.value;
    },
    set(value: boolean): void {
        emit("update:modelValue", value);
    },
});
</script>
<style lang="scss" scoped></style>
