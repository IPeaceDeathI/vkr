<!-- <div class="wrapper wrapper-main">
	<div class="wrapper-pages-items">
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
	</div>
</div> -->


<!-- ############################################################################### -->


<div class="admin-content-wrapper scrollable-content" id="app">
<div data-is="admin-pages-list" class="admin-pages-list scrollable-content container fluid">
    <header class="fade-in-animation group-title">
    <div data-is="admin-breadcrumbs" index="0" class="admin-breadcrumbs pages-breadcrumbs text-title"> <a class="style-link-ignore breadcrumb first   active" href="/admin/pages/"> Страницы </a> </div>
    <div class="flexbe-buttons-line">
        <div class="flexbe-button large rounded bordered is-primary add-folder show"> <span class="flexbe-text">Создать папку</span> </div>
        <div class="flexbe-button large rounded filled is-primary add-page"> <span class="flexbe-text">Создать страницу</span> </div>
    </div>
    </header>
    <div ref="content" class="content slide-down-animation ">
    <div class="pages-list" ref="pages">


    <?php foreach ($pages as $page) : ?>

        <?php 
            // echo '<pre>'; print_r($page); echo '</pre>';
        ?>

        <div class="page-item">
        <div data-is="admin-pages-page-item" class="admin-pages-page-item">
            <div class="flexbe-white-card shadow hoverable ">
            <a class="page-preview-wrap" href="<?=$page['url_editor']?>">
                <div class="page-preview" style="background-color: #FFF; background-image: url(<?= ($page['preview_src'] ?? MAIN_URL . '/sites/resource/img/imgfish.jpeg') ?>)"></div>
                <div class="page-data">
                    <div class="page-title"> 
                        <span data-is="flexbe-tooltip" content="Главная страница" class="flexbe-tooltip home-page flexbe-icon size-16 tooltipstered">    
                            <svg><use xlink:href="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f#home-page"></use></svg> 
                        </span> 
                    <span class="flexbe-text "> <?=$page['title']?> </span> 
                    </div>
                    <div class="page-url" data-is="raw">
                        <span class="domain"><?=$page['url_preview']?></span>
                        <!-- <span class="uri">/</span> -->
                    </div>
                    <div data-is="admin-pages-page-item-actions" sprite="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f" class="admin-pages-page-item-actions ">
                        <svg class="flexbe-icon size-18 dots">
                        <use xlink:href="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f#dots"></use>
                        </svg>
                        <dropdown class="dropdown-parent" data-scope="parent" autohide=".action" position="end" arrow-to=".admin-pages-page-item-actions" relative=".admin-pages-page-item" offset-x="10">
                        <div class="toggle-helper"></div>
                        </dropdown>
                    </div>
                </div>
            </a>
            </div>
        </div>
        </div>

    <?php endforeach; ?>


        <!-- <div class="page-item">
        <div data-is="admin-pages-page-item" class="admin-pages-page-item">
            <div class="flexbe-white-card shadow hoverable ">
            <a class="page-preview-wrap" href="http://lp560722.myflexbe.com/2/">
                <div class="page-preview" style="background-color: #FFF; background-image: url(/img/29893042.jpg)"></div>
                <div class="page-data">
                <div class="page-title"> <span class="flexbe-text "> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </div>
                <div class="page-url" data-is="raw"><span class="domain">lp560722.myflexbe.com</span><span class="uri">/2/</span></div>
                <div data-is="admin-pages-page-item-actions" sprite="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f" class="admin-pages-page-item-actions ">
                    <svg class="flexbe-icon size-18 dots">
                    <use xlink:href="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f#dots"></use>
                    </svg>
                    <dropdown class="dropdown-parent" data-scope="parent" autohide=".action" position="end" arrow-to=".admin-pages-page-item-actions" relative=".admin-pages-page-item" offset-x="10">
                    <div class="toggle-helper"></div>
                    </dropdown>
                </div>
                </div>
            </a>
            </div>
        </div>
        </div>


        <div class="page-item">
        <div data-is="admin-pages-page-item" class="admin-pages-page-item">
            <div class="flexbe-white-card shadow hoverable ">
            <a class="page-preview-wrap" href="http://lp560722.myflexbe.com/page_copy/">
                <div class="page-preview" style="background-color: #FFF; background-image: url(/img/29882994.jpg)"></div>
                <div class="page-data">
                <div class="page-title"> <span class="flexbe-text "> Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </div>
                <div class="page-url" data-is="raw"><span class="domain">lp560722.myflexbe.com</span><span class="uri">/page_copy/</span></div>
                <div data-is="admin-pages-page-item-actions" sprite="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f" class="admin-pages-page-item-actions ">
                    <svg class="flexbe-icon size-18 dots">
                    <use xlink:href="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f#dots"></use>
                    </svg>
                    <dropdown class="dropdown-parent" data-scope="parent" autohide=".action" position="end" arrow-to=".admin-pages-page-item-actions" relative=".admin-pages-page-item" offset-x="10">
                    <div class="toggle-helper"></div>
                    </dropdown>
                </div>
                </div>
            </a>
            </div>
        </div>
        </div>


        <div class="page-item">
        <div data-is="admin-pages-page-item" class="admin-pages-page-item">
            <div class="flexbe-white-card shadow hoverable ">
            <a class="page-preview-wrap" href="http://lp560722.myflexbe.com/spasibo/">
                <div class="page-preview" style="background-color: #FFF; background-image: url(/img/28678098.jpg)"></div>
                <div class="page-data">
                <div class="page-title"> <span class="flexbe-text "> Благодарим за заявку! Франшиза по ремонту и отделке квартир - Ремонт 2.0 </span> </div>
                <div class="page-url" data-is="raw"><span class="domain">lp560722.myflexbe.com</span><span class="uri">/spasibo/</span></div>
                <div data-is="admin-pages-page-item-actions" sprite="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f" class="admin-pages-page-item-actions ">
                    <svg class="flexbe-icon size-18 dots">
                    <use xlink:href="/<?=VERSION?>/admin/resources/images/pages.svg?1c7acb5f#dots"></use>
                    </svg>
                    <dropdown class="dropdown-parent" data-scope="parent" autohide=".action" position="end" arrow-to=".admin-pages-page-item-actions" relative=".admin-pages-page-item" offset-x="10">
                    <div class="toggle-helper"></div>
                    </dropdown>
                </div>
                </div>
            </a>
            </div>
        </div>
        </div> -->


    </div>
    <div class="load-more" ref="more"></div>
    </div>
</div>
</div>