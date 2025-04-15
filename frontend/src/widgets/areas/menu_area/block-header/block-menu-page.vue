<template>
    <v-menu
        activator="#menu-page-activator"
        :close-on-content-click="false"
        transition="scale-transition"
        origin="top center"
        class="setting-menu"
        v-model="menuPage"
    >
        <v-card
            class="noks-media-redactor redactor-page"
            elevation="12"
            width="800px"
            rounded="5px"
            color="editorBg"
        >
            <v-layout>
                <v-navigation-drawer class="" permanent color="#f3f3f3">
                    <v-card-title>Настройки страницы</v-card-title>

                    <v-navigation-list class="list-links">
                        <v-list-item
                            v-for="item in menuItems"
                            :key="item.id"
                            :title="item.title"
                            ref="otherLink"
                            :active="activeLink == item.id ? true : false"
                            active-class="bg-active"
                            @click="scrollToBlock(item.href)"
                        />
                    </v-navigation-list>
                </v-navigation-drawer>
                <v-main style="background-color: #ffffff">
                    <v-app-bar
                        color="primary"
                        flat
                        density="compact"
                        style="border-bottom: 1px solid rgba(48, 52, 59, 0.1)"
                    >
                        <v-toolbar-title>{{ activeTitle }}</v-toolbar-title>
                        <v-spacer />
                        <v-btn icon @click="menuPage = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-app-bar>
                    <v-card-text class="pl-0 pr-0">
                        <v-redactor-container
                            @scroll="handleScroll"
                            id="main-scroll"
                            style="overflow-y: auto"
                        >
                            <div class="container-scroll">
                                <v-card
                                    :id="menuItems[0].href"
                                    class="card-item"
                                    flat
                                >
                                    <v-card-text class="pr-0">
                                        <v-card-title class="pl-0">{{
                                            menuItems[0].title
                                        }}</v-card-title>
                                        <div class="mt-3">
                                            <redactor-component-title
                                                >Заголовок страницы
                                            </redactor-component-title>

                                            <v-text-field
                                                class="mt-2"
                                                density="compact"
                                                variant="outlined"
                                                hint="Отображается в названии вкладки браузера и в результатах поисковых систем"
                                                persistent-hint
                                                v-model="titlePage"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <redactor-component-title>
                                                Адрес
                                                страницы</redactor-component-title
                                            >

                                            <v-text-field
                                                class="mt-2"
                                                density="compact"
                                                variant="outlined"
                                                v-model="urlPage"
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <redactor-component-title>
                                                Язык страницы
                                            </redactor-component-title>

                                            <v-select
                                                z-index="10000011"
                                                class="mt-2"
                                                clearable
                                                density="compact"
                                                variant="outlined"
                                                persistent-hint
                                                hint="Изменить основной язык сайта можно в разделе Настройки"
                                                :items="[
                                                    'Русский',
                                                    'Английский',
                                                    'И т.д.',
                                                ]"
                                                v-model="langPage"
                                            />
                                        </div> </v-card-text
                                ></v-card>

                                <v-card
                                    :id="menuItems[1].href"
                                    class="card-item"
                                    flat
                                >
                                    <v-card-text class="pr-0">
                                        <v-card-title class="pl-0">{{
                                            menuItems[1].title
                                        }}</v-card-title>

                                        <div class="mt-3">
                                            <redactor-component-title>
                                                SEO описание (meta-description)
                                            </redactor-component-title>
                                            <v-textarea
                                                counter
                                                class="mt-2"
                                                label=""
                                                maxlength="120"
                                                density="compact"
                                                variant="outlined"
                                                hint="Отображается в результатах поиска по ссылке"
                                                persistent-hint
                                                v-model="seoDescrPage"
                                            />
                                        </div>

                                        <v-row>
                                            <v-switch
                                                v-model="onKeywords"
                                                label="Добавить meta-keywords"
                                            />
                                            <information-icon
                                                :close-delay="200"
                                                max-width="350"
                                                text="В настоящее время все поисковые системы игнорируют этот метатег."
                                                size="14"
                                                :type="
                                                    InformationIconType.question
                                                "
                                                class="if-icon-media-redactor mt-2"
                                            />
                                        </v-row>
                                        <div class="mt-3" v-if="onKeywords">
                                            <redactor-component-title>
                                                SEO ключевые слова
                                                (meta-keywords)
                                            </redactor-component-title>

                                            <v-textarea
                                                counter
                                                class="mt-2"
                                                label=""
                                                maxlength="120"
                                                density="compact"
                                                variant="outlined"
                                                hint="Через запятую, на данный момент все поисковики игнорируют этот мета-тег."
                                                persistent-hint
                                                v-model="seoKeyPage"
                                            />
                                        </div>
                                    </v-card-text>
                                </v-card>
                                <v-card
                                    :id="menuItems[2].href"
                                    class="card-item"
                                    flat
                                >
                                    <v-card-text class="pr-0">
                                        <v-card-title class="pl-0">{{
                                            menuItems[2].title
                                        }}</v-card-title>

                                        <div>
                                            <v-alert
                                                class="d-flex"
                                                text="Ссылка на вашу страницу
                                                    будет выглядеть так, если
                                                    кто-то поделится ею в
                                                    социальных сетях"
                                            >
                                                <div class="d-flex">
                                                    <div class="icon-soc">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 18 18"
                                                            id="facebook"
                                                        >
                                                            <path
                                                                d="M9 0C13.9706 0 18 4.05406 18 9.055C18 13.5746 14.7088 17.3207 10.4062 18V18V11.6725H12.5033L12.5033 11.6724L12.9023 9.055V9.05496H10.4062V7.35643C10.4062 7.35083 10.4063 7.34524 10.4063 7.33965C10.407 7.25577 10.4124 7.17221 10.4234 7.09007C10.5054 6.47675 10.8947 5.94235 11.8729 5.94235H13.0078V5.94231V3.71397V3.71393C13.0078 3.71393 11.9779 3.53707 10.9932 3.53707C9.06586 3.53707 7.76447 4.63884 7.60934 6.64652C7.599 6.78035 7.59375 6.91821 7.59375 7.06003C7.59375 7.06005 7.59375 7.06006 7.59375 7.06007V9.05496H5.30859V9.055V11.6724V11.6725H7.59375V18V18C3.29117 17.3207 0 13.5746 0 9.055C0 4.05406 4.02943 0 9 0Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div class="icon-soc">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 18 18"
                                                            id="instagram"
                                                        >
                                                            <path
                                                                d="M9.00002 0C6.55575 0 6.24926 0.0103604 5.28931 0.0541599C4.33137 0.0978523 3.67712 0.250007 3.10466 0.472506C2.51283 0.702472 2.01092 1.01021 1.51055 1.51055C1.01021 2.01092 0.702472 2.51283 0.472506 3.10466C0.250007 3.67712 0.0978523 4.33137 0.0541599 5.28931C0.0103604 6.24926 0 6.55575 0 9.00002C0 11.4443 0.0103604 11.7507 0.0541599 12.7107C0.0978523 13.6686 0.250007 14.3229 0.472506 14.8953C0.702472 15.4872 1.01021 15.9891 1.51055 16.4895C2.01092 16.9898 2.51283 17.2975 3.10466 17.5275C3.67712 17.75 4.33137 17.9021 5.28931 17.9458C6.24926 17.9896 6.55575 18 9.00002 18C11.4443 18 11.7507 17.9896 12.7107 17.9458C13.6686 17.9021 14.3229 17.75 14.8953 17.5275C15.4872 17.2975 15.9891 16.9898 16.4895 16.4895C16.9898 15.9891 17.2975 15.4872 17.5275 14.8953C17.75 14.3229 17.9021 13.6686 17.9458 12.7107C17.9896 11.7507 18 11.4443 18 9.00002C18 6.55575 17.9896 6.24926 17.9458 5.28931C17.9021 4.33137 17.75 3.67712 17.5275 3.10466C17.2975 2.51283 16.9898 2.01092 16.4895 1.51055C15.9891 1.01021 15.4872 0.702472 14.8953 0.472506C14.3229 0.250007 13.6686 0.0978523 12.7107 0.0541599C11.7507 0.0103604 11.4443 0 9.00002 0ZM8.99998 1.62164C11.4031 1.62164 11.6877 1.63082 12.6367 1.67412C13.5142 1.71413 13.9908 1.86075 14.3079 1.984C14.728 2.14727 15.0278 2.34229 15.3427 2.65725C15.6577 2.97217 15.8527 3.27198 16.016 3.69208C16.1392 4.00921 16.2859 4.48575 16.3259 5.36325C16.3692 6.31226 16.3783 6.59692 16.3783 9.00004C16.3783 11.4031 16.3692 11.6878 16.3259 12.6368C16.2859 13.5143 16.1392 13.9908 16.016 14.308C15.8527 14.7281 15.6577 15.0279 15.3427 15.3428C15.0278 15.6577 14.728 15.8528 14.3079 16.016C13.9908 16.1393 13.5142 16.2859 12.6367 16.3259C11.6879 16.3692 11.4032 16.3784 8.99998 16.3784C6.59669 16.3784 6.3121 16.3692 5.36319 16.3259C4.4857 16.2859 4.00916 16.1393 3.69202 16.016C3.27192 15.8528 2.97212 15.6577 2.65719 15.3428C2.34227 15.0279 2.14721 14.7281 1.98395 14.308C1.86069 13.9908 1.71408 13.5143 1.67406 12.6368C1.63076 11.6878 1.62158 11.4031 1.62158 9.00004C1.62158 6.59692 1.63076 6.31226 1.67406 5.36325C1.71408 4.48575 1.86069 4.00921 1.98395 3.69208C2.14721 3.27198 2.34224 2.97217 2.65719 2.65725C2.97212 2.34229 3.27192 2.14727 3.69202 1.984C4.00916 1.86075 4.4857 1.71413 5.36319 1.67412C6.3122 1.63082 6.59687 1.62164 8.99998 1.62164ZM4.37827 9.00002C4.37827 6.44753 6.44742 4.37838 8.99991 4.37838C11.5524 4.37838 13.6215 6.44753 13.6215 9.00002C13.6215 11.5525 11.5524 13.6216 8.99991 13.6216C6.44742 13.6216 4.37827 11.5525 4.37827 9.00002ZM8.99987 12C7.34299 12 5.99985 10.6569 5.99985 9.00004C5.99985 7.34316 7.34299 6.00002 8.99987 6.00002C10.6567 6.00002 11.9999 7.34316 11.9999 9.00004C11.9999 10.6569 10.6567 12 8.99987 12ZM13.8043 5.27578C14.4008 5.27578 14.8844 4.79227 14.8844 4.1958C14.8844 3.59932 14.4008 3.11578 13.8043 3.11578C13.2079 3.11578 12.7244 3.59932 12.7244 4.1958C12.7244 4.79227 13.2079 5.27578 13.8043 5.27578Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div class="icon-soc">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 18 18"
                                                            id="telegram"
                                                        >
                                                            <path
                                                                d="M0.258296 8.49818C2.00767 7.51839 3.96045 6.70066 5.78503 5.87874C8.92401 4.5325 12.0755 3.20959 15.2587 1.97798C15.878 1.76813 16.9909 1.56296 17.1 2.49621C17.0403 3.81722 16.7945 5.13049 16.6259 6.44376C16.198 9.33176 15.7033 12.2099 15.2211 15.0884C15.0548 16.0471 13.8736 16.5435 13.1178 15.9299C11.3013 14.6824 9.47085 13.4469 7.67757 12.1704C7.09008 11.5634 7.63492 10.692 8.15944 10.2585C9.65554 8.75926 11.2422 7.48568 12.6601 5.90904C13.0426 4.96983 11.9125 5.76132 11.5397 6.00389C9.49155 7.43902 7.4935 8.96176 5.33409 10.223C4.23106 10.8404 2.94547 10.3128 1.84294 9.9683C0.854391 9.55214 -0.594197 9.13281 0.258171 8.49831L0.258296 8.49818Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div class="icon-soc">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 18 18"
                                                            id="vkontakte"
                                                        >
                                                            <path
                                                                d="M0 8.64C0 4.5675 0 2.53069 1.26562 1.26562C2.53125 0.000562459 4.5675 0 8.64 0H9.36C13.4325 0 15.4693 0 16.7344 1.26562C17.9994 2.53125 18 4.5675 18 8.64V9.36C18 13.4325 18 15.4693 16.7344 16.7344C15.4688 17.9994 13.4325 18 9.36 18H8.64C4.5675 18 2.53069 18 1.26562 16.7344C0.000562459 15.4688 0 13.4325 0 9.36V8.64Z"
                                                            />
                                                            <path
                                                                d="M9.61394 13.1248C5.55269 13.1248 3.08894 10.3072 2.99219 5.625H5.04925C5.11337 9.06469 6.67769 10.5221 7.8775 10.8219V5.625H9.8485V8.59331C11.0056 8.46506 12.2166 7.11506 12.6239 5.625H14.5645C14.2534 7.45706 12.9349 8.80706 12.0034 9.36394C12.9361 9.8145 14.4357 10.9929 15.0145 13.1248H12.8821C12.4321 11.7 11.3284 10.5964 9.84962 10.4462V13.1248H9.61394Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </v-alert>

                                            <div class="mt-2">
                                                <redactor-component-title>
                                                    Отображение в соц сетях и
                                                    мессенджерах
                                                </redactor-component-title>
                                                <v-row>
                                                    <v-col
                                                        cols="7"
                                                        style="
                                                            display: flex;
                                                            flex-direction: column;
                                                            justify-content: center;
                                                            align-items: center;
                                                            gap: 0;
                                                        "
                                                        class="pl-0 pr-0"
                                                    >
                                                        <v-card
                                                            variant="flat"
                                                            class="m-0 card-link-view"
                                                            max-width="264px"
                                                            width="100%"
                                                        >
                                                            <v-img
                                                                height="120"
                                                                cover
                                                                :src="
                                                                    urlInsertImg
                                                                "
                                                                :lazy-src="
                                                                    urlInsertImg
                                                                "
                                                            />

                                                            <v-card-subtitle
                                                                class="card-title-view"
                                                            >
                                                                lp624347.noks.ru
                                                            </v-card-subtitle></v-card
                                                        >
                                                    </v-col>
                                                    <v-col cols="5">
                                                        <v-btn
                                                            @click="
                                                                chooseImage()
                                                            "
                                                            text="Загрузить"
                                                            block
                                                            prepend-icon="mdi-upload"
                                                            rounded="lg"
                                                            color="editor"
                                                        />
                                                        <input
                                                            id="fileUpload"
                                                            type="file"
                                                            hidden
                                                        />
                                                        <v-btn
                                                            class="mt-2"
                                                            @click="
                                                                showGallery = true
                                                            "
                                                            block
                                                            prepend-icon="mdi-image-search-outline"
                                                            rounded="lg"
                                                            color="primary-darken-1"
                                                        >
                                                            Галерея
                                                            <noks-modal
                                                                @imageSelected="
                                                                    imageInsert
                                                                "
                                                                v-model="
                                                                    showGallery
                                                                "
                                                            />
                                                        </v-btn>
                                                        <noks-modal
                                                            @imageSelected="
                                                                imageInsert
                                                            "
                                                        />
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </div> </v-card-text
                                ></v-card>
                                <v-card
                                    :id="menuItems[3].href"
                                    class="card-item"
                                    flat
                                >
                                    <v-card-text
                                        class="pr-0"
                                        style="min-height: 450px"
                                    >
                                        <v-card-title class="pl-0">
                                            {{
                                                menuItems[3].title
                                            }}</v-card-title
                                        >

                                        <v-row>
                                            <v-switch
                                                label="Отключить адаптивный дизайн"
                                            />
                                        </v-row>
                                        <v-row>
                                            <v-switch
                                                label="Включить маркеры"
                                            />
                                        </v-row>
                                        <v-row>
                                            <v-switch
                                                label="Основные настройки фона страницы"
                                            />
                                        </v-row> </v-card-text
                                ></v-card>
                            </div>
                        </v-redactor-container>
                    </v-card-text>
                    <v-footer
                        outlined
                        density="compact"
                        style="border-top: 1px solid rgba(48, 52, 59, 0.1)"
                    >
                        <v-container class="pb-1 pt-1">
                            <v-row justify="center">
                                <v-col cols="auto"
                                    ><v-btn
                                        class="text"
                                        color="editor"
                                        variant="flat"
                                        >Сохранить</v-btn
                                    ></v-col
                                >
                                <v-col cols="auto"
                                    ><v-btn
                                        class="text"
                                        variant="flat"
                                        @click="menuPage = false"
                                        >Закрыть</v-btn
                                    ></v-col
                                >
                            </v-row>
                        </v-container>
                    </v-footer>
                </v-main>
            </v-layout>
        </v-card>
    </v-menu>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import noksModal from "@/shared/libs/noks-modal/noks-modal.vue";
