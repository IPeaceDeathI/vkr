<?php

use Noks\Env;
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="preview-quiz" content="<?= $this->data_quiz['preview-quiz'] ?? '' ?>">
    <?= Env::$params['links_css'] ?>
    <title><?= $this->data_quiz['quiz_title'] ?></title>
</head>

<body>

    <div class="quiz">

        <!-- good bye start -->
        <div data-good-bye style="display:none;">
            <div class="bye">
                <img src="<?= MAIN_URL . '/quiz/resource/img/public/svg/bye.svg' ?>" alt="good bye">
            </div>
        </div>
        <!-- good bye end -->

        <!-- form start -->
        <div data-area-form style="display:none;">
            <div data-title-form></div>
            <div data-other-text-form></div>
            <div class="lead-form">
                <form>
                    <div class="field">
                        <label for="name">ВВЕДИТЕ ВАШЕ ИМЯ</label>
                        <input name="name" autocomplete="off" maxlength="15" placeholder="Имя" type="text">
                    </div>
                    <div class="field">
                        <label for="phone">ВВЕДИТЕ ТЕЛЕФОН</label>
                        <input name="phone" autocomplete="off" placeholder="+7 (900) 000-00-00" required="required" type="tel">
                    </div>

                    <button></button>
                    <label class="agreement">
                        <input type="checkbox" checked="true" required="required">
                        <span class="text-agreement">С Положением об обработке персональных данных и Политикой конфиденциальности ознакомлен и согласен</span>
                    </label>
                </form>
            </div>
        </div>
        <!-- form end -->

        <!-- Ques wrp start -->
        <div class="quiz-ques" style="display:none;">
            <div class="ques-title-quiz"><?= $this->data_quiz['quiz_title'] ?></div>
            <div class="ques-hr"></div>

            <!-- Ques start -->
            <div data-area-ques>
                <div class="ques-title-ques"></div>
                <div class="ques-list-answer"></div>
            </div>
            <!-- Ques end -->

            <!-- footer start -->
            <div class="ques-navbar">
                <div class="wrp-progress">
                    <div class="progress">
                        <div class="label">0%</div>
                        <div class="progress-bar-linear">
                            <span style="width: 0%;"></span>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="btn-prev"></button>
                        <button class="btn-next">Далее</button>
                    </div>
                </div>
            </div>
            <!-- footer end -->

        </div>
        <!-- Ques wrp end -->
    </div>

    <script id="ques" type="application/json">
        <?= $this->data_quiz['quiz_ques'] ?>
    </script>
    <script id="setting" type="application/json">
        <?= $this->data_quiz['quiz_setting'] ?>
    </script>

    <?php unset($this->data_quiz['quiz_ques'], $this->data_quiz['quiz_setting']); ?>

    <script id="info" type="application/json">
        <?= json_encode($this->data_quiz) ?>
    </script>
    <?= Env::$params['links_js'] ?>
</body>

</html>