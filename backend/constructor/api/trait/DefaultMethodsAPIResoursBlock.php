<?php

namespace Noks\Constructor\API\Trait;

use Noks\Validation\ConstructorAPIBlock as VConstructorAPIBlock;
use Noks\Trait\DefaultMethodsAPIResours;

trait DefaultMethodsAPIResoursBlock
{
    use DefaultMethodsAPIResours;

    private function check()
    {
        $err = VConstructorAPIBlock::existMethod($this->request);
        if ($err) $this->responseError($err);
        $err = VConstructorAPIBlock::check($this->request);
        if ($err) $this->responseError($err);
    }
}
