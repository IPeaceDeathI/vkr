import {
    BlockAreaBundle,
    BlockBodyBundle,
    BlockBodyParams,
    BlockBundle,
    BlockHeaderParams,
    BlockParams,
    ColumnCols,
    ContrastColor,
    ItemBundle,
    ItemParams,
    ItemTypes,
    MAX_COLS_SIZE,
    MIN_COLS_SIZE,
    ProjectBundle,
    ZoneBundle,
    ZoneParams,
    ZoneTypes,
    blockBundleSchema,
    zoneBundleSchema,
} from "@/types";
import { Store } from "./store";
import { ColumnShiftDirection } from "./structure/modules/zones/types/actions";
import { NotificationService } from "@/shared/services/notification_service/NotificationService";
import { BlockRedactorService } from "@/shared/services/block-redactor/block-redactor-service";
import {
    CommonError,
    CriticalError,
    WarningError,
} from "@/shared/services/error_service";
import { ElementsFabric } from "@/shared/services/elements_fabrics";
import { gridWidth } from "@/shared/constants/default_values";

export function setColsForBodyLayoutColumnChildren(
    store: Store,
    blockBodyId: id,
    cols: Array<ColumnCols>
) {
    const blockBodyParamsChildren =
        store.getters["structure/blockBodies/getBlockBodyParamsById"](
            blockBodyId
        ).childrenIds;
    blockBodyParamsChildren.forEach((zone_id, index) => {
        const column =
            store.getters["structure/zones/getColumnParamsById"](zone_id);
        column.cols = cols[index];
    });
}
export function balanceBodyLayoutColumn(
    store: Store,
    blockBodyId: id,
    enableMinBalance = false
) {
    const blockBodyParams =
        store.getters["structure/blockBodies/getBlockBodyParamsById"](
            blockBodyId
        );
    const sumCols = blockBodyParams.childrenIds.reduce((sum, id) => {
        return (
            sum + store.getters["structure/zones/getColumnParamsById"](id).cols
        );
    }, 0);
    if (sumCols <= MAX_COLS_SIZE && !enableMinBalance) return;
    else if (sumCols === MAX_COLS_SIZE) return;
    let colsArray: Array<ColumnCols> = [];
    switch (blockBodyParams.childrenIds.length) {
        case 1:
            colsArray = [24];
            break;
        case 2:
            colsArray = [12, 12];
            break;
        case 3:
            colsArray = [8, 8, 8];
            break;
        case 4:
            colsArray = [6, 6, 6, 6];
            break;
        case 5:
            colsArray = [5, 5, 4, 5, 5];
            break;
        case 6:
            colsArray = [4, 4, 4, 4, 4, 4];
            break;
        default:
            colsArray = [];
    }
    setColsForBodyLayoutColumnChildren(store, blockBodyId, colsArray);
}
export class BlockHeaderManager {
    MIN_WIDTH_TO_PASTE = 250;

