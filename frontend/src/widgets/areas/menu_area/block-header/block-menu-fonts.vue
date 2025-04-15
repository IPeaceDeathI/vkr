<template>
    <draggable-dialog
        :model-value="show"
        transition="scale-transition"
        handle="v-toolbar"
        origin="top center"
        class="setting-menu"
    >
        <v-card
            class="noks-media-redactor redactor-page"
            elevation="12"
            width="395px"
            rounded="5px"
            color="editorBg"
        >
            <v-redactor-toolbar class="movable">
                <v-toolbar-title>ШРИФТЫ</v-toolbar-title>
                <v-spacer />
                <v-btn icon @click="closeFontsEditor">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-redactor-toolbar>
            <v-redactor-container>
                <v-row class="editorBg">
                    <v-switch
                        label="Переопределить шрифты для страницы"
                        v-model="toggleFonts"
                    />
                    <information-icon
                        :close-delay="200"
                        max-width="350"
                        text="Вы можете использовать шрифты общие для всех страниц или задать шрифты индивидуально для текущей страницы"
                        size="14"
                        :type="InformationIconType.question"
                        class="if-icon-media-redactor"
                    />
                </v-row>
                <div v-if="!toggleFonts" class="fonts-descr">
                    <div class="mt-2 mb-2">
                        На странице используются общие шрифты сайта
                    </div>
                    <v-card
                        title="Шрифты сайта:"
                        variant="tonal"
                        class="editorBg"
                    >
                        <v-card-text>
                            <p>
                                Заголовок —
                                {{
                                    $store.getters["environment/pageFonts"]
                                        .header1
                                }}
                            </p>
                            <p>
                                Подзаголовок —
                                {{
                                    $store.getters["environment/pageFonts"]
                                        .header2
                                }}
                            </p>
                            <p>
                                Текст —
                                {{
                                    $store.getters["environment/pageFonts"].text
                                }}
                            </p>
                            <p>
                                Цитата —
                                {{
                                    $store.getters["environment/pageFonts"]
                                        .quote
                                }}
                            </p>
                        </v-card-text>
                        <!-- <v-card-actions class="pl-0">
                            <blockButton
                                colorIcon="editor"
                                icon="mdi-briefcase-edit-outline"
                                label="Управление шрифтами"
                                navigateTo="/settings/fonts"
                            />
                            Переопределите их конкретно для этой страницы, чтобы
                            изменить ее шрифты.
                        </v-card-actions> -->
                    </v-card>
                </div>
                <div v-if="toggleFonts" class="fonts-settings mt-3 mb-3">
                    <div class="card-fonts mt-2 mb-2">
                        <div class="card-fonts-toolbar d-flex pt-1 pb-1">
                            <span class="fonts-title"
                                >Заголовок —
                                {{
                                    $store.getters["environment/pageFonts"]
                                        .header1
                                }}</span
                            >

                            <v-spacer />
                            <v-btn
                                icon="mdi-pencil"
                                size="x-small"
                                flat
                                @click="dialogFontsSearch1 = true"
                            />

                            <block-fonts-window
                                v-model="dialogFontsSearch1"
                                @font-changed="updateHeader1"
                            />
                        </div>
                        <div
                            class="card-fonts-content card-fonts-content-1 pt-2 pb-2"
                            :style="{
                                fontFamily:
                                    $store.getters['environment/pageFonts']
                                        .header1,
                            }"
                        >
                            Заголовок страницы
                        </div>
                    </div>
                    <div class="card-fonts">
                        <div class="card-fonts-toolbar d-flex pt-2 pb-1">
                            <span class="fonts-title"
                                >Подзаголовок —
                                {{
                                    $store.getters["environment/pageFonts"]
                                        .header2
                                }}</span
                            >

                            <v-spacer />
                            <v-btn
                                icon="mdi-pencil"
                                size="x-small"
                                flat
                                @click="dialogFontsSearch2 = true"
                            />

                            <block-fonts-window
                                v-model="dialogFontsSearch2"
                                @font-changed="updateHeader2"
                            />
                        </div>
                        <div
                            class="card-fonts-content card-fonts-content-2 pt-2 pb-2"
                            :style="{
                                fontFamily:
                                    $store.getters['environment/pageFonts']
                                        .header2,
                            }"
                        >
                            Подзаголовок страницы
                        </div>
                    </div>
                    <div class="card-fonts">
                        <div class="card-fonts-toolbar d-flex pt-2 pb-1">
                            <span class="fonts-title"
                                >Текст —
                                {{
                                    $store.getters["environment/pageFonts"].text
                                }}</span
                            >
                            <v-spacer />

                            <v-btn
                                icon="mdi-pencil"
                                size="x-small"
                                flat
                                @click="dialogFontsSearch3 = true"
                            />

                            <block-fonts-window
                                v-model="dialogFontsSearch3"
                                @font-changed="updateText"
                            />
                        </div>
                        <div
                            class="card-fonts-content card-fonts-content-3 pt-2 pb-2"
                            :style="{
                                fontFamily:
                                    $store.getters['environment/pageFonts']
                                        .text,
                            }"
                        >
                            Текст - будет отображаться в таком виде
                        </div>
                    </div>
                    <div class="card-fonts">
                        <div class="card-fonts-toolbar d-flex pt-2 pb-1">
                            <span class="fonts-title"
                                >Цитата —
                                {{
                                    $store.getters["environment/pageFonts"]
                                        .quote
                                }}</span
                            >
                            <v-spacer />
                            <v-btn
                                icon="mdi-pencil"
                                size="x-small"
                                flat
                                @click="dialogFontsSearch4 = true"
                            />

                            <block-fonts-window
                                v-model="dialogFontsSearch4"
                                @font-changed="updateQuote"
                            />
                        </div>
                        <!-- getFont($store.getters['environment/pageFonts'].quote) -->
                        <div
                            class="card-fonts-content card-fonts-content-4 pt-2 pb-2"
                            :style="{
                                fontFamily:
                                    $store.getters['environment/pageFonts']
                                        .quote,
                            }"
                        >
                            Цитата - короткая дословная выдержка из авторского
                            текста.
                        </div>
                    </div>
                </div>
            </v-redactor-container>
        </v-card>
    </draggable-dialog>
    <draggable-dialog
        :model-value="showFonts"
        activator="#menu-fonts"
        transition="scale-transition"
        handle="v-toolbar"
        origin="top center"
        class="setting-menu"
    >
        <v-card
            class="noks-media-redactor redactor-page setting-menu"
            elevation="12"
            width="395px"
            rounded="5px"
            color="editorBg"
        >
            <v-toolbar color="#ffffff" class="toolbar-for-search">
                <v-text-field
                    v-model="queryFonts"
                    clearable
                    label="Поиск по названию шрифта"
                    variant="solo"
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    density="compact"
                ></v-text-field>
            </v-toolbar> </v-card
    ></draggable-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import draggableDialog from "@/shared/libs/draggable_dialog/draggable-dialog.vue";
