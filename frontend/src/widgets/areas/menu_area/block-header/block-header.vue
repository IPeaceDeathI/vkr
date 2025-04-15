<!-- TODO navigateTo - сделать default -->
<template>
    <v-noks-menu color="secondary" class="header-container" rounded="0" fixed>
        <v-container fluid class="pa-0 align-center">
            <v-col cols="12" class="top-bar" style="padding: 18px">
                <v-row style="justify-content: space-between">
                    <div class="header-container-col">
                        <blockButton
                            colorIcon="success"
                            icon="mdi-home-outline"
                            target="_blank"
                            :href="`${NOKS_HOST}admin/sites`"
                            label="Сайты"
                        ></blockButton>
                        <blockButton
                            colorIcon="success"
                            :href="`${NOKS_HOST}admin/pages/`"
                            :site_id="`${siteId}`"
                            target="_blank"
                            icon="mdi-file-multiple-outline"
                            label="Страницы"
                        ></blockButton>
                        <blockButton
                            colorIcon="success"
                            :href="`${NOKS_HOST}quiz/`"
                            target="_blank"
                            icon="mdi-timeline-question-outline"
                            label="Квизы"
                        ></blockButton>
                        <blockButton
                            colorIcon="success"
                            :href="`${NOKS_HOST}admin/crm/`"
                            target="_blank"
                            icon="mdi-bullseye-arrow"
                            label="Заявки"
                        ></blockButton>
                        <blockButton
                            colorIcon="success"
                            :href="`${NOKS_HOST}stats/`"
                            target="_blank"
                            icon="mdi-poll"
                            label="Аналитика"
                        ></blockButton>
                        <blockButton
                            colorIcon="success"
                            target="_blank"
                            :href="`${NOKS_HOST}sites/settings/`"
                            icon="mdi-cog"
                            label="Настройки"
                        ></blockButton>
                    </div>
                    <div
                        class="header-container-col block-header-left justify-end"
                    >
                        <blockButton
                            @click="openErrorReport"
                            icon="mdi-alert-octagon"
                            label="Сообщить ошибку"
                        ></blockButton>
                        <!-- <blockButton
                            icon="mdi-credit-card-outline"
                            target="_blank"
                            :href="`${NOKS_HOST}pay`"
                            tooltipText="Оплата"
                        /> -->
                        <blockButton
                            icon="mdi-account-circle-outline"
                            target="_blank"
                            :href="`${NOKS_HOST}profile`"
                            tooltipText="Аккаунт"
                            label="Аккаунт"
                        />
                    </div>
                </v-row>
            </v-col>

            <v-col cols="12" class="align-center" style="padding: 6px">
                <v-row>
                    <v-col class="col-md-5 d-flex align-center">
                        <blockButton
                            icon="mdi-window-restore"
                            label="Окна"
                            :active="
                                $store.getters['environment/showWindowPicker']
                            "
                            @click="
                                $store.commit(
                                    'environment/SET_SHOW_WINDOW_PICKER',
                                    true
                                )
                            "
                        />
                        <blockButton
                            icon="mdi-code-braces"
                            label="Код"
                            id="menu-codes"
                            :active="showCodesMenu"
                            @click="showCodesMenu = true"
                        />

                        <blockButton
                            icon="mdi-format-font"
                            label="Шрифты"
                            id="menu-fonts"
                            :active="showFontsMenu"
                            @click="showFontsMenu = true"
                        />

                        <!-- <blockButton
                            icon="mdi-file-document-edit-outline"
                            label="Настройки страницы"
                            id="menu-page-activator"
                            @click="showFontsMenuSearch = true"
                        /> -->

                        <blockButton
                            target="_blank"
                            :href="`${NOKS_HOST}sites/${siteId}/page/${pageId}/settings/`"
                            icon="mdi-file-document-edit-outline"
                            label="Настройки страницы"
                        ></blockButton>
                    </v-col>
                    <v-col class="justify-center d-flex col-md-3 align-center">
                        <blockButton
                            icon="mdi-monitor"
                            tooltipText="Десктопная версия"
                            @click="setDesktopViewport"
                            :active="
                                $store.getters['environment/isDesktopViewport']
                            "
                        ></blockButton>

                        <blockButton
                            icon="mdi-cellphone"
                            tooltipText="Мобильная версия"
                            @click="setMobileViewport"
                            :active="
                                !$store.getters['environment/isDesktopViewport']
                            "
                        ></blockButton>
                    </v-col>

                    <v-col class="quality-panel-col">
                        <QualityRating :page_id="pageId" />
                    </v-col>

                    <v-col
                        class="justify-end d-flex col-md-4 align-center"
                        style="padding-left: 0"
                    >
                        <blockButton
                            v-if="$store.getters['user/getIsAdmin']"
                            icon="mdi-cards-outline"
                            tooltipText="Показать каталог шаблонов(только админ)"
                            @click="$store.commit('project/SET_EMPTY', true)"
                        />
                        <blockButton
                            icon="mdi-page-next-outline"
                            tooltipText="Добавить/Импортировать страницу как шаблон"
                            @click="showTemplateRedactor = true"
                        />

                        <v-menu
                            activator="#menu-activator"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            origin="top center"
                            width="350px"
                            class="setting-menu"
                        >
                            <v-list
                                select-strategy="independent"
                                density="compact"
                                bgColor="secondary"
                                location="end"
                                size="small"
                                variant="text"
                            >
                                <v-list-item
                                    density="compact"
                                    size="x-small"
                                    v-model="switchRuler"
                                    @click="switchRuler != switchRuler"
                                >
                                    <template v-slot:prepend>
                                        <v-icon x-small preppend
                                            >mdi-grid</v-icon
                                        >
                                    </template>

                                    <v-list-item-title class="title-width"
                                        >Линейка</v-list-item-title
                                    >
                                    <div class="switch-wrp">
                                        <v-switch
                                            density="compact"
                                            xsmall
                                            v-model="switchRuler"
                                            color="editor"
                                            hide-details
                                        ></v-switch>
                                    </div>
                                </v-list-item>
                                <v-list-item size="x-small" density="compact">
                                    <template v-slot:prepend>
                                        <v-icon x-small preppend
                                            >mdi-reorder-vertical</v-icon
                                        >
                                    </template>
                                    <v-list-item-title class="title-width"
                                        >Направляющие
                                    </v-list-item-title>
                                    <div class="switch-wrp">
                                        <block-menu-grids></block-menu-grids>

                                        <v-switch
                                            density="compact"
                                            append
                                            small
                                            v-model="switchGrid"
                                            color="editor"
                                            hide-details
                                        ></v-switch>
                                    </div>
                                </v-list-item>
                                <v-list-item
                                    density="compact"
                                    size="x-small"
                                    prepend-icon="mdi-magnify-minus-outline"
                                    class="d-flex"
                                >
                                    <v-row
                                        class="ma-0 pa-0 align-center justify-space-between"
                                    >
                                        <v-col cols="4" class="pa-0">
                                            <v-list-item-title
                                                >Масштаб</v-list-item-title
                                            >
                                        </v-col>
                                        <v-col cols="2" class="pa-0">
                                            <span>{{ editorSize }} %</span>
                                        </v-col>

                                        <v-col cols="1" class="pa-0">
                                            <v-btn
                                                color="secondary"
                                                density="compact"
                                                icon="mdi-minus"
                                                size="small"
                                                disabled
                                                @click="decreaseSize"
                                            />
                                        </v-col>
                                        <v-col cols="5" class="pa-0">
                                            <v-btn
                                                density="compact"
                                                size="small"
                                                color="secondary"
                                                disabled
                                                @click="cancelSize"
                                                >Сбросить</v-btn
                                            >
                                        </v-col>
                                    </v-row>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                        <blockButton icon="mdi-export-variant">
                            <v-menu
                                activator="parent"
                                open-on-hover
                                :close-on-content-click="false"
                            >
                                <linkShareCard
                                    :url="previewLink"
                                    @onCopy="copyLink"
                                    :yaTitle="`Код доступа к сайту: ${siteAccessCode}`"
                                >
                                    <template v-slot:subtitle>
                                        <div class="pb-2 d-flex">
                                            <div class="text-h6">
                                                Код доступа:&nbsp;
                                            </div>
                                            <div
                                                style="user-select: all"
                                                class="text-h5 bg-primary-darken-1 px-1 rounded-lg"
                                                @click="copyAccessCode"
                                            >
                                                {{ siteAccessCode }}
                                            </div>
                                        </div>
                                    </template>
                                </linkShareCard>
                            </v-menu>
                        </blockButton>
                        <blockButton
                            icon="mdi-eye-outline"
                            target="_blank"
                            :href="previewLink"
                            tooltipText="Просмотр"
                        />
                        <v-btn
                            :style="{ zIndex: showOverlay ? 2001 : 1 }"
                            class="text"
                            color="editor"
                            variant="flat"
                            @click="publishProject"
                        >
                            Сохранить
                        </v-btn>
                        <v-overlay v-model="showOverlay"></v-overlay>
                    </v-col>
                </v-row>
            </v-col>
            <block-menu-page />
            <block-menu-fonts v-model="showFontsMenu" />
            <block-menu-codes v-model="showCodesMenu" :pageId="pageId" />
            <window-picker v-model="showWindowPicker" />
            <template-redactor v-model="showTemplateRedactor" />
        </v-container>
    </v-noks-menu>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import blockButton from "./block-button.vue";
