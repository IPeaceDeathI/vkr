<script>
import PanelLeft from "./PanelLeft.vue";

export default {
    components: { PanelLeft },
    data() {
        return {
            panel_title: "Аккаунт",
            panel_left: {
                common: {
                    name: "Основные",
                    links: [
                        {
                            name: "Профиль",
                            href: "/admin/user/profile/",
                            icon: "user-profile",
                        },
                        // {
                        //     name: "Оплата",
                        //     href: "/admin/user/pay/",
                        //     icon: "user-pay",
                        // },
                        {
                            name: "Тарифный план",
                            href: "/admin/user/pay_plan/",
                            icon: "user-pay",
                        },
                        // {
                        //     name: "История платежей",
                        //     href: "/admin/user/pay_invoices/",
                        //     icon: "user-pay-invoices",
                        // },
                        {
                            name: "Уведомления аккаунта",
                            href: "/admin/user/notify/",
                            icon: "notification",
                        },
                        {
                            name: "Реферальная программа",
                            href: "/admin/user/referal/",
                            icon: "user-pay-plan",
                        },
                    ],
                },
                exit: {
                    name: "Сменить аккаунт",
                    links: [
                        {
                            name: "Выйти",
                            href: "/profile/logout",
                            icon: "exit",
                        },
                    ],
                },
                // addons: {
                //     name: 'Основные',
                //     links: [
                //         { name: 'Пользователи', href: '/admin/user/members/', icon: 'user-access' },
                //     ],
                // },
            },
        };
    },
};
</script>

<template>
    <PanelLeft :panel_title="panel_title" :panel_left="panel_left" />
</template>
