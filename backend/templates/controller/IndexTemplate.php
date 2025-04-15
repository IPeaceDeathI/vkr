<?php

namespace Noks\Template\Controller;

use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Model\ConstructorTemplates as MConstructorTemplates;
use Noks\Template\Component\Menu;

/**
 */
class IndexTemplate
{
    use TempAddCSSAddJSForHeadFooter;

    private int $flow_id;
    private bool $is_admin;

    function index()
    {
        try {
            $this->is_admin = userAuthAsAdmin();
            $this->flow_id = getCurrentFlow();
            $this->process_index();
        } catch (\Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    private function process_index()
    {
        if ($this->is_admin) $tpls = MConstructorTemplates::getAll(null, null);
        else $tpls = MConstructorTemplates::getAllByIdFlow($this->flow_id);
        // --------------------------------------------------
        $this->view(
            $tpls
        );
        exit();
    }

    private function view(
        $tpls
    ) {
        $menu_index_tpl = (new Menu)->main();
        // -----------------------------------------------------------
        $title = 'Шаблоны';
        // -----------------------------------------------------------
        $this->setResource();
        addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        addCSS(MAIN_URL . '/templates/resource/css/main.css');
        // -----------------------------------------------------------
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        // -----------------------------------------------------------
        include VERSION . '/head.php';
        include MAIN_DIR . '/templates/view/index_html.php';
        include VERSION . '/footer.php';
    }
}