import blockMenuGrids from "@/features/environment/components/menu-grids/block-menu-grids.vue";

import blockMenuPage from "./block-menu-page.vue";

import blockMenuFonts from "./block-menu-fonts.vue";
import blockMenuCodes from "./block-menu-codes.vue";
import { linkShareCard } from "@/shared/ui";
import { NOKS_HOST, HOST_NAME } from "@/shared/config";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { ErrorReportService } from "@/shared/services/error_report_form/error-report-service";
import { TemplateModel } from "@/models/Template";
import { TemplateCategoriesModel } from "@/models/TemplateCategories";
import { templateRedactor } from "@/shared/services/template-redactor";

import QualityRating from "@/components/QualityRating/QualityRating.vue";

export default defineComponent({
    name: "block-header",
    data() {
        return {
            NOKS_HOST: NOKS_HOST,
            HOST_NAME: HOST_NAME,
            active: false,
            on: false,
            message: false,
            switchValue: false, // начальное значение переключателя
            parentSwitchValue: false, // значение из родительского компонента
            editorSize: 100,
            switchRuler: false as boolean,
            switchGrid: false as boolean,
            onMobile: false,
            screenWidth: window.innerWidth,
            showFontsMenu: false,
            showFontsMenuSearch: false,
            showCodesMenu: false,
            showWindowPicker: false,
            showTemplateRedactor: false,
            userId: 9,
            showOverlay: false, // оверлей для подсказки про кнопку "Опубликовать"
        };
    },
    components: {
        blockButton,
        blockMenuGrids,
        blockMenuPage,
        blockMenuFonts,
        blockMenuCodes,
        linkShareCard,
        templateRedactor,
        QualityRating,
    },
    computed: {
        pageId(): number {
            return this.$store.getters["project/getId"];
        },
        pageURI(): string {
            return this.$store.getters["project/getPageURI"];
        },
        siteId(): number {
            return this.$store.getters["project/getSiteId"];
        },
        siteAccessCode(): number {
            return this.$store.getters["project/getSiteAccessCode"];
        },
        siteSubDomain(): string {
            return this.$store.getters["project/getSiteSubDomain"];
        },
        previewLink(): string {
            const devPageId =
                process.env.NODE_ENV == "production"
                    ? this.pageId
                    : process.env.VUE_APP_SERVE_PAGE_ID;
            // old_link:  `https://${this.siteSubDomain}.${this.HOST_NAME}.ru`;
            const tmp = JSON.parse(process.env.VUE_APP_NOKS_BUILD)
                ? `https://${window.location.host}/${this.pageURI}`
                : `${NOKS_HOST}constructor_2/preview?site_page_id=${devPageId}`;
            return tmp;
        },
    },
    methods: {
        test(): void {
            TemplateModel.getAll({ full: false, limit: 1999999, page: 0 }).then(
                (result): void => {
                    console.log("template_all", result);
                    return;
                }
            );
            TemplateCategoriesModel.get().then((result): void => {
                console.log("template_categories_all", result);
                return;
            });
        },
        async publishProject() {
            this.$store.dispatch("project/PUBLISH", undefined);
        },
        copyAccessCode() {
            navigator.clipboard.writeText(this.siteAccessCode + "").then(() => {
                NotificationService.common().success({
                    text: "Код скопирован",
                });
            });
        },
        copyLink() {
            NotificationService.common().success({
                text: "Ссылка была скопирована",
            });
        },
        editorContainerScale(editorSize: number) {
            //todo переделать на vuex
            const container =
                document.getElementsByClassName("main-block-area")[0];
            container.setAttribute(
                "style",
                `scale:${
                    editorSize / 100
                };position:fixed;top:0px;left:0px;right:0px;`
            );
        },
        decreaseSize() {
            this.editorSize > 50
                ? (this.editorSize = this.editorSize - 25)
                : this.editorSize;
        },
        cancelSize() {
            this.editorSize = 100;
            const areaBlock =
                document.getElementsByClassName("main-block-area")[0];
            areaBlock.setAttribute(
                "style",
                "position:inherit;top:auto;left:auto;right:auto;"
            );
        },
        handleResize() {
            this.screenWidth = window.innerWidth;
        },
        enableShowMode() {
            //ВРеменно !!!!!TODO
            if (this.$store.getters["environment/isEditable"])
                this.$store.dispatch("environment/MAKE_UNEDITABLE", undefined);
            else {
                this.$store.dispatch("environment/MAKE_EDITABLE", undefined);
            }
        },
        setDesktopViewport() {
            this.$store.dispatch("environment/SET_DESKTOP_VIEWPORT", undefined);
        },
        setMobileViewport() {
            this.$store.dispatch("environment/SET_MOBILE_VIEWPORT", undefined);
        },
        openErrorReport() {
            ErrorReportService.open();
        },
    },
    watch: {
        editorSize(size) {
            this.editorContainerScale(size);
        },
        switchRuler() {
            if (this.switchRuler === true) {
                this.$store.dispatch("environment/PUT_RULER", undefined);
            } else {
                this.$store.dispatch("environment/REMOVE_RULER", undefined);
            }
        },
        switchGrid() {
            if (this.switchGrid === true) {
                this.$store.dispatch("environment/PUT_GRIDS", undefined);
                //todo понять почему не работает такой вид
                // const areaWrp1 =
                //     document.getElementsByClassName("block-area")[0];
                // areaWrp1.setAttribute("style", "opacity:0.7");
            } else {
                this.$store.dispatch("environment/REMOVE_GRIDS", undefined);
            }
        },
        screenWidth() {
            const widthElement = window;
            this.onMobile = widthElement.innerWidth < 768;
        },
    },
});
</script>
<style lang="scss">
@import "@/shared/constants/index.scss";
.top-bar {
    border-bottom: 1px solid #f4f3f333;
}
.header-container .v-toolbar__content {
    height: auto !important;
    background: #1b3446;
}
@media (max-width: 991px) {
    .header-container .v-toolbar__content {
        height: auto !important;
    }
}
.v-list-item {
    font-size: 0.6rem !important;
}
.v-list-item .v-list-item-title {
    font-size: 0.8rem;
}

