// ПОДКЛЮЧАЕТСЯ PHP  ПО ПОЛНОМУ ПУТИ, ПОЭТОМУ НЕ МЕНЯТЬ НАЗВАНИЕ И НЕ ПЕРЕМЕЩАТЬ ФАЙЛ,не забыть про кеш
!(function () {
    const rangeIncludeValue = function (range, value) {
        return range[0] <= value && range[1] >= value;
    };
    const getMinMaxRange = function (width) {
        const lessMobile = [0, 399];
        const mobile = [400, 768];
        const lessDesktop = [769, 1199];
        const desktop = [1200, Infinity];
        if (rangeIncludeValue(lessMobile, width)) {
            return {
                rangeMin: lessMobile[0],
                rangeMax: lessMobile[1],
                lessThanStandart: true,
            };
        } else if (rangeIncludeValue(mobile, width)) {
            return {
                rangeMin: mobile[0],
                rangeMax: mobile[1],
                lessThanStandart: false,
            };
        } else if (rangeIncludeValue(lessDesktop, width)) {
            return {
                rangeMin: lessDesktop[0],
                rangeMax: lessDesktop[1],
                lessThanStandart: true,
            };
        } else {
            return {
                rangeMin: desktop[0],
                rangeMax: desktop[1],
                lessThanStandart: false,
            };
        }
    };

    const windowWidth = Math.min(
        document.documentElement.clientWidth,
        document.documentElement.offsetWidth,
        window.screen.width,
        window.screen.availWidth,
        window.innerWidth
    );
    const viewport = document.head.querySelector("[name=viewport]");

    const { rangeMin, rangeMax, lessThanStandart } =
        getMinMaxRange(windowWidth);
    const initialWidth = lessThanStandart
        ? rangeMax + 1
        : windowWidth >= 400
        ? "device-width"
        : rangeMin;
    const initialScale = lessThanStandart
        ? (windowWidth / rangeMax).toFixed(2)
        : windowWidth >= 400
        ? 1
        : (windowWidth / rangeMin).toFixed(2);
    console.log({
        windowWidth: windowWidth,
        initialWidth: initialWidth,
        initialScale: initialScale,
    });
    viewport.setAttribute(
        "content",
        `width=${initialWidth}, initial-scale=${initialScale}, minimum-scale=${initialScale}, maximum-scale=${initialScale}, user-scalable=no, viewport-fit=cover`
    );
})();
