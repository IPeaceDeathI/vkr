<div class="card-block">
    <!-- <div class="preview-sub-block" style="background-image: linear-gradient(transparent, black), url('<?= ($data_site['preview'] ?? MAIN_URL . '/sites/resource/img/imgfish.jpeg') ?>');">
        <div class="stat-block">
            <div class="options">
                <div class="type">Страница</div>
            </div>
            <div class="flex-block">
                <div><?= $data_page['views'] ?>
                    <span>просмотров</span>
                </div>
                <div><?= calcCV($data_page['views'], $cnt_appl) ?>%
                    <span>конверсия, CV</span>
                </div>
                <div><?= $cnt_appl ?>
                    <span>заявки</span>
                </div>
            </div>
        </div>
    </div> -->
    <div class="info-sub-block">
        <div class="url"><?= ($data_page['uri'] == '' ? 'Главная' : '/' . $data_page['uri']) ?></div>
        <div class="title">
            <a href="<?= $data_page['url_preview'] ?>"><?= $data_page['title'] ?></a>
        </div>
        <div class="wrapper-buttons-page">
            <a href="<?= $data_page['url_preview'] ?>" class="go-page">Перейти</a>
            <a href="<?= $data_page['url_editor'] ?>" class="edit-page">Изменить</a>
        </div>
    </div>
</div>