<?php

namespace Noks\Site\API\Controller;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Validation\APISite as VAPISite;
use Noks\Model\Site as MSite;
use Noks\IPDO;
use Throwable;
use Noks\Model\CRMStatusModel;
use Noks\Model\CrmLead as MCrmLead;
use Noks\Model\CRMLeadModel;
use Noks\Enum\StatusCRMLead as EStatusCRMLead;

class Site
{
    use DefaultMethodsAPIResours;
    private $request;

    /**
     * POST
     */
    public function store(string $site_id): void
    {
        try {
            $this->setRequest();
            $this->request['id_site'] = int($site_id);
            $this->request['id_flow'] = getCurrentFlow();
            $this->responseSuccess($this->process_store());
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            $this->responseError([\get_class($e), $code]);
        }
    }

    protected function process_store()
    {
    }


    /**
     * PUT
     */
    public function update(string $site_id): void
    {
        try {
            $this->setRequest2();
            $this->request['id_site'] = int($site_id);
            $this->request['id_flow'] = getCurrentFlow();
            $this->responseSuccess($this->process_update());
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            $this->responseError([\get_class($e), $code]);
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    // TODO разделить методы на классы
    protected function process_update()
    {
        $this->check();
        switch ($this->request['method']) {
            case 'editCodeInsert':
                return $this->editCodeInsert();
            case 'editSiteSeo':
                return $this->editSiteSeo();
            default:
                $this->responseError('unknown method');
        }
    }

    protected function editSiteSeo()
    {
        MSite::update(
            $this->request['id_site'],
            $this->request['id_flow'],
            [
                'title' => $this->request['title']
            ]
        );
        if (MSite::hasErrors()) $this->responseError(MSite::getErrors());

        return true;
    }

    protected function editCodeInsert()
    {
        if ($this->request['code_head'] == '') $this->request['code_head'] = null;
        if ($this->request['code_body'] == '') $this->request['code_body'] = null;

        $data = MSite::update($this->request['id_site'], $this->request['id_flow'], [
            'code_head' => $this->request['code_head'],
            'code_body' => $this->request['code_body'],
        ]);
        if (MSite::hasErrors()) $this->responseError(MSite::getErrors());
        return $data;
    }

    protected function check()
    {
        $err = VAPISite::existMethod($this->request);
        if ($err) $this->responseError($err);
        $err = VAPISite::check($this->request);
        if ($err) $this->responseError($err);
    }
}
