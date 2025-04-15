<?php

namespace Noks\Site\Controller;

use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Throwable;

/**
 * ранее был action_add_site.php
 */
class AddSite
{
    use TempAddCSSAddJSForHeadFooter;

    public function __invoke(): void
    {
        try {
            $this->process_index();
        } catch (Throwable $e) {
            \_writeLog($e);
            Errors::_500();
        }
    }

    private function process_index()
    {
        $flow_id = \getCurrentFlow();
        $currentCountSite = \getCurrentCountSite($flow_id);
        $CurrentAllowed = [];
        if ($currentCountSite == -1) \throwException('Не удалось получить количество сайтов');
        if (\userAuthAsTester()) $enable_create = true;
        else {
            $CurrentAllowed = \getCurrentAllowedCountSite($flow_id);
            $enable_create = $CurrentAllowed['by_all'] >= ($currentCountSite + 1);
        }
        $this->view(
            $enable_create,
            $CurrentAllowed,
            $currentCountSite,
        );
        exit();
    }

    private function view(
        $enable_create,
        $CurrentAllowed,
        $currentCountSite
    ) {
        $title = 'Добавить сайт';
        // -----------------------------------------------------------
        $this->setResource();
        \addCSS(MAIN_URL . '/sites/resource/css/site/add.css');
        \addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        // -----------------------------------------------------------
        \addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
        \addJS(MAIN_URL . '/sites/resource/js/site/add.js');
        // -----------------------------------------------------------
        include VERSION . '/head.php';
        include MAIN_DIR . '/sites/view/site/add.php';
        include VERSION . '/footer.php';
    }
}
