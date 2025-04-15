<template>
    <v-list-item
        color="primary"
        density="compact"
        :value="index"
        @click="onClick"
        class="tree-menu-item"
        :disabled="item.isDisabled || false"
    >
        <v-list-item-title> {{ item.title }}</v-list-item-title>
        <v-sheet class="pl-2" color="transparent" v-if="item.tooltipText">
            <information-icon
                :type="InformationIconType.question"
                :text="item.tooltipText"
                max-width="500px"
            ></information-icon>
        </v-sheet>
        <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
        </template>
        <template v-slot:append>
            <v-sheet class="pl-2" color="transparent">
                {{ item.appendText }}</v-sheet
            >
            <v-icon
                icon=" mdi-chevron-right"
                v-if="item.subItems?.length > 0"
            ></v-icon>
        </template>
    </v-list-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { TreeMenuMainItems } from "./types";
import { informationIcon } from "@/shared/libs/information-icon";
import { InformationIconType } from "@/shared/libs/information-icon";

export default defineComponent({
    components: {
        informationIcon,
    },
    name: "main-item",
    props: {
        item: {
            type: Object as PropType<TreeMenuMainItems>,
            required: true,
        },
        index: String,
    },
    data() {
        return {
            InformationIconType: InformationIconType,
        };
    },
    methods: {
        onClick() {
            this.item.callBackFn();
            this.item.closeAllMenu
                ? this.$emit("close-all")
                : this.item.closeMenu
                ? this.$emit("close-menu")
                : "";
        },
    },
});
</script>
<style lang="scss" scoped>
@import "./styles.scss";
</style>
