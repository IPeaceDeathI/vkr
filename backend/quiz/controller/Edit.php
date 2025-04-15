<?php

namespace Noks\Quiz\Controller;

use Noks\Error\Errors;
use Noks\Model\Quiz;
use Noks\Model\QuizType;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;
use Noks\BasicController;

class Edit extends BasicController
{
    use TempAddCSSAddJSForHeadFooter;

    private $id_flow;
    private $id_quiz;
    /**
     * флаг для отображения минимального вида
     */
    private $frame = false;

    function main($id_quiz, $frame = null)
    {
        try {
            $this->id_flow = getCurrentFlow();
            $this->id_quiz = $id_quiz;
            $this->process($frame);
        } catch (\Throwable $e) {
            _writeLog(($e));
            Errors::_500();
        }
    }

    function process($frame = null)
    {
        if ($frame == 'frame') $this->frame = true;

        $quiz = Quiz::getByIdAndIdFlow($this->id_quiz, $this->id_flow);
        if (!$quiz) Errors::_404();
        $types = QuizType::getInstance()->getAll();

        if ($this->frame) $this->frame($quiz, $types);
        else $this->view($quiz, $types);

        exit();
    }

    private function resource2()
    {
        self::setResource();
        addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');
        addCSS(MAIN_URL . '/quiz/resource/css/edit/tw_output_edit_quiz.css');

        addJS(SITE_URL . 'resource/js/dist/edit_quiz.js');
        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
    }

    private function resource()
    {
        self::setResource();
        addCSS(MAIN_URL . '/quiz/resource/css/edit/add.css');
        addCSS(MAIN_URL . '/quiz/resource/css/edit/setting.css');
        addCSS(MAIN_URL . '/quiz/resource/css/edit/install.css');

        addCSS(SITE_URL . 'resource/css/jquery-confirm.min.css');

        addJS(MAIN_URL . '/quiz/resource/js/edit/EnumTypeQues.js');
        addJS(MAIN_URL . '/quiz/resource/js/edit/add.js');
        addJS(MAIN_URL . '/quiz/resource/js/edit/menu.js');
        addJS(MAIN_URL . '/quiz/resource/js/edit/q1.js');
        addJS(MAIN_URL . '/quiz/resource/js/edit/q2.js');
        addJS(MAIN_URL . '/quiz/resource/js/edit/setting.js');
        addJS(MAIN_URL . '/quiz/resource/js/edit/edit.js');

        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
    }

    private function view($quiz, $types)
    {
        $title = 'Редактировать квиз';
        $this->resource2();
        include MAIN_DIR . '/head.php';
        include MAIN_DIR . '/quiz/view/add2/add.php';
        include MAIN_DIR . '/footer.php';
    }

    /**
     * вид для конструктора
     */
    private function frame($quiz, $types)
    {
        $this->resource2();
        include MAIN_DIR . '/quiz/view/add2/frame_for_constructor.php';
    }
}
