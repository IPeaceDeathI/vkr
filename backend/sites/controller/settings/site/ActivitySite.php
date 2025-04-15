<?php

namespace Noks\Site\Controller\Setting;

use Noks\Model\SiteSettings as MSiteSettings;
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Throwable;

class ActivitySite
{
    use TempAddCSSAddJSForHeadFooter;

    protected int $id_site;

    public function __invoke(string $id_site): void
    {
        $this->id_site = intval($id_site);

        try {
            $this->process();
        } catch (Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process(): void
    {
        $settings = MSiteSettings::getBySiteID($this->id_site);
        if ($settings && _json()->isJSON($settings['sett_settings'])) {
            $settings['sett_settings'] = \json_decode($settings['sett_settings'], true);
        }
        // -----------------------------------------------------------
        $this->view(
            $settings
        );
        exit();
    }

    protected function view(
        $settings
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
        addCSS(SITE_URL . 'resource/css/smackbar.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/smackbar.js');
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/setting/site/activity.js');
        // -----------------------------------------------------------
        $title = 'Activity | Изменить сайт';

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/site/activity.php';
        include VERSION . '/footer.php';
    }
}
