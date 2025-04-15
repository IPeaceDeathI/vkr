<template>
    <v-list-item class="tree__node__list-item bg-background" density="compact">
        <span class="tree__node__list-item__name"
            >{{
                nameByType(
                    integrationInfo.integration_type,
                    integrationInfo.type
                )
            }}
        </span>
        <v-btn
            size="x-small"
            variant="plain"
            :ripple="false"
            @click.stop="
                router.push({
                    name: ROUTE_NAMES.Settings_Integrations_Edit,
                    params: {
                        id: integrationInfo.integration_id,
                    },
                })
            "
        >
            <v-icon size="default" icon="mdi-cog" />
            <v-tooltip text="Настроить интеграцию" location="top" />
        </v-btn>
        <template #prepend>
            <v-icon size="small" icon="mdi-check-circle" color="success">
            </v-icon>
            <v-tooltip text="Статус" location="top" />
        </template>
        <template #append>
            <v-btn
                disabled
                class="tree__node__list-item__remove-btn"
                size="x-small"
                variant="plain"
                :ripple="false"
                @click.stop="emit('remove')"
            >
                <v-icon size="large" icon="mdi-delete" color="error" />
                <v-tooltip text="Удалить интеграции" location="top" />
            </v-btn>
        </template>
    </v-list-item>
</template>
<script setup lang="ts">
// integrationTypeToName,
import {
    CATEGORY_ADVERTISING_CHANNELS,
    CATEGORY_CRM,
    CATEGORY_LEAD_SOURCE,
    INTEGRATION_CATEGORY,
    INTEGRATION_STATUS,
    IntegrationItem,
} from "@/entities/integrations";
import { ROUTE_NAMES } from "@/pages";
import { toRefs } from "vue";
import { defineEmits, ref, defineProps } from "vue";
import { useRouter } from "vue-router";
//types
type Props = {
    integrationInfo: IntegrationItem;
};

type Emit = {
    remove: [];
};
const router = useRouter();
const props = defineProps<Props>();
const emit = defineEmits<Emit>();
// import {
//     CATEGORY_ADVERTISING_CHANNELS,
//     CATEGORY_CRM,
//     CATEGORY_LEAD_SOURCE,
//     Integration,
//     INTEGRATION_CATEGORY,
//     INTEGRATION_STATUS,
//     IntegrationItem,
//     integrationTypeToName,
// } from "@/entities/integrations";
//integration
const { integrationInfo } = toRefs(props);
//constants
const INTEGRATION_STATUS_TO_ICON = ref<{
    [key in INTEGRATION_STATUS]: { icon: string; color: string };
}>({
    [INTEGRATION_STATUS.SUCCESS]: {
        icon: "mdi-check-circle",
        color: "success",
    },
    [INTEGRATION_STATUS.WARNING]: {
        icon: "mdi-alert",
        color: "warning",
    },
    [INTEGRATION_STATUS.ERROR]: {
        icon: "mdi-alert-circle",
        color: "error",
    },
    [INTEGRATION_STATUS.IN_PROGRESS]: {
        icon: "mdi-pause-circle",
        color: "grey",
    },
});

//Определеляем имя Item Интеграции. получаем type смотри какая категория int_type/По ней выбираем нужный объект и получаем имя type
const nameByType = (integration_type: INTEGRATION_CATEGORY, type: number) => {
    switch (integration_type) {
        case INTEGRATION_CATEGORY.ADVERTISING_CHANNELS:
            switch (type) {
                case 1:
                    return "YandexDirect";
                case 2:
                    return "GoogleAds";
                default:
                    return "";
            }
        case INTEGRATION_CATEGORY.LEAD_SOURCE:
            switch (type) {
                case 1:
                    return "NoksSite";
                case 2:
                    return "WebHook";
                case 3:
                    return "Flexbe";
                case 4:
                    return "Tilda";
                default:
                    return "";
            }
        case INTEGRATION_CATEGORY.CRM:
            switch (type) {
                case 1:
                    return "amoCRM";
                default:
                    return "";
            }
        default:
            return "";
    }
};

// const category = ref("");
// Вызываем функцию для определения категории при создании компонента
// category.value = getCategoryByType(
//     integrationInfo.value.integration_type,
//     integrationInfo.value
// );
// Функция для получения ключа по значению из перечисления
// const getKeyByValue = (value: number, enumObj: any) => {
//     return Object.keys(enumObj).find((key) => enumObj[key] === value);
// };

// Функция для определения категории в зависимости от типа интеграции
// const getCategoryByType = (
//     integrationType: INTEGRATION_CATEGORY,
//     integrationInfo: IntegrationItem
// ) => {
//     switch (integrationType) {
//         case INTEGRATION_CATEGORY.LEAD_SOURCE:
//             return (
//                 getKeyByValue(integrationInfo.type, CATEGORY_LEAD_SOURCE) || ""
//             );
//         case INTEGRATION_CATEGORY.CRM:
//             return getKeyByValue(integrationInfo.type, CATEGORY_CRM) || "";
//         case INTEGRATION_CATEGORY.ADVERTISING_CHANNELS:
//             return (
//                 getKeyByValue(
//                     integrationInfo.type,
//                     CATEGORY_ADVERTISING_CHANNELS
//                 ) || ""
//             );
//         default:
//             return "";
//     }
// };

// Функция для определения категории в зависимости от типа интеграции
// const intName = computed(() => getCategory(2));
// const getCategory = (integrationType: INTEGRATION_CATEGORY) => {
//     if (getKeyByValue != undefined) {
//         switch (integrationType) {
//             case INTEGRATION_CATEGORY.LEAD_SOURCE:
//                 category.value = getKeyByValue(
//                     integrationInfo.type,
//                     CATEGORY_LEAD_SOURCE
//                 );
//                 break;
//             case INTEGRATION_CATEGORY.CRM:
//                 category.value = getKeyByValue(
//                     integrationInfo.type,
//                     CATEGORY_CRM
//                 );
//                 break;
//             case INTEGRATION_CATEGORY.ADVERTISING_CHANNELS:
//                 category.value = getKeyByValue(
//                     integrationInfo.type,
//                     CATEGORY_ADVERTISING_CHANNELS
//                 );
//                 break;
//             default:
//                 category.value = "";
//         }
//         return category.value;
//     }
// };
</script>

<style scoped lang="scss">
$border: solid #d1d4d6 1px;

.tree__node__list-item {
    outline: $border;
    border-radius: 6px;
    margin-bottom: 12px;
    & ::v-deep(.v-list-item__prepend) {
        width: 25px;
    }
    & ::v-deep(.v-list-item__content) {
        display: flex;
        align-items: center;
    }
    & ::v-deep(.v-list-item__append) {
        width: 20px;
        padding-bottom: 3px;
    }
    &:hover {
        .tree__node__list-item__remove-btn {
            opacity: 0.5;
        }
    }
}
.tree__node__list-item__name {
    display: inline-block;
    overflow-x: hidden;
    text-overflow: ellipsis;
}
.tree__node__list-item__remove-btn {
    opacity: 0;
    &:hover {
        opacity: 1 !important;
    }
    transition: opacity 0.3s ease;
}
</style>
