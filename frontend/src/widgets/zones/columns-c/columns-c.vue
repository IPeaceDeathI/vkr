<template>
    <div class="noks-column" :data-cols="params.cols" :class="firstLastClass">
        <!-- OPTIMIZATION реализовать ивенты    -->
        <column-resize-handler
            v-if="myIndex > 0"
            :index="myIndex"
            :className="gapClass"
            :shift-column="props.shiftColumn"
        />
        <div
            class="zone columns-c"
            :class="{ 'empty-children': itemLength < 1 }"
            :data-el-id="id"
            :data-zone-id="id"
            ref="zoneHTMLWrapper"
        >
            <zone-bg
                v-if="params.styles.background.type !== ZoneBgTypes.none"
                :class="{
                    'bg-image':
                        params.styles.background.type === ZoneBgTypes.image,
                }"
            />
            <zone-shadow />
            <zone-border v-if="params.styles.border.enabled" />
            <!-- OPTIMIZATION доделать и не забыть про styles  и ивенты в zone-controls-->
            <zone-controls
                :parentSelector="zoneHTMLWrapper"
                :zoneParams="params"
                @contrastColor="updateContrastColor"
                @applyStylesToAllZones="emit('applyStylesToAllZones', $event)"
                @update:zone-params="updateZoneParams"
                @on-clone="emit('onClone')"
                @on-delete="emit('onDelete')"
            />
            <items-list
                ref="itemListRef"
                :id="id"
                :zone-params="params"
                :items="columnBundle.items"
                @update-item-length="itemLength = $event"
            />
        </div>
        <Teleport to="#styles-container">
            <component :is="'style'">
                {{ styles }}
            </component>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import {
    BlockTitleParams,
    CardParams,
    ColumnParams,
    ContrastColor,
    GapTypes,
    MAX_COLS_SIZE,
    MIN_COLS_SIZE,
    ZoneBundle,
    ZoneParams,
    ZoneStylesParams,
    ZoneTypes,
} from "@/types";
import { INumberOfZones } from "@/widgets/injectKeys";
import { computed, inject, onMounted, onUnmounted, ref, toRefs } from "vue";
import { shallowRef, defineProps } from "vue";
import zoneBg from "../_common/zone-bg.vue";
import zoneShadow from "../_common/zone-shadow.vue";
import zoneBorder from "../_common/zone-border.vue";
import {
    GapClass,
    zoneControls,
    columnResizeHandler,
} from "@/features/structure";
import { ZoneBgTypes } from "@/types";
import useZone from "../useZone";
import itemsList from "../items-list/items-list.vue";
import { ColumnShiftDirection } from "@/entities/structure/modules/zones/types/actions";
import { useStore } from "@/app/providers";
import { triggerRef } from "vue";

//STATE
type Props = {
    id: string;
    gap: GapTypes;
    columnBundle: ZoneBundle;
    shiftColumn: (val: {
        index: number;
        shiftDirection: ColumnShiftDirection;
    }) => boolean;
    myIndex: number;
};
type Emits = {
    "update:zoneBundle": [value: ZoneBundle];
    applyStylesToAllZones: [value: ZoneStylesParams];
    onClone: [];
    onDelete: [];
};
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { id } = toRefs(props);
const params = shallowRef<Omit<ColumnParams, "parentId" | "childrenIds">>(
    validZoneParms(props.columnBundle)
);
const itemListRef = ref<typeof itemsList>();
const { zoneHTMLWrapper, styles } = useZone(id, params, itemListRef);

const itemLength = ref<number>(props.columnBundle.items.length);
const numberOfZones = inject(INumberOfZones);
//ENDSTATE

//STORE
const store = useStore();
onMounted(() => {
    store.state.structure.zones.columns.set(id.value, {
        getCols: () => {
            return params.value.cols;
        },
        setCols: (cols) => {
            params.value.cols = cols;
            triggerRef(params);
        },
        reduce: () => {
            if (params.value.cols <= MIN_COLS_SIZE) {
                return false;
            } else {
                params.value.cols -= 1;
                triggerRef(params);
                return true;
            }
        },
        increase: () => {
            if (params.value.cols >= MAX_COLS_SIZE) {
                return false;
            } else {
                params.value.cols += 1;
                triggerRef(params);
                return true;
            }
        },
    });
});
onUnmounted(() => {
    store.state.structure.zones.columns.delete(id.value);
});
//END STORE

function validZoneParms(
    zoneBundle: ZoneBundle
): Omit<ColumnParams, "parentId" | "childrenIds"> {
    //OPTIMIZATION elfkbnm childrenid and parentId и убрать это приведение типов
    const params = zoneBundle.zoneParams as unknown as ZoneParams;
    if (params.type === ZoneTypes.column) {
        return params;
    }
    //OPTIMIZATION вызывать сервис ошибок вместо throw
    throw "no column";
}

const firstLastClass = computed<string>(() => {
    if (props.myIndex < 1) {
        return "first-column";
    } else if (props.myIndex >= (numberOfZones?.value ?? 0) - 1) {
        return "last-column";
    } else return "";
});
const gapClass = computed<GapClass>(() => {
    if (props.gap === GapTypes.none) return GapClass.none;
    else if (props.gap === GapTypes.middle) return GapClass.middle;
    else return GapClass.large;
});

const updateZoneParams = function (
    value: Omit<
        BlockTitleParams | CardParams | ColumnParams,
        "parentId" | "childrenIds"
    >
) {
    const columnParams = value as ColumnParams;
    params.value = columnParams;
    triggerRef(params);
};

const updateContrastColor = function (value: ContrastColor) {
    params.value.styles.background.contrastColor = value;
    triggerRef(params);
};
</script>

<style scoped></style>
