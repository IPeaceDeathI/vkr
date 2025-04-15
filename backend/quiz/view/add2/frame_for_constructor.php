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
</head>

<body>

    <div class="mt-[1em] mb-0 mx-[3em]">
        <input class="outline-none w-full bg-transparent text-[2em] p-0 rounded-none border-none" type="text" maxlength="100" data-title-quiz placeholder="Заголовок квиза" value="<?= $quiz['quiz_title'] ?? '' ?>">
    </div>

    <div class="flex mt-[2em] mb-0 mx-0">


        <div class="w-[20em]">

            <div class="mx-[1em] my-[1.7em]">
                <a data-quiz-menu-item class="bg-white shadow-[0_5px_8px_rgb(0_0_0_/_15%)] flex items-center text-[1em] text-black whitespace-nowrap cursor-pointer no-underline mb-[1em] px-[1em] py-[0.7em] rounded-[0.5em] hover:bg-[#eee]" href="#ques">
                    Вопросы
                </a>

                <a data-quiz-menu-item class="bg-white shadow-[0_5px_8px_rgb(0_0_0_/_15%)] flex items-center text-[1em] text-black whitespace-nowrap cursor-pointer no-underline mb-[1em] px-[1em] py-[0.7em] rounded-[0.5em] hover:bg-[#eee]" href="#setting">
                    Настройки
                </a>

            </div>

            <div data-save class="text-center cursor-pointer m-[1em] text-[18px] text-[#fff] w-[160px] h-[45px] bg-[linear-gradient(180deg,_#EF7C7C_0%,_#B85757_100%)] rounded-[10px] flex items-center justify-center border-[0] hover:bg-[linear-gradient(180deg,_#ff6c6c_0%,_#c13333_100%)]" data-hash="">
                Сохранить
            </div>
            <?php if (isset($quiz)) : ?>
                <div data-delete class="text-center cursor-pointer m-[1em] text-[18px] text-[#fff] w-[160px] h-[45px] bg-[linear-gradient(180deg,_#EF7C7C_0%,_#B85757_100%)] rounded-[10px] flex items-center justify-center border-[0] hover:bg-[linear-gradient(180deg,_#ff6c6c_0%,_#c13333_100%)]">
                    Удалить
                </div>
            <?php endif; ?>
        </div>


        <!-- middle ques start -->
        <div style="display:none;" data-anchor="#ques" class="w-[60em] relative mb-[2em]">


            <div style="display: none;" data-for-clone data-ques-main-wrp class="relative bg-white shadow-[0_8px_12px_rgb(0_0_0_/_15%)] mx-0 my-6 rounded-[0.5em]">

                <span data-hole-component-add-ques-choice-between class="hidden"></span>


                <div class="absolute flex items-center mr-1 mt-0.5 right-0 top-px">
                    <div data-ques-spoiler class="cursor-pointer w-7 min-w-[28px] h-7 rounded inline-flex justify-center items-center mr-[0.35rem] hover:bg-[rgba(209,57,128,0.1)]" title="свернуть вопрос">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div data-pos-num class="flex items-center justify-center cursor-default text-white bg-[#949494] w-5 h-5 text-center text-xs mr-[0.35rem] rounded-[50%]">0</div>
                    <div data-ques-drag class="cursor-grab w-7 h-7 rounded flex justify-center items-center hover:bg-[rgba(196,196,196,0.1)]" title="перенести вопрос">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400 w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </div>
                </div>
                <input data-title-ques class="outline-none bg-white text-[1.7em] min-w-[90%] px-4 py-2.5 rounded-[0.3em] border-none" type="text" placeholder="Заголовок вопроса...">
                <!-- area-ques start -->
                <span data-hole-component-add-list-type class="hidden"></span>
                <!-- area-ques end -->
                <div data-ques-footer class="bg-[#efefef] rounded-[0_0_4px_4px]">
                    <div class="flex justify-between w-full h-[3em] px-[1em] py-0">
                        <div class="flex items-center">
                            <span data-hole-component-ques-action-setting class="hidden"></span>
                        </div>
                        <div class="flex items-center">
                            <span data-hole-component-ques-hide class="hidden"></span>
                            <span data-hole-component-ques-copy class="hidden"></span>
                            <span data-hole-component-ques-remove class="hidden"></span>
                        </div>
                    </div>
                    <div data-setting-ques class="pt-[0.5em] pb-[1em] px-[1em]" style="display: none;">Настройки</div>
                </div>
            </div>

            <span data-hole-component-add-ques-end class="hidden"></span>
        </div>
        <!-- middle ques end -->


        <!-- middle setting start -->
        <div style="display:none;" data-anchor="#setting" class="w-[60em] relative mb-[2em]">
            <div class="flex justify-between relative bg-white shadow-[0_8px_12px_rgb(0_0_0_/_15%)] m-0 p-[1em] rounded-[0.5em]">
                <div class="w-3/5 mt-[1em] border-solid border-b-0 border-t-0 border-l-0 border-r-[rgba(0,0,0,0.1)] border-r-[2px]">
                    <input class="outline-none text-[1.3em] bg-transparent min-w-[none] p-0 rounded-none border border-solid border-transparent w-[95%] mt-[0.5em] hover:border hover:border-solid hover:border-[#c5b7b7]" type="text" data-area-stg-title placeholder="Заголовок формы...">
                    <br>
                    <input class="outline-none text-[1.3em] bg-transparent min-w-[none] p-0 rounded-none border border-solid border-transparent w-[95%] mt-[0.5em] hover:border hover:border-solid hover:border-[#c5b7b7]" type="text" data-area-stg-desc placeholder="Дополнительный текст формы...">
                    <br>
                    <input class="outline-none text-[1.3em] bg-transparent min-w-[none] p-0 rounded-none border border-solid border-transparent w-[95%] mt-[0.5em] hover:border hover:border-solid hover:border-[#c5b7b7]" type="text" data-area-stg-input-target placeholder="Идентификатор цели... (По умолчанию &quot;form_send&quot;)" maxlength="100">
                </div>
                <div class="w-2/5 ml-[1em] mr-0 mt-[1em] mb-0">

                    <div class="px-[0] py-[4px] flex justify-around items-center">
                        <!-- <div class="action-drag"></div> -->
                        <input class="text-[1.3em] p-0 bg-transparent min-w-[none] inline-flex justify-center items-center pl-[10px] border-[1px] border-solid border-[#dbdada] h-[40px] rounded-[4px]" disabled type="text" placeholder="Иван">
                        <!-- <div class="action-trash"></div> -->
                    </div>

                    <div class="px-[0] py-[4px] flex justify-around items-center">
                        <input class="text-[1.3em] p-0 bg-transparent min-w-[none] inline-flex justify-center items-center pl-[10px] border-[1px] border-solid border-[#dbdada] h-[40px] rounded-[4px]" disabled type="text" placeholder="+7 (900) 000-00-00">
                    </div>

                    <!-- <div class="px-[0] py-[4px] flex justify-around items-center">
                    <input class="text-[1.3em] p-0  bg-transparent min-w-[none] inline-flex justify-center items-center pl-[10px] border-[1px] border-solid border-[#dbdada] h-[40px] rounded-[4px]" disabled type="text" placeholder="mail@example.com">
                </div> -->

                    <input type="text" data-area-stg-btn-title class="outline-none mt-[1em] cursor-auto font-normal border-none flex justify-center items-center text-center px-[24px] py-[12px] rounded-[4px] text-[16px] leading-[20px] text-[#fff] bg-[#EF7C7C] w-full placeholder-[#d8dce5]" placeholder="Получить результат">
                </div>
            </div>
        </div>
        <!-- middle setting end -->


        <!-- middle install start -->
        <?php if (isset($quiz)) : ?>

            <div style="display:none;" data-anchor="#install" class="w-[60em] relative mb-[2em] bg-white shadow-[0_8px_12px_rgb(0_0_0_/_15%)] px-0 py-[1em] rounded-[0.5em]">
                <div class="flex justify-around items-center">
                    <div class="m-[1em]">
                        Код инициализации<br>Вставьте код в блок head в начале страницы<br>
                        <textarea onclick="this.select()" readonly="readonly" class="outline-none border-[1px] border-solid border-[#d2d4d8] w-[30em] h-[20em] text-[0.8em] !bg-[#dbdde0] cursor-default !text-[#000]">&lt;!-- Noks script start --&gt;
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
                        <input class="outline-none cursor-default block w-[20em] h-10 px-3 py-1.5 text-[.875rem] !bg-[#dbdde0] !text-[#000]" onclick="this.select()" readonly="readonly" value="#popup:noksquiz_<?= $quiz['quiz_id'] ?? '' ?>">
                        или атрибут
                        <input class="outline-none cursor-default block w-[20em] h-10 px-3 py-1.5 text-[.875rem] !bg-[#dbdde0] !text-[#000]" onclick="this.select()" readonly="readonly" value='data-noks-quiz-id="<?= $quiz['quiz_id'] ?? '' ?>"'>
                    </div>
                </div>
            </div>
        <?php endif; ?>
        <!-- middle install end -->


        <div class="ml-[2em]">

        </div>



    </div>

    <script id="ques" type="application/json">
        <?= $quiz['quiz_ques'] ?? '' ?>
    </script>
    <script id="setting" type="application/json">
        <?= $quiz['quiz_setting'] ?? '' ?>
    </script>
    <script id="types" type="application/json">
        <?= json_encode($types ?? []) ?>
    </script>
    <script id="data_quiz" type="application/json">
        <?= json_encode($quiz ?? []) ?>
    </script>
    <script src="<?= MAIN_URL ?>/script/dev_functions.js"></script>
    <?= Env::$params['links_js'] ?>
</body>

</html>