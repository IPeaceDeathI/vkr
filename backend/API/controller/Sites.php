<?php

namespace Noks\RESTAPI;

use Noks\Trait\DefaultMethodsAPIResours;
// ------------------------------------------------------------------
// Service
// ------------------------------------------------------------------
use Noks\Service\DeletingRelatedEntities\DeleteSiteService;
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\Site as MSite;

class Sites
{
    use DefaultMethodsAPIResours;

    private array $request;

    public function index(?string $site_id = null): void
    {
        try {
            $this->setRequest();
            $this->request['site_id'] = $site_id;
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->process_index());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function process_index(): array
    {
        if (!isset($this->request['site_id'])) {
            $sites = MSite::getAllSitesByFlowIdJOINDomain($this->request['flow_id']);
        } else {
            if (!siteMatching($this->request['site_id'])) return [];
            $sites = MSite::getByIdFlowAndIdJOINDomain($this->request['flow_id'], $this->request['site_id']);
            if ($sites) $sites = [$sites];
        }

        return $sites;
    }

    public function delete(string $site_id): void
    {
        try {
            $this->setRequest();
            $this->request['site_id'] = \int($site_id);
            $this->request['flow_id'] = \getCurrentFlow();
            $this->responseSuccess($this->procces_delete());
        } catch (\Throwable $e) {
            $code = \_writeLog($e);
            $this->responseError([\get_class($e), $code]);
        }
    }

    private function procces_delete(): bool
    {
        if (!\siteMatching($this->request['site_id'])) $this->responseError('Сайт не найден');

        $s = new DeleteSiteService;
        $status = $s->deleteTransaction($this->request['site_id']);
        if (!$status) $this->responseError($s->getErrors());
        return true;
    }
}
