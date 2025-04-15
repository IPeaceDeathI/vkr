<?php

use Noks\Model\SitePage;
use Noks\Model\PageHash;
use Noks\Error\Errors;
use Noks\Enum\VersionConstructorEnum;

$user_is_admin = userAuthAsAdmin();
if (!userAuth()) redirectHome();
if (!isInt($_GET['id_page'] ?? null)) Errors::_404();
if (!$user_is_admin && !pageMatching(intval($_GET['id_page']))) Errors::_403();


// Загружаем данные страницы
$page = SitePage::getById($_GET['id_page']);
// если активен новый конструктор то редиректим на него
if (VersionConstructorEnum::VERSION_2->itValue($page['version_editor'] ?? -1)) {
    redirect('/constructor_2/edit?site_page_id=' . $page['id']);
}

//collect env params for front 
$env_params['admin'] = $user_is_admin;
$env_params['tester'] = userAuthAsTester();
$env_params['block_creator'] = userAuthAsCreatorBlocks();
$env_params['user_id'] = getCurrentUser();
unset($user_is_admin);

//end collect
$title = 'Редактирование страницы';

// Загружаем последний хеш страницы
$page['page_hash'] = PageHash::getLastByIDPage($page['id']);

$env_params['page_hash_id'] = intval($page['page_hash']['hash_id'] ?? -1);
$env_params = json_encode($env_params);
include 'include_tmp.php';
include 'view/edit.php';
