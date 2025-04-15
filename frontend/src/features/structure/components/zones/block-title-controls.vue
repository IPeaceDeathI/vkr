<template>
    <div
        class="noks-block-title-toolbar"
        v-if="$store.getters['environment/isEditable']"
    >
        <v-element-toolbar color="editor" style="width: 51px">
            <v-toolbar-items-small>
                <v-btn @click="showRedactor = true">
                    <v-icon> mdi-cog</v-icon>
                    <v-tooltip>Настройки структуры</v-tooltip>
                </v-btn>
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
            </v-toolbar-items-small>
        </v-element-toolbar>
    </div>
    <zone-redactor
        :id="zoneId"
        v-model="showRedactor"
        :zone-params="zoneParams"
    ></zone-redactor>
</template>
<script lang="ts">
import { BundleCollector, BundleUncollector, CopyPaste } from "@/entities";
import { zoneRedactor } from "../../redactors";
import { defineComponent, PropType } from "vue";
import {
    TreeMenuItemsType,
    TreeMenuParams,
} from "@/shared/libs/tree-menu/types";
import { treeMenu } from "@/shared/libs/tree-menu";
import { BlockTitleParams, CardParams, ColumnParams } from "@/types";
export default defineComponent({
    components: {
        zoneRedactor,
        treeMenu,
    },
    props: {
        zoneId: {
            // eslint-disable-next-line no-undef
            type: String as PropType<id>,
            required: true,
        },
        zoneParams: {
            type: Object as PropType<
                Omit<
                    BlockTitleParams | CardParams | ColumnParams,
                    "parentId" | "childrenIds"
                >
            >,
            required: true,
        },
    },
    data() {
        return {
            showRedactor: false,
            menuIsOpen: false,
            items: [
                //TODO ОНО И НЕ РАБОТАЛО
                // {
                //     type: TreeMenuItemsType.mainItem,
                //     icon: "mdi-delete",
                //     title: "Удалить",
                //     subItems: [],
                // },
                // {
                //     type: TreeMenuItemsType.mainItem,
                //     icon: "mdi-clipboard-arrow-up-outline",
                //     title: "Копировать",
                //     closeAllMenu: true,
                //     subItems: [],
                // },
                // {
                //     type: TreeMenuItemsType.mainItem,
                //     icon: "mdi-clipboard-arrow-down-outline",
                //     title: "Вставить",
                //     closeAllMenu: true,
                //     subItems: [],
                // },
                // {
                //     type: TreeMenuItemsType.mainItem,
                //     icon: "mdi-content-copy",
                //     title: "Клонировать",
                //     closeAllMenu: true,
                //     subItems: [],
                // },
            ] as unknown as TreeMenuParams,
        };
    },
    methods: {
        deleteElement() {
            CopyPaste.deleteZone(this.$store, this.zoneId);
        },
        async cloneElement() {
            CopyPaste.cloneZone(this.$store, this.zoneId);
        },
        changeMenuState(state: boolean) {
            this.menuIsOpen = state;
        },
    },
});
</script>
<style lang="scss" scoped></style>
