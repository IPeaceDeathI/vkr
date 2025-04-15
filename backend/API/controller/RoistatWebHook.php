<?php

namespace Noks\RESTAPI;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Trait\WriteLog;
use Noks\Validation\Decorator;
use Noks\Model\WebHook as MWebHook;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\WebHook as EWebHook;
use Noks\Enum\StatusWebHook as EStatusWebHook;
use Throwable;

class RoistatWebHook
{
    use DefaultMethodsAPIResours, WriteLog;

    private $request;

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // STORE
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    function store($site_id)
    {
        try {
            $this->setRequest();
            $this->request['site_id'] = $site_id;
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->procces_store());
        } catch (Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function procces_store()
    {
        $this->check_store();
        $this->handleKey();
        if (!$this->validKey()) $this->responseError(['Некорректный ключ']);

        MWebHook::create([
            'hook_source_id' => EWebHook::ROISTAT,
            'hook_entity_id' => $this->request['site_id'],
            'hook_entity_type' => EntityTypeEnum::SITE->v(),
            'hook_key' => $this->request['urlOrKey'],
        ]);
        if (MWebHook::hasErrors()) {
            $err = MWebHook::getErrors();
            $err[] = $this->log($err);
            $this->responseError($err);
        }
        return true;
    }

    private function check_store()
    {
        $validator = new Decorator($this->request, [
            'site_id' => [
                function ($site_id) {
                    if (primaryMatching($site_id)) return true;
                    return 'Не найден сайт';
                }
            ],
            'urlOrKey' => 'required|max:255',
            'status' => [
                'nullable|integer|min:1',
                function ($status) {
                    if (EStatusWebHook::has($status)) return true;
                    return 'Статус не найден';
                }
            ],
        ]);
        $res = $validator->get_result();
        if ($res) $this->responseError($res);
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // UPDATE
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    function update($site_id)
    {
        try {
            $this->setRequest();
            $this->request['site_id'] = $site_id;
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->procces_update());
        } catch (Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function handleKey()
    {
        $this->request['urlOrKey'] = str_replace([
            'https://cloud.roistat.com/integration/webhook?key=',
            'http://cloud.roistat.com/integration/webhook?key='
        ], '', $this->request['urlOrKey']);
    }

    private function procces_update()
    {
        $this->check_update();
        $this->handleKey();
        if (!$this->validKey()) $this->responseError(['Некорректный ключ']);
        $res = MWebHook::getBySourceEntityIdType(EWebHook::ROISTAT, $this->request['site_id'], EntityTypeEnum::SITE->v());
        if (!$res) {
            MWebHook::create([
                'hook_source_id' => EWebHook::ROISTAT,
                'hook_entity_id' => $this->request['site_id'],
                'hook_entity_type' => EntityTypeEnum::SITE->v(),
                'hook_key' => $this->request['urlOrKey'],
                'hook_status' =>  $this->request['status'] ?? EStatusWebHook::ACTIVE,
            ]);
            if (MWebHook::hasErrors()) {
                $err = MWebHook::getErrors();
                $err[] = $this->log($err);
                $this->responseError($err);
            }
        } else {
            MWebHook::updateBySourceEntityIdType(EWebHook::ROISTAT, $this->request['site_id'], EntityTypeEnum::SITE->v(), [
                'hook_key' => $this->request['urlOrKey'],
                'hook_status' =>  $this->request['status'] ?? $res['hook_status'],
            ]);
            if (MWebHook::hasErrors()) {
                $err = MWebHook::getErrors();
                $err[] = $this->log($err);
                $this->responseError($err);
            }
        }
        return true;
    }

    private function validKey(): bool
    {
        return strlen($this->request['urlOrKey']) == 32;
    }

    private function check_update()
    {
        $this->check_store();
    }
}
