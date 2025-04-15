<?php

namespace Noks\Site\Controller\Setting;

use Noks\Model\Site;
use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Model\RoistatProxyLead as MRoistatProxyLead;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\TrackingTagEnum;
use Throwable;

class RoiStatProxyLead extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_site;

    function main($id_site)
    {
        try {
            $this->id_site = $id_site;
            $this->process();
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            Errors::_500();
        }
    }

    private function process()
    {
        // -----------------------------------------------------------
        $data_site = Site::getById($this->id_site);
        if (Site::hasErrors()) throwException(Site::getErrors());
        if (!$data_site) throwException('Не получили данные сайта');
        // -----------------------------------------------------------
        $current_proxies = MRoistatProxyLead::getInstance()->getByEntityIDType($this->id_site, EntityTypeEnum::SITE->v());
        $current_proxies = \array_map(function ($item) {
            $item['proxy_fields'] = \json_decode($item['proxy_fields'], true);
            return $item;
        }, $current_proxies);
        // -----------------------------------------------------------
        $this->view(
            $data_site,
            $current_proxies
        );
        exit();
    }

    private function getUTMOption(): array
    {
        return TrackingTagEnum::getLowerValueOnlyUTM();
    }

    private function view(
        $data_site,
        $current_proxies
    ) {
        $utm_items = $this->getUTMOption();
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
        addCSS(MAIN_URL . '/sites/resource/css/setting/site/roistat_proxy_lead.css');
        addCSS(SITE_URL . 'resource/css/smackbar.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/smackbar.js');
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/setting/site/roistat_proxy_lead.js');
        // -----------------------------------------------------------
        $title = 'Передача заявок в CRM через Roistat (проксилид) | ' . $data_site['title'];

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/site/roistat_proxy_lead.php';
        include VERSION . '/footer.php';
    }
}
