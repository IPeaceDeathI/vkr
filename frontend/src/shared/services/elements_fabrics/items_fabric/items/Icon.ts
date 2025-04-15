import {
    ActionTypes,
    BorderRadiusPresets,
    EventTypes,
    IconVariant,
    ItemIconParams,
    ItemTypes,
} from "@/types";
import { styleGenerator } from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";
import { Item } from "./Item";
import { getContrastColor } from "@/shared/helpers";
import { getDefaultGoalsParams } from "../../commonParams";

export class Icon extends Item {
    protected static instance: Icon;
    private constructor() {
        super();
        // сделать что-нибудь...
    }
    static getInstance() {
        if (!Icon.instance) {
            Icon.instance = new Icon();
            // ... здесь единожды выполняется инициализация ...
        }
        return Icon.instance;
    }
    public getType(): ItemTypes.icon {
        return ItemTypes.icon;
    }
    public getName() {
        return "Иконка";
    }
    public getPreview() {
        return `${process.env.BASE_URL}images/items/icon.jpg`;
    }
    public getIconInnerParams(): Pick<ItemIconParams, "styles" | "settings"> {
        return {
            styles: {
                src: `${process.env.BASE_URL}svg/outlined/person.svg#icon`,
                variant: IconVariant.filled,
                iconColor: "auto",
                sizeWrp: "50",
                sizeIcon: {
                    enabled: true,
                    value: 56,
                },
                borderRadius: {
                    enabled: true,
                    value: BorderRadiusPresets.circle,
                },
                borderWidth: {
                    enabled: false,
                    value: 2,
                },
                userIcon: {
                    enabled: false,
                    value: "",
                },
                backgroundSize: {
                    enabled: false,
                },
            },
            settings: {
                events: [
                    {
                        [EventTypes.onclick]: {
                            [ActionTypes.none]: true,
                        },
                    },
                ],
                enableOnClick: false,
                enableOnHover: false,
                goals: {
                    enabled: false,
                    value: getDefaultGoalsParams(),
                },
            },
        };
    }
    public getDefaultItemParams(parentId: id): ItemIconParams {
        return {
            type: this.getType(),
            ...this.getItemCommonParams(this.getType()),
            ...this.getIconInnerParams(),
        };
    }
    public getStyles(params: ItemIconParams) {
        return this.getItemCommonStyles(params) + this.getInnerStyles(params);
    }
    public getInnerStyles(
        params: Pick<ItemIconParams, "styles" | "settings">
    ): string {
        return styleGenerator([
            {
                cssVariable: cssVariable.textColor,
                value:
                    params.styles.iconColor === "auto"
                        ? undefined
                        : params.styles.iconColor,
            },
            {
                cssVariable: cssVariable.contrastTextColor,
                value:
                    params.styles.iconColor === "auto"
                        ? undefined
                        : getContrastColor(params.styles.iconColor),
            },
            {
                cssVariable: cssVariable.brdRadius,
                value: params.styles.borderRadius.enabled
                    ? `${params.styles.borderRadius.value}%`
                    : undefined,
            },
            {
                cssVariable: cssVariable.brdWidth,
                value: params.styles.borderWidth.enabled
                    ? params.styles.borderWidth.value + "px"
                    : undefined,
            },
            {
                cssVariable: cssVariable.iconSize,
                value: params.styles.sizeIcon.enabled
                    ? params.styles.sizeIcon.value + "%"
                    : undefined,
            },
            {
                cssVariable: cssVariable.iconWrpSize,
                value: params.styles.sizeWrp + "px",
            },
        ]);
    }
    public getMobileStyles(params: ItemIconParams) {
        return this.getMobileItemCommonStyles(params);
    }
    public getInnerMobileStyles(
        params: Pick<ItemIconParams, "styles" | "settings">
    ): string {
        return "";
    }
}
