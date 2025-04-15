<?php

namespace Noks\RESTAPI;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Trait\WriteLog;
use Noks\Validation\Decorator;
use Noks\Model\SiteSettings as MSiteSettings;

class SiteSettings
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

    function activity($site_id)
    {
        try {
            $this->setRequest();
            $this->request['site_id'] = intval($site_id);
            $this->request['flow_id'] = getCurrentFlow();
            $this->request['user_id'] = getCurrentUser();
            $this->responseSuccess($this->procces_activity());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function check_activity()
    {
        if (!siteMatching($this->request['site_id'])) $this->responseError(['Сайт не найден']);
        $v = new Decorator($this->request, [
            'active' => 'required|integer|in:0,1',
            'loop' => 'nullable|integer|in:0,1',
            'need' => 'nullable|integer',
            'checkTime' => 'nullable|integer',
            'target_name' => 'nullable|min:3|max:40',
        ]);
        $res = $v->get_result();
        if ($res) $this->responseError($res);
    }

    private function handleActivity(): array
    {
        return [
            'active' => (bool) $this->request['active'],
            'loop' =>               !isInt($this->request['loop']) ? null : (bool) $this->request['loop'],
            'need' =>               !isInt($this->request['need']) ? null : (int) $this->request['need'],
            'checkTime' =>     !isInt($this->request['checkTime']) ? null : (int) $this->request['checkTime'],
            'target_name' =>   $this->request['target_name'] == '' ? null : (string) $this->request['target_name'],
        ];
    }

    private function procces_activity()
    {
        $this->check_activity();
        $activity = $this->handleActivity();
        $settings = MSiteSettings::getBySiteID($this->request['site_id']);
        if (!$settings) {
            // создаем
            $settings['activity'] = $activity;
            MSiteSettings::create([
                'sett_site_id' => $this->request['site_id'],
                'sett_settings' => json_encode($settings),
            ]);
            if (MSiteSettings::hasErrors()) $this->responseError(MSiteSettings::getErrors());
        } else {
            // редактируем
            $settings = $settings['sett_settings'];
            if (_json()->isJSON($settings)) $settings = \json_decode($settings, true);
            else $settings = [];
            $settings['activity'] = \array_merge($settings['activity'] ?? [], $activity);
            MSiteSettings::update([
                'sett_site_id' => $this->request['site_id'],
                'sett_settings' => \json_encode($settings),
            ]);
            if (MSiteSettings::hasErrors()) $this->responseError(MSiteSettings::getErrors());
        }

        return true;
    }
}
