import { AnaliticColumnData } from "@/entities/report";
import { v4 as uuidv4 } from "uuid";

export function getUUID() {
    const tmp = uuidv4().split("-").join("");
    return tmp;
}
export function randomNumberFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getContrastColor(color: string) {
    // Variables for red, green, blue values
    let r: string | number;
    let g: string | number;
    let b: string | number;
    let hsp = 0;
    let result: any = color;
    // Check the format of the color, HEX or RGB?
    if (result.match(/^rgb/)) {
        // If RGB --> store the red, green, blue values in separate variables
        result = result.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
        );

        r = result[1];
        g = result[2];
        b = result[3];
    } else {
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        if (result.match("#") && result.length > 7)
            result = result.substring(0, 7);
        result = Number(
            "0x" + result.slice(1).replace(result.length < 5 && /./g, "$&$&")
        );
        r = result >> 16;
        g = (result >> 8) & 255;
        b = result & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (Number(r) * Number(r)) +
            0.587 * (Number(g) * Number(g)) +
            0.114 * (Number(b) * Number(b))
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
        return "#000000";
    } else {
        return "#ffffff";
    }
}
export function cathetsToAngle(x: number, y: number) {
    const delta = x < 0 ? 270 : 90;
    const degree = +((Math.atan(y / x) * 180) / Math.PI + delta).toFixed(0);
    return degree;
}
export function calibrateMobileFontSize(deskFontSize: number): number {
    if (deskFontSize < 31) return deskFontSize;
    return Math.ceil((deskFontSize + 120) / 5);
}
export function angleAndShiftToOffset(angle: number, shift: number) {
    const shadowX = Math.round(Math.sin(angle * (Math.PI / 180)) * shift);
    const shadowY = Math.round(Math.cos(angle * (Math.PI / 180)) * shift) * -1;

    return {
        x: shadowX,
        y: shadowY,
    };
}
export function offsetToShift(x: number, y: number) {
    return Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
}
export function fileListToArray(fileList: FileList): Array<File> {
    const files: Array<File> = new Array<File>();
    for (const file of fileList) {
        files.push(file);
    }
    return files;
}
export async function createFile(url: string, name = "file_from_url.jpg") {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {
        type: "image/jpeg",
    };
    return new File([data], name, metadata);
}
export function getDateFormat(date: any) {
    const dateActive = new Date(date);

    const day =
        dateActive.getDate() < 10
            ? `0${dateActive.getDate()}`
            : dateActive.getDate();

    const month =
        dateActive.getMonth() < 10
            ? `0${dateActive.getMonth() + 1}`
            : dateActive.getMonth() + 1;
    const year = dateActive.getFullYear();
    return `${year}-${month}-${day}`;
}

export function numberWithSpaces(x: any) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}
export function countVal(params: any) {
    let val = params.val;
    if (["cpc", "ctr", "percent_conversion"].indexOf(params.col) != -1)
        val = val.toFixed(2);
    else val = val.toFixed(0);
    val = numberWithSpaces(val);
    if (params.val == 0) val = "-";
    return val;
}
export function metricUnit(unit: string) {
    let unitStr = "";
    if (unit != undefined) {
        switch (unit) {
            case "Number":
                unitStr = "";
                break;
            case "Percent":
                unitStr = "%";
                break;
            case "Currency":
                unitStr = "₽";
                break;
            default:
                unitStr = "";
        }
        return unitStr;
    } else {
        return;
    }
}
export function getAnaliticColumnDataValue(
    obj: AnaliticColumnData | undefined,
    key: keyof AnaliticColumnData
): any {
    return obj ? obj[key] : undefined;
}
