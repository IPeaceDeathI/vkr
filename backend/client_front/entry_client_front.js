import { ReplaceURLFrame } from "./App/Quiz/ReplaceURLFrame";
import { SendVisitIDToFrame } from "./App/Quiz/SendVisitIDToFrame";
import { SendSiteInfoToFrame } from "./App/Quiz/SendSiteInfoToFrame";
import { YandexMetrikaCounterGoal } from "./App/Quiz/YandexMetrikaCounterGoal";
import { WaitLoadFrame } from "./App/Quiz/WaitLoadFrame";
import { FindFrames } from "./App/Quiz/FindFrames";

// ------------------------------------------------------------------
// TODO временно
// TODO не успевает получить все куки
// ------------------------------------------------------------------

new ReplaceURLFrame();
console.log("ReplaceURLFrame.complete");

// ------------------------------------------------------------------
// ЦЕЛИ: прием сообщений из iframe квиза
// TODO нужно что-то придумать для локалки
// ------------------------------------------------------------------

if (FindFrames.getCount() > 0) {
    // ------------------------------------------------------------------
    //
    // ------------------------------------------------------------------

    let closure_after_load_quiz = () => {
        // ------------------------------------------------------------------
        // отправляем куку визита в iframe квиза
        // ------------------------------------------------------------------

        new SendVisitIDToFrame();
        console.log("SendVisitIDToFrame.complete");

        // ------------------------------------------------------------------
        // отправляем данные сайта в iframe квиза
        // ------------------------------------------------------------------

        new SendSiteInfoToFrame();
        console.log("SendSiteInfoToFrame.complete");
    };

    // ------------------------------------------------------------------
    //
    // ------------------------------------------------------------------

    window.addEventListener("message", (event) => {
        new YandexMetrikaCounterGoal(event);
        new WaitLoadFrame(event, closure_after_load_quiz);
    });
}
