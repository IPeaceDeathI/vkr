<template>
    <draggable-card
        v-if="store.getters['environment/isEditable']"
        v-model="show"
        :width="currentTab === Tabs.structure ? '580px' : '440px'"
    >
        <redactor-toolbar
            v-model="currentTab"
            :toggle-btns="tabsBtn"
            @close-click="emit('update:modelValue', false)"
        />
        <v-redactor-container style="max-height: 82vh">
            <!-- 
                TODO посмотреть на style="max-height: 82vh"
             -->
            <template v-if="currentTab === Tabs.structure">
                <v-list style="padding: 0">
                    <switched-list-item
                        v-model="fullscreenMode"
                        title="Полноэкранный режим"
                        prepend-icon="mdi-arrow-top-right-bottom-left"
                    >
                        Настроить
                        <draggable-inner-card width="500px" activator="parent">
                            <v-sheet class="pa-4">
                                <v-text-field
                                    label="Высота блока"
                                    variant="outlined"
                                    v-model="blockHeight"
                                />
                            </v-sheet>
                        </draggable-inner-card>
                    </switched-list-item>
                    <switched-list-item
                        v-model="blockHeaderEnabled"
                        title="Шапка секции"
                        @click="headerRedactor = true"
                        :disabled="!blockHeaderEnabled && hasHeader"
                        prepend-icon="mdi-page-layout-header"
                    >
                        <div>Настроить</div>
                        <draggable-inner-card
                            width="500px"
                            v-model="headerRedactor"
                        >
                            <redactor-toolbar
                                title="Структура"
                                @close-click="headerRedactor = false"
                            />
                            <v-redactor-container>
                                <switched-list-item
                                    v-model="blockHeaderIsFixed"
                                    title="Фиксировать при прокрутке страницы"
                                    prepend-icon="mdi-target"
                                    :is-cog="false"
                                />
                                <!-- TODO переделать редактор фиксации -->
                                <!-- @click="headerFixRedactor = true"
                                    <div>Настроить</div>
                                </switched-list-item> -->
                                <switched-list-item
                                    v-model="blockHeaderIsSecondRow"
                                    title="Включить второй ряд в шапке"
                                    prepend-icon="mdi-view-stream-outline"
                                    :is-cog="false"
                                />
                                <!-- TODO переделать редактор 2ой строки -->
                                <!-- @click="headerRowRedactor = true"
                                    <div>Настроить</div>
                                </switched-list-item> -->
                                <switched-list-item
                                    v-model="blockHeaderIsBurgerMenu"
                                    title="Добавлять элементы в мобильное меню"
                                    prepend-icon="mdi-cellphone"
                                    :is-cog="false"
                                ></switched-list-item>
                            </v-redactor-container>
                        </draggable-inner-card>
                    </switched-list-item>
                    <div
                        v-if="!blockHeaderEnabled && hasHeader"
                        class="text-caption pl-4 pb-1"
                    >
                        Уже существует блок с шапкой
                    </div>
                    <!-- OPTIMIZATION -->
                    <switched-list-item
                        v-model="blockTitleEnabled"
                        title="Заголовок секции"
                        @click="showRedactor = true"
                        prepend-icon="mdi-text-recognition"
                    >
                        <div>Настроить</div>
                    </switched-list-item>
                    <switched-list-item
                        disabled
                        title="Вкладки"
                        prepend-icon="mdi-folder-multiple-image"
                    >
                        Настроить
                    </switched-list-item>
                </v-list>
                <!-- OPTIMIZATION -->
                <block-body-redactor-area
                    @update:bodyLayoutParams="updateBodyLayoutParams"
                    :blockBodyParams="blockBodyParams"
                />
            </template>
            <block-bg-redactor
                v-else-if="currentTab === Tabs.background"
                :bgParams="blockParams.baseBGParams"
                @onChange="updateBaseBgParams"
            />
            <!-- TODO переделать, т.к. id убралось -->
            <block-header-fix-redactor
                v-if="blockHeaderEnabled && blockHeader"
                :id="blockHeader().toString()"
                v-model="headerFixRedactor"
            />
            <!-- TODO переделать, т.к. id убралось -->
            <block-header-second-row-redactor
                v-if="blockHeaderEnabled && blockHeader() !== false"
                :id="blockHeader().toString()"
                v-model="headerRowRedactor"
            />
            <zone-redactor
                v-if="blockTitleEnabled && blockTitleBundle && blockTitleParams"
                v-model="showRedactor"
                :zone-params="blockTitleParams"
                :apply-styles-to-all-zone="
                    () => {
                        console.error('OPTIMIZATION реализовать');
                    }
                "
                @update:zone-params="(value: any)=>{
                    if(value.type === ZoneTypes.blockTitle) emit('update:blockTitleParams', value)}"
            />
        </v-redactor-container>
    </draggable-card>
