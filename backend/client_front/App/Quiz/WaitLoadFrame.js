import { isJSONAsObject } from "./../../../../vendor/inilim/js_type_string/src/JSON";
import { FindFrames } from "../Quiz/FindFrames";
import { SendMessageToFrame } from "../Quiz/SendMessageToFrame";

/**
 * ловим сообщение что квизы были загружены
 */
export class WaitLoadFrame {
    static load_counter = 0;
    static arr_hash = [];

    constructor(event, closure_after_load_quiz) {
        if (event.origin !== "https://landing-page.su") {
            console.log("WaitLoadFrame.bad.origin", event);
            return;
        }

        // ------------------------------------------------------------------
        //
        // ------------------------------------------------------------------

        try {
            let incoming_data = event.data;

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            if (!isJSONAsObject(incoming_data)) {
                console.log(
                    "WaitLoadFrame.bad.incoming_data",
                    event.origin,
                    incoming_data
                );
                return;
            }
            incoming_data = JSON.parse(incoming_data);

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            if (incoming_data.type !== "quiz_load") {
                // console.log(
                //     "WaitLoadFrame.bad.incoming_data.type",
                //     event.origin,
                //     incoming_data
                // );
                return;
            }

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            if (!incoming_data.hash || incoming_data.hash === "") {
                console.log(
                    "WaitLoadFrame.bad.incoming_data.hash",
                    event.origin,
                    incoming_data
                );
                return;
            }

            // ------------------------------------------------------------------
            // INFO отпрявляем квизу сообщение что мы его слышим
            // ------------------------------------------------------------------

            FindFrames.find().forEach((el) => {
                SendMessageToFrame.send(el, {
                    type: "parent_complete",
                    hash: incoming_data.hash,
                });
            });

            console.log("WaitLoadFrame.call.quiz.hash:", incoming_data.hash);

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            WaitLoadFrame.arr_hash.push(incoming_data.hash);
            // фильтруем на уникальность
            WaitLoadFrame.arr_hash = WaitLoadFrame.arr_hash.filter(function (
                value,
                index,
                array
            ) {
                return array.indexOf(value) === index;
            });

            // ------------------------------------------------------------------
            //
            // ------------------------------------------------------------------

            WaitLoadFrame.load_counter = WaitLoadFrame.arr_hash.length;

            let count = FindFrames.getCount();
            if (count > 0 && WaitLoadFrame.load_counter === count) {
                console.log("WaitLoadFrame.run.closure_after_load_quiz");
                // чистим
                WaitLoadFrame.arr_hash = [];
                WaitLoadFrame.load_counter = 0;
                // запускаем отправку данных во фреймы квиза
                closure_after_load_quiz();
            }
        } catch (e) {
            console.log(
                "WaitLoadFrame.exception",
                e,
                event.origin,
                incoming_data
            );
        }
    }
}
