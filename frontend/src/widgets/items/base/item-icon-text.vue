<template>
    <item-content>
        <div class="item-icon-text__wrapper" ref="wrp">
            <subitem-icon
                :id="id"
                :icon-params-without-type="params.icon"
                @update:icon-params-without-type="updateIcon"
            />
            <div class="item-icon-text__wrapper__text-wrapper">
                <div class="item-icon-text__wrapper__text-wrapper__text">
                    <subitem-text
                        :text-params="params.text"
                        :id="id"
                        @update:text-params="updateText"
                    />
                </div>
                <div
                    v-if="params.showDescription"
                    class="item-icon-text__wrapper__text-wrapper__description"
                >
                    <subitem-text
                        :text-params="params.description"
                        :id="id"
                        @update:text-params="updateDescription"
                    />
                </div>
            </div>
        </div>
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
import subitemIcon from "../sub_items/subitem-icon.vue";
import {
    ItemIconParams,
    ItemParams,
    ItemTextParams,
    ItemTypes,
    TextParams,
} from "@/types";
import { useItem } from "./useItem";
import { ItemIconTextParams } from "@/types/structure/items/IconText";
type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
const { id } = toRefs(props);
const params = shallowRef<ItemIconTextParams>(
    structuredClone(commonParamsToText(props.itemParams))
);
const { wrp, styles, getMeAsBundle } = useItem(params, id);

const updateIcon = (val: Pick<ItemIconParams, "styles" | "settings">) => {
    params.value.icon = val;
    triggerRef(params);
};
const updateText = (val: TextParams) => {
    params.value.text = val;
    triggerRef(params);
};
const updateDescription = (val: TextParams) => {
    params.value.description = val;
    triggerRef(params);
};

defineExpose({ getMeAsBundle });
//service
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToText(bundle: ItemParams): ItemIconTextParams {
    if (bundle.type === ItemTypes.iconText) {
        return bundle;
    } else throw "not Text";
}
</script>

<style scoped></style>
