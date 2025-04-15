<?php

namespace Noks\Template\Controller;

use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Enum\StatusTemplate as EStatusTemplate;
use Noks\Model\ConstructorTemplates as MConstructorTemplates;
use Noks\CachedModel\ConstructorTemplateCategories as CConstructorTemplateCategories;
use Noks\Template\Component\Menu;

/**
 */
class EditTemplate
{
    use TempAddCSSAddJSForHeadFooter;

    private int $flow_id;
    private int $tpl_id;
    private bool $is_admin;
    private bool $is_my_tpl_and_public_flow = false;
    private bool $is_my_tpl = false;

    function index($tpl_id)
    {
        try {
            $this->is_admin = userAuthAsAdmin();
            $this->flow_id = getCurrentFlow();
            $this->tpl_id = intval($tpl_id);
            $this->process_index();
        } catch (\Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    private function process_index()
    {
        $statuses = [];
        if ($this->is_admin) $tpl = MConstructorTemplates::getById($this->tpl_id);
        else $tpl = MConstructorTemplates::getByIdFlowId($this->tpl_id, $this->flow_id);
        if (!$tpl) Errors::_404();
        $this->is_my_tpl = $tpl['tpl_id_flow'] == $this->flow_id;
        if ($this->is_my_tpl && $this->flow_id === MAIN_FLOW) {
            $this->is_my_tpl_and_public_flow = true;
            $statuses = EStatusTemplate::getNamed();
        }
        $tpl_categories = CConstructorTemplateCategories::getAll();
        // --------------------------------------------------
        $this->view(
            $tpl,
            $tpl_categories,
            $statuses
        );
        exit();
    }

    private function view(
        $tpl,
        $tpl_categories,
        $statuses
    ) {
        $menu_index_tpl = (new Menu)->main();
        // -----------------------------------------------------------
        $title = 'Изменить шаблон';
        // -----------------------------------------------------------
        $this->setResource();
        addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        addCSS(MAIN_URL . '/sites/resource/css/site/add.css');
        addCSS(MAIN_URL . '/templates/resource/css/main.css');
        addCSS(MAIN_URL . '/templates/resource/css/edit.css');
        addCSS(SITE_URL . 'resource/css/smackbar.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/smackbar.js');
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        addJS(MAIN_URL . '/templates/resource/js/edit.js');
        // -----------------------------------------------------------
        include VERSION . '/head.php';
        include MAIN_DIR . '/templates/view/edit_html.php';
        include VERSION . '/footer.php';
    }
}
