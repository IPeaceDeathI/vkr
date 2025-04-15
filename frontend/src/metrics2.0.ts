// import { boolean, string } from "zod";

// function getScriptHandle(id: number): HTMLScriptElement | null {
//     let current = null;
//     const body = document.querySelector("body");
//     const elem_list = body?.querySelectorAll("script");
//     elem_list?.forEach(function (el: HTMLScriptElement) {
//         if (el.innerHTML.includes("getScriptHandle(" + id + ")")) {
//             current = el; //TODO $(el) without jquerry
//             return;
//         }
//     });
//     return current;
// }

// const NoksActiveScore = {
//     /* Настройки которые надо менять */
//     need: 120, // секунды
//     checkTime: 10, // секунды. период проверки
//     loop: true, // Повторять набор?
//     target_name: "activity", // идентификатор цели
//     /* Настройки которые надо менять */
//     counter: 0,
//     cookieName: "60sec_ap",
//     parts: 0,
//     active_parts: 0,
//     timer: 0,
//     events: [
//         "touchmove",
//         "blur",
//         "focus",
//         "focusin",
//         "focusout",
//         "load",
//         "resize",
//         "scroll",
//         "unload",
//         "click",
//         "dblclick",
//         "mousedown",
//         "mouseup",
//         "mousemove",
//         "mouseover",
//         "mouseout",
//         "mouseenter",
//         "mouseleave",
//         "change",
//         "select",
//         "submit",
//         "keydown",
//         "keypress",
//         "keyup",
//         "error",
//     ],

//     period: {
//         start: 0,
//         end: 0,
//         events: false,
//     },

//     timeoutId: 0,

//     setEvents: function () {
//         for (let index = 0; index < this.events.length; index++) {
//             const eName = this.events[index];
//             window.addEventListener(eName, function (e) {
//                 if (e.isTrusted && NoksActiveScore.period.events == false) {
//                     NoksActiveScore.period.events = true;
//                 }
//             });
//         }
//     },

//     init: function (settings: any) {
//         // устанавливаем настройки
//         this.need = settings.need ?? this.need;
//         this.checkTime = settings.checkTime ?? this.checkTime;
//         this.loop = settings.loop ?? this.loop;
//         this.target_name = settings.target_name ?? this.target_name;
//         // запускаем
//         this.calcParts();
//         this.setEvents();
//         if (this.checkCookie()) {
//             this.start();
//         }
//     },

//     calcParts: function () {
//         this.parts = Math.ceil(this.need / this.checkTime);
//     },

//     setPeriod: function () {
//         this.period.start = this.microtime();
//         this.period.end = this.period.start + this.checkTime;
//         this.period.events = false;
//     },

//     microtime: function () {
//         const now = new Date().getTime() / 1000;
//         // const s = parseInt(now);
//         return now; //Math.round(now)
//     },

//     start: function () {
//         this.setPeriod();
//         this.runPeriod();
//     },

//     checkPeriod: function () {
//         if (this.period.events == true) {
//             this.active_parts = this.active_parts + 1;
//             // console.log('В этой секции были действия');
//         } else {
//             // console.log('В этой секции НЕБЫЛО действия');
//         }
//         this.timer = this.active_parts * this.checkTime;
//         console.log(
//             this.active_parts + " / " + this.parts + " [" + this.timer + "]"
//         );

//         if (!this.checkSecs()) {
//             this.start();
//         }
//         this.setCookie(this.cookieName, this.active_parts);
//         // if (this.checkSecs()) {
//         // } else {
//         //     this.start();
//         // }
//         // this.setCookie(this.cookieName, this.active_parts);
//     },

//     checkSecs: function () {
//         if (this.timer >= this.need) {
//             this.send();
//             if (this.loop == true) {
//                 this.counter++;
//                 this.timer = 0;
//                 this.active_parts = 0;
//                 this.cookieName = (this.counter + 1) * this.need + "sec_ap";
//                 return false;
//             } else {
//                 // console.log('Завершили проверку активности');
//                 return true;
//             }
//         }
//         return false;
//     },

//     timeoutFn: function () {
//         NoksActiveScore.checkPeriod();
//     },

//     runPeriod: function () {
//         this.timeoutId = setTimeout(this.timeoutFn, this.checkTime * 1000);
//     },

//     send: function () {
//         this.setCookie(this.cookieName, this.active_parts * this.active_parts);
//         this.metricsFn();
//     },

