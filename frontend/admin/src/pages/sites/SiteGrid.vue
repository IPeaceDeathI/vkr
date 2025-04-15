<script>
import Icon from "@/components/ui/AdminIcon.vue";

import SitesDots from "@/pages/sites/SitesDots.vue";

export default {
    components: { Icon, SitesDots },
    props: {
        grid: {
            type: String,
            required: true,
        },
        site: {
            type: Array,
            required: true,
        },
    },
    inject: ["settings"],
    data() {
        return {
            focusChangeTitle: false,
        };
    },
    mounted() {
        console.log(this.settings);
    },
};
</script>

<template>
    <div
        class="admin-project-item clickable place-item"
        transfer="transfer"
        is-clickable="is-clickable"
        delete="delete"
        data-project-id="560722"
    >
        <div
            v-if="grid == 'grid'"
            class="project-card flexbe-white-card shadow hoverable"
        >
            <div class="site-header">
                <img
                    v-if="site.favicon"
                    class="favicon mr10"
                    :src="site.favicon"
                />
                <Icon
                    v-if="!site.favicon"
                    path="addons"
                    name="logo"
                    size="16"
                    class="favicon mr10"
                />
                <a
                    :class="
                        'text-content flexbe-text site-title ' +
                        (!site.domain ? 'text-shade' : '')
                    "
                    :href="
                        '//' +
                        site.sub_domain +
                        '.' +
                        settings.SITE_DOMAIN +
                        '/admin/pages'
                    "
                >
                    {{ site.domain }}
                    <span v-if="!site.domain" data-is="raw"
                        >Домен не подключен</span
                    >
                </a>
                <div
                    v-if="!site.status"
                    class="site-tag is-secondary clickable"
                >
                    <Icon path="projects" name="draft" size="16" />
                    <span class="flexbe-text">Черновик</span>
                    <div data-is="dropdown">
                        <div class="toggle-helper"></div>
                    </div>
                </div>
                <a
                    v-if="site.leads"
                    class="site-tag flexbe-button filled small is-primary clickable"
                    :href="
                        '//' +
                        site.sub_domain +
                        '.' +
                        settings.SITE_DOMAIN +
                        '/admin/crm/'
                    "
                >
                    <span class="flexbe-text">{{ site.leads }} заявок</span>
                </a>
                <div class="flexbe-action-buttons">
                    <div class="action-button">
                        <SitesDots :site="site" />
                        <!-- <div is="admin-project-item-dropdown" relative=".flexbe-white-card" min-width="230" transfer="transfer" delete="delete" allow-change-is-draft="allow-change-is-draft" class="admin-project-item-dropdown ">
                        <div class="menu-list" data-is="dropdown">
                            <div class="toggle-helper"></div>
                        </div>
                    </div> -->
                    </div>
                </div>
            </div>
            <a
                class="site-preview-wrap"
                :href="
                    '//' +
                    site.sub_domain +
                    '.' +
                    settings.SITE_DOMAIN +
                    '/admin/pages'
                "
            >
                <div class="site-preview">
                    <div
                        class="preview-image"
                        :style="
                            'background-image: url(' +
                            (site.preview_src ?? '') +
                            ')'
                        "
                    ></div>
                </div>
            </a>
            <div class="site-footer">
                <div
                    class="site-footer__name admin-project-name justify-between"
                >
                    <!-- +'flexbe-input flexbe-input--text' -->
                    <div
                        :class="
                            'text-content flexbe-text site-title ' +
                            (!site.title ? 'text-shade' : '')
                        "
                    >
                        <span v-if="site.title" data-is="raw" autofocus="true">
                            {{ site.title }}
                        </span>
                        <span v-if="!site.title" data-is="raw">
                            Укажите название сайта
                        </span>
                    </div>

                    <div
                        :class="
                            'flexbe-button ' +
                            (focusChangeTitle
                                ? 'is-secondary filled'
                                : 'style-text edit-button')
                        "
                        @click="focusChangeTitle = !focusChangeTitle"
                    >
                        <div class="flexbe-icon size-16">
                            <Icon path="projects" name="rename" size="16" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="grid == 'table'" class="admin-project-item__inner">
            <div class="admin-project-item__row row flex-nowrap">
                <div class="admin-project-item__col col col-1 preview-col">
                    <a
                        class="preview-image"
                        :style="
                            'background-image: url(' +
                            (site.preview_src ?? '') +
                            ')'
                        "
                        :href="
                            '//' +
                            site.sub_domain +
                            '.' +
                            settings.SITE_DOMAIN +
                            '/admin/pages'
                        "
                    ></a>
                </div>
                <div class="admin-project-item__col col admin-project-col-name">
                    <div class="admin-project-name">
                        <div
                            :class="
                                'text-content flexbe-text site-title ' +
                                (!site.title ? 'text-shade' : '')
                            "
                        >
                            <a
                                v-if="site.title"
                                data-is="raw"
                                autofocus="true"
                                :href="
                                    '//' +
                                    site.sub_domain +
                                    '.' +
                                    settings.SITE_DOMAIN +
                                    '/admin/pages'
                                "
                            >
                                {{ site.title }}
                            </a>
                            <span v-if="!site.title" data-is="raw">
                                Укажите название сайта
                            </span>
                        </div>
                        <!-- <div class="flexbe-button style-text edit-button">
                            <Icon path="projects" name="rename" size="16" />
                        </div> -->
                    </div>
                </div>
                <div class="admin-project-item__col col col-3">
                    <a
                        :class="
                            'text-content flexbe-text site-title ' +
                            (!site.domain ? 'text-shade' : '')
                        "
                        :href="
                            site.domain ? '//' + site.domain : '/admin/pages/'
                        "
                    >
                        {{ site.domain }}
                        <span v-if="!site.domain" data-is="raw"
                            >Домен не подключен</span
                        >
                    </a>
                </div>
                <div class="admin-project-item__col col col-2">
                    <div class="text-content flexbe-text">10.10.2023</div>
                </div>
                <div class="admin-project-item__col col col-2">
                    <div v-if="site.status" class="site-tag is-green clickable">
                        <span class="flexbe-text">Опубликован</span>
                        <div data-is="dropdown">
                            <div class="toggle-helper"></div>
                        </div>
                    </div>
                    <div
                        v-if="!site.status"
                        class="site-tag is-secondary clickable"
                    >
                        <Icon path="projects" name="draft" size="16" />
                        <span class="flexbe-text">Черновик</span>
                        <div data-is="dropdown">
                            <div class="toggle-helper"></div>
                        </div>
                    </div>
                </div>
                <div class="admin-project-item__col col">
                    <SitesDots :site="site" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.admin-project-name .flexbe-input {
    margin: 0;
}

.admin-project-item .site-preview .preview-image {
    transition: background-position 10s ease-out;
    background-position: center 0%;
}
.admin-project-item .site-preview .preview-image:hover {
    background-position: center 100%;
}
</style>
