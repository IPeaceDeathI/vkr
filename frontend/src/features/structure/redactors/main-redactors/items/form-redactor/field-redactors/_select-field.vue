<template>
    <v-row>
        <v-col>
            <redactor-component-title>Вариант</redactor-component-title>
            <draggable
                v-model="selectDragOptions"
                group="form-radio"
                itemKey="id"
                handle="[noks-select-list-drag]"
                v-bind="dragOptions"
            >
                <template #item="{ index }">
                    <v-text-field
                        variant="solo"
                        :model-value="selectOptions[index]"
                        @update:model-value="setOptionValue(index, $event)"
                    >
                        <template v-slot:prepend-inner>
                            <v-icon noks-select-list-drag>mdi-drag</v-icon>
                        </template>
                        <template v-slot:append-inner>
                            <v-icon
                                v-if="selectOptions.length > 1"
                                class="append-icon"
                                color="primary-darken-5"
                                icon="mdi-delete"
                                @click.stop="deleteSelect(index)"
                            />
                        </template>
                    </v-text-field>
                </template>
            </draggable>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-btn
                prependIcon="mdi-plus"
                color="editor"
                variant="outlined"
                block
                @click="addSelect"
            >
                Добавить вариант
            </v-btn>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { Props, Emits } from "./_props&emits";
import { defineProps, defineEmits, computed, toRefs } from "vue";
import { SelectFieldParams } from "@/types";
import draggable from "vuedraggable";
import { FormManager } from "@/shared/services";

//typing
type DraggableItem = {
    id: number;
    name: string;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//select params
const { formParams, field_id } = toRefs(props);

const selectParams = computed<SelectFieldParams>(() => {
    return FormManager.getFieldSelectParamsById(
        formParams.value,
        field_id.value
    );
});

const selectDragOptions = computed<Array<DraggableItem>>({
    get() {
        return selectParams.value.options.map((el, index) => {
            return { id: index, name: el };
        });
    },
    set(value: Array<DraggableItem>) {
        emit("onChange", {
            ...selectParams.value,
            options: value.map((el) => el.name),
        });
    },
});

const selectOptions = computed<Array<string>>(() => {
    return selectParams.value.options;
});

//Блок для удаления/добавления/выбора select

const addSelect = function () {
    const tmpSelectOptions = [...selectOptions.value];
    tmpSelectOptions.push("");
    emit("onChange", {
        ...selectParams.value,
        options: tmpSelectOptions,
    });
};

const setOptionValue = function (index: number, value: string) {
    const tmpSelectOptions = [...selectOptions.value];
    tmpSelectOptions[index] = value;
    emit("onChange", { ...selectParams.value, options: tmpSelectOptions });
};

const deleteSelect = function (index: number) {
    const tmpRadioBtns = [...selectOptions.value];
    tmpRadioBtns.splice(index, 1);
    emit("onChange", {
        ...selectParams.value,
        options: tmpRadioBtns,
    });
};

//объект для библиотеки draggable
const dragOptions = {
    animation: 400,
    disabled: false,
    forceFallback: true,
    fallbackClass: "fallback-drag",
    fallbackTolerance: 10,
    scrollSensitivity: 200,
};
</script>
<style lang="scss" scoped>
[noks-select-list-drag] {
    cursor: pointer;
}
.append-icon {
    cursor: pointer;
    opacity: 0.4;
    &:hover {
        opacity: 1;
    }
}
</style>
