<?php

namespace Noks\Site\Controller\Setting;

use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;

class DeleteSite
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_site;

    function main($id_site)
    {
        $this->id_site = $id_site;

        try {
            $this->process();
        } catch (\Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    private function process()
    {
        $this->view();
        exit();
    }

    private function view()
    {
        // компоненты
        $header_site       = (new HeaderSite)->main($this->id_site);
        $menu_site         = (new MenuSite)->main($this->id_site);
        $menu_setting_site = (new MenuSettingSite)->main($this->id_site);
        // -----------------------------------------------------------
        $this->setResource();
        // -----------------------------------------------------------
        addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        addCSS(MAIN_URL . '/sites/resource/css/site/site.css');
        addCSS(MAIN_URL . '/sites/resource/css/setting/site/setting.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/setting/site/delete_site.js');
        // -----------------------------------------------------------
        $title = 'Удалить | Изменить сайт';

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/site/delete_site.php';
        include VERSION . '/footer.php';
    }
}
