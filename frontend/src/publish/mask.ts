import IMask from "imask";
import { MaskType, PublishTargetAttributes } from "./target-attributes";
try {
    const maskItems = document.querySelectorAll(
        `[${PublishTargetAttributes.mask}]`
    ) as NodeListOf<HTMLElement>;
    maskItems.forEach((item) => {
        try {
            const mask = item.getAttribute(PublishTargetAttributes.mask);
            const maskType = item.getAttribute(
                PublishTargetAttributes.maskType
            );

            if (mask !== null) {
                if (maskType == MaskType.regex) {
                    IMask(item, {
                        //TODO Доделать а то пока что странно работает
                        mask: new RegExp(mask),
                    });
                } else {
                    IMask(item, {
                        mask: mask,
                    });
                }
            }
        } catch (error) {
            //TODO отправлять в тг
            console.error(error);
        }
    });
} catch (error) {
    console.error(error);
}
