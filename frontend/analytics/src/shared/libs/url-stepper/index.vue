<template>
    <v-stepper tag="article" class="stepper" v-model="selectedStepId">
        <v-stepper-header tag="header" class="stepper_header">
            <template v-for="n in steps" :key="`${n.id}-step`">
                <v-stepper-item
                    ref="stepperItems"
                    color="primary"
                    :title="`${n.name}`"
                    :step="n.id"
                    :complete="n.isComplite"
                    :error="n.isError"
                    editable
                    :value="n.id"
                />
                <v-divider class="stepper_header__divider" />
            </template>
        </v-stepper-header>
        <v-stepper-window>
            <v-stepper-window-item
                v-for="n in steps"
                :key="`${n.id}-content`"
                :value="n.id"
            >
                <v-card>
                    <component
                        :is="n.component"
                        :is-open="n.id === selectedId"
                        :type-lead-source-itntegration="
                            props.typeLeadSourceItntegration
                        "
                    />
                </v-card>
            </v-stepper-window-item>
        </v-stepper-window>
    </v-stepper>
</template>

<script setup lang="ts">
import { toRefs, defineProps, ref, watchPostEffect } from "vue";
import { StepperItem } from "./types";
import { useRouter } from "vue-router";
import { computed } from "vue";

import { VStepperItem } from "vuetify/lib/components/index.mjs";
type Props = {
    steps: Array<StepperItem>;
    selectedId: number;
    typeLeadSourceItntegration: number;
};
const props = defineProps<Props>();
const router = useRouter();
const { steps, selectedId } = toRefs(props);
const stepperItems = ref<Array<typeof VStepperItem>>([]);

const selectedStepId = computed<number>({
    get: () => {
        return selectedId.value;
    },
    set: (id: number) => {
        const selectedRoute = steps.value.find((step) => {
            return step.id === id;
        });
        if (selectedRoute) {
            router.push(selectedRoute.route);
        }
    },
});
watchPostEffect(() => {
    try {
        const index = steps.value.findIndex((step) => {
            return step.id === selectedId.value;
        });

        if (stepperItems.value && stepperItems.value[index]) {
            stepperItems.value[index].$el.scrollIntoView();
        }
    } catch (err) {
        console.error(err);
        return;
    }
});
</script>

<style scoped>
.stepper_header__divider {
    min-width: 30px;
}
</style>
