<template>
    <preloaderVue
        v-if="showPreloading"
        :text="loadingText"
        :isLoading="mount || launch"
        textAfterLoad="Готово"
        @callUnmount="showPreloading = false"
    />
    <main-c />
    <error-report-form
        @afterOpen="dialogOpened = true"
        @afterClose="dialogOpened = false"
        @reportSended="reportSended = true"
        ref="errorReportForm"
    />
    <notification-wrp
        :dialogOpened="!dialogOpened"
        ref="notifications"
        @importantErrorClosed="reportSended = false"
    />
    <block-catalog ref="blockCatalog" />
    <block-redactor-form ref="blockRedactor" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import mainC from "@/pages/main/index-c.vue";
import notificationWrp from "@/shared/services/notification_service/notification-wrp.vue";
import blockCatalog from "@/shared/services/block-catalog/block-catalog.vue";
import blockRedactorForm from "@/shared/services/block-redactor/block-redactor-form.vue";
import errorReportForm from "@/shared/services/error_report_form/error-report-form.vue";
import { ServiceLauncher } from "@/shared/services/service_launcher/serviceLauncher";
import { preloaderVue } from "@/shared/libs/preloader_vue";
import { computed } from "vue";
export default defineComponent({
    components: {
        mainC,
        notificationWrp,
        blockCatalog,
        blockRedactorForm,
        preloaderVue,
        errorReportForm,
    },
    provide() {
        return {
            reportSended: computed(() => {
                return this.reportSended;
            }),
        };
    },
    data() {
        return {
            loadingText: "Загружаем информацию о странице",
            launch: true,
            mount: true,
            showPreloading: true && process.env.NODE_ENV === "production",
            dialogOpened: false,
            reportSended: false,
        };
    },
    created() {
        setTimeout(() => {
            if (this.launch || this.mount) {
                this.loadingText = "Собираем блоки и компоненты";
            }
        }, 2000);
        ServiceLauncher.getInstance(this.$store)
            .launch()
            .then(() => {
                this.launch = false;
            });
    },
    mounted() {
        this.$store.state.environment.indexRef = this.$refs;
        this.mount = false;
    },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>
