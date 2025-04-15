<template>
    <v-dialog width="1000" eager v-model="show">
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-redactor-toolbar
                    color="primary"
                    density="comfortable"
                    style="border-bottom: 1px solid rgba(48, 52, 59, 0.1)"
                >
                    <v-btn-toggle v-model="curTab">
                        <v-btn value="styles"> Каталог блоков</v-btn>
                        <v-btn value="targets" disabled> Шаблоны </v-btn>
                        <v-btn value="а" disabled> Cвоободные блоки </v-btn>
                        <v-btn value="а1" disabled> Избранное </v-btn>
                        <v-btn value="global" disabled>
                            Глобальные блоки
                        </v-btn>
                    </v-btn-toggle>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="addEmptyCards"
                        v-if="$store.getters['user/getIsAdmin']"
                    >
                        Создать пустые карточки
                    </v-btn>
                    <v-btn
                        @click="addEmptyColumns"
                        v-if="$store.getters['user/getIsAdmin']"
                    >
                        Создать пустые колонки
                    </v-btn>
                    <v-btn size="small" icon @click="isActive.value = false">
                        <v-icon size="x-large" color="editor-lighten-1"
                            >mdi-close</v-icon
                        >
                    </v-btn>
                </v-redactor-toolbar>
                <v-layout
                    style="width: 100%; height: 500px"
                    v-if="curTab === 'styles'"
                >
                    <v-col class="pa-0" cols="3">
                        <div
                            class="scrollable"
                            style="height: calc(100% - 20px); overflow-y: auto"
                        >
                            <v-navigation-list mandatory>
                                <v-list-item
                                    v-for="category in categories"
                                    :key="category.id"
                                    :value="category.index"
                                    :title="category.name"
                                    :active="curCategory === category.id"
                                    @click="
                                        scrollToCategory(
                                            category.index,
                                            category.id
                                        )
                                    "
                                >
                                </v-list-item>
                            </v-navigation-list>
                        </div>
                    </v-col>
                    <v-col cols="9">
                        <v-container
                            fluid
                            style="width: 100%; height: calc(100% - 20px)"
                            data-noks-interSection
                        >
                            <div
                                class="scrollable categories"
                                style="
                                    height: 100%;
                                    overflow-y: auto;
                                    position: relative;
                                "
                            >
                                <v-sheet
                                    v-for="category in categories"
                                    :key="category.id"
                                >
                                    <!-- <div ref="categories">
                                        <category-c
                                            :name="category.name"
                                            :icon="category.icon"
                                            :index="category.id"
                                            :blocks="category.blocks"
                                            :observable="observable"
                                            @categoryScrolled="changeCategory"
                                            @categoryIntoView="
                                                getBlocksByCategories
                                            "
                                            @blockSelected="selectBlock"
                                        >
                                        </category-c>
                                    </div> -->
                                    <div ref="categories">
                                        <category-c
                                            :name="category.name"
                                            :icon="category.icon"
                                            :index="category.id"
                                            :blocks="category.blocks"
                                            :observable="observable"
                                            @categoryScrolled="changeCategory"
                                            @blockSelected="selectBlock"
                                        >
                                        </category-c>
                                    </div>
                                </v-sheet>
                            </div>
                        </v-container>
                    </v-col>
                </v-layout>
            </v-card>
        </template>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import categoryC from "./category-c.vue";
import { BlocksModel } from "@/models/Block";
import { ShortBlockData } from "@/shared/api/models/Block";
import { NotificationService } from "../notification_service/NotificationService";
import {
    getEmptyBlockBundle,
    getEmptyBlockColumnBundle,
    getEmptyBlockCardsBundle,
} from "./mock-data";
import { BundleUncollector } from "@/entities";
import { CategoriesModel } from "@/models";
import { BlockBundle, BlockParams } from "@/types";
import { Block } from "../elements_fabrics/block";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const scrollIntoView = require("scroll-into-view");

interface Category {
    id: number;
    name: string;
    icon: string;
    index: string;
    blocks: Array<ShortBlockData>;
}

