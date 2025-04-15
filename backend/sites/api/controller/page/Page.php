<?php

namespace Noks\SitePage\API\Controller;

use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Validation\APISitePage as VAPISitePage;
use Noks\Rights\Check\Template as RTemplate;
use Noks\Validation\Decorator;
// ------------------------------------------------------------------
// Exception
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\SitePage as MSitePage;
use Noks\Model\PageHash as MPageHash;
use Noks\Model\ConstructorTemplates as MConstructorTemplates;
// ------------------------------------------------------------------
// Service
// ------------------------------------------------------------------
use Noks\Service\CheckURISitePageService;

class Page
{
    use DefaultMethodsAPIResours;
    private array $request;

    // ---------------------------------------------
    // ---------------------------------------------
    // ---------------------------------------------
    // POST
    // ---------------------------------------------
    // ---------------------------------------------
    // ---------------------------------------------
    public function store(string $id_site, string $id_page): void
    {
        try {
            $this->setRequest();
            $this->request['id_site'] = \intval($id_site);
            $this->request['id_page'] = \intval($id_page);
            $this->request['id_flow'] = getCurrentFlow();
            $this->responseSuccess($this->process_store());
        } catch (\Throwable $e) {
            $code = _writeLog(($e));
            $this->responseError([\get_class($e), $code]);
        }
    }

    private function process_store(): bool
    {
        $this->check();
        switch ($this->request['method']) {
            case 'createTemplate':
                return $this->createTemplate();
            default:
                $this->responseError(['unknown method']);
        }
    }

    private function createTemplate(): bool
    {
        if (!RTemplate::getInstance()->allowed_create()) $this->responseError(['У вас нету прав на создании шаблона']);
        $data_page = MSitePage::getById($this->request['id_page']);
        if (!$data_page) $this->responseError(['Не удалось получить данные страницы']);
        $ph = MPageHash::getLastByIDPage($data_page['id']);
        if (!$ph) $this->responseError(['Не удалось найти содержимое страницы, возможно она еще не была создана в конструкторе']);
        $res = MConstructorTemplates::create(
            [
                'tpl_id_user_creator'  => getCurrentUser(),
                'tpl_id_flow'          => $this->request['id_flow'],
                'tpl_id_category'      => $this->request['id_category'],
                'tpl_title'            => $this->request['title'],
                'tpl_blocks_structure' => $ph['hash_text'],
                'tpl_preview_src'      => '',
                'tpl_html'             => $ph['hash_html'],
                'tpl_css'              => $ph['hash_styles'],
            ]
        );
        if (MConstructorTemplates::hasErrors()) $this->responseError(MConstructorTemplates::getErrors());
        if ($res === -1) $this->responseError(['Не удалось создать шаблон MConstructorTemplates::create']);
        return true;
    }

    // ---------------------------------------------
    // ---------------------------------------------
    // ---------------------------------------------
    // PUT
    // ---------------------------------------------
    // ---------------------------------------------
    // ---------------------------------------------

    public function update(string $id_site, string $id_page): void
    {
        try {
            $this->setRequest();
            $this->request['id_site'] = \intval($id_site);
            $this->request['id_page'] = \intval($id_page);
            $this->request['id_flow'] = getCurrentFlow();
            $this->responseSuccess($this->process_update());
        } catch (\Throwable $e) {
            $code = _writeLog(($e));
            $this->responseError([\get_class($e), $code]);
        }
    }

    private function process_update(): bool
    {
        switch ($this->request['method'] ?? '') {
            case 'editPageSeo':
                return $this->editPageSeo();
            case 'ControleVersionPage':
                return $this->ControleVersionPage();
            default:
                $this->responseError(['unknown method']);
        }
    }

    // ------------------------------------------------------------------
    // ControleVersionPage
    // ------------------------------------------------------------------

    /**
     * TODO изменить для constructor2
     * изменения версию страницы
     * заменяем старый на новый с удалением
     */
    private function ControleVersionPage(): bool
    {
        $this->checkControleVersionPage();
        // ------------------------------------------------------------------
        $err = transaction(function () {
            $current = MPageHash::getLastByIDPage($this->request['id_page']);
            $old     = MPageHash::getByIDPageID($this->request['hash_id'], $this->request['id_page']);
            if (!$old || !$current) return 'Содержимое страницы не найдено';

            if ($current['hash_id'] == $old['hash_id']) return 'Выбранная версия уже активна';
            MPageHash::delete(intval($current['hash_id']));
            if (MPageHash::hasErrors()) return MPageHash::pullErrors();

            MPageHash::update([
                'hash_date' => $current['hash_date'],
                'hash_id'   => $current['hash_id'],
                'hash_uid'  => getCurrentUser(),
            ], $old['hash_id']);
            if (MPageHash::hasErrors()) return MPageHash::pullErrors();
        });

        if ($err) $this->responseError($err);
        return true;
    }

    private function checkControleVersionPage(): void
    {
        if (!primaryMatching($this->request['id_site'], $this->request['id_page'])) $this->responseError(['Страница не найдена']);
        $v = new Decorator($this->request, [
            'hash_id' => 'required|min:1|integer',
        ]);
        $err = $v->get_result();
        if ($err) $this->responseError($err);
    }

    // ------------------------------------------------------------------
    // editPageSeo
    // ------------------------------------------------------------------

    private function editPageSeo(): bool
    {
        $this->checkEditPageSeo();
        // --------------------------------------------------
        $data_page = MSitePage::getById($this->request['id_page']);
        if (!$data_page) $this->responseError(['Не удалось получить данные страницы']);
        // --------------------------------------------------
        $this->request['uri'] = $this->request['uri'] ?? '';
        $this->request['uri'] = \trim($this->request['uri'], '/');
        // --------------------------------------------------
        // проверяем что такой URI еще нет
        if (MSitePage::existURIBySiteID($this->request['id_site'], $this->request['uri'], [$this->request['id_page']])) {
            $this->request['uri'] .= '-' . \mt_rand(1000, 9999);
        }
        // --------------------------------------------------
        MSitePage::update($data_page['id'], $this->request['uri'], $this->request['title'], $this->request['desc']);
        if (MSitePage::hasErrors()) $this->responseError(MSitePage::getErrors());
        return true;
    }

    private function checkEditPageSeo(): void
    {
        if (!primaryMatching($this->request['id_site'], $this->request['id_page'])) $this->responseError(['Страница не найдена']);
        $v = new Decorator(
            $this->request,
            [
                'id_site' => 'required|integer|min:1',
                'id_flow' => 'required|integer|min:1',
                'id_page' => 'required|integer|min:1',
                'uri' => [
                    'nullable',
                    'min:1',
                    'max:1000',
                    function ($uri) {
                        $v = new CheckURISitePageService;
                        return $v->__invoke($uri);
                    },
                ],
                'title' => 'required|min:2|max:100',
                'desc'  => 'nullable|max:2000',
            ],
            null,
            [
                'uri' => 'Поле URI страницы должно содержать только: латиницу, арабские цифры, символы(-, /, _) и иметь длину 1-1000 символов',
            ]
        );
        $err = $v->get_result();
        if ($err) $this->responseError($err);
        $this->request = $v->getValidData();
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // other
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    private function check(): void
    {
        if (!primaryMatching($this->request['id_site'], $this->request['id_page'])) $this->responseError(['Страница не найдена']);
        $err = VAPISitePage::existMethod($this->request);
        if ($err) $this->responseError($err);
        $err = VAPISitePage::check($this->request);
        if ($err) $this->responseError($err);
    }
}
