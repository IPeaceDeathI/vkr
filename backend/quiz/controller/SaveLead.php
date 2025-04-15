<?php

namespace Noks\Quiz\Controller;

// ------------------------------------------------------------------
// Trait
// ------------------------------------------------------------------
use Noks\Trait\APIMethods;
use Noks\Trait\Notice\NoticeBadSaveLeadTrait;
// ------------------------------------------------------------------
// Interface
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// Service
// ------------------------------------------------------------------
use Noks\Service\Site\DefineSiteByURLService;
use Noks\Service\SitePage\DefineSitePageByURLService;
use Noks\Service\Flow\DefineFlowByURLService;
use Noks\Service\Lead\SaveLeadAbstract;
use Noks\Service\Stat\Visit\Init\InitGeneralVisit;
// ------------------------------------------------------------------
// Enum
// ------------------------------------------------------------------
use Noks\Enum\LeadSourceEnum;
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\Quiz\QuizModel;
use Noks\Model\CRMLeadModel;
use Noks\Model\QuizResult as MQuizResult;
// ------------------------------------------------------------------
// Exception
// ------------------------------------------------------------------

/**
 */
class SaveLead extends SaveLeadAbstract
{
    use APIMethods, NoticeBadSaveLeadTrait;

    function __invoke(): void
    {
        try {
            $this->setRequest();
            $this->process();
        } catch (\Throwable $e) {
            $t = [\CollectDataException($e), '$this->request' => $this->request];
            \_writeLog($t);
            $this->badSaveLead($t);
        }
        $this->responseSuccess(true);
    }

    // ------------------------------------------------------------------
    // 
    // ------------------------------------------------------------------

