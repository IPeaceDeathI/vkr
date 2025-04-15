<template>
    <div class="notification-wrp">
        <important-info
            v-for="message in importantInfo"
            :key="message.id"
            :message="message"
            @after-close="removeImportantInfo(message.id)"
        >
        </important-info>
        <important-error
            :style="{ opacity: dialogOpened ? 1 : 0 }"
            v-for="message in importantError"
            :key="message.id"
            :message="message"
            @after-close="removeImportantError(message.id)"
        >
        </important-error>
        <important-loading
            v-for="message in importantLoading"
            :key="message.id"
            :message="message"
            @after-close="removeImportantLoading(message.id)"
        ></important-loading>
        <transition-group name="list">
            <common-info
                v-for="message in commonInfo"
                :key="message.id"
                :message="message"
                @afterClose="removeCommonInfo(message.id)"
            >
            </common-info>
        </transition-group>
        <transition-group name="list">
            <common-success
                v-for="message in commonSuccess"
                :key="message.id"
                :message="message"
                @afterClose="removeCommonSuccess(message.id)"
            >
            </common-success>
        </transition-group>
        <transition-group name="list">
            <common-error
                v-for="message in commonError"
                :key="message.id"
                :message="message"
                @afterClose="removeCommonError(message.id)"
            >
            </common-error>
        </transition-group>
        <transition-group name="list">
            <common-loading
                v-for="message in commonLoading"
                :key="message.id"
                :message="message"
                @afterClose="removeCommonLoading(message.id)"
            >
            </common-loading>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import commonInfo from "./_common-info.vue";
import commonError from "./_common-error.vue";
import commonSuccess from "./_common-success.vue";
import commonLoading from "./_common-loading.vue";
import importantInfo from "./_important-info.vue";
import importantError from "./_important-error.vue";
import importantLoading from "./_important-loading.vue";
import {
    CommonNotificationIded,
    CommonLoadingIded,
    ImportantNotificationIded,
    ImportantLoadingIded,
} from "./types";

export default defineComponent({
    components: {
        commonInfo,
        commonError,
        commonSuccess,
        commonLoading,
        importantInfo,
        importantError,
        importantLoading,
    },
    props: {
        dialogOpened: Boolean,
    },
    data() {
        return {
            commonInfo: [] as CommonNotificationIded[],
            commonError: [] as CommonNotificationIded[],
            commonSuccess: [] as CommonNotificationIded[],
            commonLoading: [] as CommonLoadingIded[],
            importantInfo: [] as ImportantNotificationIded[],
            importantError: [] as ImportantNotificationIded[],
            importantLoading: [] as ImportantLoadingIded[],
        };
    },
    methods: {
        removeCommonInfo(id: string) {
            this.commonInfo = this.commonInfo.filter((el) => el.id !== id);
        },
        removeCommonError(id: string) {
            this.commonError = this.commonError.filter((el) => el.id !== id);
        },
        removeCommonSuccess(id: string) {
            this.commonSuccess = this.commonSuccess.filter(
                (el) => el.id !== id
            );
        },
        removeCommonLoading(id: string) {
            this.commonLoading = this.commonLoading.filter(
                (el) => el.id !== id
            );
        },
        removeImportantInfo(id: string) {
            this.importantInfo = this.importantInfo.filter(
                (el) => el.id !== id
            );
        },
        removeImportantError(id: string) {
            this.importantError = this.importantError.filter(
                (el) => el.id !== id
            );
            this.$emit("importantErrorClosed");
        },
        removeImportantLoading(id: string) {
            this.importantLoading = this.importantLoading.filter(
                (el) => el.id !== id
            );
        },
        addCommonInfo(notification: CommonNotificationIded) {
            this.commonInfo.unshift(notification);
        },
        addCommonError(notification: CommonNotificationIded) {
            this.commonError.unshift(notification);
        },
        addCommonSuccess(notification: CommonNotificationIded) {
            this.commonSuccess.unshift(notification);
        },
        addCommonLoading(notification: CommonLoadingIded) {
            this.commonLoading.unshift(notification);
        },
        addImportantInfo(notification: ImportantNotificationIded) {
            this.importantInfo.push(notification);
        },
        addImportantError(notification: ImportantNotificationIded) {
            this.importantError.push(notification);
        },
        addImportantLoading(notification: ImportantLoadingIded) {
            this.importantLoading.push(notification);
        },
    },
});
</script>
<style scoped lang="scss">
@import "@/shared/constants/index.scss";
.notification-wrp {
    width: auto;
    height: auto;
    bottom: 0;
    right: 0;
    padding: 10px;
    position: fixed;
    z-index: 100000000;
}
.notification-wrp * {
    position: relative;
}
</style>
