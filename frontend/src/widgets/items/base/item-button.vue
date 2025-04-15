<template>
    <item-content class="text">
        <div ref="wrp">
            <subitem-button
                :text="params.text"
                :buttonStyles="params.styles"
                :buttonSettings="params.settings"
            />
        </div>
    </item-content>
    <redactor-overlay :itemId="id" v-slot="{ show, setShow }">
        <button-redactor
            :params="params"
            :model-value="show"
            @update:model-value="setShow"
            @onChange="updateParams"
            :parent-selector="wrp"
        />
    </redactor-overlay>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>

<script setup lang="ts">
import { useItem } from "./useItem";
import itemContent from "./_item-content.vue";
import { redactorOverlay } from "@/features/structure";
import { buttonRedactor } from "@/features/structure/redactors/main-redactors";
import { subitemButton } from "../sub_items";
import { ItemBundle, ItemButtonParams, ItemParams, ItemTypes } from "@/types";
import { shallowRef, toRefs, triggerRef } from "vue";
type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
const { id } = toRefs(props);
const params = shallowRef<ItemButtonParams>(
    structuredClone(commonParamsToButton(props.itemParams))
);
const { wrp, styles, getMeAsBundle } = useItem(params, id);

const updateParams = (val: ItemButtonParams) => {
    params.value = val;
    triggerRef(params);
};

//service
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToButton(bundle: ItemParams): ItemButtonParams {
    if (bundle.type === ItemTypes.button) {
        return bundle;
    } else throw "not button";
}

defineExpose({ getMeAsBundle });
</script>

<style scoped></style>
