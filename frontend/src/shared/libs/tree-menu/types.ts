export type TreeMenuParams = Array<
    | TreeMenuMainItems
    | TreeMenuSwitchItems
    | TreeMenuToggleItems
    | TreeMenuClassItem
    | Anchor
    | Divider
>;
export enum TreeMenuItemsType {
    mainItem = "main-item",
    switchItem = "switch-item",
    toggleItem = "toggle-item",
    anchor = "anchor",
    divider = "divider",
    classItem = "class-item",
}
export interface TreeMenuMainItems {
    type: TreeMenuItemsType.mainItem;
    icon: string;
    title: string;
    appendText?: string;
    isDisabled?: boolean;
    tooltipText?: string;
    callBackFn: (...args: any[]) => void;
    closeMenu?: boolean;
    closeAllMenu?: boolean;
    subItems: TreeMenuParams;
}
export interface TreeMenuSwitchItems {
    type: TreeMenuItemsType.switchItem;
    icon: string;
    title: string;
    tooltipText?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    callBackFn: (val: boolean) => void;
}
export interface TreeMenuToggleItems {
    type: TreeMenuItemsType.toggleItem;
    title: string;
    buttons: ToggleButton[];
    current?: number;
}
export interface ToggleButton {
    icon: string;
    tooltipText?: string;
    value: string; // уникальное значение
    callBackFn: () => void; // меняет current у TreeMenuToggleItems;
}
export interface Anchor {
    type: TreeMenuItemsType.anchor;
    placeholder: string;
    value: string;
    isActive: boolean;
    tooltipText?: string;
    anchorOnOffFn: (value: boolean) => void;
    anchorUpdateValueFn: (value: string) => void;
    btnCallBackFn?: (...args: any[]) => any;
}
export interface Divider {
    type: TreeMenuItemsType.divider;
    value: string;
}
export interface TreeMenuClassItem {
    type: TreeMenuItemsType.classItem;
    prependIcon: string;
    title: string;
    appendIcon: string;
    tooltipText?: string;
    copyFn: (value: string) => void;
    staticSubitem: StaticClassSubitem;
    subitems: ClassSubitem[];
}
export interface ClassSubitem {
    title: string;
    deleteFn: () => void;
    callBackFn: (value: string) => void;
}
export interface StaticClassSubitem {
    title: string;
    addFn: (value: string) => void;
}
