<!-- @left_menu_render start -->
<div class="menu-navigation">

	<?php foreach ($left_buttons as $opt) : ?>
		<a href="<?= $opt['href'] ?>" 
			class="button-nav <?= ($nameModule == $opt['chapter'] ? 'active' : '') ?> main <?=(1)?>" 
			title="<?= $opt['name'] ?>">
			<?php 
				if($opt['svg']){
					echo '<div class="svg-button-nav"><svg icon="panel" class="flexbe-icon size-24"><use href="/constructor2/admin/src/assets/images/panel.svg#'.$opt['svg'].'"></use></svg></div>';
				} else
					echo '<div id="" class="image-button-nav '.$opt['img'].'"></div>';
			?>
			<!-- <div id="" class="image-button-nav <?= $opt['img'] ?>"></div> -->
			<div class="name-button-nav"><?= $opt['name'] ?></div>
		</a>
	<?php endforeach; ?>

	<!-- <a href="/profile" class="button-nav <?= ($nameModule == 'profile' ? 'on' : '') ?> main" title="Аккаунт">
		<div class="svg-button-nav">
			<svg icon="panel" class="flexbe-icon size-24">
				<use href="/constructor2/admin/src/assets/images/panel.svg#logo"></use>
			</svg>
		</div>
		<div class="name-button-nav">Аккаунт</div>
	</a> -->
</div>
<!-- left_menu end -->