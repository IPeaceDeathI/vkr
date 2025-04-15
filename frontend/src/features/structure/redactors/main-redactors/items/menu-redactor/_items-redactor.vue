<template>
    <v-row>
        <v-col>
            <draggable
                v-model="draggableItems"
                group="form-radio"
                itemKey="id"
                handle="[noks-select-list-drag]"
                v-bind="dragOptions"
            >
                <template #item="{ element, index }">
                    <v-text-field
                        v-if="element.el.type === 'link'"
                        variant="solo"
                        :modelValue="element.el.name"
                        @update:modelValue="changeTextField(index, $event)"
                    >
                        <template v-slot:prepend-inner>
                            <v-icon noks-select-list-drag>mdi-drag</v-icon>
                        </template>
                        <template v-slot:append-inner>
                            <v-btn
                                variant="text"
                                size="x-small"
                                class="append-icon"
                                :color="
                                    element.el.link === '' ? 'error' : 'editor'
                                "
                                @click.stop="openItemRedactor(index)"
                                text="Настроить"
                            >
                                <template
                                    v-if="element.el.link === ''"
                                    v-slot:prepend
                                >
                                    <v-icon icon="mdi-alert-circle-outline" />
                                </template>
                            </v-btn>
                            <v-icon
                                v-if="modelValue.length > 1"
                                class="append-icon"
                                color="primary-darken-5"
                                icon="mdi-delete"
                                @click.stop="deleteItem(index)"
                            />
                        </template>
                    </v-text-field>
                    <div v-else-if="(element.el.type = 'drop')">drop</div>
                </template>
            </draggable>
            <menu-item-redactor
                v-model="itemRedactorIsOpen"
                v-model:itemParams="editedItem"
            />
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn
                prependIcon="mdi-plus"
                color="editor"
                variant="flat"
                block
                @click="addItem"
            >
                Добавить
            </v-btn>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { MenuItem, MenuItemLink } from "@/types";
import { defineProps, defineEmits, toRefs, shallowRef, computed } from "vue";
import draggable from "vuedraggable";
import menuItemRedactor from "./__menu-item-redactor.vue";
import { WarningError } from "@/shared/services/error_service/ErrorService";

//typing
type DraggableItem = { id: number; el: MenuItem };

type Props = {
    modelValue: Array<MenuItem>;
};

type Emits = {
    "update:modelValue": [value: Array<MenuItem>];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//modelValue item params
const { modelValue } = toRefs(props);

const draggableItems = computed<Array<DraggableItem>>({
    get() {
        return modelValue.value.map((el, index) => {
            return { id: index, el: el };
        });
    },
    set(value: Array<DraggableItem>) {
        emit(
            "update:modelValue",
            value.map((item) => item.el)
        );
    },
});

const editedItem = computed<MenuItemLink>({
    get() {
        const tmp = modelValue.value[editedIndex.value];
        if (tmp.type === "link") {
            return tmp;
        }
        throw new WarningError({
            bundle: "",
            message: "itemsredactor - edited item",
        });
    },
    set(value: MenuItemLink) {
        const newParams = structuredClone(modelValue.value);
        newParams[editedIndex.value] = value;
        emit("update:modelValue", newParams);
    },
});

const changeTextField = function (index: number, value: string) {
    const newParams = structuredClone(modelValue.value);
    newParams[index].name = value;
    emit("update:modelValue", newParams);
};

const openItemRedactor = function (index: number) {
    editedIndex.value = index;
    itemRedactorIsOpen.value = true;
};

const addItem = function () {
    emit("update:modelValue", [
        ...modelValue.value,
        { type: "link", name: "", link: "", targetBlank: false },
    ]);
};

const deleteItem = function (index: number) {
    const newParams = structuredClone(modelValue.value);
    emit(
        "update:modelValue",
        newParams.filter((el, i) => i !== index)
    );
};

//переменные для работы с template
const dragOptions = shallowRef({
    animation: 400,
    disabled: false,
    forceFallback: true,
    fallbackClass: "fallback-drag",
    fallbackTolerance: 10,
    scrollSensitivity: 200,
});
const itemRedactorIsOpen = shallowRef(false);
const editedIndex = shallowRef(0);
</script>
<style lang="scss" scoped>
[noks-select-list-drag] {
    cursor: pointer;
}
.append-icon {
    cursor: pointer;
    opacity: 0.4;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
        opacity: 1;
    }
    &.selected {
        cursor: default;
        opacity: 1;
    }
}
.fallback-drag {
    //TODOспросить у Дениса
}
</style>
