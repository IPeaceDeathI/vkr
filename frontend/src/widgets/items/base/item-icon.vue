<template>
    <item-content>
        <subitem-icon
            :id="id"
            :icon-params-without-type="params"
            @update:icon-params-without-type="updateParams"
        />
    </item-content>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>

<script setup lang="ts">
import { useItem } from "./useItem";
import itemContent from "./_item-content.vue";
import { shallowRef, toRefs, triggerRef } from "vue";
import { ItemIconParams, ItemParams, ItemTypes } from "@/types";
import SubitemIcon from "../sub_items/subitem-icon.vue";
type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
const { id } = toRefs(props);
const params = shallowRef<ItemIconParams>(
    structuredClone(commonParamsToIcon(props.itemParams))
);
const { styles, getMeAsBundle } = useItem(params, id);

const updateParams = (val: Pick<ItemIconParams, "styles" | "settings">) => {
    params.value = {
        ...val,
        type: ItemTypes.icon,
        paddings: params.value.paddings,
        visibility: params.value.visibility,
        width: params.value.width,
    };
    triggerRef(params);
};

defineExpose({ getMeAsBundle });
//service
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToIcon(bundle: ItemParams): ItemIconParams {
    if (bundle.type === ItemTypes.icon) {
        return bundle;
    } else throw "not icon";
}
</script>

<style scoped></style>
