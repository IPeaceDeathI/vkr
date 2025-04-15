<script>
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon },
    inject: ["settings", "menuLeftLinks"],
    props: {
        site: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isActive: false,
        };
    },
};
</script>

<template>
    <div class="flexbe-action-buttons">
        <div class="action-button">
            <Icon path="projects" name="more" size="18" />
            <div
                is="admin-project-item-dropdown"
                relative=".flexbe-white-card"
                min-width="230"
                transfer="transfer"
                delete="delete"
                allow-change-is-draft="allow-change-is-draft"
                :class="
                    'admin-project-item-dropdown ' +
                    (isActive ? 'in-dropdown focus' : '')
                "
            >
                <div class="menu-list" is="proxy" data-is="dropdown">
                    <div
                        class="toggle-helper"
                        @click="isActive = !isActive"
                    ></div>
                    <div
                        ref="balloon"
                        tabindex="0"
                        data-layers-events="ignore"
                        class="dropdown__balloon balloon dropdown__balloon--default in-bottom"
                        is-show="true"
                        style="inset: 28px auto auto -177px"
                        v-if="isActive"
                    >
                        <div
                            class="arrow"
                            ref="arrow"
                            style="left: 184px"
                        ></div>
                        <div
                            ref="content"
                            class="dropdown__balloon_content flexbe-balloon-content"
                            style="min-width: 230px"
                        >
                            <div ref="proxy-slot">
                                <div class="editor-items-list">
                                    <div
                                        class="flexbe-list borderless opacify hoverable hoverable-background vertical-gaps"
                                    >
                                        <a
                                            :href="
                                                '//' +
                                                site.sub_domain +
                                                '.' +
                                                settings.SITE_DOMAIN +
                                                '/sites/' +
                                                site.id +
                                                '/settings/domain'
                                            "
                                            class="flexbe-list-item"
                                        >
                                            <Icon
                                                path="projects"
                                                name="globe"
                                                size="16"
                                            />
                                            <span class="flexbe-text"
                                                >Подключить домен</span
                                            >
                                        </a>

                                        <a
                                            v-for="(
                                                item, index
                                            ) in menuLeftLinks"
                                            :key="index"
                                            v-show="
                                                [
                                                    'Страницы',
                                                    'Квизы',
                                                    'Заявки',
                                                    'Аналитика',
                                                    'Настройки',
                                                ].indexOf(item.name) != -1
                                            "
                                            :href="
                                                '//' +
                                                site.sub_domain +
                                                '.' +
                                                settings.SITE_DOMAIN +
                                                item.href.replace(
                                                    /(\[site_id\])/,
                                                    settings.site_id,
                                                )
                                            "
                                            :class="'flexbe-list-item'"
                                        >
                                            <Icon
                                                path="panel"
                                                :name="item.icon"
                                                size="16"
                                            />
                                            <span class="flexbe-text">{{
                                                item.name
                                            }}</span>
                                        </a>

                                        <hr class="flexbe-hr m0" />

                                        <a
                                            :href="
                                                '//' +
                                                site.sub_domain +
                                                '.' +
                                                settings.SITE_DOMAIN +
                                                '/sites/' +
                                                site.id +
                                                '/settings/delete_site'
                                            "
                                            class="flexbe-list-item"
                                        >
                                            <Icon
                                                path="projects"
                                                name="delete"
                                                size="16"
                                            />
                                            <span class="flexbe-text"
                                                >Удалить</span
                                            >
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
