<!-- header_site start -->
<?= $header_site ?>
<!-- header_site end -->

<!-- menu_site start -->
<?= $menu_site ?>
<!-- menu_site end -->

<div class="wrapper wrapper-main">
	<div class="wrapper-pages-items">
		<!-- pages start -->
		<?php foreach ($pages as $page) : ?>
			<div class="page-block">
				<div class="preview-sub-block" style="background-image:  url('<?= ($page['preview_src'] ?? MAIN_URL . '/sites/resource/img/imgfish.jpeg') ?>');">
					<div class="stat-block">
						<div class="options">
							<div class="type">Страница</div>
							<a href="/sites/<?= $this->id_site ?>/page/<?= $page['id'] ?>/settings" class="setting"></a>
						</div>
						<div class="flex-block">
							<div><?= $page['views'] ?>
								<span>просмотров</span>
							</div>
							<div><?= calcCV($page['views'], $page['cnt_appl']) ?>%
								<span>конверсия, CV</span>
							</div>
							<div><?= $page['cnt_appl'] ?>
								<span>заявки</span>
							</div>
						</div>
					</div>
				</div>
				<div class="info-sub-block">
					<div class="url"><?= ($page['uri'] == '' ? 'Главная' : '/' . $page['uri']) ?></div>
					<a href="<?= $page['url_editor'] ?>" title="<?= $page['title'] ?>" class="title"><?= $page['title'] ?></a>
					<div class="wrapper-buttons-page">
						<a href="<?= $page['url_preview'] ?>" target="_blank" class="go-page">Открыть</a>
						<a href="<?= $page['url_editor'] ?>" target="_blank" class="edit-page">Изменить</a>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
		<!-- pages end -->
	</div>
</div>