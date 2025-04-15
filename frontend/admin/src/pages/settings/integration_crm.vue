<script>
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon },
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
                    href="/admin/settings/integration/crm"
                >
                    Экспорт заявок
                </a>
            </div>
            <div
                data-is="proxy"
                is="element-integrations-add-button"
                style=""
                class="element-integrations-add-button header-button element-members-control-button header-button"
            >
                <a
                    class="flexbe-button is-primary large bordered rounded"
                    href="/admin/settings/integration/crm/connect/"
                    ><span class="flexbe-text">Добавить интеграцию</span></a
                >
            </div>
        </header>
        <section class="container narrow">
            <div
                data-is="settings-section-integrations"
                class="settings-section-integrations"
            >
                <div
                    data-is="settings-block-integrations-connected-list"
                    class="settings-block-integrations-connected-list group-list slide-down-animation"
                >
                    <div
                        data-is="element-integrations-settings-instance"
                        class="element-integrations-settings-instance group-content"
                    >
                        <div class="flexbe-white-box shadow collection">
                            <div class="collection-item integration-header">
                                <div
                                    class="integration-icon store-app-icon size-small"
                                >
                                    <img
                                        class="flexbe-icon size-auto"
                                        src="@/assets/images/amoCRM.png"
                                    />
                                </div>
                                <div
                                    class="integration-name flexbe-title text-truncate"
                                >
                                    amoCRM
                                </div>
                                <span
                                    class="integration-status flexbe-tag small is-light fade-in-animation"
                                >
                                    Приостановлен
                                </span>
                                <span
                                    data-is="flexbe-tooltip"
                                    content="Сервис amoCRM недоступен. Возможна задержка в доставке данных"
                                    class="flexbe-tooltip integration-status flexbe-tag small is-danger fade-in-animation tooltipstered"
                                >
                                    Ошибка
                                </span>
                                <div
                                    class="flexbe-button small filled is-secondary integration-button"
                                >
                                    <div class="flexbe-text">
                                        Переподключить
                                    </div>
                                </div>
                                <div
                                    data-is="element-integrations-settings-actions"
                                    class="element-integrations-settings-actions flexbe-action-buttons integration-actions"
                                >
                                    <div class="action-button">
                                        <Icon
                                            path="settings"
                                            name="dots"
                                            size="16"
                                        />
                                        <dropdown
                                            position="center"
                                            direction="bottom"
                                            ref="dropdown"
                                        >
                                            <div class="toggle-helper"></div>
                                        </dropdown>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="collection-item integration-body"
                                data-is="settings-block-crm-amocrm"
                                disabled="disabled"
                            >
                                <div
                                    data-is="admin-integrations-settings-form"
                                    class="admin-integrations-settings-form w100"
                                >
                                    <div class="flexbe-admin-form" tabindex="0">
                                        <div
                                            class="form-item scrollable-content integrations-fields-item"
                                        >
                                            <div class="form-item-label">
                                                <div class="flexbe-title">
                                                    Адрес аккаунта
                                                </div>
                                            </div>
                                            <div
                                                data-is="admin-integrations-field-item"
                                                class="admin-integrations-field-item form-item-content"
                                            >
                                                <div
                                                    data-is="flexbe-input"
                                                    name="account_url"
                                                    type="text"
                                                    disabled="disabled"
                                                    placeholder="domain.amocrm.ru"
                                                    error-level="error"
                                                    class="flexbe-input flexbe-input--text in-table"
                                                >
                                                    <input
                                                        ref="input"
                                                        class="flexbe-input__text flexbe-input-styled"
                                                        type="text"
                                                        checked="checked"
                                                        disabled="disabled"
                                                        name="account_url"
                                                        placeholder="domain.amocrm.ru"
                                                    />
                                                </div>
                                                <button
                                                    class="flexbe-button small filled is-secondary to-right ml25"
                                                >
                                                    <div class="flexbe-text">
                                                        Изменить
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            class="form-item scrollable-content integrations-fields-item"
                                        >
                                            <div class="form-item-label">
                                                <div class="flexbe-title">
                                                    Ответственный
                                                </div>
                                            </div>
                                            <div
                                                data-is="admin-integrations-field-item"
                                                class="admin-integrations-field-item form-item-content"
                                            >
                                                <div
                                                    data-is="flexbe-select"
                                                    name="assignee"
                                                    class="flexbe-select transparent in-table"
                                                >
                                                    <div
                                                        ref="selected"
                                                        tabindex="0"
                                                        class="flexbe-selected"
                                                    >
                                                        <span
                                                            class="flexbe-text"
                                                            >—</span
                                                        >
                                                        <svg
                                                            class="show-more"
                                                            viewBox="0 0 10 6"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="form-item scrollable-content integrations-fields-item"
                                        >
                                            <div class="form-item-label">
                                                <div class="flexbe-title">
                                                    Воронка продаж
                                                </div>
                                            </div>
                                            <div
                                                data-is="admin-integrations-field-item"
                                                class="admin-integrations-field-item form-item-content"
                                            >
                                                <div
                                                    data-is="flexbe-select"
                                                    name="deal_category"
                                                    class="flexbe-select transparent in-table"
                                                >
                                                    <div
                                                        ref="selected"
                                                        tabindex="0"
                                                        class="flexbe-selected"
                                                    >
                                                        <span
                                                            class="flexbe-text"
                                                            >—</span
                                                        >
                                                        <svg
                                                            class="show-more"
                                                            viewBox="0 0 10 6"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            class="form-item scrollable-content integrations-fields-item"
                                        >
                                            <div class="form-item-label">
                                                <div class="flexbe-title">
                                                    Передавать UTM-метки
                                                </div>
                                            </div>
                                            <div
                                                data-is="admin-integrations-field-item"
                                                class="admin-integrations-field-item form-item-content"
                                            >
                                                <div
                                                    data-is="flexbe-buttons-line"
                                                    name="utm_tags"
                                                    class="flexbe-buttons-line role-radio is-group"
                                                >
                                                    <span
                                                        class="flexbe-button filling is-light"
                                                    >
                                                        <span
                                                            class="flexbe-text"
                                                        >
                                                            Не передавать
                                                        </span> </span
                                                    ><span
                                                        class="flexbe-button filled is-light active"
                                                    >
                                                        <span
                                                            class="flexbe-text"
                                                        >
                                                            В сделки
                                                        </span> </span
                                                    ><span
                                                        class="flexbe-button filling is-light"
                                                    >
                                                        <span
                                                            class="flexbe-text"
                                                        >
                                                            В контакты
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
