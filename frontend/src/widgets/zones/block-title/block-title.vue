<template>
    <div
        class="zone block-title"
        :class="{ 'empty-children': itemLength < 1 }"
        :data-el-id="id"
        :data-zone-id="id"
        ref="zoneHTMLWrapper"
    >
        <zone-bg
            v-if="params.styles.background.type !== ZoneBgTypes.none"
            :class="{
                'bg-image': params.styles.background.type === ZoneBgTypes.image,
            }"
        />
        <zone-shadow />
        <zone-border v-if="params.styles.border.enabled" />
        <!-- OPTIMIZATION -->
        <!-- <block-title-controls :zone-id="id" :zone-params="params" /> -->
        <items-list
            ref="itemListRef"
            :id="id"
            :zone-params="params"
            :items="props.blockTitleBundle.items"
            @updateItemLength="itemLength = $event"
        ></items-list>
        <Teleport to="#styles-container">
            <component :is="'style'">
                {{ styles }}
            </component>
        </Teleport>
    </div>
</template>
<script setup lang="ts">
import { ref, shallowRef } from "vue";
import zoneBg from "../_common/zone-bg.vue";
import zoneShadow from "../_common/zone-shadow.vue";
import zoneBorder from "../_common/zone-border.vue";

import { blockTitleControls } from "@/features/structure";
import { toRefs } from "vue";
import { BlockTitleParams, ZoneBundle, ZoneTypes, ZoneBgTypes } from "@/types";
import useZone from "../useZone";
import itemsList from "../items-list/items-list.vue";
import { watch } from "vue";
import { CriticalError } from "@/shared/services/error_service";
type Props = {
    id: string;
    blockTitleBundle: ZoneBundle;
    blockTitleParams:
        | Omit<BlockTitleParams, "parentId" | "childrenIds">
        | false; // for watch and update inner params
};
type Emits = {
    "update:blockTitleParams": [
        value: Omit<BlockTitleParams, "parentId" | "childrenIds">
    ];
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { id } = toRefs(props);
const params = shallowRef<Omit<BlockTitleParams, "parentId" | "childrenIds">>(
    structuredClone(validZoneParms(props.blockTitleBundle))
);
const itemListRef = ref<typeof itemsList>();
const { zoneHTMLWrapper, styles } = useZone(id, params, itemListRef);

const itemLength = ref<number>(props.blockTitleBundle.items.length);
//END STATE
watch(
    () => {
        return props.blockTitleParams;
    },
    (newValue) => {
        if (newValue !== false) params.value = newValue;
    }
);
watch(
    params,
    (newValue) => {
        emit("update:blockTitleParams", newValue);
    },
    { immediate: true }
);
function validZoneParms(
    zoneBundle: ZoneBundle
): Omit<BlockTitleParams, "parentId" | "childrenIds"> {
    //OPTIMIZATION elfkbnm childrenid and parentId и убрать это приведение типов
    const params = zoneBundle.zoneParams as unknown as BlockTitleParams;
    if (params.type === ZoneTypes.blockTitle) {
        return params;
    }
    //OPTIMIZATION вызывать сервис ошибок вместо throw
    throw new CriticalError({ message: "Ошибка при распаковке пакета" });
}
</script>
