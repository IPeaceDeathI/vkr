<!-- TODO добавить несколько API c иконками -->
<template>
    <v-dialog
        attach="[noks-attach-dialog-target]"
        transition="scale-transition"
        v-model="show"
        width="500px"
    >
        <v-card
            rounded="5px"
            style="
                height: 560px;
                width: 500px;
                max-width: 1112px;
                max-height: 560px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-50%) translateY(-50%);
            "
        >
            <v-toolbar
                class="movable"
                color="primary"
                density="comfortable"
                style="border-bottom: 1px solid rgba(48, 52, 59, 0.1)"
            >
                <v-toolbar-title class="text-subtitle-1"
                    >Каталог иконок</v-toolbar-title
                >

                <v-spacer></v-spacer>

                <v-btn
                    size="small"
                    icon
                    @click="$emit('update:model-value', false)"
                >
                    <v-icon size="x-large" color="editor-lighten-1"
                        >mdi-close</v-icon
                    >
                </v-btn>
            </v-toolbar>
            <v-layout style="width: 100%; height: 500px">
                <v-navigation-drawer permanent class="pos-relat">
                    <v-list color="editor" mandatory style="height: 100%">
                        <div
                            class="scrollable"
                            style="height: calc(100% - 20px); overflow-y: auto"
                        >
                            <v-list-subheader
                                title="Категории"
                                style="font-weight: 600"
                            ></v-list-subheader>
                            <v-list-item
                                v-for="category in categories"
                                :key="category.key"
                                :title="category.name"
                                :value="category.key"
                                class="list-item-title"
                                @click="changeCategory(category.key)"
                            ></v-list-item>
                        </div>
                    </v-list>
                </v-navigation-drawer>
                <v-main style="width: calc(100% - 170px); padding: 0">
                    <v-toolbar color="#ffffff" class="toolbar-for-search">
                        <v-text-field
                            label="Поиск иконок"
                            v-model="tag"
                            @click:append="iconRequest"
                            @click:clear="iconRequest"
                            @keyup="iconRequest"
                            clearable
                            variant="outlined"
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                            density="compact"
                        ></v-text-field>
                    </v-toolbar>

                    <v-select
                        variant="outlined"
                        v-model="variant"
                        class="toolbar-for-search"
                        item-text="title"
                        item-value="value"
                        :items="variants"
                        density="compact"
                        hide-details
                    ></v-select>
                    <v-divider
                        :thickness="10"
                        class="border-opacity-0"
                    ></v-divider>
                    <v-card :height="370" style="margin: 0px 22px">
                        <v-virtual-scroll
                            v-if="iconList.length !== 0"
                            :height="350"
                            :items="iconList"
                            item-height="44"
                            class="scrollable"
                        >
                            <template v-slot:default="{ item }">
                                <v-sheet style="padding: 0; display: flex">
                                    <template
                                        v-for="svg in item"
                                        :key="svg.path"
                                    >
                                        <div
                                            @click="selectIcon(svg.path)"
                                            style="position: relative"
                                            height="100%"
                                            width="100%"
                                        >
                                            <div
                                                class="iconSelectedinGallery"
                                                v-if="currentSvg === svg.path"
                                            ></div>

                                            <svg class="svg-icon">
                                                <use
                                                    :href="`${url}${svg.path}`"
                                                ></use>
                                            </svg>
                                        </div>
                                    </template>
                                </v-sheet>
                            </template>
                        </v-virtual-scroll>
                        <div v-else class="bad-request">
                            <span>Ничего не найдено</span>
                            <div
                                class="mdi mdi-emoticon-sad-outline"
                                style="font-size: 30px"
                            ></div>
                        </div>
                    </v-card>
                </v-main>
            </v-layout>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { iconService } from "./iconsService";
import { Category, IconData, Variant } from "./types";

