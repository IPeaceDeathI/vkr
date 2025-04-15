<?php

namespace Noks\SitePage\Controller\Setting;

use Noks\Model\Site as MSite;
use Noks\Model\SitePage as MSitePage;
use Noks\Model\PageHash as MPageHash;
use Noks\Site\Component\CardSettingPage;
use Noks\Site\Component\MenuSettingPage;
use Noks\Site\Component\GoToSettingPage;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Helper\DateTime as MyDateTime;

class ControleVersionPage
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_site;
    private $id_page;

    public function index($id_site, $id_page)
    {
        $this->id_site = $id_site;
        $this->id_page = $id_page;

        try {
            $this->process();
        } catch (\Throwable $e) {
            _writeLog(($e));
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

        $data_hash = MPageHash::getAllByIdPage($this->id_page, ['hash_id', 'hash_date'], MPageHash::DESC);
        $data_hash = $this->handleHash($data_hash);

        $current = MPageHash::getLastByIDPage($this->id_page);

        $this->view(
            $data_site,
            $data_page,
            $data_hash,
            $current
        );
        exit();
    }

    private function handleHash(array $data): array
    {
        return \array_map(function ($item) {
            $item['date'] = MyDateTime::timestampToUnix($item['hash_date']);
            $item['date'] = \date('d.m.Y', $item['date']);
            return $item;
        }, $data);
    }

    private function view(
        $data_site,
        $data_page,
        $data_hash,
        $current
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
        addCSS(SITE_URL . 'resource/css/smackbar.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/smackbar.js');
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/setting/page/controle_version_page.js');
        // -----------------------------------------------------------
        $title = 'Контроль версий | ' . $data_page['title'] . ' | ' . $data_site['title'];

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/page/controle_version_page.php';
        include VERSION . '/footer.php';
    }
}
