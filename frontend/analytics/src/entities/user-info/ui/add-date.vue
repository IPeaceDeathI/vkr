<template>
    <v-dialog
        activator="parent"
        width="350"
        transition="dialog-bottom-transition"
        v-model="isOpen1"
    >
        <v-card class="surface-card p-4 shadow-2">
            <v-toolbar color="primary" density="compact" height="60">
                <div class="text-3xl font-medium text-900 m-2 ml-3">
                    Отчет за период
                </div>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpen1 = false">
                    <v-icon icon="mdi-close" />
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-fade-transition mode="out-in">
                    <v-container>
                        <v-row justify="space-around">
                            <v-date-picker color="primary"></v-date-picker>
                        </v-row>
                    </v-container>
                </v-fade-transition>
            </v-card-text>
            <v-card-actions>
                <v-fade-transition
                    ><v-btn
                        text="Выбрать"
                        color="primary"
                        size="default"
                        variant="flat"
                        @click="addDate"
                /></v-fade-transition>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, defineProps, defineEmits } from "vue";

const isOpen1 = ref(true);
const dateValue = ref("");

const emit = defineEmits(["setDateReport", "isOpen"]);
const addDate = (event: any) => {
    isOpen1.value = false;
    emit("isOpen", isOpen1.value);
    emit("setDateReport", dateValue.value);
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
</style>
