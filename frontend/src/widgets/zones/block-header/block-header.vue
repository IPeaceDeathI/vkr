<template>
    <div
        class="block-header zone"
        :data-el-id="id"
        :data-zone-id="id"
        data-bg=""
        ref="zoneHTMLWrapper"
    >
        <header-items-list
            ref="itemListRef"
            :id="id"
            :items="blockHeaderBundle.items"
        />
    </div>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>
<script setup lang="ts">
import { ref, shallowRef, watch } from "vue";
import { BlockHeaderParams, ZoneBundle, ZoneTypes } from "@/types";
import headerItemsList from "./_header-items-list.vue";
import { CriticalError } from "@/shared/services/error_service";
import useZone from "../useZone";
import { toRefs } from "vue";
type Props = {
    id: string;
    blockHeaderParams:
        | Omit<BlockHeaderParams, "parentId" | "childrenIds">
        | false;
    blockHeaderBundle: ZoneBundle;
};
type Emits = {
    "update:blockHeaderParams": [
        value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
    ];
    "update:blockHeaderSecondRowParams": [
        value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
    ];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { id } = toRefs(props);
const params = shallowRef<Omit<BlockHeaderParams, "parentId" | "childrenIds">>(
    structuredClone(validZoneParms(props.blockHeaderBundle))
);
const itemListRef = ref<typeof headerItemsList>();

const { zoneHTMLWrapper, styles } = useZone(id, params, itemListRef);
watch(
    () => {
        return props.blockHeaderParams;
    },
    (newValue) => {
        if (newValue !== false) params.value = newValue;
    }
);
watch(
    params,
    (newValue) => {
        if (newValue.isSecondRow)
            emit("update:blockHeaderSecondRowParams", newValue);
        else emit("update:blockHeaderParams", newValue);
    },
    { immediate: true }
);

function validZoneParms(zoneBundle: ZoneBundle): BlockHeaderParams {
    //OPTIMIZATION удалить childrenid и parentId и убрать это приведение типов
    const params = zoneBundle.zoneParams as unknown as BlockHeaderParams;
    if (params.type === ZoneTypes.blockHeader) {
        return params;
    }
    //OPTIMIZATION вызывать сервис ошибок вместо throw
    throw new CriticalError({ message: "Ошибка при распаковке пакета" });
}
</script>
