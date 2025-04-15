<template>
    <v-dialog
        activator="parent"
        width="700"
        transition="dialog-bottom-transition"
        v-model="isOpen"
    >
        <v-card class="surface-card p-4 shadow-2">
            <v-toolbar color="primary" density="compact" style="height: 60px">
                <div class="text-3xl font-medium text-900 m-2 ml-3">
                    Добавьте пользовательскую формулу
                </div>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpen = false">
                    <v-icon icon="mdi-close" />
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <div
                    class="add-stat-dialog__success-message"
                    v-if="showSuccessMessage"
                >
                    <v-icon
                        icon="mdi-check-circle-outline"
                        color="success"
                        size="x-large"
                    />
                    <span>Формула добавлена</span>
                </div>
                <v-row>
                    <v-col cols="12" md="4"
                        ><label> Название показателя</label
                        ><v-text-field
                            class="mt-1"
                            v-model="name"
                            hide-details="auto" /></v-col
                    ><v-col cols="12" md="4"
                        ><label> Цвет показателя</label>
                        <div class="item-color mt-1">
                            <v-btn
                                append-icon="mdi-palette"
                                variant="flat"
                                :loading="postIsLoading"
                                :color="colorRep"
                                size="default"
                                @setColorReport="colorReport"
                            />{{ colorRep }}
                        </div>

                        <add-color-calc
                            @setColorReport="colorReport"
                        ></add-color-calc>
                    </v-col>
                    <v-col cols="12" md="4"
                        ><label> Тип показателя</label
                        ><v-select
                            class="mt-1"
                            variant="outlined"
                            v-model="selectCalc"
                            :error-messages="selectErrorMessage"
                            :items="items"
                        ></v-select
                    ></v-col>
                </v-row>
                <v-list-subheader inset class="mt-4 mb-4">
                    <p>Введите формулу показателя</p>
                    <p>
                        Вы можете ввести формулу вручную или возпользоваться
                        конструктором показателей.
                    </p>
                </v-list-subheader>

                <v-textarea
                    clear-icon="mdi-close-circle"
                    model-value="Формула"
                    row-height="20"
                    rows="2"
                    variant="outlined"
                    auto-grow
                    shaped
                    clearable
                ></v-textarea>

                <!-- <v-form ref="form" v-else>
                        <label> Название </label>
                        <v-text-field
                            class="mt-1"
                            v-model="name"
                            :rules="[maxLengthRule]"
                            hide-details="auto"
                        />
                    </v-form> -->

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
                    />
                </v-card-actions>
            </v-fade-transition>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from "vue";
import { UserInfoModel } from "../model";
import useAsyncState from "@/shared/composables/useAsyncState";
import { UserInfoStatPost } from "../types";
import { useUserInfoStore } from "../store";
import { StatPost, StatPostTo } from "@/entities/stat/types";
import { useStatStore } from "@/entities/stat/store";
import addColorCalc from "@/entities/user-info/ui/add-color-calc.vue";

const isOpen = ref(false);
const name = ref("");
const selectCalc = ref("");
const selectErrorMessage = ref("");
const items = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

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

interface Props {
    itemColorReport: string;
}

const props = defineProps<Props>();

const colorRep = ref("#00abe1");
const colorReport = (color: string) => {
    colorRep.value = color;
};
</script>

<style scoped>
.add-stat-dialog__success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5em;
    padding-bottom: 10px;
}
.item-color {
    border: 1px solid #ababab;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
}
.item-color > button {
    height: 100%;
    border-radius: 0;
    margin-right: 10px;
}
</style>
