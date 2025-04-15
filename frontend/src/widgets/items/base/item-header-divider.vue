<template>
    <item-content>
        <div class="header-divider" @click="dialogOpened = true">
            <v-icon size="x-small" icon="mdi-plus" />
        </div>
        <items-gallery
            :dialogOpened="dialogOpened"
            @select="addItem"
            @closeWithoutSelected="dialogOpened = false"
            @paste="emit('paste')"
        />
    </item-content>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>
<script setup lang="ts">
import { ref, shallowRef, toRefs, triggerRef } from "vue";
import itemContent from "./_item-content.vue";
import {
    ItemBundle,
    ItemHeaderDividerParams,
    ItemParams,
    ItemTypes,
} from "@/types";
import { itemsGallery } from "@/features/structure";
import { useItem } from "./useItem";
import { ElementsFabric } from "@/shared/services/elements_fabrics";
type Props = {
    itemParams: ItemParams;
    id: string;
};
const props = defineProps<Props>();
type Emits = {
    addItem: [bundle: ItemBundle];
    paste: []; //DEVELOP хз где вообще этот компонент используется у юзера, скорее всего в хедере (импортится в main-item-layout)
};
const emit = defineEmits<Emits>();
const { id } = toRefs(props);
const params = shallowRef<ItemHeaderDividerParams>(
    structuredClone(commonParamsToIcon(props.itemParams))
);
const { styles, getMeAsBundle } = useItem(params, id);
const dialogOpened = ref(false);
const addItem = (type: ItemTypes) => {
    dialogOpened.value = false;
    emit("addItem", ElementsFabric.getItemsFabric().getItem(type).getBundle());
};
const updateParams = (val: Omit<ItemHeaderDividerParams, "type">) => {
    params.value = { ...val, type: ItemTypes.headerDivider };
    triggerRef(params);
};

defineExpose({ getMeAsBundle });
//OPTIMIZATION вызывать errors service вместо throw
function commonParamsToIcon(bundle: ItemParams): ItemHeaderDividerParams {
    if (bundle.type === ItemTypes.headerDivider) {
        return bundle;
    } else throw "not icon";
}
</script>
<style lang="scss" scoped></style>
