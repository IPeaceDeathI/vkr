<?php

namespace Noks\Profile\Controller;

use Noks\Error\Errors;

class Logout
{
    public function __invoke(): void
    {
        try {
            \session()->destroy();
            \redirect(\getStartURL());
        } catch (\Throwable $e) {
            \_writeLog($e);
            Errors::_500();
        }
    }
}
