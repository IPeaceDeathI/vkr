enum Sizes {
    s1 = 400,
    s2 = 600,
    s3 = 800,
    s4 = 1000,
    s5 = 1200,
    s6 = 1500,
    s7 = 2000,
}
export async function getResizingImageByContainerWidth(
    url: string,
    innerWidth: number
): Promise<string> {
    if (innerWidth <= Sizes.s1) {
        return addSuffixToUrl(url, Sizes.s1);
    } else if (innerWidth <= Sizes.s2) {
        return addSuffixToUrl(url, Sizes.s2);
    } else if (innerWidth <= Sizes.s3) {
        return addSuffixToUrl(url, Sizes.s3);
    } else if (innerWidth <= Sizes.s4) {
        return addSuffixToUrl(url, Sizes.s4);
    } else if (innerWidth <= Sizes.s5) {
        return addSuffixToUrl(url, Sizes.s5);
    } else if (innerWidth <= Sizes.s6) {
        return addSuffixToUrl(url, Sizes.s6);
    } else {
        return addSuffixToUrl(url, Sizes.s7);
    }
}
function addSuffixToUrl(url: string, suffix: Sizes): string {
    // Парсим URL
    const parsedUrl = new URL(url);

    // Получаем путь, разбив его на отдельные компоненты
    const pathParts = parsedUrl.pathname.split(".");

    // Если ожидается добавить суффикс...
    if (pathParts.length > 1) {
        const fileExtension = pathParts.pop();

        const newPathname = `${pathParts.join(".")}_${suffix}.${fileExtension}`;

        // Заменяем старый путь на новый
        parsedUrl.pathname = newPathname;

        return parsedUrl.toString();
    } else {
        // Если URL не содержит расширения файла
        // throw new Error("URL does not contain a file extension");
        return parsedUrl.toString() + "_" + suffix.toString();
    }
}
