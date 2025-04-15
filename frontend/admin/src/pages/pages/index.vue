<script>
import Loader from "@/components/ui/Loader.vue";
import axios from "axios";

import PagesElem from "@/pages/pages/PagesElem.vue";

export default {
    components: { Loader, PagesElem },
    inject: ["settings"],
    data() {
        return {
            isActive: false,
            page_id: 0,
            pages: [{ id: 1 }],
        };
    },
    mounted() {
        axios
            .get(this.settings.SITE_PATH + "/api/admin/pages")
            .then((response) => (this.pages = response.data.data.pages));
    },
    methods: {
        async addPage() {
            await axios
                .post(this.settings.SITE_PATH + "/api/sites/add_page")
                .then((result) => {
                    // this.$router.go(result.data.data.move_to_constructor);
                    window.location = result.data.data.move_to_constructor;
                });
        },
    },
};
</script>

<template>
    <Loader />
    <div
        data-is="admin-pages-list"
        class="admin-pages-list scrollable-content container fluid"
    >
        <header class="fade-in-animation group-title">
            <div
                data-is="admin-breadcrumbs"
                index="0"
                class="admin-breadcrumbs pages-breadcrumbs text-title"
            >
                <a
                    class="style-link-ignore breadcrumb first active"
                    href="/admin/pages/"
                >
                    Страницы
                </a>
            </div>
            <div class="flexbe-buttons-line">
                <!-- <div class="flexbe-button large rounded bordered is-primary add-folder show"> <span class="flexbe-text">Создать папку</span> </div> -->
                <a
                    class="flexbe-button large rounded filled is-primary add-page"
                    @click="addPage()"
                >
                    <span class="flexbe-text">Создать страницу</span>
                </a>
            </div>
        </header>
        <div ref="content" class="content slide-down-animation">
            <div class="pages-list" ref="pages">
                <PagesElem
                    v-for="item in pages"
                    :key="item.id"
                    :item="item"
                    @openBoxDetail="
                        (value) => {
                            isActive = true;
                            page_id = value;
                        }
                    "
                />
            </div>
            <!-- <div class="load-more" ref="more"></div> -->
        </div>
    </div>

    <!-- <v-dialog v-model="isActive">
        <BoxDetail @closeQuality="isActive = false" :page_id="page_id" />
    </v-dialog> -->
</template>
