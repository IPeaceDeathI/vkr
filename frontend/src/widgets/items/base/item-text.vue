<template>
    <item-content :class="params.textParams.textType" class="text-wrapper">
        <subitem-text
            :text-params="params.textParams"
            :id="id"
            @update:text-params="updateParams"
        />
    </item-content>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>

<script setup lang="ts">
import { shallowRef, toRefs, triggerRef } from "vue";
import itemContent from "./_item-content.vue";
import subitemText from "../sub_items/subitem-text.vue";
import { ItemParams, ItemTextParams, ItemTypes, TextParams } from "@/types";
import { useItem } from "./useItem";
type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
const { id } = toRefs(props);
const params = shallowRef<ItemTextParams>(
    structuredClone(commonParamsToText(props.itemParams))
);
const { styles, getMeAsBundle } = useItem(params, id);

const updateParams = (val: TextParams) => {
    params.value.textParams = val;
    triggerRef(params);
};

defineExpose({ getMeAsBundle });
//service
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToText(bundle: ItemParams): ItemTextParams {
    if (bundle.type === ItemTypes.text) {
        return bundle;
    } else throw "not Text";
}
</script>

<style scoped></style>
