<?php

use Noks\Service\Twig\Main\Account\HeaderService;
// этот файл подключается в v****\head.php
// ------------------------------------------------
$s = new HeaderService;
$nameModule = getNameModule();
// ------------------------------------------------
// top menu верхнее меню
include MAIN_DIR . '/modules/header/view/top_menu.php';
// ------------------------------------------------
// left menu Левое меню
$left_buttons = $s->getLeftMenu();
include MAIN_DIR . '/modules/header/view/left_menu.php';
// ------------------------------------------------
// overlay menu Всплывающее меню
$left_buttons = $s->getLeftMenuOverlay();
include MAIN_DIR . '/modules/header/view/left_menu_overlay.php';
// ------------------------------------------------
// overlay profile Всплывающее меню профиля "Выход, Профиль"
$header_links = $s->getProfileMenuOverlay();
include MAIN_DIR . '/modules/header/view/profile_menu_overlay.php';
