<template>
    <div class="form-field-checkbox">
        <label class="form-field-checkbox-item">
            <input
                class="form-field-checkbox__input"
                type="checkbox"
                name="checkbox"
                data-check="checkbox"
                :data-checked="checkboxParams.selectDefault ? true : undefined"
                :checked="checkboxParams.selectDefault ? true : undefined"
            />
            <span class="form-field-checkbox__box"> <i></i> </span>
            <span class="form-field-checkbox__name" :for="id">
                {{
                    commonFieldParams.required
                        ? commonFieldParams.title + " *"
                        : commonFieldParams.title
                }}
            </span>
        </label>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import mixin from "./mixin";
import { FormManager } from "@/shared/services";
import { CheckboxFieldParams } from "@/types";
export default defineComponent({
    mixins: [mixin],
    computed: {
        checkboxParams(): CheckboxFieldParams {
            return FormManager.getFieldCheckboxParamsById(
                this.formParams,
                this.id
            );
        },
    },
});
</script>
