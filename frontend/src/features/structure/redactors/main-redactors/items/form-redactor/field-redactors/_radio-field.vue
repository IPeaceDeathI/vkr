<template>
    <v-row>
        <v-col>
            <redactor-component-title>Вариант</redactor-component-title>
            <draggable
                v-model="radioDragBtns"
                group="form-radio"
                itemKey="id"
                handle="[noks-select-list-drag]"
                v-bind="dragOptions"
            >
                <template #item="{ index }">
                    <v-text-field
                        variant="solo"
                        :model-value="radioBtns[index]"
                        @update:model-value="setRadioValue(index, $event)"
                    >
                        <template v-slot:prepend-inner>
                            <v-icon noks-select-list-drag>mdi-drag</v-icon>
                        </template>
                        <template v-slot:append-inner>
                            <v-icon
                                class="append-icon"
                                :class="{
                                    selected: index === indexSelectedRadio,
                                }"
                                color="primary-darken-5"
                                icon="mdi-check-bold"
                                @click.stop="selectRadio(index)"
                            />
                            <v-icon
                                v-if="radioBtns.length > 1"
                                class="append-icon"
                                color="primary-darken-5"
                                icon="mdi-delete"
                                @click.stop="deleteRadio(index)"
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
                @click="addRadio"
            >
                Добавить вариант
            </v-btn>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { Props, Emits } from "./_props&emits";
import { defineProps, defineEmits, computed, toRefs } from "vue";
import { RadioFieldParams } from "@/types";
import draggable from "vuedraggable";
import { FormManager } from "@/shared/services";
import { watch } from "vue";

//typing
type DraggableItem = {
    id: number;
    name: string;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//radio params
const { formParams, field_id } = toRefs(props);

const radioParams = computed<RadioFieldParams>(() => {
    return FormManager.getFieldRadioParamsById(
        formParams.value,
        field_id.value
    );
});

const radioDragBtns = computed<Array<DraggableItem>>({
    get() {
        return radioParams.value.radioBtn.map((el, index) => {
            return { id: index, name: el };
        });
    },
    set(value: Array<DraggableItem>) {
        emit("onChange", {
            ...radioParams.value,
            radioBtn: value.map((el) => el.name),
        });
    },
});

const indexSelectedRadio = computed<number>({
    get() {
        return radioParams.value.indexSelectedRadio;
    },
    set(value: number) {
        emit("onChange", { ...radioParams.value, indexSelectedRadio: value });
    },
});

const radioBtns = computed<Array<string>>(() => {
    return radioParams.value.radioBtn;
});

//Блок для удаления/добавления/выбора radioBtns
const selectRadio = function (index: number) {
    if (indexSelectedRadio.value !== index) {
        emit("onChange", { ...radioParams.value, indexSelectedRadio: index });
    }
};
const setRadioValue = function (index: number, value: string) {
    const tmpRadioBtns = [...radioBtns.value];
    tmpRadioBtns[index] = value;
    emit("onChange", {
        ...radioParams.value,
        radioBtn: tmpRadioBtns,
    });
};
const deleteRadio = function (index: number) {
    const tmpRadioBtns = [...radioBtns.value];
    tmpRadioBtns.splice(index, 1);
    emit("onChange", {
        ...radioParams.value,
        radioBtn: tmpRadioBtns,
    });
    if (indexSelectedRadio.value === radioBtns.value.length) {
        emit("onChange", {
            ...radioParams.value,
            indexSelectedRadio: radioBtns.value.length - 1,
        });
    }
};

const addRadio = function () {
    const tmpRadioBtns = [...radioBtns.value];
    tmpRadioBtns.push("");
    emit("onChange", {
        ...radioParams.value,
        radioBtn: tmpRadioBtns,
    });
};

watch(
    radioBtns,
    (newValue, oldValue) => {
        if (newValue !== oldValue) {
            emit("onChange", { ...radioParams.value, radioBtn: newValue });
        }
    },
    { deep: true }
);

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
    &.selected {
        cursor: default;
        opacity: 1;
    }
}
.fallback-drag {
    //TODO спросить у Дениса
}
</style>
