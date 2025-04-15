<!-- left_menu_overlay start -->
<div class="menu-navigation nav-overlay">
	<div class="header-menu logo-overlay">
		<div class="icon-menu-header">
			<div class="img-icon-menu">☰</div>
		</div>
		<div class="logo-header-overlay">
			<div class="menu-logo-text"><?= SITE_NAME ?></div>
		</div>
	</div>
	<div class="menu-buttons-nav-overlay">
		<div class="separate-line">
			<?php foreach ($left_buttons as $opt) : ?>
				<?php if ($opt['menu'] == 'left') : ?>
					<a href="<?= $opt['href'] ?>" class="button-nav main btn-overlay" ga-event="<?= $opt['chapter'] ?>" title="<?= $opt['name'] ?>">
						<div id="" class="image-button-nav img-overlay <?= $opt['img'] ?>"></div>
						<div class="name-button-nav name-overlay"><?= $opt['name'] ?></div>
					</a>
				<?php endif; ?>
			<?php endforeach; ?>
			<?php unset($left_buttons, $opt); ?>
		</div>
	</div>
</div>
<div class="dark-overlay hidden"></div>
<!-- left_menu_overlay end -->