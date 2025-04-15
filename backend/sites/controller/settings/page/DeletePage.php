<?php

namespace Noks\SitePage\Controller\Setting;

use Noks\Model\Site as MSite;
use Noks\Model\SitePage as MSitePage;
use Noks\Site\Component\CardSettingPage;
use Noks\Site\Component\MenuSettingPage;
use Noks\Site\Component\GoToSettingPage;
use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;

class DeletePage extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_site;
    private $id_page;

    function index($id_site, $id_page)
    {
        $this->id_site = $id_site;
        $this->id_page = $id_page;

        try {
            $this->process();
        } catch (\Throwable $e) {
            $code = _writeLog(($e));
            Errors::_500();
        }
    }

    private function process()
    {
        $data_site = MSite::getById($this->id_site);
        if (!$data_site) throwException('Не получили данные сайта');
        if (MSite::hasErrors()) throwException(MSite::getErrors());

        $data_page = MSitePage::getById($this->id_page);
        if (!$data_site) throwException('Не получили данные страницы');
        if (MSitePage::hasErrors()) throwException(MSitePage::getErrors());

        $this->view(
            $data_site,
            $data_page
        );
        exit();
    }

    private function view(
        $data_site,
        $data_page
    ) {
        // компоненты
        $card_setting_page = (new CardSettingPage)->main($this->id_site, $this->id_page);
        $menu_setting_page = (new MenuSettingPage)->main($this->id_site, $this->id_page);
        $go_to_setting_page = (new GoToSettingPage)->main($this->id_site, $this->id_page);
        // -----------------------------------------------------------
        $this->setResource();
        // -----------------------------------------------------------
        addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        addCSS(MAIN_URL . '/sites/resource/css/setting/page/setting.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/setting/page/delete_page.js');
        // -----------------------------------------------------------
        $title = 'Удалить | ' . $data_page['title'] . ' | ' . $data_site['title'];

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/page/delete_page.php';
        include VERSION . '/footer.php';
    }
}