//     metricsFn() {
//         // console.log(NoksActiveScore.timer);
//         // console.log(NoksActiveScore.need);
//         const c1 = this.getCookie(this.cookieName);
//         // console.log(c1);
//         if (NoksActiveScore.timer >= NoksActiveScore.need) {
//             /* Тут перечислять все что нужно будет вызвать по достижению цели */
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             //@ts-ignore
//             if (!yandexMetrikaCounter) {
//                 console.log("метрика не найдена");
//                 return;
//             }
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             //@ts-ignore
//             ym(yandexMetrikaCounter, "reachGoal", this.target_name);
//             console.log("активити событие отправилось");
//             /* Тут перечислять все что нужно будет вызвать по достижению цели */
//         }
//     },

//     checkCookie: function () {
//         const c = this.getCookie(this.cookieName);
//         let c1 = 0;
//         if (c == null) {
//             return true;
//         } else {
//             c1 = parseInt(c);
//             if (c1 >= this.parts) {
//                 // console.log('Скрипт даже не запустился...');
//                 if (this.loop == true) {
//                     return true;
//                 }
//                 return false;
//             } else {
//                 this.active_parts = c1;
//                 return true;
//             }
//         }
//     },

//     setCookie: function (name: string, value: number, days?: number) {
//         let expires = "";
//         if (days) {
//             const date = new Date();
//             date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//             expires = "; expires=" + date.toUTCString();
//         }
//         document.cookie = name + "=" + (value || "") + expires + "; path=/";
//     },

//     getCookie: function (name: string) {
//         const nameEQ = name + "=";
//         const ca = document.cookie.split(";");
//         for (let i = 0; i < ca.length; i++) {
//             let c = ca[i];
//             while (c.charAt(0) == " ") c = c.substring(1, c.length);
//             if (c.indexOf(nameEQ) == 0)
//                 return c.substring(nameEQ.length, c.length);
//         }
//         return null;
//     },

//     eraseCookie: function (name: string) {
//         document.cookie =
//             name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//     },
// };

// function isJSON(str: string) {
//     if (typeof str !== "string") return false;
//     try {
//         const result = JSON.parse(str);
//         const type = Object.prototype.toString.call(result);
//         return type === "[object Object]" || type === "[object Array]";
//     } catch (err) {
//         return false;
//     }
// }

// function execActiveActivity() {
//     const settings = document.querySelector(
//         "[data-site-settings]"
//     ) as HTMLElement;
//     if (!settings) return;
//     const settingsTmp1 = settings.innerText.trim();
//     if (!isJSON(settingsTmp1)) return;
//     const settingsTmp2 = JSON.parse(settingsTmp1);
//     if (!(settingsTmp2.activity.active ?? false)) return;
//     try {
//         console.log("запуск активити");
//         NoksActiveScore.init(settingsTmp2.activity ?? null);
//     } catch (e) {
//         console.log("NoksActiveScore:", e);
//     }
// }

// ////////////////////////////////////////////
// //metrika
// /** Ожидание загрузки счетчика Яндекс.Метрики
//  * @param {?(number|string)} ymCounterNum - номер счетчика, если известен
//  * @param {function} callback - получает аргументами объект и номер счетчика
//  * @param {number} interval - интервал проверки готовности счетчика
//  */
// function waitForYm(
//     ymCounterNum: null | number | string,
//     callback: (...args: any[]) => any,
//     interval: number
// ) {
//     if (!callback) return;
//     if (!ymCounterNum) {
//         const metrikaObj =
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             //@ts-ignore
//             (window.Ya && (window.Ya.Metrika || window.Ya.Metrika2)) || null;
//         ymCounterNum =
//             (metrikaObj &&
//                 metrikaObj.counters &&
//                 (metrikaObj.counters() || [0])[0].id) ||
//             0;
//     }
//     const ymCounterObj =
//         window[("yaCounter" + ymCounterNum) as unknown as number] || null;
//     if (ymCounterObj) return callback(ymCounterObj, ymCounterNum), undefined;
//     setTimeout(function () {
//         waitForYm(ymCounterNum, callback, interval);
//     }, interval || 250);
// }
// // document.addEventListener('DOMContentLoaded', function(){};
// // $(document).ready(function () {
// //     $(document).tooltip();
// // });

// function getMetaIdPage() {
//     return (
//         document
//             .querySelector('meta[name="id-page"]')
//             ?.getAttribute("content") ?? -1
//     );
// }

// function getMetaIdSite() {
//     return (
//         document
//             .querySelector('meta[name="id-site"]')
//             ?.getAttribute("content") ?? -1
//     );
// }

// function getCookie(name: string): string | Blob {
//     const matches = document.cookie.match(
//         new RegExp(
//             "(?:^|; )" +
//                 name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
//                 "=([^;]*)"
//         )
//     );
//     return matches ? decodeURIComponent(matches[1]) : null;
// }

