<template>
    <item-content>
        <form
            class="item-form component-form"
            :class="params.inputsStyle"
            v-bind="attributes"
            ref="wrp"
        >
            <div
                class="form-fields-container form-fields"
                :class="`cols-${params.fieldsGrid[0].length}`"
            >
                <template v-for="fieldRow in params.fieldsGrid" :key="fieldRow">
                    <template v-for="field in fieldRow" :key="field">
                        <div
                            class="field-container form-field"
                            :class="{ empty: field === false }"
                        >
                            <component
                                v-if="field !== false"
                                :is="typeById(field)"
                                :id="field"
                                :formParams="params"
                            />
                            <div class="error">
                                <span class="error-text" />
                            </div>
                        </div>
                    </template>
                </template>
            </div>
            <div class="form-submit item-button" :class="buttonPosition">
                <subitem-button
                    :text="params.buttonText"
                    :buttonStyles="params.buttonStyles"
                />
            </div>
        </form>
    </item-content>
    <redactor-overlay :itemId="id" v-slot="{ show, setShow }">
        <form-redactor
            :parent-selector="wrp"
            :formParams="params"
            :modelValue="show"
            @update:modelValue="setShow"
            @onChange="updateParams"
        />
    </redactor-overlay>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>
<script lang="ts">
import {
    textField,
    nameField,
    emailField,
    phoneField,
    sliderField,
    checkboxField,
    radioField,
    selectField,
} from "./_fields";
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        textField,
        nameField,
        emailField,
        phoneField,
        sliderField,
        checkboxField,
        radioField,
        selectField,
    },
});
</script>
<script setup lang="ts">
import { computed, shallowRef, toRefs, triggerRef } from "vue";
import itemContent from "./_item-content.vue";
import { redactorOverlay } from "@/features/structure";
import { formRedactor } from "@/features/structure";
import { subitemButton } from "../sub_items";

import {
    ActionTypes,
    FieldTypes,
    FlexDirection,
    ItemBundle,
    ItemFormParams,
    ItemParams,
    ItemTypes,
} from "@/types";

import { useItem } from "./useItem";
import { PublishTargetAttributes } from "@/publish";
import { collectMetricsAttr } from "@/shared/services/metric";
import { CriticalError } from "@/shared/services/error_service";
type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
const { id } = toRefs(props);
const params = shallowRef<ItemFormParams>(
    structuredClone(commonParamsToForm(props.itemParams))
);
const { wrp, styles, getMeAsBundle } = useItem(params, id);

const updateParams = (val: ItemFormParams) => {
    params.value = { ...val };
    triggerRef(params);
};
const buttonPosition = computed<"" | "on-top" | "on-right" | "on-left">(() => {
    if (params.value.flexDirection === FlexDirection.columnR) {
        return "on-top";
    } else if (params.value.flexDirection == FlexDirection.row) {
        return "on-right";
    } else if (params.value.flexDirection == FlexDirection.rowR) {
        return "on-left";
    } else return "";
});
const attributes = computed<{
    [PublishTargetAttributes.form]: string;
    [PublishTargetAttributes.actionType]: ActionTypes;
    [PublishTargetAttributes.eventType]: string;
    [PublishTargetAttributes.actionValue]: any;
}>(() => {
    const event = params.value.settings.events[0];
    const actionType = Object.keys(event.afterFormSend)[0] as ActionTypes;

    const { formName: _, ...goals } = params.value.settings.goals;
    return {
        [PublishTargetAttributes.actionType]: actionType,
        [PublishTargetAttributes.eventType]: Object.keys(event)[0],
        [PublishTargetAttributes.form]: params.value.settings.goals.formName,
        [PublishTargetAttributes.actionValue]:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            event.afterFormSend[actionType],
        ...collectMetricsAttr(goals, PublishTargetAttributes.metricsSend),
    };
});
const typeById = (id: string): FieldTypes => {
    const field = params.value.fields[id];
    if (field === undefined) {
        //OPTIMIZATION придумать бандл
        throw new CriticalError({
            bundle: "",
            message: `field with id ${id} is not undefined`,
            targetId: id,
        });
    }
    return field.type;
};
//service
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToForm(bundle: ItemParams): ItemFormParams {
    if (bundle.type === ItemTypes.form) {
        return bundle;
    } else throw "not Form";
}

defineExpose({ getMeAsBundle });
</script>

<style scoped></style>
