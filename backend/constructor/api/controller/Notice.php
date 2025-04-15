<?php

namespace Noks\Constructor\API\Controller;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Trait\WriteLog;
use Noks\Validation\ConstructorAPINotice;
use Noks\Model\UserModel;
use Noks\Service\Telegram\Bot\SendMessageService;

class Notice
{
    use DefaultMethodsAPIResours;
    private $request;

    /**
     * POST
     */
    function store(): void
    {
        try {
            $this->setRequest();
            $this->responseSuccess($this->process_store());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function process_store()
    {
        $this->check();
        switch ($this->request['method']) {
            case 'send':
                return $this->send();
            default:
                $this->responseError(['unknown method']);
        }
    }

    /**
     * TODO переделать на крон
     */
    private function send(): bool
    {
        $this->request['body'] = trim($this->request['body']);
        $this->request['body'] .= PHP_EOL;
        $this->request['body'] .= 'User ID: ' . getCurrentUser();
        $this->request['body'] .= PHP_EOL;
        $this->request['body'] .= 'Flow ID: ' . getCurrentFlow();

        $user = UserModel::self()->getByID(45);
        if (!$user) return false;
        if ($user['user_tlgrm_id'] === null) return false;

        $s = new SendMessageService(TELEGRAM_KEY);
        $s->setChatID($user['user_tlgrm_id']);
        $s->setText($this->request['body']);
        $s->addOption('parse_mode', 'HTML');
        $s->addOption('disable_web_page_preview', false);
        $s->sendAsync();
        return true;
    }

    private function check(): void
    {
        $err = ConstructorAPINotice::existMethod($this->request);
        if ($err) $this->responseError($err);
        $err = ConstructorAPINotice::check($this->request);
        if ($err) $this->responseError($err);
    }
}
