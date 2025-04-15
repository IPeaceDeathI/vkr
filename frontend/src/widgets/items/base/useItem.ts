import { useStore } from "@/app/providers";
import { getItemStyles } from "@/shared/services";
import { ItemBundle, ItemParams } from "@/types";
import {
    IDesktopSidesPadding,
    IMobileSidesPadding,
} from "@/widgets/injectKeys";
import { useElement } from "@/widgets/useElement";
import {
    Ref,
    ShallowRef,
    computed,
    inject,
    onMounted,
    onUnmounted,
    triggerRef,
    watch,
} from "vue";

//OPTIMIZATION тут возникнет проблема, при реализации cntrl+z так как нуждно будет выдавать на верх новое значение
export const useItem = (
    params: ShallowRef<Omit<ItemParams, "parentId">>,
    id: Ref<string>
) => {
    const { wrp } = useElement();
    const itemSides = inject(IDesktopSidesPadding);
    const itemMobileSides = inject(IMobileSidesPadding);
    if (itemSides && itemMobileSides) {
        watch(itemSides, (newVal) => {
            params.value.paddings.desktop = newVal;
            triggerRef(params);
        });
        watch(itemMobileSides, (newVal) => {
            params.value.paddings.mobile = newVal;
            triggerRef(params);
        });
    }
    const styles = computed<string>(() => {
        return getItemStyles({ elementId: id.value, ItemParams: params.value });
    });
    const getMeAsBundle = function (): ItemBundle {
        return params.value;
    };
    const setMeFromBundle = function (value: ItemBundle) {
        params.value = { ...value };
        triggerRef(params);
    };
    const getWidth = function (): number | "100%" | undefined {
        return params.value.width;
    };
    const setWidth = function (value: number | "100%" | undefined) {
        params.value.width = value;
        triggerRef(params);
    };
    onMounted(() => {
        useStore().state.structure.items.itemsComponentOPTIM.set(id.value, {
            getBundle: getMeAsBundle,
            setBundle: setMeFromBundle,
            getWidth,
            setWidth,
        });
    });
    onUnmounted(() => {
        useStore().state.structure.items.itemsComponentOPTIM.delete(id.value);
    });
    return { id, wrp, styles, getMeAsBundle };
};
