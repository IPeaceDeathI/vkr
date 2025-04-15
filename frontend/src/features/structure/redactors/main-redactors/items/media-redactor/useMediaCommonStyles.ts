import { BorderRadius, ImageSize, ItemImageParams } from "@/types";
import { Ref, computed } from "vue";
type SetterFunction = (value: ItemImageParams["commonStyles"]) => void;

export function useMediaCommonStyles(
    commonStyles: Ref<ItemImageParams["commonStyles"]>,
    setter: SetterFunction
) {
    const toggleSize = computed<boolean>({
        get(): boolean {
            if (commonStyles.value.backgroundSize == ImageSize.cover)
                return true;
            else return false;
        },
        set(value: boolean) {
            const size = value ? ImageSize.cover : ImageSize.contain;
            setter({
                ...commonStyles.value,
                backgroundSize: size,
            });
        },
    });

    const borderRadius = computed<BorderRadius>({
        get(): BorderRadius {
            return commonStyles.value.borderRadius.value;
        },
        set(value: BorderRadius) {
            setter({
                ...commonStyles.value,
                borderRadius: {
                    ...commonStyles.value.borderRadius,
                    value: value,
                },
            });
        },
    });

    const toggleBorderRadius = computed<boolean>({
        get(): boolean {
            return commonStyles.value.borderRadius.enabled;
        },
        set(value: boolean) {
            setter({
                ...commonStyles.value,
                borderRadius: {
                    ...commonStyles.value.borderRadius,
                    enabled: value,
                },
            });
        },
    });
    return {
        toggleBorderRadius: toggleBorderRadius,
        borderRadius: borderRadius,
        toggleSize: toggleSize,
    };
}
