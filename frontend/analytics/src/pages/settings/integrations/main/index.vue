<template>
    <section class="integration-new">
        <header class="integration-new__header">
            <h2>Настройка интеграции</h2>
        </header>
        <span class="integration-new__describe">
            В этом разделе вы можете настроить интеграции с CRM, конструкторами
            лендингов и форм, сервисами лидогенерации, сервисами рассылки,
            телефонией и другими.
        </span>
        <v-btn
            class="integration-new__add-integration-btn"
            color="success"
            size="default"
            text="Добавить интеграцию"
            prepend-icon="mdi-plus"
            @click="
                addDialogIsOpen = true;
                preselectedCategories = undefined;
            "
        />

        <v-divider class="border-opacity-50 w-100 mt-4" color="black" />
        <div class="tree">
            <tree-node
                v-bind="NodePropsFabric(INTEGRATION_CATEGORY.LEAD_SOURCE)"
                @add-click="
                    addDialogIsOpen = true;
                    preselectedCategories = [INTEGRATION_CATEGORY.LEAD_SOURCE];
                "
            />
            <logo-node />
            <tree-node
                v-bind="
                    NodePropsFabric(INTEGRATION_CATEGORY.ADVERTISING_CHANNELS)
                "
                @add-click="
                    addDialogIsOpen = true;
                    preselectedCategories = [
                        INTEGRATION_CATEGORY.ADVERTISING_CHANNELS,
                    ];
                "
            />
            <article class="tree__node_empty" />

            <tree-node
                v-bind="NodePropsFabric(INTEGRATION_CATEGORY.CRM)"
                @add-click="
                    addDialogIsOpen = true;
                    preselectedCategories = [INTEGRATION_CATEGORY.CRM];
                "
            />

            <article class="tree__node_empty" />
        </div>
        <add-integration
            v-model="addDialogIsOpen"
            :preselected-categories="preselectedCategories"
        />
    </section>
</template>

<script setup lang="ts">
import treeNode from "./tree-node.vue";
import logoNode from "./logo-node.vue";
import { NodePropsFabric } from "./NodeFabric";
import {
    INTEGRATION_CATEGORY,
    IntegrationModel,
} from "@/entities/integrations";
import addIntegration from "@/entities/integrations/ui/add-integration";
import { ref } from "vue";
import { shallowRef } from "vue";
import { onMounted } from "vue";
import { useIntegrationStore } from "@/entities/integrations/store";
import { useRoute } from "vue-router";
import { computed } from "vue";

const addDialogIsOpen = ref(false);

const preselectedCategories = shallowRef<
    Array<INTEGRATION_CATEGORY> | undefined
>(undefined);

const route = useRoute();
const statId = computed(() => route.params.statId);

onMounted(() => {
    // useIntegrationStore().updateIntegrationList(Number(statId.value));
    useIntegrationStore().init(Number(statId.value));
});
const clickAdd = (category: any) => {
    console.log("click", category);
};
</script>
<style scoped>
.integration-new {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.integration-new__add-integration-btn {
    margin-top: 10px;
}
.tree {
    margin-top: 15px;
    background: url("/public/IntegrationsNew.svg") no-repeat 50% 5px;
    width: 850px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 23px;
    row-gap: 145px;
    grid-template-rows: 268px;
    grid-auto-rows: minmax(100px, auto);
    align-items: start;
}
</style>
