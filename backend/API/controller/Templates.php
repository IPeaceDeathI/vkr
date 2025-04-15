<?php

namespace Noks\RESTAPI;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Enum\EntityTypeEnum;
use Noks\Enum\StatusTemplate as EStatusTemplate;

// models
use Noks\Model\EntityRightsLinkModel;
use Noks\Model\ConstructorTemplates as MConstructorTemplates;
use Noks\Model\ConstructorTemplateCategories as MConstructorTemplateCategories;
use Noks\CachedModel\ConstructorTemplateCategories as CConstructorTemplateCategories;
use Noks\Model\CRMToken as MCRMToken;
use Noks\Model\EntityCRMPipelineUserLinks as MEntityCRMPipelineUserLinks;
use Noks\Model\CRMSendLead as MCRMSendLead;
use Noks\Model\CRMPipeline as MCRMPipeline;
use Noks\Model\CRMUser as MCRMUser;
use Noks\Model\CRMContact as MCRMContact;
use Noks\Model\WebHook as MWebHook;
use Noks\Model\ConstructorImg as MConstructorImg;
use Noks\Model\Notices as MNotices;

// constructor
use Noks\ConstructorBuild\BuildDataConstructor;
use Noks\ConstructorBuild\CSSBuild;
use Noks\Validation\Decorator;

// validation
use Noks\Validation\APITemplate as VAPITemplate;
use Noks\Validation\ConstructorAPIBlock as VConstructorAPIBlock;

class Templates
{
    use DefaultMethodsAPIResours;

