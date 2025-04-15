<?php

use Noks\Env;

?>

<div is="flexbe-admin-panel" class="flexbe-panel flexbe-admin-panel admin-ui ">
	<div is="flexbe-panel-project" class="flexbe-panel-project ">
		<div class="project-actions">

			<?php foreach ($menu as $link) { ?>

				<?php
				$isActive = false;
				$search = Env::$_SPLIT[1] . '/';
				if (strpos($link['href'], $search) !== false)
					$isActive = true;
				?>

				<a class="link <?= $isActive ? 'flexbe-button on-dark projects-button' : '' ?>" href="<?= $link['href'] ?>">
					<svg is="flexbe-icon" icon="domain" sprite="/<?= VERSION ?>/admin/resources/images/panel.svg?1c7acb5f" class="flexbe-icon size-18 ">
						<use href="/<?= VERSION ?>/admin/resources/images/panel.svg?1c7acb5f#<?= $link['icon'] ?>"></use>
					</svg><span class="flexbe-text"><?= $link['name'] ?></span></a>

			<?php } ?>

		</div>


		<div class="user-actions">
			<a href="/admin/user/pay/" class="pay-expire warning tooltipstered" data-tip="Оплачено до 11.05.2023">
				Заблокирован
			</a>
			<a class="link pay-btn" href="/admin/user/pay/">
				<span>Оплата</span>
			</a>
			<!-- <div class="link"><span>Помощь</span><em class="support-action-mark">8</em>
				<div is="proxy" class="actions-popup support-popup" data-is="dropdown">
					<div class="toggle-helper"></div>
				</div>
			</div> -->
			<div class="user-info">
				<div class="user-pic">
					<div is="proxy" data-is="user-avatar" class="user-avatar ">
						<div class="user-avatar--symbol font-ui">
							<div class="background" style="background: #FF6646"></div> <span class="symbol">R</span>
						</div>
						<div class="user-avatar--image" style="background-image: url(https://www.gravatar.com/avatar/c05884205acd8de2d56b8eb2b790a110?s=120&amp;d=blank)"></div>
					</div>
				</div>
				<div is="proxy" class="actions-popup user-popup" data-is="dropdown">
					<div class="toggle-helper tooltipstered" data-tip="Ваш профиль"></div>
				</div>
			</div>
		</div>


	</div>
</div>