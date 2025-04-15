<?php

namespace Noks\Site\Component;

use Noks\Model\Site as MSite;
use Noks\Model\SiteDomain as MSiteDomain;

/**
 * компонент
 */
class HeaderSite
{
    protected int $id_site;

    /**
     * @param int $id_site
     */
    public function main($id_site): string
    {
        try {
            $this->id_site = \intval($id_site);
            return $this->process();
        } catch (\Throwable $e) {
            _writeLog(($e));
            return $this->getViewPlug();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process(): string
    {
        include_once MAIN_DIR . '/sites/functions.php';
        // статистика
        $stat = $this->getStatCacheSite($this->id_site);
        if (!$stat) throwException('getStatCacheSite вернул пустой массив');
        // сайт
        $data_site = MSite::getById($this->id_site);
        if (MSite::hasErrors()) throwException(MSiteDomain::getErrors());
        // домен
        $data_domain = MSiteDomain::getAllByIdSites([$this->id_site]);
        if (MSiteDomain::hasErrors()) throwException(MSiteDomain::getErrors());

        return $this->getView(
            $stat,
            $data_site,
            $data_domain,
        );
    }

    /**
     * получить статистику по сайту, она кешируется
     */
    protected function getStatCacheSite(int $site_id): array
    {
        return fileCache()->getOrSave(
            'getStatCacheSite_' . $site_id,
            function () use ($site_id) {
                // получить страницы
                $pages = getPagesCountAppl($site_id);
                // --------------------------------------------------
                // количество просмотров по всем страницам
                $count_views_all_pages = \array_column($pages, 'views');
                $count_views_all_pages = \array_sum($count_views_all_pages);

                // --------------------------------------------------
                // количество заявок по всем страницам
                $count_appl_all_pages = \array_column($pages, 'cnt_appl');
                $count_appl_all_pages = \array_sum($count_appl_all_pages);
                unset($pages);
                // --------------------------------------------------
                // подсчет конверсии
                $cv = calcCV($count_views_all_pages, $count_appl_all_pages);
                // --------------------------------------------------

                return [
                    'count_views_all_pages' => $count_views_all_pages,
                    'count_appl_all_pages'  => $count_appl_all_pages,
                    'cv'                    => $cv,
                ];
            },
            60
        ) ?? [];
    }

    protected function getView(
        $stat,
        $data_site,
        $data_domain
    ): string {
        return \obStartGetClean(function () use (
            $stat,
            $data_site,
            $data_domain,
        ) {
            include MAIN_DIR . '/sites/view/component/HeaderSite.php';
        });
    }

    /**
     * выводим заглушку если данных для компонента не удалось получить
     */
    protected function getViewPlug(): string
    {
        return \obStartGetClean(function () {
            include MAIN_DIR . '/sites/view/component/HeaderSitePlug.php';
        });
    }
}
