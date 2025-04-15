const NOKS_LOCALHOST_PATH = process.env.VUE_APP_SERVE_HOST;
// const NOKS_LOCALHOST_PATH = "https://test.ru/";
// const NOKS_LOCALHOST_PATH = "https://book-search.ru/";

export const isDevEnv = false;
export const dragOptions = {
    animation: 400,
    disabled: false,
    ghostClass: "noks-draggable-ghost",
    dragClass: "noks-draggable-drag",
    chosenClass: "noks-draggable-chosen",
    forceFallback: true,
    fallbackClass: "noks-draggable-fallback",
    fallbackTolerance: 10,
    scrollSensitivity: 200,
};
export const NOKS_HOST =
    process.env.NODE_ENV === "production" ? "/" : NOKS_LOCALHOST_PATH;

export const HOST_NAME =
    process.env.NODE_ENV === "production" ? "noks" : "book-search";
