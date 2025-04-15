<template>
    <article class="amo-statuses-card">
        <header :class="`amo-statuses-card__header ` + headerClasses">
            {{ title }}
            <information-icon :information="hint" />
        </header>
        <v-progress-linear v-if="isLoading" indeterminate color="secondary" />
        <v-fade-transition>
            <draggable
                v-model="statusList"
                v-show="!isLoading"
                group="amo-statuses"
                item-key="id"
                tag="ul"
                v-bind="draggableAttr"
                class="amo-statuses-card__body"
            >
                <template #item="{ element }">
                    <li class="amo-statuses-card__body__item">
                        {{ element.show_name }}
                    </li>
                </template>
            </draggable>
        </v-fade-transition>
    </article>
</template>

<script setup lang="ts">
import { defineProps, defineExpose, toRefs, Ref } from "vue";
import { informationIcon } from "@/shared/libs/information-icon";
import { AmoPipelineStatus, AmoPipelineStatusItems } from "@/entities/amo";
import draggable from "vuedraggable";
import { watch } from "vue";
import { toRef } from "vue";
import { CARDS_TYPE } from "./types";
type StatusTypeProps = {
    allocationId: CARDS_TYPE;
    title: string;
    hint: string;
    headerClasses: string;
    itemList: Array<AmoPipelineStatusItems>;
    isLoading?: boolean;
};

const props = defineProps<StatusTypeProps>();
const { title, headerClasses, hint, itemList, allocationId } = toRefs(props);

const statusList = toRef<Array<AmoPipelineStatusItems>>(props.itemList);
watch(itemList, (newVal) => {
    statusList.value = newVal;
});

const draggableAttr = {
    animation: 400,
    disabled: false,
    forceFallback: true,
    ghostClass: "draggable-ghost",
    dragClass: "draggable-drag",
    chosenClass: "draggable-chosen",
    fallbackTolerance: 10,
    scrollSensitivity: 200,
};
const getStatusList = (): Ref<Array<AmoPipelineStatusItems>> => {
    return statusList;
};

defineExpose({
    getStatusList,
    allocationId,
});
</script>

<style scoped lang="scss">
$border: #d1d4d6 solid 1px;
.amo-statuses-card {
    border-radius: 5px;
    overflow: hidden;
    border: $border;
}
.amo-statuses-card__header {
    font-size: 0.9em;
    padding: 4px 9px;
}
.amo-statuses-card__body {
    min-height: 100px;
    padding: 0.3em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
}
.amo-statuses-card__body__item {
    border-radius: 5px;
    padding: 0.3em;
    border: $border;
    cursor: pointer;
    transition: background 0.3s ease;
    &:hover {
        background-color: #d1d4d6;
    }
}
</style>
