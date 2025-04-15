<template>
    <div class="block-body" :data-el-id="id" :data-block-body-id="id">
        <body-layout :zone-type="childZoneType" @add-zone="addZone($event)">
            <component
                ref="layoutRef"
                :is="layoutComponent"
                :zones="zones"
                :body-layout-params="params.BodyLayoutParams"
                @cloneZone="cloneZone"
                @deleteZone="removeZone"
                @update:zones="updateZones"
                @update:body-layout-params="updateParams"
            />
        </body-layout>
    </div>
    <Teleport to="#styles-container">
        <component :is="'style'">
            {{ styles }}
        </component>
    </Teleport>
</template>

<script setup lang="ts">
import bodyLayout from "./body-layout/body-layout.vue";
import cardsLayout from "./body-layout/layout/cards-layout.vue";
import columnsLayout from "./body-layout/layout/columns-layout.vue";
import {
    BlockBodyBundle,
    BlockBodyParams,
    BodyLayoutParams,
    BodyLayoutType,
    ZoneBundle,
    ZoneTypes,
} from "@/types";
import {
    shallowRef,
    defineProps,
    computed,
    ref,
    provide,
    toRefs,
    watch,
} from "vue";
import { getBlockBodyStyles } from "@/shared/services";
import { INumberOfZones } from "@/widgets/injectKeys";
import { getUUID } from "@/shared/helpers";
import { useStore } from "@/app/providers";
import { onMounted } from "vue";
import { onUnmounted } from "vue";
import { triggerRef } from "vue";
import { CriticalError } from "@/shared/services/error_service";
type Props = {
    id: string;
    blockBodyBundle: BlockBodyBundle;
    blockBodyParams: Omit<BlockBodyParams, "parentId" | "childrenIds">; // for watch and update inner params
};

const props = defineProps<Props>();
type Emits = {
    "update:blockBodyParams": [
        value: Omit<BlockBodyParams, "parentId" | "childrenIds">
    ];
};
const emit = defineEmits<Emits>();
const { id } = toRefs(props);
const params = shallowRef<Omit<BlockBodyParams, "parentId" | "childrenIds">>(
    structuredClone(props.blockBodyBundle.blockBodyParams)
);
const updateParams = (val: BodyLayoutParams) => {
    params.value.BodyLayoutParams = { ...val };
    triggerRef(params);
};
const updateZones = (value: { id: string; bundle: ZoneBundle }[]) => {
    zones.value = value;
};
watch(
    params,
    (newValue) => {
        emit("update:blockBodyParams", newValue);
    },
    { immediate: true }
);
watch(
    () => props.blockBodyParams,
    (newValue) => {
        params.value = newValue;
    }
);
const childZoneType = computed<ZoneTypes>(() => {
    return params.value.BodyLayoutParams.type === BodyLayoutType.cards
        ? ZoneTypes.card
        : ZoneTypes.column;
});
const zones = ref<{ id: string; bundle: ZoneBundle }[]>([]);
onMounted(() => {
    //иногда zones не успевает заполнится при создании компонента, поэтому заполняем при mount
    zones.value = props.blockBodyBundle.zones.map((bundle) => {
        return { id: getUUID(), bundle };
    });
    useStore().state.structure.blockBodies.blockBodiesComponentOPTIM.set(
        id.value,
        {
            getBundle: getMeAsBundle,
            setBundle: setMeFromBundle,
            pasteZone,
        }
    );
});
onUnmounted(() => {
    useStore().state.structure.blockBodies.blockBodiesComponentOPTIM.delete(
        id.value
    );
});
const numberOfBlocks = computed(() => zones.value.length);
provide(INumberOfZones, numberOfBlocks);
const addZone = (zoneBundle: ZoneBundle) => {
    if (
        params.value.BodyLayoutParams.type === BodyLayoutType.columns &&
        zones.value.length >= 6
    )
        return;
    zones.value.push({
        id: getUUID(),
        bundle: zoneBundle,
    });
};
const removeZone = (index: number) => {
    zones.value = zones.value.toSpliced(index, 1);
};
const cloneZone = ({
    index,
    bundle,
}: {
    index: number;
    bundle: ZoneBundle;
}) => {
    if (
        params.value.BodyLayoutParams.type === BodyLayoutType.columns &&
        zones.value.length >= 6
    )
        return;
    zones.value = zones.value.toSpliced(index, 0, { id: getUUID(), bundle });
};
const layoutComponent = computed<
    undefined | typeof cardsLayout | typeof columnsLayout
>(() => {
    switch (params.value.BodyLayoutParams.type) {
        case BodyLayoutType.cards:
            return cardsLayout;
        case BodyLayoutType.columns:
            return columnsLayout;
        default:
            return undefined;
    }
});
const styles = computed(() => {
    return getBlockBodyStyles({
        elementId: id.value,
        BlockBodyParams: params.value,
    });
});
const layoutRef = ref<any | undefined>();
const getMeAsBundle = function (): BlockBodyBundle {
    const bundle: BlockBodyBundle = {
        blockBodyParams: params.value,
        zones: collectZoneBundles(),
    };
    return bundle;
};
const setMeFromBundle = function (bundle: BlockBodyBundle): void {
    console.log(bundle);
};
const getZones = (): { id: string; bundle: ZoneBundle }[] => {
    const tmp = collectZoneBundles();
    return tmp.map((bundle, index) => {
        return { bundle, id: zones.value[index].id };
    });
};
const pasteZone = (bundle: ZoneBundle, index: number) => {
    zones.value = zones.value.toSpliced(index, 0, { id: getUUID(), bundle });
};
//OPTIMIZATION сделать подробнеую ошибку через WarningError, если getZoneBundles не найдено
const collectZoneBundles = (): Array<ZoneBundle> => {
    if (layoutRef.value) return layoutRef.value.getZoneBundles();
    else
        throw new CriticalError({
            message: "Критическая ошибка при сборке пакетов зон",
        });
};
</script>
