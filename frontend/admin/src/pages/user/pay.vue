<script>
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon },
};
</script>

<template>
    <div class="admin-content container narrow">
        <div
            data-is="admin-user-pay-view"
            page-title="Оплата"
            class="admin-user-pay-view"
        >
            <header>
                <div class="flexbe-title text-title">Оплата</div>
            </header>
            <div class="group-list slide-down-animation pb50">
                <div
                    data-is="admin-user-pay-view-planinfo"
                    class="admin-user-pay-view-planinfo group-content"
                >
                    <div class="flexbe-table flexbe-white-box shadow overflow">
                        <div class="tbody">
                            <div class="tr">
                                <div class="th">
                                    <span class="flexbe-text"
                                        >Тарифный план</span
                                    >
                                </div>
                                <div class="td">
                                    <div class="inline-box between">
                                        <span class="flexbe-text"
                                            >Малый бизнес</span
                                        >
                                        <div
                                            class="flexbe-button filled is-light small"
                                        >
                                            <span class="flexbe-text"
                                                >Изменить тариф</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tr">
                                <div class="th">
                                    <span class="flexbe-text"
                                        >Периодичность оплаты</span
                                    >
                                </div>
                                <div class="td">
                                    <div class="inline-box between">
                                        <span class="flexbe-text"
                                            >3 месяца</span
                                        >
                                        <div class="discount-beidge">
                                            Скидка 10%
                                        </div>
                                        <div
                                            class="flexbe-button filled is-light small"
                                        >
                                            <span class="flexbe-text"
                                                >Изменить период</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tr">
                                <div class="th">
                                    <span class="flexbe-text">Оплачено до</span>
                                </div>
                                <div class="td">
                                    <div class="inline-box between">
                                        <span class="flexbe-text">
                                            11.05.2023
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="tr">
                                <div class="th">
                                    <span class="flexbe-text">Плательщик</span>
                                </div>
                                <div class="td">
                                    <div class="inline-box between">
                                        <span class="flexbe-text"
                                            >Палехов Никита Игоревич</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="group-content">
        <div class="flexbe-title text-subtitle"> <span class="flexbe-text"> Способ оплаты </span> </div>
        <div data-is="admin-user-pay-view-methods-list" method="card" class="admin-user-pay-view-methods-list ">
          <div class="flexbe-card-list gap-25 aliqout-3">
            <div class="flexbe-card-item grow">
              <div class="flexbe-white-card shadow hoverable pointer rounded active" type="card" gate="tcsbank">
                <div class="icon-area"> <span class="icon-check flexbe-check"></span> </div>
                <svg class="flexbe-icon icon-method">
                  <use xlink:href="@/assets/images/pay.svg?af9bc055#method-card"></use>
                </svg>
                <div class="flexbe-text"> Карта </div>
              </div>
            </div>
            <div class="flexbe-card-item grow">
              <div class="flexbe-white-card shadow hoverable pointer rounded " type="yandex" gate="yandex">
                <div class="icon-area"> </div>
                <svg class="flexbe-icon icon-method">
                  <use xlink:href="@/assets/images/pay.svg?af9bc055#method-yandex"></use>
                </svg>
                <div class="flexbe-text"> ЮMoney </div>
              </div>
            </div>
            <div class="flexbe-card-item grow">
              <div class="flexbe-white-card shadow hoverable pointer rounded " type="qiwi" gate="yandex">
                <div class="icon-area"> </div>
                <svg class="flexbe-icon icon-method">
                  <use xlink:href="@/assets/images/pay.svg?af9bc055#method-qiwi"></use>
                </svg>
                <div class="flexbe-text"> QIWI Кошелек </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

                <div
                    data-is="admin-user-pay-view-checkout"
                    class="admin-user-pay-view-checkout"
                >
                    <div
                        data-is="admin-user-pay-view-summary"
                        class="admin-user-pay-view-summary group-content"
                    >
                        <div class="flexbe-title text-subtitle">
                            <span class="flexbe-text">Итого к оплате</span>
                        </div>
                        <div class="flexbe-white-box shadow inline-box between">
                            <span class="flexbe-text summary-text"
                                >Лицензия на ПО Flexbe по тарифу «Малый бизнес»
                                на 3 месяца</span
                            >
                            <span class="flexbe-text summary-price"
                                >2565 ₽</span
                            >
                        </div>
                    </div>
                    <form
                        class="group-content"
                        action="/admin/user/pay/"
                        method="post"
                        ref="form"
                    >
                        <div class="pay-form-fields">
                            <input
                                name="pay_service_id"
                                type="hidden"
                                value="0"
                            />
                            <input
                                name="pay_service"
                                type="hidden"
                                value="plan"
                            />
                            <input name="plan_id" type="hidden" value="41" />
                            <input name="period" type="hidden" value="month3" />
                            <input name="pay_sum" type="hidden" value="2565" />
                            <input
                                name="pay_method"
                                type="hidden"
                                value="card"
                            />
                            <input name="pay_gate" type="hidden" />
                            <input
                                name="pay_currency"
                                type="hidden"
                                value="RUB"
                            />
                        </div>

                        <!-- <div class="flexbe-field-group is-inline mb30">

            <label data-is="flexbe-input" type="toggle" name="is_auto" class="flexbe-input flexbe-input--checkbox large mr40 ">
              <input ref="input" class="flexbe-input__toggle " type="checkbox" value="false" name="is_auto"> <span class="flexbe-toggle "></span> <span class="flexbe-text">Включить автопродление после оплаты</span> </label>
            <label data-is="flexbe-input" type="toggle" name="is_save" class="flexbe-input flexbe-input--checkbox large mr40 ">
              <input ref="input" class="flexbe-input__toggle " type="checkbox" value="false" name="is_save"> <span class="flexbe-toggle "></span> <span class="flexbe-text">Запомнить карту</span> </label>

          </div> -->

                        <button
                            type="submit"
                            class="flexbe-button filled rounded is-primary large"
                        >
                            <span class="flexbe-text">Оплатить</span>
                        </button>
                        <div class="pay-disclaimer mt30 invisible">
                            <span class="flexbe-desc"
                                >Для обеспечения бесперебойной работы вашего
                                сайта мы будем автоматически продлевать подписку
                                по цене 2565 ₽ каждые 3 месяца. Вы всегда можете
                                отключить автопродление, отменив подписку в
                                вашем аккаунте</span
                            >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
