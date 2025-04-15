<?php

namespace Noks\Site\API\Controller;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Trait\WriteLog;
use Noks\Validation\APISite as VAPISite;
use Noks\Model\Site;
use Noks\Model\SiteDomain as MSiteDomain;

/**
 * TODO перевести на нормальный API
 */
class Domain
{
    use DefaultMethodsAPIResours, WriteLog;
    private $request;

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // UPDATE
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    public function update(string $id_site): void
    {
        try {
            $this->setRequest();
            $this->request['id_site'] = \int($id_site);
            $this->request['id_flow'] = \getCurrentFlow();
            $this->responseSuccess($this->process_update());
        } catch (\Throwable $e) {
            $code = \_writeLog(($e));
            $this->responseError([\get_class($e), $code]);
        }
    }

    protected function process_update()
    {
        $this->check();
        switch ($this->request['method']) {
            case 'changeStatusDomain':
                return $this->changeStatusDomain();
            default:
                $this->responseError(['unknown method']);
        }
    }

    protected function changeStatusDomain()
    {
        $data_site = Site::getByIdFlowAndId($this->request['id_flow'], $this->request['id_site']);
        if (Site::hasErrors()) $this->responseError(Site::getErrors());
        if (!$data_site) $this->responseError(['Сайт в проекте не найден']);

        $data = MSiteDomain::update(
            $this->request['id_site'],
            $this->request['id_domain'],
            [
                'status' => $this->request['status']
            ]
        );
        if (MSiteDomain::hasErrors()) $this->responseError(MSiteDomain::getErrors());
        return $data;
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // other
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    protected function check(): void
    {
        $err = VAPISite::existMethod($this->request);
        if ($err) $this->responseError($err);
        $err = VAPISite::check($this->request);
        if ($err) $this->responseError($err);
    }
}
