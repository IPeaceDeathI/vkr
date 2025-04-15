<template>
    <v-dialog
        activator="parent"
        width="350"
        transition="dialog-bottom-transition"
        v-model="isOpen"
    >
        <v-card class="surface-card p-4 shadow-2">
            <v-toolbar color="primary" density="compact" height="60">
                <div class="text-3xl font-medium text-900 m-2 ml-3">
                    Цвет показателя в отчетах
                </div>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpen = false">
                    <v-icon icon="mdi-close" />
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-fade-transition mode="out-in">
                    <v-color-picker v-model="colorValue"></v-color-picker>
                </v-fade-transition>
            </v-card-text>
            <v-card-actions>
                <v-fade-transition
                    ><v-btn
                        text="Выбрать"
                        color="primary"
                        size="default"
                        variant="flat"
                        @click="addColor"
                /></v-fade-transition>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, defineProps, defineEmits } from "vue";
import { UserInfoModel } from "../model";
import useAsyncState from "@/shared/composables/useAsyncState";
import { UserInfoStatPost } from "../types";
import { useUserInfoStore } from "../store";
import { StatPost, StatPostTo } from "@/entities/stat/types";
import { useStatStore } from "@/entities/stat/store";

const isOpen = ref(false);
const colorValue = ref("");
// console.log(colorValue.value);

// interface Props {
//     itemColorReport: string;
// }
// const props = defineProps<Props>();
// const { itemColorReport } = toRefs(props);
// type Emit{
//     setColorReport:"";
// }
// type Emit = {
//     setColorReport: "";
// };
// type Emits = {
//     setColorReport: "";
// };
const emit = defineEmits(["setColorReport"]);
const addColor = (event: any) => {
    isOpen.value = false;
    // emits("setColorReport", colorValue.value);
    emit("setColorReport", colorValue.value);
};
// console.log("emits", emits.value);
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
