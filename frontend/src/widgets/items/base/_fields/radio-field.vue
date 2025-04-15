<template>
    <div class="form-field-radio">
        <div class="form-field-radio-list">
            <label
                class="form-field-radio-item"
                v-for="(radio, index) in radioParams.radioBtn"
                :key="radio"
            >
                <input
                    type="radio"
                    class="form-field-radio-item__input"
                    name="radio"
                    :value="radio"
                    :data-checked="
                        index === radioParams.indexSelectedRadio ? true : false
                    "
                    :checked="
                        index === radioParams.indexSelectedRadio
                            ? true
                            : undefined
                    "
                />
                <span class="form-field-radio-item__check"></span>
                <span class="form-field-radio-item__text">{{ radio }}</span>
            </label>
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
import { RadioFieldParams } from "@/types";
export default defineComponent({
    mixins: [mixin],
    computed: {
        radioParams(): RadioFieldParams {
            return FormManager.getFieldRadioParamsById(
                this.formParams,
                this.id
            );
        },
    },
});
</script>
