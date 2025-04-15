import { PublishTargetAttributes } from "./target-attributes";
function hideWindow(window: HTMLElement) {
    try {
        window.style.animation = "var(--animation-reverse-name) 500ms ease-in";
        setTimeout(() => {
            window.style.display = "none";
        }, 500);
    } catch (error) {
        console.error(error);
    }
}
export function showWindow(window: HTMLElement) {
    try {
        const windows = document.querySelectorAll(
            `[${PublishTargetAttributes.window}]`
        ) as NodeListOf<HTMLFormElement>;
        windows.forEach((window) => {
            hideWindow(window);
        });
        setTimeout(() => {
            window.style.display = "flex";
            window.style.animation = "var(--animation-name)  500ms ease-out";
        }, 500);
    } catch (error) {
        console.error(error);
    }
}
try {
    const windows = document.querySelectorAll(
        `[${PublishTargetAttributes.window}]`
    ) as NodeListOf<HTMLFormElement>;
    windows.forEach((window) => {
        //Set event to all close target inside window
        const close = window.querySelectorAll(
            `[${PublishTargetAttributes.windowClose}]`
        ) as NodeListOf<HTMLElement>;
        close.forEach((e) => {
            e.addEventListener("click", (e: MouseEvent) => {
                hideWindow(window);
            });
        });
    });
} catch (error) {
    console.error(error);
}
