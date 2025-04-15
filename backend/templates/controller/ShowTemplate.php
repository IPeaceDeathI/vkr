<?php

namespace Noks\Template\Controller;

use Noks\Error\Errors;
use Noks\Trait\ConstructorUserViews;
use Noks\Model\ConstructorTemplates as MConstructorTemplates;

/**
 */
class ShowTemplate
{
    use ConstructorUserViews;

    private int $flow_id;
    private int $tpl_id;

    function index($tpl_id)
    {
        try {
            $this->tpl_id = $tpl_id;
            $this->flow_id = getCurrentFlow();
            $this->process_index();
        } catch (\Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    private function process_index()
    {
        if (userAuthAsAdmin()) $tpl = MConstructorTemplates::getById($this->tpl_id);
        else $tpl = MConstructorTemplates::getByIdFlowId($this->tpl_id, $this->flow_id);
        if (!$tpl) Errors::_404();
        // --------------------------------------------------
        $this->view(
            $tpl
        );
        exit();
    }

    private function view(
        $tpl
    ) {
        $this->setResource(SITE_URL);
        include MAIN_DIR . '/templates/view/show_html.php';
    }
}
