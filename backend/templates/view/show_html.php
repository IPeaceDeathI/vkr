<?php

use Noks\Env;

/**
 * @param \Noks\Template\Controller\ShowTemplate
 */
?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title><?= $tpl['tpl_title'] ?? '' ?></title>
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="theme-color" content="#0c2556">

    <?= Env::$params['links_css'] ?>

    <?= Env::$params['links_head_js'] ?>

    <!-- css start -->
    <style rel="stylesheet">
        <?= $tpl['tpl_css'] ?? '' ?>
    </style>
    <!-- css end -->
</head>

<body>

    <!-- page -->
    <div data-pages-options class="constructor-page page-user">
        <?= $tpl['tpl_html'] ?? '' ?>
    </div>
    <!-- page -->

    <!-- scripts start -->
    <?= Env::$params['links_js'] ?>
    <!-- scripts end -->
</body>

</html>