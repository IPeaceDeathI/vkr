!(function () {
    const windowWidth = Math.min(
        document.documentElement.clientWidth,
        document.documentElement.offsetWidth
    );
    const viewport = document.head.querySelector("[name=viewport]");

    const { rangeMin, rangeMax, lessThanStandart } =
        getMinMaxRange(windowWidth);
    console.log(rangeMin, rangeMax, lessThanStandart);
    const initialWidth = lessThanStandart ? rangeMax + 1 : rangeMin;
    const initialScale = lessThanStandart
        ? rangeMin / windowWidth
        : windowWidth / rangeMin;
    viewport.setAttribute(
        "content",
        `width=${initialWidth}, initial-scale=${initialScale}`
    );
    const getMinMaxRange = function (width) {
        const lessMobile = [0, 399];
        const mobile = [400, 768];
        const lessDesktop = [769, 1999];
        const desktop = [1200, Infinity];
        if (rangeIncludeValue(lessMobile, width)) {
            return { min: lessMobile[0], max: lessMobile[1], less: true };
        } else if (rangeIncludeValue(mobile, width)) {
            return { min: mobile[0], max: mobile[1], less: false };
        } else if (rangeIncludeValue(lessDesktop, width)) {
            return { min: lessDesktop[0], max: lessDesktop[1], less: true };
        } else {
            return { min: desktop[0], max: desktop[1], less: false };
        }
    };
    const rangeIncludeValue = function (range, value) {
        return range[0] <= value && range[1] >= value;
    };
})();
