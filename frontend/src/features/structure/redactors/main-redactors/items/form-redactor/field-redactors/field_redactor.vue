<template>
    <redactor-toolbar :title="name" @close-click="emit('onClose', true)" />
    <v-redactor-container>
        <v-row>
            <v-col>
                <redactor-component-title
                    hint="Отображается в заявке как заголовок поля"
                >
                    Название поля
                </redactor-component-title>
                <v-text-field v-model="title" autofocus />
            </v-col>
        </v-row>
        <v-row v-if="hasDescription">
            <v-col>
                <redactor-component-title
                    hint="Будет отображаться под хаголовком поля"
                >
                    Описание поля
                </redactor-component-title>
                <v-text-field v-model="desc" />
            </v-col>
        </v-row>
        <v-row v-if="hasRequired">
            <v-col>
                <v-switch label="Обязательное поле" v-model="required" />
            </v-col>
        </v-row>
        <component
            :is="insideComponent"
            :field_id="field_id"
            :formParams="formParams"
            @onChange="emit('onChange', { value: $event, id: field_id })"
        />
        <v-row>
            <v-col>
                <v-btn
                    variant="flat"
                    color="editor"
                    block
                    @click="emit('onClose', true)"
                >
                    Готово
                </v-btn>
            </v-col>
        </v-row>
    </v-redactor-container>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed, toRefs } from "vue";
import { CommonFieldsParams, FieldTypes, ItemFormParams } from "@/types";
import { FormManager } from "@/shared/services";
import { FieldsFabric } from "@/shared/services/elements_fabrics/items_fabric/items/FieldsFabric";
import { redactorToolbar } from "@/features/structure/redactors/reusable-components";
import textField from "./_text-field.vue";
import textFieldRex from "./_text-field-rex.vue";
import phoneField from "./_phone-field.vue";
import sliderField from "./_slider-field.vue";
import checkboxField from "./_checkbox-field.vue";
import radioField from "./_radio-field.vue";
import selectField from "./_select-field.vue";

//typing
const fieldTypeToComponent = {
    [FieldTypes.name]: textField,
    [FieldTypes.text]: textFieldRex,
    [FieldTypes.email]: textField,
    [FieldTypes.phone]: phoneField,
    [FieldTypes.slider]: sliderField,
    [FieldTypes.checkbox]: checkboxField,
    [FieldTypes.radio]: radioField,
    [FieldTypes.select]: selectField,
};
const isNotRequiredField = [
    FieldTypes.radio,
    FieldTypes.slider,
    FieldTypes.select,
];

type Props = {
    field_id: string;
    formParams: ItemFormParams;
};

type Emits = {
    onChange: [{ value: CommonFieldsParams; id: string }];
    onClose: [value: boolean];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//select params
const { formParams, field_id } = toRefs(props);

const commonParams = computed<CommonFieldsParams>(() => {
    return FormManager.getCommonFieldParamsById(
        formParams.value,
        field_id.value
    );
});
const title = computed<string>({
    get() {
        return commonParams.value.title;
    },
    set(value: string): void {
        emit("onChange", {
            value: { ...commonParams.value, title: value },
            id: field_id.value,
        });
    },
});

const desc = computed<string>({
    get() {
        return commonParams.value.description;
    },
    set(value: string): void {
        emit("onChange", {
            value: { ...commonParams.value, description: value },
            id: field_id.value,
        });
    },
});

const required = computed<boolean>({
    get() {
        return commonParams.value.required;
    },
    set(value: boolean): void {
        emit("onChange", {
            value: { ...commonParams.value, required: value },
            id: field_id.value,
        });
    },
});

const hasDescription = computed<boolean>(() => {
    return commonParams.value.type === FieldTypes.checkbox ? false : true;
});

const hasRequired = computed<boolean>(() => {
    return !isNotRequiredField.includes(commonParams.value.type);
});

const name = computed<string>(() => {
    return FieldsFabric[commonParams.value.type].name;
});

const insideComponent = computed<any>(() => {
    return fieldTypeToComponent[commonParams.value.type];
});
</script>
<style lang="scss" scoped></style>
