import { ref, watch } from "vue";
import { RouteLocationRaw, useRoute } from "vue-router";

// Возвращает массив всех route в дереве полного пути, для корректной работы следует указывать meta name на нужном языке
type RoutePath = {
    route: RouteLocationRaw;
    title: string;
    disabled: boolean;
};
export const useRouteFullPath = () => {
    const fullPath = ref<Array<RoutePath>>([]);
    const route = useRoute();
    //TODO доработать для путей с параметрами
    watch(
        () => route.matched,
        (newMathced) => {
            const fullPathMap = new Map<string, RoutePath>();
            [...newMathced].forEach((match, index) => {
                const title = match?.meta?.name ?? "";
                const name: string = match?.meta?.routeName ?? "";
                fullPathMap.set(match.path, {
                    route: {
                        path: match.path,
                        name: name,
                        params: route.params,
                    },
                    title,
                    disabled: index === newMathced.length - 1,
                });
            });
            fullPath.value = Array.from(fullPathMap.values());
            return;
        },
        { immediate: true }
    );
    return { fullPath };
};
