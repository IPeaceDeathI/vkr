<script>
import Icon from "@/components/ui/AdminIcon.vue";
import axios from "axios";

export default {
    props: {
        typeConnections: {
            type: String,
            required: true,
        },
    },
    components: { Icon },
    inject: ["settings"],
    data() {
        return {
            isModal: false,
            code: null,
            intervalGetConnectionsId: null,
            connections: [
                // { id: 1, login: "test 1" },
                // { id: 2, login: "test 2" },
            ],
        };
    },
    mounted() {
        this.intervalGetConnections();
    },
    methods: {
        intervalGetConnections() {
            this.getCurrentConnections();
            this.intervalGetConnectionsId = setInterval(() => {
                this.getCurrentConnections();
            }, 10 * 1000);
        },
        getCurrentConnections() {
            axios
                .get(
                    this.settings.SITE_PATH +
                        "/api/admin/setting/users_notice_" +
                        this.typeConnections +
                        "_tg",
                )
                .then((response) => (this.connections = response.data.data));
        },
        removeConnection(connection, index) {
            axios.delete(
                this.settings.SITE_PATH +
                    "/api/admin/setting/user_notice_" +
                    this.typeConnections +
                    "_tg/" +
                    connection.id,
            );
            this.connections.splice(index, 1);
        },
        modalTelegramCode() {
            axios
                .get(
                    this.settings.SITE_PATH +
                        "/api/admin/setting/code_notice_" +
                        this.typeConnections +
                        "_tg",
                )
                .then((response) => (this.code = response.data.data.code));
            this.isModal = true;
        },
        closeModalTelegramCode() {
            this.isModal = false;
        },
    },
};
</script>

<template>
    <div
        data-is="settings-block-notify-telegram"
        class="settings-block-notify-telegram group-item"
    >
        <div class="flexbe-title text-subtitle inline-box">
            <span>Telegram</span>
            <span data-is="admin-save-text" class="admin-save-text flexbe-desc">
                <!-- <div class="status-saved">
                                    <span class="saved-text"></span>
                                    <span class="saving-text">Сохранение</span>
                                    <span class="success-text flexbe-success"
                                        >Сохранено</span
                                    >
                                    <span class="error-text flexbe-error"
                                        >Ошибка</span
                                    >
                                </div> -->
            </span>
        </div>
        <div class="telegram-outer flexbe-white-box shadow">
            <div
                v-if="connections.length == 0"
                class="telegram-inner px25 py25"
            >
                <div class="telegram-logo">
                    <img src="@/assets/images/telegram.png" />
                    <span class="flexbe-text">Telegram бот не подключен</span>
                </div>
                <div
                    class="flexbe-button is-secondary filled"
                    @click="modalTelegramCode()"
                >
                    Подключить
                </div>
            </div>
            <div v-if="connections.length > 0" class="telegram-inner">
                <div class="collection">
                    <div
                        class="collection-item"
                        v-for="(connection, index) in connections"
                        :key="index"
                    >
                        <div class="telegram-avatar">
                            <!-- <div class="user-avatar">
                                                <div
                                                    class="user-avatar--image"
                                                    style="
                                                        background-image: url(@/assets/images/telegram.png);
                                                    "
                                                ></div>
                                            </div> -->
                            <img
                                src="@/assets/images/telegram.png"
                                width="24px"
                            />
                            <div class="flexbe-text">
                                {{ connection.show_name }}
                            </div>
                        </div>
                        <button
                            class="flexbe-button is-secondary filled"
                            @click="removeConnection(connection, index)"
                        >
                            Отключить
                        </button>
                    </div>
                    <div class="collection-item">
                        <div class="col col-4">
                            <button
                                class="flexbe-button is-secondary filled"
                                @click="modalTelegramCode()"
                            >
                                Добавить
                            </button>
                        </div>
                        <!-- <div class="col col-8">
                                            <label
                                                data-is="flexbe-input"
                                                type="toggle"
                                                class="flexbe-input flexbe-input--checkbox large to-right"
                                                ><input
                                                    ref="input"
                                                    class="flexbe-input__toggle"
                                                    type="checkbox"
                                                />
                                                <span
                                                    class="flexbe-toggle"
                                                ></span>
                                                <span
                                                    >Добавить UTM-метки в
                                                    Telegram уведомления</span
                                                >
                                            </label>
                                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        v-if="isModal"
        class="overlay-area on shadow"
        style=""
        tabindex="0"
        data-modal="modal-telegram"
    >
        <div
            class="flexbe-modal flexbe-modal--window no-title editor-ui"
            data-name="modal-telegram"
            style="width: 600px; position: absolute"
        >
            <a class="flexbe-modal-close" @click="closeModalTelegramCode()"></a>
            <div
                data-name="modal-telegram"
                class="flexbe-modal-data scrollable-content"
            >
                <div data-is="modal-telegram" class="modal-telegram">
                    <div class="modal-telegram_inner">
                        <div class="modal-telegram_block modal-telegram_bot">
                            <img src="@/assets/images/telegram.png" />
                            <div class="flexbe-title">Способ 1</div>
                            <div data-is="raw" class="flexbe-desc">
                                Найдите бота
                                <a
                                    :href="
                                        'https://t.me/landing_pagebot?start=' +
                                        code
                                    "
                                    target="_blank"
                                    >@landing_pagebot</a
                                >
                                в Telegram и напишите команду:
                            </div>
                            <div class="flexbe-button">
                                <span class="flexbe-text"
                                    >/start {{ code }}</span
                                >
                            </div>
                        </div>
                        <div class="modal-telegram_block modal-telegram_qr">
                            <img
                                class="qr-image"
                                :src="
                                    'https://api.qrserver.com/v1/create-qr-code/?size=220x220&amp;data=https://t.me/landing_pagebot?start=' +
                                    code
                                "
                                :alt="
                                    'https://t.me/landing_pagebot?start=' + code
                                "
                            />
                            <div class="flexbe-title">Способ 2</div>
                            <div class="flexbe-desc">
                                Отсканируйте этот QR-код для быстрого перехода к
                                боту
                            </div>
                            <div class="flexbe-button">
                                <span class="flexbe-text">Наведите камеру</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