// function send_lead(e: Event) {
//     const target = e.target as HTMLElement;
//     if (!target) {
//         return;
//     }
//     const form = target.closest("form");
//     if (!form) {
//         return;
//     }
//     const formData = new FormData(form);
//     formData.append(
//         "id_form",
//         form.getAttribute("noks-form-id") as string | Blob
//     );
//     formData.append("url_client", document.URL);
//     formData.append("id_page", getMetaIdPage() as any);
//     formData.append("id_site", getMetaIdSite() as any);
//     // COOKIE
//     formData.append("roistat_visit", getCookie("roistat_visit"));
//     formData.append("noks_visit", getCookie("noks_visit"));
//     const xhr = new XMLHttpRequest();

//     xhr.addEventListener("loadend", () => {
//         const target = e.target as HTMLElement;
//         const href = target.getAttribute("href");
//         if (href && href !== "") window.location.href = href;
//     });
//     xhr.open("POST", `//${window.site_domain ?? "noks.ru"}/form/api/save/lead`);
//     xhr.send(formData);
// }

// let yandexMetrikaCounter = null;

// waitForYm(null, function (obj, counter) {
//     yandexMetrikaCounter = counter;
// });

// //quiz
// (function (w, d, s) {
//     const j = d.createElement(s);
//     j.async = true;
//     j.src =
//         "//" + window.site_domain + "/v0020/quiz/resource/js/public/v0_1.js";
//     j.onload = function () {
//         if (document.readyState !== "loading") NoksQuiz.init();
//         else
//             document.addEventListener("DOMContentLoaded", function () {
//                 NoksQuiz.init();
//             });
//     };
//     d.head.insertBefore(j, d.head.firstElementChild);
// })(window, document, "script");

// //forms
// function validateform(e) {
//     try {
//         const form = $(e.target.closest("form"));
//         let errors = 0;
//         form.find("input").each(function () {
//             const input = $(this);
//             input.removeAttr("data-required-validation");
//             if (input.attr("required") && !input.val()) {
//                 input.attr("data-required-validation", "");
//                 input.attr("title", "Заполните поле");
//                 errors++;
//             }
//         });

//         return errors === 0;
//     } catch (error) {
//         console.error("form_valided", error);
//         return false;
//     }
// }
// $('[href^="#popupnoksgeneratedform_"]').modaal();
// $("[noks-met-form-button]").on("click.noks", function (event) {
//     event.preventDefault();

//     if (!validateform(event)) {
//         return;
//     }
//     try {
//         send_lead(event);
//     } catch {}
//     try {
//         const sdffsfsfs = event.target
//             .closest("form")
//             .getAttribute("noks-metric-send-form");
//         if (yandexMetrikaCounter) {
//             ym(yandexMetrikaCounter, "reachGoal", sdffsfsfs);
//             // console.log("form | send: ", sdffsfsfs);
//         } else {
//             // console.log("form | undefine: ", yandexMetrikaCounter, sdffsfsfs);
//         }
//     } catch (error) {
//         console.log("form | CATCH: ", error);
//     }
//     if ($("#modaal-close").length) $("#modaal-close").trigger("click");
// });

// $("[noks-met-click]").on("click.noks", function (event) {
//     // event.preventDefault();
//     try {
//         const sdffsfsfs = event.target.getAttribute("noks-met-click");
//         console.log($(this).attr("noks-met-click"));
//         console.log(sdffsfsfs);
//         if (yandexMetrikaCounter) {
//             ym(yandexMetrikaCounter, "reachGoal", sdffsfsfs);
//         }
//     } catch (error) {
//         console.log("form | CATCH: ", error);
//     }
// });
// $("[data-donatello-form-slider-target]")
//     .on("input", function () {
//         $(this).siblings("input").val($(this).val());
//     })
//     .each((index, element) => {
//         $(element).val(
//             !isNaN(
//                 parseInt($(element).attr("data-donatello-form-slider-def-val"))
//             )
//                 ? parseInt(
//                       $(element).attr("data-donatello-form-slider-def-val")
//                   )
//                 : parseInt($(element).attr("min"))
//         );
//         $(element).trigger("input");
//     });
// $("[data-donatello-form-slider-target]")
//     .siblings("input")
//     .on("input", function () {
//         $(this).siblings("input").val($(this).val());
//     });
// $(document).ready(function () {
//     $("input[type='tel']").mask("+7(999) 999-99-99");
// });
// // Активити
// try {
//     execActiveActivity();
// } catch (e) {
//     console.log("execActiveActivity: ", e);
// }
