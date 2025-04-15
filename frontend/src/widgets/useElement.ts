import { getUUID } from "@/shared/helpers";
import { ref, onMounted, defineExpose } from "vue";

export const useElement = () => {
    const id = ref<string>(getUUID());
    const wrp = ref<null | HTMLElement>(null);
    return { id, wrp };
};
