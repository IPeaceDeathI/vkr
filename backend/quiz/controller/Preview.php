<?php

namespace Noks\Quiz\Controller;

use Noks\Error\Errors;
use Noks\Model\Quiz;
use Noks\BasicController;

class Preview extends BasicController
{
    public $id_flow;
    public $id_quiz;
    public $data_quiz;

    function __invoke($id_quiz)
    {
        $this->check();
        $this->id_flow = \getCurFlow();
        $this->id_quiz = $id_quiz;
        $this->data_quiz = Quiz::getByIdAndIdFlow($this->id_quiz, $this->id_flow);
        if (!$this->data_quiz) Errors::_404();
        // Quiz::incrementViewsById($this->id_quiz);
        if ($this->data_quiz['quiz_title'] == '') $this->data_quiz['quiz_title'] = 'Пройдите тест';
        // флаг для того чтобы в превьюхе не отправлять данные
        $this->data_quiz['preview-quiz'] = 1;
        $this->view($this->data_quiz);
        exit();
    }

    function check()
    {
    }

    function view($data)
    {

        // addCSS(SITE_URL . 'constructor2/admin/src/assets/fonts/allFonts.css');

        \addCSS(SITE_URL . 'style/fonts/FuturaNew/stylesheet.css');
        \addCSS(MAIN_URL . '/quiz/resource/css/public/main.css');
        \addCSS(MAIN_URL . '/quiz/resource/css/public/q1.css');
        \addCSS(MAIN_URL . '/quiz/resource/css/public/q2.css');

        // addCSS(MAIN_URL . '/quiz/resource/css/public/tw_output_public_quiz.css');
        // ------------------------------------------------
        \addJS(MAIN_URL . '/script/jquery.js');
        \addJS(MAIN_URL . '/script/dev_functions.js');
        \addJS(SITE_URL . 'resource/js/dist/quiz.js');
        include MAIN_DIR . '/quiz/view/public/show.php';
    }
}