    private array $request;

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // update
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    public function update(string $tpl_id): void
    {
        try {
            $this->setRequest();
            $this->request['tpl_id'] = intval($tpl_id);
            $this->request['flow_id'] = getCurrentFlow();
            $this->request['is_admin'] = userAuthAsAdmin();
            $this->responseSuccess($this->procces_update());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function procces_update(): bool
    {
        $this->check_update();
        if ($this->request['is_admin']) {
            MConstructorTemplates::update(
                $this->request['tpl_id'],
                [
                    'tpl_title' => $this->request['tpl_title'],
                    'tpl_id_category' => $this->request['tpl_id_category'],
                    (EStatusTemplate::has($this->request['tpl_status'] ?? -1) ? 'tpl_status' : 'non-existent') => $this->request['tpl_status'] ?? -1,
                ]
            );
        } else {
            MConstructorTemplates::updateByIdUserIdFlowId(
                $this->request['tpl_id'],
                getCurrentUser(),
                $this->request['flow_id'],
                [
                    'tpl_title' => $this->request['tpl_title'],
                    'tpl_id_category' => $this->request['tpl_id_category']
                ]
            );
        }
        if (MConstructorTemplates::hasErrors()) {
            $err = MConstructorTemplates::getErrors();
            $this->responseError($err);
        }

        return true;
    }

    private function check_update(): void
    {
        if (!MConstructorTemplates::existByIdFlowId($this->request['tpl_id'], $this->request['flow_id'])) {
            if (!($this->request['is_admin'] && MConstructorTemplates::exist($this->request['tpl_id']))) {
                $this->responseError('Шаблон не найден');
            }
        }
        $validator = new Decorator($this->request, [
            'tpl_id_category' => 'required|integer|min:1',
            'tpl_title' => 'required|max:255|min:1',
            'tpl_status' => 'nullable|integer|min:1',
        ]);
        $err = $validator->get_result();
        if ($err) {
            $this->responseError($err);
        }
        if (!MConstructorTemplateCategories::exist($this->request['tpl_id_category'])) {
            $this->responseError('Категория не найдена');
        }
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // delete
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    public function delete(string $tpl_id): void
    {
        try {
            $this->setRequest();
            $this->request['tpl_id']  = \intval($tpl_id);
            $this->request['flow_id'] = getCurrentFlow();
            $this->responseSuccess($this->procces_delete());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([\get_class($e), $code]);
        }
    }

    private function check_delete(): void
    {
        if (!MConstructorTemplates::existByIdFlowId($this->request['tpl_id'], $this->request['flow_id'])) {
            $this->responseError('Шаблон не найден');
        }
    }

    private function procces_delete(): bool
    {
        $this->check_delete();

        $err = \transaction(function () {
            /** @var int[] $args */
            $args = [EntityTypeEnum::TEMPLATE->v(), $this->request['tpl_id']];

            // constructor_img
            MConstructorImg::deleteByTplId($this->request['tpl_id']);
            if (MConstructorImg::hasErrors()) \throwException();
            // web_hooks
            MWebHook::deleteByEntityIdType(...$args);
            if (MWebHook::hasErrors()) \throwException();
            // entity_crm_pipline_user_links
            MEntityCRMPipelineUserLinks::delete(...$args);
            if (MEntityCRMPipelineUserLinks::hasErrors()) \throwException();
            // crm_tokens
            $token_ids = MCRMToken::getByIdEntityTypeId(...$args);
            $token_ids = \array_column($token_ids, 'token_id');
            // crm_send_lead
            MCRMSendLead::deleteByEntityTypeId(...$args);
            if (MCRMSendLead::hasErrors()) \throwException();
            // crm_users (нужен токен)
            MCRMUser::deleteByTokenId($token_ids);
            if (MCRMUser::hasErrors()) \throwException();
            // crm_pipelines (нужен токен)
            MCRMPipeline::deleteByTokenId($token_ids);
            if (MCRMPipeline::hasErrors()) \throwException();
            // crm_contacts (нужен токен)
            MCRMContact::deleteByTokenId($token_ids);
            if (MCRMContact::hasErrors()) \throwException();
            MCRMToken::delete($token_ids);
            if (MCRMToken::hasErrors()) \throwException();
            // notices
            MNotices::delete(...$args);
            if (MNotices::hasErrors()) \throwException();
            // entity_rights_links
            EntityRightsLinkModel::self()->deleteByEntityID($this->request['tpl_id'], EntityTypeEnum::TEMPLATE);
            if (EntityRightsLinkModel::hasErrors()) \throwException();
            // templates
            MConstructorTemplates::delete($this->request['tpl_id']);
            if (MConstructorTemplates::hasErrors()) \throwException();
        });

        if ($err) $this->responseError($err);
        return true;
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // method
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    /**
     * PUT|GET|POST
     * TODO нужно будет переделать под RESTAPI
     */
    public function method(?string $tpl_id = null): void
    {
        try {
            $this->setRequest();
            $this->request['tpl_id'] = isInt($tpl_id) ? intval($tpl_id) : null;
            $this->request['flow_id'] = getCurrentFlow();
            $this->request['is_admin'] = userAuthAsAdmin();
            $this->responseSuccess($this->process_method());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function check_method()
    {
        $err = VAPITemplate::existMethod($this->request);
        if ($err) $this->responseError($err);
        $err = VAPITemplate::check($this->request);
        if ($err) $this->responseError($err);
    }

    private function process_method()
    {
        $this->check_method();
        switch ($this->request['method']) {
            case 'CopyToPublic':
                return $this->CopyToPublic();
            case 'updateTemplate':
                return $this->updateTemplate();
            case 'getTemplateById':
                return $this->getTemplateById();
            case 'getTemplatesByIdCategory':
                return $this->getTemplatesByIdCategory();
            case 'getMyTemplatesByIdCategory':
                return $this->getMyTemplatesByIdCategory();
            case 'getAllCategories':
                return $this->getAllCategories();
            default:
                $this->responseError(['unknown method']);
        }
    }

    /**
     * копируем шаблон в админский проект, для размещения в публичный раздел
     */
    private function CopyToPublic()
    {
        if ($this->request['tpl_id'] === null) $this->responseError('Не указан tpl_id');
        if (!$this->request['is_admin']) $this->responseError('Forbidden');
        if (!MConstructorTemplates::exist($this->request['tpl_id'])) $this->responseError('Шаблон не найден');
        $data_tpl = MConstructorTemplates::getById($this->request['tpl_id']);
        $res = MConstructorTemplates::create(
            [
                'tpl_id_user_creator' => getCurrentUser(),
                'tpl_id_flow' => MAIN_FLOW,
                'tpl_id_category' => $data_tpl['tpl_id_category'],
                'tpl_title' => 'Copy: ' . $data_tpl['tpl_title'],
                'tpl_blocks_structure' => $data_tpl['tpl_blocks_structure'],
                'tpl_preview_src' => $data_tpl['tpl_preview_src'],
                'tpl_html' => $data_tpl['tpl_html'],
                'tpl_css' => $data_tpl['tpl_css'],
                'tpl_status' => EStatusTemplate::DEVELOPING,
            ]
        );
        if (MConstructorTemplates::hasErrors()) $this->responseError(MConstructorTemplates::getErrors());
        if ($res === -1) $this->responseError(['Не удалось создать шаблон MConstructorTemplates::create']);
        return true;
    }

    private function checkStructure(array $structure)
    {
        $err = VConstructorAPIBlock::jsonStructurePage($structure['blocks_structure']);
        if ($err) $this->responseError($err);
        // ------------------------------------------------
        // валидируем глобальные стили
        $err = VConstructorAPIBlock::jsonPagesOptions($structure['pages_options']);
        if ($err) $this->responseError($err);
    }

    private function updateTemplate()
    {
        if (!MConstructorTemplates::existByIdFlowId($this->request['id_tpl'], $this->request['flow_id'])) {
            if (!($this->request['is_admin'] && MConstructorTemplates::exist($this->request['id_tpl']))) {
                $this->responseError('Шаблон не найден');
            }
        }
        // Обновляем preview если есть
        if ($this->request['preview_src']) {
            try {
                $this->updateImage(
                    $this->request['id_tpl'],
                    $this->request['preview_src']
                );
            } catch (\Throwable $e) {
                _writeLog($e);
            }
        }
        // ------------------------------------------------
        $structure = [];
        $structure['blocks_structure'] = \json_decode($this->request['blocks_structure'], true);
        $structure['pages_options'] = \json_decode($this->request['pages_options'], true);
        $this->checkStructure($structure);
        // ------------------------------------------------
        $structure['blocks_structure'] = BuildDataConstructor::handleBlocksStructure($structure['blocks_structure']);
        BuildDataConstructor::handlePagesOptions($structure['pages_options']);
        $this->request['blocks_structure'] = \json_encode($structure);
        unset($structure);
        $html = BuildDataConstructor::compact();
        $css = CSSBuild::compactAll();
        // ------------------------------------------------
        if ($this->request['is_admin']) {
            MConstructorTemplates::update(
                $this->request['id_tpl'],
                [
                    'tpl_blocks_structure' => $this->request['blocks_structure'],
                    'tpl_preview_src' => $this->request['preview_src'] ?? null,
                    'tpl_html' => $html,
                    'tpl_css' => $css,
                ]
            );
        } else {
            MConstructorTemplates::updateByIdUserIdFlowId(
                $this->request['id_tpl'],
                getCurrentUser(),
                $this->request['flow_id'],
                [
                    'tpl_blocks_structure' => $this->request['blocks_structure'],
                    'tpl_preview_src' => $this->request['preview_src'] ?? null,
                    'tpl_html' => $html,
                    'tpl_css' => $css,
                ]
            );
        }

        unset($html, $css);
        // ------------------------------------------------
        if (MConstructorTemplates::hasErrors()) {
            $err = MConstructorTemplates::getErrors();
            $this->responseError($err);
        }
        return true;
    }

    private function updateImage(int $id_tpl, string $preview_src)
    {
        $res = MConstructorTemplates::getPreviewByPageId($id_tpl);
        if ($res !== null) removeFileByPath($res);
        MConstructorTemplates::setPreviewByPageId($preview_src, $id_tpl);
    }

    private function getAllCategories()
    {
        $res = CConstructorTemplateCategories::getAll();
        return $res;
    }

    private function getTemplatesByIdCategory()
    {
        if ($this->request['data'] == 'short') $res = MConstructorTemplates::getShortByIdCategories(
            $this->request['values'],
            $this->request['limit'] ?? null,
            $this->request['offset'] ?? null
        );
        elseif ($this->request['data'] == 'full') $res = MConstructorTemplates::getByIdCategories(
            $this->request['values'],
            $this->request['limit'] ?? null,
            $this->request['offset'] ?? null
        );
        if (MConstructorTemplates::hasErrors()) {
            $err = MConstructorTemplates::getErrors();
            $this->responseError($err);
        }
        return $res;
    }

    private function getMyTemplatesByIdCategory()
    {
        $res = MConstructorTemplates::getMyByIdCategories(
            $this->request['flow_id'],
            $this->request['values'],
            $this->request['limit'] ?? null,
            $this->request['offset'] ?? null
        );
        if (MConstructorTemplates::hasErrors()) {
            $err = MConstructorTemplates::getErrors();
            $this->responseError($err);
        }
        return $res;
    }

    private function getTemplateById()
    {
        $res = MConstructorTemplates::getPublicById($this->request['id_tpl']);
        if (MConstructorTemplates::hasErrors()) {
            $err = MConstructorTemplates::getErrors();
            $this->responseError($err);
        }
        return $res;
    }
}
