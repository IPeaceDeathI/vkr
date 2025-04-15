import { IMAGES_TAG_OPTIONS_PATH } from "@/constant";
import Api from "@/classes/Api";
export enum EnumMessagesStatus {
    SUCCESS,
    NEUTRAL,
    ERROR,
};
interface MessagesIndicatorInitial {
    message? : string,
    status? :  EnumMessagesStatus, //EnumMessagesStatus
    timeout? : number,
}
export default class MessagesIndicator {
    private static _instance : MessagesIndicator;
    wrapper = $('<div class="messages"></div>');
    constructor() {
        if (MessagesIndicator._instance) {
            return MessagesIndicator._instance;
        }
        MessagesIndicator._instance = this;
        this.wrapper.appendTo($("body"));
    }

    showPopUpMessage(params : MessagesIndicatorInitial = {}) {
        let message = "";
        let status = EnumMessagesStatus.SUCCESS;
        let timeout = 3000;
        if (params.message != null) {
            message = params.message;
        }

        if (params.status != null) {
            status = params.status;
        }

        if (params.timeout != null) {
            timeout = params.timeout;
        }
        var box = $('<div class="message messages-constructor"></div>');
        var icon_box = $(`<div class="message-status-icon"></div>`).appendTo(
            box
        );
        var message_box = $(`<div>${message}</div>`).appendTo(box);
        switch (status) {
            case EnumMessagesStatus.SUCCESS:
                icon_box.css(
                    "background-image",
                    `url(${IMAGES_TAG_OPTIONS_PATH}success.svg)`
                );
                break;
            case EnumMessagesStatus.NEUTRAL:
                icon_box.remove();
                break;
            case EnumMessagesStatus.ERROR:
                Api.send_to_tg(`Method: showPopUpMessage;\nError: ${message}`);
                icon_box.css(
                    "background-image",
                    `url(${IMAGES_TAG_OPTIONS_PATH}error.svg)`
                );
                break;
            default:
                icon_box.remove();
        }

        if (this.wrapper.length >= 3)
            $(".message:first")
                .stop()
                .animate(
                    {
                        opacity: "0",
                        left: "-2em",
                    },
                    100,
                    function () {
                        $(".message:first").remove();
                    }
                );
        box.animate(
            {
                opacity: "0",
            },
            200,
            () => {
                box.appendTo(this.wrapper)
                    .css({
                        opacity: "0",
                        left: "2em",
                    })
                    .animate(
                        {
                            opacity: "1",
                            left: "0em",
                        },
                        300,
                        function () {
                            box.animate(
                                {
                                    opacity: "1",
                                },
                                timeout,
                                function () {
                                    box.animate(
                                        {
                                            opacity: "0",
                                            left: "-2em",
                                        },
                                        300,
                                        function () {
                                            box.remove();
                                        }
                                    );
                                }
                            );
                        }
                    );
            }
        );
    }
}
