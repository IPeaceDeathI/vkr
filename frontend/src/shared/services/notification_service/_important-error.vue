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
                    <v-icon size="x-large" color="secondary-lighten-1"
                        >mdi-close</v-icon
                    >
                </v-btn>
            </v-redactor-toolbar>
            <v-redactor-container>
                <v-row
                    class="px-2 mb-5 text-center d-flex justify-center error-text"
                >
                    <div class="error-icon">
                        <v-icon color="error">mdi-alert-circle-outline</v-icon>
                    </div>
                    <div class="error-title">
                        {{ message.titleText || "Возникла ошибка" }}
                    </div>
                    <div class="error-main">
                        {{ message.mainText }}
                    </div>
                </v-row>
                <template v-if="message.checkboxes">
                    <v-row
                        v-for="(checkbox, index) in message.checkboxes"
                        :key="checkbox.id"
                    >
                        <v-checkbox
                            color="secondary-lighten-3"
                            v-model="checkboxesStates[index]"
                            label="Checkbox"
                        ></v-checkbox>
                    </v-row>
                </template>
                <v-row class="justify-center mb-5">
                    <div
                        v-if="!reportStatus"
                        @click="openErrorReport"
                        class="text-editor"
                        style="text-decoration: underline; cursor: pointer"
                    >
                        Оставить отзыв об ошибке
                    </div>
                    <template v-else> Спасибо за оставленный отзыв! </template>
                </v-row>
                <v-row class="justify-center"
                    ><v-btn
                        :text="message.disagreeBtn.text"
                        @click="disagree"
                        class="mr-5"
                        flat
                        variant="outlined"
                        color="error"
                    ></v-btn>
                    <v-btn
                        :text="message.agreeBtn.text"
                        @click="agree"
                        variant="tonal"
                        color="error"
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
import { ErrorReportService } from "@/shared/services/error_report_form/error-report-service";

export default defineComponent({
    components: {},
    props: {
        message: {
            type: Object as PropType<ImportantNotificationIded>,
            required: true,
        },
    },
    inject: ["reportSended"],
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
    computed: {
        reportStatus() {
            return this.reportSended;
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
        openErrorReport() {
            ErrorReportService.open();
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
.error-text {
    white-space: pre-wrap;
    line-height: 2em;
}
.error-icon {
    font-size: 2em;
    width: 100%;
}
.error-title {
    font-weight: 600;
    font-size: 2em;
    margin-bottom: 20px;
}
.error-main {
    width: 80%;
}
</style>
