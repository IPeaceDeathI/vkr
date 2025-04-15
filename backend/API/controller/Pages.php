<?php

namespace Noks\RESTAPI;

use Noks\Trait\DefaultMethodsAPIResours;
// ------------------------------------------------------------------
// Service
// ------------------------------------------------------------------
use Noks\Service\DeletingRelatedEntities\DeleteSitePageService;
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\Site as MSite;
use Noks\Model\SitePage as MSitePage;


class Pages
{
    use DefaultMethodsAPIResours;

    private array $request;

    public function site_index(string $site_id, ?string $page_id = null): void
    {
        try {
            $this->setRequest();
            $this->request['site_id'] = intval($site_id);
            $this->request['page_id'] = $page_id;
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->process_site_index());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function process_site_index(): array
    {
        if (!isset($this->request['page_id'])) {
            if (!siteMatching($this->request['site_id'])) return [];
            $pages = MSitePage::getByIdSite($this->request['site_id']);
        } else {
            if (!pageMatching($this->request['page_id'])) return [];
            $pages = MSitePage::getById($this->request['page_id']);
            if ($pages) $pages = [$pages];
        }
        return $pages;
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // blabla
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    public function index(?string $page_id = null): void
    {
        try {
            $this->setRequest();
            $this->request['page_id'] = $page_id;
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->process_index());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function process_index(): array
    {
        if (!isset($this->request['page_id'])) {
            $sites = MSite::getAllSitesByFlowId($this->request['flow_id']);
            if (!$sites) return [];
            $sites = \array_column($sites, 'id');
            $pages = MSitePage::getAllPagesByIdSite($sites);
        } else {
            if (!pageMatching($this->request['page_id'])) return [];
            $pages = MSitePage::getById($this->request['page_id']);
            if ($pages) $pages = [$pages];
        }

        return $pages;
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // DELETE
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    public function delete(string $page_id): void
    {
        try {
            $this->setRequest();
            $this->request['page_id'] = intval($page_id);
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->procces_delete());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function procces_delete(): bool
    {
        if (!pageMatching($this->request['page_id'])) $this->responseError('Страница не найден');

        $data_page = MSitePage::getById($this->request['page_id']);
        $this->request['site_id'] = $data_page['id_site'];
        if (!$data_page) {
            $this->responseError('Страница не найден');
        }
        if (($data_page['uri'] ?? '') == '') {
            $this->responseError('Нельзя удалить главную страницу');
        }
        unset($data_page);
        if (!MSite::existByIdFlowId($this->request['site_id'], $this->request['flow_id'])) {
            $this->responseError('Сайт не найден');
        }

        // return true;
        $s = new DeleteSitePageService;
        $status = $s->deleteTransaction($this->request['page_id']);
        if (!$status) $this->responseError($s->getErrors());
        return true;
    }
}
