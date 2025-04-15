<?php

namespace Noks\RESTAPI;

use Noks\Model\ConstructorBlockCategories as MConstructorBlockCategories;
use Noks\Trait\DefaultMethodsAPIResours;
use Noks\Validation\Decorator;

class Categories
{
    use DefaultMethodsAPIResours;
    private $request;

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // index
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    function index()
    {
        try {
            $this->setRequest();
            $this->responseSuccess($this->process_index());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function process_index()
    {
        $data = MConstructorBlockCategories::getInstance()->getAllCategories();
        if (MConstructorBlockCategories::hasErrors()) $this->responseError(MConstructorBlockCategories::getErrors());
        return $data;
    }

    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // STORE
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------
    // ------------------------------------------------------------------

    function store()
    {
        try {
            $this->setRequest();
            $this->responseSuccess($this->process_store());
        } catch (\Throwable $e) {
            $code = _writeLog($e);
            $this->responseError([get_class($e), $code]);
        }
    }

    private function check_store()
    {
        if (!userAuthAsAdmin()) $this->responseError(['Вы не можете добавлять категории']);
        $v = new Decorator($this->request, [
            'category_name' => 'required|min:1|max:50',
        ]);
        $err = $v->getErrors();
        if ($err) $this->responseError($err);
        $this->request = $v->getValidData();
    }

    private function process_store()
    {
        $this->check_store();
        MConstructorBlockCategories::getInstance()->create($this->request['category_name']);
        if (MConstructorBlockCategories::hasErrors()) $this->responseError(MConstructorBlockCategories::getErrors());
        return true;
    }
}