import {
    informationIcon,
    InformationIconType,
} from "@/shared/libs/information-icon";

export default defineComponent({
    name: "block-menu-page",
    components: {
        informationIcon,
        noksModal,
    },
    data() {
        return {
            InformationIconType: InformationIconType,
            activeLink: 1 as number,
            activeTitle: "Главные" as string,
            menuPage: false,
            urlInsertImg: require("@/assets/images/bgbg.jpg"),
            card: 1,
            menuItems: [
                { id: 1, title: "Главные", href: "main" },
                { id: 2, title: "СЕО", href: "seo" },
                { id: 3, title: "Социальные сети", href: "socials" },
                { id: 4, title: "Другое", href: "other" },
            ],
            showGallery: false,
            onKeywords: false,
            titlePage: "",
            urlPage: "/",
            langPage: "Русский",
            seoDescrPage: "",
            seoKeyPage: "",
        };
    },

    methods: {
        chooseImage() {
            document.getElementById("fileUpload")?.click();
            //
        },
        imageInsert(img: string) {
            this.urlInsertImg = img;
        },
        handleScroll() {
            const mainBlock = document.getElementById("main");
            const seoBlock = document.getElementById("seo");
            const socialsBlock = document.getElementById("socials");
            const otherBlock = document.getElementById("other");
            const mainScroll = document.getElementById("main-scroll");

            if (
                !mainBlock ||
                !seoBlock ||
                !socialsBlock ||
                !otherBlock ||
                !mainScroll
            ) {
                return;
            }

            // Получаем положение блоков относительно .container-scroll
            const mainBlockTop = mainBlock.offsetTop - mainScroll.offsetTop;
            const seoBlockTop = seoBlock.offsetTop - mainScroll.offsetTop;
            const socialsBlockTop =
                socialsBlock.offsetTop - mainScroll.offsetTop;
            const otherBlockTop = otherBlock.offsetTop - mainScroll.offsetTop;

            const scrollY = mainScroll.scrollTop;

            if (scrollY >= mainBlockTop && scrollY < seoBlockTop) {
                this.activeLink = 1;
            } else if (scrollY >= seoBlockTop && scrollY < socialsBlockTop) {
                this.activeLink = 2;
            } else if (scrollY >= socialsBlockTop && scrollY < otherBlockTop) {
                this.activeLink = 3;
            } else if (scrollY >= otherBlockTop) {
                this.activeLink = 4;
            }
        },
        windowTitle(idFind: number) {
            const menuItemActive = this.menuItems.find(
                (item) => item.id === idFind
            );
            if (menuItemActive) {
                this.activeTitle = menuItemActive.title;
            } else {
                // console.log(idFind, "не найден");
            }
        },
        scrollToBlock(block: string) {
            const blockTo = document.getElementById(block);
            if (!blockTo) {
                return;
            }
            if (blockTo) {
                blockTo.scrollIntoView({ behavior: "smooth" }); // Прокручиваем блок с плавной анимацией
            }
        },
    },
    watch: {
        activeLink() {
            this.windowTitle(this.activeLink);
        },
    },
});
</script>
<style>
.bg-active {
    background-color: rgb(220 220 220);
}
.bg-active .v-list-item-title {
    color: #000000 !important;
}
.main-scroll {
    background-color: #ffffff;
}
.card-item {
}
.card-link-view {
    border: 1px solid #f5f5f5;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.card-title-view {
    border-top: 1px solid #f5f5f5;
    padding: 10px 12px;
}
.v-text-field .v-input__details::v-deep {
    padding-inline-start: 0 !important;
    padding-inline-end: 16px;
}
#main-scroll {
    height: 400px !important;
}
.redactor-page {
    min-height: 55px;
    max-height: calc(100vh - 60px);
}
.redactor-page {
    /* overflow-y: hidden !important; */
}
</style>
