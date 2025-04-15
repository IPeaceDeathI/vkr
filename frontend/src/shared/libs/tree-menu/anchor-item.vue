<template>
    <v-list class="px-4 py-1 tree-menu-item" variant="text" bgColor="secondary">
        <v-sheet
            color="transparent"
            style="display: flex; justify-content: flex-start"
        >
            <v-switch
                color="editor"
                :inline="true"
                density="compact"
                v-model="isActive"
            >
                <template v-slot:label>
                    <v-sheet color="transparent" class="py-2">Якорь</v-sheet>
                </template>
            </v-switch>
        </v-sheet>
        <v-text-field
            density="compact"
            base-color="secondary-lighten-5"
            color="secondary-lighten-4"
            variant="outlined"
            v-if="isActive"
            :placeholder="item.placeholder"
            v-model="anchorValue"
        >
            <template v-slot:prepend-inner>
                <v-icon icon="mdi-pound"></v-icon>
            </template>
            <template v-slot:append-inner v-if="item.btnCallBackFn">
                <v-btn
                    color="secondary-lighten-1"
                    @click="item.btnCallBackFn()"
                    min-width="26px"
                    width="26px"
                    height="26px"
                >
                    <v-icon size="small" icon="mdi-content-copy"></v-icon>
                </v-btn>
            </template>
        </v-text-field>
    </v-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { Anchor } from "./types";

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<Anchor>,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        isActive: {
            set(value: boolean) {
                this.item.anchorOnOffFn(value);
            },
            get() {
                return this.item.isActive;
            },
        },
        anchorValue: {
            set(value: string) {
                this.item.anchorUpdateValueFn(value);
            },
            get() {
                return this.item.value;
            },
        },
    },
});
</script>
<style scoped lang="scss">
@import "./styles.scss";
</style>
