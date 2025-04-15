<div class="setting-block">
    <div class="list">

        <div class="menu-header">Настройки</div>
        
        <?php foreach($setting_menu as $chapter_name => $chapter): ?>

            <div class="chapter"><?=$chapter_name?></div>

            <?php foreach($chapter as $item): ?>
                <a
                    href="<?=$item['href']?>"
                    <?=(!$item['active'] ? 'style="pointer-events: none;"' : '')?>
                    class="<?=($item['active'] ? 'button' : 'button-ban')?><?=($item['active'] && $sub == $item['sub'] ? ' now' : '')?>"
                >
                    <svg icon="panel" sprite="/src/assets/images/panel" class="flexbe-icon size-16">
                        <use href="/constructor2/admin/src/assets/images/settings.svg#<?=$item['svg']?>"></use>
                    </svg>
                    <?=$item['name']?>
                </a>
            <?php endforeach; ?>

        <?php endforeach; ?>

    </div>

</div>