::v-deep .v-list-item {
    padding: 0;
}
.setting-menu .v-list-item::v-deep .v-list-item__spacer {
    width: 10px;
}
.v-list-item__spacer::v-deep {
    width: 10px;
}
// ::v-deep для усиления специфичности
.v-btn--disabled::v-deep {
    opacity: 0.5 !important;
    cursor: not-allowed;
}
@-ms-viewport {
    width: device-width;
}
.v-list-item__content {
    display: flex;
    width: 100%;
    padding: 0 5px 0 0;
    justify-content: space-between;
    align-items: center;
}
.v-switch__thumb::v-deep {
    height: 15px;
    width: 15px;
}
.icon-soc {
    width: 30px;
    padding: 5px;
}
.title-width {
    width: 59%;
}
.switch-wrp {
    width: 41%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
}
.switch-wrp .v-input--horizontal {
    display: flex;
    justify-content: flex-end;
}
.title-width {
    width: 59%;
}
.switch-wrp {
    width: 41%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-align: right;
}
.switch-wrp .v-input--horizontal {
    display: flex;
    justify-content: flex-end;
}

// QualityRating
.quality-panel-col {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.quality-panel-col .quality-panel {
    position: relative;
    box-shadow: none;
    // background-color: rgb(0 0 0 / 26%);
    // border: 1px solid #475a67;
    top: auto;
    right: auto;
}
.quality-panel-col .quality-panel:hover {
    // background-color: rgb(156 156 156 / 18%);
}

.header-container-col {
    // padding: 14px 12px;
}
.block-header-left {
    width: auto;
}
</style>
