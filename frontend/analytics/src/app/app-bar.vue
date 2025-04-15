<template>
    <v-app-bar color="white" density="compact" class="noks-app-bar">
        <template v-slot:prepend>
            <!-- <v-app-bar-nav-icon
                v-if="isMobile"
                :ripple="false"
                variant="text"
                @click.stop="emits('clickNavIcon')"
            /> -->
            <!-- <v-img
                :style="{ cursor: 'pointer' }"
                cover
                :width="40"
                :src="require('@/assets/logo.png')"
                @click="router.push({ name: ROUTE_NAMES.Main })"
            /> -->
            <!-- TODO Добавить проверку на отсутсвие названия проекта -->
            <v-autocomplete
                density="compact"
                :loading="stats === undefined"
                :items="stats"
                variant="solo"
                v-model="selectedStat"
                base-color="secondary"
                color="secondary"
                item-title="name"
                item-value="stat_id"
                no-data-text="Проекты не найдены"
                return-object
                class="noks-app-bar__stats-selector"
            >
                <template #item="{ item, props }">
                    <v-list-item
                        density="compact"
                        v-bind="props"
                        :title="
                            item.raw.name === ''
                                ? 'Проект без название'
                                : item.raw.name
                        "
                        :subtitle="`#${item.raw.stat_id}`"
                    />
                </template>
                <template #selection="{ item }">
                    {{
                        `${
                            item.raw.name === ""
                                ? "Проект без название"
                                : item.raw.name
                        } #${item.raw.stat_id}`
                    }}
                </template>
            </v-autocomplete>
            <v-btn
                size="default"
                density="compact"
                icon
                class="ml-2"
                color="#eee"
                variant="flat"
            >
                <v-icon icon="mdi-plus" />
                <v-tooltip activator="parent" text="Добавить новый проект" />
                <add-stat-dialog />
            </v-btn>
            <v-btn
                :href="statIdLink"
                size="default"
                density="compact"
                icon
                class="ml-2"
                color="#eee"
                variant="flat"
            >
                <v-icon icon="mdi-tune-variant" />
                <v-tooltip activator="parent" text="Настройки" />
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ROUTE_NAMES } from "@/pages";
import { defineEmits, defineProps, onMounted, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import addStatDialog from "@/entities/user-info/ui/add-stat-dialog.vue";
import { useStatStore } from "@/entities/stat/store";
import { Stat } from "@/entities/stat/types";
//TODOПеренести компонент в нужную папку

type Props = {
    isMobile: boolean;
};

type Emits = {
    clickNavIcon: [];
};
const router = useRouter();

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const { isMobile } = toRefs(props);

const { stats, selectedStatId } = storeToRefs(useStatStore());
const { setSelectedStatId } = useStatStore();

const selectedStat = computed<Stat | undefined>({
    get: () => {
        return stats.value?.find((stat) => {
            return stat.stat_id === selectedStatId.value;
        });
    },
    set: (value) => {
        if (!value) return;
        const setResult = setSelectedStatId(value.stat_id);

        if (setResult) {
            router
                .push({
                    name: ROUTE_NAMES.MultiChannelAnalytics,
                    params: { statId: value.stat_id },
                })
                .then(() => {
                    router.go(0);
                });
        }
    },
});

const route = useRoute();
const statIdLink = computed(
    () => `/stats/${route.params.statId}/settings/integrations/`
);
</script>

<style scoped lang="scss">
$height: 30px;
.noks-app-bar__stats-selector {
    /*margin-left: 20px;*/
    border-radius: 5px;
    width: 250px;
    height: $height;
    padding-right: 2px;
    & ::v-deep(.v-input__control) {
        height: $height;
    }
    & ::v-deep(.v-field__field) {
        height: $height;
    }
    & ::v-deep(.v-field) {
        padding-right: 2px;
    }
    & ::v-deep(.v-field__input) {
        padding: 2px 8px;
        margin-top: -4px;
        font-size: 13px;
    }
}
.noks-app-bar {
    border-bottom: 1px solid #e8eaeb;
    box-shadow: none !important;
}
</style>
<style lang="scss">
.v-field--variant-solo,
.v-field--variant-solo-filled {
    box-shadow: none !important;
}
</style>
