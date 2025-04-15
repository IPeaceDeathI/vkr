<template>
    <v-dialog
        :model-value="true"
        width="600"
        @update:model-value="if (!$event) emits('onClose');"
    >
        <v-card>
            <v-toolbar :title="props.name" color="primary" density="compact">
                <v-btn icon="mdi-close" @click="emits('onClose')" />
            </v-toolbar>

            <slot />
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
type Props = {
    name: string;
};
const props = defineProps<Props>();
type Emits = {
    onClose: [];
};
const emits = defineEmits<Emits>();
</script>

<style scoped></style>
