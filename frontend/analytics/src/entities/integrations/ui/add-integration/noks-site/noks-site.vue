<template>
    <v-card-title>Интеграция</v-card-title>
    <p class="px-4">
        Для того чтобы настроить и начать использовать LandingPage, нужно ввести
        данные
    </p>

    <v-card-text>
        <v-form ref="form" class="mb-2">
            <label>Выберите сайт для интеграции</label>
            <v-select
                :items="sitesList"
                variant="outlined"
                density="compact"
                class="mt-1"
                v-model="siteIntegrationData"
                @update:model-value="checkSite"
            ></v-select>
        </v-form>

        <v-expand-transition>
            <span v-if="postIsError" class="text-error">{{ postError }}</span>
        </v-expand-transition>
        <v-expand-transition>
            <span v-if="successFlag" class="text-success">
                Сайт успешно привязан
            </span>
        </v-expand-transition>
    </v-card-text>
    <v-card-actions>
        <v-spacer />
        <v-btn
            :text="!successFlag ? 'Отправить' : 'Закрыть окно'"
            color="primary"
            variant="flat"
            size="default"
            :loading="postIsLoading"
            @click="!successFlag ? addIntegration() : emits('onClose')"
        />
    </v-card-actions>
</template>

<script setup lang="ts">
import useAsyncState from "@/shared/composables/useAsyncState";

import { computed } from "vue";
import { defineProps, defineEmits } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

import { NoksModel, NoksSites, NoksSitesItem } from "@/entities/noks";
import { ApiNoks } from "@/shared/api/modules/Noks";
import { onMounted } from "vue";
type Props = {
    id: number;
};
type Emits = {
    onClose: [];
};
// isModalOpen: false;

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const form = ref();

const siteIntegrationData = ref();

const successFlag = ref(false);
const onPostSuccess = (result: boolean) => {
    if (!result) throw "Не удалось";
    successFlag.value = true;
};

const {
    isLoading: postIsLoading,
    isError: postIsError,
    error: postError,
    executeRequest: executePost,
} = useAsyncState({
    request: NoksModel.postIntegrationAuthSource,
    immediate: false,
    onSuccess: onPostSuccess,
});
const route = useRoute();
const statId = computed(() => route.params.statId);

//TODO как получить номер интеграции если она еще не создана. В какой последовательности создавать интеграцию НОКС?
// const sites = ref<NoksSites>([]);

let sites = ref<NoksSites>([]);
// let sites = [] as Array<NoksSites>;

onMounted(async () => {
    try {
        const response = await NoksModel.getSites(
            Number(props.id),
            Number(statId.value)
        );

        sites.value = response;
    } catch (error) {
        console.error("Ошибка при загрузке сайтов:", error);
    }
});

const sitesList = computed(() => {
    return sites.value.map((item: any) => item.name as string);
});

const addIntegration = async () => {
    if (!form.value) return;
    const siteFind: NoksSitesItem | undefined = sites.value.find(
        (item: any) => item.name === siteIntegrationData.value
    );

    if (siteFind) {
        executePost(Number(statId.value), props.id, siteFind.site_id);
    }
};

const checkSite = () => {
    // console.log("siteIntegrationData", siteIntegrationData.value);
};
</script>

<style scoped>
.class {
    color: resolveDirective;
}
</style>
