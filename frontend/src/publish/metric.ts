/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PublishTargetAttributes } from "./target-attributes";
function waitForYm(ymCounterNum: null | number, callback: any, interval = 250) {
    if (!callback) return;

    if (ymCounterNum === null) {
        const metrikaObj =
            //@ts-ignore
            (window.Ya && (window.Ya.Metrika || window.Ya.Metrika2)) || null;

        ymCounterNum =
            (metrikaObj &&
                metrikaObj.counters &&
                (metrikaObj.counters() || [0])[0].id) ||
            null;
    }
    //@ts-ignore
    const ymCounterObj = window["yaCounter" + ymCounterNum] || null;
    if (ymCounterObj !== null)
        return callback(ymCounterObj, ymCounterNum), undefined;
    setTimeout(function () {
        waitForYm(ymCounterNum, callback, interval);
    }, interval);
}

let yandexMetrikaCounter: null | number = null;

waitForYm(null, function (obj: any, counter: number) {
    yandexMetrikaCounter = counter;
});

(
    document.querySelectorAll(
        `[${PublishTargetAttributes.metricsClick}]`
    ) as NodeListOf<HTMLElement>
).forEach((metricEl) => {
    metricEl.addEventListener("click", () => {
        sendGoal(metricEl);
    });
});

export function sendGoal(el: HTMLElement) {
    const goalsArray =
        el.getAttribute(PublishTargetAttributes.metricsClick) ||
        el.getAttribute(PublishTargetAttributes.metricsSend);
    if (goalsArray !== null) {
        try {
            const arr = JSON.parse(goalsArray) as Array<string>;
            arr.forEach((goal) => {
                console.log(goal, "goal");
                if (yandexMetrikaCounter !== null) {
                    ym(yandexMetrikaCounter, "reachGoal", goal);
                } else {
                    console.error("goal send error", goal);
                }
            });
        } catch (error) {
            console.error(error);
            //TODO проверить что отправлетс цель, при нажатии на кнопку с действием "переход на ссылку"
            //TODO отправка ошики на бек
        }
    }
    const goalSend = el.getAttribute(PublishTargetAttributes.metricsSend);
    if (goalSend !== null) {
        try {
            if (yandexMetrikaCounter !== null) {
                ym(yandexMetrikaCounter, "reachGoal", goalSend);
            }
        } catch (error) {
            console.error(error);
            //TODO проверить что отправлетс цель, при нажатии на кнопку с действием "переход на ссылку"
            //TODO отправка ошики на бек
        }
    }
}
// $("[noks-met-click]").on("click.noks", function (event: MouseEvent) {
//     // event.preventDefault();
//     try {
//         const sdffsfsfs: string = event.target.getAttribute("noks-met-click");
//         if (yandexMetrikaCounter !== null) {
//             ym(yandexMetrikaCounter, "reachGoal", sdffsfsfs);
//         }
//     } catch (error) {
//         console.log("form | CATCH: ", error);
//     }
// });
