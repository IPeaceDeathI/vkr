<?php

/**
 * action_page.php
 */

use Noks\Env;
?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>
        <?= $page['title'] ?>
    </title>
    <meta name="id-site" content="<?= $page['id_site'] ?>">
    <meta name="id-page" content="<?= $page['id'] ?>">
    <meta name="description" content="<?= $page['description'] ?>">
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="theme-color" content="#0c2556">
    <?= Env::$params['links_css'] ?>
    <?= Env::$params['links_head_js'] ?>

    <!-- css start -->
    <style rel="stylesheet">
        <?= $page['page_hash']['hash_styles'] ?? '' ?>
    </style>
    <?= Env::$params['links_head_js'] ?>
    <!-- css end -->

    <!-- code_head start -->
    <?= $page['data_site']['code_head'] ?>
    <!-- code_head end -->
</head>

<body>

    <!-- page -->
    <div data-pages-options class="constructor-page page-user">
        <?= $page['page_hash']['hash_html'] ?? '' ?>
    </div>
    <!-- page -->
    <?= madeOnNoks($id_flow ?? null) ?>

    <!-- scripts start -->
    <?= Env::$params['links_js'] ?>
    <!-- scripts end -->

    <!-- code_body start -->
    <?= $page['data_site']['code_body'] ?>
    <!-- code_body end -->
</body>

</html>