<template>
    <v-redactor-toolbar class="movable">
        <v-toolbar-title v-if="title !== undefined">{{
            title
        }}</v-toolbar-title>
        <v-btn-toggle v-model="model" v-if="model !== undefined">
            <v-btn
                v-for="btn in toggleBtns"
                :key="btn.value"
                :value="btn.value"
                :prepend-icon="btn.icon === undefined ? '' : btn.icon"
                >{{ btn.text }}</v-btn
            >
        </v-btn-toggle>
        <v-spacer v-if="spacer" />
        <slot />
        <toolbar-viewport-swapper v-if="viewPortSwapper" />
        <v-btn size="small" icon @click="$emit('closeClick', $event)">
            <v-icon size="x-large" color="editor-lighten-1">mdi-close</v-icon>
        </v-btn>
    </v-redactor-toolbar>
</template>
<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
import toolbarViewportSwapper from "./toolbar-viewport-swapper.vue";
export default defineComponent({
    props: {
        modelValue: {},
        toggleBtns: {
            type: Array as PropType<
                Array<{ value: any; text: string; icon?: string }>
            >,
        },
        viewPortSwapper: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
        },
        spacer: {
            type: Boolean,
            default: true,
        },
    },
    emits: {
        "update:modelValue": (value: any) => true,
        closeClick: (e: MouseEvent) => true,
    },
    components: {
        toolbarViewportSwapper,
    },
    computed: {
        model: {
            get() {
                return this.modelValue;
            },
            set(value: any) {
                if (value !== undefined) this.$emit("update:modelValue", value);
            },
        },
    },
});
</script>
<style lang="scss" scoped></style>
