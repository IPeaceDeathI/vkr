<script>
import { RouterLink } from "vue-router";
import AdminIcon from "@/components/ui/AdminIcon.vue";

export default {
    components: { AdminIcon },
    data() {
        return {
            links: [
                { name: "Сайты", href: "/admin/sites/", icon: "domain" },
                { name: "Страницы", href: "/admin/pages/", icon: "pages" },
                { name: "Заявки", href: "/admin/crm/", icon: "leads" },
                // { 'name': 'Аналитика', 'href': '/admin/stat/',             'icon': 'stat' },
                {
                    name: "Настройки",
                    href: "/admin/settings/general/",
                    icon: "settings",
                },
                // { 'name': 'Товары', 'href': '/admin/ecommerce/', 'icon': 'ecommerce'  },
            ],
        };
    },
};
</script>

<template>
    <div
        is="flexbe-admin-panel"
        class="flexbe-panel flexbe-admin-panel admin-ui"
    >
        <div is="flexbe-panel-project" class="flexbe-panel-project">
            <div class="project-actions">
                <RouterLink
                    v-for="(item, index) in links"
                    :key="index"
                    :to="item.href"
                    custom
                    v-slot="{ href, route, navigate, isActive, isExactActive }"
                >
                    <a
                        :href="item.href"
                        :class="
                            'link ' +
                            (isActive
                                ? 'flexbe-button on-dark projects-button'
                                : '')
                        "
                    >
                        <!-- <svg is="flexbe-icon" icon="domain" sprite="/assets/images/panel.svg?1c7acb5f" class="flexbe-icon size-18 ">
							<use :href="'/assets/images/panel.svg?1c7acb5f#' + item.icon"></use>
						</svg> -->
                        <AdminIcon path="panel" :name="item.icon" :size="16" />
                        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
                        <span class="flexbe-text">{{ item.name }}</span>
                    </a>
                </RouterLink>
            </div>

            <div class="user-actions">
                <a
                    href="/admin/user/pay/"
                    class="pay-expire warning tooltipstered"
                    data-tip="Оплачено до 11.05.2023"
                >
                    Заблокирован
                </a>
                <a class="link pay-btn" href="/admin/user/pay/">
                    <span>Оплата</span>
                </a>
                <!-- <div class="link"><span>Помощь</span><em class="support-action-mark">8</em>
					<div is="proxy" class="actions-popup support-popup" data-is="dropdown">
						<div class="toggle-helper"></div>
					</div>
				</div> -->
                <div class="user-info">
                    <div class="user-pic">
                        <RouterLink
                            to="/admin/user/profile/"
                            v-slot="{
                                href,
                                route,
                                navigate,
                                isActive,
                                isExactActive,
                            }"
                            is="proxy"
                            data-is="user-avatar"
                            class="user-avatar"
                        >
                            <div class="user-avatar--symbol font-ui">
                                <div
                                    class="background"
                                    style="background: #ff6646"
                                ></div>
                                <span class="symbol">R</span>
                            </div>
                            <div
                                class="user-avatar--image"
                                style="
                                    background-image: url(https://www.gravatar.com/avatar/c05884205acd8de2d56b8eb2b790a110?s=120&amp;d=blank);
                                "
                            ></div>
                        </RouterLink>
                    </div>
                    <div
                        is="proxy"
                        class="actions-popup user-popup"
                        data-is="dropdown"
                    >
                        <div
                            class="toggle-helper tooltipstered"
                            data-tip="Ваш профиль"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
