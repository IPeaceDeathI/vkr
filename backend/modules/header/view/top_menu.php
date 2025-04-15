<!-- top_menu start -->
<!-- <div class="header-menu">

	<div class="icon-menu-header">
		<div class="img-icon-menu">☰</div>
	</div>

	<a class="logo-header desktop" href="">
		<div class="menu-logo-text"><?= SITE_NAME ?></div>
	</a>

	<div class="buttons-edit-exit noprint">

		<div class="header-box-comapny"></div>
		<?php if (userAuth()) : ?>
			<div class="flow-balance">
				<a href="/pay" data-flow-days-left></a>
				<div data-flow-name-tariff></div>
				<div data-flow-balance>- р.</div>
				<div data-wrp="balance">
					<div data-menu-balance class="dropdown-balance">
						<a data-flow-refresh class="refresh">Обновить</a>
						<a href="/pay" class="turn">Пополнить</a>
					</div>
				</div>
			</div>
			<div class="button-edit">
				<?php // Селектор скрыть, а вверху через js отображать выбранную команду 
				$user_photo = getSessionUserSegment()->get('user_photo', '');
				?>
				<img class="select-command-logo image-button-nav img-overlay no-name-logo" src="<?= ($user_photo == '' ? '/images/person.png' : $user_photo) ?>" class="">
			</div>
		<?php endif; ?>

	</div>
</div> -->
<!-- top_menu end -->