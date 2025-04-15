<?php

namespace Noks\Site\Component;

use Noks\BasicController;
use Throwable;

/**
 * компонент
 */
class MenuIndexSite extends BasicController
{
    function main(): string
    {
        try {
            return $this->process();
        } catch (Throwable $e) {
            $code = _writeLog(($e));
            return '';
        }
    }

    private function process(): string
    {
        $menu_site = [
            '/' => 'Мои Сайты',
        ];

        return $this->getView($menu_site);
    }

    private function getView(
        $menu_site
    ): string {
        return \obStartGetClean(function () use ($menu_site) {
            include MAIN_DIR . '/sites/view/component/MenuIndexSite.php';
        });
    }
}
