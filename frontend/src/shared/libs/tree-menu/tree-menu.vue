<template>
    <v-menu
        activator="parent"
        :close-on-content-click="false"
        close-delay="100"
        v-model="menuIsOpen"
    >
        <v-card>
            <v-list class="menu-list" variant="text" :bgColor="color">
                <v-sheet
                    :color="color"
                    v-for="(item, index) in menuItems"
                    :key="index"
                >
                    <component
                        :item="item"
                        :is="checkMenuItemType(item)"
                        :value="index"
                        @close-menu="menuIsOpen = false"
                        @close-all="chainEmit"
                    >
                    </component>
                    <tree-menu
                        v-if="
                            item.type === 'main-item' &&
                            item.subItems.length > 0
                        "
                        :open-on-hover="true"
                        :persistent="true"
                        :menu-items="item.subItems"
                        :disabled="item.isDisabled || false"
                        location="start top"
                        @close-all="chainEmit"
                    >
                    </tree-menu>
                </v-sheet>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import {
    TreeMenuParams,
    TreeMenuItemsType,
    TreeMenuMainItems,
    TreeMenuSwitchItems,
    TreeMenuToggleItems,
    Anchor,
    Divider,
    TreeMenuClassItem,
} from "./types";
import switchItem from "./switch-item.vue";
import toggleItem from "./toggle-item.vue";
import mainItem from "./main-item.vue";
import anchorItem from "./anchor-item.vue";
import classItem from "./class-item.vue";
import treeMenuDivider from "./tree-menu-divider.vue";

export default defineComponent({
    name: "tree-menu",
    props: {
        menuItems: {
            type: Object as PropType<TreeMenuParams>,
            required: true,
        },
        isMainParent: {
            type: Boolean,
        },
        color: {
            type: String,
            default: "secondary",
        },
    },
    data() {
        return {
            menuIsOpen: false,
        };
    },
    components: {
        switchItem,
        toggleItem,
        anchorItem,
        mainItem,
        classItem,
        treeMenuDivider,
    },
    emits: {
        menuStateChange: (state: boolean) => Boolean,
        closeAll: (state: boolean) => Boolean,
    },
    computed: {
        menuState() {
            return 1;
        },
        mainItems(): TreeMenuMainItems[] {
            const res = this.menuItems.filter(
                (item) => item.type === TreeMenuItemsType.mainItem
            ) as TreeMenuMainItems[];
            return res;
        },
        switchItems(): TreeMenuSwitchItems[] {
            const res = this.menuItems.filter(
                (item) => item.type === TreeMenuItemsType.switchItem
            ) as TreeMenuSwitchItems[];
            return res;
        },
        toggleItems(): TreeMenuToggleItems[] {
            const res = this.menuItems.filter(
                (item) => item.type === TreeMenuItemsType.toggleItem
            ) as TreeMenuToggleItems[];
            return res;
        },
        anchor(): Anchor[] {
            const res = this.menuItems.filter(
                (item) => item.type === TreeMenuItemsType.anchor
            ) as Anchor[];
            return res;
        },
    },
    methods: {
        checkMenuItemType(
            item:
                | TreeMenuMainItems
                | TreeMenuSwitchItems
                | TreeMenuToggleItems
                | Anchor
                | TreeMenuClassItem
                | Divider
        ) {
            switch (item.type) {
                case TreeMenuItemsType.mainItem:
                    return "mainItem";
                case TreeMenuItemsType.switchItem:
                    return "switchItem";
                case TreeMenuItemsType.toggleItem:
                    return "toggleItem";
                case TreeMenuItemsType.anchor:
                    return "anchorItem";
                case TreeMenuItemsType.classItem:
                    return "classItem";
                case TreeMenuItemsType.divider:
                    return "treeMenuDivider";

                default:
                    return "";
            }
        },
        chainEmit() {
            this.menuIsOpen = false;
            if (!this.isMainParent) {
                this.$emit("closeAll", false);
                return;
            }
            this.$emit("menuStateChange", false);
        },
    },
    watch: {
        menuIsOpen() {
            this.$emit("menuStateChange", this.menuIsOpen);
        },
    },
});
</script>

<style></style>
