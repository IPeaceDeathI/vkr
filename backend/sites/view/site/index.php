<!-- menu_index_site start -->
<?= $menu_index_site ?>
<!-- menu_index_site end -->

<div class="wrapper wrapper-main">
	<div class="wrapper-sites-items">


		<?php if (!$sites) : ?>
			<a href="/sites/add" class="new-site-block">
				<div class="new-preview-sub-block">
					<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
						<path fill="currentColor" fill-rule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"></path>
					</svg>
				</div>
				<div class="new-info-sub-block">Добавить сайт</div>
			</a>
		<?php endif; ?>


		<?php foreach ($sites as $site) : ?>

			<div class="site-block">
				<div class="preview-sub-block" style="background-image: linear-gradient(transparent, black), url('<?= ($site['preview'] ?? MAIN_URL . '/sites/resource/img/imgfish.jpeg') ?>');">
					<div class="stat-block">
						<div class="type-card">Сайт</div>
						<div class="flex-block">
							<div><?= $stat[$site['id']]['views'] ?? 0 ?>
								<span>просмотров</span>
							</div>
							<div><?= $stat[$site['id']]['cv'] ?? 0 ?>%
								<span>конверсия, CV</span>
							</div>
							<div><?= $stat[$site['id']]['cnt_appl'] ?? 0 ?>
								<span>заявки</span>
							</div>
						</div>
					</div>
				</div>
				<div class="info-sub-block">
					<div class="up">
						<div class="hashtag-id">Сайт #<?= $site['id'] ?></div>
						<a href="/sites/<?= $site['id'] ?>" title="<?= $site['title'] ?>" class="title"><?= $site['title'] ?></a>
					</div>

					<div class="bottom">

						<?php $site['domains'] = array_filter($site['domains'], fn ($d) => $d['status'] == 1); ?>
						<?php if ($site['domains']) : ?>
							<a target="_blank" href="//<?= current($site['domains'])['domain'] ?>" class="url-block"><?= current($site['domains'])['domain'] ?></a>
						<?php endif; ?>

						<div class="wrapper-buttons">
							<a href="/sites/<?= $site['id'] ?>/settings" class="setting">Настроить</a>
							<a href="/sites/<?= $site['id'] ?>" class="pages">Страницы</a>
						</div>

					</div>

				</div>
			</div>

		<?php endforeach; ?>

	</div>
</div>