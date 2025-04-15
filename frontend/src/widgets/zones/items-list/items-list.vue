<template>
    <draggable
        class="items-list"
        :class="{
            'show-landing-strip': $store.getters['environment/itemIsDrag'],
        }"
        :data-cols="cols"
        :data-contrast="contrastAttr"
        :model-value="itemsDragg"
        group="items"
        itemKey="id"
        v-bind="dragOptions"
        :disabled="props.isSecondList"
        :handle="'.item-content,.item-overlay-editor'"
        filter=".add-btn-container"
        @start="$store.dispatch('environment/PUT_ITEM_IS_DRAG', undefined)"
        @end="endDrag"
    >
        <template #item="{ element, index }">
            <item-layout
                :key="element.id"
                :id="element.id"
                :item-params="element.bundle"
                :is-second-list="isSecondList"
                @remove="removeItem(index)"
                @clone="cloneItem(index)"
                @paste="pasteItem(index)"
                @copy="copyItem(index)"
                @add-item-above="addItem({ itemBundle: $event, index: index })"
                @add-item-below="
                    addItem({ itemBundle: $event, index: index + 1 })
                "
            />
        </template>
    </draggable>
    <!-- TODO ПОДУМАТЬ НАД ТЕМ, ЧТО БУДЕТ У КЛИЕНТА НА PUBLISH -->
    <template v-if="items.length < 1">
        <div class="empty-container">
            <add-item-button
                :side="AddButtonSides.center"
                :position="AddButtonPosition.absolute"
                @add-item="addItem({ itemBundle: $event, index: 0 })"
                @paste="pasteItem(-1)"
            />
        </div>
    </template>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, toRefs, withDefaults } from "vue";
import { computed } from "vue";
import { ContrastColor, ItemBundle, ZoneBgTypes, ZoneParams } from "@/types";
import { AddButtonSides, AddButtonPosition } from "@/shared/helpers/components";
import { addItemButton } from "@/features/structure";
import itemLayout from "./item-layout/item-layout.vue";
import { CriticalError, WarningError } from "@/shared/services/error_service";
import { getUUID } from "@/shared/helpers";
import { useStore } from "@/app/providers";
import { dragOptions } from "@/shared/config";
import draggable from "vuedraggable";
import { onUnmounted } from "vue";