    private headerID: id;
    private header: BlockHeaderParams;
    private store: Store;
    constructor(headerID: id, store: Store) {
        this.headerID = headerID;
        this.header =
            store.getters["structure/zones/getBlockHeaderParamsById"](headerID);
        this.store = store;
    }
    //add_item
    public addItem(index: number, itemType: ItemTypes) {
        //TODO UNDO PROBLEM
        const dividerId = this.header.childrenIds[index];
        const dividerParams =
            this.store.getters["structure/items/getHeaderDividerParamsById"](
                dividerId
            );
        const availableSpace =
            dividerParams.width === "100%"
                ? gridWidth
                : dividerParams.width ?? gridWidth;

        if (availableSpace < this.MIN_WIDTH_TO_PASTE) {
            NotificationService.common().info({
                delay: 4000,
                text: "(Временно) Не хватает места для вставки айтема. Раздвиньте divider пошире, если это возможно",
            });
            return;
        }
        const pasteIndex = index + 1;
        dividerParams.width = 0; // обнуляем ширину текущего divider
        this.store.dispatch("structure/zones/ADD_ITEM_TO_ZONE", {
            index: pasteIndex,
            parentZoneId: this.headerID,
            params: ElementsFabric.getItemsFabric()
                .getItem(ItemTypes.headerDivider)
                .getDefaultItemParams(
                    this.headerID,
                    availableSpace - this.MIN_WIDTH_TO_PASTE
                ),
        });
        this.store.dispatch("structure/zones/ADD_ITEM_TO_ZONE", {
            index: pasteIndex,
            parentZoneId: this.headerID,
            params: {
                ...ElementsFabric.getItemsFabric()
                    .getItem(itemType)
                    .getDefaultItemParams(this.headerID),
                width: this.MIN_WIDTH_TO_PASTE,
            },
        });
    }
    public removeItem(index: number) {
        try {
            const removedItemId = this.header.childrenIds[index];
            const itemParams =
                this.store.getters["structure/items/getItemParamsById"](
                    removedItemId
                );
            if (
                //Если дивайдер или последний элемент, то не удаляем
                itemParams.type === ItemTypes.headerDivider ||
                index >= this.header.childrenIds.length - 1
            ) {
                return;
            }
            const dividerId = this.header.childrenIds[index + 1];
            const dividerParams =
                this.store.getters["structure/items/getItemParamsById"](
                    dividerId
                );

            // TODO по лоигке, самый первый divider всегда должен оставатьс в хедере,
            //  поэтому можно передавать всю ширину левому итему
            // но лочше потом добавить проверку
            const preItemId = this.header.childrenIds[index - 1];
            const preItemParams =
                this.store.getters["structure/items/getItemParamsById"](
                    preItemId
                );
            const dividerWidth =
                dividerParams.width === "100%" ? 0 : dividerParams.width ?? 0;
            const itemWidth =
                itemParams.width === "100%" ? 0 : itemParams.width ?? 0;
            const preItemWidth =
                preItemParams.width === "100%" ? 0 : preItemParams.width ?? 0;
            preItemParams.width = preItemWidth + dividerWidth + itemWidth;
            this.store.dispatch("structure/zones/REMOVE_ITEM", {
                zoneID: this.headerID,
                itemID: removedItemId,
            });
            //remove divider
            this.store.dispatch("structure/zones/REMOVE_ITEM", {
                zoneID: this.headerID,
                itemID: dividerId,
            });
        } catch (error) {
            new WarningError({
                bundle: BundleCollector.collectProject(this.store),
                message: JSON.stringify(error),
                notificationText: "При удалении айтема произошла ошибка",
            });
        }
    }
    //TODOулучшить алгоритм
    public shiftLeft(index: number, step: number) {
        if (!this.canShift() || index === 0) return;
        const leftItem = this.store.getters[
            "structure/items/getCommonItemParamsById"
        ](this.header.childrenIds[index - 1]);
        const currentItem = this.store.getters[
            "structure/items/getCommonItemParamsById"
        ](this.header.childrenIds[index]);
        if (
            leftItem.width === "100%" ||
            leftItem.width === undefined ||
            currentItem.width === "100%" ||
            currentItem.width === undefined
        )
            return;
        if (leftItem.width > step) {
            leftItem.width -= step;
            currentItem.width += step;
        } else if (leftItem.width !== 0) {
            const width = leftItem.width;
            leftItem.width = 0;
            currentItem.width += width;
            this.shiftLeft(index - 1, step - width);
        } else {
            this.shiftLeft(index - 1, step);
        }
    }
    //TODOулучшить алгоритм
    public shiftRight(index: number, step: number) {
        if (!this.canShift() || index === this.header.childrenIds.length - 1)
            return;
        const rightItem = this.store.getters[
            "structure/items/getCommonItemParamsById"
        ](this.header.childrenIds[index + 1]);
        const currentItem = this.store.getters[
            "structure/items/getCommonItemParamsById"
        ](this.header.childrenIds[index]);
        if (
            rightItem.width === "100%" ||
            rightItem.width === undefined ||
            currentItem.width === "100%" ||
            currentItem.width === undefined
        )
            return;
        if (rightItem.width > step) {
            rightItem.width -= step;
            currentItem.width += step;
        } else if (rightItem.width !== 0) {
            const width = rightItem.width;
            rightItem.width = 0;
            currentItem.width += width;
            this.shiftRight(index + 1, step - width);
        } else {
            this.shiftRight(index + 1, step);
        }
    }
    private canShift(): boolean {
        return this.header.childrenIds.length > 1;
    }
    private sumItemsWidth(): number {
        return this.header.childrenIds.reduce((acc, itemId) => {
            const width =
                this.store.getters["structure/items/getItemParamsById"](
                    itemId
                ).width;
            //TODO добавить ошибки если ширина не number
            const validWidth = width === "100%" ? 0 : width ?? 0;
            return acc + validWidth;
        }, 0);
    }
}
export class ColumnShiftService {
    public static columnCanShift(
        store: Store,
        blockBodyId: id,
        columnIndex: number,
        shiftDirection: ColumnShiftDirection
    ): boolean {
        const blockBodyChildren =
            store.getters["structure/blockBodies/getBlockBodyParamsById"](
                blockBodyId
            ).childrenIds;
        if (blockBodyChildren) {
            const compressibleSlice = ColumnShiftService.getCompressibleSlice(
                blockBodyChildren,
                columnIndex,
                shiftDirection
            );

            const minSumOfCols = compressibleSlice.length * MIN_COLS_SIZE;
            const currentSumOfCols = compressibleSlice.reduce(function (
                sum,
                columnId
            ) {
                const columnParams =
                    store.getters["structure/zones/getColumnParamsById"](
                        columnId
                    );
                return sum + columnParams.cols;
            },
            0);
            if (minSumOfCols < currentSumOfCols) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    public static shiftColumn(
        store: Store,
        blockBodyId: id,
        columnIndex: number,
        shiftDirection: ColumnShiftDirection
    ) {
        if (
            !ColumnShiftService.columnCanShift(
                store,
                blockBodyId,
                columnIndex,
                shiftDirection
            )
        )
            return false;
        const blockBodyChildren =
            store.getters["structure/blockBodies/getBlockBodyParamsById"](
                blockBodyId
            ).childrenIds;
        const compressibleColumns = ColumnShiftService.getCompressibleSlice(
            blockBodyChildren,
            columnIndex,
            shiftDirection
        );
        if (shiftDirection === "left") compressibleColumns.reverse();
        return ColumnShiftService.shift(
            store,
            compressibleColumns,
            blockBodyChildren[columnIndex]
        );
    }
    private static getCompressibleSlice(
        columns: Array<id>,
        columnIndex: number,
        shiftDirection: ColumnShiftDirection
    ) {
        return shiftDirection === "right"
            ? columns.slice(columnIndex + 1)
            : columns.slice(0, columnIndex);
    }
    private static async shift(
        store: Store,
        columns: Array<id>,
        comingColumnId: id
    ) {
        for (const columnId of columns) {
            if (
                (await store.dispatch(
                    "structure/zones/REDUCE_COLUMN",
                    columnId
                )) &&
                (await store.dispatch(
                    "structure/zones/INCREASE_COLUMN",
                    comingColumnId
                ))
            ) {
                return true;
            }
        }
        return false;
    }
}
export class BundleCollector {
    public static collectItem(store: Store, itemID: id): ItemBundle {
        const bundle =
            store.getters["structure/items/getItemParamsById"](itemID);
        //CAN_OPTIMIZATION
        return Object.assign({}, structuredClone(bundle), {
            parentId: undefined,
        });
    }
    public static collectZone(store: Store, zoneID: id): ZoneBundle {
        const zoneParams =
            store.getters["structure/zones/getZoneParamsById"](zoneID);
        const items: Array<ItemBundle> = [];
        zoneParams.childrenIds.forEach((itemID) =>
            items.push(BundleCollector.collectItem(store, itemID))
        );
        const secondItems: Array<ItemBundle> = [];
        if (zoneParams.type === ZoneTypes.card) {
            zoneParams.secondChildrenIds.forEach((itemID) =>
                secondItems.push(BundleCollector.collectItem(store, itemID))
            );
        }
        //CAN_OPTIMIZATION
        return {
            zoneParams: Object.assign({}, structuredClone(zoneParams), {
                childrenIds: undefined,
                parentId: undefined,
                secondChildrenIds:
                    zoneParams.type === ZoneTypes.card ? [] : undefined,
            }),
            items: items,
            secondItems: secondItems,
        };
    }
    public static collectBlockBody(
        store: Store,
        blockBodyID: id
    ): BlockBodyBundle {
        const blockBodyParams =
            store.getters["structure/blockBodies/getBlockBodyParamsById"](
                blockBodyID
            );
        const zpnes: Array<ZoneBundle> = [];
        blockBodyParams.childrenIds.forEach((zoneID) =>
            zpnes.push(BundleCollector.collectZone(store, zoneID))
        );
        return {
            //CAN_OPTIMIZATION
            blockBodyParams: Object.assign(
                {},
                structuredClone(blockBodyParams),
                {
                    parentId: undefined,
                    childrenIds: undefined,
                }
            ),
            zones: zpnes,
        };
    }
    public static collectBlock(store: Store, blockID: id): BlockBundle {
        const blockParams = store.state.structure.blocks.blocksComponentOPTIM
            .get(blockID)
            ?.getBundle();
        const blockBodies: Array<BlockBodyBundle> =
            blockParams?.blockBodies ?? [];
        let blockTitleBundle: ZoneBundle | false = false;

        if (blockParams?.blockTitle) {
            blockTitleBundle = BundleCollector.collectZone(
                store,
                blockParams.blockTitle as unknown as string
            );
        }
        return {
            blockParams: Object.assign(
                {},
                structuredClone(blockParams?.blockParams),
                {
                    childrenBlockBodiesId: undefined,
                    parentId: undefined,
                }
            ),
            header: blockParams?.header ? blockParams.header : false,
            blockTitle: blockTitleBundle,
            headerSecondRow: blockParams?.headerSecondRow
                ? blockParams.headerSecondRow
                : false,
            blockBodies: blockBodies,
        };
    }
    public static collectBlockArea(store: Store): BlockAreaBundle {
        const blocks: Array<BlockBundle> = Array(
            store.state.structure.blocks.blocksComponentOPTIM.size
        );
        store.state.structure.blocks.blocksComponentOPTIM.forEach((block) => {
            if (block.index !== undefined) {
                blocks.splice(block.index, 0, block.getBundle());
            } else {
                blocks.push(block.getBundle());
            }
        });
        const windows: Array<ZoneBundle> = [];
        store.state.structure.windows.forEach((id) => {
            const tmp = store.state.structure.zones.zoneComponents.get(id);
            if (tmp) {
                windows.push(tmp.getBundle());
            }
        });
        return { blocks: blocks, windows: windows };
    }
    public static collectProject(store: Store): ProjectBundle {
        console.log(3, store.state);
        return {
            structure: BundleCollector.collectBlockArea(store),
            fonts: {
                redefine: store.getters["environment/redefineFonts"],
                pageFonts: store.getters["environment/pageFonts"],
            },
        };
    }
}
export class BundleUncollector {
    public static async uncollectSecondItem(
        store: Store,
        itemBundle: ItemBundle,
        parentID: id
    ): Promise<id> {
        const params = { ...itemBundle, parentId: "" } as ItemParams;
        return store.dispatch("structure/zones/ADD_SECONDS_ITEM_TO_ZONE", {
            parentZoneId: parentID,
            params: params,
        });
    }
    public static async uncollectItem(
        store: Store,
        itemBundle: ItemBundle,
        parentID: id,
        index?: number
    ): Promise<id> {
        const params = { ...itemBundle, parentId: "" } as ItemParams;
        return store.dispatch("structure/zones/ADD_ITEM_TO_ZONE", {
            parentZoneId: parentID,
            params: params,
            index: index,
        });
    }
    public static async uncollectZone(
        store: Store,
        zoneBundle: ZoneBundle,
        parentID: id,
        index?: number
    ): Promise<id | false> {
        const params = {
            ...zoneBundle.zoneParams,
            parentId: "",
            childrenIds: [],
        } as unknown as ZoneParams;
        let zoneID: false | string = false;
        if (params.type === ZoneTypes.window) {
            zoneID = (await store.dispatch(
                "structure/ADD_WINDOW_TO_BLOCK_AREA",
                params
            )) as string | false;
        }
        if (params.type === ZoneTypes.blockHeader) {
            if (params.isSecondRow) {
                zoneID = await store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_SECOND_ROW_TO_BLOCK",
                    { blockId: parentID, params: params }
                );
            } else {
                zoneID = await store.dispatch(
                    "structure/blocks/ADD_BLOCK_HEADER_TO_BLOCK",
                    { blockId: parentID, params: params }
                );
            }
        } else if (params.type === ZoneTypes.blockTitle) {
            zoneID = await store.dispatch(
                "structure/blocks/ADD_BLOCK_TITLE_TO_BLOCK",
                { blockId: parentID, params: params }
            );
        } else {
            zoneID = await store.dispatch(
                "structure/blockBodies/ADD_ZONE_TO_BLOCK_BODY",
                {
                    blockBodyId: parentID,
                    zoneParams: params,
                    index: index,
                }
            );
        }

        if (zoneID !== false) {
            const id = zoneID;
            zoneBundle.items.forEach((itemBundle) => {
                BundleUncollector.uncollectItem(store, itemBundle, id);
            });
            zoneBundle.secondItems?.forEach((itemBundle) => {
                BundleUncollector.uncollectSecondItem(store, itemBundle, id);
            });
        }

        return zoneID;
    }
    public static async uncollectBlockBody(
        store: Store,
        blockBodyBundle: BlockBodyBundle,
        parentID: id
    ): Promise<id> {
        const params = {
            ...blockBodyBundle.blockBodyParams,
            parentId: "",
            childrenIds: [],
        } as BlockBodyParams;
        const blockBodyID = await store.dispatch(
            "structure/blocks/ADD_BLOCK_BODY_TO_BLOCK",
            {
                blockId: parentID,
                childrenParams: params,
            }
        );
        blockBodyBundle.zones.forEach((zoneBundle) => {
            BundleUncollector.uncollectZone(store, zoneBundle, blockBodyID);
        });
        return blockBodyID;
    }
    public static async uncollectBlock(
        store: Store,
        blockBundle: BlockBundle,
        parentID: id,
        index?: number
    ): Promise<id> {
        const params = {
            ...blockBundle.blockParams,
            parentId: "",
            childrenBlockBodiesId: [],
            header: false,
            headerSecondRow: false,
            blockTitle: false, ///Нужно, чтобы добавлися только после рендера
        } as BlockParams;
        const blockID = await store.dispatch("structure/blocks/ADD_BLOCK", {
            parentBlockArea: parentID,
            params: params,
            index: index,
        });
        if (blockBundle.blockTitle !== false) {
            BundleUncollector.uncollectZone(
                store,
                blockBundle.blockTitle,
                blockID
            );
        }
        // В старых блоках header может быть undefined
        if (blockBundle.header) {
            BundleUncollector.uncollectZone(store, blockBundle.header, blockID);
        }
        if (blockBundle.headerSecondRow) {
            BundleUncollector.uncollectZone(
                store,
                blockBundle.headerSecondRow,
                blockID
            );
        }
        blockBundle.blockBodies.forEach((blockBodiesBundle) => {
            BundleUncollector.uncollectBlockBody(
                store,
                blockBodiesBundle,
                blockID
            );
        });

        return blockID;
    }
    public static async uncollectBlockArea(
        store: Store,
        blockAreaBundle: BlockAreaBundle
    ): Promise<id> {
        await store.dispatch("structure/CLEAR", undefined);

        const blockAreaID = store.getters["structure/getBlockAreaId"];
        if (
            blockAreaBundle.blocks.length < 1 &&
            blockAreaBundle.windows.length < 1
        ) {
            store.commit("project/SET_EMPTY", true); //для проверки пустоты проекта
        } else {
            store.commit("project/SET_EMPTY", false);
        }
        blockAreaBundle.blocks.forEach((blockBundle) => {
            BundleUncollector.uncollectBlock(store, blockBundle, blockAreaID);
        });
        blockAreaBundle.windows.forEach((window) => {
            BundleUncollector.uncollectZone(store, window, blockAreaID);
        });

        return blockAreaID;
    }
    public static async uncollectProject(
        store: Store,
        project: ProjectBundle
    ): Promise<void> {
        BundleUncollector.uncollectBlockArea(store, project.structure);
        store.dispatch("environment/CHANGE_FONT_PAGE", project.fonts.pageFonts);
        store.dispatch(
            "environment/CHANGE_REDEFINE_FONTS",
            project.fonts.redefine
        );
    }
}

export class CopyPaste {
    public static async copy(value: string) {
        try {
            await navigator.clipboard.writeText(value);
            NotificationService.common().success({
                text: "Cкопировано",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при копировании элемента",
            });
        }
    }
    public static async paste(): Promise<string> {
        return navigator.clipboard.readText();
    }
    public static async copyItem(store: Store, itemId: string) {
        try {
            const copiedItem = BundleCollector.collectItem(store, itemId);
            await navigator.clipboard.writeText(JSON.stringify(copiedItem));
            NotificationService.common().success({
                text: "Элемент успешно скопирован",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при копировании элемента",
            });
        }
    }
    public static async pasteItem(store: Store, zoneId: string, index: number) {
        try {
            const copiedItem = JSON.parse(
                await navigator.clipboard.readText()
            ) as ItemBundle;

            await BundleUncollector.uncollectItem(
                store,
                copiedItem,
                zoneId as unknown as string,
                index as number
            );
            NotificationService.common().success({
                text: "Элемент успешно вставлен",
            });
            // return true;
        } catch (error) {
            new CriticalError({
                bundle: BundleCollector.collectProject(store),
                message: "test",
            });
            NotificationService.common().error({
                text: "Ошибка при вставке элемента",
                delay: 3000,
            });
            new CommonError({
                bundle: BundleCollector.collectProject(store),
                message: "Ошибка вставки Item",
                targetId: zoneId,
            });
        }
    }
    public static async cloneItem(
        store: Store,
        itemId: string,
        zoneId: string,
        index: number
    ) {
        try {
            const copiedItem = BundleCollector.collectItem(store, itemId);

            await BundleUncollector.uncollectItem(
                store,
                copiedItem,
                zoneId as unknown as string,
                index as number
            );
            NotificationService.common().success({
                text: "Элемент успешно сдублирован",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при дублировании элемента",
                delay: 3000,
            });
        }
    }
    //TODO убрать нахуй отсуда
    public static async deleteItem(
        store: Store,
        itemId: string,
        zoneId: string
    ) {
        try {
            store.dispatch("structure/zones/REMOVE_ITEM", {
                zoneID: zoneId,
                itemID: itemId,
            });
            NotificationService.common().success({
                text: "Элемент успешно удален",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при удалении элемента",
                delay: 3000,
            });
        }
    }