</template>
<script setup lang="ts">
import {
    defineEmits,
    defineProps,
    shallowRef,
    computed,
    onBeforeMount,
    withDefaults,
    watch,
    toRefs,
    ref,
} from "vue";
import {
    switchedListItem,
    redactorToolbar,
    draggableCard,
    draggableInnerCard,
} from "../../reusable-components";
import { ElementsFabric } from "@/shared/services/elements_fabrics";
import { blockBodyRedactorArea } from "../block-body";
import { BlockRedactorTabs } from "./types";
import { blockBgRedactor } from "../block";
import { zoneRedactor } from "../zone";
import {
    BaseBGParams,
    BlockBodyParams,
    BlockHeaderParams,
    BlockParams,
    BlockTitleParams,
    BodyLayoutCardParams,
    BodyLayoutColumnParams,
    CardParams,
    ColumnParams,
    ZoneBundle,
    ZoneTypes,
} from "@/types";
import {
    BlockHeaderFixRedactor,
    BlockHeaderSecondRowRedactor,
} from "../zone/block-header-redactors";
import { useStore } from "vuex";

//typing
type BlockParamsForRedactor = Omit<
    BlockParams,
    "blockTitle" | "parentId" | "childrenBlockBodiesId"
>;

type BlockBodyParamsForRedactor = Omit<
    BlockBodyParams,
    "parentId" | "childrenIds"
>;

type Props = {
    modelValue: boolean;
    blockParams: BlockParamsForRedactor;
    blockBodyParams: BlockBodyParamsForRedactor;
    blockTitleBundle: ZoneBundle | false;
    blockHeaderBundle: ZoneBundle | false;
    blockHeaderParams:
        | Omit<BlockHeaderParams, "parentId" | "childrenIds">
        | false;
    facialTab: BlockRedactorTabs;
    blockTitleParams:
        | Omit<BlockTitleParams, "parentId" | "childrenIds">
        | false;
};

type Emits = {
    "update:modelValue": [value: boolean];
    "update:blockParams": [value: BlockParamsForRedactor];
    "update:blockTitleBundle": [value: ZoneBundle];
    "update:blockBodyParams": [value: BlockBodyParamsForRedactor];
    "update:blockHeaderParams": [
        value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
    ];
    "update:blockHeaderSecondRowParams": [
        value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
    ];
    "update:blockTitleParams": [
        value: Omit<BlockTitleParams, "parentId" | "childrenIds"> | false
    ];
    "update:blockHeaderBundle": [value: ZoneBundle];
    "update:blockHeaderSecondRowBundle": [value: ZoneBundle];
    changeBurgerHeaderState: [value: boolean];
};

const props = withDefaults(defineProps<Props>(), {
    facialTab: BlockRedactorTabs.structure,
});
const emit = defineEmits<Emits>();

const store = useStore();

const {
    blockParams,
    blockBodyParams,
    blockHeaderParams,
    facialTab,
    blockTitleBundle,
    modelValue,
} = toRefs(props);

//blockParams
const blockHeaderEnabled = computed<boolean>({
    get() {
        return blockParams.value.headerIsEnabled;
    },
    set(value: boolean) {
        if (!props.blockHeaderBundle) {
            const bundle = ElementsFabric.getZonesFabric()
                .getZone(ZoneTypes.blockHeader)
                .getBundle(false);
            emit("update:blockHeaderBundle", bundle);
            emit("changeBurgerHeaderState", true);
        }
        emit("update:blockParams", {
            ...blockParams.value,
            headerIsEnabled: value,
        });
        blockParams.value.headerIsEnabled = value;
        if (!value) {
            emit("changeBurgerHeaderState", value);
        }
    },
});

const blockHeaderIsSecondRow = computed<boolean>({
    get() {
        if (blockHeaderParams.value) {
            return blockHeaderParams.value.isSecondRow;
        } else return false;
    },
    set(value: boolean) {
        if (blockHeaderParams.value) {
            if (!blockHeaderParams.value.isSecondRow) {
                const bundle = ElementsFabric.getZonesFabric()
                    .getZone(ZoneTypes.blockHeader)
                    .getBundle(true);
                emit("update:blockHeaderSecondRowBundle", bundle);
            }
        }
        if (blockHeaderParams.value) {
            emit("update:blockHeaderParams", {
                ...blockHeaderParams.value,
                isSecondRow: value,
            });
        }
    },
});

