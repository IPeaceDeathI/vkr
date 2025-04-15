<?php

namespace Noks\Site\Component;

/**
 * компонент
 */
class MenuSettingSite
{
   private int $id_site;

   public function main(int $id_site): string
   {
      $this->id_site = $id_site;
      try {
         return $this->process();
      } catch (\Throwable $e) {
         _writeLog(($e));
         return '';
      }
   }

   private function getSub(): string
   {
      $path = getPath();
      $path = trim($path, '/');
      $path = explode('/', $path);
      if (!isset($path[3])) return '';
      return $path[3];
   }

   private function getListMenu(): array
   {
      $start = '/sites/' . $this->id_site . '/settings';
      return [
         'Общие настройки' => [
            [
               'sub' => '', 'href' => $start, 'name' => 'SEO настройки', 'active' => true,
               'svg' => 'settings-code'
            ],
            [
               'sub' => 'domain', 'href' => $start . '/domain', 'name' => 'Прикрепить домен', 'active' => true,
               'svg' => 'localization'
            ],
            [
               'sub' => 'access_code', 'href' => $start . '/access_code', 'name' => 'Код доступа', 'active' => true,
               'svg' => 'QR'
            ],
            [
               'sub' => 'sub_domain', 'href' => $start . '/sub_domain', 'name' => 'Поддомен', 'active' => true,
               'svg' => 'api'
            ],
            [
               'sub' => 'notify', 'href' => '/admin/settings/notify/', 'name' => 'Уведомления заявок', 'active' => true,
               'svg' => 'notification'
            ],
            [
               'sub' => 'delete_site', 'href' => $start . '/delete_site', 'name' => 'Удалить сайт', 'active' => true,
               'svg' => 'remove'
            ],
         ],
         'Заявки и аналитика' => [
            [
               'sub' => 'application_statuses', 'href' => $start . '/application_statuses', 'name' => 'Статусы заявок', 'active' => true,
               'svg' => 'draggable'
            ],
            [
               'sub' => 'code_insert', 'href' => $start . '/code_insert', 'name' => 'Вставить код', 'active' => true,
               'svg' => 'code'
            ],
            [
               'sub' => 'amo_crm', 'href' => $start . '/amo_crm', 'name' => 'Подключить amoCRM', 'active' => true,
               'svg' => 'user'
            ],
            [
               'sub' => 'roistat_webhook', 'href' => $start . '/roistat_webhook', 'name' => 'Roistat (WebHook)', 'active' => true,
               'svg' => 'params'
            ],
            [
               'sub' => 'roistat_proxy_lead', 'href' => $start . '/roistat_proxy_lead', 'name' => 'Roistat (ProxyLead)', 'active' => true,
               'svg' => 'empty-code'
            ],
            [
               'sub' => 'activity', 'href' => $start . '/activity', 'name' => 'Activity', 'active' => true,
               'svg' => 'icon-check'
            ],
         ]
      ];
   }

   private function process(): string
   {
      $sub = $this->getSub();
      $setting_menu = $this->getListMenu();
      return $this->getView(
         $setting_menu,
         $sub
      );
   }

   private function getView(
      $setting_menu,
      $sub
   ): string {
      return \obStartGetClean(function () use (
         $setting_menu,
         $sub,
      ) {
         include MAIN_DIR . '/sites/view/component/MenuSettingSite.php';
      });
   }
}
