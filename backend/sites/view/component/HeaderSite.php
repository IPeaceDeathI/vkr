<!-- <div class="wrapper-head-info">
    <a href="/sites/<?=$this->id_site?>/settings" class="setting"></a>

    <div class="preview-site">
        <img src="<?=( $data_site['preview'] ?? MAIN_URL . '/sites/resource/img/imgfish.jpeg' )?>">
    </div>

    <div class="info-site">
        <div class="hashtag-id">
            Сайт #<?=$data_site['id']?>
        </div>
        <div class="title">
            <?=$data_site['title']?>
        </div>
        <div class="url-block">

            <?php foreach($data_domain as $domain): ?>
                <?php if($domain['status'] == 1): ?>
                    <a target="_blank" href="//<?=$domain['domain']?>"><?=$domain['domain']?></a>
                <?php endif; ?>
            <?php endforeach; ?>

        </div>
        <div class="stat-site-block">
            <div><?=$stat['count_views_all_pages']?>
                <span>просмотров</span>
            </div>
            <div><?=$stat['cv']?>%
                <span>конверсия, CV</span>
            </div>
            <div><?=$stat['count_appl_all_pages']?>
                <span>заявки</span>
            </div>
        </div>
    </div>
</div> -->