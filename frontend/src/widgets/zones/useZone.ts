//OPTIMIZATION

import { Ref, ShallowRef, computed, onMounted, onUnmounted, ref } from "vue";
import { getZoneStyles } from "@/shared/services";
import { ItemBundle, ZoneBundle, ZoneParams } from "@/types";
import itemsList from "./items-list/items-list.vue";
import { useStore } from "@/app/providers";
import headerItemsList from "./block-header/_header-items-list.vue";

export default function useZone(
    id: Ref<string>,
    zoneParams: ShallowRef<Omit<ZoneParams, "parentId" | "childrenIds">>,
    itemListRef: Ref<typeof itemsList | typeof headerItemsList | undefined>,
    secondItemListRef?: Ref<typeof itemsList | undefined>
) {
    const store = useStore();
    const zoneHTMLWrapper = ref<null | HTMLElement>(null);
    const styles = computed(() => {
        return getZoneStyles({
            elementId: id.value,
            ZoneParams: zoneParams.value,
        });
    });
    const collectItems = (): Array<ItemBundle> => {
        //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getItemBundles не найдено
        if (itemListRef.value) {
            return itemListRef.value.getItemBundles();
        } else {
            throw "not found";
        }
    };
    const collectSecondItems = (): Array<ItemBundle> => {
        //OPTIMIZATION сделать подробнеую ошибку через WarningError, если getItemBundles не найдено
        if (secondItemListRef && secondItemListRef.value) {
            return secondItemListRef.value.getItemBundles();
        } else {
            throw "not found";
        }
    };
    const getMeAsBundle = function (): ZoneBundle {
        const bundle: ZoneBundle = {
            zoneParams: zoneParams.value,
            items: collectItems(),
        };
        if (secondItemListRef && secondItemListRef.value) {
            bundle.secondItems = collectSecondItems();
        }
        return bundle;
    };
    const setMeAsBundle = function (bundle: ZoneBundle): void {
        zoneParams.value = bundle.zoneParams;
    };
    onMounted(() => {
        store.state.structure.zones.zoneComponents.set(id.value, {
            getBundle: getMeAsBundle,
            setBundle: setMeAsBundle,
        });
    });
    onUnmounted(() => {
        store.state.structure.zones.zoneComponents.delete(id.value);
    });
    return { zoneHTMLWrapper, id, styles };
}
