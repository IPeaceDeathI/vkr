<div class="block-wrapper wrapper-main wrapper-center <?= $_GET['action'] ?? '' ?>">
    <!-- profile_menu_overlay start -->
    <div data-wrp="settings" class="dropdown-settings noprint">
        <?php foreach ($header_links as $opt) : ?>
            <?php if ($opt['menu'] == 'profile') : ?>
                <a href="<?= $opt['href'] ?>" class="button-nav btn-overlay" ga-event="<?= $opt['chapter'] ?>">
                    <div class="image-button-nav img-overlay <?= $opt['img'] ?? '' ?>"></div>
                    <div class="name-button-nav name-overlay"><?= $opt['name'] ?></div>
                </a>
            <?php endif; ?>
        <?php endforeach; ?>
    </div>
    <!-- profile_menu_overlay end -->