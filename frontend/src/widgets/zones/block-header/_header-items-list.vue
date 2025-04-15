<template>
    <div class="header-items-list">
        <header-item-layout
            v-for="(item, index) in items"
            :id="item.id"
            :key="item.id"
            :item-bundle="item.bundle"
            @add="add(index, $event)"
            @remove="remove(index)"
            @shift-left="shiftLeft(index, $event)"
            @shift-right="shiftRight(index, $event)"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import headerItemLayout from "./_header-item-layout.vue";
import { ItemBundle, ItemTypes } from "@/types";
import { getUUID } from "@/shared/helpers";
import { gridWidth } from "@/shared/constants/default_values";
import { useStore } from "@/app/providers";
import { CriticalError } from "@/shared/services/error_service";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { ElementsFabric } from "@/shared/services/elements_fabrics";

const MIN_WIDTH_TO_PASTE = 250;

type Props = {
    items: Array<ItemBundle>;
};
const props = defineProps<Props>();

const store = useStore();

const items = ref<{ id: string; bundle: ItemBundle }[]>([]);

const getWidthByIndex = (index: number): number | "100%" | undefined => {
    const tmp = store.state.structure.items.itemsComponentOPTIM.get(
        items.value[index].id
    );
    if (!tmp) {
        throw new CriticalError({ message: "Ошибка получения итема" });
    }
    return tmp.getWidth();
};
const setWidthFromIndex = (
    index: number,
    width: number | "100%" | undefined
) => {
    if (index > items.value.length + 1) return;
    const tmp = store.state.structure.items.itemsComponentOPTIM.get(
        items.value[index].id
    );
    if (!tmp) {
        throw new CriticalError({ message: "Ошибка получения итема" });
    }
    return tmp.setWidth(width);
};
const setWidthFromId = (id: string, width: number | "100%" | undefined) => {
    const tmp = store.state.structure.items.itemsComponentOPTIM.get(id);
    if (!tmp) {
        throw new CriticalError({ message: "Ошибка получения итема" });
    }
    return tmp.setWidth(width);
};

onMounted(() => {
    //иногда items не успевает заполнится при создании компонента, пожтому заполняем при mount
    items.value = props.items.map((bundle) => {
        const id = getUUID();
        return { id, bundle };
    });
});

//BURGER ITEMS
watch(items, (items) => {
    store.state.structure.zones.headerItems.clear(); // очищаем стор зон, чтобы не было дублирования айтемов в зоне хедера при изменении items в хедере и в бургер-меню
    items.forEach((item) => {
        store.state.structure.zones.headerItems.set(item.id, item.bundle); // добавляем айтемы хедера в стору зон, чтобы проще взаимодействовать с ними из burger-header
    });
});
//END BURGER ITEMS

//BUNDLE
const getItemBundles = (): Array<ItemBundle> => {
    const itemsMap = store.state.structure.items.itemsComponentOPTIM;
    return items.value.map(({ id }) => {
        const tmp = itemsMap.get(id);
        if (!tmp) throw "error " + id;
        return tmp.getBundle();
    });
};
defineExpose({ getItemBundles });
//END BUNDLE

//ITEMS MANAGMENT
//при работе с итемами в хедере все работаем с "парой" итем + итем divider
const add = (index: number, bundle: ItemBundle) => {
    const dividerId = items.value[index].id;
    const dividerWidth = getWidthByIndex(index);
    const availableSpace =
        dividerWidth === "100%" ? gridWidth : dividerWidth ?? gridWidth;
    if (availableSpace < MIN_WIDTH_TO_PASTE) {
        NotificationService.common().info({
            delay: 4000,
            text: "(Временно) Не хватает места для вставки айтема. Раздвиньте divider пошире, если это возможно",
        });
        return;
    }
    const pasteIndex = index + 1;
    setWidthFromId(dividerId, 0); // обнуляем ширину текущего divider
    items.value = items.value.toSpliced(pasteIndex, 0, {
        id: getUUID(),
        bundle: {
            ...ElementsFabric.getItemsFabric()
                .getItem(ItemTypes.headerDivider)
                .getBundle(),
            width: availableSpace - MIN_WIDTH_TO_PASTE,
        },
    });
    items.value = items.value.toSpliced(pasteIndex, 0, {
        id: getUUID(),
        bundle: { ...bundle, width: MIN_WIDTH_TO_PASTE },
    });
};
const remove = (index: number) => {
    items.value = items.value.toSpliced(index - 1, 2); // index - 1 потому что, надо удалить айтем и divider, т.к. они всегда идут "парой"
    const currWidth = getWidthByIndex(items.value.length - 1);
    if (currWidth != "100%" && currWidth != undefined) {
        setWidthFromIndex(
            items.value.length - 1,
            currWidth + MIN_WIDTH_TO_PASTE
        );
    }
};
//END ITEMS MANAGMENT

//SHIFT
const canShift = (): boolean => {
    return items.value.length > 1;
};
const shiftLeft = (index: number, step: number) => {
    if (!canShift() || index === 0) return;
    const leftIndex = index - 1;
    const leftItemWidth = getWidthByIndex(leftIndex);
    const currentItemWidth = getWidthByIndex(index);
    if (
        leftItemWidth === "100%" ||
        leftItemWidth === undefined ||
        currentItemWidth === "100%" ||
        currentItemWidth === undefined
    )
        return;
    if (leftItemWidth > step) {
        setWidthFromIndex(leftIndex, leftItemWidth - step);
        setWidthFromIndex(index, currentItemWidth + step);
    } else if (leftItemWidth !== 0) {
        const width = leftItemWidth;
        setWidthFromIndex(leftIndex, 0);
        setWidthFromIndex(index, currentItemWidth + width);
        shiftLeft(index - 1, step - width);
    } else {
        shiftLeft(index - 1, step);
    }
};
const shiftRight = (index: number, step: number) => {
    if (!canShift() || index >= items.value.length - 1) return;
    const rightIndex = index + 1;
    const rightItemWidth = getWidthByIndex(rightIndex);
    const currentItemWidth = getWidthByIndex(index);
    if (
        rightItemWidth === "100%" ||
        rightItemWidth === undefined ||
        currentItemWidth === "100%" ||
        currentItemWidth === undefined
    )
        return;
    if (rightItemWidth > step) {
        setWidthFromIndex(rightIndex, rightItemWidth - step);
        setWidthFromIndex(currentItemWidth, currentItemWidth + step);
    } else if (rightItemWidth !== 0) {
        const width = rightItemWidth;
        setWidthFromIndex(rightIndex, 0);
        setWidthFromIndex(index, currentItemWidth + width);
        shiftRight(index + 1, step - width);
    } else {
        shiftRight(index + 1, step);
    }
};
//END SHIFT
</script>

<style scoped></style>