export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
        },
    },
    emits: {
        iconSelected: (value: string) => true,
        "update:model-value": (value: boolean) => true,
    },
    data() {
        return {
            iconList: [] as IconData[][],
            currentSvg: "" as string,
            url: process.env.BASE_URL,
            limit: 3 as number,
            offset: 0 as number,
            category: "all" as Category,
            variant: "outlined" as string,
            tag: "" as string | null,
            items: ["hel", "vel", "pel"],
            variants: [
                { title: "Контурные", value: "outlined" },
                { title: "Закругленные края", value: "round" },
                { title: "Острые края", value: "sharp" },
                { title: "Заполненные", value: "filled" },
                { title: "Двухцветные", value: "two-tone" },
            ] as Variant[],
            categoriesList: {
                action: "Действие",
                maps: "Карта",
                search: "Поиск",
                editor: "Редактор",
                files: "Файл",
                social: "Социальное",
                home: "Дом",
                notifications: "Оповещение",
                devices: "Устройства",
                communication: "Общение",
                content: "Контент",
                places: "Места",
                av: "Аудио/Видео",
                photography: "Фотография",
                hardware: "Техника",
                alert: "Уведомление",
                toggle: "Переключение",
            },
            categoriesNames: [
                "Действие",
                "Карта",
                "Поиск",
                "Редактор",
                "Файл",
                "Социальное",
                "Дом",
                "Оповещение",
                "Устройства",
                "Общение",
                "Контент",
                "Места",
                "Аудио/Видео",
                "Фотография",
                "Техника",
                "Уведомление",
                "Переключение",
            ],
            categories: [
                {
                    name: "Все категории",
                    key: "all" as Category,
                },
                {
                    name: "Действие",
                    key: "action" as Category,
                },
                {
                    name: "Карта",
                    key: "maps" as Category,
                },
                {
                    name: "Поиск",
                    key: "search" as Category,
                },
                {
                    name: "Редактор",
                    key: "editor" as Category,
                },
                {
                    name: "Файл",
                    key: "files" as Category,
                },
                {
                    name: "Социальное",
                    key: "social" as Category,
                },
                {
                    name: "Дом",
                    key: "home" as Category,
                },
                {
                    name: "Оповещение",
                    key: "notifications" as Category,
                },
                {
                    name: "Устройства",
                    key: "devices" as Category,
                },
                {
                    name: "Общение",

                    key: "communication" as Category,
                },
                {
                    name: "Контент",
                    key: "content" as Category,
                },
                {
                    name: "Места",
                    key: "places" as Category,
                },
                {
                    name: "Аудио/Видео",
                    key: "av" as Category,
                },
                {
                    name: "Фотография",
                    key: "photography" as Category,
                },
                {
                    name: "Техника",
                    key: "hardware" as Category,
                },
                {
                    name: "Уведомление",
                    key: "alert" as Category,
                },
                {
                    name: "Переключение",
                    key: "toggle" as Category,
                },
            ],
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
        iconRequest() {
            this.iconList = [
                ...iconService.getByParams(
                    this.category,
                    this.variant,
                    this.tag
                ),
            ];
        },
        changeCategory(category: Category) {
            this.category = category;
            this.iconRequest();
        },
        changeCategoryToAll() {
            this.category = "all";
            this.iconRequest();
        },
        selectIcon(iconPath: string) {
            this.currentSvg = iconPath;
            this.$emit("iconSelected", `${this.url}${iconPath}`);
        },
    },
    mounted() {
        this.iconRequest();
    },
    watch: {
        variant() {
            this.iconRequest();
        },
    },
});
</script>
<style scoped>
.svg-icon {
    height: 44px;
    width: 44px;
    padding: 10px;
    position: relative;
}
.list-item-title {
    font-size: 13px !important;
    opacity: 0.7;
}
.pos-relat {
    position: relative !important;
    height: 100% !important;
    width: 170px !important;
}
.bad-request {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}
.toolbar-for-search {
    padding: 0 25px 0 20px;
}
.scrollable::-webkit-scrollbar,
.scrollable ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.scrollable::-webkit-scrollbar-button,
.scrollable ::-webkit-scrollbar-button {
    display: block;
    background-color: transparent;
    visibility: hidden;
    width: 1px;
    height: 1px;
}

.scrollable::-webkit-scrollbar-thumb,
.scrollable ::-webkit-scrollbar-thumb {
    background-color: rgba(68, 68, 68, 0.3);
    border-radius: 6px;
}

.scrollable::-webkit-scrollbar-track,
.scrollable ::-webkit-scrollbar-track {
    background: transparent;
    opacity: 0;
}
.iconSelectedinGallery {
    height: 100%;
    width: 100%;
    position: absolute;
}
.iconSelectedinGallery::before {
    content: "";
    position: absolute;
    left: 2px;
    top: 2px;
    border-radius: 5px;
    transition: 0.3s ease;
    background-color: #eaebeb;
    width: 40px;
    height: 40px;
}
.iconSelectedinGallery::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: #119a22;
    border: 3px solid #fff;
    right: -2px;
    top: -2px;
}

.movable {
    cursor: move;
}
</style>
