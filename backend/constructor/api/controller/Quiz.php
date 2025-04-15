<?php

namespace Noks\Constructor\API\Controller;

use Noks\Constructor\API\Trait\DefaultMethodsAPIResoursBlock;
use Noks\Model\Quiz as MQuiz;

class Quiz
{
    use DefaultMethodsAPIResoursBlock;
    private $request;

    /**
     * GET
     */
    function index()
    {
        try {
            $this->setRequest();
            $this->responseSuccess($this->process_index());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function process_index()
    {
        $this->check();
        switch ($this->request['method']) {
            case 'getAllShortQuiz':
                return $this->getAllShortQuiz();
            default:
                $this->responseError(['unknown method']);
        }
    }

    private function getAllShortQuiz()
    {
        $data = MQuiz::getShortByIdFlow(getCurrentFlow());
        if (MQuiz::hasErrors()) $this->responseError(MQuiz::getErrors());
        return $data;
    }
}
