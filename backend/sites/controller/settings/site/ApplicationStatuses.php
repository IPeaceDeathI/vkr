<?php

namespace Noks\Site\Controller\Setting;

use Noks\Model\Site as MSite;
use Noks\Site\Component\HeaderSite;
use Noks\Site\Component\MenuSite;
use Noks\Site\Component\MenuSettingSite;
use Noks\BasicController;
use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Throwable;
use Noks\Model\CRMStatusModel;

class ApplicationStatuses extends BasicController
{
   use TempAddCSSAddJSForHeadFooter;

   protected $id_site;

   public function __invoke(string $site_id): void
   {
      $this->id_site = int($site_id);

      try {
         $this->process();
      } catch (Throwable $e) {
         $code = _writeLog($e);
         Errors::_500();
      }
   }

   // ------------------------------------------------------------------
   // protected
   // ------------------------------------------------------------------

   protected function process(): void
   {
      $data_site = MSite::getById($this->id_site);
      if (!$data_site) throwException('Не получили данные сайта');
      if (MSite::hasErrors()) throwException(MSite::getErrors());

      require MAIN_DIR . '/sites/functions.php';

      // получить список статусов сайта
      $statuses = CRMStatusModel::self()->getStatusApplication($this->id_site);

      // получить дефолтные статусы
      $def_statuses = CRMStatusModel::self()->getDefaultStatus();
      $def_statuses = [
         'up'     => \array_slice($def_statuses, 0, 2),
         'bottom' => \array_slice($def_statuses, 2, 2)
      ];

      $this->view(
         $data_site,
         $statuses,
         $def_statuses
      );
      exit();
   }

   protected function view(
      $data_site,
      $statuses,
      $def_statuses
   ): void {
      // -----------------------------------------------------------
      // компоненты
      $header_site       = (new HeaderSite)->main($this->id_site);
      $menu_site         = (new MenuSite)->main($this->id_site);
      $menu_setting_site = (new MenuSettingSite)->main($this->id_site);
      // -----------------------------------------------------------
      $this->setResource();
      // -----------------------------------------------------------
      addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
      addCSS(MAIN_URL . '/sites/resource/css/site/site.css');
      addCSS(MAIN_URL . '/sites/resource/css/setting/site/setting.css');
      addCSS(MAIN_URL . '/sites/resource/css/setting/site/application_statuses.css');
      // -----------------------------------------------------------
      addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
      addJS(MAIN_URL . '/sites/resource/js/setting/site/application_statuses.js');
      // -----------------------------------------------------------
      $title = 'Изменить статусы заявок | ' . $data_site['title'];

      include VERSION . '/head.php';
      require MAIN_DIR . '/sites/view/settings/site/application_statuses.php';
      include VERSION . '/footer.php';
   }
}
