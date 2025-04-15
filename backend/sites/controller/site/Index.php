<?php

namespace Noks\Site\Controller;

use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Site\Component\MenuIndexSite;
use Throwable;
use Noks\Model\Site as MSite;
use Noks\Model\SiteDomain as MSiteDomain;
use Noks\IPDO;

/**
 */
class Index extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    public function __invoke(): void
    {
        try {
            \redirect('/admin/sites/');

            $this->process();
        } catch (Throwable $e) {
            $code = \_writeLog($e);
            Errors::_500();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process(): void
    {
        $sites = MSite::getAllSitesByFlowId(\getCurrentFlow());
        $this->handleSites($sites);
        // ---------------------------------------------------
        // Статистика по сайтам
        $stat = $this->getStatSites(
            \array_column($sites, 'id')
        );
        // ---------------------------------------------------
        foreach ($sites as $site) {
            if (!isset($stat[$site['id']])) continue;
            $stat[$site['id']]['cv'] = \calcCV($stat[$site['id']]['views'], $stat[$site['id']]['cnt_appl']);
        }
        // ---------------------------------------------------
        $this->view(
            $sites,
            $stat
        );
        exit();
    }

    protected function handleSites(array &$sites): void
    {
        if (!$sites) return;

        // добавляем ключ "domains"
        $sites = \array_map(function ($site) {
            $site['domains'] = [];
            return $site;
        }, $sites);

        // перестраиваем массив
        $sites = \array_combine(
            \array_column($sites, 'id'),
            $sites
        );

        // получаем все домена по списку сайтов
        $domains = MSiteDomain::getAllByIdSites(\array_column($sites, 'id'));
        foreach ($domains as $domain) {
            $sites[$domain['id_site']]['domains'][] = $domain;
        }
    }

    /**
     * получить просмотры и заявки по каждому сайту
     */
    protected function getStatSites(array $id_sites): array
    {
        if (!$id_sites) return [];

        $sql = 'SELECT `stat`.id_site, sum(`stat`.views) as views, sum(`stat`.cnt_appl) as cnt_appl FROM (
                SELECT sp.id_site, sp.views, COUNT(cl.lead_id) as cnt_appl FROM sites_pages as sp
                LEFT OUTER JOIN crm_leads as cl
                ON sp.id = cl.lead_id_page
                WHERE sp.id_site in (:id_sites)
                GROUP BY sp.id
            ) `stat`
            GROUP BY `stat`.id_site';

        $res = IPDO::exec($sql, [
            'id_sites' => $id_sites
        ], 2);
        unset($sql);

        if (!$res) return [];

        // перестраиваем массив
        $res = \array_combine(
            \array_column($res, 'id_site'),
            $res
        );

        return $res;
    }

    protected function view(
        $sites,
        $stat
    ): void {
        // компоненты
        $menu_index_site = (new MenuIndexSite)->main();
        // -----------------------------------------------------------
        $title = 'Сайты';
        // -----------------------------------------------------------
        $this->setResource();
        \addCSS(MAIN_URL . '/sites/resource/css/site/index.css');
        // -----------------------------------------------------------
        include VERSION . '/head.php';
        include MAIN_DIR . '/sites/view/site/index.php';
        include VERSION . '/footer.php';
    }
}
