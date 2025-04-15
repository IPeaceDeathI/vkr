import { isJSONAsObject } from "./../../../../vendor/inilim/js_type_string/src/JSON";

/**
 * ловим цели из фрейма квиза для яндекс метрики
 */
export class YandexMetrikaCounterGoal {
    constructor(event) {
        if (event.origin !== "https://landing-page.su") {
            console.log("YandexMetrikaCounterGoal.bad.origin", event);
            return;
        }

        try {
            let incoming_data = event.data;

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            if (!isJSONAsObject(incoming_data)) {
                console.log(
                    "YandexMetrikaCounterGoal.bad.incoming_data",
                    event.origin,
                    incoming_data
                );
                return;
            }
            incoming_data = JSON.parse(incoming_data);

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            if (incoming_data.type !== "quiz_goal") {
                // console.log(
                //     "YandexMetrikaCounterGoal.bad.incoming_data.type",
                //     event.origin,
                //     incoming_data
                // );
                return;
            }

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            incoming_data.target_id = incoming_data.target_id ?? "";

            if (incoming_data.target_id === "") {
                console.log(
                    "YandexMetrikaCounterGoal.empty.target_id",
                    event.origin,
                    incoming_data
                );
                return;
            }

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            if (window.yandexMetrikaCounter) {
                window.ym(
                    window.yandexMetrikaCounter,
                    "reachGoal",
                    incoming_data.target_id
                );
            } else {
                console.log(
                    "YandexMetrikaCounterGoal.not_found.yandexMetrikaCounter",
                    event.origin,
                    incoming_data
                );
            }
        } catch (e) {
            console.log(
                "YandexMetrikaCounterGoal.exception",
                e,
                event.origin,
                incoming_data
            );
        }
    }
}
