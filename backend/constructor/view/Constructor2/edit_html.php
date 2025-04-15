<?php

use Noks\Env;

/**
 * @param \Noks\Controller\Constructor\Page\EditPage
 */

$lp_path = '//' . \getDomain(); // SITE_URL;

?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="id-flow" content="<?= \getCurFlow() ?>">
    <meta name="id-site" content="<?= $this->site_id ?>">
    <meta name="id-page" content="<?= $this->site_page_id ?>">
    <link rel="shortcut icon" href="<?= $lp_path ?>/images/favicon.blue.png" type="image/x-icon">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Редактировать страницу | <?= SITE_NAME ?></title>

    <script defer="defer" src="<?= $lp_path ?>/constructor2/dist/js/Main.js"></script>

    <link href="<?= $lp_path ?>/constructor2/dist/css/Main.css" rel="stylesheet">
</head>

<body><noscript><strong>We're sorry but constructor2 doesn't work properly without JavaScript enabled. Please enable it
            to continue.</strong></noscript>
    <div id="app"></div>

    <?php
    // echo Env::$params['Yandex.Metrika'] ?? ''
    echo '<script type="text/javascript" >
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
            ym(' . (Env::$params['yandex_metrika_id'] ?? -1) . ', "init", {});
        </script>';
    ?>
</body>

</html>