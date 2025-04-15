<?php

/**
 * @param \Noks\Template\Controller\IndexTemplate
 */
?>
<!-- menu start -->
<?= $menu_index_tpl ?>
<!-- menu end -->

<div class="wrapper wrapper-main">
	<div class="wrapper-tpl-items">
		<?php foreach ($tpls as $tpl) : ?>
			<div class="site-block">
				<div class="preview-sub-block" style="background-image: linear-gradient(transparent, black), url('<?= ($tpl['tpl_preview_src'] ?? MAIN_URL . '/sites/resource/img/imgfish.jpeg') ?>');">
					<div class="stat-block">

						<div class="options">
							<div class="type">Шаблон</div>
							<a href="/templates/edit/<?= $tpl['tpl_id'] ?>" class="setting"></a>
						</div>

						<div class="flex-block">
							<div>-
								<span>просмотров</span>
							</div>
							<div>-
								<span>использований</span>
							</div>
						</div>
					</div>
				</div>
				<div class="info-sub-block">
					<div class="up">
						<div class="hashtag-id">Шаблон #<?= $tpl['tpl_id'] ?><?= ($tpl['tpl_id_flow'] != $this->flow_id ? ' <span style="color:red;">Клиентский шаблон</span>' : '') ?></div>
						<a href="/templates/show/<?= $tpl['tpl_id'] ?>" target="_blank" class="title"><?= ($tpl['tpl_title'] == '' ? 'Без названия' : $tpl['tpl_title']) ?></a>
					</div>

					<div class="bottom">

						<div class="wrapper-buttons">
							<a href="/constructor/edit_tpl?id_tpl=<?= $tpl['tpl_id'] ?>" target="_blank" class="setting">Изменить</a>
							<a href="/templates/show/<?= $tpl['tpl_id'] ?>" target="_blank" class="pages">Открыть</a>
						</div>

					</div>

				</div>
			</div>
		<?php endforeach; ?>

	</div>
</div>