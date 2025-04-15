<?php

namespace Noks\Site\Controller\Setting;

use Noks\Model\Site;
use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Model\WebHook as MWebHook;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\WebHook as EWebHook;
use Throwable;



class RoiStatWebHook extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    protected $id_site;

    public function __invoke($id_site): void
    {
        try {
            $this->id_site = $id_site;
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
        // -----------------------------------------------------------
        $data_site = Site::getById($this->id_site);
        if (Site::hasErrors()) throwException(Site::getErrors());
        if (!$data_site) throwException('Не получили данные сайта');
        // -----------------------------------------------------------
        $data_hook = MWebHook::getBySourceEntityIdType(EWebHook::ROISTAT, $this->id_site, EntityTypeEnum::SITE->v());
        // -----------------------------------------------------------
        $this->view(
            $data_site,
            $data_hook
        );
        exit();
    }

    protected function view(
        $data_site,
        $data_hook
    ): void {
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
        addCSS(MAIN_URL . '/sites/resource/css/setting/site/roistat_webhook.css');
        addCSS(SITE_URL . 'resource/css/smackbar.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/smackbar.js');
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/setting/site/roistat_webhook.js');
        // -----------------------------------------------------------
        $title = 'Roistat (Webhook) | ' . $data_site['title'];

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/site/roistat_webhook.php';
        include VERSION . '/footer.php';
    }
}