import {
    informationIcon,
    InformationIconType,
} from "@/shared/libs/information-icon";
// import blockButton from "./block-button.vue";
import blockFontsWindow from "./block-fonts-window.vue";
import { FontFamily } from "@ckeditor/ckeditor5-font";
import { cli } from "webpack";
// blockButton,
export default defineComponent({
    name: "block-menu-fonts",
    components: {
        draggableDialog,
        informationIcon,
        // blockButton,
        blockFontsWindow,
    },
    props: {
        modelValue: {
            type: Boolean,
        },
        modelValueFonts: {
            type: Boolean,
        },
        modelValueF: {
            type: Boolean,
        },
    },
    data() {
        return {
            InformationIconType: InformationIconType,
            queryFonts: "",
            dialogFontsSearch1: false,
            dialogFontsSearch2: false,
            dialogFontsSearch3: false,
            dialogFontsSearch4: false,
            editFontItemRes: "",
            fontsStyleObj: {
                titleH1: this.$store.getters["environment/pageFonts"].header1,
                titleH2: this.$store.getters["environment/pageFonts"].header2,
                text: this.$store.getters["environment/pageFonts"].text,
                quote: this.$store.getters["environment/pageFonts"].quote,
            },
        };
    },

    computed: {
        toggleFonts: {
            get() {
                return this.$store.getters["environment/redefineFonts"];
            },
            set(value: boolean) {
                this.$store.dispatch(
                    "environment/CHANGE_REDEFINE_FONTS",
                    value
                );
            },
        },
        show: {
            get() {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
        showFonts: {
            get() {
                return this.modelValueFonts;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
        showFontsW: {
            get() {
                return this.modelValueF;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
    },
    methods: {
        updateHeader1(newFont: string) {
            const fonts = {
                header1: newFont,
                header2: this.$store.getters["environment/pageFonts"].header2,
                text: this.$store.getters["environment/pageFonts"].text,
                quote: this.$store.getters["environment/pageFonts"].quote,
            };
            return this.$store.dispatch("environment/CHANGE_FONT_PAGE", fonts);
        },
        updateHeader2(newFont: string) {
            const fonts = {
                header1: this.$store.getters["environment/pageFonts"].header1,
                header2: newFont,
                text: this.$store.getters["environment/pageFonts"].text,
                quote: this.$store.getters["environment/pageFonts"].quote,
            };
            return this.$store.dispatch("environment/CHANGE_FONT_PAGE", fonts);
        },
        updateText(newFont: string) {
            const fonts = {
                header1: this.$store.getters["environment/pageFonts"].header1,
                header2: this.$store.getters["environment/pageFonts"].header2,
                text: newFont,
                quote: this.$store.getters["environment/pageFonts"].quote,
            };
            return this.$store.dispatch("environment/CHANGE_FONT_PAGE", fonts);
        },
        updateQuote(newFont: string) {
            const fonts = {
                header1: this.$store.getters["environment/pageFonts"].header1,
                header2: this.$store.getters["environment/pageFonts"].header2,
                text: this.$store.getters["environment/pageFonts"].text,
                quote: newFont,
            };
            return this.$store.dispatch("environment/CHANGE_FONT_PAGE", fonts);
        },

        loadFont() {
            const fontLinkId = "font-link"; //create id font link
            const existingFontLink = document.getElementById(fontLinkId);

            if (existingFontLink) {
                const parent = existingFontLink.parentNode;
                if (parent) {
                    parent.removeChild(existingFontLink);
                }
            }
            const linkElement = document.createElement("link");
            linkElement.rel = "stylesheet";

            let arrFonts = [
                this.$store.getters["environment/pageFonts"].header1.replace(
                    /\s+/g,
                    "+"
                ),
                this.$store.getters["environment/pageFonts"].header2.replace(
                    /\s+/g,
                    "+"
                ),
                this.$store.getters["environment/pageFonts"].text.replace(
                    /\s+/g,
                    "+"
                ),
                this.$store.getters["environment/pageFonts"].quote.replace(
                    /\s+/g,
                    "+"
                ),
            ];

            const arrUniqFonts = Array.from(new Set(arrFonts));
            let strLink = "";
            for (let i = 0; i < arrUniqFonts.length; i++) {
                strLink += `&family=${arrUniqFonts[i]}`;
            }

            linkElement.href = `https://fonts.googleapis.com/css2?display=swap${strLink}`;

            linkElement.id = fontLinkId;
            document.head.appendChild(linkElement);
        },
        closeFontsEditor() {
            this.loadFont();
            this.show = false;
        },
    },
    watch: {
        toggleFonts(newValue) {
            if (newValue === true) {
                // Вызываем метод loadFont() при изменении toggleFonts на true
                this.loadFont();
            }
        },
    },
});
</script>
<style scoped>
.card-fonts {
    border-bottom: 1px solid #d9d9db;
}
.card-fonts .card-fonts-toolbar {
    color: #989a9d;
    font-size: 12px;
    line-height: 1.333;
}
.card-fonts-content {
    line-height: 1.2;
    color: #000000;
}
.card-fonts-content-1 {
    font-size: 32px;
}
.card-fonts-content-2 {
    font-size: 16px;
    font-weight: 500;
}
.card-fonts-content-3 {
    font-size: 14px;
}
.card-fonts-content-4 {
    font-size: 28px;
}
</style>
