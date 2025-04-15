<?php

namespace Noks\Constructor\API\Controller;

use Noks\Constructor\API\Trait\DefaultMethodsAPIResoursBlock;
use Noks\Validation\ConstructorAPIBlock as VConstructorAPIBlock;
use Noks\ConstructorBuild\BuildDataConstructor;
use Noks\ConstructorBuild\CSSBuild;
use Noks\Model\PageHash as MPageHash;
use Noks\Model\SitePage as MSitePage;

class Page
{
    use DefaultMethodsAPIResoursBlock;

    private $request;

    /**
     * POST
     */
    public function store(): void
    {
        try {
            $this->setRequest();
            $this->responseSuccess($this->process_store());
        } catch (\Throwable $e) {
            $code = \_writeLog($e);
            $this->responseError([\get_class($e), $code]);
        }
    }

    protected function process_store()
    {
        $this->check();
        $structure = $this->checkStructure();
        $this->checkMatching();
        switch ($this->request['method']) {
            case 'savePage':
                return $this->savePage($structure);
            case 'savePageText':
                return $this->savePageText($structure);
            default:
                $this->responseError(['unknown method']);
        }
    }

    protected function savePage(array $structure)
    {
        // Обновляем preview если есть
        if (isset($this->request['preview_src'])) {
            try {
                self::updateImage(
                    $this->request['id_page'],
                    $this->request['preview_src']
                );
            } catch (\Throwable $e) {
                \_writeLog($e);
            }
        }
        //Созраняем page hash
        $structure['blocks_structure'] = BuildDataConstructor::handleBlocksStructure($structure['blocks_structure']);
        BuildDataConstructor::handlePagesOptions($structure['pages_options']);
        $this->request['blocks_structure'] = \json_encode($structure);
        unset($structure);
        $html = BuildDataConstructor::compact();
        $css = CSSBuild::compactAll();
        // ------------------------------------------------
        MPageHash::create(
            [
                'hash_text'   => $this->request['blocks_structure'],
                'hash_html'   => $html,
                'hash_styles' => $css,
                'hash_uid'    => \getCurrentUser(),
                'hash_page'   => $this->request['id_page'],
            ]
        );
        unset($html, $css);
        if (MPageHash::hasErrors()) $this->responseError(MPageHash::getErrors());
        // ------------------------------------------------
        // удаляем старые данные
        MPageHash::deleteTo($this->request['id_page']);
        return true;
    }

    protected function savePageText(array $structure)
    {
        $structure['blocks_structure'] = \json_decode($this->request['blocks_structure'], true);
        $structure['pages_options'] = \json_decode($this->request['pages_options'], true);
        foreach ($structure['blocks_structure'] as $keyBlock => $block) {
            unset($structure['blocks_structure'][$keyBlock]['html']);
        }
        $structure = \json_encode($structure);
        MPageHash::updateText($this->request['page_hash_id'], $structure);
        if (MPageHash::hasErrors())
            $this->responseError(MPageHash::getErrors());
        return true;
    }

    protected function updateImage(int $page_id, string $preview_src)
    {
        $result = MSitePage::getPreviewByPageId($page_id);
        if ($result !== null) {
            \removeFileByPath($result);
        }
        MSitePage::updatePreviewByID($preview_src, $page_id);
    }

    protected function checkMatching()
    {
        if (!\pageMatching(int($this->request['id_page']))) {
            $this->responseError('Страница не соответствует сайту');
        }
    }

    protected function checkStructure(): array
    {
        if (!\_json()->isJSON($this->request['blocks_structure'])) {
            \_writeLog([
                '"blocks_structure" не JSON',
                'blocks_structure' => $this->request['blocks_structure'],
            ], \__ALL());
            $this->responseError('"blocks_structure" не JSON');
        }
        if (!\_json()->isJSON($this->request['pages_options'])) {
            \_writeLog([
                '"pages_options" не JSON',
                'pages_options' => $this->request['pages_options'],
            ], \__ALL());
            $this->responseError('"pages_options" не JSON');
        }
        // ------------------------------------------------------------------
        // blabla
        // ------------------------------------------------------------------
        $structure['blocks_structure'] = \json_decode($this->request['blocks_structure'], true);
        $structure['pages_options']    = \json_decode($this->request['pages_options'], true);
        // ------------------------------------------------
        // валидируем tag options
        $err = VConstructorAPIBlock::jsonStructurePage($structure['blocks_structure']);
        if ($err) $this->responseError($err);
        // ------------------------------------------------
        // валидируем глобальные стили
        $err = VConstructorAPIBlock::jsonPagesOptions($structure['pages_options']);
        if ($err) $this->responseError($err);
        // ------------------------------------------------
        return $structure;
    }
}
