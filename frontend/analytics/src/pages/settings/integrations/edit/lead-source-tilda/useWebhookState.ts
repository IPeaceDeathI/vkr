import { watch, Ref, onMounted } from "vue";

export type Props = {
    isOpen: boolean;
    typeLeadSourceItntegration: number;
};

//предоставляет возможность выполнить инициализирующий запрос при переходе на вкладку шага

export default function useWEbhookStep(
    isOpen: Ref<boolean>,
    initialRequest?: (integration_id: number, stat_id: number) => any
) {
    watch(isOpen, (newValue) => {
        if (initialRequest) {
            // initialRequest(11, 12);
        }
    });

    return { isOpen };
}
