<template>
    <v-dialog :model-value="true" width="400">
        <v-card class="add-integration-dialog">
            <div class="add-integration-dialog__success-message">
                <v-icon
                    icon="mdi-check-circle-outline"
                    color="success"
                    size="x-large"
                />
                <span>Интеграция успешно добавлена</span>
            </div>
            <v-card-actions>
                <v-btn
                    text="Настроить"
                    color="primary"
                    variant="flat"
                    density="default"
                    size="default"
                    block
                    :to="props.route"
                />
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from "vue-router";
import { defineProps } from "vue";
type Props = {
    route: RouteLocationRaw;
};
const props = defineProps<Props>();
</script>

<style scoped>
.add-integration-dialog__success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5em;
    padding-bottom: 10px;
}
.add-integration-dialog {
    padding-top: 20px !important;
}
</style>
