<template>
    <div class="block-container" :data-el-id="props.id">
        <block-header-area
            ref="blockHeaderAreaRef"
            v-if="props.blockHeaderIsEnabled"
            :block-header-id="blockHeaderId"
            :buffered-block-header-params="props.bufferedBlockHeaderParams"
            :block-header-bundle="props.blockHeaderBundle"
            :block-header-second-row-id="blockHeaderSecondRowId"
            :buffered-block-header-second-row-params="
                props.bufferedBlockHeaderSecondRowParams
            "
            :block-header-second-row-bundle="props.blockHeaderSecondRowBundle"
            :block-header-second-row-is-enabled="
                props.blockHeaderSecondRowIsEnabled
            "
            @update:buffered-block-header-params="
                emits('update:bufferedBlockHeaderParams', $event)
            "
            @update:buffered-block-header-second-row-params="
                emits('update:bufferedBlockHeaderSecondRowParams', $event)
            "
        />
        <div
            class="block-anchor"
            v-bind="
                blockCParams.anchor.enable
                    ? { id: blockCParams.anchor.value }
                    : {}
            "
        />
        <block-bg :baseBGParams="baseBGParams" />
        <block-main-area
            ref="blockMainAreaRef"
            v-model:bottom-spacer-height="bottomSpacerHeight"
            v-model:top-spacer-height="topSpacerHeight"
            :buffered-block-title-params="props.bufferedBlockTitleParams"
            :block-title-bundle="props.blockTitleBundle"
            :block-body-bundles="props.blockBodyBundles"
            :block-title-is-enabled="props.blockTitleIsEnabled"
            :buffered-block-body-params="props.bufferedBlockBodyParams"
            @update:buffered-block-title-params="
                emits('update:bufferedBlockTitleParams', $event)
            "
            @update:buffered-block-body-params="
                emits('update:bufferedBlockBodyParams', $event)
            "
        />
    </div>
</template>

<script setup lang="ts">
import blockMainArea from "./block-main-area/block-main-area.vue";
import blockHeaderArea from "./block-header-area/block-header-area.vue";
import blockBg from "./block-bg/block-bg.vue";
import {
    BaseBGParams,
    BlockBodyBundle,
    BlockBodyParams,
    BlockCParams,
    BlockHeaderParams,
    BlockTitleParams,
    ZoneBundle,
} from "@/types";
import { defineProps, defineEmits, computed } from "vue";
import { toRefs } from "vue";
import { ref } from "vue";
import { CriticalError } from "@/shared/services/error_service";
import { getUUID } from "@/shared/helpers";
type Props = {
    id: string;

    blockBodyBundles: Array<BlockBodyBundle>;
    blockCParams: BlockCParams;
    baseBGParams: BaseBGParams;
    blockTitleBundle: ZoneBundle | false;
    blockTitleIsEnabled: boolean;
    topSpacerHeight: number;
    bottomSpacerHeight: number;
    bufferedBlockTitleParams:
        | Omit<BlockTitleParams, "parentId" | "childrenIds">
        | false;
    bufferedBlockBodyParams: Omit<BlockBodyParams, "parentId" | "childrenIds">;

    bufferedBlockHeaderParams:
        | Omit<BlockHeaderParams, "parentId" | "childrenIds">
        | false;
    blockHeaderBundle: ZoneBundle | false;
    blockHeaderIsEnabled: boolean;

    bufferedBlockHeaderSecondRowParams:
        | Omit<BlockHeaderParams, "parentId" | "childrenIds">
        | false;
    blockHeaderSecondRowBundle: ZoneBundle | false;
    blockHeaderSecondRowIsEnabled: boolean;
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
    "update:bufferedBlockHeaderParams": [
        value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
    ];
    "update:bufferedBlockHeaderSecondRowParams": [
        value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
    ];
};
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const blockHeaderId = getUUID();
const blockHeaderSecondRowId = getUUID();
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
const { blockCParams } = toRefs(props);

const blockMainAreaRef = ref<typeof blockMainArea>();
const getBlockBodyBundles = (): Array<BlockBodyBundle> => {
    //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getBlockBodyBundles не найдено
    if (blockMainAreaRef.value)
        return blockMainAreaRef.value.getBlockBodyBundles();
    else
        throw new CriticalError({
            message: "Критическая ошибка при сборке пакета вкладки ",
        });
};
const getBlockTitleBundle = (): ZoneBundle | false => {
    //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getBlockTitleBundle не найдено
    if (blockMainAreaRef.value)
        return blockMainAreaRef.value.getBlockTitleBundle();
    else
        throw new CriticalError({
            message: "Критическая ошибка при сборке пакета заголовка блока ",
        });
};

const blockHeaderAreaRef = ref<typeof blockHeaderArea>();
const getBlockHeaderBundle = (): ZoneBundle | false => {
    //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getBlockTitleBundle не найдено
    if (blockHeaderAreaRef.value) {
        return blockHeaderAreaRef.value.getBlockHeaderBundle();
    } else
        throw new CriticalError({
            message: "Критическая ошибка при сборке пакета хедера блока ",
        });
};
const getBlockHeaderSecondRowBundle = (): ZoneBundle | false => {
    //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getBlockTitleBundle не найдено
    if (blockHeaderAreaRef.value)
        return blockHeaderAreaRef.value.getBlockHeaderSecondRowBundle();
    else
        throw new CriticalError({
            message:
                "Критическая ошибка при сборке пакета 2ой строки хедера блока ",
        });
};
defineExpose({
    getBlockBodyBundles,
    getBlockTitleBundle,
    getBlockHeaderBundle,
    getBlockHeaderSecondRowBundle,
});
</script>

<style scoped></style>
