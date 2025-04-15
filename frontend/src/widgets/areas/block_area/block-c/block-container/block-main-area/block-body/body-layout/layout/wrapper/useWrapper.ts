import { CardsOrientation, ColumnCols, ZoneBundle, ZoneParams } from "@/types";
import { Ref, computed } from "vue";
import { dragOptions } from "@/shared/config";
import { useStore } from "@/app/providers";
import { CriticalError } from "@/shared/services/error_service";
type DraggableEndEvent = {
    to: HTMLElement;
    from: HTMLElement;
    oldIndex: number;
    newIndex: number;
};
const useWrapper = (
    zonesProps: Ref<{ id: string; bundle: ZoneBundle }[]>,
    updateZone: (
        value: {
            id: string;
            bundle: ZoneBundle;
        }[]
    ) => void
) => {
    const zones = computed<{ id: string; bundle: ZoneBundle }[]>({
        get() {
            return zonesProps.value;
        },
        set(value) {
            updateZone(value);
        },
    });
    const getZoneBundles = function (): Array<ZoneBundle> {
        const zoneMap = useStore().state.structure.zones.zoneComponents;
        return zones.value.map(({ id }) => {
            const tmp = zoneMap.get(id);
            if (!tmp)
                throw new CriticalError({
                    message:
                        "Критическая ошибка при получении пакета зоны " + id,
                });
            //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getMeAsBundle не найдено
            return tmp.getBundle();
        });
    };
    const getZoneBundleById = function (id: string): ZoneBundle {
        const zoneMap = useStore().state.structure.zones.zoneComponents;
        const tmp = zoneMap.get(id);
        if (!tmp)
            throw new CriticalError({
                message: "Критическая ошибка при получении пакета зоны " + id,
            });
        return tmp.getBundle();
    };
    const getZoneBundleByIndex = function (index: number): ZoneBundle {
        const zoneMap = useStore().state.structure.zones.zoneComponents;
        const tmp = zoneMap.get(zones.value[index].id);
        if (!tmp)
            throw new CriticalError({
                message:
                    "Критическая ошибка при получении пакета зоны под номером " +
                    (index + 1),
            });
        return tmp.getBundle();
    };
    const getCardById = function (id: string): {
        setOrintation: (value: CardsOrientation) => void;
    } {
        const cardMap = useStore().state.structure.zones.cards;
        const tmp = cardMap.get(id);
        if (!tmp)
            throw new CriticalError({
                message:
                    "Критическая ошибка при получении пакета карточки " + id,
            });
        return tmp;
    };
    const getColumnById = function (id: string): {
        getCols: () => ColumnCols;
        setCols: (value: ColumnCols) => void;
        reduce: () => boolean;
        increase: () => boolean;
    } {
        const columnMap = useStore().state.structure.zones.columns;
        const tmp = columnMap.get(id);
        if (!tmp)
            throw new CriticalError({
                message:
                    "Критическая ошибка при получении пакета колонки " + id,
            });
        return tmp;
    };
    function endDrag(event: DraggableEndEvent) {
        const blockBodiesMap =
            useStore().state.structure.blockBodies.blockBodiesComponentOPTIM;
        const fromBlockBodyId = event.from
            .closest("[data-block-body-id]")
            ?.getAttribute("data-block-body-id");
        const toBlockBodyId = event.to
            .closest("[data-block-body-id]")
            ?.getAttribute("data-block-body-id");
        if (!toBlockBodyId || !fromBlockBodyId)
            throw new CriticalError({
                message: "Не найден родитель с аттрибутом data-block-body-id",
            });
        //если переместили внутри одного block body
        if (fromBlockBodyId === toBlockBodyId) {
            const tmp = [...zones.value];
            tmp[event.oldIndex] = tmp[event.newIndex];
            tmp[event.newIndex] = zones.value[event.oldIndex];
            updateZone(tmp);
        } else {
            //если переместили в другую  block body
            const zoneBundle = getZoneBundleByIndex(event.oldIndex);
            const newBlockBody = blockBodiesMap.get(toBlockBodyId);
            if (!newBlockBody)
                throw new CriticalError({
                    message: "не найдена вкладка с id " + toBlockBodyId,
                });
            newBlockBody.pasteZone(zoneBundle, event.newIndex);
            //OTIMIZATION оновить ts, чтобб не ругался на toSpliced
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            updateZone(zones.value.toSpliced(event.oldIndex, 1));
        }
        useStore().dispatch("environment/REMOVE_CARD_IS_DRAG", undefined);
        useStore().dispatch("environment/REMOVE_COLUMN_IS_DRAG", undefined);
    }
    return {
        zones,
        dragOption: Object.assign(
            {},
            { handle: "[data-noks-drag-zone]" },
            dragOptions
        ),
        endDrag,
        getZoneBundles,
        getZoneBundleByIndex,
        getZoneBundleById,
        getColumnById,
        getCardById,
    };
};
export default useWrapper;
