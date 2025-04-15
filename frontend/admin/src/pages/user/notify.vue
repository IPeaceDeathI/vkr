<script>
import NotifyEmail from "@/pages/settings/elements/NotifyEmail.vue";
import TelegramConnections from "@/pages/settings/elements/TelegramConnections.vue";

export default {
    components: { TelegramConnections, NotifyEmail },
};
</script>

<template>
    <div class="admin-content">
        <header class="container narrow">
            <div
                data-is="admin-breadcrumbs"
                class="admin-breadcrumbs text-title animate"
            >
                Уведомления аккаунта
            </div>
        </header>
        <section class="container narrow">
            <div
                data-is="settings-section-notify"
                class="settings-section-notify"
            >
                <div class="group-list slide-down-animation">
                    <!-- <NotifyEmail /> -->
                    <TelegramConnections typeConnections="flow" />
                </div>
            </div>
        </section>
    </div>

    <br /><br />
</template>
