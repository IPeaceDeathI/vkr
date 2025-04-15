import { ActionTypes, EventTypes } from "@/types";
import { PublishTargetAttributes } from "./target-attributes";
import { showWindow } from "./window";
import { Snackbar } from "./helpers";
try {
    const events = document.querySelectorAll(
        `[${PublishTargetAttributes.eventType}]`
    ) as NodeListOf<HTMLElement>;

    events.forEach((eventElement) => {
        const eventType = eventElement.getAttribute(
            PublishTargetAttributes.eventType
        );

        if (eventType === null) return; //TODO сообщение на бек
        if (eventType === EventTypes.onclick) {
            eventElement.addEventListener("click", (e: MouseEvent) => {
                actionsHandlers(eventElement, e);
            });
        } else if (eventType === EventTypes.afterFormSend) {
            return; // DEVELOP
        }
    });
} catch (error) {
    console.error(error);
}
export function actionsHandlers(element: HTMLElement, e?: MouseEvent) {
    try {
        const actionType = element.getAttribute(
            PublishTargetAttributes.actionType
        );
        const actionValue = element.getAttribute(
            PublishTargetAttributes.actionValue
        );
        if (actionType === null || actionValue === null) return; //TODO сообщение на бек
        switch (actionType) {
            case ActionTypes.link:
                window.location.href = actionValue;
                break;
            case ActionTypes.showSnackbar:
                Snackbar.get().labelText = actionValue;
                Snackbar.get().open();
                break;
            case ActionTypes.openWindow:
                // eslint-disable-next-line no-case-declarations
                const windowElement = document.getElementById(actionValue);
                if (windowElement !== null) {
                    showWindow(windowElement);
                }
                break;
        }
    } catch (error) {
        console.error(error);
    }
}
