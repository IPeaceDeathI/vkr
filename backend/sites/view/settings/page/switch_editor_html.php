<?php

/**
 * @param \Noks\Controller\SitePage\Setting\SwitchVersionEditor
 */

use Noks\Enum\VersionConstructorEnum;
?>
<div class="wrapper-edit-page">

    <div class="left-block">
        <!-- card start -->
        <?= $card_setting_page ?>
        <!-- card end -->
        <!-- setting menu start -->
        <?= $menu_setting_page ?>
        <!-- setting menu end -->
    </div>
    <!-- main start -->
    <div class="right-block">
        <!-- go_site start -->
        <?= $go_to_setting_page ?>
        <!-- go_site end -->
        <div class="title">Изменить редактор</div>
        <br>
        <br>
        <div class="wrp">
            <label class="toggler-wrapper style-1">
                <input data-put type="checkbox" <?= (VersionConstructorEnum::VERSION_2->itValue($data_page['version_editor']) ? ' checked' : '') ?>>
                <div class="toggler-slider">
                    <div class="toggler-knob"></div>
                </div>
            </label>

            <div class="desc">Включить новую версию редактора страниц.</div>
        </div>

    </div>
    <!-- main end -->
</div>