import { BorderRadius, ImageSize, ItemImageParams } from "@/types";
import { computed, toRef } from "vue";
type tfsfsdfd = (value: ItemImageParams["commonStyles"]) => void;

export function useTmp(
    commonStyles: ItemImageParams["commonStyles"],
    setter: tfsfsdfd
) {
    const myCommonStyles = toRef(commonStyles);

    const toggleSize = computed<boolean>({
        get(): boolean {
            if (myCommonStyles.value.backgroundSize == ImageSize.cover)
                return true;
            else return false;
        },
        set(value: boolean) {
            const size = value ? ImageSize.cover : ImageSize.contain;
            setter({
                ...myCommonStyles.value,
                backgroundSize: size,
            });
        },
    });
    const borderRadius = computed<BorderRadius>({
        get(): BorderRadius {
            return myCommonStyles.value.borderRadius.value;
        },
        set(value: BorderRadius) {
            setter({
                ...myCommonStyles.value,
                borderRadius: {
                    ...myCommonStyles.value.borderRadius,
                    value: value,
                },
            });
        },
    });

    const toggleBorderRadius = computed<boolean>({
        get(): boolean {
            console.log(myCommonStyles.value.borderRadius.enabled);

            return myCommonStyles.value.borderRadius.enabled;
        },
        set(value: boolean) {
            setter({
                ...myCommonStyles.value,
                borderRadius: {
                    ...myCommonStyles.value.borderRadius,
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
