<template>
    <v-sheet class="px-4 py-1 tree-menu-item" color="secondary">
        <v-sheet color="secondary" class="text-body-2 py-2">
            {{ item.title }}</v-sheet
        >
        <v-btn-toggle
            variant="tonal"
            :title="item.title"
            v-model="activeBtn"
            color="#ffffff"
            style="color: #777b83; width: 100%"
            mandatory
            class="text-body-2"
        >
            <v-btn
                v-for="(button, index) in item.buttons"
                ref="toggleBtn"
                :key="index"
                :value="index"
            >
                <v-tooltip
                    activator="parent"
                    location="top"
                    v-if="button.tooltipText"
                    >{{ button.tooltipText }}</v-tooltip
                >
                <v-icon size="large" :icon="button.icon"></v-icon>
            </v-btn>
        </v-btn-toggle>
    </v-sheet>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { TreeMenuToggleItems } from "./types";

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<TreeMenuToggleItems>,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        activeBtn: {
            get() {
                return this.item.current;
            },
            set(index: number) {
                this.item.buttons[index].callBackFn();
            },
        },
    },
});
</script>
<style scoped lang="scss">
@import "./styles.scss";
</style>
