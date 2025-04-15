<?php

use Noks\Controller\Site\Setting\SubDomain;

$segment = session()->segment(SubDomain::class);
/** @var string[] $err */
$err = $segment->pull('err', []);
/** @var bool $success */
$success = $segment->pull('success', false);
/**
 * @var string $header_site
 * @var string $menu_site
 * @var string $menu_setting_site
 * @var string $sub_domain
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
        <span class="text-[20px]">Изменить поддомен</span>
        <br><br>
        <div class="max-w-[25rem]">
            <form action="#" method="POST">
                <label for="sub-domain" class="cursor-pointer mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Поддомен</label>
                <div class="flex">
                    <input name="sub_domain" type="text" id="sub-domain" class="outline-none !block !w-full !rounded-md !border-red-300 !shadow-sm !focus:border-red-300 !focus:ring !focus:ring-red-200 !focus:ring-opacity-50 !disabled:cursor-not-allowed !disabled:bg-gray-50 !disabled:text-gray-500" placeholder="поддомен мин:5 макс:11" value="<?= $sub_domain ?>" maxlength="11" minlength="5" autocomplete="off">
                    <span class="block pl-[2px] flex items-center">.<?= SITE_DOMAIN ?></span>
                </div>

                <a class="text-blue-500 block mt-[5px]" href="https://<?= $sub_domain ?>.<?= SITE_DOMAIN ?>" target="_blank"><?= $sub_domain ?>.<?= SITE_DOMAIN ?></a>
                <?php foreach ($err as $e) : ?>
                    <p class="mt-1 text-sm text-red-500"><?= $e ?></p>
                <?php endforeach ?>
                <?php if ($success) : ?>
                    <p class="mt-1 text-sm text-green-500">Готово</p>
                <?php endif ?>

                <button class="text-center cursor-pointer my-[1em] text-[18px] text-[#fff] w-[160px] h-[45px] bg-[linear-gradient(180deg,_#EF7C7C_0%,_#B85757_100%)] rounded-[10px] flex items-center justify-center border-[0] hover:bg-[linear-gradient(180deg,_#ff6c6c_0%,_#c13333_100%)]">Сохранить</button>
            </form>
        </div>
    </div>


</div>