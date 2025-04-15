<?php

namespace Noks\SitePage\Controller\Setting;

use Noks\Model\SitePage as MSitePage;
use Noks\Model\Site as MSite;
use Noks\Model\PageHash as MPageHash;
use Noks\Error\Errors;
use Noks\Trait\ConstructorUserViews;

class Version
{
    use ConstructorUserViews;

    private $id_site;
    private $id_page;
    private $hash_id;

    function index($id_site, $id_page, $hash_id)
    {
        try {
            $this->id_site = intval($id_site);
            $this->id_page = intval($id_page);
            $this->hash_id = intval($hash_id);
            $this->process();
        } catch (\Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    private function process()
    {
        // Загружаем данные страницы
        $page = MSitePage::getById($this->id_page);
        // Загружаем последний хеш страницы
        $page['page_hash'] = MPageHash::getByIDPageID($this->hash_id, $this->id_page);
        $page['data_site'] = MSite::getById($this->id_site);
        $this->view($page);
        exit();
    }

    private function view($page)
    {
        $this->setResource(SITE_URL);
        // взято из v0020\constructor\view\page.php
        include MAIN_DIR . '/sites/view/settings/page/page_hash.php';
    }
}
