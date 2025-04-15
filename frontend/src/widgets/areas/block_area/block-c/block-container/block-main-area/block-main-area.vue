<template>
    <div class="block-main-area">
        <block-spacer v-model="topSpacerHeight" side="top" />
        <!-- Для сохранения внутренних параметров при переключении v-if -->
        <KeepAlive>
            <block-title
                v-if="props.blockTitleBundle && props.blockTitleIsEnabled"
                :id="blockTitleId"
                :block-title-bundle="props.blockTitleBundle"
                :block-title-params="props.bufferedBlockTitleParams"
                @update:block-title-params="
                    emits('update:bufferedBlockTitleParams', $event)
                "
            />
        </KeepAlive>
        <block-body
            v-for="bodyElement in blockBodies"
            :key="bodyElement.id"
            :id="bodyElement.id"
            :block-body-bundle="bodyElement.bundle"
            :block-body-params="props.bufferedBlockBodyParams"
            @update:block-body-params="
                emits('update:bufferedBlockBodyParams', $event)
            "
        />
        <block-spacer side="bottom" v-model="bottomSpacerHeight" />
    </div>
</template>

<script setup lang="ts">
import {
    BlockBodyBundle,
    ZoneBundle,
    BlockTitleParams,
    BlockBodyParams,
} from "@/types";
import blockBody from "./block-body/block-body.vue";
import blockSpacer from "./block-spacer/block-spacer.vue";
import { defineProps, defineEmits, computed, ref, onMounted } from "vue";
import blockTitle from "@/widgets/zones/block-title/block-title.vue";
import { getUUID } from "@/shared/helpers";
import { useStore } from "@/app/providers";
import { boolean } from "zod";
import { CriticalError } from "@/shared/services/error_service";
type Props = {
    blockBodyBundles: BlockBodyBundle[];
    bufferedBlockBodyParams: Omit<BlockBodyParams, "parentId" | "childrenIds">;
    topSpacerHeight: number;
    blockTitleBundle: ZoneBundle | false;
    blockTitleIsEnabled: boolean;
    bufferedBlockTitleParams:
        | Omit<BlockTitleParams, "parentId" | "childrenIds">
        | false;
    bottomSpacerHeight: number;
};
type Emits = {
    "update:topSpacerHeight": [height: number];
    "update:bottomSpacerHeight": [height: number];
    "update:bufferedBlockTitleParams": [
        value: Omit<BlockTitleParams, "parentId" | "childrenIds">
    ];
    "update:bufferedBlockBodyParams": [
        value: Omit<BlockBodyParams, "parentId" | "childrenIds">
    ];
};
const emits = defineEmits<Emits>();

const props = defineProps<Props>();
const blockBodies = ref<{ id: string; bundle: BlockBodyBundle }[]>([]);
onMounted(() => {
    //иногда blockBodies не успевает заполнится при создании компонента, поэтому заполняем при mount
    blockBodies.value = props.blockBodyBundles.map((bundle) => {
        return { id: getUUID(), bundle };
    });
});

const store = useStore();
const blockTitleId = getUUID();
const getBlockBodyBundles = (): Array<BlockBodyBundle> => {
    const bodiesMap =
        useStore().state.structure.blockBodies.blockBodiesComponentOPTIM;
    return blockBodies.value.map(({ id }) => {
        const tmp = bodiesMap.get(id);
        if (!tmp)
            throw new CriticalError({
                message: "Критическая ошибка при сборке пакета вкладки " + id,
            });
        return tmp.getBundle();
    });
};
const getBlockTitleBundle = (): ZoneBundle | false => {
    if (props.blockTitleBundle && props.blockTitleIsEnabled) {
        const tmp =
            store.state.structure.zones.zoneComponents.get(blockTitleId);
        if (!tmp) {
            throw new CriticalError({
                message:
                    "Критическая ошибка при сборке пакета заголовка блока ",
            });
        }
        return tmp.getBundle();
    } else {
        return false;
    }
};
defineExpose({ getBlockBodyBundles, getBlockTitleBundle });
const topSpacerHeight = computed<number>({
    get() {
        return props.topSpacerHeight;
    },
    set(height) {
        emits("update:topSpacerHeight", height);
    },
});
const bottomSpacerHeight = computed<number>({
    get() {
        return props.bottomSpacerHeight;
    },
    set(height) {
        emits("update:bottomSpacerHeight", height);
    },
});
</script>

<style scoped></style>
