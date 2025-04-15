<template>
    <item-content class="text">
        <nav class="menu-wrapper" ref="wrp">
            <ul class="item-menu-list">
                <li
                    v-for="item in params.items"
                    :key="JSON.stringify(item)"
                    class="menu-item-root"
                >
                    <template v-if="item.type === 'link'">
                        <a
                            class="menu-item-text"
                            :href="item.link"
                            :target="item.targetBlank ? '_blank' : undefined"
                        >
                            <span>{{ item.name }}</span>
                        </a>
                    </template>
                </li>
            </ul>
        </nav>
    </item-content>
    <redactor-overlay :itemId="id" v-slot="{ show, setShow }">
        <menu-redactor
            :parent-selector="wrp"
            :modelValue="show"
            :params="params"
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

<script setup lang="ts">
import { shallowRef, toRefs, triggerRef } from "vue";
import itemContent from "./_item-content.vue";
import { redactorOverlay } from "@/features/structure";
import { menuRedactor } from "@/features/structure";
import { ItemBundle, ItemMenuParams, ItemParams, ItemTypes } from "@/types";
import { useItem } from "./useItem";
type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
const { id } = toRefs(props);
const params = shallowRef<ItemMenuParams>(
    structuredClone(commonParamsToMenu(props.itemParams))
);
const { wrp, styles, getMeAsBundle } = useItem(params, id);

const updateParams = (val: ItemMenuParams) => {
    params.value = val;
    triggerRef(params);
};

defineExpose({ getMeAsBundle });
//service
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToMenu(bundle: ItemParams): ItemMenuParams {
    if (bundle.type === ItemTypes.menu) {
        return bundle;
    } else throw "not Menu";
}
</script>

<style scoped></style>
