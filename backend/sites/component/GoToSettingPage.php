<?php

namespace Noks\Site\Component;

/**
 * компонент
 */
class GoToSettingPage
{
    private $id_site;
    private $id_page;

    function main(int $id_site, int $id_page): string
    {
        $this->id_site = $id_site;
        $this->id_page = $id_page;

        try {
            return $this->process();
        } catch (\Throwable $e) {
            _writeLog(($e));
            return '';
        }
    }

    private function process(): string
    {
        return $this->getView();
    }

    private function getView(): string
    {
        return \obStartGetClean(function () {
            include MAIN_DIR . '/sites/view/component/GoToSettingPage.php';
        });
    }
}
