<?php

namespace Noks\Site\Controller\Setting;

use Noks\Model\Site;
use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Enum\EntityTypeEnum;
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Noks\Model\CRMToken;
use Noks\Model\CRMPipeline;
use Noks\Model\CRMUser;
use Noks\Enum\CRM;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Model\EntityCRMPipelineUserLinks;
use Throwable;



class AmoCRM extends BasicController
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

    protected function createUrl($data_site): string
    {
        $url = 'https://www.amocrm.ru/oauth/?';
        // $url .= '&state=' . uuid7();
        $url .= '&mode=post_message';
        $url .= '&origin=' . \urlencode('https://' . SITE_DOMAIN . '/sites/' . $this->id_site . '/settings/amo_crm');
        $url .= '&name=' . \urlencode(SITE_NAME . ' - Конструктор сайтов ("' . $data_site['title'] . '")');
        $url .= '&description=' . \urlencode('Принимайте заявки прямо с ваших сайтов на ' . SITE_NAME);
        $url .= '&redirect_uri=' . \urlencode('https://' . SITE_DOMAIN . '/services/amocrm?entity_id=' . $this->id_site);
        // $url .= '&redirect_uri=' . urlencode('https://' . SITE_DOMAIN . '/sites/' . $this->id_site . '/settings/amo_crm');
        $url .= '&secrets_uri=' . \urlencode('https://' . SITE_DOMAIN . '/services/amocrm?entity_id=' . $this->id_site);
        $url .= '&logo=https://' . SITE_DOMAIN . '/resource/img/crm/noks_logo.jpg';
        $url .= '&scopes[]=crm';
        $url .= '&scopes[]=notifications';
        return $url;
    }

    protected function process()
    {
        // -----------------------------------------------------------
        $data_site = Site::getById($this->id_site);
        if (Site::hasErrors()) throwException(Site::getErrors());
        if (!$data_site) throwException('Не получили данные сайта');
        // -----------------------------------------------------------
        $links = EntityCRMPipelineUserLinks::getByEntityTypeId(EntityTypeEnum::SITE->v(), $this->id_site);
        // -----------------------------------------------------------
        $url_amo = '';
        $crm_data = [
            'pipelines' => [],
            'users'     => [],
        ];
        $data_crm_token = $this->getTokenAmoCRM();
        if (
            !$data_crm_token ||
            $data_crm_token['token_value'] === null ||
            $data_crm_token['token_value_2'] === null
        ) $url_amo = $this->createUrl($data_site);
        else $crm_data = $this->getDataAmoCRM($data_crm_token);
        // -----------------------------------------------------------
        foreach ($crm_data['pipelines'] as $key => $pipeline) {
            $crm_data['pipelines'][$key]['select'] = false;
            if (isset($links['crm_pipeline_id']) && $links['crm_pipeline_id'] == $pipeline['pipeline_source_id']) {
                $crm_data['pipelines'][$key]['select'] = true;
            }
        }
        // -----------------------------------------------------------
        foreach ($crm_data['users'] as $key => $user) {
            $crm_data['users'][$key]['select'] = false;
            if (isset($links['crm_user_id']) && $links['crm_user_id'] == $user['user_source_id']) {
                $crm_data['users'][$key]['select'] = true;
            }
        }
        // -----------------------------------------------------------
        $unsetBtn = (![...$crm_data['pipelines'], ...$crm_data['users']] ? false : true);
        // -----------------------------------------------------------
        // проверка на ошибки после редиректа с amoCRM
        $err_amo = $this->handleErrorAmoCRM();
        // -----------------------------------------------------------
        $this->view(
            $data_site,
            $url_amo,
            $crm_data,
            $unsetBtn,
            $err_amo
        );
        exit();
    }

    protected function handleErrorAmoCRM(): string
    {
        return session()->pull('tmp_amocrm_error_message', '');
    }

    protected function getDataAmoCRM(array $data_crm_token): array
    {
        return [
            'pipelines' => CRMPipeline::getByIdToken($data_crm_token['token_id']),
            'users' => CRMUser::getByIdToken($data_crm_token['token_id']),
        ];
    }

    protected function getTokenAmoCRM(): array
    {
        return CRMToken::getBySourceIdEntityTypeId(CRM::amoCRM, EntityTypeEnum::SITE->v(), $this->id_site);
    }

    protected function view(
        $data_site,
        $url_amo,
        $crm_data,
        $unsetBtn,
        $err_amo
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
        addCSS(MAIN_URL . '/sites/resource/css/setting/site/amocrm.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/sites/resource/js/setting/site/amocrm.js');
        // -----------------------------------------------------------
        $title = 'amoCRM | ' . $data_site['title'];

        include VERSION . '/head.php';
        require MAIN_DIR . '/sites/view/settings/site/amocrm.php';
        include VERSION . '/footer.php';
    }
}
