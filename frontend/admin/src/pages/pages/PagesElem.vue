<script>
import Icon from "@/components/ui/AdminIcon.vue";
import QualityRating from "@/components/QualityRating/QualityRating.vue";

export default {
    components: { Icon, QualityRating },
    inject: ["settings"],
    props: {
        item: {
            type: Array,
            required: true,
        },
    },
    emits: {
        openBoxDetail: (value) => true,
    },
    data() {
        return {
            isActive: false,
        };
    },
};
</script>

<template>
    <div class="page-item">
        <div data-is="admin-pages-page-item" class="admin-pages-page-item">
            <QualityRating
                :page_id="item.id"
                @openBoxDetail="$emit('openBoxDetail', item.id)"
            />
            <div class="flexbe-white-card shadow hoverable">
                <div class="page-preview-wrap">
                    <a
                        :href="
                            item.version_editor == 1
                                ? settings.SITE_PATH +
                                  '/' +
                                  'constructor/edit?id_page=' +
                                  item.id
                                : settings.SITE_PATH +
                                  '/' +
                                  'constructor_2/edit?site_page_id=' +
                                  item.id
                        "
                        class="page-preview"
                        :style="
                            'background-color: #FFF; background-image: url(' +
                            item.preview_src +
                            ')'
                        "
                    >
                    </a>
                    <div class="page-data">
                        <div class="page-title">
                            <span class="flexbe-text">
                                {{ item.title }} {{ item.page_id }}
                            </span>
                        </div>
                        <a
                            :href="settings.SITE_PATH + '/' + (item.uri ?? '')"
                            class="page-url"
                            data-is="raw"
                        >
                            <span class="domain">{{
                                settings.subdomain +
                                "." +
                                settings.SITE_DOMAIN +
                                "/"
                            }}</span>
                            <span class="uri">{{
                                item.uri ? item.uri : ""
                            }}</span>
                        </a>
                        <div
                            data-is="admin-pages-page-item-actions"
                            :class="
                                'admin-pages-page-item-actions ' +
                                (isActive ? 'in-dropdown focus' : '')
                            "
                        >
                            <Icon path="pages" name="dots" size="18" />
                            <dropdown
                                class="dropdown-parent"
                                data-scope="parent"
                                autohide=".action"
                                position="end"
                                arrow-to=".admin-pages-page-item-actions"
                                relative=".admin-pages-page-item"
                                offset-x="10"
                            >
                                <div
                                    class="toggle-helper"
                                    @click="isActive = !isActive"
                                ></div>
                                <div
                                    v-if="isActive"
                                    ref="balloon"
                                    tabindex="0"
                                    data-layers-events="ignore"
                                    class="dropdown__balloon balloon dropdown__balloon--default in-bottom"
                                    is-show="true"
                                    style="inset: 20px auto auto -185px"
                                >
                                    <div
                                        class="arrow"
                                        ref="arrow"
                                        style="left: 187.656px"
                                    ></div>
                                    <div
                                        ref="content"
                                        class="dropdown__balloon_content flexbe-balloon-content"
                                    >
                                        <div
                                            class="flexbe-list borderless opacify hoverable hoverable-background round-corners"
                                        >
                                            <a
                                                :href="
                                                    '/sites/' +
                                                    item.id_site +
                                                    '/page/' +
                                                    item.id +
                                                    '/settings/'
                                                "
                                                class="flexbe-list-item action"
                                            >
                                                <Icon
                                                    path="pages"
                                                    name="settings"
                                                    size="16"
                                                />
                                                <span class="flexbe-text"
                                                    >Настроить</span
                                                >
                                            </a>
                                            <a
                                                :href="
                                                    '/sites/' +
                                                    item.id_site +
                                                    '/page/' +
                                                    item.id +
                                                    '/settings/clone_page'
                                                "
                                                class="flexbe-list-item action"
                                            >
                                                <Icon
                                                    path="pages"
                                                    name="copy"
                                                    size="16"
                                                />
                                                <span class="flexbe-text"
                                                    >Дублировать</span
                                                >
                                            </a>
                                            <!-- <a class="flexbe-list-item action">
                                            <Icon path="pages" name="copy-link" size="16" />
                                            <span class="flexbe-text">Копировать ссылку</span> 
                                        </a> -->
                                        </div>
                                    </div>
                                </div>
                            </dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.admin-pages-list .page-item {
    z-index: 101;
}

.admin-pages-page-item .page-preview {
    transition: background-position 10s ease-out;
    background-position: center 0%;
}
.admin-pages-page-item .page-preview:hover {
    background-position: center 100%;
}
</style>