    function process(): void
    {
        $quiz = QuizModel::self()->getByID($this->request['id_quiz'] ?? -1);
        $create = [];

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        if (!$quiz) {
            \_writeLog(['$quiz' => $quiz, '$this->request' => $this->request]);
        }

        // ------------------------------------------------------------------
        // source
        // ------------------------------------------------------------------

        $create['lead_id_entity']     = $this->request['id_quiz'] ?? null;
        $create['lead_source_entity'] = LeadSourceEnum::QUIZ->v();
        // INFO раньше мы брали flow_id по quiz_id, правильней будет брать по url
        // $create['lead_id_flow']       = $quiz['quiz_id_flow'] ?? null;

        // ------------------------------------------------------------------
        // contact
        // ------------------------------------------------------------------

        $create['lead_phone'] = ($this->request['tel'] ?? '')   == '' ? null : $this->request['tel'];
        $create['lead_email'] = ($this->request['email'] ?? '') == '' ? null : $this->request['email'];
        $create['lead_name']  = ($this->request['name'] ?? '')  == '' ? null : $this->request['name'];

        // ------------------------------------------------------------------
        // meta_data - должно быть 6 ключей
        // ------------------------------------------------------------------

        $meta_data = $this->getDataFromBase64JSONByName('meta_data');

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        if ($meta_data === null) {
            \throwException('"meta_data" не получен');
        }

        // ------------------------------------------------------------------
        // ссылка на которой был установлен квиз
        // ------------------------------------------------------------------

        $create['lead_url'] = $meta_data['url_client'] ?? null;

        // ------------------------------------------------------------------
        // Определяем flow_id по url
        // ------------------------------------------------------------------

        $create['lead_id_flow'] = null;
        $s = new DefineFlowByURLService;
        $flow_id = $s->__invoke($create['lead_url'] ?? '');
        if ($flow_id !== null) {
            $create['lead_id_flow'] = $flow_id;
        }

        // ------------------------------------------------------------------
        // в случаи если flow_id url'a отличается от flow_id quiz'a
        // ------------------------------------------------------------------

        if (($quiz['quiz_id_flow'] ?? null) !== $create['lead_id_flow']) {
            \_writeLog([
                '$quiz'          => $quiz,
                '$flow_id'       => $flow_id,
                '$this->request' => $this->request,
            ]);
        }
        unset($s, $flow_id);

        // ------------------------------------------------------------------
        // определяем сайт по урлу
        // ------------------------------------------------------------------

        $create['lead_id_site'] = null;
        $s = new DefineSiteByURLService;
        $site_id = $s->__invoke($create['lead_url'] ?? '');
        if ($site_id !== null) {
            $create['lead_id_site'] = $site_id;
        }
        unset($s, $site_id);

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        $create['lead_id_page'] = null;
        $s = new DefineSitePageByURLService;
        $site_page_id = $s->__invoke($create['lead_url'] ?? '');
        if ($site_page_id !== null) {
            $create['lead_id_page'] = $site_page_id;
        }
        unset($s, $site_page_id);

        // ------------------------------------------------------------------
        // парсим url
        // ------------------------------------------------------------------

        $create['lead_fields'] = \parseQueryByURL($create['lead_url'] ?? '');
        $create['lead_fields'] = \array_change_key_case($create['lead_fields'], \CASE_LOWER);

        // ------------------------------------------------------------------
        // UTM
        // ------------------------------------------------------------------

        $create['lead_utm_source']   = $create['lead_fields']['utm_source'] ?? null;
        $create['lead_utm_medium']   = $create['lead_fields']['utm_medium'] ?? null;
        $create['lead_utm_campaign'] = $create['lead_fields']['utm_campaign'] ?? null;
        $create['lead_utm_content']  = $create['lead_fields']['utm_content'] ?? null;
        $create['lead_utm_term']     = $create['lead_fields']['utm_term'] ?? null;
        $create['lead_utm_referrer'] = $create['lead_fields']['utm_referrer'] ?? null;

        // ------------------------------------------------------------------
        // COOKIE ROISTAT
        // ------------------------------------------------------------------

        $tmp = $meta_data['cookie']['roistat_visit'] ?? null;
        if (\_int()->isBigIntUnsigned($tmp)) {
            $create['lead_roistat_visit'] = $tmp;
        }

        // ------------------------------------------------------------------
        // VISIT
        // ------------------------------------------------------------------

        $tmp_name = InitGeneralVisit::getName();
        $tmp = $meta_data['local_storage'][$tmp_name]
            ?? $meta_data['cookie'][$tmp_name]
            ?? null;

        $create['lead_general_visit'] = $tmp;
        unset($s, $tmp, $tmp_name);

        // ------------------------------------------------------------------
        // берем другие параметры url
        // ------------------------------------------------------------------

        $create['lead_fields'] = \_arr()->except($create['lead_fields'], [
            'utm_referrer',
            'utm_term',
            'utm_content',
            'utm_campaign',
            'utm_medium',
            'utm_source',
        ]);
        $create['lead_fields'] = \json_encode($create['lead_fields']);

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        // добавляем лид
        $new_lead_id = CRMLeadModel::self()->_insert($create);
        if (CRMLeadModel::hasErrors()) \throwException(CRMLeadModel::pullErrors());

        // ------------------------------------------------------------------
        // 
        // ------------------------------------------------------------------

        if ($new_lead_id !== -1) {
            $this->notice($new_lead_id, $create['lead_id_flow'] ?? -1);
            $this->sendLeadToStat($new_lead_id);
        }
        // связываем ответы и лид
        MQuizResult::setLeadIdByApproachHash([
            'lead_id' => $new_lead_id,
            'hash'    => $this->request['result_approach_hash'] ?? null
        ]);
        if (MQuizResult::hasErrors()) {
            \throwException(MQuizResult::pullErrors());
        }
    }

    function getDataFromBase64JSONByName(string $name): ?array
    {
        $v = $this->request[$name] ?? null;
        if ($v === null) return null;
        $v = \base64_decode($v, true);
        if (!$v) return null;
        if (!\_json()->isJSONAsArray($v)) return null;

        return \json_decode($v, true);
    }
}
