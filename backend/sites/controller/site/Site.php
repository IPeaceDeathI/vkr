<?php

namespace Noks\Site\Controller;

use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Trait\Tmp\genereteUrlEditor;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\HeaderSite;
// ------------------------------------------------------------------
// Service
// ------------------------------------------------------------------
use Noks\Service\Site\SiteSubDomainService;
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\SiteModel;

/**
 * ранее был action_one_site.php
 */
class Site
{
    use TempAddCSSAddJSForHeadFooter, genereteUrlEditor;

    protected int $id_site;

    public function __invoke(string $id_site): void
    {
        try {
            $this->id_site = \intval($id_site);
            $this->process();
        } catch (\Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process(): void
    {
        require MAIN_DIR . '/sites/functions.php';
        // --------------------------------------------------
        $data_site = SiteModel::self()->getByID($this->id_site);
        // --------------------------------------------------
        $s = new SiteSubDomainService($this->id_site);
        $s->create();
        $sub_domain = $s->getInstalledSubDomain();
        // --------------------------------------------------
        //  получить страницы
        $pages = getPagesCountAppl($this->id_site);
        $pages = \array_map(fn ($page) => $this->genereteUrlEditor($page, $sub_domain), $pages);
        // --------------------------------------------------
        $this->view(
            $data_site,
            $pages
        );
        exit();
    }

    protected function view(
        $data_site,
        $pages
    ) {
        // компоненты
        $header_site = (new HeaderSite)->main($this->id_site);
        $menu_site   = (new MenuSite)->main($this->id_site);
        // -----------------------------------------------------------
        $title = $data_site['title'];
        // -----------------------------------------------------------
        $this->setResource();
        addCSS(MAIN_URL . '/sites/resource/css/site/site.css');
        // -----------------------------------------------------------
        include VERSION . '/head.php';
        // шаблон
        include MAIN_DIR . '/sites/view/site/site.php';
        include VERSION . '/footer.php';
    }
}
