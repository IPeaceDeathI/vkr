<div class="admin-content-wrapper scrollable-content" id="app">
  
    <? #################################################################### ?>

    <?php
        $panel['name'] = 'Настройки';
        $panel['menu'] = [
            'common' => [
                'name' => 'Основные',
                'links' => [
                    [ 'name' => 'Общие', 'href' => '/admin/settings/general/', 'icon' => 'general' ],
                    [ 'name' => 'Домены', 'href' => '/admin/settings/domains/', 'icon' => 'localization' ],
                    [ 'name' => 'Уведомления', 'href' => '/admin/settings/notify/', 'icon' => 'notification' ],
                    // [ 'name' => 'Оптимизация скорости', 'href' => '/admin/settings/optimization/', 'icon' => 'optimization' ],
                    // [ 'name' => 'Шрифты', 'href' => '/admin/settings/fonts/', 'icon' => 'fonts' ],
                    [ 'name' => 'Вставка кода', 'href' => '/admin/settings/code/', 'icon' => 'code' ],
                    // [ 'name' => 'Персональные данные', 'href' => '/admin/settings/legal/', 'icon' => 'legal' ],
                    // [ 'name' => 'Подтверждение прав', 'href' => '/admin/settings/verify/', 'icon' => 'confirm-rights' ],
                    // [ 'name' => 'Файл robots.txt', 'href' => '/admin/settings/robots/', 'icon' => 'robots' ],
                    // [ 'name' => 'Редиректы', 'href' => '/admin/settings/redirects/', 'icon' => 'redirects' ],
                    // [ 'name' => 'Доступ к сайту', 'href' => '/admin/settings/access/', 'icon' => 'users' ],
                    // [ 'name' => 'Письма клиентам', 'href' => '/admin/settings/notification/visitor/', 'icon' => 'notification-visitor' ],
                    // [ 'name' => 'Настройки AI', 'href' => '/admin/settings/ai/', 'icon' => 'ai' ],
                ],
            ],
            // 'ecommerce' => [
            //     'name' => 'Магазин',
            //     'links' => [
            //         [ 'name' => 'Магазин', 'href' => '/admin/settings/ecommerce/common/', 'icon' => 'ecommerce' ],
            //         [ 'name' => 'Доставка', 'href' => '/admin/settings/ecommerce/delivery/', 'icon' => 'delivery' ],
            //         [ 'name' => 'Скидки и промокоды', 'href' => '/admin/settings/ecommerce/promotion/', 'icon' => 'promo' ],
            //     ],
            // ],
            'integration' => [
                'name' => 'Интеграции',
                'links' => [
                    [ 'name' => 'Аналитика', 'href' => '/admin/settings/integration_counters/', 'icon' => 'counters' ],
                    // [ 'name' => 'Виджеты', 'href' => '/admin/settings/integration_widgets/', 'icon' => 'apps' ],
                    // [ 'name' => 'Сервисы рассылок', 'href' => '/admin/settings/integration_mailing/', 'icon' => 'mailing' ],
                    [ 'name' => 'Экспорт заявок', 'href' => '/admin/settings/integration_crm/', 'icon' => 'crm' ],
                    // [ 'name' => 'Прием платежей', 'href' => '/admin/settings/pay/', 'icon' => 'pay' ],
                    // [ 'name' => 'Почта для домена', 'href' => '/admin/settings/integration_domain_mailing/', 'icon' => 'mail' ],
                    // [ 'name' => 'API', 'href' => '/admin/settings/api/', 'icon' => 'api' ],
                ],
            ],
        ];
    ?>

    <?php include VERSION . '/admin/components/panel_left.php'; ?>

    <? #################################################################### ?>

    <?php
        $path = VERSION . '/admin/view/settings/' . $_SPLIT[2] . '.php';

        if(file_exists($path)) 
            include $path;
        else
            echo '<div class="admin-content">
                <header class="container narrow">
                    <div data-is="admin-breadcrumbs" class="admin-breadcrumbs text-title animate">
                        <a class="style-link-ignore breadcrumb first active" href="/admin/settings/general">
                            Этот подраздел настроек недоступен
                        </a>
                    </div>
                </header>
            </div>';
    ?>

</div>
</div>