<?php

use Noks\Env;

/**
 * TODO на удаление
 * @param \Noks\Controller\Constructor\Page\PreviewPage
 * @var array $site_page
 * @var array $page
 * @var array $site
 */
?>
<!DOCTYPE html>
<html>

<head>
    <meta name=viewport>
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">

    <title>
        <?= $site_page['title'] ?> | <?= $site['title'] ?> | <?= SITE_NAME ?>
    </title>

    <meta name="id-flow" content="<?= getCurrentFlow() ?>">
    <meta name="id-site" content="<?= $site['id'] ?>">
    <meta name="id-page" content="<?= $site_page['id'] ?>">

    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="description" content="<?= $site_page['description'] ?? '' ?>">

    <script  src="/constructor2/src/viewport2.js"></script>


    <!-- css src start -->
    <?= Env::$params['links_css'] ?>
    <!-- css src end -->

    <!-- css start -->
    <?= $page['style'] ?? '' ?>
    <!-- css end -->

    <!-- scripts head start -->
    <?= Env::$params['links_head_js'] ?>
    <!-- scripts head end -->

    <!-- client code head start -->
    <?= $site['code_head'] ?? '' ?>
    <!-- client code head end -->
</head>

<body>

    <!-- page start -->
    <?= $page['html'] ?? '' ?>
    <!-- page end -->

    <?= madeOnNoks(getCurrentFlow()) ?>
    <!-- Обязательно должен находится  над  Env::$params['links_js'].  TODO сделать его и скрипты ниже defer, чтобы работали только после прогрузки body-->

    <script  src="/constructor2/src/publish_prerender_main.js"></script> 

    <!-- scripts down start -->
    <?= Env::$params['links_js'] ?>
    <!-- scripts down end -->

    <!-- client code body start -->
    <?= $site['code_body'] ?? '' ?>
    <!-- client code body end -->
</body>

</html>