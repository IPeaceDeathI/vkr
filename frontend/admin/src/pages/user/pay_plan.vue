<script>
import Icon from "@/components/ui/AdminIcon.vue";
import axios from "axios";

import DropdownElem from "@/components/ui/Dropdown.vue";

export default {
    components: { Icon, DropdownElem },
    inject: ["settings"],
    data() {
        return {
            pageData: null,
            periodSystem: false,
            addonsSitesSystem: false,
            tipSystem: false,
            archiveTarifSystem: false,
            paymentSum: 1500, // null
            balance: null,
            idMaximumTariff: 5,
            tariff_plans: {
                // 1: { name: "Стартовый", price: 750, sites: "1 сайт" },
                // 2: { name: "Малый бизнес", price: 950, sites: "1 сайт" },
                // 3: { name: "Бизнес", price: 1500, sites: "3 сайта" },
                3: { name: "Стартовый", sum: 490, sites: "1 сайт" },
                4: { name: "Малый бизнес", sum: 890, sites: "1 сайт" },
                5: { name: "Бизнес", sum: 1790, sites: "3 сайта" },
            },
            tariff_features: [
                {
                    name: "1000 страниц на сайте",
                    blocked: [],
                    class: "",
                    info: "",
                },
                {
                    name: "Прикрепление домена",
                    blocked: [],
                    class: "",
                    info: "",
                },
                {
                    name: "SSL сертификат (https://)",
                    blocked: [],
                    class: "",
                    info: "",
                },
                {
                    name: "Скрытие лейбла Landing Page",
                    blocked: [3],
                    class: "",
                    info: "",
                },
                // { name: '1 доп. пользователь', blocked: [], class: '', info: '' },

                {
                    name: "Функционал",
                    blocked: [],
                    class: "plan-info-title",
                    info: "",
                },
                {
                    name: "Профессиональный конструктор",
                    blocked: [],
                    class: "",
                    info: "",
                },
                // { name: 'Анимации', blocked: [], class: '', info: '' },
                // { name: 'Глобальные секции', blocked: [], class: '', info: '' },
                // { name: 'Свободная секция', blocked: [], class: '', info: '' },
                { name: "Интеграция с CRM", blocked: [], class: "", info: "" },
                {
                    name: "Формы - калькуляторы",
                    blocked: [],
                    class: "",
                    info: "",
                },
                // { name: 'Почта для домена', blocked: [], class: '', info: '' },
                {
                    name: "Оптимизация изображений",
                    blocked: [],
                    class: "",
                    info: "",
                },
                {
                    name: "Квизы - опросники",
                    blocked: [3],
                    class: "",
                    info: "",
                },
                // { name: 'Кастомный HTML-код', blocked: [], class: '', info: '' },
                // { name: 'Редиректы', blocked: [], class: '', info: '' },
                // { name: 'AI-копирайтер', blocked: [], class: '', info: '' },
                // { name: 'А/Б тестирование', blocked: [], class: '', info: '' },
                // { name: 'Мультисекция', blocked: [], class: '', info: '' },
                // { name: 'Мультитекст', blocked: [], class: '', info: '' },
                // { name: 'Геосекция', blocked: [], class: '', info: '' },
                // { name: 'API', blocked: [], class: '', info: '' },
                // { name: 'Интернет-магазин', blocked: [], class: '', info: '' },
                // { name: 'Товары', blocked: [], class: '', info: '' },
                // { name: 'Промокоды', blocked: [], class: '', info: '' },
                // { name: 'Прием платежей', blocked: [], class: '', info: '' },
                // { name: 'Письма покупателям', blocked: [], class: '', info: '' },
                {
                    name: "Маркетинговая аналитика",
                    blocked: [3, 4],
                    class: "",
                    info: "",
                },
            ],
            period: "month",
            periods: {
                month: {
                    id: 0,
                    sale: 0,
                    val: "month",
                    name: "Месяц",
                    months: 1,
                },
                month3: {
                    id: 1,
                    sale: 10,
                    val: "month3",
                    name: "3 месяца",
                    months: 3,
                },
                month6: {
                    id: 2,
                    sale: 20,
                    val: "month6",
                    name: "6 месяцев",
                    months: 6,
                },
                year: { id: 3, sale: 30, val: "year", name: "Год", months: 12 },
            },
            sitesAddonsVal: 0,
            sitesAddonsText: "3 сайта",
            sitesAddons: [
                { count: 3, for_one: 597, name: "сайта" },
                { count: 5, for_one: 428, name: "сайтов" },
                { count: 7, for_one: 411, name: "сайтов" },
                { count: 10, for_one: 409, name: "сайтов" },
                { count: 15, for_one: 369, name: "сайтов" },
                { count: 20, for_one: 320, name: "сайтов" },
                { count: 25, for_one: 320, name: "сайтов" },
                { count: 30, for_one: 320, name: "сайтов" },
                { count: 35, for_one: 320, name: "сайтов" },
                { count: 50, for_one: 250, name: "сайтов" },
                { count: 60, for_one: 250, name: "сайтов" },
                { count: 70, for_one: 250, name: "сайтов" },
                { count: 80, for_one: 250, name: "сайтов" },
                { count: 90, for_one: 250, name: "сайтов" },
                { count: 100, for_one: 250, name: "сайтов" },
                { count: 125, for_one: 250, name: "сайтов" },
                { count: 150, for_one: 250, name: "сайтов" },
                { count: 175, for_one: 250, name: "сайтов" },
                { count: 200, for_one: 250, name: "сайтов" },
                { count: 250, for_one: 250, name: "сайтов" },
                { count: 300, for_one: 250, name: "сайтов" },
                // // old / Если Максимальный тариф 1500
                // { count: 3, for_one: 500, name: "сайта" },
                // { count: 5, for_one: 370, name: "сайтов" },
                // { count: 7, for_one: 370, name: "сайтов" },
                // { count: 10, for_one: 370, name: "сайтов" },
                // { count: 15, for_one: 350, name: "сайтов" },
                // { count: 20, for_one: 320, name: "сайтов" },
                // { count: 25, for_one: 320, name: "сайтов" },
                // { count: 30, for_one: 320, name: "сайтов" },
                // { count: 35, for_one: 320, name: "сайтов" },
                // { count: 50, for_one: 250, name: "сайтов" },
                // { count: 60, for_one: 250, name: "сайтов" },
                // { count: 70, for_one: 250, name: "сайтов" },
                // { count: 80, for_one: 250, name: "сайтов" },
                // { count: 90, for_one: 250, name: "сайтов" },
                // { count: 100, for_one: 250, name: "сайтов" },
                // { count: 125, for_one: 250, name: "сайтов" },
                // { count: 150, for_one: 250, name: "сайтов" },
                // { count: 175, for_one: 250, name: "сайтов" },
                // { count: 200, for_one: 250, name: "сайтов" },
                // { count: 250, for_one: 250, name: "сайтов" },
                // { count: 300, for_one: 250, name: "сайтов" },
            ],
        };
    },
    mounted() {
        axios
            .get(this.settings.SITE_PATH + "/api/user/pay_plan")
            .then((response) => {
                this.pageData = response.data.data;
                console.log(this.pageData);
            });
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
        priceTariffMonth(id) {
            var sum = this.tariff_plans[id].sum;
            var sale = this.periods[this.period].sale / 100;
            if (sale > 0) sum *= 1 - sale;
            return Math.round(sum);
        },
        priceTariffAll(id) {
            var val =
                this.priceTariffMonth(id) * this.periods[this.period].months;
            return val.toLocaleString();
        },
        setSitesAddons(index) {
            this.sitesAddonsVal = index;
            this.sitesAddonsText =
                this.sitesAddons[index].count +
                " " +
                this.sitesAddons[index].name;
            this.tariff_plans[this.idMaximumTariff].sum =
                this.sitesAddons[index].count * this.sitesAddons[index].for_one;
            this.tariff_plans[this.idMaximumTariff].sites =
                this.sitesAddonsText;
        },
        customPayment() {
            if (this.paymentSum)
                window.location =
                    this.settings.SITE_PATH +
                    "/pay/payment/balance/" +
                    this.paymentSum;
        },
    },
    computed: {
        bonusPercent() {
            var percent = 0;
            if (this.pageData)
                for (var num in this.pageData.bonusData.sum_refill) {
                    var val = this.pageData.bonusData.sum_refill[num];
                    if (this.paymentSum >= val) percent = num;
                }
            return percent;
        },
        bonusProgress() {
            var goal = 0;
            var last = 0;
            var lastR = 0;
            if (this.pageData)
                for (var num in this.pageData.bonusData.sum_refill) {
                    var val = this.pageData.bonusData.sum_refill[num];
                    if (this.paymentSum < val && goal == 0) {
                        goal = val;
                        lastR = last;
                    }
                    last = val;
                }
            var progress = Math.round(
                ((this.paymentSum - lastR) / (goal - lastR)) * 100,
            );
            if (goal <= this.paymentSum) progress = 100;
            return progress;
        },
        bonusResult() {
            var sum = this.paymentSum;
            sum *= 1 + this.bonusPercent / 100;
            sum = Math.round(sum);
            sum = sum.toLocaleString();
            return sum;
        },
    },
};
</script>

