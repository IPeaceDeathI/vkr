<?php

namespace Noks\Site\Controller;

use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Helper\DateTime as MyDateTime;
use Noks\IPDO;
// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\CRMStatusModel;
use Noks\Model\SitePageModel;
use Noks\Model\Site as MSite;
// ------------------------------------------------------------------
// Service
// ------------------------------------------------------------------
use Inilim\Pagination\Pagination;
use Noks\Service\Rights\ShowLeadService;
use Noks\Service\Site\Application\MaskingContactService;
use Noks\Service\Site\Application\FormationDataForChartService;
// ------------------------------------------------------------------
// Enum
// ------------------------------------------------------------------
use Noks\Enum\StatusCRMLead as StatusCRMLeadModel;
use Noks\Enum\LeadSourceEnum;

/**
 * TODO требует скрупулезного рефакторинга
 */
class Application
{
    use TempAddCSSAddJSForHeadFooter;

    protected int $id_site;
    protected int $current_num_page;
    protected ?int $current_page_id;
    protected bool $page_removed = false;
    protected string $beetween_date_string;

    protected const LIMIT = 5;

    /**
     * @param string $site_id
     */
    public function __invoke($site_id): void
    {
        try {
            $this->id_site = \intval($site_id);
            $this->beetween_date_string = \strval($_GET['period'] ?? '');
            $this->current_num_page = isInt($_GET['page'] ?? null) ? \intval($_GET['page']) : 1;

            $this->current_page_id = isInt($_GET['id_page'] ?? null) ? \intval($_GET['id_page']) : null;
            if ($this->current_page_id === -1) $this->page_removed = true;

            $this->process();
        } catch (\Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function process(): void
    {
        require MAIN_DIR . '/sites/functions.php';
        // Страницы
        $pages = SitePageModel::self()->getPagesCountAppl($this->id_site);
        /**
         * @var int[] $pages_id
         */
        $pages_id = \array_column($pages, 'id');
        // если в гет параметре указан id_page, тогда будем брать заявку у указанной страницы
        $pages_id = $this->current_page_id === null || $this->page_removed ? $pages_id : [$this->current_page_id];
        // --------------------------------------------------
        // фильтр по дате
        $beetween_date = $this->parseDatePeriodAppl($this->beetween_date_string);
        // --------------------------------------------------
        // всего заявок
        $count_appl_by_deleted_pages = $this->getCountLeadByDeletedPage($beetween_date);
        $count_appl = $this->getCountLeadByPageIDs($pages_id, $beetween_date);
        if ($this->page_removed) $count_appl = $count_appl_by_deleted_pages;
        // --------------------------------------------------
        $s = new Pagination;
        // количество доступных страниц
        $max_pages = $s->getCountPage(self::LIMIT, $count_appl);
        // если текущая превышает максимальную допустимую и на оборот
        $this->current_num_page = _int()->clamp($this->current_num_page, 1, $max_pages);
        $offset       = $s->getOffset($this->current_num_page, $max_pages, self::LIMIT);
        $applications = $this->getAllApplByPageIDs($pages_id, self::LIMIT, $offset, $beetween_date);
        $applications = $this->changeDateAppl($applications);
        $applications = $this->handleApplications($applications);
        unset($offset, $pages_id);
        // --------------------------------------------------
        $beetween_date = $this->returnPreviousFormat($beetween_date);
        // --------------------------------------------------
        // фильтр по страницам
        $filter = $this->formationFilterPagesAppl(
            $pages,
            $this->id_site,
            $this->current_page_id,
            $this->beetween_date_string,
            $count_appl_by_deleted_pages
        );
        unset($pages);
        // --------------------------------------------------
        // формирование пагинации
        $pagination = $this->formationPaginationAppl(
            $this->current_num_page,
            $max_pages,
            $this->id_site,
            $this->current_page_id,
            $this->beetween_date_string
        );
        // ---------------------------------------------------
        $data_chart = (new FormationDataForChartService($this->id_site))->get();
        $statuses   = $this->getStatuses();
        $data_site  = MSite::getById($this->id_site);
        // ---------------------------------------------------
        $this->view(
            $data_site,
            $filter,
            $beetween_date,
            $data_chart,
            $applications,
            $pagination,
            $count_appl,
            $statuses
        );
    }

    /**
     * @return int[]
     */
    protected function getAllPageIDBySiteID(int $site_id): array
    {
        $res = SitePageModel::self()->_getByCriteria(
            select_column_name: ['id'],
            where_in: [
                'id_site' => [$site_id],
            ]
        );

        return \array_column($res, 'id');
    }

    /**
     * @param array{start:string,end:string} $beetween_date
     */
    protected function getCountLeadByDeletedPage(array $beetween_date): int
    {
        $page_id = $this->getAllPageIDBySiteID($this->id_site);
        if (!$page_id) return 0;

        // если запрашиваем лиды у которых был удален страница
        $sql = 'SELECT COUNT(*) as cnt FROM crm_leads WHERE lead_id_page not in (:lead_id_page)';

        $values = [
            'lead_id_page' => $page_id,
        ];

        $sql .= ' AND (DATE(lead_date) BETWEEN :start AND :end)';
        $values = \array_merge($values, $beetween_date);

        $res = IPDO::exec($sql, $values, 1);
        return $res['cnt'] ?? 0;
    }

    /**
     * @param int[] $page_id
     * @param array{start:string,end:string} $beetween_date
     */
    protected function getCountLeadByPageIDs(array $page_id, array $beetween_date): int
    {
        if (!$page_id) return 0;

        $values = [];
        // $sql = 'SELECT COUNT(*) as cnt FROM crm_leads WHERE lead_id_page in (:lead_id_page) AND deleted_at is null';
        $sql = 'SELECT COUNT(*) as cnt FROM crm_leads WHERE lead_id_page in (:lead_id_page)';
        $values['lead_id_page'] = $page_id;

        $sql .= ' AND (DATE(lead_date) BETWEEN :start AND :end)';
        $values = \array_merge($values, $beetween_date);

        $res = IPDO::exec($sql, $values, 1);
        return $res['cnt'] ?? 0;
    }

    /**
     * @return array<int,array<string,int|float|string|null>>
     */
    protected function getStatuses(): array
    {
        $statuses = \array_merge(
            CRMStatusModel::self()->getByIDs(StatusCRMLeadModel::self()->getAllStatus()),
            CRMStatusModel::self()->getBySiteID($this->id_site)
        );
        // статусов всегда должно быть минимум 3
        if (\sizeof($statuses) < 3) {
            // TODO не закрывать всю страницу, лучше выдать страницу без лидов с ошибкой
            throwException('getStatusApplication вернул некоректное количество статусов');
        }
        return prepareStatuses($statuses);
    }

    /**
     * возвращаем период в изначальный формат
     *
     * @param array $period
     * @param array{start:string,end:string} $beetween_date
     */
    protected function returnPreviousFormat(array $beetween_date): string
    {
        $pattern = 'Y-m-d';
        $beetween_date['start'] = MyDateTime::getUnix($pattern, $beetween_date['start']);
        $beetween_date['end'] = MyDateTime::getUnix($pattern, $beetween_date['end']);
        $beetween_date = \date('d.m.Y', $beetween_date['start']) . '-' . \date('d.m.Y', $beetween_date['end']);
        return $beetween_date;
    }

    /**
     * парсим параметр period=d.m.Y-20.10.2023
     * получаем формат Y-m-d
     * @return array{start:string,end:string}
     */
    protected function parseDatePeriodAppl(string $period): array
    {
        if (!\preg_match('#[0-9]{2}\.[0-9]{2}\.[0-9]{4}\-[0-9]{2}\.[0-9]{2}\.[0-9]{4}#', $period)) {
            return [
                'start' => \date('Y-m-d', (\time() - (60 * 60 * 24 * 30))),
                'end'   => \date('Y-m-d', \time()),
            ];
        }

        $period = \explode('-', $period);
        $start  = _arr()->head($period);
        $end    = _arr()->last($period);
        unset($period);
        $pattern = 'd.m.Y';
        $start   = MyDateTime::getUnix($pattern, $start);
        $end     = MyDateTime::getUnix($pattern, $end);
        unset($pattern);

        return [
            'start' => \date('Y-m-d', $start),
            'end'   => \date('Y-m-d', $end),
        ];
    }

    /**
     * Получить заявки по указанным страницам
     * @param int[] $page_id
     * @param array{start:string,end:string} $beetween_date
     * @return list<array<string,int|float|string|null>>
     */
    protected function getAllApplByPageIDs(array $page_id, int $limit, int $offset, array $beetween_date): array
    {
        if (!$page_id) return [];

        $values = [];
        if ($this->page_removed) {
            $page_id = $this->getAllPageIDBySiteID($this->id_site);
            if (!$page_id) return [];
            $values['lead_id_page'] = $page_id;
            $sql = 'SELECT * FROM crm_leads WHERE lead_id_page not in (:lead_id_page)';
        } else {
            // $sql = 'SELECT * FROM crm_leads WHERE lead_id_page in (:lead_id_page) AND deleted_at is null';
            $sql = 'SELECT * FROM crm_leads WHERE lead_id_page in (:lead_id_page)';
            $values['lead_id_page'] = $page_id;
        }


        if ($beetween_date) {
            $sql .= ' AND (DATE(lead_date) BETWEEN :start AND :end)';
            $values = \array_merge($values, $beetween_date);
        }

        $sql .= ' ORDER BY lead_date DESC LIMIT :offset,:limit';

        $values['limit'] = $limit;
        $values['offset'] = $offset;

        $res = IPDO::exec($sql, $values, 2);

        return $res;
    }

    /**
     * @param list<array<string,int|float|string|null>> $applications
     * @return list<array<string,bool|int|float|string|null>>
     */
    protected function handleApplications(&$applications): array
    {
        $ss = new ShowLeadService(getCurrentFlow());
        $allowed_show           = $ss->generalShow();
        $allowed_show_quiz_lead = $ss->quizLeadShow();
        $sm = new MaskingContactService;
        foreach ($applications as $key => $appl) {
            $appl['lead_source_entity'] = \intval($appl['lead_source_entity'] ?? -1);
            $appl['lead_phone'] = phone_format(\strval($appl['lead_phone']));
            // прячем контакты
            $is_quiz = LeadSourceEnum::QUIZ->itValue($appl['lead_source_entity']);
            if (!$allowed_show || ($is_quiz && !$allowed_show_quiz_lead)) {
                $appl['lead_phone'] = $sm->phone($appl['lead_phone']);
                $appl['lead_email'] = $sm->email(\strval($appl['lead_email']));
            }

            $applications[$key]['lead_phone'] = $appl['lead_phone'];
            $applications[$key]['lead_email'] = $appl['lead_email'];
            $applications[$key]['page_removed'] = $this->page_removed;
        }
        return $applications;
    }

    /**
     * @param list<array<string,int|float|string|null>> $appls
     * @return list<array<string,int|float|string|null>>
     */
    protected function changeDateAppl(array $appls): array
    {
        $appls = \array_map(
            function ($a) {
                $a['lead_date_unix'] = MyDateTime::getUnix('Y-m-d H:i:s', $a['lead_date']);
                $a['lead_date_view'] = passed_time($a['lead_date_unix']);
                return $a;
            },
            $appls
        );

        return $appls;
    }

    /**
     * взято из интернета
     */
    protected function paginate(int $current, int $max): array
    {
        $prev = $current === 1 ? null : $current - 1;
        $next = $current === $max ? null : $current + 1;
        $items = [1];

        if ($current === 1 && $max === 1) return [
            'current' => $current,
            'prev'    => $prev,
            'next'    => $next,
            'items'   => $items,
        ];
        if ($current > 4) \array_push($items, '...');

        $r = 2;
        $r1 = $current - $r;
        $r2 = $current + $r;

        for ($i = $r1 > 2 ? $r1 : 2; $i <= \min($max, $r2); $i++) \array_push($items, $i);

        if ($r2 + 1 < $max) \array_push($items, '...');
        if ($r2 < $max) \array_push($items, $max);

        return [
            'current' => $current,
            'prev'    => $prev,
            'next'    => $next,
            'items'   => $items,
        ];
    }

    /**
     * формируем пагинацию для страницы "Заявки"
     */
    protected function formationPaginationAppl(int $current_page, int $max_pages, int $site_id, ?int $page_id, string $beetween_date_string): string
    {
        if ($max_pages <= 1) return '';

        $pag = $this->paginate($current_page, $max_pages);

        $arr = [];
        foreach ($pag['items'] as $page) {
            if ($page == '...') {
                $arr[] = '<a class="other">...</a>';
                continue;
            }
            $class = $current_page == $page ? 'current' : 'other';
            $arr[$page] = '<a href="/sites/' . $site_id . '/application?' .
                ($page_id === null ? '' : '&id_page=' . $page_id) .
                '&page=' . $page .
                ($beetween_date_string != '' ? '&period=' . $beetween_date_string : '') .
                '" class="' . $class . '">' . $page . '</a>';
        }

        return \implode(\PHP_EOL, $arr);
    }

    /**
     * @param list<array<string,int|float|string|null>> $pages
     * @return list<array{title:string,url:string,selected:bool}>
     */
    protected function formationFilterPagesAppl(
        array $pages,
        int $site_id,
        ?int $page_id,
        string $beetween_date_string,
        int $count_appl_by_deleted_pages
    ): array {
        if ($beetween_date_string != '') {
            $beetween_date_string = '&period=' . $beetween_date_string;
        }

        $pages = \array_combine(
            \array_column($pages, 'id'),
            $pages
        );

        $all_cnt_appl = \array_column($pages, 'cnt_appl');
        $all_cnt_appl = \array_sum($all_cnt_appl);

        $main_page_id = \array_filter($pages, function ($page) {
            return $page['uri'] == '';
        });

        $main_page_id = _arr()->head($main_page_id);

        unset($pages[$main_page_id['id']]);

        $filter = [];

        $filter[] = [
            'title' => 'Все страницы | ' . $all_cnt_appl,
            'url' => '/sites/' . $site_id . '/application' . ($beetween_date_string == '' ? '' : '?' . \ltrim($beetween_date_string, '&')),
            'selected' => $page_id === null ? true : false,
        ];

        $filter[] = [
            'title' => 'Главная | ' . $main_page_id['title'] . ' | ' . $main_page_id['cnt_appl'],
            'url' => '/sites/' . $site_id . '/application?id_page=' . $main_page_id['id'] . $beetween_date_string,
            'selected' => $page_id == $main_page_id['id'] ? true : false,
        ];

        foreach ($pages as $page) {
            $filter[] = [
                'title' => '/' . $page['uri'] . ' | ' . $page['title'] . ' | ' . $page['cnt_appl'],
                'url' => '/sites/' . $site_id . '/application?id_page=' . $page['id'] . $beetween_date_string,
                'selected' => $page_id == $page['id'] ? true : false,
            ];
        }

        $filter[] = [
            'title' => 'Удаленные страницы | ' . $count_appl_by_deleted_pages,
            'url' => '/sites/' . $site_id . '/application?id_page=-1' . $beetween_date_string,
            'selected' => $page_id == -1 ? true : false,
        ];

        return $filter;
    }

    protected function view(
        $data_site,
        $filter,
        $beetween_date,
        $data_chart,
        $applications,
        $pagination,
        $count_appl,
        $statuses
    ): void {
        // компоненты
        $header_site = (new HeaderSite)->main($this->id_site);
        $menu_site   = (new MenuSite)->main($this->id_site);
        // -----------------------------------------------------------
        $title = 'Заявки | ' . $data_site['title'];
        // -----------------------------------------------------------
        $this->setResource();
        addCSS(MAIN_URL . '/sites/resource/css/site/site.css');
        addCSS(MAIN_URL . '/sites/resource/css/site/application.css');
        addCSS('https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css');
        // -----------------------------------------------------------
        addJS(MAIN_URL . '/script/Chart.min.js');
        addJS('https://cdn.jsdelivr.net/momentjs/latest/moment.min.js');
        addJS('https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js');
        addJS(MAIN_URL . '/sites/resource/js/site/application.js');
        // -----------------------------------------------------------
        include VERSION . '/head.php';
        include MAIN_DIR . '/sites/view/site/application.php';
        include VERSION . '/footer.php';
        exit();
    }
}
