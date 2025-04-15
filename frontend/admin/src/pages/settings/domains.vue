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
                    href="/admin/settings/domains"
                >
                    Домены
                </a>
            </div>
            <div
                data-is="proxy"
                is="element-domains-add-alias-button"
                style=""
                class="element-domains-add-alias-button header-button"
            >
                <a class="flexbe-button is-primary large bordered rounded"
                    ><span class="flexbe-text">Добавить домен</span></a
                >
            </div>
        </header>

        <section class="container narrow">
            <div
                data-is="settings-section-domains"
                class="settings-section-domains group-list pb60"
            >
                <div
                    data-is="settings-block-domain-main"
                    class="settings-block-domain-main group-item slide-down-animation"
                >
                    <div
                        class="flexbe-white-box shadow collection status-error"
                    >
                        <div class="collection-item">
                            <div
                                data-is="element-domains-domain-info"
                                class="element-domains-domain-info"
                            >
                                <div
                                    data-is="element-domains-ssl-status"
                                    class="element-domains-ssl-status domain-ssl"
                                >
                                    <div
                                        data-is="flexbe-tooltip"
                                        class="flexbe-tooltip"
                                    >
                                        <Icon
                                            path="settings.domains"
                                            name="ssl_wait"
                                            size="12"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="domain-name"
                                    title="franshiza-remont-2-0.ru"
                                >
                                    <span class="flexbe-text"
                                        >franshiza-remont-2-0.ru</span
                                    >
                                </div>
                                <div
                                    data-is="element-domains-domain-status"
                                    class="element-domains-domain-status domain-status"
                                >
                                    <!-- <div data-is="flexbe-tooltip" content="<p class=&quot;title&quot;>Истек срок регистрации домена</p><p class=&quot;text&quot;>Для продолжения работы необходимо его продлить.<br>Для продления домена обратитесь в компанию, в которой регистрировался данный домен.<br>Если не продлить в течение месяца — домен станет свободным для регистрации другими лицами.</p>" class="flexbe-tooltip domain-error tooltipstered">
                    <Icon path="settings.domains" name="error" size="16" />
                </div> -->
                                </div>
                            </div>
                            <div
                                data-is="element-domains-domain-actions"
                                class="dropdown element-domains-domain-actions flexbe-action-buttons"
                            >
                                <div class="action-button">
                                    <Icon
                                        path="settings"
                                        name="dots"
                                        size="16"
                                    />
                                    <dropdown
                                        position="right"
                                        direction="bottom"
                                        ref="dropdown"
                                    >
                                        <div class="toggle-helper"></div>

                                        <div
                                            ref="balloon"
                                            tabindex="0"
                                            data-layers-events="ignore"
                                            class="dropdown__balloon balloon dropdown__balloon--default in-bottom"
                                            is-show="true"
                                            style="
                                                display: none;
                                                inset: 28px auto auto -123px;
                                            "
                                        >
                                            <div
                                                class="arrow"
                                                ref="arrow"
                                                style="left: 130px"
                                            ></div>
                                            <div
                                                ref="content"
                                                class="dropdown__balloon_content flexbe-balloon-content"
                                            >
                                                <div
                                                    class="status-list flexbe-list borderless hoverable hoverable-background round-corners"
                                                >
                                                    <label
                                                        class="flexbe-list-item"
                                                    >
                                                        <Icon
                                                            path="settings.domains"
                                                            name="action_ssl"
                                                            size="16"
                                                        />
                                                        <span
                                                            class="flexbe-text"
                                                            >Сертификат для
                                                            https://</span
                                                        >
                                                        <span
                                                            data-is="flexbe-input"
                                                            type="toggle"
                                                            checked="checked"
                                                            class="flexbe-input flexbe-input--checkbox"
                                                            ><input
                                                                ref="input"
                                                                class="flexbe-input__toggle"
                                                                type="checkbox"
                                                                checked="checked"
                                                                value="checked"
                                                            />
                                                            <span
                                                                class="flexbe-toggle"
                                                            ></span>
                                                        </span>
                                                    </label>
                                                    <hr />
                                                    <label
                                                        class="flexbe-list-item"
                                                    >
                                                        <Icon
                                                            path="settings.domains"
                                                            name="action_remove"
                                                            size="16"
                                                        />
                                                        <span
                                                            class="flexbe-text"
                                                            >Удалить домен</span
                                                        >
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </dropdown>
                                </div>
                            </div>
                        </div>
                        <div class="collection-item">
                            <div class="pay-block inline-box">
                                <Icon
                                    path="settings.domains"
                                    name="history_tip"
                                    size="16"
                                />
                                <span
                                    data-is="flexbe-tooltip"
                                    content="<p>Срок, до которого оплачен домен. Может не совпадать со сроком оплаты наших услуг. Домены продляются раз в год.</p><p>Для продления домена обратитесь в компанию, в которой регистрировался данный домен.</p>"
                                    class="flexbe-tooltip flexbe-text tooltipstered"
                                    data-tooltipstered="true"
                                >
                                    Оплачен до: 11.10.2023
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    data-is="settings-block-domain-tech"
                    class="settings-block-domain-tech group-item slide-down-animation"
                >
                    <div class="flexbe-title text-subtitle">
                        Технический адрес сайта
                    </div>
                    <div class="flexbe-white-box shadow collection">
                        <div class="collection-item w100">
                            <div class="flexbe-text text-shade-60">
                                lp560722.myflexbe.com
                            </div>
                            <div class="flexbe-desc ml-auto">
                                Код доступа: 622505
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
