<template>
    <template v-if="$store.getters['environment/isEditable']">
        <v-element-toolbar
            class="block-editor-controls"
            height="30"
            :style="{
                width: visibility !== ElementVisibility.all ? '157px' : '127px',
            }"
            rounded="pill"
            :class="{ 'menu-is-open': menuIsOpen }"
        >
            <v-toolbar-items>
                <v-btn v-show="visibility !== ElementVisibility.all">
                    <v-icon
                        :icon="visibilityToIcon[visibility]"
                        color="success"
                    />
                    <v-menu
                        activator="parent"
                        @update:model-value="menuIsOpen = $event"
                    >
                        <viewport-visibility-redactor
                            v-model="visibility"
                            :showHidden="true"
                            density="comfortable"
                            color="secondary"
                        />
                    </v-menu>
                </v-btn>
                <v-btn
                    @click="
                        () => {
                            openBlockRedactor(BlockRedactorTabs.structure);
                        }
                    "
                >
                    <v-icon>mdi-view-compact-outline</v-icon>
                    <v-tooltip>Настройки структуры</v-tooltip>
                </v-btn>
                <v-btn @click="openBlockRedactor(BlockRedactorTabs.background)">
                    <v-icon>mdi-palette-outline</v-icon>
                    <v-tooltip>Настройки фона</v-tooltip>
                </v-btn>
                <div class="swap-container">
                    <v-btn
                        width="30px"
                        size="x-small"
                        :icon="false"
                        @click="$emit('moveTop')"
                        :disabled="!canMoveTop"
                    >
                        <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn
                        width="30px"
                        size="x-small"
                        :icon="false"
                        @click="$emit('moveBottom')"
                        :disabled="!canMoveBottom"
                    >
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                </div>
                <v-btn :active="menuIsOpen">
                    <v-icon>mdi-dots-horizontal</v-icon>
                    <v-tooltip :disabled="menuIsOpen" location="left"
                        >Больше опций</v-tooltip
                    >
                    <tree-menu
                        :menu-items="items"
                        @menuStateChange="changeMenuState"
                        :is-main-parent="true"
                    >
                    </tree-menu>
                </v-btn>
            </v-toolbar-items>
        </v-element-toolbar>
        <!-- OPTIMIZATION -->
        <block-redactor
            :modelValue="showBlockRedactor"
            :blockParams="blockParams"
            :blockBodyParams="blockBodyParams"
            :blockHeaderParams="blockHeaderParams"
            :block-header-bundle="blockHeaderBundle"
            :block-title-bundle="blockTitleBundle"
            :block-title-params="blockTitleParams"
            :facialTab="redactorFacialTab"
            @update:modelValue="(value: boolean)=>{showBlockRedactor = value}"
            @update:blockParams="updateBlockParams"
            @update:blockBodyParams="updateBlockBodyParams"
            @update:block-title-bundle="
                $emit('update:blockTitleBundle', $event)
            "
            @update:block-title-params="
                $emit('update:blockTitleParams', $event)
            "
            @update:block-header-params="
                $emit('update:blockHeaderParams', $event)
            "
            @update:block-header-bundle="
                $emit('update:blockHeaderBundle', $event)
            "
            @update:block-header-second-row-bundle="
                $emit('update:blockHeaderSecondRowBundle', $event)
            "
            @changeBurgerHeaderState="$emit('changeBurgerHeaderState', $event)"
        ></block-redactor>
    </template>
</template>
<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
import {
    BlockRedactorTabs,
    blockRedactor,
} from "@/features/structure/redactors";
import { treeMenu } from "@/shared/libs/tree-menu";
import {
    ClassSubitem,
    ToggleButton,
    TreeMenuItemsType,
    TreeMenuParams,
} from "@/shared/libs/tree-menu/types";
import { viewportVisibilityRedactor } from "@/features/structure/redactors";
import {
    BlockBodyParams,
    BlockCParams,
    BlockHeaderParams,
    BlockParams,
    BlockTitleParams,
    ElementVisibility,
    ZoneBundle,
} from "@/types";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";

