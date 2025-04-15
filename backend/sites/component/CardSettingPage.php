<?php

namespace Noks\Site\Component;

use Noks\Model\Site as MSite;
use Noks\Model\SitePage as MSitePage;
use Noks\Model\CrmLead as MCrmLead;
use Noks\Trait\Tmp\genereteUrlEditor;
use Noks\Service\Site\SiteSubDomainService;

/**
 * компонент
 */
class CardSettingPage
{
    use genereteUrlEditor;

    private $id_site;
    private $id_page;
    private SiteSubDomainService $sub_domain_service;

    public function main(int $id_site, int $id_page): string
    {
        try {
            $this->id_site = $id_site;
            $this->id_page = $id_page;
            $this->sub_domain_service = new SiteSubDomainService($this->id_site);
            return $this->process();
        } catch (\Throwable $e) {
            _writeLog(($e));
            return '';
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process(): string
    {
        $sub_domain = $this->sub_domain_service->getInstalledSubDomain();
        // ------------------------------------------------------------------
        $data_site = MSite::getById($this->id_site);
        if (!$data_site) throwException('Не получили данные сайта');
        if (MSite::hasErrors()) throwException(MSite::getErrors());

        $data_page = MSitePage::getById($this->id_page);
        if (!$data_site) throwException('Не получили данные страницы');
        if (MSitePage::hasErrors()) throwException(MSitePage::getErrors());
        $data_page = $this->genereteUrlEditor($data_page, $sub_domain);

        $cnt_appl = MCrmLead::getCountLeadByIdPages([$data_page['id']]);

        return $this->getView(
            $data_site,
            $data_page,
            $cnt_appl
        );
    }

    protected function getView(
        $data_site,
        $data_page,
        $cnt_appl
    ): string {
        return \obStartGetClean(function () use (
            $data_site,
            $data_page,
            $cnt_appl,
        ) {
            include MAIN_DIR . '/sites/view/component/CardSettingPage.php';
        });
    }
}
