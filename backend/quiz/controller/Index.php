<?php

namespace Noks\Quiz\Controller;

use Noks\Model\Quiz;
use Noks\Model\QuizResult;
use Noks\Trait\TempAddCSSAddJSForHeadFooter;

class Index
{
    use TempAddCSSAddJSForHeadFooter;

    private int $id_flow;

    public function main(): void
    {
        $this->id_flow = getCurrentFlow();
        // берем все квизы
        $quizs = Quiz::getAllByIdFlow($this->id_flow);
        // получаем количество заявок по каждому квизу
        $res = QuizResult::getCountDistinctIdLeadByIdQuizs(
            array_column($quizs, 'quiz_id')
        );
        $count_lead = array_combine(
            array_column($res, 'result_quiz_id'),
            array_column($res, 'count_lead')
        );
        unset($res);
        $this->view($quizs, $count_lead);
        exit();
    }

    private function view($quizs, $count_lead)
    {
        $title = 'Квизы';
        self::setResource();
        addCSS(MAIN_URL . '/quiz/resource/css/main/main.css');
        include MAIN_DIR . '/head.php';
        include MAIN_DIR . '/quiz/view/main/index.php';
        include MAIN_DIR . '/footer.php';
    }
}
