<?php

// TODO на удаление! превью теперь у нас это поддомен с uri

use Noks\Model\SitePage as MSitePage;
use Noks\Model\Site as MSite;
use Noks\Model\PageHash as MPageHash;
use Noks\Error\Errors;
use Noks\Trait\ConstructorUserViews;

if (!userAuth())
    redirectHome();
if (!isInt($_GET['id_page'] ?? null))
    Errors::_404();
if (!userAuthAsAdmin() && !pageMatching(intval($_GET['id_page'])))
    Errors::_403();

$id_flow = getCurrentFlow();
// Загружаем данные страницы
$page = MSitePage::getById($_GET['id_page']);
// Загружаем последний хеш страницы
$page['page_hash'] = MPageHash::getLastByIDPage($page['id']);
$page['data_site'] = MSite::getById($page['id_site']);

(new class
{
    use ConstructorUserViews {
        setResource as public;
    }
})->setResource(SITE_URL);

include 'view/page.php';
