import { v4 as uuidv4 } from "uuid";

//  Расхеширование из base64
export const unhashBase = function (base64) {
    var wd = "";
    try {
        wd = JSON.parse(base64);
    } catch (e) {}
    return wd;
};
export function rotateElement(element, degree) {
    element.css("transform", `rotate(${degree}deg)`);
}

export function hexToRgba(h) {
    let r = 0,
        g = 0,
        b = 0,
        a = "";

    if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
        a = "0x" + "f" + "f";
    } else if (h.length == 9) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
        a = "0x" + h[7] + h[8];
    }
    a = +(a / 255).toFixed(3);

    return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
}

export async function waitForEl(from, e, m, t) {
    //(from, element, max, timeout)
    let iter = 1;
    return new Promise((resolve) => {
        const sir = setInterval(() => {
            if (iter > m) {
                clearInterval(sir);
                resolve(null);
            }
            const teamsGrid = from.find(e);
            if (teamsGrid.length != 0) {
                clearInterval(sir);
                resolve(teamsGrid.attr("data-success"));
            }
            iter++;
        }, t);
    });
}
export function getUUID() {
    return uuidv4();
}
//TODO переделать на uuid
export function getRandomInt(max = 100000) {
    return Math.floor(Math.random() * max);
}
