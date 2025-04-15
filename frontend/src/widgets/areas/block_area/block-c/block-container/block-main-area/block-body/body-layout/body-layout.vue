<template>
    <v-hover>
        <template v-slot:default="{ isHovering, props }">
            <div v-bind="props" class="body-layout">
                <slot />
            </div>
            <add-zone-btn
                v-bind="props"
                @add-zone="emits('addZone', $event)"
                :zone-type="zoneType"
                :class="isHovering ? 'show-btn' : 'not-show-btn'"
            />
        </template>
    </v-hover>
</template>

<script setup lang="ts">
import { ZoneBundle, ZoneTypes } from "@/types";
import { defineEmits, defineProps, toRefs } from "vue";
import { addZoneBtn } from "@/features/structure";
type Props = {
    zoneType: ZoneTypes;
};
const props = defineProps<Props>();
const { zoneType } = toRefs(props);
type Emits = {
    addZone: [value: ZoneBundle];
};
const emits = defineEmits<Emits>();
</script>