const blockHeader = function () {
    return blockHeaderParams.value;
};

const hasHeader = computed<boolean>(() => {
    return store.getters["structure/zones/getHeaders"]().length > 0;
});

const tabs = computed<boolean>({
    get() {
        return blockParams.value.tabs;
    },
    set(value: boolean) {
        emit("update:blockParams", { ...blockParams.value, tabs: value });
    },
});

const blockTitleEnabled = computed<boolean>({
    get() {
        return blockParams.value.blockTitleIsEnabled;
    },
    set(value: boolean) {
        if (!blockTitleBundle.value) {
            emit(
                "update:blockTitleBundle",
                ElementsFabric.getZonesFabric()
                    .getZone(ZoneTypes.blockTitle)
                    .getBundle()
            );
        }
        emit("update:blockParams", {
            ...blockParams.value,
            blockTitleIsEnabled: value,
        });
    },
});

// OPTIMIZATION сделать если без этого наебнется
// const firstChild = function (): string {
//     const children = childrenBlockBodiesId;
//     if (children && children.length > 0) return children[0];
//     // Детей может и не быть
//     else
//         throw new CriticalError({
//             bundle: BundleCollector.collectProject(this.$store),
//             message: `block with id ${this.blockId} has not children`,
//             targetId: this.blockId, //find block id
//         });
// },

//baseBgParams
const updateBaseBgParams = function (value: BaseBGParams) {
    emit("update:blockParams", { ...blockParams.value, baseBGParams: value });
};

//blockCParams
const fullscreenMode = computed<boolean>({
    get() {
        return blockParams.value.blockCParams.height !== "auto";
    },
    set(value: boolean) {
        emit("update:blockParams", {
            ...blockParams.value,
            blockCParams: {
                ...blockParams.value.blockCParams,
                height: value ? screenHeight.value : "auto",
            },
        });
    },
});

const blockHeight = computed<number | "auto">({
    get() {
        return blockParams.value.blockCParams.height;
    },
    set(value: number | "auto") {
        emit("update:blockParams", {
            ...blockParams.value,
            blockCParams: { ...blockParams.value.blockCParams, height: value },
        });
    },
});

//blockHeaderParams
const blockHeaderIsFixed = computed<boolean>({
    get() {
        return blockHeaderParams.value
            ? blockHeaderParams.value.headerStyles.isFixed.enabled
            : false;
    },
    set(value: boolean) {
        if (blockHeaderParams.value) {
            emit("update:blockHeaderParams", {
                ...blockHeaderParams.value,
                headerStyles: {
                    ...blockHeaderParams.value.headerStyles,
                    isFixed: {
                        ...blockHeaderParams.value.headerStyles.isFixed,
                        enabled: value,
                    },
                },
            });
        }
    },
});

const blockHeaderIsBurgerMenu = computed<boolean>({
    get() {
        return blockHeaderParams.value
            ? blockHeaderParams.value.headerStyles.isBurgerMenu
            : false;
    },
    set(value: boolean) {
        if (blockHeader() && blockHeaderParams.value) {
            emit("update:blockHeaderParams", {
                ...blockHeaderParams.value,
                headerStyles: {
                    ...blockHeaderParams.value.headerStyles,
                    isBurgerMenu: value,
                },
            });
            emit("changeBurgerHeaderState", value);
        }
    },
});

//BodyLayoutParams
const updateBodyLayoutParams = function (
    value: BodyLayoutCardParams | BodyLayoutColumnParams
) {
    emit("update:blockBodyParams", {
        ...blockBodyParams.value,
        BodyLayoutParams: value,
    });
};

//model value
const show = computed<boolean>({
    get() {
        return modelValue.value;
    },
    set(value: boolean) {
        emit("update:modelValue", false);
    },
});

//переменные для работы с template
const currentTab = shallowRef(BlockRedactorTabs.structure);
const showRedactor = shallowRef(false);
const headerRedactor = shallowRef(false);
const headerFixRedactor = shallowRef(false);
const headerRowRedactor = shallowRef(false);
const screenHeight = shallowRef(100);
const Tabs = shallowRef(BlockRedactorTabs);
const tabsBtn = shallowRef([
    {
        value: BlockRedactorTabs.structure,
        text: "Структура",
        icon: "mdi-view-compact-outline",
    },
    {
        value: BlockRedactorTabs.background,
        text: "Фон",
        icon: "mdi-palette-outline",
    },
]);

watch(facialTab, (value: BlockRedactorTabs) => {
    currentTab.value = value;
});

//on before mount
onBeforeMount(() => {
    currentTab.value = facialTab.value;
});
</script>
<style lang="scss" scoped></style>
