<template>
    <section class="amo-settings">
        <h3 class="amo-card__header">
            Загрузка заявок из CRM: расширенные настройки
        </h3>
        <v-fade-transition>
            <v-progress-linear
                v-if="isLoading"
                indeterminate
                color="secondary"
            />
            <v-form
                v-else
                ref="form"
                class="amo-settings__form mt-2 mb-2"
                @submit.prevent="submit"
            >
                <!-- filter -->
                <label class="amo-card__paragraph">
                    Поле для фильтрации
                    <information-icon
                        information="Если вы ведете несколько бизнесов в одной CRM, вы можете выделить каждый из бизнесов через поле фильтрации."
                    />
                </label>
                <v-autocomplete
                    v-model="filter"
                    autofocus
                    :items="fields"
                    v-bind="formFieldsOptions"
                />
                <!-- filte value -->
                <label class="amo-card__paragraph">
                    Значение фильтрации
                    <information-icon
                        information="Если выбрано поле для фильтрации но не введено значение, то будут загружены только те сделки у которых поле пустое . Вы можете использовать Регулярные Выражения для этого фильтра."
                    />
                </label>
                <v-text-field
                    v-model="filterValue"
                    :counter="30"
                    :rules="[maxLengthRule]"
                    v-bind="formFieldsOptions"
                />
                <!-- revenue -->
                <label class="amo-card__paragraph">
                    Поле с выручкой
                    <information-icon
                        information="Выберите дополнительное поле сделки, из которого будет загружаться выручка. Если поле не выбрано, то выручка будет загружаться из стандартного поля в CRM."
                    />
                </label>
                <v-autocomplete
                    v-model="revenue"
                    :items="fields"
                    v-bind="formFieldsOptions"
                />
                <!-- cost -->
                <label class="amo-card__paragraph">
                    Поле себестоимости
                    <information-icon
                        information="Выберите дополнительное поле сделки, из которого будет загружаться себестоимость. Прибыль будет подсчитана автоматически."
                    />
                </label>
                <v-autocomplete
                    v-model="cost"
                    :items="fields"
                    v-bind="formFieldsOptions"
                />
                <!-- profit -->
                <label class="amo-card__paragraph">
                    Поле с прибылью
                    <information-icon
                        information="Выберите дополнительное поле сделки, из которого будет загружаться прибыль. Значение будет использоваться для автоматического подсчета себестоимости."
                    />
                </label>
                <v-autocomplete
                    v-model="profit"
                    :items="fields"
                    v-bind="formFieldsOptions"
                />
                <v-btn
                    type="submit"
                    size="default"
                    variant="flat"
                    color="primary"
                    class="mt-2"
                    :loading="postIsLoading"
                >
                    {{ postBtnText }}
                </v-btn>
                <v-btn
                    size="small"
                    variant="flat"
                    color="primary"
                    class="mt-2 ml-2"
                    icon="mdi-refresh"
                    @click="refresh"
                >
                </v-btn>
            </v-form>
        </v-fade-transition>
        <v-scale-transition>
            <span v-if="isError" class="text-error">{{ error }}</span>
            <span v-if="postIsError" class="text-error">{{ postError }}</span>
        </v-scale-transition>
    </section>
</template>

<script setup lang="ts">
import { defineProps, toRef } from "vue";
import { Props } from "./useAmoStep";
import useAmoState from "./useAmoStep";
import { ref } from "vue";
import { informationIcon } from "@/shared/libs/information-icon";
import useAsyncState from "@/shared/composables/useAsyncState";
import { AmoModel, AmoPostSetting } from "@/entities/amo";
import { useRouter, useRoute } from "vue-router";
import { possibleSteps } from ".";
import { formFieldsOptions } from "./types";
import { computed } from "vue";
const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();

const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);
const {
    data: fields,
    isLoading,
    isError,
    error,
    executeRequest,
} = useAsyncState({
    request: AmoModel.getAllFields,
    initialArgs: [Number(integrationId.value), Number(statId.value)],
});
useAmoState(
    toRef(() => props.isOpen),
    executeRequest
);
//TODO перенести в библу для валидаций
const maxLengthRule = (value: string) => {
    if (value.length > 30) return "Длина поля не должна превышать 30 символов";
    return true;
};

const form = ref();

const filter = ref<null | number>(null);
const filterValue = ref<string>("");
const revenue = ref<null | number>(null);
const cost = ref<null | number>(null);
const profit = ref<null | number>(null);

const submit = async () => {
    try {
        if (!form.value) return;
        if (!(await form.value.validate()).valid) return;
        executePost(
            Number(statId.value),
            Number(integrationId.value),
            collectSetting()
        );
    } catch (error: any) {
        postError.value = "При сохранении возникла ошибка";
        postIsError.value = true;
    }
};

const postBtnText = ref("Сохранить и продолжить");

const onPostSuccess = (data: boolean) => {
    postBtnText.value = "Сохранено";
    setTimeout(async () => {
        await router.push({ ...route, query: { step: possibleSteps[4] } });
        postBtnText.value = "Сохранить и продолжить";
    }, 1000);
};

const {
    isLoading: postIsLoading,
    isError: postIsError,
    error: postError,
    executeRequest: executePost,
} = useAsyncState({
    request: AmoModel.postSetting,
    immediate: false,
    onSuccess: onPostSuccess,
});

const collectSetting = (): AmoPostSetting => {
    return {
        responsible_user_id: null,
        pipeline_id: null,
        profit: profit.value,
        cost: cost.value,
        revenue: revenue.value,
        filter: filter.value,
        send_leads_to_unsorted: null,
        filtering_value: filterValue.value === "" ? null : filterValue.value, //regex
        form_id: null,
        form_name: null,
    };
};

const refresh = () => {
    executeRequest(Number(integrationId.value), Number(statId.value));
};
</script>

<style scoped></style>
