<template>
    <v-dialog
        activator="parent"
        width="500"
        transition="dialog-bottom-transition"
        v-model="isOpen"
    >
        <v-card>
            <v-toolbar color="primary" density="compact" size="small">
                <v-toolbar-title>Создать новый проект</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpen = false">
                    <v-icon icon="mdi-close" />
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-fade-transition mode="out-in">
                    <div
                        class="add-stat-dialog__success-message"
                        v-if="showSuccessMessage"
                    >
                        <v-icon
                            icon="mdi-check-circle-outline"
                            color="success"
                            size="x-large"
                        />
                        <span>Проект успешно добавлен</span>
                    </div>
                    <v-form ref="form" v-else>
                        <label> Название </label>
                        <v-text-field
                            class="mt-1"
                            v-model="name"
                            :rules="[maxLengthRule]"
                            hide-details="auto"
                        />
                    </v-form>
                </v-fade-transition>

                <v-expand-transition>
                    <span v-if="postIsError" class="text-error">
                        {{ postError }}
                    </span>
                </v-expand-transition>
            </v-card-text>
            <v-fade-transition>
                <v-card-actions v-show="!showSuccessMessage">
                    <v-spacer />
                    <v-btn
                        :loading="postIsLoading"
                        text="Добавить"
                        color="primary"
                        size="default"
                        variant="flat"
                        @click="addStat"
                    />
                </v-card-actions>
            </v-fade-transition>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { UserInfoModel } from "../model";
import useAsyncState from "@/shared/composables/useAsyncState";
import { UserInfoStatPost } from "../types";
import { useUserInfoStore } from "../store";
import { StatPost, StatPostTo } from "@/entities/stat/types";
import { useStatStore } from "@/entities/stat/store";

const isOpen = ref(false);
const name = ref("");

//TODO перенести в библу для валидаций
const maxLengthRule = (value: string) => {
    if (value.length > 15) return "Длина поля не должна превышать 15";
    return true;
};

// const collectStat = (): UserInfoStatPost => {
//     return {
//         name: name.value,
//     };
// };
const collectStat = (): StatPostTo => {
    return {
        name: name.value,
    };
};
// const collectStat = (): StatPost => {
//     return { name: name.value };
// };
const form = ref();
const showSuccessMessage = ref(true);
watch(isOpen, () => {
    showSuccessMessage.value = false;
});
const addStat = async () => {
    if (!form.value) return;
    if (!(await form.value.validate()).valid) return;
    executePost(collectStat());
};
const onAddSuccess = () => {
    showSuccessMessage.value = true;
    setTimeout(() => {
        isOpen.value = false;
    }, 1500);
};

const {
    isLoading: postIsLoading,
    isError: postIsError,
    error: postError,
    executeRequest: executePost,
} = useAsyncState({
    request: useStatStore().postStat,
    immediate: false,
    onSuccess: onAddSuccess,
});
</script>

<style scoped>
.add-stat-dialog__success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5em;
    padding-bottom: 10px;
}
</style>
