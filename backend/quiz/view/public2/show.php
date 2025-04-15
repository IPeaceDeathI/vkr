<?php

use Noks\Env;
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta name="preview-quiz" content="<?= $this->data_quiz['preview-quiz'] ?? '' ?>">
    <?= Env::$params['links_css'] ?>
    <title><?= $this->data_quiz['quiz_title'] ?></title>
</head>

<body>

    <div class=" box-border min-h-[570px] flex-nowrap rounded shadow-[0_7px_15px_0_rgb(0_0_0_/_15%)] overflow-x-hidden relative mx-auto my-0">

        <!-- good bye start -->
        <div data-good-bye class="h-screen" style="display:none;">
            <div class="flex items-center h-full justify-center select-none">
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
                        <input name="phone" autocomplete="off" maxlength="20" placeholder="+7 (900) 000-00-00" required="required" type="tel">
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

        <!-- Ques area start -->
        <span data-hole-component-area-ques class="hidden"></span>
        <!-- Ques area end -->
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