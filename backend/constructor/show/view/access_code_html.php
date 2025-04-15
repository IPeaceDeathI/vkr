<?php

use Noks\Env;

use Noks\Controller\Constructor\ShowPublicPage;

$segment = session()->segment(ShowPublicPage::class);
/** @var string $access_code_msg */
$access_code_msg = $segment->pull('access_code_msg');

/**
 * @var int $flow_id
 * @var int $site_id
 * @var int $site_page_id
 */

?>
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    <title>
        Технический адрес
    </title>

    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="theme-color" content="#0c2556">

    <meta name="id-flow" content="<?= $flow_id ?>">
    <meta name="id-site" content="<?= $site_id ?>">
    <meta name="id-page" content="<?= $site_page_id ?>">
    <meta name="referer" content="<?= getReferer() ?>">

    <!-- css src start -->
    <?= Env::$params['links_css'] ?>
    <!-- css src end -->

    <!-- scripts head start -->
    <?= Env::$params['links_head_js'] ?>
    <!-- scripts head end -->
</head>

<body>
    <noindex>
        <div class="flex items-center justify-center h-screen bg-[#fafafa]">
            <div class="bg-white rounded-2xl border shadow-xl p-10 max-w-lg">
                <div class="flex flex-col items-center space-y-4">
                    <h1 class="font-bold text-2xl text-gray-700 w-4/6 text-center">Технический адрес</h1>
                    <p class="text-sm text-gray-500 text-center w-5/6">Данный адрес не предназначен для публикации и рекламы. Необходимо подключить домен.</p>
                    <form action="#" method="POST" class="w-full">
                        <input type="number" placeholder="123456" class="border-2 rounded-lg w-full h-12 px-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none<?= ($access_code_msg ? ' border-rose-600' : '') ?>" name="access_code">
                        <?php if ($access_code_msg) : ?>
                            <span class="text-rose-600"><?= $access_code_msg ?></span>
                        <?php endif ?>
                        <button class="mt-[10px] bg-blue-400 text-white rounded-md font-semibold px-4 py-3 w-full">ВОЙТИ</button>
                    </form>
                    <p class="text-sm text-gray-500 text-center w-5/6">
                        Код доступа вы можете получить в разделе<br>
                        <a href="" class="text-black">Настройки &gt; Общие</a>
                    </p>
                </div>
            </div>
        </div>
    </noindex>
    <!-- scripts down start -->
    <?= Env::$params['links_js'] ?>
    <!-- scripts down end -->
</body>

</html>