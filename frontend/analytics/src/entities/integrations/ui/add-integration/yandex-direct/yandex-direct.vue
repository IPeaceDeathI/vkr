<template>
    <v-card-title>Интеграция создана</v-card-title>
    <p class="px-4">
        <v-alert border="start" color="info" variant="tonal">
            Чтобы получить ключ, вам нужно выдать разрешения на интеграцию с
            аккаунтом Директа. Перейдите по
            <a
                target="_blank"
                href="https://oauth.yandex.ru/client/ee12139e23be41b889875838c9b71f4a"
                >ссылке</a
            >
            Нажмите "Разрешить", скопируйте ключ на экране, и вставьте его ниже
        </v-alert>
    </p>
    <v-card-text>
        <v-form ref="form" class="mb-2">
            <label>Введите ключ</label>
            <v-text-field
                v-model="key"
                class="mt-1"
                :rules="[length]"
                :disabled="successFlag"
            />
        </v-form>
        <v-expand-transition>
            <span v-if="postIsError" class="text-error">{{ postError }}</span>
        </v-expand-transition>
        <v-expand-transition>
            <span v-if="successFlag" class="text-success">
                Ключ успешно авторизован. В течении нескольких дней мы завершим
                интеграцию и вы сможете настроить ее
            </span>
        </v-expand-transition>
    </v-card-text>
    <v-card-actions>
        <v-spacer />
        <v-btn
            :text="!successFlag ? 'Отправить ключ' : 'Закрыть окно'"
            color="primary"
            variant="flat"
            size="default"
            :loading="postIsLoading"
            @click="!successFlag ? addStat() : emits('onClose')"
        />
    </v-card-actions>
</template>

<script setup lang="ts">
import {
    YandexDirectModel,
    postYandexDirectAuth,
} from "@/entities/yandex-direct";
import useAsyncState from "@/shared/composables/useAsyncState";
import { ComputedRef } from "vue";
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
type Props = {
    id: number;
};
type Emits = {
    onClose: [];
};
const emits = defineEmits<Emits>();
//TODO перенести в библу для валидаций
const length = (value: string) => {
    if (value.length > 70 || value.length < 50) {
        return "Длина ключа должна соcтавлять от 50 до 70 символов";
    }
    return true;
};
const key = ref("");
const props = defineProps<Props>();

const form = ref();
const successFlag = ref(false);
console.log("props.id", props.id);

const onPostSuccess = (result: boolean) => {
    if (!result) throw "Не удалось привязать ключ";
    successFlag.value = true;
};
const route = useRoute();

const statId = computed(() => route.params.statId);
const integrationId = computed(() => route.params.id);

// const dataKey: postYandexDirectAuth = computed(() => {
//     return {
//         token: key.value,
//     };
// });
const {
    isLoading: postIsLoading,
    isError: postIsError,
    error: postError,
    executeRequest: executePost,
} = useAsyncState({
    request: YandexDirectModel.postAuthChannel,
    immediate: false,
    onSuccess: onPostSuccess,
});

const addStat = async () => {
    if (!form.value) return;
    if (!(await form.value.validate()).valid) return;
    executePost(Number(statId.value), props.id, {
        token: key.value,
    });
};
</script>

<style scoped></style>
