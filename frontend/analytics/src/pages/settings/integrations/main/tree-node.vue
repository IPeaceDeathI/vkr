<template>
    <article class="tree__node">
        <div class="tree__node__title text-body-2 font-weight-bold">
            {{ name }}
            <v-tooltip :text="description" />
        </div>
        <v-list class="tree__node__list">
            <span v-if="integrationListUpdatingError" class="text-error">{{
                integrationListUpdatingError
            }}</span>
            <div class="centering-container" v-if="isLoading">
                <v-progress-circular
                    color="primary"
                    indeterminate
                    :size="52"
                    :width="5"
                />
            </div>
            <template
                v-else-if="
                    !integrationListUpdatingError &&
                    integrations &&
                    integrations.length > 0
                "
            >
                <integrationItem
                    v-for="integration in integrations"
                    :key="integration.integration_id"
                    :integration-info="integration"
                    @remove="remove(integration.integration_id)"
                />
            </template>
            <template v-else-if="!integrationListUpdatingError">{{
                description
            }}</template>
        </v-list>
        <v-btn
            icon
            size="x-small"
            class="tree__node__add-btn"
            variant="flat"
            color="primary"
            @click="emits('addClick')"
        >
            <v-icon icon="mdi-plus" />
        </v-btn>
    </article>
</template>

<script setup lang="ts">
import integrationItem from "./integration-item.vue";
import { toRefs, defineProps, defineEmits, ref } from "vue";
import { TreeNodeProps } from "./types";
import { theme } from "@/shared/ui";
import { useIntegrationStore } from "@/entities/integrations/store";
import { storeToRefs } from "pinia";
//style
const props = defineProps<TreeNodeProps>();
const { name, description, integrations } = toRefs(props);
type Emits = {
    addClick: [];
};
const { integrationListUpdatingError } = storeToRefs(useIntegrationStore());
const { remove } = useIntegrationStore();
const emits = defineEmits<Emits>();
const isLoading = ref(false);
</script>

<style scoped lang="scss">
$border: solid #d1d4d6 1px;
.tree__node {
    outline: $border;
    border-radius: 8px;
    overflow: hidden;
    position: static;
    text-align: center;
}
.tree__node__title {
    padding: 10px 12px;
    border-bottom: $border;
}
.tree__node__list {
    padding: 12px !important;
    max-height: 250px;
    overflow: auto;
}
.tree__node__add-btn {
    position: absolute;
    transform: translate(-50%, -50%);
}
.tree__node__add-btn:hover {
    background-color: v-bind("theme.secondary") !important;
}
</style>
