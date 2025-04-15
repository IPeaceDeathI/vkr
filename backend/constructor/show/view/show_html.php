<?php

use Noks\Env;
use Noks\Enum\VersionConstructorEnum;
use Noks\Enum\Constructor\WidgetPositionEnum;

// для js
$env_params = \json_encode([
    'SITE_DOMAIN' => SITE_DOMAIN,
]);

/**
 * @param \Noks\Controller\Constructor\ShowPublicPage
 * @param \Noks\Controller\Constructor\Page\PreviewPage
 * 
 * @var string $url - //domain.com/
 * @var int $flow_id
 * @var array $data_site
 * @var array $data_page
 * @var int $site_id
 * @var int $site_page_id
 * @var string $site_settings
 * @var array $widget
 * @var string $env_params
 */

?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    <meta name=viewport>
    <title>
        <?= $data_page['title'] ?? '' ?>
    </title>

    <meta name="description" content="<?= $data_page['description'] ?? '' ?>">
    <link rel="shortcut icon" href="<?= $url ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="theme-color" content="#0c2556">

    <meta name="id-flow" content="<?= $flow_id ?>">
    <meta name="id-site" content="<?= $site_id ?>">
    <meta name="id-page" content="<?= $site_page_id ?>">
    <meta name="referer" content="<?= \getReferer() ?>">

    <script src="/constructor2/src/viewport2.js"></script>

    <!-- css src start -->
    <?= Env::$params['links_css'] ?>
    <!-- css src end -->

    <!-- scripts head start -->
    <?= Env::$params['links_head_js'] ?>
    <!-- scripts head end -->

    <!-- css start -->
    <?php if (VersionConstructorEnum::VERSION_1->itValue($data_page['version_editor'])) : ?>
        <style rel="stylesheet">
            <?= $data_page['style'] ?? '' ?>
        </style>
    <?php else : ?>
        <?= $data_page['style'] ?? '' ?>
    <?php endif; ?>
    <!-- css end -->

    <!-- client code head start -->
    <?= $data_site['code_head'] ?? '' ?>
    <!-- client code head end -->

    <!-- widget head start -->
    <?php foreach ($widget as $w) : ?>
        <?php if (WidgetPositionEnum::BEFORE_END_HEAD->itValue($w['area'])) continue; ?>
        <?= $w['html'] ?>
        <script>
            <?= $w['js'] ?>
        </script>
        <style>
            <?= $w['css'] ?>
        </style>
        <? //= $w['file'] 
        ?>
    <?php endforeach; ?>
    <!-- widget head end -->
</head>

<body>

    <!-- page start -->
    <?php if (VersionConstructorEnum::VERSION_1->itValue($data_page['version_editor'])) : ?>
        <div data-pages-options class="constructor-page page-user">
            <?= $data_page['html'] ?? '' ?>
        </div>
    <?php else : ?>
        <?= $data_page['html'] ?? '' ?>
    <?php endif; ?>
    <!-- page end -->

    <?= madeOnNoks($flow_id ?? null) ?>

    <script data-site-settings type="application/json">
        <?= $site_settings ?>
    </script>
    <script data-env-params type="application/json">
        <?= $env_params ?>
    </script>
    <?php
    // Обязательно должен находится  над  Env::$params['links_js'].  TODO сделать его и скрипты ниже defer, чтобы работали только после прогрузки body
    ?>
    <script src="/constructor2/src/publish_prerender_main.js"></script>

    <!-- scripts down start -->
    <?= Env::$params['links_js'] ?>
    <!-- scripts down end -->

    <!-- client code body start -->
    <?= $data_site['code_body'] ?? '' ?>
    <!-- client code body end -->

    <!-- widget body start -->
    <?php foreach ($widget as $w) : ?>
        <?php if (WidgetPositionEnum::BEFORE_END_BODY->itValue($w['area'])) continue; ?>
        <?= $w['html'] ?>
        <script>
            <?= $w['js'] ?>
        </script>
        <style>
            <?= $w['css'] ?>
        </style>
    <?php endforeach; ?>
    <!-- widget body end -->

</body>

</html>