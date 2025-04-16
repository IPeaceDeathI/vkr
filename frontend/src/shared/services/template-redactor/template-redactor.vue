<template>
    <draggable-card width="440" v-model="show">
        <redactor-toolbar
            title="Задайте параметры для шаблона"
            @close-click="show = false"
            :spacer="false"
        />
        <div v-if="!createNew && loadingTemplateInfo">
            Загружается инфа о шаблоне...
        </div>
        <v-form
            @submit.prevent
            ref="form"
            class="pa-4"
            :disabled="!createNew && loadingTemplateInfo"
        >
            <v-text-field
                label="Название"
                variant="outlined"
                v-model="name"
                :counter="20"
                :hide-details="false"
                :rules="[rules.required, rules.nameRules]"
            />
            <v-text-field
                class="mt-2"
                label="Бандл проекта"
                variant="outlined"
                v-model="bundle"
                readonly
                :hide-details="false"
                :rules="[rules.required]"
            >
                <template #append>
                    <v-btn
                        variant="flat"
                        color="error"
                        class="mr-2"
                        icon
                        @click="setCurrentProjectFromBundle"
                    >
                        <v-icon
                            class="mdi-rotate-180"
                            icon="mdi-upload-multiple"
                        />
                        <v-tooltip
                            activator="parent"
                            text="Посмотреть на текущей странице"
                        />
                    </v-btn>
                    <v-btn
                        variant="flat"
                        color="editor"
                        icon
                        @click="setBundleFromCurrentProject"
                    >
                        <v-icon icon="mdi-upload-multiple" />
                        <v-tooltip
                            activator="parent"
                            text="Вставить бандл текущего проекта"
                        />
                    </v-btn>
                </template>
            </v-text-field>
            <v-file-input
                :loading="loadPhoto"
                class="mt-2"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                variant="outlined"
                v-model="filePhoto"
                label="Загрузить фото шаблона"
                :hide-details="false"
                :error-messages="loadingPhotoError"
            />
            <v-text-field
                :loading="loadPhoto"
                density="compact"
                variant="outlined"
                class="mt-2"
                label="Ссылка на фото шаблона"
                v-model="preview"
                placeholder="Ссылка"
                :hide-details="false"
                :rules="[rules.required, rules.previewRule]"
            />
            <v-select
                v-model="categories"
                class="mt-2"
                :loading="DBcategories === null"
                label="Категории шаблона"
                variant="outlined"
                :items="DBcategories ?? []"
                item-title="name"
                item-value="category_id"
                :hide-details="false"
                multiple
                :rules="[rules.required]"
            />
            <v-checkbox
                disabled
                label="Активировать шаблон"
                v-model="status"
                color="editor"
            />
            <div class="d-flex mt-2">
                <v-btn
                    @click="importForm"
                    :loading="isLoading"
                    class="flex-grow-1 mr-2"
                    prepend-icon="mdi-file-import-outline"
                    color="warning"
                    variant="flat"
                >
                    Импортировать
                    <v-tooltip
                        activator="parent"
                        text="Загрузить из буфера обмена"
                    />
                </v-btn>
                <v-btn
                    @click="exportForm"
                    :loading="isLoading"
                    prepend-icon="mdi-file-export-outline"
                    class="flex-grow-1"
                    color="editor"
                    variant="flat"
                >
                    Экспортировать
                    <v-tooltip
                        activator="parent"
                        text="Сохранить в буфер обмена"
                    />
                </v-btn>
            </div>
            <v-btn
                v-if="$store.getters['user/getIsAdmin'] && createNew"
                @click="publish"
                :loading="isLoading"
                block
                prepend-icon="mdi-cloud-upload-outline"
                class="mt-2"
                color="success"
                variant="flat"
                text="Опубликовать"
            />
            <div
                v-if="$store.getters['user/getIsAdmin'] && !createNew"
                class="d-flex mt-2"
            >
                <v-btn
                    @click="deleteTemplate"
                    :loading="isLoading"
                    class="flex-grow-1 mr-2"
                    prepend-icon="mdi-delete"
                    color="error"
                    variant="flat"
                >
                    Удалить
                    <v-tooltip activator="parent" text="Удалить из БД" />
                </v-btn>
                <v-btn
                    @click="updateTemplate"
                    :loading="isLoading"
                    prepend-icon="mdi-refresh"
                    class="flex-grow-1"
                    color="success"
                    variant="flat"
                >
                    Изменить
                    <v-tooltip
                        activator="parent"
                        text="Изменить информацию о шаблоне"
                    />
                </v-btn>
            </div>
        </v-form>
    </draggable-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { draggableCard, redactorToolbar } from "@/features/structure";
