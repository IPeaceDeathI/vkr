<?php

use Noks\Env;

/**
 * @param \Noks\SitePage\Controller\Setting\Version
 */
?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Версия: <?= $page['page_hash']['hash_date'] ?></title>
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="theme-color" content="#0c2556">

    <?= Env::$params['links_css'] ?>

    <!-- css start -->
    <style rel="stylesheet">
        <?= $page['page_hash']['hash_styles'] ?? '' ?>
    </style>
    <!-- css end -->
</head>

<body>

    <!-- page -->
    <div data-pages-options class="constructor-page page-user">
        <?= $page['page_hash']['hash_html'] ?? '' ?>
    </div>
    <!-- page -->

</body>

</html>