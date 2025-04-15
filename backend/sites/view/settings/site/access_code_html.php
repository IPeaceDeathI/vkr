<?php

/**
 * @param \Noks\Controller\Site\Setting\AccessCode
 * @var string $header_site
 * @var string $menu_site
 * @var string $menu_setting_site
 * @var int $access_code
 */

?>
<!-- header_site start -->
<?= $header_site ?>
<!-- header_site end -->
<!-- menu_site start -->
<?= $menu_site ?>
<!-- menu_site end -->

<div class="wrapper-edit-site">

    <div class="left-block">

        <!-- setting menu start -->
        <?= $menu_setting_site ?>
        <!-- setting menu end -->

    </div>

    <div class="right-block !pr-[15px]">
        <span class="text-[20px]">Код доступа к сайту</span>
        <br><br>
        <div class="mx-auto">
            <div class="flex h-40 max-w-lg items-center justify-center bg-blue-50 rounded-[5px]">
                <span class="text-[15px] text-gray-500">Код доступа: <?= $access_code ?></span>
            </div>
        </div>
    </div>


</div>