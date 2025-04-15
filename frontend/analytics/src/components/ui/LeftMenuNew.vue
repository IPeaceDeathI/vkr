<script>
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon },
    data() {
        return {
            // @left_menu
            menuLeftLinks: [
                { name: "Сайты", href: "/admin/sites/", icon: "domain" },
                { name: "Страницы", href: "/admin/pages/", icon: "pages" },
                { name: "Квизы", href: "/quiz/", icon: "ecommerce" },
                { name: "Заявки", href: "/admin/crm/", icon: "leads" },
                { name: "Аналитика", href: "/stats/", icon: "stat" },
                {
                    name: "Настройки",
                    href: "/sites/settings/",
                    icon: "settings",
                },
                { name: "Оплата", href: "/admin/user/pay_plan/", icon: "pay" },
                { name: "Аккаунт", href: "/admin/user/profile/", icon: "logo" },
            ],
        };
    },
};
</script>

<template>
    <div class="menu-navigation">
        <a
            v-for="item in menuLeftLinks"
            :key="index"
            :href="item.href"
            :class="'button-nav '"
        >
            <div class="svg-button-nav">
                <Icon path="panel" :name="item.icon" size="24" />
            </div>
            <div class="name-button-nav">{{ item.name }}</div>
        </a>
    </div>
</template>

<style>
.admin-content-wrapper {
    padding-left: 65px !important;
}
</style>
<style>
.menu-navigation {
    background: #1b3446;
    height: 100%;
    width: 65px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.button-nav {
    padding: 10px 0;
    outline: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none !important;
    color: #9da8ae;
    transition: all 0.3s;
}
.button-nav:hover {
    color: #fff;
}
.button-nav.active {
    background-color: #5b627a;
    color: #fff;
}
.name-button-nav {
    max-width: 100%;
    display: block;
    max-height: 1.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11px;
    font-weight: 400;
    line-height: 1.2rem;
    min-width: 10px !important;
}

.image-button-nav {
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    cursor: pointer;
}
.svg-button-nav {
    height: 30px;
    text-align: center;
}
.svg-button-nav svg {
    width: 24px;
    height: 24px;
    margin-top: 4px;
}
.flexbe-icon {
    fill: currentColor;
    fill-rule: evenodd;
    clip-rule: evenodd;
    max-width: 100%;
    max-height: 100%;
    --iconSize: 14px;
    flex-shrink: 0;
    image-rendering: optimizequality;
}
.button-nav:first-child {
    border-bottom: 1px solid #224357;
    background: #162b3a;
}
.button-nav:last-child {
    border-top: 1px solid #224357;
    background: #162b3a;
}
.button-nav:nth-last-child(2) {
    margin-top: auto;
}
</style>
