<template>
    <div
        class="noks-zone-toolbar"
        v-if="store.getters['environment/isEditable']"
        :style="menuIsOpen ? 'display: flex' : ''"
    >
        <v-element-toolbar color="editor" style="width: 102px">
            <v-toolbar-items-small>
                <v-btn data-noks-drag-zone>
                    <v-icon> mdi-drag-variant</v-icon>
                    <v-tooltip>Переместить</v-tooltip>
                </v-btn>
                <v-btn @click="emit('onClone')">
                    <v-icon> mdi-content-copy</v-icon>
                    <v-tooltip>Дублировать</v-tooltip>
                </v-btn>
                <v-btn @click="showRedactor = true">
                    <v-icon> mdi-cog</v-icon>
                    <v-tooltip>Настройки</v-tooltip>
                </v-btn>
                <v-btn :active="menuIsOpen">
                    <v-icon>mdi-dots-horizontal</v-icon>
                    <v-tooltip :disabled="menuIsOpen" location="bottom"
                        >Больше опций</v-tooltip
                    >
                    <tree-menu
                        :menu-items="items"
                        @menuStateChange="changeMenuState"
                        :is-main-parent="false"
                    />
                </v-btn>
            </v-toolbar-items-small>
        </v-element-toolbar>
    </div>
    <zone-redactor
        :model-value="showRedactor"
        :zone-params="zoneParams"
        :parent-selector="parentSelector"
        @applyStylesToAllZones="emit('applyStylesToAllZones', $event)"
        @contrastColor="emit('contrastColor', $event)"
        @update:model-value="
            (value: boolean) => {
                showRedactor = value;
            }
        "
        @update:zone-params="emit('update:zone-params', $event)"
    />
</template>
<script setup lang="ts">
import { zoneRedactor } from "../../redactors";
import { defineProps, defineEmits, toRefs, computed, ref } from "vue";
import { useStore } from "@/app/providers";
import {
    BlockTitleParams,
    CardParams,
    CardStylesParams,
    ColumnParams,
    ContrastColor,
    ZoneStylesParams,
} from "@/types";
import {
    ClassSubitem,
    TreeMenuItemsType,
    TreeMenuParams,
} from "@/shared/libs/tree-menu/types";
import { treeMenu } from "@/shared/libs/tree-menu";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
type Props = {
    parentSelector: HTMLElement | null;
    zoneParams: Omit<CardParams | ColumnParams, "parentId" | "childrenIds">;
};
const props = defineProps<Props>();

const { zoneParams, parentSelector } = toRefs(props);

type Emits = {
    onClone: [];
    onDelete: [];
    contrastColor: [value: ContrastColor];
    applyStylesToAllZones: [value: ZoneStylesParams];
    "update:zone-params": [
        Omit<
            BlockTitleParams | CardParams | ColumnParams,
            "parentId" | "childrenIds"
        >
    ];
};
const emit = defineEmits<Emits>();

const showRedactor = ref<boolean>(false);
const menuIsOpen = ref<boolean>(false);
const firstClass = ref<string>("");
const classesList = ref<Array<string>>([""]);

const store = useStore();

const updateZoneParams = (
    params: Omit<CardParams | ColumnParams, "parentId" | "childrenIds">
) => {
    emit("update:zone-params", params);
};
const changeMenuState = (state: boolean) => {
    menuIsOpen.value = state;
};
const classSubItems = computed(() => {
    const res = [] as ClassSubitem[];
    if (itemClasses.value) {
        itemClasses.value.forEach((item) => {
            res.push({
                title: item,
                deleteFn: () => {
                    parentSelector.value?.classList.remove(item);
                    classesList.value.splice(
                        classesList.value.indexOf(item),
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
});
const itemClasses = computed(() => {
    return classesList.value;
});
const items = computed<TreeMenuParams>(() => {
    const tmp: TreeMenuParams = [
        {
            type: TreeMenuItemsType.mainItem,
            icon: "mdi-delete",
            title: "Удалить",
            closeAllMenu: true,
            callBackFn: async () => {
                emit("onDelete");
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
                title: firstClass.value,
                addFn: (value: string) => {
                    if (value.includes(" ")) {
                        if (value.indexOf(" ") == 0) return;
                        value = value.substring(0, value.indexOf(" "));
                    }
                    if (!itemClasses.value.includes(value)) {
                        parentSelector.value?.classList.add(value);
                        classesList.value.push(value);
                    }
                },
            },
            subitems: classSubItems.value,
        },
        // DEVELOP
        // {
        //     type: TreeMenuItemsType.toggleItem,
        //     title: "Видимость на устройстве",
        //     buttons: visibilityButton,
        //     current: currentVisability,
        // },
    ];
    return tmp;
});
</script>
<style lang="scss" scoped>
[data-noks-drag-zone] {
    cursor: move;
}
.toolbar-btn {
    cursor: pointer;
}
</style>
