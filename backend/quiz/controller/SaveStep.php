<?php

namespace Noks\Quiz\Controller;

use Noks\Model\QuizResult as MQuizResult;
use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Trait\WriteLog;
use Noks\Validation\Decorator;
use Throwable;

class SaveStep
{
    use DefaultMethodsAPIResours, WriteLog;

    private $request;

    function main()
    {
        try {
            $this->setRequest();
            $this->request['flow_id'] = getCurrentFlow();
            $this->request['user_id'] = getCurrentUser();
            $this->request['session_id'] = $_COOKIE['PHPSESSID'] ?? null;
            $this->responseSuccess($this->process());
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            $this->responseError([\get_class($e), $code]);
        }
    }

    private function process()
    {
        MQuizResult::create([
            'result_approach_hash' => $this->request['result_approach_hash'],
            'result_quiz_id' => $this->request['id_quiz'],
            'result_session_id' => $this->request['session_id'],
            'result_question' => $this->request['quiz_question'],
            'result_answer' => $this->request['quiz_answer'],
        ]);
        if (MQuizResult::hasErrors()) {
            $code = $this->log(MQuizResult::getErrors());
            $this->responseError(['Не удалось отправить результат. Пожалуйста, попробуйте снова, если ошибка возникнет снова, обратитесь в поддрежку', $code]);
        }
        return true;
    }

    private function check()
    {
        $validator = new Decorator($this->request, array(
            'result_approach_hash' => 'required|min:40|max:40',
            'id_quiz' => 'required|integer',
            'session_id' => 'required',
            'quiz_question' => 'required|max:255',
            'quiz_answer' => 'required|max:1000',
        ));
        $err = $validator->get_result();
        if ($err) {
            $err[] = $this->log($err);
            $this->responseError($err);
        }
    }
}
