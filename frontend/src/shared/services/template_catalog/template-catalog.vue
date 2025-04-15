<template>
    <v-dialog
        v-model="show"
        transition="dialog-bottom-transition"
        :scrim="false"
        fullscreen
    >
        <v-toolbar dark color="editor">
            <v-toolbar-title
                :style="{
                    'font-size': '1.5rem !important',
                    'font-weight': 400,
                    'line-height': '2rem',
                    'letter-spacing': 'normal !important',
                }"
            >
                Выберите шаблон
            </v-toolbar-title>
            <v-btn icon dark @click="$store.commit('project/SET_EMPTY', false)">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-sheet class="template-catalog__card-wrapper">
            <v-progress-circular
                v-if="isLoading"
                indeterminate
                :size="100"
                color="grey-lighten-5"
            />
            <template v-else>
                <template-card
                    name="Пустой шаблон"
                    :preview_src="emptyTemplateSrc"
                    @select="$store.commit('project/SET_EMPTY', false)"
                />
                <template-card
                    v-for="template in templates"
                    :key="template.template_id"
                    :name="template.name"
                    :editable="true"
                    :preview_src="template.preview_url ?? ''"
                    @select="select(template.template_id)"
                    @edit="edit(template.template_id)"
                />
            </template>
        </v-sheet>
    </v-dialog>
    <template-redactor
        v-model="openTemplateRedactor"
        :createNew="false"
        :id="editingId"
    />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import templateCard from "./template-card.vue";
import { TemplateModel } from "@/models/Template";
import { BundleUncollector } from "@/entities";
import { NotificationService } from "../notification_service/NotificationService";
import { templateRedactor } from "../template-redactor";
type Template = {
    name: string;
    template_id: number;
    preview_url: string | null;
};
export default defineComponent({
    components: {
        templateCard,
        templateRedactor,
    },
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
    },
    emits: {
        "update:modelValue": (value: boolean) => true,
    },
    data() {
        return {
            templates: [] as Array<Template>,
            isLoading: true,
            editingId: undefined as undefined | number,
            openTemplateRedactor: false,
            loadingSvg: `url(${process.env.BASE_URL}svg/animated/rolling.svg)`,
            emptyTemplateSrc: `${process.env.BASE_URL}images/empty-template-preview.png`,
        };
    },
    created() {
        this.updateTemplates();
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
        updateTemplates() {
            this.isLoading = true;
            TemplateModel.getAll({
                full: false,
                limit: 1000000,
                page: 0,
            })
                .then((response) => {
                    this.templates = response.items;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        async select(template_id: number) {
            this.isLoading = true;
            try {
                const template = await TemplateModel.get(template_id);
                if (template.structure !== null) {
                    await BundleUncollector.uncollectProject(
                        this.$store,
                        JSON.parse(template.structure)
                    );
                    this.$store.state.project.loadProject(
                        JSON.parse(template.structure)
                    );
                } else {
                    NotificationService.common().error({
                        text: "Шаблон пустой",
                    });
                }
                // eslint-disable-next-line
                // ym(94237288, "reachGoal", "selectTemplate"); // ВЫДАЕТ ОШИБКУ НИЖЕ (СТРОКА 135)
            } catch (error) {
                console.error(error);
                NotificationService.common().error({
                    text: "Во время зашрузки шаблона произошла ошибка",
                });
            }
            this.isLoading = false;
        },
        edit(template_id: number) {
            this.editingId = template_id;
            this.openTemplateRedactor = true;
        },
    },
});
</script>

<style>
.template-catalog__card-wrapper {
    padding: 2rem;
    display: flex;
    flex-wrap: wrap;
    min-height: calc(100% - 63px) !important;
    gap: 2rem;
    align-content: flex-start;
    justify-content: center;
}
.template-catalog__card-wrapper_loading {
    background-position: center;
    background-size: 20%;
    background-image: v-bind(loadingSvg);
}
</style>
