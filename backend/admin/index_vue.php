<?php

use Noks\Env;

/**
 * @param Noks\Controller\WEB\Admin\Vue
 */

$main_host = '//' . $hosts . '/' . VERSION;

$assets_dist = $main_host . '/../constructor2/admin/dist'; // Для скомпилированных файлов
$assets_src = $main_host . '/../constructor2/admin/src'; // Для того что не переноситься, как шрифты

?>
<!DOCTYPE html>
<html>

<head>
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" crossorigin href="<?=$assets_dist?>/assets/index.css">

    <link href="<?=$assets_src?>/assets/fonts/allFonts.css?82g3vh3" media="all" rel="stylesheet" type="text/css">

    <link href="<?=$assets_dist?>/assets/land_bootstrap.css?82g3vh3" media="all" rel="stylesheet" type="text/css">
    <link href="<?=$assets_dist?>/assets/land_admin.css?82g3vh3" media="all" rel="stylesheet" type="text/css">
    <link href="<?=$assets_dist?>/assets/land_lib_admin.css?82g3vh3" media="all" rel="stylesheet" type="text/css">
    <!-- <link href="<?=$assets_dist?>/assets/header.css?82g3vh3" media="all" rel="stylesheet" type="text/css"> -->


    <!-- NoksCRM begin -->
    <link rel="stylesheet" href="<?=$assets_src?>/assest/crm/app.65780315249abdfc6c3e.css?82g3vh3">
    <link rel="stylesheet" href="<?=$assets_src?>/assest/crm/common.391af7e237171b9f0573.css?82g3vh3" media="all">
    <link rel="stylesheet" href="<?=$assets_src?>/assest/crm/settings.15b26b55273ad085b031.css?82g3vh3">

    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/6217.3298119ca64704677fb6.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/cards.411bee0735d47b97eecd.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/mail.bd94ffc0443cc93b86bc.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/print.5a89f161cc3f45112457.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/digital_pipeline.9dd36519cdd016c80fec.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/1796.0ad68c772c51ec3d96e3.css">

    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/inbox.98c2423d6741545719a3.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/9140.0c89a750c190e60f0009.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/dashboard.9bdcda4a144a659388dd.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/2695.a5a70894af0b79db0829.css">

    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/2184.6eebef3202d99dc27915.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/pipeline.1d81d731cc83f6df9778.css">
    <link rel="stylesheet" type="text/css" href="<?=$assets_src?>/assets/crm/amoforms.0bb0957daa844b16ec0f.css">
    <!-- NoksCRM end -->

    <title><?=SITE_NAME?></title>
</head>

<body class="admin admin-ui">
    <script type="json" id="data_page">
        <?php
            echo json_encode(Env::$settings);
        ?>
    </script>

    <div id="app"></div>

    <script type="module" crossorigin src="<?=$assets_dist?>/assets/index.js?<?=Env::$params['cache_version']?>"></script>

</body>

</html>