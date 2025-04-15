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
        <div class="title">Создать копию страницы</div>
        <br>

        <div class="sub-title">Название</div>
        <input type="text" name="title" required maxlength="100" minlength="1" value="<?= $data_page['title'] ?>">

        <button data-save class="btn-action">Создать</button>

    </div>
    <!-- main end -->
</div>