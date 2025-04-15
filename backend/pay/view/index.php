<?php

use Noks\Model\FakeProduct;

?>
<div class="wrp">
    <div class="container">

        <br>

        <div class="wrp-balance">
            <div class="left-block">
                <div class="title">Пополнить баланс аккаунта</div>
                <div class="desc">После выбора тарифа, списание с баланса будет ежедневным<br>Минимальное пополнение - 500 руб</div>
            </div>
            <div class="right-block">
                <form>
                    <input type="number" class="number-balance" min="500" max="99999" minlength="3" maxlength="11" value="500">
                    <button data-pay-btn-add-balance class="btn-balance">Пополнить</button>
                </form>
            </div>
        </div>

        <h2 class="section_h2">Тарифные планы</h2>
        <div class="wrp-tarif">
            <div class="bgr-tarif">
                <div class="price-item">
                    <div class="price">14 дней</div>
                    <div class="name">Тестовый</div>
                    <div class="list">
                        <ul>
                            <li>Все функции Базового тарифа до конца тестового срока</li>
                            <li>После окончания тестового периода сайт будет не доступен по ссылке.</li>
                        </ul>
                    </div>
                    <div class="desc">14 дней бесплатный тариф</div>
                    <?php if ($useTestTariff) : ?>
                        <span class="btn-red btn-grey">Был использован</span>
                    <?php else : ?>
                        <a href="/pay/trial" class="btn-red">Попробовать</a>
                    <?php endif; ?>
                </div>
                <div class="price-item top">
                    <div class="price">490 руб / месяц</div>
                    <div class="name">Базовый</div>
                    <div class="list">
                        <ul>
                            <li>1 сайт</li>
                            <li>Конструктор сайтов</li>
                            <li>Прикрепление домена</li>
                            <li>Квиз-опросник (заявки скрыты)</li>
                            <!-- <li>Каталог шаблонов по нишам</li> -->
                        </ul>
                    </div>
                    <div class="desc"></div>
                    <?php if (\is_null($data_tariff['tariff_id'])) : ?>
                        <a target="_blank" href="/pay/payment/tariff/<?= FakeProduct::TARIFF_BASIC ?>" class="btn-red">Купить</a>
                    <?php elseif ($data_tariff['tariff_id'] == FakeProduct::TARIFF_BASIC) : ?>
                        <span class="btn-red btn-green">Активна</span>
                    <?php else : ?>
                        <a href="/pay/change/<?= FakeProduct::TARIFF_BASIC ?>" data-pay-change-tariff class=" btn-red">Выбрать</a>
                    <?php endif; ?>
                </div>
                <div class="price-item">
                    <div class="price">890 руб / месяц</div>
                    <div class="name">Расширенный</div>
                    <div class="list">
                        <ul>
                            <li>1 сайт</li>
                            <li>Квиз-опросник (видны заявки)</li>
                            <li>Скрыт логотип Noks внизу страниц</li>
                        </ul>
                    </div>
                    <div class="desc"></div>
                    <?php if (\is_null($data_tariff['tariff_id'])) : ?>
                        <a target="_blank" href="/pay/payment/tariff/<?= FakeProduct::TARIFF_EXTENDED ?>" class=" btn-red">Купить</a>
                    <?php elseif ($data_tariff['tariff_id'] == FakeProduct::TARIFF_EXTENDED) : ?>
                        <span class="btn-red btn-green">Активна</span>
                    <?php else : ?>
                        <a href="/pay/change/<?= FakeProduct::TARIFF_EXTENDED ?>" data-pay-change-tariff class=" btn-red">Выбрать</a>
                    <?php endif; ?>
                </div>
                <div class="price-item">
                    <div class="price">1790 руб / месяц</div>
                    <div class="name">Максимальный</div>
                    <div class="list">
                        <ul>
                            <li>5 сайтов</li>
                            <li>Маркетинговая аналитика (скоро)</li>
                            <!-- <li>Расходы по каналам трафика</li> -->
                            <!-- <li>Конверсии на всех этапах</li> -->
                            <!-- <li>Показатели эффективности бизнеса (ДРР, ROI)</li> -->
                            <!-- <li>Отслеживание эффективности рекламных компаний</li> -->
                        </ul>
                    </div>
                    <div class="desc"></div>
                    <?php if (\is_null($data_tariff['tariff_id'])) : ?>
                        <a target="_blank" href="/pay/payment/tariff/<?= FakeProduct::TARIFF_MAXIMUM ?>" class=" btn-red">Купить</a>
                    <?php elseif ($data_tariff['tariff_id'] == FakeProduct::TARIFF_MAXIMUM) : ?>
                        <span class="btn-red btn-green">Активна</span>
                    <?php else : ?>
                        <a href="/pay/change/<?= FakeProduct::TARIFF_MAXIMUM ?>" data-pay-change-tariff class=" btn-red">Выбрать</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <h2 class="section_h2">Тарифные опции</h2>

        <!-- options start -->
        <?php foreach ($tariff_options as $tariff_option) : ?>
            <div class="wrp-tariff-options">
                <div class="item-tariff-option">
                    <div class="block-name">
                        <div class="option"><?= $tariff_option['desc'] ?></div>
                        <div class="option-name"><?= $tariff_option['name'] ?></div>
                    </div>
                    <div class="block-price">
                        <?= (
                            $data_tariff_options[$tariff_option['product_id']]['price'] ?? reset($tariff_option['option_select'])['price']
                        ) ?>
                    </div>
                    <select class="setting">
                        <?php foreach ($tariff_option['option_select'] as $data_select) : ?>
                            <option data-price-option="<?= $data_select['price'] ?>" value="<?= $data_select['rights_option'] ?>" <?= (
                                                                                                                                        isset($data_tariff_options[$tariff_option['product_id']]) &&
                                                                                                                                        $data_tariff_options[$tariff_option['product_id']]['option_value'] == $data_select['rights_option']
                                                                                                                                        ? ' selected'
                                                                                                                                        : ''
                                                                                                                                    ) ?>><?= $data_select['value'] ?> за <?= $data_select['price'] ?>р/мес.</option>
                        <?php endforeach; ?>
                    </select>
                    <!-- Toggle Button Start -->
                    <label class="toggler-wrapper style-1">
                        <input data-id_product="<?= $tariff_option['product_id'] ?>" type="checkbox" <?= (
                                                                                                            isset($data_tariff_options[$tariff_option['product_id']])
                                                                                                            ? ' checked'
                                                                                                            : ''
                                                                                                        ) ?>>
                        <div class="toggler-slider">
                            <div class="toggler-knob"></div>
                        </div>
                    </label>
                    <!-- Toggle Button End -->
                </div>
            </div>
        <?php endforeach; ?>
        <!-- options end -->


        <div class="logs-list">
            <?php foreach ($logs as $log) : ?>
                <?= $log['log_msg'] ?> # <?= (\int($log['log_value']) == 0 ? '' : $log['log_value'] . 'р. # ') ?><?= $log['log_create_date'] ?> # <?= $log['log_create_time'] ?><br>
            <?php endforeach; ?>
        </div>
    </div>
</div>