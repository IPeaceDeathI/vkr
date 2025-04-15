<?php

namespace Noks\Site\Component;

use Noks\Env;

/**
 * компонент
 */
class MenuSite
{
    private $id_site;

    function main($id_site): string
    {
        $this->id_site = $id_site;

        try {
            return $this->process();
        } catch (\Throwable $e) {
            $code = _writeLog(($e));
            return '';
        }
    }

    /**
     * sites/1/(sub)
     */
    private function getSub(): string
    {
        return getNameModule(2);
    }

    private function process(): string
    {
        $sub = $this->getSub();
        $menu_site = [
            '/'            => 'Страницы',
            '/domain'      => 'Домены',
            '/application' => 'Заявки',
            '/settings'    => 'Настроить', // <- к этому пункту прибавляется параметр "&settings=seo" в цикле ниже. 
        ];

        return $this->getView($menu_site, $sub);
    }

    private function getView(
        $menu_site,
        $sub
    ): string {
        return \obStartGetClean(function () use (
            $menu_site,
            $sub,
        ) {
            include MAIN_DIR . '/sites/view/component/MenuSite.php';
        });
    }
}
