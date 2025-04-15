import { store } from "@/app/providers";
import { getUUID } from "@/shared/helpers";
import {
    CommonNotification,
    ImportantLoading,
    ImportantNotification,
} from "./types";

class NotificationServiceClass {
    // constructor(parameters) {}
    common() {
        return new Common();
    }
    important() {
        return new Important();
    }
}
class Common {
    ref = store.getters["environment/indexRef"].notifications;
    info(message: CommonNotification) {
        this.ref.addCommonInfo({
            text: message.text,
            id: getUUID(),
            delay: message.delay || 3000,
        });
        return;
    }
    error(message: CommonNotification) {
        this.ref.addCommonError({
            text: message.text,
            id: getUUID(),
            delay: message.delay || 3000,
        });
        return;
    }
    success(message: CommonNotification) {
        this.ref.addCommonSuccess({
            text: message.text,
            id: getUUID(),
            delay: message.delay || 3000,
        });

        return;
    }
    loading(waitTo: Promise<any>) {
        this.ref.addCommonLoading({
            id: getUUID(),
            waitTo: waitTo,
        });
        return;
    }
}
class Important {
    ref = store.getters["environment/indexRef"].notifications;
    info(message: ImportantNotification) {
        this.ref.addImportantInfo({
            id: getUUID(),
            mainText: message.mainText,
            agreeBtn: { text: message.agreeBtn.text, fn: message.agreeBtn.fn },
            disagreeBtn: {
                text: message.disagreeBtn.text,
                fn: message.disagreeBtn.fn,
            },
            persistanse: message.persistanse,
            checkboxes: message.checkboxes?.map((checkbox) => {
                return { ...checkbox, id: getUUID() };
            }),
        });

        return;
    }
    error(message: ImportantNotification) {
        this.ref.addImportantError({
            id: getUUID(),
            mainText: message.mainText,
            titleText: message.titleText,
            agreeBtn: { text: message.agreeBtn.text, fn: message.agreeBtn.fn },
            disagreeBtn: {
                text: message.disagreeBtn.text,
                fn: message.disagreeBtn.fn,
            },
            persistanse: message.persistanse,
            checkboxes: message.checkboxes?.map((checkbox) => {
                return { ...checkbox, id: getUUID() };
            }),
        });
        return;
    }
    loading(message: ImportantLoading) {
        this.ref.addImportantLoading({
            id: getUUID(),
            waitTo: message.waitTo,
            loadingText: message.loadingText || "Подождите! Идёт загрузка...",
        });
        return;
    }
}

export const NotificationService = new NotificationServiceClass();
