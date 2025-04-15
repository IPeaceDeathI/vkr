<template>
    <div class="form-field-select">
        <div class="select-outer">
            <select placeholder="" class="form-field-text__input" name="select">
                <option
                    v-for="(option, index) in selectParams.options"
                    :key="option"
                    :selected="index === 0 ? true : undefined"
                >
                    {{ option }}
                </option>
            </select>
        </div>
        <desc-c :desc="commonFieldParams.description" />
        <title-c
            :fieldId="id"
            :title="commonFieldParams.title"
            :required="false"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import mixin from "./mixin";
import { FormManager } from "@/shared/services";
import { SelectFieldParams } from "@/types";
export default defineComponent({
    mixins: [mixin],
    computed: {
        selectParams(): SelectFieldParams {
            return FormManager.getFieldSelectParamsById(
                this.formParams,
                this.id
            );
        },
    },
});
</script>
