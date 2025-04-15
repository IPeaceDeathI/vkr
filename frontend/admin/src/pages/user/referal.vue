<script>
import Icon from "@/components/ui/AdminIcon.vue";
import axios from "axios";

export default {
    components: { Icon },
    inject: ["settings"],
    data() {
        return {
            // user: null,
            code: null,
            refPercent: 30, // Процент реферальной программы
            // Пример рассчета
            exCount: 12, // КОл-во оплат
            exAvg: 2500, // Средний чек
        };
    },
    mounted() {
        // axios
        //     .get(this.settings.SITE_PATH + "/api/user/profile")
        //     .then((response) => {
        //         this.user = response.data.data.user;
        //         this.code = response.data.data.user.user_ref_code;
        //     });
        axios
            .get(this.settings.SITE_PATH + "/api/user/referral")
            .then((response) => {
                console.log(response.data);
                this.code = response.data.data.code;
            });
    },
    computed: {
        refLink() {
            return (
                "https://" + this.settings.SITE_DOMAIN + "/?ref=" + this.code
            );
        },
    },
    methods: {},
};
</script>

<template>
    <div class="admin-content container">
        <div class="admin-user-referal">
            <br /><br />
            <div
                data-is="settings-block-notify-mails"
                class="settings-block-notify-mails group-item"
            >
                <div class="flexbe-title text-subtitle inline-box">
                    <span>Реферальная ссылка</span>
                </div>
                <div class="flexbe-white-box shadow p0 overflow">
                    <div class="flexbe-table block">
                        <div class="tbody">
                            <div class="tr">
                                <div class="th">
                                    <span class="flexbe-text">
                                        Ваша ссылка
                                    </span>
                                </div>
                                <div class="td">
                                    <div class="inline-box">
                                        <div
                                            input-class="transparent in-table"
                                            class="save-input"
                                        >
                                            <div
                                                style="--addonPadding: 109px"
                                                class="flexbe-input transparent in-table flexbe-input--text"
                                            >
                                                <div class="flexbe-input-wrap">
                                                    <input
                                                        type="text"
                                                        class="flexbe-input__text flexbe-input-styled"
                                                        :value="refLink"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <div class="flexbe-title text-subtitle inline-box">
                        <span class="flexbe-text"
                            >Базовая комиссия: {{ refPercent }}%</span
                        >
                    </div>
                    Комиссия начисляется со всех платежей на пополнение баланса,
                    сделанных приведенными клиентами в течение года с момента их
                    регистрации.
                    <blockquote>
                        Например, если ваш клиент произведет за год
                        {{ exCount }} оплат по {{ exAvg }} р., ваша комиссия в
                        течение года в сумме составит
                        {{ Math.round((refPercent / 100) * (exCount * exAvg)) }}
                        р. ({{ refPercent }}% от {{ exCount * exAvg }} р.). И
                        это только с одного клиента.
                    </blockquote>
                    Выводить средства вы сможете в удобное для вас время по мере
                    начисления комиссии.
                    <br /><br />
                    <b>
                        ВАЖНО! Вывод денежных средств на банковский расчётный
                        счёт возможен при одновременном соблюдении двух условий:
                        <br />
                        1. Нужно привлечь как минимум 3-х активных клиентов,
                        <br />
                        2. Сумма вывода должна быть не меньше 5 000 рублей.
                    </b>
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

blockquote {
    border-left: 5px solid rgb(142, 16, 83);
    background-color: rgba(142, 16, 83, 0.25);
    border-radius: 0.3em;
    box-shadow:
        0 20px 20px rgb(48 52 59/7%),
        0 -5px 10px -5px rgb(48 52 59/7%);
    padding: 1em 1.5em;
    margin: 1.5em 0;
}
</style>
