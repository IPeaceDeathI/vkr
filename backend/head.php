<?php

use Noks\Env;

if (!isset($title)) {
	\_writeLog('не найден var $title');
}

addCSS(SITE_URL . 'style/fonts/OpenSans/stylesheet.css');
$canonical = '<link rel="canonical" href="' . rtrim(SITE_URL, '/') . explode('?', $_SERVER['REQUEST_URI'])[0] . (isset($_GET['s']) ? '?s=' . $_GET['s'] : '') . '">' . PHP_EOL;
// ------------------------------------------------------------------
$site_id = '';
if (isset($_GET['id_site'])) {
	$site_id = $_GET['id_site'];
} elseif (isset($this) && (isset($this->id_site) || isset($this->site_id))) {
	$site_id = $this->id_site ?? $this->site_id ?? '';
}
// ------------------------------------------------------------------
$site_page_id = '';
if (isset($_GET['id_page'])) {
	$site_page_id =  $_GET['id_page'];
} elseif (isset($this) && (isset($this->id_page) || isset($this->page_id))) {
	$site_page_id = $this->id_page ?? $this->page_id ?? '';
}
?>
<!DOCTYPE html>
<html lang="ru">

<head>
	<?= $canonical ?>
	<link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
	<meta http-equiv=Content-Type content="text/html;charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<title><?= $title ?? '' ?> | <?= SITE_NAME ?></title>
	<meta name="description" content="<?= $description ?? '' ?>">
	<meta name="id-site" content="<?= $site_id ?>">
	<meta name="id-page" content="<?= $site_page_id ?>">
	<meta name="id-flow" content="<?= getCurrentFlow() ?>">
	<meta name="theme-color" content="#0c2556">

	<link href="/constructor2/admin/src/assets/fonts/allFonts.css?1c7acb5f" media="all" rel="stylesheet" type="text/css">
	<?= Env::$params['links_css'] ?>
</head>

<body>

	<?php

	include VERSION . '/modules/header/header.php';
	?>
	<!-- content start -->