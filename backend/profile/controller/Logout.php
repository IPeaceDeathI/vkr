<?php

namespace Noks\Profile\Controller;

use Noks\Main\Error\Errors;
use Noks\Main\BasicController;
use Noks\_Trait\TempAddCSSAddJSForHeadFooter;

Class Logout extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    function main ()
    {
        try
        {
            $this->process_main();
        }
        catch(\Throwable $e)
        {
            $this->log($this->CollectDataException($e));
            Errors::_500();
        }
    }

    private function process_main ()
    {
        // Удаляем куки
        setcookie(SITE_LOGIN."_id", "", time() - 3600*24*30*12, "/");
        setcookie(SITE_LOGIN."_hash", "", time() - 3600*24*30*12, "/",null,null,true); // httponly !!!
        session_unset();
        session_destroy();
        // Переадресовываем браузер на страницу проверки нашего скрипта
        redirect('/');
    }
}