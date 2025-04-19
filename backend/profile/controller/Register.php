<?php

namespace Noks\Profile\Controller;

use Noks\Main\Error\Errors;
use Noks\Main\BasicController;
use Noks\_Trait\TempAddCSSAddJSForHeadFooter;
use Noks\Validation\Decorator;
use Noks\Model\User;
use Noks\Helper\Random;
use Noks\Model\Flows;
use Noks\Model\FlowToUser;

Class Register extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $user_id = -1;

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

    function register ()
    {
        try
        {
            $this->process_register();
        }
        catch(\Throwable $e)
        {
            $this->log($this->CollectDataException($e));
            Errors::_500();
        }
    }

    private function process_register ()
    {
        $this->setOld(($_POST['_email'] ?? ''), '_email');
        $this->setOld(($_POST['phone'] ?? ''), 'phone');
        // ----------------------------------------------------------------
        $err = $this->check_register();
        if(sizeof($err) > 0)
        {
            array_map(fn($e) => $this->setError($e), $err);
            redirect('/profile/register');
        }
        // ----------------------------------------------------------------
        $data_user = User::getByEmail(trim($_POST['_email']));
        if(User::hasErrors())
        {
            $this->log(User::getErrors());
            Errors::_500();
        }
        if(sizeof($data_user) > 0)
        {
            $this->setError('Пользователь с таким E-mail уже существует');
            redirect('/profile/register');
        }
        unset($data_user);
        // ----------------------------------------------------------------
        $err = [];
        $res_tran = User::commitCallBack(function () use (&$err)
        {
            $this->user_id = User::add([
                'user_email' => $_POST['_email'],
                'user_password' => md5(md5(trim($_POST['password']))),
                'user_ref_code' => strtoupper(Random::generateCode(5)),
                'user_api_secret' => Random::generateCode(32),
                'user_phone' => $_POST['phone'],
            ]);
            if(User::hasErrors())
            {
                $err = User::getErrors();
                $err[] = $this->log($err);
                throw new \Exception();
            }
            if($this->user_id === -1)
            {
                $err[] = 'User::add вернул -1';
                $err[] = $this->log($err);
                throw new \Exception();
            }
            // ----------------------------------------------------------------
            $flow_id = Flows::add([
                'flow_hash' => sha1($this->user_id),
                'flow_uid' => $this->user_id,
                'flow_name' => 'Первый проект',
            ]);
            if(Flows::hasErrors())
            {
                $err = Flows::getErrors();
                $err[] = $this->log(Flows::getErrors());
                throw new \Exception();
            }
            if($flow_id === -1)
            {
                $err[] = 'Flows::add вернул -1';
                $err[] = $this->log($err);
                throw new \Exception();
            }
            // ----------------------------------------------------------------
            # установить связь с проектом и пользователем
            FlowToUser::create($flow_id, $this->user_id);
            if(FlowToUser::hasErrors())
            {
                $err = FlowToUser::getErrors();
                $err[] = $this->log($err);
                throw new \Exception();
            }
        });
        $err = [...$err, ...$res_tran];
        if(sizeof($err) > 0)
        {
            array_map(fn($e) => $this->setError($e), $err);
            redirect('/profile/register');
        }
        // ----------------------------------------------------------------
        $data_user = User::getById($this->user_id);
        if(sizeof($data_user) == 0)
        {
            $this->log($this->user_id);
            $this->setError('Удалось добавить пользователя, но не получилось получить его данные');
            redirect('/profile/register');
        }
        unset($data_user['user_password']);
        // ----------------------------------------------------------------
        // получаем привязанный проект и устанавливаем в сессии
		$data_flow_to_user = FlowToUser::getAllByIdUser($this->user_id);
        if(sizeof($data_flow_to_user) == 0)
        {
            $this->log([$data_user, $this->user_id]);
            $this->setError('Удалось добавить связь с проектом и пользователем, но не получилось получить данные');
            redirect('/profile/register');
        }
        $_SESSION = $data_user;
		$_SESSION['select_id_flow'] = $data_flow_to_user[0]['id_flow'];
		unset($data_flow_to_user);
        // ----------------------------------------------------------------
        // Уведомление в телеграм супер админу
        // $result['tlgrm_register'] = sendNotice('Регистрация #'.$data['user_id'].
        //     PHP_EOL.'Email: '.$data['_email'].
        //     PHP_EOL.'Телефон: '.$data['phone'].
        // '',['uid'=>1]);
        // ----------------------------------------------------------------
        redirect('/profile');
    }

    private function view ()
    {
        $this->setResource();
        addCSS('/framlly/framlly.css');
        addCSS(MAIN_URL . '/profile/resource/css/register.css');
        addJS(MAIN_URL . '/profile/resource/js/register.js');


        $title = 'Регистрация';

        include VERSION . '/head.php';
        include MAIN_DIR . '/profile/view/register.php';
        include VERSION . '/footer.php';
        $this->clearErrors();
        $this->clearOld();
    }

    private function check_register ():array
    {
        $validator = new Decorator($_POST, [
            '_email' => 'required|email|max:35',
            'password' => 'required|min:6|max:35',
            'password_double' => 'required|same:password',
            'phone' => 'required|min:10|max:15',
            'ref_invite' => 'nullable|max:20'# type="hidden"
        ]);
        return $validator->get_result();
    }

    private function getOld (string $key)
    {
        return $_SESSION['profile.register.old'][$key] ?? null;
    }

    private function setOld (string $value, string $key):void
    {
        if(!isset($_SESSION['profile.register.old'])) $_SESSION['profile.register.old'] = [];
        $_SESSION['profile.register.old'][$key] = $value;
    }

    private function clearOld ():void
    {
        unset($_SESSION['profile.register.old']);
    }

    private function clearErrors ():void
    {
        unset($_SESSION['profile.register.errors']);
    }

    private function getErrors ():array
    {
        return $_SESSION['profile.register.errors'] ?? [];
    }

    private function setError (string $error):void
    {
        if(!isset($_SESSION['profile.register.errors'])) $_SESSION['profile.register.errors'] = [];
        $_SESSION['profile.register.errors'][] = $error;
    }
}