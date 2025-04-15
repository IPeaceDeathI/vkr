<?php

namespace Noks\RESTAPI;

use Noks\Trait\DefaultMethodsAPIResours;
// ------------------------------------------------------------------
// Service
// ------------------------------------------------------------------
use Noks\Service\DeletingRelatedEntities\DeleteQuizService;
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\Quiz as MQuiz;

class Quiz
{
    use DefaultMethodsAPIResours;

    private array $request;

    public function delete(string $quiz_id): void
    {
        try {
            $this->setRequest();
            $this->request['quiz_id'] = intval($quiz_id);
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->procces_delete());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function procces_delete(): bool
    {
        if (!MQuiz::existByIdFlowId($this->request['quiz_id'], $this->request['flow_id'])) {
            $this->responseError('Квиз не найден');
        }

        $s = new DeleteQuizService;
        $status = $s->deleteTransaction($this->request['quiz_id']);
        if (!$status) $this->responseError($s->getErrors());
        return true;
    }
}
