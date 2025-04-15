<template>
    <v-dialog width="1000" v-model="show" persistent>
        <v-sheet>
            <v-toolbar
                density="comfortable"
                color="primary"
                style="
                    border-bottom: 1px solid rgba(48, 52, 59, 0.1);
                    cursor: move;
                "
            >
                <v-spacer></v-spacer>
                <v-btn
                    icon="mdi-close"
                    @click.stop="close"
                    color="editor"
                    size="x-large"
                >
                </v-btn>
            </v-toolbar>
            <v-container class="block-redactor-containter">
                <v-label> Наименование </v-label>
                <v-text-field
                    density="compact"
                    variant="solo"
                    v-model="name"
                    title="name"
                    placeholder="Наименование"
                >
                </v-text-field>
                <v-label> Структура </v-label>
                <v-text-field
                    density="compact"
                    variant="solo"
                    v-model="structure"
                    title="structure"
                    placeholder="Структура"
                >
                </v-text-field>
                <v-label> Категории </v-label>
                <v-select
                    density="compact"
                    variant="solo"
                    v-model="category"
                    :items="
                        categories.map((category) => category.category_name)
                    "
                    label="Категории"
                    multiple
                ></v-select>
                <v-label> Изображение </v-label>
                <v-file-input
                    density="compact"
                    variant="solo"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Изображение для блока"
                    prepend-icon="mdi-camera"
                    v-model="photo"
                    label="Изображение для блока"
                ></v-file-input>
                <v-label> Ссылка на изображение </v-label>
                <v-text-field
                    density="compact"
                    variant="solo"
                    v-model="preview"
                    title="structure"
                    placeholder="Ссылка"
                >
                </v-text-field>
                <v-btn @click="submit" color="editor"> Готово </v-btn>
                <v-btn
                    v-if="block.id"
                    @click="deleteModal = true"
                    color="error"
                    variant="outlined"
                >
                    Удалить
                    <v-dialog v-model="deleteModal">
                        <!-- <div
                            class="d-flex align-center justify-center"
                            
                            colo
                        > -->
                        <div
                            color="editor"
                            width="50%"
                            class="d-flex justify-center align-center"
                        >
                            <v-card
                                class="d-flex justify-center align-center flex-column pa-2"
                            >
                                <div style="text-align: center">
                                    Вы уверены что хотите удалить блок
                                    {{ block.name }}?
                                </div>
                                <div>
                                    <v-btn
                                        color="error"
                                        variant="outlined"
                                        @click="deleteBlock"
                                        class="mr-2"
                                        flat
                                        >Да</v-btn
                                    >
                                    <v-btn
                                        color="editor-lighten-1"
                                        @click="deleteModal = false"
                                        >Нет</v-btn
                                    >
                                </div>
                            </v-card>
                        </div>
                        <!-- </div> -->
                    </v-dialog>
                </v-btn>
            </v-container>
        </v-sheet>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BlocksModel } from "@/models/Block";
import { BlockData, CategoriesData } from "@/shared/api/models";
import { BlockBundle } from "@/types";
import { getEmptyBlockBundle } from "../block-catalog/mock-data";
import { CategoriesModel, ImagesModel } from "@/models";

export default defineComponent({
    data() {
        return {
            show: false,
            name: "Блок",
            structure: undefined as any,
            category: [] as Array<string>,
            preview: "",
            photo: undefined,
            block: {} as BlockData,
            blockBundle: {} as BlockBundle,
            deleteModal: false,
            categories: [] as unknown as CategoriesData[],
            rules: [
                (value: Array<File>) => {
                    return (
                        !value ||
                        !value.length ||
                        value[0].size < 2000000 ||
                        "Изображение должно быть менее 2 MB!"
                    );
                },
            ],
        };
    },
    methods: {
        open(block: any) {
            if (block.blockParams) {
                this.blockBundle = block;
                this.structure = JSON.stringify(this.blockBundle);
            } else {
                this.block = block[0];
                this.name = this.block.name;
                this.structure = this.block.structure || getEmptyBlockBundle();
                this.category = this.block.categories.map((category) => {
                    return category.name;
                });
                this.preview =
                    this.block.preview_src ||
                    "https://noks-d1.ru/files/2311/02/x2dnb_empty_block.png";
            }

            this.show = true;
        },
        close() {
            this.name = "Блок";
            this.structure = "{}";
            this.category = [];
            this.preview = "";
            this.block = {} as BlockData;
            this.blockBundle = {} as BlockBundle;
            this.show = false;
        },
        postBlock(): Promise<number> {
            return BlocksModel.addBlock({
                name: this.name,
                structure:
                    this.structure || JSON.stringify(getEmptyBlockBundle()),
                category_id: this.categories
                    .filter((el) =>
                        this.category.some(
                            (category) => el.category_name === category
                        )
                    )
                    .map((el) => {
                        return el.category_id;
                    }),
                preview_src: this.preview,
            });
        },
        updateBlock(blockId: number) {
            BlocksModel.updateBlock(
                {
                    name: this.name,
                    structure:
                        this.structure || JSON.stringify(getEmptyBlockBundle()),
                    category_id: this.categories
                        .filter((el) =>
                            this.category.some(
                                (category) => el.category_name === category
                            )
                        )
                        .map((el) => {
                            return el.category_id;
                        }),
                    preview_src: this.preview,
                },
                blockId
            );
        },
        deleteBlock() {
            BlocksModel.deleteBlock(this.block.id).then(() => this.close());
        },
        submit() {
            if (this.blockBundle.blockParams) {
                console.log("Ne block post");
                this.postBlock();
                this.close();
            } else {
                console.log("block post");
                this.updateBlock(this.block.id);
                this.close();
            }
        },
    },
    watch: {
        photo(value: File[]) {
            if (value[0]) {
                ImagesModel.getImageResize(value).then((data) => {
                    this.preview = data.result[0].src;
                });
            }
        },
    },
    mounted() {
        CategoriesModel.getAllCategories().then((categories) => {
            this.categories = categories;
        });
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.block-redactor-containter {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
