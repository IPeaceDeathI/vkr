<template>
    <div class="form-field-text">
        <input
            type="tel"
            :id="id"
            name="phone"
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
import { PhoneFieldParams } from "@/types";
export default defineComponent({
    mixins: [mixin],
    computed: {
        phoneParams(): PhoneFieldParams {
            return FormManager.getFieldPhoneParamsById(
                this.formParams,
                this.id
            );
        },
        attributes():
            | ""
            | {
                  "data-noks-mask": string;
                  "data-noks-mask-type": MaskType;
              } {
            const mask = this.phoneParams.mask.useCustomMask
                ? this.phoneParams.mask.customMask
                : this.phoneParams.mask.baseMask;
            const maskType = this.phoneParams.mask.useCustomMask
                ? MaskType.regex
                : MaskType.phone;
            if (this.phoneParams.mask.enabled)
                return {
                    [PublishTargetAttributes.mask]: mask,
                    [PublishTargetAttributes.maskType]: maskType,
                };
            return "";
        },
    },
});
</script>
