import { createRouter, createWebHistory } from "vue-router";

import PanelTop from "@/components/panel/PanelTop.vue";
import PanelLeftSettings from "@/components/panel/PanelLeftSettings.vue";
import PanelLeftUser from "@/components/panel/PanelLeftUser.vue";
import LeftMenu from "@/components/ui/LeftMenuNew.vue";
// import LeftDetail from '@/pages/crm/elements/LeftDetail.vue'

import SitesPage from "@/pages/sites/index.vue";
import PagesPage from "@/pages/pages/index.vue";
import LeadPage from "@/pages/lead/index.vue";

import CrmPage from "@/pages/crm/index.vue";
import CrmPageDetail from "@/pages/crm/detail.vue";

import LeadViewPage from "@/pages/lead/view.vue";

import SettingsGeneral from "@/pages/settings/general.vue";
import SettingsDomains from "@/pages/settings/domains.vue";
import SettingsNotify from "@/pages/settings/notify.vue";
import SettingsCode from "@/pages/settings/code.vue";
import SettingsIntegrationCounters from "@/pages/settings/integration_counters.vue";
import SettingsIntegrationCRM from "@/pages/settings/integration_crm.vue";

import UserProfile from "@/pages/user/profile.vue";
import UserPay from "@/pages/user/pay.vue";
import UserPayPlan from "@/pages/user/pay_plan.vue";
import UserPayInvoices from "@/pages/user/pay_invoices.vue";
import UserNotify from "@/pages/user/notify.vue";
import UserReferal from "@/pages/user/referal.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: "active",
    routes: [
        {
            path: "/admin",
            components: {
                default: SitesPage,
                panel: PanelTop,
            },
        },
        {
            path: "/admin/sites",
            meta: {
                classCommon: "sites-page block",
                classWrapper: "zero-left",
            },
            components: {
                default: SitesPage,
                // panel: LeftMenu,
            },
        },
        {
            path: "/admin/pages",
            meta: {
                classCommon: "block",
            },
            components: {
                default: PagesPage,
                panel: LeftMenu,
            },
        },
        {
            path: "/admin/lead",
            children: [
                {
                    path: "",
                    components: {
                        default: LeadPage,
                        panel: PanelTop,
                    },
                },
                {
                    path: "view/:view_id",
                    components: {
                        default: LeadViewPage,
                        panel: PanelTop,
                    },
                },
            ],
        },
        {
            path: "/admin/crm",
            children: [
                {
                    path: "",
                    components: {
                        default: CrmPage,
                        panel: LeftMenu,
                    },
                },
                {
                    path: "detail/:lead_id",
                    components: {
                        default: CrmPageDetail,
                        panel: LeftMenu,
                        // sidebar: LeftDetail,
                    },
                },
            ],
        },
        {
            path: "/admin/settings",
            children: [
                {
                    path: "general",
                    components: {
                        default: SettingsGeneral,
                        panel: LeftMenu,
                        sidebar: PanelLeftSettings,
                    },
                },
                {
                    path: "domains",
                    components: {
                        default: SettingsDomains,
                        panel: LeftMenu,
                        sidebar: PanelLeftSettings,
                    },
                },
                {
                    path: "notify",
                    components: {
                        default: SettingsNotify,
                        panel: LeftMenu,
                        sidebar: PanelLeftSettings,
                    },
                },
                {
                    path: "code",
                    components: {
                        default: SettingsCode,
                        panel: LeftMenu,
                        sidebar: PanelLeftSettings,
                    },
                },
                {
                    path: "integration_counters",
                    components: {
                        default: SettingsIntegrationCounters,
                        panel: LeftMenu,
                        sidebar: PanelLeftSettings,
                    },
                },
                {
                    path: "integration_crm",
                    components: {
                        default: SettingsIntegrationCRM,
                        panel: LeftMenu,
                        sidebar: PanelLeftSettings,
                    },
                },
            ],
        },
        {
            path: "/admin/user",
            children: [
                {
                    path: "profile",
                    components: {
                        default: UserProfile,
                        panel: LeftMenu,
                        sidebar: PanelLeftUser,
                    },
                },
                {
                    path: "pay",
                    components: {
                        default: UserPay,
                        panel: LeftMenu,
                        sidebar: PanelLeftUser,
                    },
                },
                {
                    path: "pay_plan",
                    components: {
                        default: UserPayPlan,
                        panel: LeftMenu,
                        sidebar: PanelLeftUser,
                    },
                },
                {
                    path: "pay_invoices",
                    components: {
                        default: UserPayInvoices,
                        panel: LeftMenu,
                        sidebar: PanelLeftUser,
                    },
                },
                {
                    path: "notify",
                    components: {
                        default: UserNotify,
                        panel: LeftMenu,
                        sidebar: PanelLeftUser,
                    },
                },
                {
                    path: "referal",
                    components: {
                        default: UserReferal,
                        panel: LeftMenu,
                        sidebar: PanelLeftUser,
                    },
                },
            ],
        },
    ],
});

export default router;
