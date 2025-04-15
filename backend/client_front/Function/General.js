/**
 * @param {string} name
 * @returns {null|string}
 */
export function getAttrContentValueFromMetaTagByName(name) {
    let el = document.querySelector('meta[name="' + name + '"]');
    if (el == null) return null;
    return el.getAttribute("content");
}

/**
 * @returns {string|null}
 */
export function getReferer() {
    return document.referrer ?? null;
}

/**
 * @returns {string|null}
 */
export function getUserAgent() {
    return getWindowNavigator().userAgent ?? null;
}

/**
 * @returns {null|Navigator}
 */
function getWindowNavigator() {
    return window.navigator || null;
}

/**
 * @returns {null|Screen}
 */
function getWindowScreen() {
    return window.screen || null;
}

/**
 * @returns {string|null}
 */
export function getDocLanguage() {
    return getWindowNavigator().language ?? null;
}

/**
 * @returns {number|null}
 */
export function getDeviceMemory() {
    return getWindowNavigator().deviceMemory ?? null;
}

/**
 * @returns {string|null}
 */
export function getPlatform() {
    return getWindowNavigator().platform ?? null;
}

export function getScreenSize() {
    return `x:${getWindowScreen().width ?? 0}y:${
        getWindowScreen().height ?? 0
    }`;
}

// (function () {
//     var dU = window.screen || null;
//     var e = window.navigator || null;
//     return {
//         screenIsExtended: dU !== null ? dU.isExtended || null : null,
//         screenPixelDepth: dU !== null ? dU.pixelDepth || null : null,
//         screenColorDepth: dU !== null ? dU.colorDepth || null : null,
//         hardwareConcurrency: e !== null ? e.hardwareConcurrency || null : null,
//         maxTouchPoints: e !== null ? e.maxTouchPoints || null : null,
//     };
// })();

export function getCurUnixTime() {
    let targetDate = new Date();
    return Math.round(
        targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60
    );
}

export function getCurTimeZone() {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    } catch (e) {
        return "";
    }
}

/**
 * @returns {URL}
 */
export function getCurURL() {
    return new URL(document.location);
}

/**
 * @returns {string}
 */
export function getCurDomain() {
    return getCurURL().host;
}

/**
 * @returns {string}
 */
export function getCurURLProtocol() {
    return getCurURL().protocol.replace(/:+$/, "");
}

/**
 * @returns {string|number}
 */
export function getPageID() {
    return getAttrContentValueFromMetaTagByName("id-page") ?? -1;
}
/**
 * @returns {string|number}
 */
export function getSiteID() {
    return getAttrContentValueFromMetaTagByName("id-site") ?? -1;
}
/**
 * @returns {string|number}
 */
export function getFlowID() {
    return getAttrContentValueFromMetaTagByName("id-flow") ?? -1;
}
