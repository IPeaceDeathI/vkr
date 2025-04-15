<?php

namespace Noks\Template\Component;

use Noks\BasicController;

/**
 * компонент
 */
class Menu extends BasicController
{
    function main(): string
    {
        try {
            return $this->process();
        } catch (\Throwable $e) {
            $code = _writeLog(($e));
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
            include MAIN_DIR . '/templates/view/component/menu.php';
        });
    }
}
