<?php

namespace Noks\RESTAPI;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Trait\WriteLog;
use Noks\Validation\Decorator;
use Noks\Model\RoistatProxyLead as MRoistatProxyLead;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\StatusRoistatProxyLeadEnum;

class RoistatProxyLead
{
    use DefaultMethodsAPIResours, WriteLog;

    private $request;

    function update($site_id)
    {
        try {
            $this->setRequest();
            $this->request['site_id'] = intval($site_id);
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->procces_update());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function procces_update()
    {
        $this->check_update();
        $current_proxies = MRoistatProxyLead::getInstance()->getByEntityIDType($this->request['site_id'], EntityTypeEnum::SITE->v());
        $current_proxies = \array_combine(
            \array_column($current_proxies, 'proxy_key'),
            $current_proxies
        );

        $err = [];
        $res_tran = MRoistatProxyLead::commitCallBack(function () use (&$current_proxies, &$err) {
            foreach ($this->request['proxylead'] as &$proxylead) {
                unset($current_proxies[$proxylead['key']]);
                MRoistatProxyLead::getInstance()->insertOrUpdateByKeyEntity([
                    'proxy_entity_id' => $this->request['site_id'],
                    'proxy_entity_type' => EntityTypeEnum::SITE->v(),
                    'proxy_key' => $proxylead['key'],
                    'proxy_status' => $proxylead['status'],
                    'proxy_fields' => json_encode($proxylead['inputs']),
                ], strval($proxylead['send_before_lead']));
                if (MRoistatProxyLead::hasErrors()) {
                    $err = MRoistatProxyLead::getErrors();
                    $code = $this->log($err);
                    $err[] = $code;
                    throwException();
                }
            }
            // оставшееся удалить
            if (!$current_proxies) return;
            foreach ($current_proxies as &$proxylead) {
                MRoistatProxyLead::getInstance()->deleteByID($proxylead['proxy_id']);
                if (MRoistatProxyLead::hasErrors()) {
                    $err = MRoistatProxyLead::getErrors();
                    $code = $this->log($err);
                    $err[] = $code;
                    throwException();
                }
            }
        });
        $err = [...$err, ...$res_tran];
        if ($err) $this->responseError($err);

        return true;
    }

    private function check_update()
    {
        $v = new Decorator($this->request, [
            'proxylead' => 'nullable|array',
            'proxylead.*.key' => 'required|max:100|min:10',
            'proxylead.*.status' => 'required|' . StatusRoistatProxyLeadEnum::ruleIN(),
            'proxylead.*.send_before_lead' => 'required|in:0,1',
            'proxylead.*.inputs' => 'required|array|min:1',
            'proxylead.*.inputs.*.crm_input' => 'required|max:100|min:1',
            'proxylead.*.inputs.*.option_input' => 'nullable|max:100',
            'proxylead.*.inputs.*.custom_input' => 'nullable|max:100',
            'proxylead.*.inputs.*.fix_value' => 'nullable|max:200',
        ], null, [
            'proxylead.*.inputs.*.crm_input:required' => 'Поле CRM необходимо заполнить',
            'proxylead.*.key:required' => 'Ключ интеграции необходимо заполнить',
        ], true);
        $err = $v->get_result();
        if ($err) $this->responseError($err);

        $this->request['proxylead'] = $this->request['proxylead'] ?? [];
        $keys = \array_column($this->request['proxylead'], 'key');
        if (\sizeof($keys) !== \sizeof(\array_unique($keys))) $this->responseError(['У вас одинаковые ключи интеграции']);
    }
}
