<template>
    <v-item-menu-toolbar
        v-if="$store.getters['environment/isEditable']"
        class="item-controls item-menu"
        v-show="selected"
    >
        <v-toolbar-items-small>
            <v-btn class="item-overlay-editor">
                <v-icon>mdi-drag-variant</v-icon>
                <v-tooltip>Переместить</v-tooltip>
            </v-btn>
            <v-btn :active="menuIsOpen">
                <v-icon>mdi-dots-horizontal</v-icon>
                <v-tooltip :disabled="menuIsOpen">Больше опций</v-tooltip>
                <tree-menu
                    :menu-items="items"
                    @menuStateChange="changeMenuState"
                />
            </v-btn>
        </v-toolbar-items-small>
    </v-item-menu-toolbar>
</template>
<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
import { treeMenu } from "@/shared/libs/tree-menu";
import {
    ClassSubitem,
    TreeMenuItemsType,
    TreeMenuParams,
} from "@/shared/libs/tree-menu/types";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";

export default defineComponent({
    props: {
        selected: {
            type: Boolean,
        },
        itemRef: {
            type: HTMLElement,
            required: true,
        },
    },
    emits: {
        onCopy: () => true,
        onPaste: () => true,
        onClone: () => true,
        onDelete: () => true,
    },
    components: {
        treeMenu,
    },
    data() {
        return {
            menuIsOpen: false,
            firstClass: "",
            classesList: [] as Array<string>,
        };
    },
    mounted() {
        setTimeout(() => {
            this.classesList = Array.from(this.itemRef.classList);
            this.firstClass = this.classesList.shift() ?? "";
        }, 0);
    },
    computed: {
        items(): TreeMenuParams {
            const items: TreeMenuParams = [
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-clipboard-arrow-up-outline",
                    title: "Копировать",
                    closeAllMenu: true,
                    callBackFn: async () => {
                        this.$emit("onCopy");
                    },
                    subItems: [],
                },
                {
                    type: TreeMenuItemsType.mainItem,
                    icon: "mdi-clipboard-arrow-down-outline",
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
                    title: "Дублировать",
                    closeAllMenu: true,
                    callBackFn: async () => {
                        this.$emit("onClone");
                    },
                    subItems: [],
                },
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
                    type: TreeMenuItemsType.classItem,
                    prependIcon: "mdi-code-tags",
                    title: "Класс элемента",
                    appendIcon: "",
                    tooltipText: "",
                    copyFn: (value: string) => {
                        console.log(value);
                    },
                    staticSubitem: {
                        title: this.firstClass,
                        addFn: (value: string) => {
                            if (value.includes(" ")) {
                                if (value.indexOf(" ") == 0) return;
                                value = value.substring(0, value.indexOf(" "));
                            }
                            if (!this.itemClasses.includes(value)) {
                                this.itemRef.classList.add(value);
                                this.classesList.push(value);
                            }
                        },
                    },
                    subitems: this.classSubItems,
                },
            ];
            return items;
        },
        classSubItems() {
            const res = [] as ClassSubitem[];
            if (this.itemClasses) {
                this.itemClasses.forEach((item) => {
                    res.push({
                        title: item,
                        deleteFn: () => {
                            this.itemRef.classList.remove(item);
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
        itemClasses() {
            return this.classesList;
        },
    },
    methods: {
        changeMenuState(state: boolean) {
            this.menuIsOpen = state;
        },
    },
});
</script>
<style lang="scss" scoped>
@import "@/shared/constants/index.scss";
</style>
