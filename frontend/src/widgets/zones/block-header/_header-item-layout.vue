<template>
    <main-item-layout
        ref="mainItemLayoutRef"
        :id="props.id"
        :params="props.itemBundle"
        class="header-item"
        :class="{ 'disable-pointer-events': isDraggable }"
        @add-item="$emit('add', $event)"
    >
        <template v-slot:overlay-editor="{ selected, setSelected }">
            <item-overlay-editor :show="!selected" @click="setSelected(true)" />
        </template>
        <template v-slot:isSelected>
            <template v-if="$store.getters['environment/isDesktopViewport']">
                <sideHandle
                    side="l"
                    v-on-drag="{
                        onInput: onInputL,
                        onStop: onStop,
                        onStart: onStart,
                    }"
                />
                <sideHandle
                    side="r"
                    v-on-drag="{
                        onInput: onInputR,
                        onStop: onStop,
                        onStart: onStart,
                    }"
                />
                <sideHandle
                    side="r"
                    v-on-drag="{
                        onInput: onInputR,
                        onStop: onStop,
                        onStart: onStart,
                    }"
                />
                <sideHandle
                    v-if="hasPercPaddingBottom"
                    side="b"
                    v-on-drag="{
                        onInput: onInputB,
                        onStop: onStop,
                        onStart: onStart,
                    }"
                />
            </template>
        </template>
        <template v-slot:controls="{ selected }">
            <!-- TODO вынести в отдельный компонент -->
            <v-item-menu-toolbar
                v-if="!isDivider"
                class="item-controls item-menu header-item-menu"
                v-show="selected"
            >
                <v-toolbar-items-small>
                    <v-btn class="item-overlay-editor" @click="removeItem">
                        <v-icon>mdi-delete</v-icon>
                        <v-tooltip>Удалить</v-tooltip>
                    </v-btn>
                </v-toolbar-items-small>
            </v-item-menu-toolbar>
        </template>
    </main-item-layout>
</template>
<script setup lang="ts">
import { defineComponent, PropType, provide } from "vue";
import mainItemLayout from "../items-list/item-layout/main-item-layout.vue";
import { itemOverlayEditor } from "@/features/structure";
import { sideHandle } from "@/shared/ui";
import { Сoordinates } from "@/app";
import {
    DesktopSidesPadding,
    ItemBundle,
    ItemTypes,
    MobileSidesPadding,
} from "@/types";
import { ItemTypesWithPercPaddingB } from "@/shared/services/elements_fabrics/items_fabric/ItemsFabric";
import { ref } from "vue";
import { computed } from "vue";
import {
    IDesktopSidesPadding,
    IMobileSidesPadding,
} from "@/widgets/injectKeys";
type Props = {
    id: string;
    itemBundle: ItemBundle;
};
const props = defineProps<Props>();
type Emits = {
    add: [bundle: ItemBundle];
    remove: [];
    shiftLeft: [val: number];
    shiftRight: [val: number];
};
const emit = defineEmits<Emits>();
const isDraggable = ref(false);
const mainItemLayoutRef = ref<typeof mainItemLayout>();

const itemSides = ref<DesktopSidesPadding>(props.itemBundle.paddings.desktop);
const itemMobileSides = ref<MobileSidesPadding>(
    props.itemBundle.paddings.mobile
);
provide(IDesktopSidesPadding, itemSides);
provide(IMobileSidesPadding, itemMobileSides);

const type = computed<ItemTypes>(() => {
    return props.itemBundle.type;
});
const isDivider = computed<boolean>(() => {
    return type.value === ItemTypes.headerDivider;
});
const hasPercPaddingBottom = computed<boolean>(() => {
    return ItemTypesWithPercPaddingB.includes(type.value);
});
function onInputL(val: Сoordinates, event: MouseEvent) {
    if (!mainItemLayoutRef.value) return;
    const dom = mainItemLayoutRef.value.$el.getBoundingClientRect() as DOMRect;
    emit("shiftLeft", dom.left - event.clientX);
}
function onInputR(val: Сoordinates, event: MouseEvent) {
    if (!mainItemLayoutRef.value) return;
    const dom = mainItemLayoutRef.value.$el.getBoundingClientRect() as DOMRect;
    emit("shiftRight", event.clientX - dom.right);
}
function onInputB(val: Сoordinates, event: MouseEvent) {
    if (!mainItemLayoutRef.value) return;
    const dom = mainItemLayoutRef.value.$el as HTMLElement;
    const itemContainerWidth =
        dom.querySelector(".item-container")?.clientWidth ?? dom.clientWidth;
    const rect = dom.getBoundingClientRect();
    let targetHeight = event.clientY - rect.top;
    if (targetHeight < 0) {
        targetHeight = 0;
    }
    const width = (targetHeight * 100) / itemContainerWidth;
    itemSides.value.paddingBottom = width;
}
function onStop(val: string) {
    isDraggable.value = false;
}
function onStart(val: string) {
    isDraggable.value = true;
}

function removeItem() {
    emit("remove");
}
</script>
<style scoped>
.header-item-menu {
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>
