// NOT FORGET UPDATE GLOBAL DECLARE IN './globals.d.ts'
// ПОДКЛЮЧАЕТСЯ PHP  ПО ПОЛНОМУ ПУТИ, ПОЖТОМУ НЕ МЕНЯТЬ НАЗВАНИЕ И НЕ ПЕРЕМЕЩАТЬ ФАЙЛ,не забыть про кеш
const noks_cli = (function () {
    const documetnWidth = document.documentElement.clientWidth;
    const isMobile = documetnWidth <= 768;
    return {
        isMobile: isMobile,
        documetnWidth: documetnWidth,
    };
})();
if (noks_cli.isMobile) {
    document.querySelector("body").classList.add("viewport-is-mobile");
}
