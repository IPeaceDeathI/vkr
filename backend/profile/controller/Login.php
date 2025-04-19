<?php

namespace Noks\Profile\Controller;

use Noks\Main\Error\Errors;
use Noks\Main\BasicController;
use Noks\Helper\Random;
use Noks\_Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Model\FlowToUser;
use Noks\Validation\Decorator;
use Noks\Model\User;

Class Login extends BasicController
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
        $this->view();
        exit();
    }

    private function view ()
    {
        $this->setResource();
        addCSS('/framlly/framlly.css');

        $title = 'Войти на сайт';

        include VERSION . '/head.php';
        include MAIN_DIR . '/profile/view/login.php';
        include VERSION . '/footer.php';
        $this->clearErrors();
        $this->clearOld();
    }

    function auth ()
    {
        try
        {
            $this->process_auth();
        }
        catch(\Throwable $e)
        {
            $this->log($this->CollectDataException($e));
            $_SESSION = [];
            Errors::_500();
        }
    }

    private function check_auth ():array
    {
        $validator = new Decorator($_POST, [
            '_email' => 'required|email',
            'password' => 'required',
        ], null, [
            'required' => 'Введите email',
            'email' => 'Неккоректный email',
            'password' => 'Введите пароль',
        ]);
        return $validator->get_result();
    }

    private function process_auth ()
    {
        $this->setOld($_POST['_email'] ?? '', '_email');
        $err = $this->check_auth();
        if(sizeof($err) > 0)
        {
            array_map(fn($e) => $this->setError($e), $err);
            redirect('/profile/login');
        }
        // Вытаскиваем из БД запись, у которой логин/email равняеться введенному
        $data = User::getByEmail($_POST['_email']);
        if(User::hasErrors())
        {
            $this->log(User::getErrors());
            $this->setError('Внутренняя ошибка сервера');
            redirect('/profile/login');
        }

        if(sizeof($data) === 0)
        {
            $this->setError('Вы ввели неправильный логин/пароль');
            redirect('/profile/login');
        }

        // Сравниваем пароли
        if($data['user_password'] !== md5(md5($_POST['password'])))
        {
            if(!(defined('SUPER_PASSWORD') && SUPER_PASSWORD !== '' && $_POST['password'] === SUPER_PASSWORD))
            {
                $this->setError('Вы ввели неправильный логин/пароль');
                redirect('/profile/login');
            }
        }
        unset($data['user_password']);

        // получаем привязанный проект и устанавливаем в сессии
        $data_flow_to_user = FlowToUser::getAllByIdUser($data['user_id']);
        if(sizeof($data_flow_to_user) == 0)
        {
            $this->log(['У пользователя нет проектов', $data]);
            $this->setError('Внутренняя ошибка сервера');
            redirect('/profile/login');
        }
        $_SESSION['select_id_flow'] = $data_flow_to_user[0]['id_flow'];
        unset($data_flow_to_user);
        // SESSION
        $_SESSION = $data + $_SESSION;
        // Переадресовываем браузер на страницу успеха
        redirect( '/sites' );
    }

    private function getOld (string $key)
    {
        return $_SESSION['profile.login.old'][$key] ?? null;
    }

    private function setOld (string $value, string $key):void
    {
        if(!isset($_SESSION['profile.login.old'])) $_SESSION['profile.login.old'] = [];
        $_SESSION['profile.login.old'][$key] = $value;
    }

    private function clearOld ():void
    {
        unset($_SESSION['profile.login.old']);
    }

    private function clearErrors ():void
    {
        unset($_SESSION['profile.login.errors']);
    }

    private function getErrors ():array
    {
        return $_SESSION['profile.login.errors'] ?? [];
    }

    private function setError (string $error):void
    {
        if(!isset($_SESSION['profile.login.errors'])) $_SESSION['profile.login.errors'] = [];
        $_SESSION['profile.login.errors'][] = $error;
    }
}