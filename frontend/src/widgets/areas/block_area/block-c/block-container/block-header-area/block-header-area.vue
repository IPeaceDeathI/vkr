<template>
    <!-- TODO добавить логигу, где скрывается не все меню -->
    <div
        class="block-header-area"
        :class="{
            'hide-in-mobile': !hasHeader,
        }"
    >
        <div class="block-header-wrapper">
            <KeepAlive>
                <block-header
                    v-if="props.blockHeaderBundle"
                    :id="props.blockHeaderId"
                    :block-header-params="props.bufferedBlockHeaderParams"
                    :block-header-bundle="props.blockHeaderBundle"
                    @update:block-header-params="
                        emit('update:bufferedBlockHeaderParams', $event)
                    "
                />
            </KeepAlive>
            <KeepAlive>
                <block-header
                    v-if="
                        props.blockHeaderSecondRowBundle &&
                        props.blockHeaderSecondRowIsEnabled
                    "
                    :id="props.blockHeaderSecondRowId"
                    :block-header-params="
                        props.bufferedBlockHeaderSecondRowParams
                    "
                    :block-header-bundle="props.blockHeaderSecondRowBundle"
                    @update:block-header-second-row-params="
                        emit(
                            'update:bufferedBlockHeaderSecondRowParams',
                            $event
                        )
                    "
                />
            </KeepAlive>
        </div>
    </div>
</template>
<script setup lang="ts">
import { BlockHeaderParams, ZoneBundle } from "@/types";
import blockHeader from "@/widgets/zones/block-header/block-header.vue";
import { CriticalError } from "@/shared/services/error_service";
import { KeepAlive, computed } from "vue";
import { useStore } from "vuex";
type Props = {
    blockHeaderId: string;
    bufferedBlockHeaderParams:
        | Omit<BlockHeaderParams, "parentId" | "childrenIds">
        | false;
    blockHeaderBundle: ZoneBundle | false;

    blockHeaderSecondRowId: string;
    bufferedBlockHeaderSecondRowParams:
        | Omit<BlockHeaderParams, "parentId" | "childrenIds">
        | false;
    blockHeaderSecondRowBundle: ZoneBundle | false;
    blockHeaderSecondRowIsEnabled: boolean;
};

type Emits = {
    "update:bufferedBlockHeaderParams": [
        value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
    ];
    "update:bufferedBlockHeaderSecondRowParams": [
        value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
    ];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const store = useStore();

const hasHeader = computed<boolean>(() => {
    return store.getters["structure/zones/getHeaders"]().length > 0;
});

const getBlockHeaderBundle = (): ZoneBundle | false => {
    if (props.blockHeaderBundle) {
        const tmp = store.state.structure.zones.zoneComponents.get(
            props.blockHeaderId
        );
        if (!tmp) {
            throw new CriticalError({
                message: "Критическая ошибка при сборке пакета хедера блока ",
            });
        }
        return tmp.getBundle();
    } else {
        return false;
    }
};

const getBlockHeaderSecondRowBundle = (): ZoneBundle | false => {
    if (
        props.blockHeaderSecondRowBundle &&
        props.blockHeaderSecondRowIsEnabled
    ) {
        const tmp = store.state.structure.zones.zoneComponents.get(
            props.blockHeaderSecondRowId
        );
        if (!tmp) {
            throw new CriticalError({
                message:
                    "Критическая ошибка при сборке пакета 2ой строки хедера блока ",
            });
        }
        return tmp.getBundle();
    } else {
        return false;
    }
};
defineExpose({ getBlockHeaderBundle, getBlockHeaderSecondRowBundle });
</script>
