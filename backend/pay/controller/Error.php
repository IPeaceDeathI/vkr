<?php

namespace Noks\Pay\Controller;

use Noks\Trait\TempAddCSSAddJSForHeadFooter;

class Error
{
    use TempAddCSSAddJSForHeadFooter;

    function main()
    {
        if (!session()->get('errors', [])) redirect('/sites');
        $this->view();
        exit();
    }

    private function view()
    {
        self::setResource();
        $title = 'Ошибка';
        include VERSION . '/head.php';
        include MAIN_DIR . '/pay/view/error.php';
        include VERSION . '/footer.php';
    }
}
