<?php

namespace Noks\Site\Controller;

use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Site\Component\HeaderSite;
use Noks\Model\Site as MSite;
use Noks\Model\SiteDomain as MSiteDomain;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Throwable;

/**
 * ранее был action_domain_site.php
 */
class Domain extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_site;

    public function __invoke($id_site): void
    {
        $this->id_site = $id_site;

        try {
            $this->process_index();
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            Errors::_500();
        }
    }

    private function process_index()
    {
        require MAIN_DIR . '/sites/functions.php';
        // --------------------------------------------------
        $data_site = MSite::getById($this->id_site);
        // ---------------------------------------------------
        $data_domain = MSiteDomain::getAllByIdSites([$this->id_site]);
        // ---------------------------------------------------
        $this->view(
            $data_site,
            $data_domain,
        );
        exit();
    }

    private function view(
        $data_site,
        $data_domain
    ) {
        // компоненты
        $header_site = (new HeaderSite)->main($this->id_site);
        $menu_site = (new MenuSite)->main($this->id_site);
        $menu_setting_site = (new MenuSettingSite)->main($this->id_site);
        // -----------------------------------------------------------
        $title = 'Подключить домен | ' . $data_site['title'];
        // -----------------------------------------------------------
        $this->setResource();
        addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        addCSS(MAIN_URL . '/sites/resource/css/site/site.css');
        addCSS(MAIN_URL . '/sites/resource/css/setting/site/setting.css');
        addCSS(MAIN_URL . '/sites/resource/css/site/domain.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/site/domain.js');
        // -----------------------------------------------------------
        include VERSION . '/head.php';
        include MAIN_DIR . '/sites/view/site/domain.php';
        include VERSION . '/footer.php';
    }
}
