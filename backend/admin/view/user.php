<div class="admin-content-wrapper scrollable-content" id="app">
  
    <? #################################################################### ?>

    <?php
        $panel['name'] = 'Аккаунт';
        $panel['menu'] = [
            'common' => [
                'name' => 'Основные',
                'links' => [
                    [ 'name' => 'Профиль', 'href' => '/admin/user/profile/', 'icon' => 'user-profile' ],
                    [ 'name' => 'Оплата', 'href' => '/admin/user/pay/', 'icon' => 'user-pay' ],
                    [ 'name' => 'Тарифный план', 'href' => '/admin/user/pay_plan/', 'icon' => 'user-pay-plan' ],
                    [ 'name' => 'История платежей', 'href' => '/admin/user/pay_invoices/', 'icon' => 'user-pay-invoices' ],
                ],
            ],
            // 'addon' => [
            //     'name' => 'Дополнительно',
            //     'links' => [
            //         [ 'name' => 'Пользователи', 'href' => '/admin/user/members/', 'icon' => 'user-access' ],
            //     ],
            // ],
        ];
    ?>

    <?php include VERSION . '/admin/components/panel_left.php'; ?>

    <? #################################################################### ?>

    <?php
        $controller = VERSION . '/admin/controller/user/' . $_SPLIT[2] . '.php';
        $view = VERSION . '/admin/view/user/' . $_SPLIT[2] . '.php';

        if(file_exists($controller))
            include $controller;
        else if(file_exists($view)) 
            include $view;
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