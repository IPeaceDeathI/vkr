<template>
    <div
        class="zone card-c noks-row"
        :data-el-id="id"
        :data-zone-id="id"
        ref="zoneHTMLWrapper"
        :class="{
            'empty-children': itemLength < 1,
            horizontal: orientation === CardsOrientation.horizontal,
        }"
    >
        <zone-bg
            :class="{
                'bg-image': params.styles.background.type === ZoneBgTypes.image,
            }"
            v-if="params.styles.background.type !== ZoneBgTypes.none"
        >
        </zone-bg>
        <zone-shadow />
        <zone-border v-if="params.styles.border.enabled" />
        <!-- OPTIMIZATION доделать и не забыть про styles и ивенты в zone-controls-->
        <zone-controls
            :parentSelector="zoneHTMLWrapper"
            :zoneParams="params"
            @contrastColor="updateContrastColor"
            @update:zone-params="updateZoneParams"
            @applyStylesToAllZones="emit('applyStylesToAllZones', $event)"
            @on-clone="emit('onClone')"
            @on-delete="emit('onDelete')"
        />
        <!-- END OPTIMIZATION -->
        <items-list
            v-if="params.enableSecondColumn"
            :id="id"
            ref="secondItemListRef"
            :cols="cols ? cols[0] : cols"
            :items="cardBundle.secondItems ?? []"
            :zone-params="params"
            :isSecondList="true"
        />
        <items-list
            ref="itemListRef"
            :id="id"
            :zone-params="params"
            :items="cardBundle.items"
            :cols="cols ? cols[1] : cols"
            @updateItemLength="itemLength = $event"
        />
        <Teleport to="#styles-container">
            <component :is="'style'">
                {{ styles }}
            </component>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import {
    CardParams,
    CardsOrientation,
    ZoneBundle,
    ZoneTypes,
    ZoneBgTypes,
    ItemBundle,
    CommonZoneParams,
    ColumnParams,
    ContrastColor,
    CardStylesParams,
    ZoneStylesParams,
    BlockTitleParams,
} from "@/types";
import {
    shallowRef,
    defineProps,
    ref,
    onUnmounted,
    onMounted,
    toRefs,
    nextTick,
    triggerRef,
} from "vue";
import zoneShadow from "../_common/zone-shadow.vue";
import zoneBorder from "../_common/zone-border.vue";
import zoneBg from "../_common/zone-bg.vue";
import { zoneControls } from "@/features/structure";
import useZone from "../useZone";
import itemsList from "../items-list/items-list.vue";
import { useStore } from "@/app/providers";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";

type Props = {
    id: string;
    cols: Array<number | undefined>;
    orientation: CardsOrientation;
    cardBundle: ZoneBundle;
};
type Emits = {
    "update:card-bundle": [{ id: string; value: ZoneBundle }];
    applyStylesToAllZones: [value: ZoneStylesParams];
    onClone: [];
    onDelete: [];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { id, cardBundle } = toRefs(props);
function validZoneParams(
    zoneBundle: ZoneBundle
): Omit<CardParams, "parentId" | "childrenIds"> {
    //OPTIMIZATION удалить childrenid and parentId и убрать это приведение типов
    const params = zoneBundle.zoneParams;
    if (params.type === ZoneTypes.card) {
        return params as Omit<CardParams, "parentId" | "childrenIds">;
    }
    NotificationService.common().error({
        text: "Не удалось создать карточку",
    });
    throw "no card";
}
const params = shallowRef<Omit<CardParams, "parentId" | "childrenIds">>(
    validZoneParams(props.cardBundle)
);
const itemLength = ref<number>(props.cardBundle.items.length);
const itemListRef = ref<typeof itemsList>();
const secondItemListRef = ref<typeof itemsList>();

const { zoneHTMLWrapper, styles } = useZone(
    id,
    params,
    itemListRef,
    secondItemListRef
);

//STORE
const store = useStore();
onMounted(() => {
    store.state.structure.zones.cards.set(id.value, {
        setOrintation: (orientation: CardsOrientation) => {
            if (orientation === CardsOrientation.horizontal) {
                setHorizontalOrientation();
            } else {
                setVerticalOrientation();
            }
        },
    });
});
onUnmounted(() => {
    store.state.structure.zones.cards.delete(id.value);
});
//END STORE

const setHorizontalOrientation = function () {
    params.value.enableSecondColumn = true;
    //ждем отрисовки второго листа
    nextTick(() => {
        if (!itemListRef.value || !secondItemListRef.value) throw "error";
        const items: Array<{ id: string; bundle: ItemBundle }> =
            itemListRef.value.getItems();
        if (items.length < 1) return;
        secondItemListRef.value.setItems([items.shift()]);
        itemListRef.value.setItems(items);
    });
};

const setVerticalOrientation = function () {
    if (!itemListRef.value) throw "error";
    if (!secondItemListRef.value) return;
    const items: Array<{ id: string; bundle: ItemBundle }> =
        itemListRef.value.getItems();
    const secondItems: Array<{ id: string; bundle: ItemBundle }> =
        secondItemListRef.value.getItems();
    itemListRef.value.setItems(secondItems.concat(items));
    params.value.enableSecondColumn = false;
};

const updateZoneParams = function (
    value: Omit<
        BlockTitleParams | CardParams | ColumnParams,
        "parentId" | "childrenIds"
    >
) {
    const cardParams = value as CardParams;
    params.value = cardParams;
    triggerRef(params);
};

const updateContrastColor = function (value: ContrastColor) {
    params.value.styles.background.contrastColor = value;
    triggerRef(params);
};
</script>

<style scoped></style>
