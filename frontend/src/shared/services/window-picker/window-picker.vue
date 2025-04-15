<template>
    <v-dialog max-width="1600" v-model="show">
        <v-card-dialog>
            <v-redactor-toolbar style="cursor: auto">
                <v-btn-toggle v-model="currentTab">
                    <v-btn :value="Tabs.my" prepend-icon="mdi-window-restore">
                        Мои окна
                    </v-btn>
                    <v-btn
                        rounded="lg"
                        :value="Tabs.global"
                        prepend-icon="mdi-rhombus-outline"
                        disabled
                    >
                        Окна глобальных секций
                    </v-btn>
                </v-btn-toggle>
                <v-spacer></v-spacer>
                <v-btn
                    prepend-icon="mdi-clipboard-arrow-down-outline"
                    class="mr-2"
                    variant="tonal"
                    @click="$emit('paste', 0)"
                >
                    Вставить из буфера
                </v-btn>
                <v-btn
                    variant="flat"
                    color="editor"
                    class="mr-2"
                    rounded="xl"
                    @click="addWindow"
                >
                    Добавить окно
                </v-btn>
                <v-btn
                    size="small"
                    icon
                    @click="$emit('update:model-value', false)"
                >
                    <v-icon size="x-large" color="editor-lighten-1">
                        mdi-close
                    </v-icon>
                </v-btn>
            </v-redactor-toolbar>
            <v-container style="max-width: 100%; height: 523px; overflow: auto">
                <v-row>
                    <v-col
                        v-for="(windowID, index) in windowIds"
                        :key="windowID"
                        cols="3"
                    >
                        <elevated-card @click="$emit('open', index)">
                            <v-toolbar class="text-body-2" density="compact">
                                <v-toolbar-title
                                    class="card-toolbar-title"
                                    @click.stop="copyId(index)"
                                >
                                    {{ `#${windowID}` }}
                                    <v-icon size="x-small"
                                        >mdi-content-copy</v-icon
                                    >
                                </v-toolbar-title>
                                <v-btn
                                    variant="plain"
                                    style="margin-inline-end: 5px"
                                    icon
                                    size="small"
                                >
                                    <tree-menu
                                        :menu-items="getMenuItems(index)"
                                        :is-main-parent="true"
                                        color="primary"
                                    >
                                    </tree-menu>
                                    <v-icon size="large"
                                        >mdi-dots-horizontal</v-icon
                                    >
                                </v-btn>
                            </v-toolbar>
                            <v-img
                                aspect-ratio="29/18"
                                cover
                                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                            ></v-img>
                        </elevated-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-dialog>
    </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ZonesFabric } from "../elements_fabrics/zones_fabric";
import { ZoneBundle, ZoneTypes } from "@/types";
import { CopyPaste } from "@/entities";
import { elevatedCard } from "../../libs/elevated-card";
import { treeMenu } from "@/shared/libs/tree-menu";
import {
    TreeMenuItemsType,
    TreeMenuParams,
} from "@/shared/libs/tree-menu/types";
import { PropType } from "vue";
enum Tabs {
    my,
    global,
}
export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
        },
        windowIds: {
            type: Array as PropType<Array<number>>,
            required: true,
        },
    },
    emits: {
        "update:model-value": (value: boolean) => true,
        addWindow: (value: ZoneBundle) => true,
        open: (index: number) => true,
        copy: (index: number) => true,
        paste: (index: number) => true,
        clone: (index: number) => true,
        remove: (index: number) => true,
    },
    components: {
        treeMenu,
        elevatedCard,
    },
    data() {
        return {
            Tabs: Tabs,
            currentTab: Tabs.my,
        };
    },
    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
    },
    methods: {
        getMenuItems(index: number): TreeMenuParams {
            return [
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-cog",
                    title: "Редактировать",
                    callBackFn: () => {
                        this.$emit("open", index);
                    },
                    closeMenu: true,
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-anchor",
                    title: "Копировать якорь",
                    callBackFn: () => {
                        this.copyId(index);
                    },
                    closeMenu: true,
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-content-copy",
                    title: "Дублировать",
                    callBackFn: () => {
                        this.$emit("clone", index);
                    },
                    closeMenu: true,
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-clipboard-arrow-up-outline",
                    title: "Копировать в буфер",
                    callBackFn: () => {
                        this.$emit("copy", index);
                    },
                    closeMenu: true,
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-delete",
                    title: "Удалить",
                    callBackFn: () => {
                        this.$emit("remove", index);
                    },
                    closeMenu: true,
                    subItems: [],
                },
            ];
        },
        copyId(index: number) {
            CopyPaste.copy(JSON.stringify(this.windowIds[index]));
        },
        addWindow() {
            this.$emit(
                "addWindow",
                ZonesFabric.getInstance().getZone(ZoneTypes.window).getBundle()
            );
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
.card-toolbar-title {
    padding: 0 5px;
    border-radius: 3px;
    &::v-deep .v-toolbar-title__placeholder {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &:hover {
        background-color: $theme-primary-darken-1;
    }
}
</style>
