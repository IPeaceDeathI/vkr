<?php

namespace Noks\Profile\Controller;

use Noks\Error\Errors;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
// ------------------------------------------------------------------
// Model
// ------------------------------------------------------------------
use Noks\Model\UserModel;

/**
 * Сюда переходят из письма
 * TODO обновить под новый дизайн
 */
class RespawnReplaceProfile
{
    use TempAddCSSAddJSForHeadFooter;

    protected array $request;
    protected string $method;
    protected bool $flag_success = false;

    public function __invoke(): void
    {
        try {
            $this->request = $_GET + $_POST;
            $this->method = \getRequestMethod();
            $this->process_main();
        } catch (\Throwable $e) {
            \_writeLog($e);
            Errors::_500();
        }
    }

    // ------------------------------------------------------------------
    // protected
    // ------------------------------------------------------------------

    protected function check_get(): void
    {
        $v = \validation($this->request, [
            '_email'  => 'required|email',
            'confirm' => 'required|max:16|min:16',
        ]);
        $err = $v->getErrors();
        if ($err) {
            \_writeLog(['$err' => $err, '$this->request' => $this->request], \__ALL());
            Errors::_404();
        }
        $this->request = $v->getValidData();
    }

    protected function check_post(): void
    {
        $v = \validation($this->request, [
            '_email'          => 'required|email',
            'password'        => 'required',
            'password_double' => 'required|same:password',
            'confirm'         => 'required|max:16|min:16',
        ]);
        $err = $v->getErrors();
        if ($err) {
            \_writeLog(['$err' => $err, '$this->request' => $this->request], \__ALL());
            Errors::_404();
        }
        $this->request = $v->getValidData();
    }

    protected function process_main(): void
    {
        if ($this->method === 'POST') {
            $this->check_post();
            $data_user = $this->process_post();
        } elseif ($this->method === 'GET') {
            $this->check_get();
            $data_user = $this->process_get();
        }

        $this->view_respawn($data_user);
        exit();
    }

    protected function process_get(): array
    {
        $data_user = UserModel::self()->getByEmail($this->request['_email']);
        if (!$data_user) {
            \_writeLog(['$this->request' => $this->request], \__ALL());
            Errors::_404();
        }
        if (!$this->comparison($data_user['user_password'])) {
            \_writeLog(['$data_user' => $data_user, '$this->request' => $this->request], \__ALL());
            Errors::_404();
        }
        return $data_user;
    }

    protected function process_post(): array
    {
        $data_user = UserModel::self()->getByEmail($this->request['_email']);
        if (!$data_user) {
            \_writeLog(['$this->request' => $this->request], \__ALL());
            Errors::_404();
        }
        if (!$this->comparison($data_user['user_password'])) {
            \_writeLog(['$data_user' => $data_user, '$this->request' => $this->request], \__ALL());
            Errors::_404();
        }
        // меняем пароль
        UserModel::self()->updateByID($data_user['user_id'], [
            'user_password' => \md5(\md5($this->request['password'])),
        ]);
        if (UserModel::hasErrors()) Errors::_500();
        $this->flag_success = true;
        return $data_user;
    }

    protected function comparison(string $pass): bool
    {
        $back_confirm = \substr($pass, 6, 16);
        return $back_confirm === $this->request['confirm'];
    }

    protected function view_respawn(array $data_user): void
    {
        $this->setResource();
        \addCSS('/framlly/framlly.css');
        \addCSS(MAIN_URL . '/profile/resource/css/respawn.css');

        echo \obStartGetClean(function () use ($data_user) {
            $title = 'Восстановление пароля';
            // head.php требует title
            include VERSION . '/head.php';
            \view('profile/respawn_replace_html.php', [
                'flag_success' => $this->flag_success,
                'data_user'    => $data_user,
                'title'        => $title,
            ]);
            include VERSION . '/footer.php';
        });
    }
}
