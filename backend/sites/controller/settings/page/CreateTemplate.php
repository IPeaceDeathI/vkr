<?php

namespace Noks\SitePage\Controller\Setting;

use Noks\Model\Site as MSite;
use Noks\Model\SitePage as MSitePage;
use Noks\Site\Component\CardSettingPage;
use Noks\Site\Component\MenuSettingPage;
use Noks\Site\Component\GoToSettingPage;
use Noks\BasicController;
use Noks\CachedModel\ConstructorTemplateCategories as CConstructorTemplateCategories;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Throwable;

class CreateTemplate extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_site;
    private $id_page;

    public function __invoke($id_site, $id_page): void
    {
        $this->id_site = $id_site;
        $this->id_page = $id_page;

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

    protected function process(): void
    {
        $data_site = MSite::getById($this->id_site);
        if (!$data_site) throwException('Не получили данные сайта');
        if (MSite::hasErrors()) throwException(MSite::getErrors());

        $data_page = MSitePage::getById($this->id_page);
        if (!$data_site) throwException('Не получили данные страницы');
        if (MSitePage::hasErrors()) throwException(MSitePage::getErrors());

        $tpl_categories = CConstructorTemplateCategories::getAll();

        $this->view(
            $data_site,
            $data_page,
            $tpl_categories
        );
        exit();
    }

    protected function view(
        $data_site,
        $data_page,
        $tpl_categories
    ): void {
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
        addJS(MAIN_URL . '/sites/resource/js/setting/page/create_template.js');
        // -----------------------------------------------------------
        $title = 'Изменить страницу | ' . $data_page['title'] . ' | ' . $data_site['title'];

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/page/create_template.php';
        include VERSION . '/footer.php';
    }
}
