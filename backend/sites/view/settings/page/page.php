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
        <div class="title">SEO настройки</div>
        <br>

        <?php if ($data_page['uri'] !== '') : ?>
            <div class="sub-title">Адрес страницы</div>
            <input type="text" name="uri" value="<?= $data_page['uri'] ?>" required maxlength="100" minlength="1">
        <?php endif; ?>
        <div class="sub-title">Заголовок страницы</div>
        <input type="text" name="title" value="<?= $data_page['title'] ?>">
        <div class="sub-title">SEO описание (meta-description)</div>
        <textarea name="desc"><?= $data_page['description'] ?></textarea>
        <button data-save class="btn-action">Сохранить</button>

    </div>
    <!-- main end -->
</div>