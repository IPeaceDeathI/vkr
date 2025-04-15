<template>
    <redactor-component-title> {{ title }}</redactor-component-title>
    <v-select
        v-model="selectType"
        hide-details
        density="compact"
        :items="items"
        item-title="name"
        item-value="action"
        variant="outlined"
    >
        <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :prepend-icon="item.raw.icon" />
        </template>
        <template v-slot:selection="{ item }">
            <v-icon size="small" class="mr-2">{{ item.raw.icon }}</v-icon>
            {{ item.title }}
        </template>
    </v-select>
    <v-text-field
        v-if="selectType === ActionTypes.link"
        class="mt-2"
        placeholder="Введите ссылку"
        v-model="selectValue"
    />
    <v-text-field
        v-else-if="selectType === ActionTypes.openWindow"
        class="mt-2"
        prefix="#"
        v-model="selectValue"
    />
    <v-text-field
        v-else-if="selectType === ActionTypes.showSnackbar"
        class="mt-2"
        v-model="selectValue"
    />
</template>
<script setup lang="ts">
import { withDefaults, ref, toRefs, computed, defineModel } from "vue";
import { ActionTypes, EventActions } from "@/types";

//TYPING
interface Item {
    action: ActionTypes;
    defaultValue: any;
    name: string;
    icon: string;
}

type Props = {
    title: string;
    actionType: EventActions;
    //TODO потом добавить возможность включать или исключать некоторые items
};

type Emits = {
    "update:actionType": [value: EventActions];
};

const props = withDefaults(defineProps<Props>(), {
    title: "Действие при клике",
});

const emit = defineEmits<Emits>();

const { title, actionType } = toRefs(props);
//END TYPING

const items = ref<Array<Item>>([
    {
        action: ActionTypes.none,
        defaultValue: "",
        name: "Ничего не делать",
        icon: "mdi-cancel",
    },
    {
        action: ActionTypes.openWindow,
        defaultValue: "",
        name: "Показать всплывающее окно",
        icon: "mdi-dock-window",
    },
    {
        action: ActionTypes.link,
        defaultValue: "/",
        name: "Перейти по ссылке",
        icon: "mdi-link-variant",
    },
    {
        action: ActionTypes.showSnackbar,
        defaultValue: "Заявка отправлена",
        name: "Показать снекбар",
        icon: "mdi-picture-in-picture-bottom-right",
    },
]);

const selectType = computed<ActionTypes>({
    get() {
        return Object.keys(actionType.value)[0] as ActionTypes;
    },
    set(value: ActionTypes) {
        const tmp = {
            [value]: items.value.find((el) => el.action === value)
                ?.defaultValue,
        } as EventActions;
        emit("update:actionType", tmp);
    },
});
const selectValue = computed<number | string | true>({
    get() {
        return Object.values(actionType.value)[0];
    },
    set(value: number | string | true) {
        const tmp = {
            [selectType.value]: value,
        } as EventActions;
        emit("update:actionType", tmp);
    },
});
</script>
<style lang="scss" scoped></style>
