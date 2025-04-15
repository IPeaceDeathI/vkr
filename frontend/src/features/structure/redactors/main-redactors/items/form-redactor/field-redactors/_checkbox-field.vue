<template>
    <v-row>
        <v-col>
            <v-switch label="Выбрано по умолчанию" v-model="selectDefault" />
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { FormManager } from "@/shared/services";
import { CheckboxFieldParams } from "@/types";
import { Props, Emits } from "./_props&emits";
import { computed, defineProps, defineEmits, toRefs } from "vue";

//typing
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

//form params
const { formParams, field_id } = toRefs(props);
const checkboxParams = computed<CheckboxFieldParams>(() => {
    return FormManager.getFieldCheckboxParamsById(
        formParams.value,
        field_id.value
    );
});

const selectDefault = computed<boolean>({
    get() {
        return checkboxParams.value.selectDefault;
    },
    set(value: boolean) {
        emit("onChange", { ...checkboxParams.value, selectDefault: value });
    },
});
</script>
<style lang="scss" scoped></style>
