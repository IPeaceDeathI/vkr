<script>
import SiteGrid from "@/pages/sites/SiteGrid.vue";
import axios from "axios";

import Loader from "@/components/ui/Loader.vue";
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon, Loader, SiteGrid },
    inject: ["settings"],
    data() {
        return {
            grid: "grid",
            grids: {
                grid: { id: 0 },
                table: { id: 1 },
            },
            sites: [],
            user: [],
            isDropdownProfile: false,
        };
    },
    mounted() {
        axios
            .get(this.settings.SITE_PATH + "/api/admin/sites")
            .then((response) => {
                this.sites = response.data.data.sites;
                this.user = response.data.data.user;
                console.log(this.user);
            });
    },
    methods: {
        async addSite() {
            await axios
                .post(this.settings.SITE_PATH + "/api/site/method/add_site")
                .then((result) => {
                    window.location = result.data.data.move_to_constructor;
                });
        },
        dropdownProfile() {
            this.isDropdownProfile = !this.isDropdownProfile;
        },
    },
};
</script>

<template>
    <Loader />
    <div class="admin-content">
        <header class="container fluid">
            <div
                data-is="admin-breadcrumbs"
                class="admin-breadcrumbs text-title"
            ></div>
            <div
                data-is="proxy"
                style=""
                class="admin-project-header fade-in-animation group-title borderless"
            >
                <div class="flexbe-title text-title inline-box">
                    <div class="flexbe-text">Сайты</div>

                    <!-- <div is="dropdown-filter" class="dropdown-filter flexbe-button filled rounded is-secondary ml20 " value="all">
                        <div class="flexbe-text text-medium">Все</div>
                        <Icon path="addons" name="arrow-down" size="8" />
                        <div is="proxy" class="menu-list" data-is="dropdown">
                            <div class="toggle-helper"></div>
                        </div>
                    </div> -->
                </div>
                <div class="admin-project-header__buttons">
                    <!-- <div is="admin-search-input" placeholder="Поиск по адресу или названию" search-count="3" class="admin-search-input ">
                        <div is="flexbe-input" class="flexbe-input rounded light  flexbe-input--text" prefix-icon="@/assets/images/filters.svg?bde54611#search" prefix-icon-size="14" placeholder="Поиск по адресу или названию" searchcount="3">
                            <div class="flexbe-input-wrap has-prefix-icon">
                                <input type="text" class="flexbe-input__text flexbe-input-styled" placeholder="Поиск по адресу или названию" autocomplete="off" tabindex="undefined">
                                <div class="flexbe-input__ghost show"><span class="affix prefix prefix ">
                                    <Icon path="filters" name="search" size="14" />
                                </span><span class="affix value">Поиск по адресу или названию</span></div>
                            </div>
                        </div>
                    </div> -->

                    <!-- <div is="dropdown-sort" class="dropdown-sort flexbe-button filled rounded is-secondary  ">
                        <Icon path="filters" name="icon-asc" size="14" />
                        <div is="proxy" data-is="dropdown">
                            <div class="toggle-helper"></div>
                        </div>
                    </div> -->

                    <div
                        class="flexbe-switch round stretched is-group size-large theme-default separator"
                        size="large"
                        value="grid"
                    >
                        <div
                            :class="
                                'switch-item tooltipstered ' +
                                (grid == 'grid' ? 'active' : '')
                            "
                            data-tip="Сетка"
                            data-value="grid"
                            @click="grid = 'grid'"
                        >
                            <Icon path="filters" name="cards-view" size="14" />
                        </div>
                        <div
                            :class="
                                'switch-item tooltipstered ' +
                                (grid == 'table' ? 'active' : '')
                            "
                            data-tip="Таблица"
                            data-value="table"
                            @click="grid = 'table'"
                        >
                            <Icon path="filters" name="table-view" size="14" />
                        </div>
                        <div
                            class="switch-toggle"
                            :style="
                                'left: ' +
                                (2 + 32 * grids[grid].id) +
                                'px; width: 30px; transition: .2s'
                            "
                        ></div>
                    </div>

                    <div class="flexbe-separator"></div>
                    <div class="header-profile in-dropdown focus">
                        <span class="profile-mail">{{
                            user.user_email ?? "Загрузка..."
                        }}</span>
                        <!-- <div class="user-avatar">
                            <div class="user-avatar--symbol font-ui">
                                <div
                                    class="background"
                                    style="background: #ff6646"
                                ></div>
                                <span class="symbol">R</span>
                            </div>
                            <div
                                class="user-avatar--image"
                                style="
                                    background-image: url(https://www.gravatar.com/avatar/c05884205acd8de2d56b8eb2b790a110?s=120&amp;d=blank);
                                "
                            ></div>
                        </div> -->
                        <div class="menu-list" data-is="dropdown">
                            <div
                                class="toggle-helper"
                                @click="dropdownProfile()"
                            ></div>
                        </div>
                    </div>

                    <div class="flexbe-separator"></div>
                    <a
                        class="flexbe-button filled rounded large is-primary"
                        @click="addSite()"
                    >
                        <span class="flexbe-text">Создать сайт</span>
                    </a>
                </div>
            </div>
        </header>
        <section class="container projects-section fluid">
            <div
                data-is="proxy"
                style=""
                :class="'admin-project-content ' + grid + '-view'"
            >
                <div class="sites-group-list slide-down-animation">
                    <div class="sites-group">
                        <div class="sites-domains">
                            <div
                                v-if="grid == 'table'"
                                class="row admin-project-table-header"
                            >
                                <div
                                    class="admin-project-table-header__col col col-1"
                                ></div>
                                <div
                                    class="admin-project-table-header__col col admin-project-col-name text-shade"
                                >
                                    Название
                                </div>
                                <div
                                    class="admin-project-table-header__col col col-3 text-shade"
                                >
                                    Домен
                                </div>
                                <div
                                    class="admin-project-table-header__col col col-3 text-shade"
                                >
                                    Последнее сохранение
                                </div>
                            </div>

                            <SiteGrid
                                v-for="site in sites"
                                :key="site.id"
                                :site="site"
                                :grid="grid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <div
        v-if="isDropdownProfile"
        ref="balloon"
        tabindex="0"
        data-layers-events="ignore"
        class="dropdown__balloon balloon dropdown__balloon--default balloon-append-to-body in-bottom"
        is-show="true"
        style="inset: 75px 8em auto auto"
    >
        <div class="arrow" ref="arrow" style="left: 73.246px"></div>
        <div
            ref="content"
            class="dropdown__balloon_content flexbe-balloon-content"
        >
            <div ref="proxy-slot">
                <div class="editor-items-list">
                    <div
                        class="flexbe-list hoverable hoverable-background vertical-gaps"
                    >
                        <a class="flexbe-list-item" href="/admin/user/profile"
                            ><span>Профиль</span></a
                        >
                        <a class="flexbe-list-item" href="/profile/logout"
                            ><span>Выйти из аккаунта</span></a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
