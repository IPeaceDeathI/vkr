<?php

/**
 * @var string $header_site
 * @var string $menu_site
 * @var string $menu_setting_site
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

    <div class="right-block">

        <div class="title">Activity</div>
        <br>
        <div class="sub-title">Статус</div>
        <select name="active" required style="width: 670px;">
            <?php foreach ([1 => 'Вкл', 0 => 'Выкл'] as $key => $value) : ?>
                <?php $key = (bool) $key; ?>
                <option <?= (($settings['sett_settings']['activity']['active'] ?? false) === $key ? ' selected' : '') ?> value="<?= (int)$key ?>"><?= $value ?></option>
            <?php endforeach; ?>
        </select>

        <br><br><br>
        <div class="title">Настройки</div>

        <div class="sub-title">Период</div>
        <select name="need" required style="width: 670px;">
            <option value="">Выберите</option>
            <?php foreach ([60, 120] as $value) : ?>
                <option <?= (($settings['sett_settings']['activity']['need'] ?? null) === $value ? ' selected' : '') ?> value="<?= $value ?>"><?= $value ?> сек</option>
            <?php endforeach; ?>
        </select>

        <!-- <div class="sub-title">Секунды. период проверки</div>
        <input name="checkTime" type="number" value="<?= $settings['sett_settings']['activity']['checkTime'] ?? '' ?>"> -->

        <div class="sub-title">Идентификатор цели</div>
        <input name="target_name" type="text" value="<?= $settings['sett_settings']['activity']['target_name'] ?? 'activity' ?>">

        <!-- <div class="sub-title">Повторять набор?</div>
        <select name="loop" required style="width: 670px;">
            <option value="">Выберите</option>
            <?php foreach ([1 => 'Вкл', 0 => 'Выкл'] as $key => $value) : ?>
                <?php $key = (bool) $key; ?>
                <option <?= (($settings['sett_settings']['activity']['loop'] ?? null) === $key ? ' selected' : '') ?> value="<?= (int)$key ?>"><?= $value ?></option>
            <?php endforeach; ?>
        </select> -->

        <button class="btn-action" data-save>Сохранить</button>


    </div>


</div>