export default defineComponent({
    components: {
        categoryC,
        // redactorToolbar
    },
    data() {
        return {
            domain: "http://localhost:80/",
            curTab: "styles" as string,
            curCategory: 0 as number,
            blocks: [] as Array<ShortBlockData>,
            observable: true,
            isDev: process.env.VUE_APP_NOKS_BUILD !== "true",
            scrollCache: 0,
            show: false,
            callback: (blockParams: BlockBundle) => {
                return;
            },
            icons: [
                "mdi-plus-box-outline",
                "mdi-archive-arrow-up-outline",
                "mdi-page-layout-header",
                "mdi-circle-double",
            ] as Array<string>,
            categories: [] as Array<Category>,
            globalCategory: [] as Array<ShortBlockData>,
        };
    },
    emits: {
        blockSelected(value: number) {
            return true;
        },
        "update:model-value": function (val: boolean) {
            return true;
        },
    },
    methods: {
        async selectBlock(blockId: number) {
            try {
                await BlocksModel.getBlockById(blockId).then((block) => {
                    this.callback(
                        block.items[0].structure
                            ? JSON.parse(block.items[0].structure)
                            : getEmptyBlockBundle()
                    );
                    // BundleUncollector.uncollectBlock(
                    //     this.$store,
                    //     block.items[0].structure
                    //         ? JSON.parse(block.items[0].structure)
                    //         : getEmptyBlockBundle(),
                    //     this.$store.getters["structure/getBlockAreaId"]
                    // );
                });
                this.show = false;
            } catch {
                NotificationService.common().error({
                    text: "Не удалось создать блок!",
                    delay: 3000,
                });
            }
        },
        scrollToCategory(index: string, id: number) {
            const refs = this.$refs as any;
            this.observable = false;
            scrollIntoView(
                refs.categories[index],
                {
                    time: 200,
                    align: {
                        top: 0,
                        left: 0,
                        topOffset: -1,
                        leftOffset: 0,
                        lockX: true,
                        lockY: false,
                    },
                },
                () => {
                    this.observable = true;
                }
            );
            this.changeCategory(id);
        },
        changeCategory(index: number) {
            this.curCategory = index;
        },
        getBlocksByCategories(index: number) {
            //TODO
            const category = this.categories.find(
                (category) => category.id === index
            );
            if (category?.blocks.length === 0) {
                BlocksModel.getAllShort({ category_id: [category.id] }).then(
                    (shorts) => (category.blocks = shorts.items)
                );
            }
        },
        fillCategoties() {
            BlocksModel.getAllShort({}).then((shorts) => {
                this.categories.forEach((category) => {
                    category.blocks = shorts.items.filter((short) =>
                        short.categories
                            .map((el) => el.id)
                            .includes(category.id)
                    );
                });
            });
        },
        getGlobalBlocks() {
            BlocksModel.getAllShort().then(
                (shorts) => (this.globalCategory = shorts.items)
            );
        },
        addEmptyCards() {
            BlocksModel.addBlock({
                name: "Пустые карточки",
                category_id: [1],
                structure: JSON.stringify(getEmptyBlockCardsBundle()),
            }).then((data) => {
                this.addNewBlockData(data);
            });
        },
        addEmptyColumns() {
            BlocksModel.addBlock({
                name: "Пустые колонки",
                category_id: [1],
                structure: JSON.stringify(getEmptyBlockColumnBundle()),
                preview_src:
                    "https://noks-d1.ru/files/2311/09/PPXrx_columns.png",
            }).then((data) => {
                this.addNewBlockData(data);
            });
        },
        updateBlockData(blockId: number) {
            BlocksModel.getShortById(blockId).then((value) => {
                const block = value.items;
                this.categories
                    .filter((category) =>
                        block[0].categories.some(
                            (item) => category.id === item.id
                        )
                    )
                    .forEach((category) => {
                        const index = category.blocks.findIndex(
                            (block) => block.id === blockId
                        );

                        category.blocks[index] = block[0];
                    });
            });
        },
        addNewBlockData(blockId: number) {
            BlocksModel.getShortById(blockId).then((value) => {
                const block = value.items;
                this.categories
                    .filter((category) =>
                        block[0].categories.some(
                            (item) => category.id === item.id
                        )
                    )
                    .forEach((category) => {
                        category.blocks.push(block[0]);
                    });
            });
        },
        open(callback: (blockParams: BlockBundle) => void) {
            this.callback = callback;
            this.show = true;
        },
    },
    watch: {
        show(value: boolean) {
            const categoriesContainer = document.querySelector(
                ".scrollable.categories"
            );
            const cachedCategory = this.curCategory;

            if (value) {
                setTimeout(() => {
                    const categoriesContainer = document.querySelector(
                        ".scrollable.categories"
                    );
                    if (this.scrollCache !== 0) {
                        categoriesContainer?.scroll({
                            top: this.scrollCache,
                        });
                        setTimeout(() => {
                            this.curCategory = cachedCategory;
                        }, 0);
                    }
                }, 0);
            } else {
                this.scrollCache = categoriesContainer?.scrollTop || 0;
            }
        },
    },
    mounted() {
        // BlocksModel.addBlock({ name: "name", category_id: [1] });
        this.getGlobalBlocks();
        this.$store.dispatch("user/UPDATE_ADMIN", true);
    },
    created() {
        CategoriesModel.getAllCategories().then((categories) => {
            categories.forEach((category, index) => {
                this.categories.push({
                    id: category.category_id,
                    name: category.category_name,
                    index: String(index),
                    icon: this.icons[index] || "mdi-circle-double",
                    blocks: [],
                });
            });
            this.fillCategoties();
        });
    },
});
</script>
<style>
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
</style>
