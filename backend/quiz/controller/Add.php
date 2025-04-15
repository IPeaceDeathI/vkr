<?php

namespace Noks\Quiz\Controller;

use Noks\CachedModel\QuizType;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;

class Add
{
    use TempAddCSSAddJSForHeadFooter;

    /**
     * флаг для отображения минимального вида
     */
    private $frame = false;

    function main($frame = null)
    {
        if ($frame == 'frame') $this->frame = true;
        $types = QuizType::getAll();
        if ($this->frame) $this->frame($types);
        else $this->view($types);
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

        addJS(SITE_URL . 'resource/js/jquery-confirm.min.js');
    }


    /**
     * вид для конструктора
     */
    private function frame($types)
    {
        $this->resource2();
        include MAIN_DIR . '/quiz/view/add2/frame_for_constructor.php';
    }

    private function view($types)
    {
        $title = 'Добавить квиз';
        $this->resource2();
        include MAIN_DIR . '/head.php';
        include MAIN_DIR . '/quiz/view/add2/add.php';
        include MAIN_DIR . '/footer.php';
    }
}
