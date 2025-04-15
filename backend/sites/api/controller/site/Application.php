<?php

namespace Noks\Site\API\Controller;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Trait\WriteLog;
use Noks\Validation\APISite as VAPISite;
use Noks\Model\CrmLead;
use Throwable;

class Application
{
    use DefaultMethodsAPIResours, WriteLog;
    private $request;

    /**
     * PUT
     */
    function update($id_site)
    {
        try {
            $this->setRequest();
            $this->request['id_site'] = $id_site;
            $this->request['id_flow'] = getCurrentFlow();
            $this->responseSuccess($this->process_update());
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            $this->responseError([get_class($e), $code]);
        }
    }

    private function process_update()
    {
        $this->check();
        switch ($this->request['method']) {
            case 'changeStatusLead':
                return $this->changeStatusLead();
            default:
                $this->responseError(['unknown method']);
        }
    }

    private function check()
    {
        $err = VAPISite::existMethod($this->request);
        if ($err) $this->responseError($err);
        $err = VAPISite::check($this->request);
        if ($err) $this->responseError($err);
    }

    private function changeStatusLead()
    {
        CrmLead::changeStatusApplPage($this->request['id_page'], $this->request['id_appl'], $this->request['id_status']);
        if (CrmLead::hasErrors()) $this->responseError(CrmLead::getErrors());
        return true;
    }
}
