<?php

use Noks\Model\ConstructorTemplates;
use Noks\Error\Errors;
use Noks\Rights\Check\Template as RTemplate;

if (!userAuth()) redirectHome();
if (!isInt($_GET['id_tpl'] ?? null)) Errors::_404();
if (!tplMatching(\intval($_GET['id_tpl']))) Errors::_404();
if (!RTemplate::getInstance()->allowed_edit()) needUpTariff();

//collect env params for front 
$env_params['admin'] = userAuthAsAdmin();
$env_params['tester'] = userAuthAsTester();
$env_params['block_creator'] = userAuthAsCreatorBlocks();
$env_params['user_id'] = getCurrentUser();
$env_params['page_hash_id'] = getCurrentUser();
$env_params = \json_encode($env_params);
//end collect
// Загружаем данные шаблона
$tpl = ConstructorTemplates::getById($_GET['id_tpl']);
if (!$tpl) Errors::_404();

include 'include_tmp.php';
include 'view/edit_tpl.php';
