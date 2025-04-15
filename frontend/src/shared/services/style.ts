import {
    ItemParams,
    Shadow,
    BorderRadius,
    ZoneParams,
    BlockParams,
    BlockBodyParams,
    Color,
    Paddings,
    axisPadding,
} from "@/types";
import { ElementsFabric } from "./elements_fabrics";
import { angleAndShiftToOffset } from "../helpers";
import { MOBILE_MAX_WIDTH } from "../constants/default_values";
import { CriticalError } from "./error_service";
type elementClassName = string;
interface generatorParams {
    cssVariable: string;
    value: string | undefined;
}
interface getBlockStyleParams {
    elementId: id;
    BlockParams:
        | Omit<BlockParams, "blockTitle" | "parentId" | "childrenBlockBodiesId">
        | undefined;
}
interface getBlockBodyStylesParams {
    elementId: id;
    BlockBodyParams: Omit<BlockBodyParams, "parentId" | "childrenIds">;
}
interface getZoneStyleParams {
    elementId: id;
    ZoneParams: Omit<ZoneParams, "parentId" | "childrenIds"> | undefined;
}
interface getItemStyleParams {
    elementId: id; // id элемента, к которому нужно применить стили
    ItemParams: Omit<ItemParams, "parentId">;
}
export function styleGenerator(params: Array<generatorParams>): string {
    let result = "";
    for (const { cssVariable, value } of params) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (Number.isNaN(value)) {
            throw new CriticalError({
                bundle: "not structure error",
                message: "Ошибка валидации типа ответа сервера",
                isNotification: false,
            });
        }
        if (value !== undefined && value !== "") {
            result += `${cssVariable}: ${value};\n`;
        }
    }
    return result;
}
/**
 *
 * @param nested Ecли true, то итоговый селектор с именем класса будет вложен в селектор id, иначе будет лежать рядом
 */
export function getSelector(
    id: id,
    elementSelector: string | Array<elementClassName>,
    nested = true
) {
    const selector = Array.isArray(elementSelector)
        ? "." + elementSelector.join(" .")
        : elementSelector;
    if (nested) return `[data-el-id="${id}"] ${selector}`;
    else return `[data-el-id="${id}"]${selector}`;
}
export function collectMobileStyle(
    baseSelector: string,
    styles: string
): string {
    return (
        ".viewport-is-mobile " +
        baseSelector +
        "{" +
        styles +
        "}" +
        `@media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {` +
        baseSelector +
        "{" +
        styles +
        "}" +
        "}"
    );
}
export function collectStyle(baseSelector: string, styles: string): string {
    return baseSelector + "{" + styles + "}\n";
}
export function getBlockStyles(params: getBlockStyleParams): string {
    if (params.BlockParams) {
        const selector = getSelector(
            params.elementId,
            `.block-container`,
            false
        );
        const insideStyles = ElementsFabric.getBlock().getStyles(
            params.BlockParams
        );
        return selector + "{" + insideStyles + "}";
    }
    return "";
}
export function getBlockBodyStyles(params: getBlockBodyStylesParams) {
    if (params.BlockBodyParams) {
        return ElementsFabric.getBlockBody()
            .getBodyLayout(params.BlockBodyParams.BodyLayoutParams.type)
            .getCombinedStyles(
                params.elementId,
                params.BlockBodyParams.BodyLayoutParams
            );
    }
    return "";
}
//zone
export function getZoneStyles(params: getZoneStyleParams): string {
    if (params.ZoneParams) {
        return ElementsFabric.getZonesFabric()
            .getZone(params.ZoneParams.type)
            .getCombinedStyles(params.elementId, params.ZoneParams);
    }
    return "";
}
//items
export function getItemStyles(params: getItemStyleParams): string {
    if (!params.ItemParams) return "";
    return ElementsFabric.getItemsFabric()
        .getItem(params.ItemParams.type)
        .getCombinedStyles(params.elementId, params.ItemParams);
}

//styleCombiner
export class styleCombiner {
    public static shadow(shadow: Shadow | undefined) {
        if (shadow) {
            const { x, y } = angleAndShiftToOffset(shadow.angle, shadow.shift);
            return `${x}px ${y}px ${shadow.blur}px ${shadow.color}`;
        }
        return undefined;
    }
    public static borderRadius(
        brdRad: BorderRadius | undefined,
        unit: string | undefined = "px"
    ) {
        if (brdRad) {
            return `${brdRad.tl}${unit} ${brdRad.tr}${unit} ${brdRad.br}${unit} ${brdRad.bl}${unit}`;
        }
        return undefined;
    }
    public static border(
        borderColor: Color | undefined,
        borderWidth: number | undefined = 1,
        borderStyle: string | undefined = "solid"
    ) {
        if (borderColor) {
            return `${borderWidth}px ${borderStyle} ${borderColor}`;
        }
        return undefined;
    }
    public static reversePadding(
        padding: Paddings,
        unit: string | undefined = "px"
    ) {
        return `-${padding.top}${unit} -${padding.right}${unit} -${padding.bottom}${unit} -${padding.left}${unit}`;
    }
    public static padding(padding: Paddings, unit: string | undefined = "px") {
        return `${padding.top}${unit} ${padding.right}${unit} ${padding.bottom}${unit} ${padding.left}${unit}`;
    }
    public static axisPadding(
        padding: axisPadding,
        unit: string | undefined = "px"
    ) {
        return `${padding.vertical}${unit} ${padding.horizontal}${unit}`;
    }
}
