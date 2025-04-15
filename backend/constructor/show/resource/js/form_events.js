//metrika
/** Ожидание загрузки счетчика Яндекс.Метрики
 * @param {?(number|string)} ymCounterNum - номер счетчика, если известен
 * @param {function} callback - получает аргументами объект и номер счетчика
 * @param {number} interval - интервал проверки готовности счетчика
 */
function waitForYm(ymCounterNum, callback, interval) {
    if (!callback) return;
    if (!ymCounterNum) {
        let metrikaObj =
            (window.Ya && (window.Ya.Metrika || window.Ya.Metrika2)) || null;
        ymCounterNum =
            (metrikaObj &&
                metrikaObj.counters &&
                (metrikaObj.counters() || [0])[0].id) ||
            0;
    }
    let ymCounterObj = window["yaCounter" + ymCounterNum] || null;
    if (ymCounterObj) return callback(ymCounterObj, ymCounterNum), undefined;
    setTimeout(function () {
        waitForYm(ymCounterNum, callback, interval);
    }, interval || 250);
}
$(document).ready(function () {
    $(document).tooltip();
});

function send_lead(e) {
    const form = e.target.closest("form");
    const formData = new FormData(form);
    formData.append("id_form", form.getAttribute("noks-form-id"));
    formData.append("url_client", document.URL);
    formData.append("id_page", getMetaIdPage());
    formData.append("id_site", getMetaIdSite());

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("loadend", () => {
        const href = e.target.getAttribute("href");
        if (href && href !== "") window.location.href = href;
    });
    xhr.open(
        "POST",
        `//${window.site_domain ?? "landing-page.su"}/form/api/save/lead`
    );
    xhr.send(formData);
}

let yandexMetrikaCounter = null;

waitForYm(null, function (obj, counter) {
    yandexMetrikaCounter = counter;
});

//quiz
(function (w, d, s) {
    var j = d.createElement(s);
    j.async = true;
    j.src =
        "//" + window.site_domain + "/v0020/quiz/resource/js/public/v0_1.js";
    j.onload = function () {
        if (document.readyState !== "loading") NoksQuiz.init();
        else
            document.addEventListener("DOMContentLoaded", function () {
                NoksQuiz.init();
            });
    };
    d.head.insertBefore(j, d.head.firstElementChild);
})(window, document, "script");

//forms
function validateform(e) {
    try {
        const form = $(e.target.closest("form"));
        let errors = 0;
        form.find("input").each(function () {
            const input = $(this);
            input.removeAttr("data-required-validation");
            if (input.attr("required") && !input.val()) {
                input.attr("data-required-validation", "");
                input.attr("title", "Заполните поле");
                errors++;
            }
        });

        return errors === 0;
    } catch (error) {
        console.error("form_valided", error);
        return false;
    }
}
$('[href^="#popupnoksgeneratedform_"]').modaal();
$("[noks-met-form-button]").on("click.noks", function (event) {
    event.preventDefault();

    if (!validateform(event)) {
        return;
    }
    try {
        send_lead(event);
    } catch {}
    try {
        var sdffsfsfs = event.target
            .closest("form")
            .getAttribute("noks-metric-send-form");
        if (yandexMetrikaCounter) {
            ym(yandexMetrikaCounter, "reachGoal", sdffsfsfs);
            // console.log("form | send: ", sdffsfsfs);
        } else {
            // console.log("form | undefine: ", yandexMetrikaCounter, sdffsfsfs);
        }
    } catch (error) {
        console.log("form | CATCH: ", error);
    }
    if ($("#modaal-close").length) $("#modaal-close").trigger("click");
});

$("[noks-met-click]").on("click.noks", function (event) {
    // event.preventDefault();
    try {
        var sdffsfsfs = event.target.getAttribute("noks-met-click");
        console.log($(this).attr("noks-met-click"));
        console.log(sdffsfsfs);
        if (yandexMetrikaCounter) {
            ym(yandexMetrikaCounter, "reachGoal", sdffsfsfs);
        }
    } catch (error) {
        console.log("form | CATCH: ", error);
    }
});
$("[data-donatello-form-slider-target]")
    .on("input", function () {
        $(this).siblings("input").val($(this).val());
    })
    .each((index, element) => {
        $(element).val(
            !isNaN(
                parseInt($(element).attr("data-donatello-form-slider-def-val"))
            )
                ? parseInt(
                      $(element).attr("data-donatello-form-slider-def-val")
                  )
                : parseInt($(element).attr("min"))
        );
        $(element).trigger("input");
    });
$("[data-donatello-form-slider-target]")
    .siblings("input")
    .on("input", function () {
        $(this).siblings("input").val($(this).val());
    });
$(document).ready(function () {
    $("input[type='tel']").mask("+7(999) 999-99-99");
});
// Активити
try {
    execActiveActivity();
} catch (e) {
    console.log("execActiveActivity: ", e);
}
