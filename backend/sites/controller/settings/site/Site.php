<?php

namespace Noks\Site\Controller\Setting;

use Noks\Model\Site as MSite;
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Throwable;

class Site extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    protected $id_site;

    public function main_admin(): void
    {
        $this->__invoke(\getCurSiteID());
    }

    public function __invoke(string|int $site_id): void
    {
        if (!$site_id) $site_id = \getCurSiteID();
        $this->id_site = \int($site_id);

        try {
            $this->process();
        } catch (Throwable $e) {
            \_writeLog($e);
            Errors::_500();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process(): void
    {
        $data_site = MSite::getById($this->id_site);
        if (!$data_site) \throwException('Не получили данные сайта');
        if (MSite::hasErrors()) \throwException(MSite::getErrors());

        $this->view($data_site);
        exit();
    }

    protected function view(array $data_site): void
    {
        // компоненты
        $header_site       = (new HeaderSite)->main($this->id_site);
        $menu_site         = (new MenuSite)->main($this->id_site);
        $menu_setting_site = (new MenuSettingSite)->main($this->id_site);
        // -----------------------------------------------------------
        $this->setResource();
        // -----------------------------------------------------------
        \addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        \addCSS(MAIN_URL . '/sites/resource/css/site/site.css');
        \addCSS(MAIN_URL . '/sites/resource/css/setting/site/setting.css');
        // -----------------------------------------------------------
        \addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        \addJS(MAIN_URL . '/sites/resource/js/setting/site/site.js');
        // -----------------------------------------------------------
        $title = 'Изменить сайт | ' . $data_site['title'];

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/site/site.php';
        include VERSION . '/footer.php';
    }
}
