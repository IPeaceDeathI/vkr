<?php

namespace Noks\Quiz\Controller;

use Noks\Error\Errors;
use Noks\Model\Quiz;

class Show
{
    public $id_quiz;
    public $data_quiz;

    function __invoke($id_quiz)
    {
        $this->id_quiz = $id_quiz;
        $this->data_quiz = Quiz::getById($this->id_quiz);
        if (!$this->data_quiz) Errors::_404();
        Quiz::incrementViewsById($this->id_quiz);
        if ($this->data_quiz['quiz_title'] == '') {
            $this->data_quiz['quiz_title'] = 'Пройдите тест';
        }
        $this->view();
        exit();
    }

    function view()
    {
        \addCSS(MAIN_URL . '/quiz/resource/css/public/main.css');
        \addCSS(MAIN_URL . '/quiz/resource/css/public/q1.css');
        \addCSS(MAIN_URL . '/quiz/resource/css/public/q2.css');
        \addCSS(SITE_URL . 'style/fonts/FuturaNew/stylesheet.css');

        // addCSS(MAIN_URL . '/quiz/resource/css/public/tw_output_public_quiz.css');
        // ------------------------------------------------
        \addJS(MAIN_URL . '/script/jquery.js');
        \addJS(SITE_URL . 'resource/js/general_functions.js');
        \addJS(MAIN_URL . '/script/dev_functions.js');
        \addJS(SITE_URL . 'resource/js/dist/quiz.js');
        include MAIN_DIR . '/quiz/view/public/show.php';
    }
}