import { BundleCollector, BundleUncollector } from "@/entities";
import { NotificationService } from "../notification_service/NotificationService";
import { TemplateSchema } from "@/shared/api/models";
import { z } from "zod";
import { TemplateCategoriesModel } from "@/models/TemplateCategories";
import { ImagesModel } from "@/models";
import { TemplateModel } from "@/models/Template";
type TemplateBundle = z.infer<typeof TemplateSchema>;
type TemplateCategory = {
    name: string;
    created_at: string;
    updated_at: string;
    category_id: number;
};
export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        createNew: {
            type: Boolean,
            default: true,
        },
        id: {
            type: Number,
        },
    },
    emits: {
        "update:modelValue": (value: boolean) => true,
    },
    components: {
        draggableCard,
        redactorToolbar,
    },
    data() {
        return {
            isLoading: false,
            name: "Мой шаблон" as string,
            bundle: "" as string,
            categories: [] as Array<number>,
            preview: "",
            filePhoto: undefined,
            status: 1 as 0 | 1,
            rules: {
                required: (value: any) => {
                    if (Array.isArray(value)) {
                        return (
                            value.length > 0 ||
                            "Поля обязательно для заполнения"
                        );
                    }
                    return !!value || "Поля обязательно для заполнения";
                },
                nameRules: (value: string) => {
                    if (value.length > 20)
                        return "Название шаблона не должно превышать 20 символов";
                    return true;
                },
                previewRule: (value: string) => {
                    try {
                        z.string().url().parse(value);
                        return true;
                    } catch (error) {
                        return "Поле должно быть заполненно валидной ссылкой";
                    }
                },
            },

            loadPhoto: false,
            loadingPhotoError: "",
            DBcategories: null as null | TemplateCategory[],

            // if edit mode
            templateId: null as null | number,
            loadingTemplateInfo: true,
        };
    },
    created() {
        TemplateCategoriesModel.get().then((categories) => {
            this.DBcategories = categories;
        });
        this.updateTemplateInfo();
    },

    computed: {
        show: {
            get(): boolean {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:modelValue", value);
            },
        },
    },
    methods: {
        updateTemplateInfo() {
            if (!this.createNew && this.id !== undefined) {
                TemplateModel.get(this.id)
                    .then((templateInfo) => {
                        const categoriesTmp = templateInfo.categories.map(
                            (category) => {
                                return category.category_id;
                            }
                        );
                        this.uncollectTemplateBundle({
                            ...templateInfo,
                            ...{ categories: categoriesTmp },
                        });
                        this.loadingTemplateInfo = false;
                    })
                    .catch((error) => {
                        NotificationService.common().error({
                            text: "При загрузке шаблона произошла ошибка(смотри консоль) ",
                        });
                        console.error(error);
                    });
            }
        },
        async publish() {
            if (!this.createNew) return;
            this.isLoading = true;
            const form = this.$refs.form as any;
            const { valid } = await form.validate();
            if (valid === false) {
                this.isLoading = false;
                return;
            }
            try {
                await TemplateModel.addNew(this.collectTemplateBundle());
                NotificationService.common().success({
                    text: "Шаблон добавлен",
                });
            } catch (error) {
                NotificationService.common().error({
                    text: "Во время создания шаблона возникла ошибка",
                });
            }
            this.isLoading = false;
        },
        async exportForm() {
            this.isLoading = true;
            const form = this.$refs.form as any;
            const { valid } = await form.validate();
            if (valid === false) {
                this.isLoading = false;
                return;
            }
            try {
                await navigator.clipboard.writeText(
                    JSON.stringify(this.collectTemplateBundle())
                );
                NotificationService.common().success({
                    text: "Скопровано в буфер обмена",
                });
            } catch (error) {
                NotificationService.common().error({
                    text: "Во время экспорта шаблона возникла ошибка",
                });
            }
            this.isLoading = false;
        },
        async importForm() {
            this.isLoading = true;
            try {
                this.uncollectTemplateBundle(
                    TemplateSchema.parse(
                        JSON.parse(await navigator.clipboard.readText())
                    )
                );
                NotificationService.common().success({
                    text: "Шаблон удачно импортирован",
                });
            } catch (error) {
                NotificationService.common().error({
                    text: "Во время импорта шаблона возникла ошибка " + error,
                });
                console.error(error);
            }
            this.isLoading = false;
        },
        setBundleFromCurrentProject() {
            this.bundle = JSON.stringify(
                BundleCollector.collectProject(this.$store)
            );
            NotificationService.common().success({
                text: "Проект успешно скомпилирован в бандл",
            });
        },
        async setCurrentProjectFromBundle() {
            NotificationService.important().info({
                titleText: "ВНИМАНИЕ",
                mainText:
                    "Вы уверены, что хотите заменить текущих проект на указанный бандл? Это заменит все текущие блоки, окна и выбранные шрифты на странице! Советуем сохранить страницу перед этим действием.",
                agreeBtn: {
                    text: "Да",
                    fn: () => {
                        const currentBundle = BundleCollector.collectProject(
                            this.$store
                        );
                        try {
                            this.$store.state.project.loadProject(
                                JSON.parse(this.bundle)
                            );
                        } catch (error) {
                            try {
                                this.$store.state.project.loadProject(
                                    currentBundle
                                );
                                NotificationService.common().error({
                                    delay: 3000,
                                    text: "Во время рендера пакета возникла ошибка. И мы вернули прошлый проект",
                                });
                            } catch (error) {
                                NotificationService.important().error({
                                    mainText:
                                        "Во время рендера пакета возникли ошибки. Перезагрузить страницу?",
                                    agreeBtn: {
                                        text: "Да",
                                        fn: () => {
                                            location.reload();
                                        },
                                    },
                                    disagreeBtn: {
                                        text: "Дв",
                                        fn: () => {
                                            location.reload();
                                        },
                                    },
                                });
                            }
                        }
                    },
                },
                disagreeBtn: {
                    text: "Нет",
                    fn: () => {
                        return;
                    },
                },
            });
        },
        async updateTemplate() {
            if (this.id === undefined) {
                this.callCommonError("Yе указан id");
                return;
            }
            try {
                await TemplateModel.edit(this.id, this.collectTemplateBundle());
                NotificationService.common().success({
                    text: "Шаблон успешно обновлен",
                });
            } catch (error) {
                this.callCommonError(error);
            }
        },
        async deleteTemplate() {
            if (this.id === undefined) {
                this.callCommonError("Yе указан id");
                return;
            }
            try {
                await TemplateModel.delete(this.id);
                NotificationService.common().success({
                    text: "Шаблон успешно удален",
                });
            } catch (error) {
                this.callCommonError(error);
            }
        },
        callCommonError(error: any) {
            console.error(error);
            NotificationService.common().error({
                text: "Произошла ошибка(смотри консоль) ",
            });
        },
        collectTemplateBundle(): TemplateBundle {
            return {
                name: this.name,
                status: this.status,
                preview_url: this.preview,
                categories: this.categories,
                structure: this.bundle,
                last_structure: null,
            };
        },
        uncollectTemplateBundle(value: TemplateBundle) {
            this.name = value.name;
            this.status =
                value.status === 0 || value.status === 1 ? value.status : 1;
            this.preview = value.preview_url ?? "";
            this.categories = value.categories;
            this.bundle = value.structure ?? "";
        },
    },
    watch: {
        filePhoto(value: File[]) {
            this.loadingPhotoError = "";
            if (value[0]) {
                this.loadPhoto = true;
                ImagesModel.getImage(value)
                    .then((data) => {
                        this.preview = data.result[0].src;
                    })
                    .catch(() => {
                        this.loadingPhotoError = `Возникла ошибка при загрузке фото`;
                    })
                    .finally(() => {
                        this.loadPhoto = false;
                    });
            } else {
                this.preview = "";
            }
        },
        id() {
            this.updateTemplateInfo();
        },
    },
});
</script>

<style scoped></style>
