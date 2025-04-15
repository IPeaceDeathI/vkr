<script setup>
import { RouterView } from "vue-router";
import storeSettings from "@/shared/storeSettings";
import { provide } from "vue";

storeSettings().setId(document);

var settings = storeSettings().getId();
provide("settings", settings);
// console.log(settings);

if (
    settings.site_id == -1 &&
    window.location.pathname != "/admin/sites" &&
    window.location.pathname.indexOf("/admin/user") == -1
) {
    window.location = "/admin/sites";
}

// @left_menu
provide("menuLeftLinks", [
    { name: "Сайты", href: "/admin/sites/", icon: "domain" },
    { name: "Страницы", href: "/admin/pages/", icon: "pages" },
    { name: "Квизы", href: "/quiz/", icon: "ecommerce" },
    { name: "Заявки", href: "/admin/crm/", icon: "leads" },
    { name: "Аналитика", href: "/stats/", icon: "stat" },
    { name: "Настройки", href: "/sites/settings/", icon: "settings" },
    { name: "Оплата", href: "/admin/user/pay_plan/", icon: "pay" },
    { name: "Аккаунт", href: "/admin/user/profile/", icon: "logo" },
]);
</script>

<template>
    <RouterView name="panel" />

    <div
        :class="
            'admin-content-wrapper scrollable-content ' +
            $route.meta.classWrapper
        "
        id="app"
    >
        <!-- admin-content-wrapper  В  /user/pay_invoices чтобы работали отступы в .container -->
        <div
            data-is="app-common"
            :class="'app-common ' + $route.meta.classCommon"
        >
            <RouterView name="sidebar" />

            <div class="admin-content">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style>
.group-title,
.admin-project-table-header {
    background: none;
}
.app-common,
body {
    background: #fafafa;
}
#page_holder {
    background-color: #f5f5f5;
}
.admin-content-wrapper.zero-left {
    padding-left: 0px !important;
}
</style>
