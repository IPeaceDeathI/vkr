<?php
    function svg_info($text){
        if(!$text) return '';
        return 
            '<q is="proxy" data-is="flexbe-tooltip" class="flexbe-tooltip flexbe-tooltip tooltipstered">
                <svg class="tip-icon" viewBox="0 0 14 14"><path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.34234 8.57C7.34234 8.59 7.34234 8.64 7.35234 8.7H6.35234C6.35122 8.68537 6.35009 8.67099 6.34898 8.6568C6.34022 8.54486 6.33234 8.44424 6.33234 8.32C6.33234 7.72 6.56234 7.23 7.14234 6.81L7.60234 6.48C7.93234 6.24 8.07234 5.95 8.07234 5.61C8.07234 5.09 7.72234 4.6 6.99234 4.6C6.25234 4.6 5.86234 5.17 5.86234 5.74C5.86234 5.89 5.88234 6.08 5.92234 6.19L4.79234 6.11C4.75234 5.97 4.73234 5.81 4.73234 5.65C4.73234 4.65 5.48234 3.56 6.99234 3.56C8.47234 3.56 9.27234 4.54 9.27234 5.56C9.27234 6.35 8.85234 6.91 8.27234 7.32L7.84234 7.62C7.51234 7.85 7.34234 8.18 7.34234 8.57ZM6.86234 10.87C6.45234 10.87 6.13234 10.54 6.13234 10.14C6.13234 9.74 6.45234 9.4 6.86234 9.4C7.26234 9.4 7.59234 9.74 7.59234 10.14C7.59234 10.54 7.26234 10.87 6.86234 10.87Z"></path></svg>
                '.$text.'
            </q>';
    }

    $tariff_plans = [
        [ 'id' => 1, 'name' => 'Стартовый', 'price' => '750' ],
        [ 'id' => 2, 'name' => 'Малый бизнес', 'price' => '950' ],
        [ 'id' => 3, 'name' => 'Бизнес', 'price' => '1500' ],
    ];

    $tariff_features = [
        [ 'name' => '1 сайт', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Черновики', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => '1000 страниц на сайте', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => 'Прикрепление домена', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => 'SSL сертификат (https://)', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => 'Скрытие лейбла Noks', 'blocked' => [1], 'class' => '', 'info' => '' ],
        // [ 'name' => '1 доп. пользователь', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => 'Функционал', 'blocked' => [], 'class' => 'plan-info-title', 'info' => '' ],
        [ 'name' => 'Профессиональный конструктор', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Анимации', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Глобальные секции', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Свободная секция', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => 'Интеграция с CRM', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => 'Формы - калькуляторы', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Почта для домена', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Оптимизация изображений', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => 'Квизы - опросники', 'blocked' => [1], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Кастомный HTML-код', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Редиректы', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'AI-копирайтер', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'А/Б тестирование', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Мультисекция', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Мультитекст', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Геосекция', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'API', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Интернет-магазин', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Товары', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Промокоды', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Прием платежей', 'blocked' => [], 'class' => '', 'info' => '' ],
        // [ 'name' => 'Письма покупателям', 'blocked' => [], 'class' => '', 'info' => '' ],
        [ 'name' => 'Маркетинговая аналитика', 'blocked' => [1,2], 'class' => '', 'info' => '' ],
    ];

?>

<div class="admin-content container">
    <div is="admin-user-pay-plan" class="admin-user-pay-plan ">
    <header is="admin-user-pay-plan-header" currency="RUB" period="month" class="admin-user-pay-plan-header">
        <div class="flexbe-title text-title m0"><span>Тарифный план</span></div>
        <div class="ml-auto display-flex">
        <div is="flexbe-switch" class="flexbe-switch round size-default theme-default separator" value="month">
            <div class="switch-item active" data-value="month"><span class="flexbe-text">Месяц</span></div>
            <div class="switch-item " data-value="month3"><span class="flexbe-text">3 месяца</span>
            <div is="raw" class="switch-tag"><span>-10%</span></div>
            </div>
            <div class="switch-item " data-value="year"><span class="flexbe-text">Год</span>
            <div is="raw" class="switch-tag"><span>-30%</span></div>
            </div>
            <div class="switch-toggle" style="left: 2px; width: 98px;"></div>
        </div>
        </div>
    </header>
    <div class="group-list slide-down-animation">
        <div class="group-content">
        <div is="admin-user-pay-plan-list" currency="RUB" period="month" class="admin-user-pay-plan-list flexbe-card-list gap-25">

            <?php foreach($tariff_plans as $plan) : ?>

                <div class="flexbe-card-item">
                <div class="flexbe-white-box shadow">
                    <div class="plan-title flexbe-text text-m">
                        <?=$plan['name']?>
                    </div>
                    <div class="plan-price">
                        <div class="plan-price-month">
                            <span class="price"><?=$plan['price']?> ₽</span><span class="desc"> / Месяц</span>
                        </div>
                    </div>
                    <div class="plan-select flexbe-button block filled is-primary weight-medium ">
                        <span class="flexbe-text">Выбрать</span>
                    </div>
                    <div class="flexbe-hr my20"></div>

                    <ul class="plan-info">

                        <?php if($plan['id']!=3){ ?>

                            <li class="plan-info-projects">1 сайт&nbsp;</li>

                        <?php } ?>

                        <?php if($plan['id']==3){ ?>
                            <li class="dropdown plan-info-projects flexbe-tag clickable" ref="dropdown">
                                <span class="flexbe-text">3 сайта</span>
                                <svg class="flexbe-icon size-8 arrow-down" viewBox="0 0 8 5"><path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path></svg>
                                <dropdown is="proxy" data-is="dropdown">
                                    <div class="toggle-helper"></div>

                                    <div ref="balloon" tabindex="0" data-layers-events="ignore" class="dropdown__balloon balloon dropdown__balloon--default in-bottom" is-show="true" style="display:none; inset: 28px auto auto -67px;">
                                        <div class="arrow" ref="arrow" style="left: 103.203px;"></div>
                                        <div ref="content" class="dropdown__balloon_content flexbe-balloon-content">
                                            <div ref="proxy-slot">
                                                <div class="flexbe-list borderless hoverable hoverable-background">
                                                    <div class="flexbe-list-item active">
                                                        <span class="flexbe-text feature-name">3 сайта</span>
                                                        <span class="flexbe-text feauture-price">500 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">5 сайтов</span>
                                                        <span class="flexbe-text feauture-price">370 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">7 сайтов</span>
                                                        <span class="flexbe-text feauture-price">370 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">10 сайтов</span>
                                                        <span class="flexbe-text feauture-price">370 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">15 сайтов</span>
                                                        <span class="flexbe-text feauture-price">350 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">20 сайтов</span>
                                                        <span class="flexbe-text feauture-price">320 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">25 сайтов</span>
                                                        <span class="flexbe-text feauture-price">320 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">30 сайтов</span>
                                                        <span class="flexbe-text feauture-price">320 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">35 сайтов</span>
                                                        <span class="flexbe-text feauture-price">320 ₽/сайт</span>
                                                    </div>
                                                    <div class="flexbe-list-item ">
                                                        <span class="flexbe-text feature-name">50 сайтов</span>
                                                        <span class="flexbe-text feauture-price">250 ₽/сайт</span>
                                                    </div>
                                                </div>
                                                <div class="flexbe-hr m0"></div>
                                                <div class="plan-info-dropdown-more"><span class="flexbe-desc mr10">Больше</span>
                                                    <svg class="flexbe-icon size-10 arrow-down" viewBox="0 0 8 5">
                                                        <path d="M4 3L7 0L8 1L4 5L0 1L1 0L4 3Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </dropdown>
                            </li>
                        <?php } ?>

                        <?php foreach($tariff_features as $feature) : ?>

                            <?php
                                $isBlocked = false;
                                if(in_array($plan['id'],$feature['blocked']))
                                    $isBlocked = true;
                            ?>

                            <li class="<?=$feature['class']?>">
                                <span class="<?=($isBlocked?'plan-info-disabled':'')?>">
                                    <?=$feature['name']?>&nbsp;<?=svg_info($feature['info'])?>
                                </span>
                            </li>

                        <?php endforeach; ?>

                    </ul>
                </div>
                </div>

            <?php endforeach; ?>


        </div>
        </div>
        <div class="group-content">
        <div is="admin-user-pay-plan-archive" class="admin-user-pay-plan-archive ">
            <div class="flexbe-title text-subtitle">Архивный тариф</div>
            <div class="flexbe-white-box shadow">
            <div class="plan-name-row">
                <svg is="flexbe-icon" icon="summary-plan" sprite="/<?=VERSION?>/admin/resources/images/pay.svg?af9bc055" class="flexbe-icon size-16 ">
                <use href="/<?=VERSION?>/admin/resources/images/pay.svg?af9bc055#summary-plan"></use>
                </svg><span class="flexbe-text">Тариф «Малый бизнес»</span></div>
            <div class="plan-price-row">
                <svg is="flexbe-icon" icon="summary-sum" sprite="/<?=VERSION?>/admin/resources/images/pay.svg?af9bc055" class="flexbe-icon size-16 ">
                <use href="/<?=VERSION?>/admin/resources/images/pay.svg?af9bc055#summary-sum"></use>
                </svg><span class="flexbe-text">950 ₽ / Месяц</span></div>
            <div class="plan-price-row">
                <svg is="flexbe-icon" icon="count-sites" sprite="/<?=VERSION?>/admin/resources/images/pay.svg?af9bc055" class="flexbe-icon size-16 ">
                <use href="/<?=VERSION?>/admin/resources/images/pay.svg?af9bc055#count-sites"></use>
                </svg><span class="flexbe-text">1 сайт</span></div>
            <div class="plan-summary-row">
                <div class="plan-select flexbe-button block large rounded filled is-light" disabled="disabled"><span class="flexbe-text">Текущий</span></div>
            </div>
            </div>
            <div class="flexbe-desc mt20">После смены тарифа у вас будет возможность вернуться на старый тариф в течение суток.</div>
        </div>
        </div>
    </div>
    </div>
</div>