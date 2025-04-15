<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card
            class="card"
            :ripple="false"
            v-bind="props"
            rounded="l"
            :elevation="isHovering ? 12 : 3"
            @click="$emit('click', $event)"
            ><slot></slot
        ></v-card>
    </v-hover>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    emits: {
        click: (value: Event) => true,
    },
});
</script>
<style lang="scss" scoped>
.card {
    cursor: pointer;
}
</style>
