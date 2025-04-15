<template>
    <div class="form-field-text">
        <input
            type="text"
            :id="id"
            name="text"
            class="form-field-text__input"
            :required="commonFieldParams.required"
            v-bind="attributes"
        />
        <desc-c :desc="commonFieldParams.description" />
        <title-c
            :fieldId="id"
            :title="commonFieldParams.title"
            :required="commonFieldParams.required"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import mixin from "./mixin";
import { FormManager } from "@/shared/services";
import { MaskType, PublishTargetAttributes } from "@/publish/target-attributes";
import { TextFieldParams } from "@/types";
export default defineComponent({
    mixins: [mixin],
    computed: {
        phoneParams(): TextFieldParams {
            return FormManager.getFieldTextParamsById(this.formParams, this.id);
        },
        attributes():
            | ""
            | {
                  "data-noks-mask": string;
                  "data-noks-mask-type": MaskType;
              } {
            if (this.phoneParams.mask.enabled)
                return {
                    [PublishTargetAttributes.mask]: this.phoneParams.mask.value,
                    [PublishTargetAttributes.maskType]: MaskType.regex,
                };
            return "";
        },
    },
});
</script>
