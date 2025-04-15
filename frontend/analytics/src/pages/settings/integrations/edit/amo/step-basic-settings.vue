<template>
    <section class="amo-basic-settings">
        <h3 class="amo-card__header">
            Отправка заявок в CRM-систему: базовые настройки
        </h3>
        <v-fade-transition>
            <v-progress-linear
                v-if="isLoading"
                indeterminate
                color="secondary"
            />
            <v-form
                v-else
                class="amo-basic-settings__body"
                ref="form"
                @submit.prevent="onSaveClick"
            >
                <div class="amo-basic-settings__body__switch-container">
                    <v-switch
                        id="amo-send-lead-setting"
                        color="primary"
                        class="amo-basic-settings__body__switch-container__switch"
                        v-model="sendLeadsToUnsorted"
                    />
                    <label for="amo-send-lead-setting">
                        Отправлять лиды в «Неразобранное»
                        <information-icon
                            information="В связи с ограничениями со стороны AmoCRM, при отправке заявок в «неразобранное» настраиваемая проверка на дубли не применяется для заявок находящихся в этом статусе. Заявки находящиеся в статусе «неразобранное» не загружаются в Roistat. Чтобы заявки загрузились в проект переведите их в другой статус."
                        />
                    </label>
                </div>
                <!-- formId -->
                <label class="amo-card__paragraph"> Идентификатор формы </label>
                <v-text-field
                    v-model="formId"
                    v-bind="formFieldsOptions"
                    disabled
                />
                <!-- formName -->
                <label class="amo-card__paragraph"> Наименование формы </label>
                <v-text-field
                    v-model="formName"
                    v-bind="formFieldsOptions"
                    disabled
                />
                <!-- pipeline -->
                <label class="amo-card__paragraph">
                    Идентификатор воронки
                    <information-icon
                        information="Если параметр не передан, заявка будет добавлена в неразобранное основной воронки."
                    />
                </label>
                <v-autocomplete
                    autofocus
                    v-model="pipelineId"
                    :items="pipelines"
                    v-bind="formFieldsOptions"
                />
                <!-- responsible user -->
                <label class="amo-card__paragraph">
                    Ответственные за заявки
                </label>
                <v-autocomplete
                    v-model="responsibleUserId"
                    :items="users"
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
            </v-form>
        </v-fade-transition>
        <v-scale-transition>
            <span v-if="usersIsError" class="text-error">{{ usersError }}</span>
            <span v-if="pipelinesIsError" class="text-error">{{
                pipelinesError
            }}</span>
            <span v-if="postIsError" class="text-error">{{ postError }}</span>
        </v-scale-transition>
    </section>
</template>

<script setup lang="ts">
import { defineProps, ref, toRef } from "vue";
import { Props } from "./useAmoStep";
import useAmoState from "./useAmoStep";
import informationIcon from "@/shared/libs/information-icon/information_icon.vue";
import useAsyncState from "@/shared/composables/useAsyncState";
import { AmoModel, AmoPostSetting } from "@/entities/amo";
import { computed } from "vue";
import { formFieldsOptions } from "./types";
import { DB_BOOLEAN } from "@/shared/types";
import { useRoute, useRouter } from "vue-router";
import { ROUTE_NAMES } from "@/pages";
import { storeToRefs } from "pinia";
const router = useRouter();
const props = defineProps<Props>();
const route = useRoute();
const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);
const {
    data: users,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
    executeRequest: usersExecuteRequest,
} = useAsyncState({
    request: AmoModel.getAllUsers,
    initialArgs: [Number(integrationId.value), Number(statId.value)],
});
const {
    data: pipelines,
    isLoading: pipelinesIsLoading,
    isError: pipelinesIsError,
    error: pipelinesError,
    executeRequest: pipelineExecuteRequest,
} = useAsyncState({
    request: AmoModel.getAllPipeline,
    initialArgs: [Number(integrationId.value), Number(statId.value)],
});

const isLoading = computed<boolean>(() => {
    return usersIsLoading.value || pipelinesIsLoading.value;
});

const collectSetting = (): AmoPostSetting => {
    return {
        responsible_user_id: responsibleUserId.value,
        pipeline_id: pipelineId.value,
        profit: null,
        cost: null,
        revenue: null,
        filter: null,
        send_leads_to_unsorted: sendLeadsToUnsorted.value
            ? DB_BOOLEAN.TRUE
            : DB_BOOLEAN.FALSE,
        filtering_value: null,
        form_id: formId.value === "" ? null : formId.value,
        form_name: formName.value === "" ? null : formName.value,
    };
};

const initialState = () => {
    usersExecuteRequest(Number(integrationId.value), Number(statId.value));
    pipelineExecuteRequest(Number(integrationId.value), Number(statId.value));
};
useAmoState(
    toRef(() => props.isOpen),
    initialState
);

const pipelineId = ref<number | null>(null);
const responsibleUserId = ref<number | null>(null);
const sendLeadsToUnsorted = ref<boolean>(false);

//TODO разобраться с формами
const formId = ref<string>("");
const formName = ref<string>("");

//post
const form = ref();
const postBtnText = ref("Сохранить и завершить настройку");
const onPostSucces = (data: boolean) => {
    postBtnText.value = "Сохранено";
    setTimeout(() => {
        postBtnText.value = "Сохранить и завершить настройку";
        router.push({
            name: ROUTE_NAMES.Settings_Integrations,
        });
    }, 1000);
};

const {
    isLoading: postIsLoading,
    error: postError,
    isError: postIsError,
    executeRequest: postRequest,
} = useAsyncState({
    request: AmoModel.postSetting,
    immediate: false,
    onSuccess: onPostSucces,
});

const onSaveClick = async () => {
    if (!form.value) return;
    if (!(await form.value.validate()).valid) return;
    postRequest(
        Number(statId.value),
        Number(integrationId.value),
        collectSetting()
    );
};
</script>

<style scoped>
.amo-basic-settings__body__switch-container {
    display: flex;
    align-items: center;
}
.amo-basic-settings__body__switch-container__switch {
    flex: unset;
    margin-right: 1em;
    padding-left: 10px;
}
</style>
