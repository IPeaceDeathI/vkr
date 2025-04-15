<?php

use Noks\Env;
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <?php
    addCSS(SITE_URL . 'style/fonts/OpenSans/stylesheet.css');
    ?>
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <meta http-equiv=Content-Type content="text/html;charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="id-flow" content="<?= getCurrentFlow() ?>">
    <meta name="theme-color" content="#0c2556">
    <?= Env::$params['links_css'] ?>
    <style>
        .add-ques-end::before,
        .q-choice-between::before {
            right: 20px;
        }

        .add-ques-end::after,
        .q-choice-between::after {
            width: 98%;
        }

        .title-quiz {
            margin: 1em 3em 0 1em;
        }

        .wrapper-add {
            flex-direction: column;
            margin: 0;
        }

        .quiz_menu {
            display: flex;
            margin: 1.7em 1em;
        }

        .quiz_menu .item {
            margin: 0 1em 0 0;
        }

        .wrapper-add .middle {
            width: auto;
            margin-left: 1em;
        }
    </style>
</head>

<body>

    <div class="title-quiz">
        <input type="text" maxlength="100" data-title-quiz placeholder="Заголовок квиза" value="<?= $quiz['quiz_title'] ?? '' ?>">
    </div>

    <div class="wrapper-add">


        <div class="left">

            <div class="quiz_menu">
                <a class="item" href="#ques">
                    Вопросы
                </a>

                <a class="item" href="#setting">
                    Настройки
                </a>

                <?php if (isset($quiz)) : ?>
                    <a class="item" href="#install" style="display: none;">
                        Установка квиза
                    </a>
                <?php endif; ?>

            </div>

            <div data-id="hiden_save_button" data-save class="btn-action" data-hash="" style="display: none;">
            </div>

        </div>


        <!-- middle ques start -->
        <div style="display:none;" data-anchor="#ques" class="middle">


            <div style="display: none;" data-for-clone data-ques-main-wrp class="q-wrapper-question">
                <div title="Добавить вопрос" class="q-choice-between"></div>
                <div class="q-top-actions">
                    <div class="q-action q-spoiler" title="свернуть вопрос"></div>
                    <div data-pos-num class="q-position">0</div>
                    <div class="q-drag" title="перенести вопрос"></div>
                </div>
                <input data-title-ques class="q-input" type="text" placeholder="Заголовок вопроса...">
                <!-- area-ques start -->
                <div data-ques-type-id data-ques-wrp class="q-list-types">
                    <?php foreach ($types as $type) : ?>

                        <div data-type="<?= $type['type_id'] ?>" class="q-type">
                            <div class="q-icon">
                                <img src="<?= MAIN_URL ?>/quiz/resource/img/svg/<?= $type['type_id'] ?>.svg">
                            </div>
                            <div class="q-name"><?= $type['type_name'] ?></div>
                        </div>

                    <?php endforeach; ?>
                </div>
                <!-- area-ques end -->
                <div class="q-footer">
                    <div class="q-wrp-actions">
                        <div class="q-left-actions">
                            <div class="q-action q-setting"></div>
                            <!-- <div class="q-action q-help"></div> -->
                        </div>
                        <div class="q-right-actions">
                            <div data-hide-ques="0" class="q-action q-hidden" title="скрыть вопрос"></div>
                            <div class="q-action q-copy" title="копировать вопрос"></div>
                            <div class="q-action q-trash" title="удалить вопрос"></div>
                        </div>
                    </div>
                    <div data-setting-ques class="q-area-setting" style="display: none;">Настройки</div>
                </div>
            </div>






            <div title="Добавить вопрос в конец" class="add-ques-end"></div>
        </div>
        <!-- middle ques end -->


        <!-- middle setting start -->
        <div style="display:none;" data-anchor="#setting" class="middle">
            <div class="area-stg-wrp">
                <div class="area-stg-left">
                    <input type="text" data-area-stg-title placeholder="Заголовок формы...">
                    <br>
                    <input type="text" data-area-stg-desc placeholder="Дополнительный текст формы...">
                    <br>
                    <input type="text" data-area-stg-input-target placeholder="Идентификатор цели... (По умолчанию &quot;form_send&quot;)" maxlength="100">
                </div>
                <div class="area-stg-right">

                    <div class="area-stg-r-item">
                        <!-- <div class="action-drag"></div> -->
                        <input disabled type="text" class="action-stg" placeholder="Иван">
                        <!-- <div class="action-trash"></div> -->
                    </div>

                    <div class="area-stg-r-item">
                        <input disabled type="text" class="action-stg" placeholder="+7 (900) 000-00-00">
                    </div>

                    <!-- <div class="area-stg-r-item">
                        <input disabled type="text" class="action-stg" placeholder="mail@example.com">
                    </div> -->

                    <input type="text" data-area-stg-btn-title class="btn" placeholder="Получить результат">
                </div>
            </div>
        </div>
        <!-- middle setting end -->


        <!-- middle install start -->
        <?php if (isset($quiz)) : ?>

            <div style="display:none;" data-anchor="#install" class="middle">
                <div class="wrp-install">
                    <div>
                        Код инициализации<br>Вставьте код в блок head в начале страницы<br>
                        <textarea onclick="this.select()" readonly="readonly" class="txt-install">&lt;!-- Noks script start --&gt;
    &lt;script&gt;
    (function(w, d, s)
    {
        var j = d.createElement(s);
        j.async = true;
        j.src = '//<?= SITE_DOMAIN ?>/<?= VERSION ?>/quiz/resource/js/public/v0_1.js';
        j.onload = function()
        {
            if (document.readyState !== 'loading') NoksQuiz.init();
            else document.addEventListener("DOMContentLoaded", function()
            {
                NoksQuiz.init();
            });
        };
        d.head.insertBefore(j, d.head.firstElementChild);
    })(window, document, 'script');
    &lt;/script&gt;
    &lt;!-- Noks script end --&gt;</textarea>
                    </div>
                    <div>
                        Укажите у вашей кнопки ссылку
                        <input onclick="this.select()" readonly="readonly" value="#popup:noksquiz_<?= $quiz['quiz_id'] ?? '' ?>">
                        или атрибут
                        <input onclick="this.select()" readonly="readonly" value='data-noks-quiz-id="<?= $quiz['quiz_id'] ?? '' ?>"'>
                    </div>
                </div>
            </div>
        <?php endif; ?>
        <!-- middle install end -->


        <div class="right">

        </div>



    </div>

    <script id="ques" type="application/json">
        <?= $quiz['quiz_ques'] ?? '' ?>
    </script>
    <script id="setting" type="application/json">
        <?= $quiz['quiz_setting'] ?? '' ?>
    </script>
    <script src="<?= MAIN_URL ?>/script/dev_functions.js"></script>
    <?= Env::$params['links_js'] ?>
</body>

</html>