export default defineComponent({
    props: {
        blockRef: {
            type: HTMLElement,
            required: true,
        },
        myPositionInBlockArea: {
            type: Number,
            required: true,
        },
        blockCParams: {
            type: Object as PropType<BlockCParams>,
            required: true,
        },
        blockBodyParams: {
            type: Object as PropType<
                Omit<BlockBodyParams, "parentId" | "childrenIds">
            >,
            required: true,
        },
        blockHeaderParams: {
            type: [Object, Boolean] as PropType<
                Omit<BlockHeaderParams, "parentId" | "childrenIds"> | false
            >,
            required: true,
        },
        blockHeaderBundle: {
            type: [Object, Boolean] as PropType<ZoneBundle | false>,
            required: true,
        },
        blockTitleBundle: {
            type: [Object, Boolean] as PropType<ZoneBundle | false>,
            required: true,
        },
        blockParams: {
            type: Object as PropType<
                Omit<
                    BlockParams,
                    "blockTitle" | "parentId" | "childrenBlockBodiesId"
                >
            >,
            required: true,
        },
        numberOfBlocks: {
            type: Number,
        },
        blockTitleParams: {
            type: [Object, Boolean] as PropType<
                Omit<BlockTitleParams, "parentId" | "childrenIds"> | false
            >,
            required: true,
        },
    },
    emits: {
        onCopy: () => true,
        onPaste: () => true,
        onDelete: () => true,
        onClone: () => true,
        onSave: () => true,
        moveTop: () => true,
        moveBottom: () => true,
        "update:modelValue": () => true,
        "update:blockCParams": (value: BlockCParams) => true,
        "update:blockBodyParams": (
            value: Omit<BlockBodyParams, "parentId" | "childrenIds">
        ) => true,
        "update:blockTitleBundle": (value: ZoneBundle) => true,
        "update:blockHeaderBundle": (value: ZoneBundle) => true,
        "update:blockHeaderParams": (
            value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
        ) => true,
        "update:blockHeaderSecondRowBundle": (value: ZoneBundle) => true,
        "update:blockHeaderSecondRowParams": (
            value: Omit<BlockHeaderParams, "parentId" | "childrenIds">
        ) => true,
        "update:blockTitleParams": (
            value: Omit<BlockTitleParams, "parentId" | "childrenIds"> | false
        ) => true,
        "update:blockParams": (
            value: Omit<
                BlockParams,
                "blockTitle" | "parentId" | "childrenBlockBodiesId"
            >
        ) => true,
        changeBurgerHeaderState: (value: boolean) => true,
    },

    components: {
        blockRedactor,
        treeMenu,
        viewportVisibilityRedactor,
    },
    data() {
        return {
            firstClass: "",
            classesList: [] as Array<string>,
            showBlockRedactor: false,
            menuIsOpen: false,
            ElementVisibility: ElementVisibility,
            BlockRedactorTabs: BlockRedactorTabs,
            redactorFacialTab: BlockRedactorTabs.structure,
            visibilityToIcon: {
                [ElementVisibility.all]: "mdi-monitor-cellphone",
                [ElementVisibility.pc]: "mdi-monitor",
                [ElementVisibility.mobile]: "mdi-cellphone",
                [ElementVisibility.hidden]: "mdi-cancel",
            },
        };
    },
    computed: {
        // this.$store.getters['user/getIsBlockCreator'] || this.$store.getters['user/getIsAdmin']
        itemClasses() {
            return this.classesList;
        },
        classSubItems() {
            const res = [] as ClassSubitem[];
            if (this.itemClasses) {
                this.itemClasses.forEach((item) => {
                    res.push({
                        title: item,
                        deleteFn: () => {
                            if (this.blockRef)
                                this.blockRef.classList.remove(item);
                            this.classesList.splice(
                                this.classesList.indexOf(item),
                                1
                            );
                        },
                        callBackFn: (value: string) => {
                            navigator.clipboard
                                .writeText(value)
                                .then(() => {
                                    NotificationService.common().success({
                                        text: "Класс элемента скопирован",
                                        delay: 0,
                                    });
                                })
                                .catch(() => {
                                    NotificationService.common().error({
                                        text: "Не получилось скопировать класс элемента :(",
                                        delay: 0,
                                    });
                                });
                        },
                    });
                });
            }
            return res;
        },
        items(): TreeMenuParams {
            const items: TreeMenuParams = [
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-delete",
                    title: "Удалить",
                    callBackFn: () => {
                        this.$emit("onDelete");
                    },
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-clipboard-arrow-up-outline", //mdi-select-multiple //mdi-select-arrow-up
                    title: "Копировать",
                    closeAllMenu: true,
                    callBackFn: () => {
                        this.$emit("onCopy");
                    },
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-clipboard-arrow-down-outline", //mdi-select-arrow-down
                    title: "Вставить",
                    closeAllMenu: true,
                    callBackFn: async () => {
                        this.$emit("onPaste");
                    },
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-content-copy",
                    title: "Клонировать",
                    closeAllMenu: true,
                    callBackFn: async () => {
                        this.$emit("onClone");
                    },
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.anchor,
                    placeholder: this.anchor,
                    value: this.anchor,
                    isActive: this.anchorEnabled,
                    anchorOnOffFn: (value: boolean) =>
                        (this.anchorEnabled = value),
                    anchorUpdateValueFn: (value: string) =>
                        (this.anchor = value),
                },
                {
                    type: TreeMenuItemsType.toggleItem,
                    title: "Видимость на устройстве",
                    buttons: this.visibilityButton,
                    current: this.currentVisability,
                },
                {
                    type: TreeMenuItemsType.classItem,
                    prependIcon: "mdi-code-tags",
                    title: "Класс элемента",
                    appendIcon: "",
                    tooltipText: "",
                    copyFn: (value: string) => {
                        console.log("copy", value);
                    },
                    staticSubitem: {
                        title: this.firstClass,
                        addFn: (value: string) => {
                            if (value.includes(" ")) {
                                if (value.indexOf(" ") == 0) return;
                                value = value.substring(0, value.indexOf(" "));
                            }
                            if (!this.itemClasses.includes(value)) {
                                if (this.blockRef)
                                    this.blockRef.classList.add(value);
                                this.classesList.push(value);
                            }
                        },
                    },
                    subitems: this.classSubItems,
                },
            ];
            if (this.$store.getters["user/getIsCommonUser"]) {
                items.push({
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-content-save-outline",
                    title: "Сохранить блок",
                    closeAllMenu: true,
                    callBackFn: async () => {
                        this.$emit("onSave");
                        // CopyPaste.blockToGlobal(this.$store, this.blockId);
                    },
                    subItems: [],
                });
            }
            return items;
        },
        visibilityButton(): Array<ToggleButton> {
            return [
                {
                    icon: this.visibilityToIcon[ElementVisibility.all],
                    tooltipText: "Все устройства",
                    value: ElementVisibility.all,
                    callBackFn: () => {
                        this.visibility = ElementVisibility.all;
                    },
                },
                {
                    icon: this.visibilityToIcon[ElementVisibility.pc],
                    tooltipText: "ПК",
                    value: ElementVisibility.pc,
                    callBackFn: () => {
                        this.visibility = ElementVisibility.pc;
                    },
                },
                {
                    icon: this.visibilityToIcon[ElementVisibility.mobile],
                    tooltipText: "Мобильный",
                    value: ElementVisibility.mobile,
                    callBackFn: () => {
                        this.visibility = ElementVisibility.mobile;
                    },
                },
                {
                    icon: this.visibilityToIcon[ElementVisibility.hidden],
                    tooltipText: "Отключено на всех устройствах",
                    value: ElementVisibility.hidden,
                    callBackFn: () => {
                        this.visibility = ElementVisibility.hidden;
                    },
                },
            ];
        },
        currentVisability() {
            return this.visibilityButton.findIndex(
                (btn) => btn.value === this.visibility
            );
        },
        visibility: {
            get() {
                return this.blockCParams.visibility;
            },
            set(value: ElementVisibility) {
                this.$emit("update:blockCParams", {
                    ...this.blockCParams,
                    visibility: value,
                });
            },
        },
        // blockAreaId(): string {
        //     return this.$store.getters["structure/blocks/getBlockParamsById"](
        //         this.blockId
        //     ).parentId;
        // },
        // blockAreaChildren(): Array<string> {
        //     return this.$store.getters["structure/getBlockAreaChildren"];
        // },
        // myIndex(): number {
        //     return this.blockAreaChildren.indexOf(this.blockId);
        // },
        canMoveTop(): boolean {
            return this.myPositionInBlockArea > 0;
        },
        canMoveBottom(): boolean {
            return this.myPositionInBlockArea < (this.numberOfBlocks ?? 0) - 1;
        },
        anchorEnabled: {
            get(): boolean {
                return this.blockCParams.anchor.enable;
            },
            set(value: boolean) {
                this.$emit("update:blockCParams", {
                    ...this.blockCParams,
                    anchor: { ...this.blockCParams.anchor, enable: value },
                });
            },
        },
        anchor: {
            get(): string {
                return this.blockCParams.anchor.value;
            },
            set(value: string) {
                this.$emit("update:blockCParams", {
                    ...this.blockCParams,
                    anchor: { ...this.blockCParams.anchor, value: value },
                });
            },
        },
    },
    methods: {
        openBlockRedactor(facialTab: BlockRedactorTabs) {
            this.redactorFacialTab = facialTab;
            this.showBlockRedactor = true;
        },
        changeMenuState(state: boolean) {
            this.menuIsOpen = state;
        },
        updateModelValue() {
            this.showBlockRedactor = false;
        },
        updateBlockParams(
            value: Omit<
                BlockParams,
                "blockTitle" | "parentId" | "childrenBlockBodiesId"
            >
        ) {
            this.$emit("update:blockParams", value);
        },
        updateBlockBodyParams(
            value: Omit<BlockBodyParams, "parentId" | "childrenIds">
        ) {
            this.$emit("update:blockBodyParams", value);
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.swap-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.menu-list {
    border: solid 1px $theme-primary-opacity;
}
</style>
