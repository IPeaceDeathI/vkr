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
        <div class="title">Контроль версий</div>
        <br><br>
        <span style="font-style: italic;">При просмотре могут некорректно отображаться блоки.</span>
        <br><br>
        <?php foreach ($data_hash as $item) : ?>
            <div>
                <div class="sub-title"><?= $item['date'] ?></div>
                <a target="_blank" href="/sites/<?= $this->id_site ?>/page/<?= $this->id_page ?>/settings/version/<?= $item['hash_id'] ?>">Просмотреть</a> |
                <?php if ($item['hash_id'] != $current['hash_id']) : ?>
                    <a href="" data-hash_id="<?= $item['hash_id'] ?>" data-replace>Применить</a>
                <?php else : ?>
                    <span style="color:yellowgreen;">Текущая</span>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
    <!-- main end -->
</div>