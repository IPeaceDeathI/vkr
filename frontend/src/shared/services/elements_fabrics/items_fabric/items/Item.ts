import {
    CommonItemsParams,
    ElementVisibility,
    ItemBundle,
    ItemParams,
    ItemTypes,
} from "@/types";
import { ItemTypesWithPercPaddingB, ItemsFabric } from "../ItemsFabric";
import {
    collectMobileStyle,
    collectStyle,
    styleGenerator,
} from "@/shared/services/style";
import { cssVariable } from "@/shared/constants/default_values";
export class Item {
    protected static instance: Item;
    protected constructor() {
        // сделать что-нибудь...
    }
    getItemCommonStyles(params: ItemParams): string {
        return styleGenerator([
            {
                cssVariable: cssVariable.paddingBottom,
                value:
                    params.paddings.desktop.paddingBottom +
                    (ItemTypesWithPercPaddingB.includes(params.type)
                        ? "%"
                        : "px"),
            },
            {
                cssVariable: cssVariable.layoutWidth,
                value:
                    params.width === "100%" || params.width === undefined
                        ? "100%"
                        : params.width + "px",
            },
            {
                cssVariable: cssVariable.paddingTop,
                value: params.paddings.desktop.paddingTop + "px",
            },
            {
                cssVariable: cssVariable.paddingLeft,
                value: params.paddings.desktop.paddingLeft + "%",
            },
            {
                cssVariable: cssVariable.paddingRight,
                value: params.paddings.desktop.paddingRight + "%",
            },
        ]);
    }
    getMobileItemCommonStyles(params: ItemParams): string {
        return styleGenerator([
            {
                cssVariable: cssVariable.paddingBottom,
                value:
                    params.paddings.mobile.paddingBottom !== false
                        ? params.paddings.mobile.paddingBottom +
                          (ItemTypesWithPercPaddingB.includes(params.type)
                              ? "%"
                              : "px")
                        : undefined,
            },
            {
                cssVariable: cssVariable.paddingTop,
                value:
                    params.paddings.mobile.paddingTop !== false
                        ? params.paddings.mobile.paddingTop +
                          (ItemTypesWithPercPaddingB.includes(params.type)
                              ? "%"
                              : "px")
                        : undefined,
            },
            {
                cssVariable: cssVariable.paddingLeft,
                value: 0 + "px",
            },
            {
                cssVariable: cssVariable.paddingRight,
                value: 0 + "px",
            },
        ]);
    }
    getBundle(): ItemBundle {
        return this.getDefaultItemParams("f");
    }
    //TODO избавится
    getDefaultItemParams(parentId: string): ItemParams {
        return this.getItemCommonParams(
            ItemTypes.button
        ) as unknown as ItemParams;
    }

    getItemCommonParams(itemType: ItemTypes): CommonItemsParams {
        return {
            paddings: {
                desktop: {
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: ItemTypesWithPercPaddingB.includes(itemType)
                        ? 0
                        : 10,
                    paddingBottom: ItemTypesWithPercPaddingB.includes(itemType)
                        ? 100
                        : 10,
                },
                mobile: {
                    paddingTop: false,
                    paddingBottom: false,
                },
            },
            width: "100%",
            visibility: ElementVisibility.all,
        };
    }
    getDataElementSelector(id: id): string {
        return `[data-el-id="${id}"].item-layout`;
    }
    protected getStyles(params: any): string {
        return "";
    }
    protected getMobileStyles(params: any): string {
        return "";
    }
    //Можно переопределить, если нужно добавить дополнительные селекторы со стилями
    protected getAdditionalCombinedStyles(id: id, params: any): string {
        return "";
    }

    public getCombinedStyles(
        id: id,
        params: Omit<ItemParams, "parentId">
    ): string {
        const mainSelector = this.getDataElementSelector(id);
        const mainStyles = collectStyle(mainSelector, this.getStyles(params));
        const mobileStyles = collectMobileStyle(
            mainSelector,
            this.getMobileStyles(params)
        );

        return (
            mainStyles +
            mobileStyles +
            this.getAdditionalCombinedStyles(id, params)
        );
    }
}
