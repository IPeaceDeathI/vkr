<?php

/**
 * action_edit_tpl.php
 */

use Noks\Env;

?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Редактирование шаблона</title>
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="theme-color" content="#0c2556">
    <?= Env::$params['links_css'] ?>
    <?= Env::$params['links_head_js'] ?>

</head>

<body>

    <!-- edit -->
    <div class="hidden-popup">
        <div class="wrp-popup-blocks">

            <div class="popup-close"></div>
            <div class="tab">
                <button class="tablinks" data-tab-name="templates">Шаблоны</button>
                <button class="tablinks" data-tab-name="blocks">Блоки</button>
            </div>
            <!-- Tabs start -->
            <div data-area-tab></div>
            <!-- Tabs end -->
        </div>
    </div>

    <div class="body-table">
        <div class="body-table-menu menu-triple-box">
            <div class="menu-triple-one"></div>
            <div class="menu-triple-two"></div>
            <div class="menu-triple-three"></div>
        </div>
        <div class="body-table-main">
            <div class="constructor-page">
                <div class="add-new-block-first"></div>
            </div>
            <div class="constructor-overlay"></div>
        </div>
    </div>

    <script type="text/javascript" id="json">
        <?= $tpl['tpl_blocks_structure'] ?>
    </script>
    <script type="application/json" id="env-params">
        <?= $env_params ?? '' ?>
    </script>
    <input type="hidden" data-id-site value="">
    <!-- edit -->
    <div id="noks-modal-inline" style="display:none;"></div>

    <!-- scripts start -->
    <?= Env::$params['links_js'] ?>
    <!-- scripts end -->
</body>

</html>