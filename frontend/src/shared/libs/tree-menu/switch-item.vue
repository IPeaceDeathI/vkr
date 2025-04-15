<template>
    <v-list-item
        color="primary"
        density="compact"
        :value="index"
        @click="isActive = !isActive"
        class="tree-menu-item"
        :disabled="item.isDisabled || false"
    >
        <v-list-item-title> {{ item.title }}</v-list-item-title>
        <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
        </template>
        <template v-slot:append>
            <v-switch
                v-model="isActive"
                color="editor"
                :inline="true"
                density="compact"
            >
            </v-switch>
        </template>
        <v-sheet class="pl-2" color="transparent" v-if="item.tooltipText">
            <information-icon
                :type="InformationIconType.question"
                :text="item.tooltipText"
                max-width="500px"
            ></information-icon>
        </v-sheet>
    </v-list-item>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { TreeMenuSwitchItems } from "./types";
import { informationIcon } from "@/shared/libs/information-icon";
import { InformationIconType } from "@/shared/libs/information-icon";

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<TreeMenuSwitchItems>,
            required: true,
        },
        index: String,
    },
    components: {
        informationIcon,
    },
    data() {
        return {
            InformationIconType: InformationIconType,
        };
    },
    computed: {
        isActive: {
            set(value: boolean) {
                this.item.callBackFn(value);
            },
            get() {
                return this.item.isActive;
            },
        },
    },
});
</script>
<style scoped lang="scss">
@import "./styles.scss";
</style>
