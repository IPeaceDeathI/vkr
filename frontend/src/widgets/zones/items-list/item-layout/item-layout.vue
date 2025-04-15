<template>
    <main-item-layout
        :id="id"
        @vue:mounted="
            (value: any) => {
                itemRef = value.el;
            }
        "
        ref="mainItemLayoutRef"
        :params="props.itemParams"
    >
        <template v-slot:controls="{ selected }" v-if="!isSecondList">
            <item-editor-controls
                @on-copy="emit('copy')"
                @on-paste="emit('paste')"
                @on-delete="emit('remove')"
                @on-clone="emit('clone')"
                :selected="selected"
                :itemRef="itemRef"
                v-if="itemRef"
            />
        </template>
        <template v-slot:item-container-append="{ selected }">
            <item-resize-handler-x
                v-show="selected"
                :side="ResizeHandleSides.right"
                v-model:item-sides="itemSides"
            />
            <item-resize-handler-x
                v-show="selected"
                :side="ResizeHandleSides.left"
                v-model:item-sides="itemSides"
            />
        </template>
        <template v-slot:isSelected>
            <item-resize-handler-y
                :side="ResizeHandleSides.top"
                :type="props.itemParams.type"
                v-model:item-sides="itemSides"
                v-model:item-mobile-sides="itemMobileSides"
            />
            <item-resize-handler-y
                :side="ResizeHandleSides.bottom"
                :type="props.itemParams.type"
                v-model:item-sides="itemSides"
                v-model:item-mobile-sides="itemMobileSides"
            />
            <side-size-indicator :side="SideSizeIndicatorSides.bottom" />
            <side-size-indicator :side="SideSizeIndicatorSides.top" />
            <side-size-indicator :side="SideSizeIndicatorSides.right" />
            <side-size-indicator :side="SideSizeIndicatorSides.left" />
        </template>
        <template v-slot:overlay-editor="{ selected, setSelected }">
            <item-overlay-editor :show="!selected" @click="setSelected(true)">
                <template v-slot:top>
                    <add-item-button
                        :parentId="id"
                        @add-item="$emit('addItemAbove', $event)"
                        :side="AddButtonSides.top"
                        @paste="$emit('paste')"
                    />
                </template>
                <template v-slot:bottom>
                    <add-item-button
                        :parentId="id"
                        @add-item="$emit('addItemBelow', $event)"
                        :side="AddButtonSides.bottom"
                        @paste="$emit('paste')"
                    />
                </template>
            </item-overlay-editor>
        </template>
    </main-item-layout>
</template>

<script setup lang="ts">
import {
    DesktopSidesPadding,
    ItemBundle,
    ItemParams,
    MobileSidesPadding,
} from "@/types";
import { defineProps, withDefaults, defineEmits } from "vue";
import {
    addItemButton,
    itemResizeHandlerY,
    itemResizeHandlerX,
    itemOverlayEditor,
    sideSizeIndicator,
    SideSizeIndicatorSides,
    itemEditorControls,
} from "@/features/structure";
import { AddButtonSides } from "@/shared/helpers/components";
import { ResizeHandleSides } from "@/shared/libs/resize_handle";
import mainItemLayout from "./main-item-layout.vue";
import { ref } from "vue";
import { provide } from "vue";
import {
    IDesktopSidesPadding,
    IMobileSidesPadding,
} from "@/widgets/injectKeys";
import { toRefs } from "vue";
import { onMounted } from "vue";
import { useStore } from "@/app/providers";
import { onUnmounted } from "vue";

type Props = {
    id: string;
    itemParams: Omit<ItemParams, "parentId">;
    isSecondList?: boolean;
};
const props = withDefaults(defineProps<Props>(), { isSecondList: false });

type Emits = {
    addItemAbove: [params: ItemBundle];
    addItemBelow: [params: ItemBundle];
    copy: [];
    paste: [];
    clone: [];
    remove: [];
};
const emit = defineEmits<Emits>();

const { id } = toRefs(props);
const itemSides = ref<DesktopSidesPadding>(props.itemParams.paddings.desktop);
const itemMobileSides = ref<MobileSidesPadding>(
    props.itemParams.paddings.mobile
);
provide(IDesktopSidesPadding, itemSides);
provide(IMobileSidesPadding, itemMobileSides);
const mainItemLayoutRef = ref<typeof mainItemLayout>();
const itemRef = ref<HTMLElement>();
</script>

<style scoped></style>
