<!-- <div class="wrapper wrapper-main">
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
						<?php if ($site['domains'] !== []) : ?>
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
</div> -->


<!-- ################################################################################################ -->


<div class="admin-content-wrapper scrollable-content" id="app">
	<div data-is="app-common" class="app-common sites-page block">
		<div data-is="page-progress-loader" loading="done" class="page-progress-loader state-hide ">
			<div class="page-progress-bar" style="width: 0%"></div>
		</div>
		<div class="admin-content">


			<header class="container fluid">
				<div data-is="admin-breadcrumbs" class="admin-breadcrumbs text-title"></div>
				<div data-is="proxy" is="admin-project-header" style="" class="admin-project-header fade-in-animation group-title borderless ">

					<div class="flexbe-title text-title inline-box">
						<div class="flexbe-text">Сайты</div>

						<!-- <div is="dropdown-filter" class="dropdown-filter flexbe-button filled rounded is-secondary ml20 " value="all">
							<div class="flexbe-text text-medium">Все</div>
							<svg viewBox="0 0 10 6" class="flexbe-icon size-8">
								<path d="M5 4L9 -4.37114e-08L10 1L5 6L-4.37114e-08 1L1 -3.93402e-07L5 4Z"></path>
							</svg>
							<div is="proxy" class="menu-list" data-is="dropdown">
								<div class="toggle-helper"></div>
							</div>
						</div> -->
						
					</div>

					<div class="admin-project-header__buttons">

						<!-- <div is="admin-search-input" placeholder="Поиск по адресу или названию" search-count="3" class="admin-search-input ">
							<div is="flexbe-input" class="flexbe-input rounded light  flexbe-input--text" prefix-icon="/<?=VERSION?>/admin/resources/images/filters.svg?1c7acb5f#search" prefix-icon-size="14" placeholder="Поиск по адресу или названию" searchcount="3">
								<div class="flexbe-input-wrap has-prefix-icon">
									<input type="text" class="flexbe-input__text flexbe-input-styled" placeholder="Поиск по адресу или названию" autocomplete="off" tabindex="undefined">
									<div class="flexbe-input__ghost show"><span class="affix prefix prefix "><svg class="flexbe-icon size-14"><use href="/<?=VERSION?>/admin/resources/images/filters.svg?1c7acb5f#search"></use></svg></span><span class="affix value">Поиск по адресу или названию</span></div>
								</div>
							</div>
						</div>

						<div is="dropdown-sort" class="dropdown-sort flexbe-button filled rounded is-secondary  ">
							<svg is="flexbe-icon" sprite="/<?=VERSION?>/admin/resources/images/filters.svg?1c7acb5f" icon="icon-asc" size="14" class="flexbe-icon size-14 ">
								<use href="/<?=VERSION?>/admin/resources/images/filters.svg?1c7acb5f#icon-asc"></use>
							</svg>
							<div is="proxy" data-is="dropdown">
								<div class="toggle-helper"></div>
							</div>
						</div>

						<div is="flexbe-switch" class="flexbe-switch round stretched is-group size-large theme-default separator" size="large" value="grid" sprite="/<?=VERSION?>/admin/resources/images/filters.svg?1c7acb5f">
							<div class="switch-item active tooltipstered" data-tip="Сетка" data-value="grid">
								<svg class="flexbe-icon size-14">
									<use href="/<?=VERSION?>/admin/resources/images/filters.svg?1c7acb5f#cards-view"></use>
								</svg>
							</div>
							<div class="switch-item tooltipstered" data-tip="Таблица" data-value="table">
								<svg class="flexbe-icon size-14">
									<use href="/<?=VERSION?>/admin/resources/images/filters.svg?1c7acb5f#table-view"></use>
								</svg>
							</div>
							<div class="switch-toggle" style="left: 2px; width: 30px;"></div>
						</div>

						<div class="flexbe-separator"></div> -->

						<div class="flexbe-button filled rounded large is-primary"><span class="flexbe-text">Создать сайт</span></div>
					</div>
				</div>
			</header>


			<section class="container  projects-section fluid">
				<div data-is="proxy" is="admin-project-content" style="" class="admin-project-content grid-view">
					<div class="sites-group-list slide-down-animation">
						<div class="sites-group">
							<div class="sites-domains">

							<?php foreach ($sites as $site) : ?>

								<?php 
									// echo '<pre>'; print_r($site); echo '</pre>';
									$site['domain'] = $site['domains']?$site['domains'][0]['domain']:false;
								?>

								<div is="admin-project-item" class="admin-project-item clickable place-item" transfer="transfer" is-clickable="is-clickable" delete="delete" data-project-id="<?=$site['id']?>">
									<div class="project-card flexbe-white-card shadow hoverable ">
										<div class="site-header">
											<img class="favicon mr10" src="https://lp560722.myflexbe.com/files/favicon_20221011170443.png">
											<a class="text-content flexbe-text site-title <?=$site['domain']?'':'text-shade'?>" href="/admin/pages/<?=$site['id']?>">
												<span is="proxy" data-is="raw">
													<?=$site['domain']?$site['domain']:'Домен не подключен'?>
												</span>
											</a>
											<?php 
												if($stat[$site['id']]['cnt_appl'])
													echo '<a class="site-tag flexbe-button filled small is-primary clickable" href="/admin/pages/'.$site['id'].'">
														<span class="flexbe-text">'.
															$stat[$site['id']]['cnt_appl'].' заявок
														</span>
													</a>'; 
											?>
											<div class="flexbe-action-buttons">
												<div class="action-button">
													<svg is="flexbe-icon" icon="more" sprite="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f" size="18" class="flexbe-icon size-18 ">
														<use href="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f#more"></use>
													</svg>
													<div is="admin-project-item-dropdown" relative=".flexbe-white-card" min-width="230" transfer="transfer" delete="delete" allow-change-is-draft="allow-change-is-draft" class="admin-project-item-dropdown ">
														<div class="menu-list" is="proxy" data-is="dropdown">
															<div class="toggle-helper"></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<a href="/admin/pages/<?=$site['id']?>" class="site-preview-wrap">
											<div class="site-preview">
												<div class="preview-image" style="background-image: url(<?= ($site['preview'] ?? MAIN_URL . '/sites/resource/img/imgfish.jpeg') ?>)"></div>
											</div>
										</a>
										<div class="site-footer">
											<div class="site-footer__name admin-project-name justify-between">
												<div class="text-content flexbe-text site-title"><span is="proxy" data-is="raw"><?=$site['title']?></span></div>
												<div class="flexbe-button style-text edit-button">
													<div is="flexbe-icon" icon="rename" sprite="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f" class="flexbe-icon size-16 ">
														<svg xmlns="http://www.w3.org/2000/svg">
															<use href="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f#rename"></use>
														</svg>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

							<?php endforeach; ?>

								<!-- <div is="admin-project-item" class="admin-project-item is-draft clickable place-item" transfer="transfer" is-clickable="is-clickable" delete="delete" data-project-id="643184">
									<div class="project-card flexbe-white-card shadow hoverable ">
										<div class="site-header"><img class="favicon mr10" src="/_s/images/favicon.png"><a class="text-content flexbe-text site-title text-shade" href="https://lp643184.myflexbe.com/admin/auth/?go=/admin/pages/"><span is="proxy" data-is="raw">Домен не подключен</span></a>
											<div class="site-tag is-secondary clickable">
												<svg is="flexbe-icon" icon="draft" sprite="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f" class="flexbe-icon size-16 ">
													<use href="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f#draft"></use>
												</svg><span class="flexbe-text">Черновик</span>
												<div is="proxy" data-is="dropdown">
													<div class="toggle-helper"></div>
												</div>
											</div>
											<div class="flexbe-action-buttons">
												<div class="action-button">
													<svg is="flexbe-icon" icon="more" sprite="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f" size="18" class="flexbe-icon size-18 ">
														<use href="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f#more"></use>
													</svg>
													<div is="admin-project-item-dropdown" relative=".flexbe-white-card" min-width="230" transfer="transfer" delete="delete" allow-change-is-draft="allow-change-is-draft" class="admin-project-item-dropdown ">
														<div class="menu-list" is="proxy" data-is="dropdown">
															<div class="toggle-helper"></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="site-preview-wrap">
											<div class="site-preview">
												<div class="preview-image" style="background-image: url(/img/39428473_800.jpg)"></div>
											</div>
										</div>
										<div class="site-footer">
											<div class="site-footer__name admin-project-name justify-between">
												<div class="text-content flexbe-text site-title text-shade"><span is="proxy" data-is="raw">Укажите название сайта</span></div>
												<div class="flexbe-button style-text edit-button">
													<div is="flexbe-icon" icon="rename" sprite="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f" class="flexbe-icon size-16 ">
														<svg xmlns="http://www.w3.org/2000/svg">
															<use href="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f#rename"></use>
														</svg>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>


								<div is="admin-project-item" class="admin-project-item is-draft clickable place-item" transfer="transfer" is-clickable="is-clickable" delete="delete" data-project-id="653302">
									<div class="project-card flexbe-white-card shadow hoverable ">
										<div class="site-header"><img class="favicon mr10" src="/_s/images/favicon.png"><a class="text-content flexbe-text site-title text-shade" href="https://lp653302.myflexbe.com/admin/auth/?go=/admin/pages/"><span is="proxy" data-is="raw">Домен не подключен</span></a>
											<div class="site-tag is-secondary clickable">
												<svg is="flexbe-icon" icon="draft" sprite="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f" class="flexbe-icon size-16 ">
													<use href="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f#draft"></use>
												</svg><span class="flexbe-text">Черновик</span>
												<div is="proxy" data-is="dropdown">
													<div class="toggle-helper"></div>
												</div>
											</div>
											<div class="flexbe-action-buttons">
												<div class="action-button">
													<svg is="flexbe-icon" icon="more" sprite="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f" size="18" class="flexbe-icon size-18 ">
														<use href="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f#more"></use>
													</svg>
													<div is="admin-project-item-dropdown" relative=".flexbe-white-card" min-width="230" transfer="transfer" delete="delete" allow-change-is-draft="allow-change-is-draft" class="admin-project-item-dropdown ">
														<div class="menu-list" is="proxy" data-is="dropdown">
															<div class="toggle-helper"></div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="site-preview-wrap">
											<div class="site-preview">
												<div class="preview-image" style="background-image: url(/img/21460278_800.jpg)"></div>
											</div>
										</div>
										<div class="site-footer">
											<div class="site-footer__name admin-project-name justify-between">
												<div class="text-content flexbe-text site-title text-shade"><span is="proxy" data-is="raw">Укажите название сайта</span></div>
												<div class="flexbe-button style-text edit-button">
													<div is="flexbe-icon" icon="rename" sprite="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f" class="flexbe-icon size-16 ">
														<svg xmlns="http://www.w3.org/2000/svg">
															<use href="/<?=VERSION?>/admin/resources/images/projects.svg?1c7acb5f#rename"></use>
														</svg>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div> -->


							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>

<!-- <link href="/_s/build/land_lib_editor.css?1c7acb5f" media="all" rel="stylesheet" type="text/css">
<script src="/_s/lib/riot3/riot.min.js?v3.13.3" type="text/javascript" charset="utf-8"></script>
<script src="/_s/lib/anime/anime.min.js?321" type="text/javascript" charset="utf-8"></script>
<script src="/_s/lib/toast/toast.min.js?1.0.2" type="text/javascript" charset="utf-8"></script>
<script src="/_s/lib/sortable/sortable.min.js?1.8.0" type="text/javascript" charset="utf-8"></script>
<script src="/_s/lib/jquery/tooltipster/tooltipster.patched.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/_s/lib/jquery/clickOut/clickOut.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/_s/lib/spaced/spacedUpload/jquery.spacedUpload.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/_s/lib/spaced/spacedClickOut/jquery.spacedClickOut.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/_s/build/locale_ru.js?1c7acb5f" charset="utf-8"></script>
<script type="module" src="/_s/build/js/admin.js?1c7acb5f"></script> -->