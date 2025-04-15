<script>
import AdminIcon from "@/components/ui/AdminIcon.vue";
import axios from "axios";

export default {
    components: { AdminIcon },
    inject: ["settings", "menuLeftLinks"],
    data() {
        return {
            balance: null,
        };
    },
    mounted() {
        axios
            .get(
                this.settings.SITE_PATH +
                    "/api/flow/method/get_info_current_tariff",
            )
            .then(
                (response) => (
                    (this.balance = response.data.data),
                    console.log(this.balance)
                ),
            );
    },
    methods: {
        calcActive(item) {
            // console.log(settings.SPLIT[2], item.href.split("/")[3]);
            // if (settings.SPLIT[2] == item.href.split("/")[3])
            if (settings.SPLIT[1] == item.href.split("/")[2]) return "active";
            return "";
        },
    },
};
</script>

<template>
    <!-- @left_menu_render -->
    <div class="menu-navigation">
        <a
            v-for="(item, index) in menuLeftLinks"
            :key="index"
            :href="item.href"
            :class="
                'button-nav ' +
                (settings.SPLIT[1] == item.href.split('/')[2] &&
                settings.SPLIT[1] != 'user'
                    ? 'active'
                    : '')
            "
        >
            <div class="svg-button-nav">
                <AdminIcon path="panel" :name="item.icon" size="24" />
            </div>
            <div v-if="item.name == 'Оплата'" class="name-button-nav">
                {{ balance.flow_balance }} руб.
            </div>
            <div v-else class="name-button-nav">{{ item.name }}</div>
        </a>
    </div>
</template>

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
