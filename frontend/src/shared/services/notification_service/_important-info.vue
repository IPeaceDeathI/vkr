<template>
    <v-dialog
        v-model="isActive"
        max-width="600px"
        :close-on-back="false"
        persistent
    >
        <v-sheet color="primary">
            <v-redactor-toolbar
                style="cursor: default"
                v-if="message.persistanse"
            >
                <v-spacer></v-spacer>
                <v-btn size="small" icon @click="$emit('afterClose')">
                    <v-icon size="x-large" color="editor-lighten-1"
                        >mdi-close</v-icon
                    >
                </v-btn>
            </v-redactor-toolbar>
            <v-redactor-container>
                <v-row class="px-2 mb-5 text-center d-flex justify-center">
                    {{ message.mainText }}
                </v-row>
                <template v-if="message.checkboxes">
                    <v-row
                        v-for="(checkbox, index) in message.checkboxes"
                        :key="checkbox.id"
                    >
                        <v-checkbox
                            color="editor"
                            v-model="checkboxesStates[index]"
                            label="Checkbox"
                        ></v-checkbox>
                    </v-row>
                </template>
                <v-row class="justify-center"
                    ><v-btn
                        :text="message.disagreeBtn.text"
                        @click="disagree"
                        class="mr-5"
                        flat
                        variant="outlined"
                        color="editor"
                    ></v-btn>
                    <v-btn
                        :text="message.agreeBtn.text"
                        @click="agree"
                        variant="tonal"
                        color="editor"
                        flat
                    ></v-btn
                ></v-row>
            </v-redactor-container>
        </v-sheet>
    </v-dialog>
</template>

<script lang="ts">
import { PropType } from "vue";
import { defineComponent } from "vue";
import { ImportantNotificationIded } from "./types";

export default defineComponent({
    components: {},
    props: {
        message: {
            type: Object as PropType<ImportantNotificationIded>,
            required: true,
        },
    },
    emits: {
        afterClose() {
            return true;
        },
    },
    data() {
        return {
            isActive: true,
            checkboxesStates: [] as boolean[],
        };
    },
    watch: {
        isActive(val) {
            val === false ? this.$emit("afterClose") : "";
        },
    },
    mounted() {
        this.message.checkboxes?.forEach((checkbox) =>
            this.checkboxesStates.push(checkbox.state)
        );
    },
    methods: {
        runCheckboxesFn() {
            this.checkboxesStates.forEach((checkbox, index) =>
                checkbox && this.message.checkboxes
                    ? this.message.checkboxes[index].onFn()
                    : this.message.checkboxes
                    ? this.message.checkboxes[index].offFn()
                    : ""
            );
        },
        disagree() {
            this.runCheckboxesFn();
            this.message.disagreeBtn.fn ? this.message.disagreeBtn.fn() : "";
            this.$emit("afterClose");
        },
        agree() {
            this.runCheckboxesFn();
            this.message.agreeBtn.fn ? this.message.agreeBtn.fn() : "";
            this.$emit("afterClose");
        },
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
</style>
