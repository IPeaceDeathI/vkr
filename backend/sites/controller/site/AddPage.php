<?php

namespace Noks\Site\Controller;

use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Model\Site as MSite;
use Throwable;

/**
 * ранее был action_add_page.php
 */
class AddPage extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_site;

    public function __invoke($id_site): void
    {
        try {
            $this->id_site = $id_site;
            $this->process_index();
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            Errors::_500();
        }
    }

    private function process_index()
    {
        // --------------------------------------------------
        $data_site = MSite::getById($this->id_site);
        // --------------------------------------------------
        $this->view(
            $data_site,
        );
        exit();
    }

    private function view(
        $data_site
    ) {
        // компоненты
        $header_site = (new HeaderSite)->main($this->id_site);
        $menu_site = (new MenuSite)->main($this->id_site);
        // -----------------------------------------------------------
        $title = 'Добавить страницу | ' . $data_site['title'];
        // -----------------------------------------------------------
        $this->setResource();
        addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        addCSS(MAIN_URL . '/sites/resource/css/site/site.css');
        addCSS(MAIN_URL . '/sites/resource/css/site/addPage.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/site/addPage.js');
        // -----------------------------------------------------------
        include VERSION . '/head.php';
        include MAIN_DIR . '/sites/view/site/addPage.php';
        include VERSION . '/footer.php';
    }
}
