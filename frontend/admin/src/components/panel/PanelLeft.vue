<script>
import { RouterLink } from "vue-router";

import Loader from "@/components/ui/Loader.vue";
import AdminIcon from "@/components/ui/AdminIcon.vue";

export default {
    components: { AdminIcon, Loader },
    props: {
        panel_title: {
            type: String,
            required: true,
        },
        panel_left: {
            type: Array,
            required: true,
        },
    },
};
</script>

<template>
    <Loader />

    <div
        data-is="settings-side-menu"
        class="admin-side-menu settings-side-menu"
    >
        <div data-is="side-menu" class="side-menu">
            <div class="menu-header">
                <div class="flexbe-title text-title">{{ panel_title }}</div>
            </div>

            <div class="item-list-outer">
                <div v-for="(chapter, index) in panel_left" :key="index">
                    <div class="item-list-outer">
                        <div class="list-title">{{ chapter.name }}</div>
                        <div class="item-list">
                            <RouterLink
                                v-for="(item, index) in chapter.links"
                                :key="index"
                                :to="item.href"
                                custom
                                v-slot="{
                                    href,
                                    route,
                                    navigate,
                                    isActive,
                                    isExactActive,
                                }"
                            >
                                <a
                                    :href="item.href"
                                    :class="
                                        'menu-item ' +
                                        (isActive ? 'active' : '')
                                    "
                                >
                                    <div class="menu-item__inner">
                                        <AdminIcon
                                            path="settings"
                                            :name="item.icon"
                                            :size="16"
                                        />
                                        <span class="flexbe-text">{{
                                            item.name
                                        }}</span>
                                    </div>
                                </a>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
