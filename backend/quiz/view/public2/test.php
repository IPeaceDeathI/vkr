<?php

use Noks\Env;
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <link rel="shortcut icon" href="<?= SITE_URL ?>images/favicon.blue.png" type="image/x-icon">
    <!-- <script async="" src="//localhost/v0020/quiz/resource/js/public/v0_1.js"></script> -->
    <!-- <script async="" src="//localhost/v0020/quiz/resource/js/public/v0_1.js"></script> -->
</head>

<body>
    <a href="#popup:noksquiz_20">ссылка 2</a>
    <span data-noks-quiz-id="20">span</span>

    <script src="/config.js"></script>
    <script>
        (function(w, d, s) {
            var j = d.createElement(s);
            j.async = true;
            j.src =
                "//" + window.site_domain + "/v0020/quiz/resource/js/public/v0_1.js";
            j.onload = function() {
                if (document.readyState !== "loading") NoksQuiz.init();
                else
                    document.addEventListener("DOMContentLoaded", function() {
                        NoksQuiz.init();
                    });
            };
            d.head.insertBefore(j, d.head.firstElementChild);
        })(window, document, "script");

        (function(w, d, s) {
            var j = d.createElement(s);
            j.async = true;
            j.src =
                "//" + window.site_domain + "/v0020/quiz/resource/js/public/v0_1.js";
            j.onload = function() {
                if (document.readyState !== "loading") NoksQuiz.init();
                else
                    document.addEventListener("DOMContentLoaded", function() {
                        NoksQuiz.init();
                    });
            };
            d.head.insertBefore(j, d.head.firstElementChild);
        })(window, document, "script");
    </script>

</body>

</html>