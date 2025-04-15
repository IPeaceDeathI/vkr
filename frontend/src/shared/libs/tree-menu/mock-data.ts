import { TreeMenuItemsType } from "./types";

export const menuParams = [
    {
        type: TreeMenuItemsType.mainItem,
        icon: "mdi-star",
        title: "Добавить в избранное",
        isDisabled: false,
        callBackFn: () => console.log(1),
        subItems: [
            {
                type: TreeMenuItemsType.mainItem,
                icon: "mdi-star",
                title: "Добавить в избранное",
                appendText: "Ctr V",
                callBackFn: () => console.log(2),
                subItems: [],
            },
        ],
    },
    {
        type: TreeMenuItemsType.mainItem,
        icon: "mdi-star",
        title: "Добавить в избранное",
        tooltipText: "Подсказка",
        callBackFn: () => console.log(1),
        subItems: [
            {
                type: TreeMenuItemsType.mainItem,
                icon: "mdi-star",
                title: "Добавить в избранное",
                callBackFn: () => console.log(2),
                subItems: [],
            },
        ],
    },
    {
        type: TreeMenuItemsType.mainItem,
        icon: "mdi-star",
        title: "Добавить в избранное",
        callBackFn: () => console.log(1),
        subItems: [
            {
                type: TreeMenuItemsType.mainItem,
                icon: "mdi-star",
                title: "Добавить в избранное",
                callBackFn: () => console.log(2),
                subItems: [
                    {
                        type: TreeMenuItemsType.mainItem,
                        icon: "mdi-star",
                        title: "Добавить в избранное",
                        callBackFn: () => console.log(1),
                        subItems: [
                            {
                                type: TreeMenuItemsType.mainItem,
                                icon: "mdi-star",
                                title: "Добавить в избранное с закрытием",
                                callBackFn: () => console.log(2),
                                closeMenu: true,
                                closeAllMenu: true,
                                subItems: [],
                            },
                        ],
                    },
                    {
                        type: TreeMenuItemsType.mainItem,
                        icon: "mdi-star",
                        title: "Добавить в избранное",
                        callBackFn: () => console.log(1),
                        subItems: [
                            {
                                type: TreeMenuItemsType.mainItem,
                                icon: "mdi-star",
                                title: "Добавить в избранное",
                                callBackFn: () => console.log(2),
                                subItems: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: TreeMenuItemsType.divider,
        value: "1",
    },
    {
        type: TreeMenuItemsType.switchItem,
        icon: "mdi-star",
        title: "Геосекция",
        tooltipText: "Подсказка",
        isDisabled: true,
        callBackFn: () => console.log("switch 1"),
    },
    {
        type: TreeMenuItemsType.switchItem,
        icon: "mdi-star",
        title: "Геосекция",
        tooltipText: "Подсказка",
        isActive: true,
        callBackFn: (value: boolean) => {
            console.log(value);
        },
    },
    {
        type: TreeMenuItemsType.switchItem,
        icon: "mdi-star",
        title: "Геосекция",
        callBackFn: () => console.log("switch 1"),
    },
    {
        type: TreeMenuItemsType.toggleItem,
        title: "Видимость на устройствах",
        current: 2,
        buttons: [
            {
                icon: "mdi-star",
                tooltipText: "toggle 1",
                callBackFn: () => console.log("toggle 1"),
            },
            {
                icon: "mdi-star",
                tooltipText: "toggle 2",
                callBackFn: () => console.log("toggle 2"),
            },
            {
                icon: "mdi-star",
                tooltipText: "toggle 3",
                callBackFn: () => console.log("toggle 3"),
            },
        ],
    },
    {
        type: TreeMenuItemsType.anchor,
        placeholder: "hello",
        value: "value",
        isActive: true,
        anchorUpdateValueFn: (value: string) => console.log(value),
        anchorOnOffFn: () => console.log("on/off anchor"),
        btnCallBackFn: () => console.log("copy fn"),
    },
    {
        type: TreeMenuItemsType.classItem,
        prependIcon: "mdi-star",
        title: "класс",
        appendIcon: "mdi-content-copy",
        tooltipText: "Копировать",
        copyFn: (value: string) => console.log(value),
        staticSubitem: {
            title: ".base-class",
            addFn: (value: string) => console.log(value),
        },
        subitems: [
            {
                title: "класс-1",
                deleteFn: () => console.log("deteted"),
                callBackFn: (value: string) => console.log(value),
            },
            {
                title: "класс-2",
                deleteFn: () => console.log("deteted"),
                callBackFn: (value: string) => console.log(value),
            },
            {
                title: "класс-3",
                deleteFn: () => console.log("deteted"),
                callBackFn: (value: string) => console.log(value),
            },
        ],
    },
];