    public static async copyBlock(store: Store, blockId: string) {
        try {
            const copiedBlock = BundleCollector.collectBlock(store, blockId);
            await navigator.clipboard.writeText(JSON.stringify(copiedBlock));
            NotificationService.common().success({
                text: "Блок успешно скопирован",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при копировании блока",
            });
        }
    }
    public static async pasteBlock(store: Store, index: number) {
        try {
            const copiedBlock = JSON.parse(
                await navigator.clipboard.readText()
            ) as BlockBundle;

            blockBundleSchema.parse(copiedBlock);
            await BundleUncollector.uncollectBlock(
                store,
                copiedBlock,
                store.getters["structure/getBlockAreaId"],
                index
            );
            NotificationService.common().success({
                text: "Блок успешно вставлен",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при вставлении блока",
                delay: 3000,
            });
        }
    }
    public static async cloneBlock(store: Store, blockId: string) {
        try {
            const copiedItem = BundleCollector.collectBlock(store, blockId);

            await BundleUncollector.uncollectBlock(
                store,
                copiedItem,
                store.getters["structure/getBlockAreaId"],
                store.getters["structure/getBlockAreaChildren"].indexOf(
                    blockId
                ) + 1
            );
            NotificationService.common().success({
                text: "Блок успешно склонирован",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при клонировании блока",
                delay: 3000,
            });
        }
    }
    //TODO убрать нахуй отсуда
    public static async deleteBlock(store: Store, blockId: string) {
        try {
            store.dispatch("structure/REMOVE_BLOCK", blockId);
            NotificationService.common().success({
                text: "Блок успешно удален",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при удалении блока",
                delay: 3000,
            });
        }
    }
    public static async blockToGlobal(store: Store, blockId: string) {
        try {
            if (!store.getters["user/getIsCommonUser"]) return;
            const copiedBlock = BundleCollector.collectBlock(store, blockId);
            BlockRedactorService.open(copiedBlock);
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при добавлении к моим блокам!",
                delay: 3000,
            });
        }
    }
    public static async copyZone(store: Store, zoneId: string) {
        try {
            const copiedBlock = BundleCollector.collectZone(store, zoneId);
            await navigator.clipboard.writeText(JSON.stringify(copiedBlock));
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при копировании Зоны",
            });
        }
    }
    public static async pasteZone(store: Store, parentId: id, index?: number) {
        try {
            const copiedZone = JSON.parse(
                await navigator.clipboard.readText()
            ) as ZoneBundle;

            zoneBundleSchema.parse(copiedZone);

            await BundleUncollector.uncollectZone(
                store,
                copiedZone,
                parentId,
                index
            );
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при вставлении Зоны",
                delay: 3000,
            });
        }
    }
    public static async cloneZone(
        store: Store,
        zoneId: string,
        index?: number
    ) {
        try {
            const copiedItem = BundleCollector.collectZone(store, zoneId);
            const parent =
                store.getters["structure/zones/getZoneParamsById"](
                    zoneId
                ).parentId;
            await BundleUncollector.uncollectZone(
                store,
                copiedItem,
                parent,
                index
            );
            NotificationService.common().success({
                text: "Зона успешно сдублирована",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при дублировании Zone",
                delay: 3000,
            });
        }
    }
    //TODO убрать нахуй отсуда
    public static async deleteZone(store: Store, zoneId: string) {
        try {
            const zonesParent =
                store.getters["structure/zones/getZoneParamsById"](
                    zoneId
                ).parentId;

            await store.dispatch("structure/blockBodies/REMOVE_ZONE", {
                blockBodyID: zonesParent,
                zoneID: zoneId,
            });
            NotificationService.common().success({
                text: "Зона успешно удалена",
            });
        } catch (error) {
            NotificationService.common().error({
                text: "Ошибка при удалении зоны",
                delay: 3000,
            });
        }
    }
}

export function fontsLink(store: Store): string {
    // const fontState = store.getters["environment/pageFonts"];
    const arrFonts = [
        store.getters["environment/pageFonts"].header1.replace(/\s+/g, "+"),
        store.getters["environment/pageFonts"].header2.replace(/\s+/g, "+"),
        store.getters["environment/pageFonts"].text.replace(/\s+/g, "+"),
        store.getters["environment/pageFonts"].quote.replace(/\s+/g, "+"),
    ];
    const arrUniqFonts = Array.from(new Set(arrFonts));
    let strLink = "";
    for (let i = 0; i < arrUniqFonts.length; i++) {
        strLink += `&family=${arrUniqFonts[i]}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900`;
    }

    const linkFonts = `@import url("https://fonts.googleapis.com/css2?display=swap${strLink}");`;
    return linkFonts;
}
