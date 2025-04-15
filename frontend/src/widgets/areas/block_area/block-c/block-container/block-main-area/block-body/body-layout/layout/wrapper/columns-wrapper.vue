<template>
    <draggable
        class="columns-wrapper"
        :class="{
            'show-landing-strip': $store.getters['environment/columnIsDrag'],
        }"
        :model-value="zones"
        group="column"
        @start="$store.dispatch('environment/PUT_COLUMN_IS_DRAG', undefined)"
        @end="endDrag"
        itemKey="id"
        v-bind="dragOption"
    >
        <template #item="{ element, index }">
            <columns-c
                :id="element.id"
                :columnBundle="element.bundle"
                :myIndex="index"
                :gap="props.bodyLayoutParams.gap"
                :shiftColumn="shiftColumn"
                @applyStylesToAllZones="applyStylesToAllZones"
                @on-clone="cloneCard(index)"
                @on-delete="deleteCard(index)"
            />
        </template>
    </draggable>
</template>

<script setup lang="ts">
import {
    BodyLayoutCardParams,
    ColumnCols,
    ColumnParams,
    MIN_COLS_SIZE,
    ZoneBundle,
    ZoneStylesParams,
} from "@/types";
import draggable from "vuedraggable";
import { defineProps, toRefs } from "vue";
import useWrapper from "./useWrapper";
import columnsC from "@/widgets/zones/columns-c/columns-c.vue";
import { ColumnShiftDirection } from "@/entities/structure/modules/zones/types/actions";
import { watch } from "vue";
import { nextTick } from "vue";
import { useStore } from "@/app/providers";
import { CriticalError } from "@/shared/services/error_service";

type Props = {
    bodyLayoutParams: BodyLayoutCardParams;
    zones: { id: string; bundle: ZoneBundle }[];
};
const props = defineProps<Props>();
const emit = defineEmits<{
    deleteZone: [value: number];
    cloneZone: [{ bundle: ZoneBundle; index: number }];
    "update:zones": [value: { id: string; bundle: ZoneBundle }[]];
}>();
const { zones: propsZones } = toRefs(props);
const updateZones = (value: { id: string; bundle: ZoneBundle }[]) => {
    emit("update:zones", value);
};

const {
    zones,
    dragOption,
    getZoneBundles,
    getZoneBundleByIndex,
    getColumnById,
    endDrag,
} = useWrapper(propsZones, updateZones);

const cloneCard = function (index: number) {
    const bundle = getZoneBundleByIndex(index);
    emit("cloneZone", { bundle: bundle, index: index + 1 });
};

const deleteCard = function (index: number) {
    emit("deleteZone", index);
};
//BALANCE COLUMN Балансировака колонок при зименении их количества
watch(
    () => zones.value.length,
    () => {
        //для того, чтобы успело отрисоваться
        nextTick(() => {
            balanceColumn();
        });
    }
);
const balanceColumn = () => {
    const sumCols = zones.value.reduce((sum, column) => {
        return sum + getColumnById(column.id).getCols();
    }, 0);
    if (sumCols <= MIN_COLS_SIZE) return;
    else if (sumCols === MIN_COLS_SIZE) return;
    let colsArray: Array<ColumnCols> = [];
    switch (zones.value.length) {
        case 1:
            colsArray = [24];
            break;
        case 2:
            colsArray = [12, 12];
            break;
        case 3:
            colsArray = [8, 8, 8];
            break;
        case 4:
            colsArray = [6, 6, 6, 6];
            break;
        case 5:
            colsArray = [5, 5, 4, 5, 5];
            break;
        case 6:
            colsArray = [4, 4, 4, 4, 4, 4];
            break;
        default:
            colsArray = [];
    }
    zones.value.forEach(({ id }, index) => {
        getColumnById(id).setCols(colsArray[index]);
    });
};
//END BALANCE COLUMN
//SHIFT
type ShiftParams = {
    index: number;
    shiftDirection: ColumnShiftDirection;
};
const shiftColumn = ({ index, shiftDirection }: ShiftParams): boolean => {
    if (!columnCanShift({ index, shiftDirection })) {
        return false;
    }
    const compressibleColumns = getCompressibleSlice({ index, shiftDirection });
    if (shiftDirection === "left") compressibleColumns.reverse();
    return shift(compressibleColumns, zones.value[index].id);
};
const columnCanShift = ({ index, shiftDirection }: ShiftParams): boolean => {
    const compressibleSlice = getCompressibleSlice({ index, shiftDirection });
    const minSumOfCols = compressibleSlice.length * MIN_COLS_SIZE;
    const currentSumOfCols = compressibleSlice.reduce(function (sum, columnId) {
        return sum + getColumnById(columnId).getCols();
    }, 0);
    if (minSumOfCols < currentSumOfCols) {
        return true;
    } else {
        return false;
    }
};
const getCompressibleSlice = ({ index, shiftDirection }: ShiftParams) => {
    return shiftDirection === "right"
        ? zones.value.slice(index + 1).map((elem) => elem.id)
        : zones.value.slice(0, index).map((elem) => elem.id);
};
const shift = (columns: Array<string>, comingColumnId: string): boolean => {
    for (const columnId of columns) {
        if (
            getColumnById(columnId).reduce() &&
            getColumnById(comingColumnId).increase()
        ) {
            return true;
        }
    }
    return false;
};
//END SHIFT

// applyStylesToAllZones
const applyStylesToAllZones = function (value: ZoneStylesParams) {
    zones.value.forEach((zone) => {
        zone.bundle.zoneParams.styles = value;
    });
};

defineExpose({
    getZoneBundles,
});
</script>

<style scoped></style>
