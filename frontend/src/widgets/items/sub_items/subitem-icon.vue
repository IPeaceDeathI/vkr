<template>
    <div
        class="icon-wrp"
        :class="props.iconParamsWithoutType.styles.variant"
        ref="wrp"
        v-bind="attributes"
    >
        <redactor-overlay :itemId="id" v-slot="{ show, setShow }">
            <icon-redactor
                :iconParams="props.iconParamsWithoutType"
                :modelValue="show"
                @update:modelValue="setShow"
                @onChange="updateParams"
                :parent-selector="wrp"
            />
        </redactor-overlay>
        <svg viewBox="0 0 24 24">
            <use :href="props.iconParamsWithoutType.styles.src" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { redactorOverlay } from "@/features/structure";
import { ref, toRefs } from "vue";
import { ItemIconParams } from "@/types";
import { computed } from "vue";
import { collectMetricsAttr } from "@/shared/services/metric";
import { PublishTargetAttributes } from "@/publish";
import { iconRedactor } from "@/features/structure";
type Props = {
    iconParamsWithoutType: Pick<ItemIconParams, "styles" | "settings">;
    id: string;
};
const props = defineProps<Props>();
type Emits = {
    "update:iconParamsWithoutType": [
        value: Pick<ItemIconParams, "styles" | "settings">
    ];
};
const emit = defineEmits<Emits>();

const wrp = ref(null);
const { id } = toRefs(props);

const updateParams = (val: Pick<ItemIconParams, "styles" | "settings">) => {
    emit("update:iconParamsWithoutType", val);
};
const attributes = computed(() => {
    return collectMetricsAttr(
        props.iconParamsWithoutType.settings.goals.value,
        PublishTargetAttributes.metricsClick
    );
});
</script>

<style scoped></style>
