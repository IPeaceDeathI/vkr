<?php

namespace Noks\Site\Component;

use Noks\Env;

/**
 * компонент
 */
class MenuSettingPage
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

    private function getSub()
    {
        return getNameModule(5);
    }

    private function getListMenu()
    {
        $start = '/sites/' . $this->id_site . '/page/' . $this->id_page . '/settings';
        return [
            'Общие настройки' => [
                [
                    'sub' => '',                      'href' => $start,                            'name' => 'SEO настройки',          'active' => true,
                    'svg' => 'settings'
                ],
                [
                    'sub' => 'clone_page',            'href' => $start . '/clone_page',            'name' => 'Создать копию', 'active' => true,
                    'svg' => 'copy'
                ],
                // ['sub' => '',                      'href' => '',                                'name' => 'Настройки шаблона',      'active' => false, 'svg' => 'general'],
                // ['sub' => 'create_tpl',            'href' => $start . '/create_tpl',            'name' => 'Создать шаблон',         'active' => true, 'svg' => 'general' ],
                // ['sub' => '',                      'href' => '',                                'name' => 'Шрифты',                 'active' => false, 'svg' => 'general'],
                [
                    'sub' => 'switch_editor',         'href' => $start . '/switch_editor',         'name' => 'Изменить редактор',       'active' => true,
                    'svg' => 'tasks'
                ],
                [
                    'sub' => 'delete_page',           'href' => $start . '/delete_page',           'name' => 'Удалить страницу',       'active' => true,
                    'svg' => 'remove'
                ],
                [
                    'sub' => 'controle_version_page', 'href' => $start . '/controle_version_page', 'name' => 'Контроль версий',        'active' => true,
                    'svg' => 'history-undo'
                ],
            ],
            // 'Заявки и аналитика' => [
            //     ['sub' => '', 'href' => '', 'name' => 'Рекламные каналы', 'active' => false, 'svg' => 'general'],
            //     ['sub' => '', 'href' => '', 'name' => 'Подключение CRM',  'active' => false, 'svg' => 'general'],
            //     ['sub' => '', 'href' => '', 'name' => 'А/Б тесты',        'active' => false, 'svg' => 'general'],
            //     ['sub' => '', 'href' => '', 'name' => 'Вставка кода',     'active' => false, 'svg' => 'general'],
            // ],
        ];
    }

    private function process(): string
    {
        $sub = $this->getSub();
        $setting_menu = $this->getListMenu();
        return $this->getView(
            $sub,
            $setting_menu
        );
    }

    private function getView(
        $sub,
        $setting_menu
    ): string {
        return \obStartGetClean(function () use (
            $sub,
            $setting_menu,
        ) {
            include MAIN_DIR . '/sites/view/component/MenuSettingPage.php';
        });
    }
}
