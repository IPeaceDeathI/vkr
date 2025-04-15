<?php

namespace Noks\Site\Controller\Setting;

use Noks\Model\Site;
use Noks\BasicController;
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Throwable;

class CodeInsert extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    protected $id_site;

    public function __invoke($id_site): void
    {
        $this->id_site = $id_site;

        try {
            $this->process();
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            Errors::_500();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process()
    {
        $data_site = Site::getById($this->id_site);
        if (!$data_site) throwException('Не получили данные сайта');
        if (Site::hasErrors()) throwException(Site::getErrors());
        // -----------------------------------------------------------
        $this->view(
            $data_site
        );
        exit();
    }

    protected function view(
        $data_site
    ) {
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
        addCSS(MAIN_URL . '/sites/resource/css/setting/site/code_insert.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/setting/site/code_insert.js');
        // -----------------------------------------------------------
        $title = 'Метрика | Изменить сайт';

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/site/code_insert.php';
        include VERSION . '/footer.php';
    }
}
