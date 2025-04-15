<?php

namespace Noks\Site\API\Controller;

// ------------------------------------------------------------------
// Trait
// ------------------------------------------------------------------
use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Trait\WriteLog;

// ------------------------------------------------------------------
// AmoCRM
// ------------------------------------------------------------------
use Noks\AmoCRM\DiffPipeline;
use Noks\AmoCRM\DiffUser;
use Noks\AmoCRM\Client;
use Noks\AmoCRM\Pipeline;
use Noks\AmoCRM\User;

// ------------------------------------------------------------------
// Enum
// ------------------------------------------------------------------
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\CRM;

// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\EntityCRMPipelineUserLinks as MEntityCRMPipelineUserLinks;
use Noks\Model\CRMPipeline as MCRMPipeline;
use Noks\Model\CRMToken as MCRMToken;
use Noks\Model\CRMUser as MCRMUser;

// ------------------------------------------------------------------
// Other
// ------------------------------------------------------------------
use Noks\Validation\APISite as VAPISite;
use AmoCRM\Client\AmoCRMApiClient;
use Throwable;
use Noks\Service\Legacy\Adapter\AdapterAmoCRMOldTokenService;
use Noks\Service\Integration\CRM\AmoCRM\ResultConnect;

class AmoCRM
{
    use DefaultMethodsAPIResours, WriteLog;

    private $request;

    public function destroy($id_site)
    {
        try {
            $this->setRequest();
            $this->request['id_site'] = $id_site;
            $this->request['id_flow'] = getCurrentFlow();
            $this->responseSuccess($this->process_destroy());
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            $this->responseError([get_class($e), $code]);
        }
    }

    /**
     * PUT
     */
    public function update($id_site)
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

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // private destroy
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    private function process_destroy()
    {
        $this->check();
        switch ($this->request['method']) {
            case 'unsetLinkAmoCRM':
                return $this->unsetLinkAmoCRM();
            default:
                $this->responseError(['unknown method']);
        }
    }

    private function unsetLinkAmoCRM()
    {
        MEntityCRMPipelineUserLinks::delete(
            EntityTypeEnum::SITE->v(),
            $this->request['id_site']
        );
        if (MEntityCRMPipelineUserLinks::hasErrors()) $this->responseError(MEntityCRMPipelineUserLinks::getErrors());
        return true;
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // private update
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    private function process_update()
    {
        $this->check();
        switch ($this->request['method']) {
            case 'refreshDataAmoCRM':
                return $this->refreshDataAmoCRM();
            case 'saveSetDataAmoCRM':
                return $this->saveSetDataAmoCRM();
            default:
                $this->responseError(['unknown method']);
        }
    }

    private function initClient(
        int $token_id,
        ResultConnect $result,
    ): AmoCRMApiClient {
        $client = new Client(
            $token_id,
            $result->client_id,
            $result->client_secret,
            $result->redirect_uri,
            $result->access_token,
            $result->refresh_token,
            $result->expires,
            $result->base_domain
        );
        return $client->getClient();
    }

    private function refreshDataAmoCRM()
    {
        $data_crm_token = MCRMToken::getBySourceIdEntityTypeId(CRM::amoCRM, EntityTypeEnum::SITE->v(), $this->request['id_site']);
        if (MCRMToken::hasErrors()) {
            $tmp = MCRMToken::getErrors();
            $tmp[] = $this->log($tmp);
            $this->responseError($tmp);
        }
        if (!$data_crm_token) $this->responseError(['Вы не интегрированы']);
        // ----------------------------------------------
        $diff_seconds = now()->parse($data_crm_token['token_update']);
        $diff_seconds = now()->diff($diff_seconds)->s;
        if ($diff_seconds < (60 * 60)) $this->responseError(['Обновлять данные можно раз в час.']);
        // ----------------------------------------------

        $adapter = new AdapterAmoCRMOldTokenService($data_crm_token);
        $result = $adapter->get();
        // Создаем клиент для получение данны по API AmoCRM
        $client = $this->initClient(
            $data_crm_token['token_id'],
            $result
        );

        // ----------------------------------------------
        $this->refreshPipeline($data_crm_token, $client);
        $this->refreshUser($data_crm_token, $client);
    }

    private function refreshUser(array $data_crm_token, AmoCRMApiClient $client)
    {
        $user = User::getInstance();
        $user->setClient($client);
        $new_user = $user->getUsers();
        if ($user->hasError()) {
            $this->responseError(['Код ошибки: ' . $user->getCodeError()]);
        }

        // получаем старые пользователей
        $old_user = MCRMUser::getByIdToken($data_crm_token['token_id']);
        if (MCRMUser::hasErrors()) {
            $tmp = MCRMUser::getErrors();
            $tmp[] = $this->log($tmp);
            $this->responseError($tmp);
        }
        // сравниваем и обновляем
        if (!DiffUser::getInstance()->diffUsers($new_user, $old_user, $data_crm_token['token_id'])) {
            $this->responseError(['Не удалось обновить пользователей']);
        }
        // обновляем дату update
        MCRMToken::touchById($data_crm_token['token_id']);
        return true;
    }

    private function refreshPipeline(array $data_crm_token, AmoCRMApiClient $client)
    {
        $pipeline = Pipeline::getInstance();
        $pipeline->setClient($client);
        $new_pipeline = $pipeline->getPipelines();
        if ($pipeline->hasError()) {
            $this->responseError(['Код ошибки: ' . $pipeline->getCodeError()]);
        }

        // получаем старые воронки
        $old_pipeline = MCRMPipeline::getByIdToken($data_crm_token['token_id']);
        if (MCRMPipeline::hasErrors()) {
            $tmp = MCRMPipeline::getErrors();
            $tmp[] = $this->log($tmp);
            $this->responseError($tmp);
        }
        // сравниваем и обновляем
        if (!DiffPipeline::getInstance()->diffPipelines($new_pipeline, $old_pipeline, $data_crm_token['token_id'])) {
            $this->responseError(['Не удалось обновить воронки']);
        }
        // обновляем дату update
        MCRMToken::touchById($data_crm_token['token_id']);
        return true;
    }

    private function saveSetDataAmoCRM()
    {
        if (!(isFlowHasSite($this->request['id_site'], $this->request['id_flow']))) $this->responseError(['соответствие']);
        // на всякий случай проверяем наличие в базе
        // -----------------------------------------
        $data_crm_user = MCRMUser::getBySourceId($this->request['crm_user_id']);
        if (!$data_crm_user) $this->responseError(['Такого пользователя нет в базе']);
        // -----------------------------------------
        $data_crm_pipeline = MCRMPipeline::getBySourceId($this->request['pipeline_id']);
        if (!$data_crm_pipeline) $this->responseError(['Такой воронки нет в базе']);
        // -----------------------------------------
        MEntityCRMPipelineUserLinks::create(
            EntityTypeEnum::SITE->v(),
            $this->request['id_site'],
            $this->request['pipeline_id'],
            $this->request['crm_user_id'],
        );
        if (MEntityCRMPipelineUserLinks::hasErrors()) $this->responseError(MEntityCRMPipelineUserLinks::getErrors());
        return true;
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // private General
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    private function check()
    {
        $err = VAPISite::existMethod($this->request);
        if ($err) $this->responseError($err);
        $err = VAPISite::check($this->request);
        if ($err) $this->responseError($err);
    }
}
