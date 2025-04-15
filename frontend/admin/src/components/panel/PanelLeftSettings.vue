<script>
import PanelLeft from "./PanelLeft.vue";

export default {
    components: { PanelLeft },
    inject: ["settings"],
    data() {
        return {
            panel_title: "Настройки",
        };
    },
    computed: {
        panel_left() {
            let start = "/sites/" + this.settings.site_id + "/settings";
            return {
                common: {
                    name: "Основные",
                    links: [
                        {
                            name: "SEO настройки",
                            href: start,
                            icon: "settings-code",
                        },
                        {
                            name: "Прикрепить домен",
                            href: start + "/domain",
                            icon: "localization",
                        },
                        {
                            name: "Код доступа",
                            href: start + "/access_code",
                            icon: "QR",
                        },
                        {
                            name: "Поддомен",
                            href: start + "/sub_domain",
                            icon: "api",
                        },
                        {
                            name: "Уведомления заявок",
                            href: "/admin/settings/notify/",
                            icon: "notification",
                        },
                        {
                            name: "Удалить сайт",
                            href: start + "/delete_site",
                            icon: "remove",
                        },
                        // {
                        //     name: "Общие",
                        //     href: "/admin/settings/general/",
                        //     icon: "general",
                        // },
                        // {
                        //     name: "Домены",
                        //     href: "/admin/settings/domains/",
                        //     icon: "localization",
                        // },
                        // {
                        //     name: "Вставка кода",
                        //     href: "/admin/settings/code/",
                        //     icon: "code",
                        // },
                    ],
                },
                integration: {
                    name: "Интеграции",
                    links: [
                        {
                            href: start + "/application_statuses",
                            name: "Статусы заявок",
                            icon: "draggable",
                        },
                        {
                            href: start + "/code_insert",
                            name: "Вставить код",
                            icon: "code",
                        },
                        {
                            href: start + "/amo_crm",
                            name: "Подключить amoCRM",
                            icon: "user",
                        },
                        {
                            href: start + "/roistat_webhook",
                            name: "Roistat (WebHook)",
                            icon: "params",
                        },
                        {
                            href: start + "/roistat_proxy_lead",
                            name: "Roistat (ProxyLead)",
                            icon: "empty-code",
                        },
                        {
                            href: start + "/activity",
                            name: "Activity",
                            icon: "icon-check",
                        },
                        // {
                        //     name: "Аналитика",
                        //     href: "/admin/settings/integration_counters/",
                        //     icon: "counters",
                        // },
                        // {
                        //     name: "Экспорт заявок",
                        //     href: "/admin/settings/integration_crm/",
                        //     icon: "crm",
                        // },
                    ],
                },
            };
        },
    },
};
</script>

<template>
    <PanelLeft :panel_title="panel_title" :panel_left="panel_left" />
</template>
