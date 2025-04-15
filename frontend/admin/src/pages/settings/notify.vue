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
                <a
                    class="style-link-ignore breadcrumb first active"
                    href="/admin/settings/notify"
                >
                    Уведомления о заявках
                </a>
            </div>
        </header>
        <section class="container narrow">
            <div
                data-is="settings-section-notify"
                class="settings-section-notify"
            >
                <div class="group-list slide-down-animation">
                    <!-- <NotifyEmail /> -->

                    <TelegramConnections typeConnections="lead" />

                    <!-- <div
                        data-is="settings-block-notify-sms"
                        class="settings-block-notify-sms group-item"
                    >
                        <div class="flexbe-title text-subtitle inline-box">
                            Уведомления через СМС
                            <span
                                data-is="admin-save-text"
                                class="admin-save-text flexbe-desc"
                            >
                                <div class="status-saved">
                                    <span class="saved-text"></span>
                                    <span class="saving-text">Сохранение</span>
                                    <span class="success-text flexbe-success"
                                        >Сохранено</span
                                    >
                                    <span class="error-text flexbe-error"
                                        >Ошибка</span
                                    >
                                </div>
                            </span>
                        </div>
                        <div class="flexbe-white-box shadow p0 overflow">
                            <div class="flexbe-table block">
                                <div class="tbody">
                                    <div class="tr">
                                        <div class="th">
                                            <span class="flexbe-text">
                                                Осталось
                                            </span>
                                        </div>
                                        <div class="td">
                                            <div class="inline-box">
                                                <span class="flexbe-desc">
                                                    0 СМС
                                                </span>
                                                <span
                                                    class="flexbe-desc ml-auto"
                                                >
                                                    Покупка новых СМС-пакетов
                                                    недоступна
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="collection">
                                <div
                                    class="collection-item top-border text-shade"
                                >
                                    <Icon
                                        path="settings"
                                        name="phone"
                                        size="16"
                                    />
                                    <span class="flexbe-text">
                                        Для получения уведомлений добавьте
                                        телефон
                                    </span>
                                </div>
                                <div class="collection-item">
                                    <div class="row">
                                        <div class="col col-4">
                                            <div
                                                class="flexbe-button small filled is-secondary"
                                            >
                                                <span class="flexbe-text"
                                                    >Добавить телефон</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="collection-footer collection-item shade"
                                >
                                    <div class="flexbe-desc">
                                        Поддержка функционала скоро будет
                                        прекращена
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </section>
    </div>

    <br /><br />
</template>
