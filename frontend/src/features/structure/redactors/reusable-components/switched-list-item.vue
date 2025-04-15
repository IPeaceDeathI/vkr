<template>
    <v-list-item
        density="compact"
        class="editorBg"
        rounded="lg"
        @click="model = !model"
    >
        <template v-slot:prepend>
            <v-icon size="x-large" :icon="prependIcon" />
        </template>
        <template v-slot:append>
            <v-btn
                v-if="model"
                class="text-subtitle-2 font-weight-regular"
                variant="plain"
                v-ripple="false"
                @click.stop="$emit('click')"
                :prepend-icon="isCog ? 'mdi-cog' : ''"
            >
                <slot />
            </v-btn>
            <v-switch density="compact" color="editor" v-model="model" />
        </template>
        <v-list-item-title class="text-subtitle-2 font-weight-regular">{{
            title
        }}</v-list-item-title>
    </v-list-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        modelValue: { type: Boolean, default: false },
        title: { type: String, default: "" },
        prependIcon: { type: String, default: "" },
        isCog: { type: Boolean, default: true },
    },
    emits: ["update:model-value", "click"],
    computed: {
        model: {
            get() {
                return this.modelValue;
            },
            set(value: boolean) {
                this.$emit("update:model-value", value);
            },
        },
    },
});
</script>
<style lang="scss" scoped></style>