<template>
    <div class="admin-content container">
        <div class="admin-user-pay-plan">
            <br /><br />
            <div
                data-is="settings-block-notify-mails"
                class="settings-block-notify-mails group-item"
            >
                <div class="flexbe-title text-subtitle inline-box">
                    <span>Пополнить аккаунт</span>
                    <div class="ml-auto display-flex">
                        <div
                            class="flexbe-switch round size-default"
                            style="align-items: center"
                        >
                            Баланс: <b>{{ balance.flow_balance }} руб.</b>
                        </div>
                    </div>
                </div>
                <div class="flexbe-white-box shadow p0 overflow">
                    <div class="flexbe-table block">
                        <div class="tbody">
                            <div class="tr">
                                <div class="th">
                                    <span class="flexbe-text">
                                        Введите сумму
                                    </span>
                                </div>
                                <div class="td">
                                    <div class="inline-box">
                                        <div
                                            input-class="transparent in-table `email_0`"
                                            class="save-input"
                                        >
                                            <div
                                                style="--addonPadding: 109px"
                                                class="flexbe-input transparent in-table `email_0` flexbe-input--text"
                                            >
                                                <div class="flexbe-input-wrap">
                                                    <input
                                                        type="number"
                                                        step="100"
                                                        min="500"
                                                        class="flexbe-input__text flexbe-input-styled"
                                                        placeholder="500"
                                                        v-model="paymentSum"
                                                    />
                                                </div>
                                                <div
                                                    class="save-button flexbe-input__addon"
                                                    show-save="show-save"
                                                >
                                                    <div class="bonus-box">
                                                        Бонус
                                                        <span>{{
                                                            bonusPercent
                                                        }}</span
                                                        >%
                                                        <div
                                                            class="bonus-box-progress"
                                                            :style="{
                                                                width:
                                                                    bonusProgress +
                                                                    '%',
                                                            }"
                                                        ></div>
                                                    </div>
                                                    <div
                                                        class="save-block show"
                                                    >
                                                        <div
                                                            class="flexbe-button small filled is-primary"
                                                            @click="
                                                                customPayment()
                                                            "
                                                        >
                                                            <span
                                                                class="flexbe-text"
                                                                >Пополнить</span
                                                            >
                                                            &nbsp;на&nbsp;<b>
                                                                <span
                                                                    class="bonus-sum-result"
                                                                    >{{
                                                                        bonusResult
                                                                    }}</span
                                                                >&nbsp;руб.</b
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                data-is="settings-block-myfonts"
                class="settings-block-myfonts group-content"
            >
                <br /><br />
                <div class="flexbe-title text-subtitle inline-box">
                    <span class="flexbe-text">Тестовый период</span>
                    <!-- <span
                        data-is="admin-save-text"
                        status="saved"
                        class="admin-save-text flexbe-desc"
                        ><div class="status-saved">
                            <span class="saved-text"></span>
                            <span class="saving-text">Сохранение</span>
                            <span class="success-text flexbe-success"
                                >Сохранено</span
                            >
                            <span class="error-text flexbe-error">Ошибка</span>
                        </div></span
                    > -->
                </div>
                <div class="flexbe-white-box shadow collection">
                    <div class="collection-item collection-item--empty">
                        <Icon name="empty_list" path="fonts" size="28" />
                        <span v-if="pageData.useTestTariff" class="flexbe-text">
                            Активирован
                            {{ pageData.data_tariff.tariff_trial_start }} на 14
                            дней
                        </span>
                        <span v-else class="flexbe-text">
                            Подключите тестовый период на 14 дней
                        </span>

                        <a
                            v-if="!pageData.useTestTariff"
                            :href="'/pay/trial'"
                            class="flexbe-button small filled is-primary btn-two"
                        >
                            <span class="flexbe-text">Активировать</span>
                        </a>
                        <div
                            v-else
                            class="flexbe-button small filled is-primary btn-disabled"
                        >
                            <span class="flexbe-text">Был использовал</span>
                        </div>
                    </div>
                    <div class="collection-item shade">
                        <div class="flexbe-desc ml10">
                            Дает функционал тарифа "Стартовый". Вы сможете
                            прикрепить домен, и ваш сайт будет доступен всем 14
                            дней. <br />
                            Позже вы можете продолжить пользоваться сервисом,
                            выбрав платный тариф ниже
                        </div>
                    </div>
                </div>
            </div>
            <header
                currency="RUB"
                :period="period"
                class="admin-user-pay-plan-header"
            >
                <div class="flexbe-title text-title m0">
                    <span>Тарифный план</span>
                </div>
                <div v-if="periodSystem" class="ml-auto display-flex">
                    <div
                        class="flexbe-switch round size-default theme-default separator"
                        value="month"
                    >
                        <div
                            v-for="(item, index) in periods"
                            :key="index"
                            @click="period = item.val"
                            :data-value="item.val"
                            :class="
                                'switch-item ' +
                                (item.val == period ? 'active' : '')
                            "
                        >
                            <span class="flexbe-text">{{ item.name }}</span>
                            <div v-if="item.sale > 0" class="switch-tag">
                                <span>-{{ item.sale }}%</span>
                            </div>
                        </div>
                        <div
                            class="switch-toggle"
                            :style="
                                'left: ' +
                                (2 + 100 * periods[period].id) +
                                'px; width: 98px; transition: all .3s'
                            "
                        ></div>
                    </div>
                </div>
            </header>

            <div class="group-list slide-down-animation">
                <div class="group-content">
                    <div
                        currency="RUB"
                        period="month"
                        class="admin-user-pay-plan-list flexbe-card-list gap-25"
                    >
                        <section
                            v-for="(plan, plan_id) in tariff_plans"
                            :key="plan_id"
                            class="flexbe-card-item"
                        >
                            <div class="flexbe-white-box shadow">
                                <div class="plan-title flexbe-text text-m">
                                    {{ plan.name }}
                                </div>
                                <div class="plan-price">
                                    <div class="plan-price-month">
                                        <span class="price"
                                            >{{
                                                priceTariffMonth(plan_id)
                                            }}
                                            ₽</span
                                        >
                                        <span class="desc"> / Месяц</span>
                                    </div>
                                    <div
                                        v-if="period != 'month'"
                                        class="plan-price-year"
                                    >
                                        <span class="price"
                                            >{{
                                                priceTariffAll(plan_id)
                                            }}
                                            ₽&nbsp;</span
                                        >
                                        <span class="desc"
                                            >за
                                            {{
                                                periods[
                                                    period
                                                ].name.toLowerCase()
                                            }}</span
                                        >
                                    </div>
                                </div>
                                <a
                                    v-if="
                                        !pageData.data_tariff.tariff_id &&
                                        balance.flow_balance == 0
                                    "
                                    :href="'/pay/payment/tariff/' + plan_id"
                                    class="plan-select flexbe-button block filled is-primary weight-medium btn-two"
                                >
                                    <span class="flexbe-text" target="_blank"
                                        >Выбрать и оплатить</span
                                    >
                                </a>
                                <a
                                    v-else-if="!pageData.data_tariff.tariff_id"
                                    :href="'/pay/payment/tariff/' + plan_id"
                                    class="plan-select flexbe-button block filled is-primary weight-medium btn-two"
                                >
                                    <span class="flexbe-text" target="_blank"
                                        >Выбрать</span
                                    >
                                </a>
                                <a
                                    v-else-if="
                                        pageData.data_tariff.tariff_id ==
                                        plan_id
                                    "
                                    class="plan-select flexbe-button block filled is-primary weight-medium btn-disabled"
                                >
                                    <span class="flexbe-text">Активен</span>
                                </a>
                                <a
                                    v-else
                                    :href="'/pay/change/' + plan_id"
                                    class="plan-select flexbe-button block filled is-primary weight-medium btn-two"
                                >
                                    <span class="flexbe-text">Выбрать</span>
                                </a>
                                <div class="flexbe-hr my20"></div>

                                <ul class="plan-info">
                                    <li
                                        v-if="
                                            addonsSitesSystem &&
                                            plan_id != idMaximumTariff
                                        "
                                        class="plan-info-projects"
                                    >
                                        1 сайт&nbsp;
                                    </li>

                                    <DropdownElem
                                        v-if="
                                            addonsSitesSystem &&
                                            plan_id == idMaximumTariff
                                        "
                                        class="plan-info-projects"
                                        :val="sitesAddonsVal"
                                        :text="sitesAddonsText"
                                        :items="sitesAddons"
                                        :setValue="setSitesAddons"
                                        :sale="periods[period].sale"
                                    />

                                    <li>
                                        <span>{{ plan.sites }}&nbsp;</span>
                                    </li>

                                    <li
                                        v-for="(
                                            feature, index
                                        ) in tariff_features"
                                        :key="index"
                                        :class="feature.class"
                                    >
                                        <span
                                            :class="
                                                feature.blocked.indexOf(
                                                    Number(plan_id),
                                                ) != -1
                                                    ? 'plan-info-disabled'
                                                    : ''
                                            "
                                        >
                                            {{ feature.name }}&nbsp;
                                            <q
                                                v-if="tipSystem"
                                                data-is="flexbe-tooltip"
                                                class="flexbe-tooltip flexbe-tooltip tooltipstered"
                                            >
                                                <Icon
                                                    class="tip-icon"
                                                    path="addons"
                                                    name="tip"
                                                    size="14"
                                                />
                                                {{ feature.info }}
                                            </q>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
                <div v-if="archiveTarifSystem" class="group-content">
                    <div class="admin-user-pay-plan-archive">
                        <div class="flexbe-title text-subtitle">
                            Архивный тариф
                        </div>
                        <div class="flexbe-white-box shadow">
                            <div class="plan-name-row">
                                <Icon
                                    path="pay"
                                    name="summary-plan"
                                    size="16"
                                />
                                <span class="flexbe-text"
                                    >Тариф «Малый бизнес»</span
                                >
                            </div>
                            <div class="plan-price-row">
                                <Icon
                                    path="pay"
                                    name="summary-plan"
                                    size="16"
                                />
                                <span class="flexbe-text">950 ₽ / Месяц</span>
                            </div>
                            <div class="plan-price-row">
                                <Icon path="pay" name="count-sites" size="16" />
                                <span class="flexbe-text">1 сайт</span>
                            </div>
                            <div class="plan-summary-row">
                                <div
                                    class="plan-select flexbe-button block large rounded filled is-light"
                                    disabled="disabled"
                                >
                                    <span class="flexbe-text">Текущий</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flexbe-desc mt20">
                    Вы можете сменить тариф в любой момент, и пользоваться
                    только теми функциями которые нужны сейчас. При смене тарифа
                    будет списано с баланса дополнительно за текущий день
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.btn-disabled,
.btn-disabled:hover {
    background-color: #d5d5d5 !important;
}
.btn-two {
    background-color: #8e1053 !important;
}
.btn-two:hover {
    background-color: #8e1053bb !important;
}

.bonus-box {
    margin-right: 1.3em;
    font-size: 0.8em;
    position: relative;
    top: -3px;
}
.bonus-box:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0px;
    right: 0px;
    height: 3px;
    border-radius: 0.2em;
    background-color: #eee;
    width: 100%;
}
.bonus-box-progress {
    position: absolute;
    bottom: -5px;
    left: 0px;
    right: 0px;
    height: 3px;
    border-radius: 0.2em;
    background-color: #8e0f53;
    min-width: 7%;
    z-index: 2;
}
</style>