type Props = {
    id: string;
    propChildren?: Array<string>;
    cols?: number;
    isSecondList?: boolean;
    items: Array<ItemBundle>;
    zoneParams: Omit<ZoneParams, "parentId" | "childrenIds">;
};
const props = withDefaults(defineProps<Props>(), { isSecondList: false });
type Emits = {
    updateItemLength: [value: number];
};
const emit = defineEmits<Emits>();
const { zoneParams } = toRefs(props);
const items = ref<{ id: string; bundle: ItemBundle }[]>([]);
const itemsDragg = computed<{ id: string; bundle: ItemBundle }[]>({
    get() {
        return items.value;
    },
    set(value) {
        items.value = value.map(({ id }) => {
            return {
                bundle: getItemBundleById(id),
                id,
            };
        });
    },
});
onMounted(() => {
    //иногда items не успевает заполнится при создании компонента, пожтому заполняем при mount
    items.value = props.items.map((bundle) => {
        return { id: getUUID(), bundle };
    });
    useStore().state.structure.zones.itemLists.set(props.id, {
        pasteItemFromBundle,
    });
});
onUnmounted(() => {
    useStore().state.structure.zones.itemLists.delete(props.id);
});
type DraggableEndEvent = {
    to: HTMLElement;
    from: HTMLElement;
    oldIndex: number;
    newIndex: number;
};
const endDrag = (event: DraggableEndEvent) => {
    const itemListsMap = useStore().state.structure.zones.itemLists;
    const fromZoneId = event.from
        .closest("[data-zone-id]")
        ?.getAttribute("data-zone-id");
    const toZoneId = event.to
        .closest("[data-zone-id]")
        ?.getAttribute("data-zone-id");
    if (!toZoneId || !fromZoneId)
        throw new CriticalError({
            message: "Не найден родитель с аттрибутом data-zone-id",
        });
    //если переместили внутри однов item list
    if (fromZoneId === toZoneId) {
        const tmp = [...items.value];
        tmp[event.oldIndex] = tmp[event.newIndex];
        tmp[event.newIndex] = items.value[event.oldIndex];
        items.value = tmp;
    } else {
        //если переместили в другую  item list
        const itemBundle = getItemBundleById(items.value[event.oldIndex].id);
        const newItem = itemListsMap.get(toZoneId);
        if (!newItem)
            throw new CriticalError({
                message: "не найдена зона с id " + toZoneId,
            });
        newItem.pasteItemFromBundle(itemBundle, event.newIndex);
        items.value = items.value.toSpliced(event.oldIndex, 1);
    }
    useStore().dispatch("environment/REMOVE_ITEM_IS_DRAG", undefined);
};
const getItemBundles = (): Array<ItemBundle> => {
    const itemsMap = useStore().state.structure.items.itemsComponentOPTIM;
    return items.value.map(({ id }) => {
        const tmp = itemsMap.get(id);
        if (!tmp) throw "error " + id;
        return tmp.getBundle();
    });
};
const getItemBundleById = (id: string): ItemBundle => {
    const itemsMap = useStore().state.structure.items.itemsComponentOPTIM;
    const tmp = itemsMap.get(id);
    if (!tmp) throw "error item" + id;
    return tmp.getBundle();
};
const getItems = (): { id: string; bundle: ItemBundle }[] => {
    const itemsMap = useStore().state.structure.items.itemsComponentOPTIM;
    return items.value.map(({ id }) => {
        const tmp = itemsMap.get(id);
        if (!tmp) throw "error " + id;
        return { id, bundle: tmp.getBundle() };
    });
};
const setItems = (value: { id: string; bundle: ItemBundle }[]) => {
    items.value = value;
};
defineExpose({ getItemBundles, getItems, setItems });
const contrastAttr = computed<string>(() => {
    const params = zoneParams.value;
    if (params.styles.background.type === ZoneBgTypes.none) return "";
    const contrColor = params.styles.background.contrastColor;
    return contrColor === ContrastColor.light ? "light" : "dark";
});

const addItem = ({
    itemBundle,
    index,
}: {
    itemBundle: ItemBundle;
    index: number;
}) => {
    items.value = items.value.toSpliced(index, 0, {
        id: getUUID(),
        bundle: itemBundle,
    });
};
//OPTIMIZATION
const removeItem = (index: number) => {
    items.value = items.value.toSpliced(index, 1);
};

const copyItem = async (index: number) => {
    const tmp = useStore().state.structure.items.itemsComponentOPTIM.get(
        items.value[index].id
    );
    if (!tmp) throw "error " + index;
    const bundle = tmp.getBundle();
    await navigator.clipboard.writeText(JSON.stringify(bundle)).catch((err) => {
        console.log("Ошибка копирования", err);
    });
};

const pasteItem = async (index: number) => {
    await navigator.clipboard
        .readText()
        .then((bundle) => {
            const parsedBundle: ItemBundle = JSON.parse(bundle);
            items.value.splice(index + 1, 0, {
                id: getUUID(),
                bundle: parsedBundle,
            });
        })
        .catch((err) => {
            new WarningError({
                notificationTitle: "Ошибка вставки",
                isNotification: true,
                bundle: err,
                message: "Ошибка вставки",
            });
        });
};
const pasteItemFromBundle = (bundle: ItemBundle, index: number) => {
    items.value.splice(index + 1, 0, {
        id: getUUID(),
        bundle: bundle,
    });
};
const cloneItem = (index: number) => {
    const tmp = useStore().state.structure.items.itemsComponentOPTIM.get(
        items.value[index].id
    );
    if (!tmp) throw "error " + index;
    const bundle = tmp.getBundle();
    items.value.splice(index + 1, 0, { id: getUUID(), bundle });
};
</script>

<style scoped></style>
