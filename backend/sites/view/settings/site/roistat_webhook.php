<!-- header_site start -->
<?= $header_site ?>
<!-- header_site end -->
<!-- menu_site start -->
<?= $menu_site ?>
<!-- menu_site end -->

<input type="hidden" data-id_site value="<?= $data_site['id'] ?>">

<div class="wrapper-edit-site">

    <div class="left-block">

        <!-- setting menu start -->
        <?= $menu_setting_site ?>
        <!-- setting menu end -->

    </div>

    <div class="right-block">

        <div class="title">Передача заявок в Roistat</div>
        <br><br>
        <div class="img-roistat"></div>
        <br><br>

        <div>
            <label for="urlOrKey"><strong>WebHook URL:</strong></label>
        </div>
        <input id="urlOrKey" name="urlOrKey" type="text" placeholder="URL или ключ" maxlength="255" value="<?= $data_hook['hook_key'] ?? '' ?>">
        <?php if (is_null($data_hook['hook_key'] ?? null)) : ?>
            <button data-save class="btn-action">Сохранить</button>
        <?php else : ?>
            <button data-update class="btn-action">Изменить</button>
            <?php if ($data_hook['hook_status'] == 1) : ?>
                <button data-inactive class="btn-action">Отключить</button>
            <?php else : ?>
                <button data-active class="btn-action">Включить</button>
            <?php endif; ?>
        <?php endif; ?>

    </div>


</div>