<script>
import Icon from "@/components/ui/AdminIcon.vue";

export default {
    components: { Icon },
    data() {
        return {
            siteActive: true,
        };
    },
    methods: {
        selectText(element) {
            var range;
            if (document.selection) {
                // IE
                range = document.body.createTextRange();
                range.moveToElementText(element);
                range.select();
            } else if (window.getSelection) {
                range = document.createRange();
                range.selectNode(element);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        },
        copyAccessCode() {
            this.selectText(this.$refs.access_code); // e.g. <div ref="text">
            document.execCommand("copy");
        },
    },
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
                    href="/admin/settings/general"
                >
                    Общие
                </a>
            </div>
        </header>
        <section class="container narrow">
            <div
                data-is="proxy"
                is="settings-section-general"
                style=""
                class="settings-section-general pb60"
            >
                <div class="group-list slide-down-animation">
                    <div
                        is="proxy"
                        data-is="settings-block-favicon"
                        class="settings-block-favicon group-content"
                    >
                        <div class="flexbe-title text-subtitle inline-box">
                            <span class="flexbe-text">Иконка favicon</span>
                        </div>
                        <div
                            class="flexbe-white-box shadow inline-box drop-zone-target"
                        >
                            <div
                                class="flexbe-button filled small is-secondary mr10 favicon-preview"
                            >
                                <!-- <img class="flexbe-icon size-16" src="/files/favicon_20221011170443.png"> -->
                                <div class="delete-favicon"></div>
                            </div>
                            <div
                                data-is="flexbe-button-upload"
                                regular-class="is-secondary"
                                common-class="small filled"
                                file-type="image"
                                accept="image/png,image/svg+xml"
                                drop-zone=".drop-zone-target"
                                url="/admin/api/project/560722/settings/favicon/upload/"
                                class="flexbe-button-upload upload-favicon size-small"
                            >
                                <label
                                    class="file-select flexbe-button status-default small filled is-secondary"
                                >
                                    <input
                                        type="file"
                                        class="file-input"
                                        ref="fileInput"
                                        name="file"
                                        title=""
                                        accept="image/png,image/svg+xml"
                                    />
                                    <div class="upload-text show">
                                        <span class="flexbe-text"
                                            >Загрузить</span
                                        >
                                    </div>
                                </label>
                            </div>
                            <div class="size-helper flexbe-desc">
                                <Icon
                                    path="editor_media"
                                    name="recomend_size"
                                    size="16"
                                />
                                <span class="flexbe-text"
                                    >Размер иконки: 192×192 px | Формат: PNG,
                                    SVG</span
                                >
                            </div>
                        </div>
                    </div>

                    <!-- <div is="proxy" data-is="settings-block-localization" class="settings-block-localization group-content">
                <div class="flexbe-title text-subtitle inline-box"> <span class="flexbe-text">Язык и страна сайта</span> <span data-is="admin-save-text" status="saved" class="admin-save-text flexbe-desc"><div class="status-saved"> <span class="saved-text"></span> <span class="saving-text">Сохранение</span> <span class="success-text flexbe-success">Сохранено</span> <span class="error-text flexbe-error">Ошибка</span> </div>
                </span>
                </div>
                <div class="flexbe-table flexbe-white-box shadow overflow">
                <div class="tbody">
                    <div class="tr">
                    <div class="th"> <span class="flexbe-text"> Язык <q data-is="flexbe-tooltip" class="flexbe-tooltip tooltipstered"><svg class="tip-icon" viewBox="0 0 14 14"> <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.34234 8.57C7.34234 8.59 7.34234 8.64 7.35234 8.7H6.35234C6.35122 8.68537 6.35009 8.67099 6.34898 8.6568C6.34022 8.54486 6.33234 8.44424 6.33234 8.32C6.33234 7.72 6.56234 7.23 7.14234 6.81L7.60234 6.48C7.93234 6.24 8.07234 5.95 8.07234 5.61C8.07234 5.09 7.72234 4.6 6.99234 4.6C6.25234 4.6 5.86234 5.17 5.86234 5.74C5.86234 5.89 5.88234 6.08 5.92234 6.19L4.79234 6.11C4.75234 5.97 4.73234 5.81 4.73234 5.65C4.73234 4.65 5.48234 3.56 6.99234 3.56C8.47234 3.56 9.27234 4.54 9.27234 5.56C9.27234 6.35 8.85234 6.91 8.27234 7.32L7.84234 7.62C7.51234 7.85 7.34234 8.18 7.34234 8.57ZM6.86234 10.87C6.45234 10.87 6.13234 10.54 6.13234 10.14C6.13234 9.74 6.45234 9.4 6.86234 9.4C7.26234 9.4 7.59234 9.74 7.59234 10.14C7.59234 10.54 7.26234 10.87 6.86234 10.87Z"></path> </svg>  <div class="tip-content" ref="content"> Перевод сайта (кнопок, подписи, ошибки) на язык аудитории </div> </q> </span> </div>
                    <div class="td">
                        <div data-is="flexbe-select" initial-value="ru" class="flexbe-select transparent in-table">
                        <div ref="selected" tabindex="0" class="flexbe-selected  "> <span class="flexbe-text">Русский</span>
                            <svg class="show-more" viewBox="0 0 10 6">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="tr">
                    <div class="th"> <span class="flexbe-text"> Страна <q data-is="flexbe-tooltip" class="flexbe-tooltip tooltipstered"><svg class="tip-icon" viewBox="0 0 14 14"> <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.34234 8.57C7.34234 8.59 7.34234 8.64 7.35234 8.7H6.35234C6.35122 8.68537 6.35009 8.67099 6.34898 8.6568C6.34022 8.54486 6.33234 8.44424 6.33234 8.32C6.33234 7.72 6.56234 7.23 7.14234 6.81L7.60234 6.48C7.93234 6.24 8.07234 5.95 8.07234 5.61C8.07234 5.09 7.72234 4.6 6.99234 4.6C6.25234 4.6 5.86234 5.17 5.86234 5.74C5.86234 5.89 5.88234 6.08 5.92234 6.19L4.79234 6.11C4.75234 5.97 4.73234 5.81 4.73234 5.65C4.73234 4.65 5.48234 3.56 6.99234 3.56C8.47234 3.56 9.27234 4.54 9.27234 5.56C9.27234 6.35 8.85234 6.91 8.27234 7.32L7.84234 7.62C7.51234 7.85 7.34234 8.18 7.34234 8.57ZM6.86234 10.87C6.45234 10.87 6.13234 10.54 6.13234 10.14C6.13234 9.74 6.45234 9.4 6.86234 9.4C7.26234 9.4 7.59234 9.74 7.59234 10.14C7.59234 10.54 7.26234 10.87 6.86234 10.87Z"></path> </svg>  <div class="tip-content" ref="content"> Определяет расположение серверов, формат дат, телефонов и т.д. </div> </q> </span> </div>
                    <div class="td">
                        <div data-is="flexbe-select" initial-value="RU" class="flexbe-select transparent in-table">
                        <div ref="selected" tabindex="0" class="flexbe-selected  "> <span class="flexbe-text">Россия</span>
                            <svg class="show-more" viewBox="0 0 10 6">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="tr">
                    <div class="th"> <span class="flexbe-text"> Часовой пояс <q data-is="flexbe-tooltip" class="flexbe-tooltip tooltipstered"><svg class="tip-icon" viewBox="0 0 14 14"> <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.34234 8.57C7.34234 8.59 7.34234 8.64 7.35234 8.7H6.35234C6.35122 8.68537 6.35009 8.67099 6.34898 8.6568C6.34022 8.54486 6.33234 8.44424 6.33234 8.32C6.33234 7.72 6.56234 7.23 7.14234 6.81L7.60234 6.48C7.93234 6.24 8.07234 5.95 8.07234 5.61C8.07234 5.09 7.72234 4.6 6.99234 4.6C6.25234 4.6 5.86234 5.17 5.86234 5.74C5.86234 5.89 5.88234 6.08 5.92234 6.19L4.79234 6.11C4.75234 5.97 4.73234 5.81 4.73234 5.65C4.73234 4.65 5.48234 3.56 6.99234 3.56C8.47234 3.56 9.27234 4.54 9.27234 5.56C9.27234 6.35 8.85234 6.91 8.27234 7.32L7.84234 7.62C7.51234 7.85 7.34234 8.18 7.34234 8.57ZM6.86234 10.87C6.45234 10.87 6.13234 10.54 6.13234 10.14C6.13234 9.74 6.45234 9.4 6.86234 9.4C7.26234 9.4 7.59234 9.74 7.59234 10.14C7.59234 10.54 7.26234 10.87 6.86234 10.87Z"></path> </svg>  <div class="tip-content" ref="content"> Часовой пояс основной аудитории сайта </div> </q> </span> </div>
                    <div class="td">
                        <div data-is="flexbe-select" initial-value="Europe/Moscow" class="flexbe-select transparent in-table">
                        <div ref="selected" tabindex="0" class="flexbe-selected  "> <span class="flexbe-text">+03:00 Europe/Moscow</span>
                            <svg class="show-more" viewBox="0 0 10 6">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="tr">
                    <div class="th"> <span class="flexbe-text"> Валюта <q data-is="flexbe-tooltip" class="flexbe-tooltip tooltipstered"><svg class="tip-icon" viewBox="0 0 14 14"> <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.34234 8.57C7.34234 8.59 7.34234 8.64 7.35234 8.7H6.35234C6.35122 8.68537 6.35009 8.67099 6.34898 8.6568C6.34022 8.54486 6.33234 8.44424 6.33234 8.32C6.33234 7.72 6.56234 7.23 7.14234 6.81L7.60234 6.48C7.93234 6.24 8.07234 5.95 8.07234 5.61C8.07234 5.09 7.72234 4.6 6.99234 4.6C6.25234 4.6 5.86234 5.17 5.86234 5.74C5.86234 5.89 5.88234 6.08 5.92234 6.19L4.79234 6.11C4.75234 5.97 4.73234 5.81 4.73234 5.65C4.73234 4.65 5.48234 3.56 6.99234 3.56C8.47234 3.56 9.27234 4.54 9.27234 5.56C9.27234 6.35 8.85234 6.91 8.27234 7.32L7.84234 7.62C7.51234 7.85 7.34234 8.18 7.34234 8.57ZM6.86234 10.87C6.45234 10.87 6.13234 10.54 6.13234 10.14C6.13234 9.74 6.45234 9.4 6.86234 9.4C7.26234 9.4 7.59234 9.74 7.59234 10.14C7.59234 10.54 7.26234 10.87 6.86234 10.87Z"></path> </svg>  <div class="tip-content" ref="content"> Используется в списке заявок, корзине и приеме платежей </div> </q> </span> </div>
                    <div class="td">
                        <div data-is="flexbe-select" initial-value="RUB" class="flexbe-select transparent in-table">
                        <div ref="selected" tabindex="0" class="flexbe-selected  "> <span class="flexbe-text">RUB — Russian Ruble</span>
                            <svg class="show-more" viewBox="0 0 10 6">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4L9 0L10 1L5 6L0 1L1 0L5 4Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="tr">
                    <div class="th"> <span class="flexbe-text">Символ валюты</span> </div>
                    <div class="td">
                        <div data-is="flexbe-buttons-line" button-class="small" role="selector" class="flexbe-buttons-line role-selector  is-group view-types currency-symbols ml-10"><span class="flexbe-button filled is-primary active small">  <span class="flexbe-text"> ₽ </span> </span><span class="flexbe-button filled is-light small">  <span class="flexbe-text"> р. </span> </span><span class="flexbe-button filled is-light small">  <span class="flexbe-text"> руб. </span> </span>
                        </div>
                    </div>
                    </div>
                </div>
                </div> -->

                    <!-- <div is="proxy" data-is="settings-block-animation" class="settings-block-animation group-content">
                <div class="flexbe-title text-subtitle inline-box"> <span class="flexbe-text">Анимация страницы</span> <span data-is="admin-save-text" status="saved" class="admin-save-text flexbe-desc"><div class="status-saved"> <span class="saved-text"></span> <span class="saving-text">Сохранение</span> <span class="success-text flexbe-success">Сохранено</span> <span class="error-text flexbe-error">Ошибка</span> </div>
                </span>
            </div>
            <div class="flexbe-white-box shadow collection">
                <div class="collection-item">
                <label data-is="flexbe-input" type="toggle" class="flexbe-input flexbe-input--checkbox large ">
                    <input ref="input" class="flexbe-input__toggle " type="checkbox"> <span class="flexbe-toggle "></span> <span>Плавный скролл страницы</span> <q data-is="flexbe-tooltip" content="Изменяет физику скролла, добавляя инерции при прокручивании и делая его более плавным. Функция не работает в редакторе и на мобильных устройствах." class="flexbe-tooltip tooltipstered"><svg class="tip-icon" viewBox="0 0 14 14"> <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7ZM7.34234 8.57C7.34234 8.59 7.34234 8.64 7.35234 8.7H6.35234C6.35122 8.68537 6.35009 8.67099 6.34898 8.6568C6.34022 8.54486 6.33234 8.44424 6.33234 8.32C6.33234 7.72 6.56234 7.23 7.14234 6.81L7.60234 6.48C7.93234 6.24 8.07234 5.95 8.07234 5.61C8.07234 5.09 7.72234 4.6 6.99234 4.6C6.25234 4.6 5.86234 5.17 5.86234 5.74C5.86234 5.89 5.88234 6.08 5.92234 6.19L4.79234 6.11C4.75234 5.97 4.73234 5.81 4.73234 5.65C4.73234 4.65 5.48234 3.56 6.99234 3.56C8.47234 3.56 9.27234 4.54 9.27234 5.56C9.27234 6.35 8.85234 6.91 8.27234 7.32L7.84234 7.62C7.51234 7.85 7.34234 8.18 7.34234 8.57ZM6.86234 10.87C6.45234 10.87 6.13234 10.54 6.13234 10.14C6.13234 9.74 6.45234 9.4 6.86234 9.4C7.26234 9.4 7.59234 9.74 7.59234 10.14C7.59234 10.54 7.26234 10.87 6.86234 10.87Z"></path> </svg>   </q> </label>
                </div>
                <div class="collection-item block">
                <div class="flexbe-title mb20">Анимация появления секций</div>
                <div class="media-select">
                    <div class="media-select__item ">
                    <div class="media-select__preview "> <img class="poster" src="/_s/images/admin/settings/general/animations/off.png"> </div>
                    <div class="media-select__text-wrap">
                        <svg class="flexbe-icon size-16 media-select__svg">
                        <use xlink:href="/assets/images/settings.svg?1c7acb5f1#icon-check"></use>
                        </svg> <span class="flexbe-text text-note font-ui media-select__text">Без эффекта</span> </div>
                    </div>
                    <div class="media-select__item ">
                    <div class="media-select__preview "> <img class="poster" src="/assets/images/fade_in.png"> </div>
                    <div class="media-select__text-wrap">
                        <svg class="flexbe-icon size-16 media-select__svg">
                        <use xlink:href="/assets/images/settings.svg?1c7acb5f1#icon-check"></use>
                        </svg> <span class="flexbe-text text-note font-ui media-select__text">Прозрачность</span> </div>
                    </div>
                    <div class="media-select__item check">
                    <div class="media-select__preview "> <img class="poster" src="/assets/images/slide_up.png"> </div>
                    <div class="media-select__text-wrap">
                        <svg class="flexbe-icon size-16 media-select__svg">
                        <use xlink:href="/assets/images/settings.svg?1c7acb5f1#icon-check"></use>
                        </svg> <span class="flexbe-text text-note font-ui media-select__text">Сдвиг вверх</span> </div>
                    </div>
                </div>
                </div>
                <div class="collection-footer collection-item shade">
                <div class="flexbe-desc" data-is="raw">Плавная анимация появления секций при прокрутке страницы. Применяется ко всем страницам сайта.</div>
                </div>
            </div> -->

                    <!-- <div is="proxy" data-is="settings-block-adaptive" class="settings-block-adaptive group-content">
                        <div class="flexbe-title text-subtitle inline-box"> <span class="flexbe-text">Адаптивный дизайн</span> <span data-is="admin-save-text" status="saved" class="admin-save-text flexbe-desc"><div class="status-saved"> <span class="saved-text"></span> <span class="saving-text">Сохранение</span> <span class="success-text flexbe-success">Сохранено</span> <span class="error-text flexbe-error">Ошибка</span> </div>
                        </span>
                        </div>
                        <div class="flexbe-white-box shadow inline-box"> <img class="adaptive-preview" src="/assets/images/adaptive.png" alt="">
                        <div class="policy-inner">
                            <label data-is="flexbe-input" type="toggle" checked="checked" class="flexbe-input flexbe-input--checkbox large ">
                            <input ref="input" class="flexbe-input__toggle " type="checkbox" checked="checked" value="checked"> <span class="flexbe-toggle "></span> <span>Включить для всех страниц</span> </label>
                        </div>
                        </div>
                        <div class="flexbe-desc mt20"> Адаптивный дизайн обеспечивает подходящее отображение вашего сайта на мобильных телефонах и планшетах </div>
                        </div> -->

                    <!-- <div is="proxy" data-is="settings-block-antispam" class="settings-block-antispam group-content">
                        <div class="flexbe-title text-subtitle inline-box"> 
                            <span class="flexbe-text">Защита от спама</span> 
                            <span data-is="admin-save-text" status="saved" class="admin-save-text flexbe-desc">
                            <div class="status-saved"> 
                                <span class="saved-text"></span> 
                                <span class="saving-text">Сохранение</span> 
                                <span class="success-text flexbe-success">Сохранено</span> 
                                <span class="error-text flexbe-error">Ошибка</span> 
                            </div>
                            </span>
                        </div>
                        <div class="flexbe-white-box shadow block collection">
                            <div class="collection-item">
                            <label data-is="flexbe-input" type="toggle" class="flexbe-input flexbe-input--checkbox large ">
                                <input ref="input" class="flexbe-input__toggle " type="checkbox"> <span class="flexbe-toggle "></span> <span>Включить проверку reCAPTCHA в формах заявок и квизах</span> </label>
                            </div>
                            <div class="collection-footer collection-item shade"> <span class="flexbe-desc"> reCAPTCHA — сервис, направленный на выявление ботов среди посетителей сайта. Если сервис считает посетителя ботом, то посетителю предлагается пройти короткий тест (выбрать картинки, изображающие определённый объект) </span> 
                            </div>
                        </div>  
                        </div> -->

                    <div
                        is="settings-block-draft"
                        class="settings-block-draft group-content"
                    >
                        <div class="inline-box between">
                            <div class="flexbe-title text-subtitle inline-box">
                                <span class="flexbe-text">Статус сайта</span>
                            </div>
                            <div
                                is="proxy"
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
                            </div>
                        </div>
                        <div class="status-crads-list inline-box">
                            <div
                                :class="
                                    'flexbe-white-box shadow ' +
                                    (siteActive ? 'active' : '')
                                "
                                @click="!siteActive ? (siteActive = true) : ''"
                            >
                                <!-- <img class="lock-preview" src="/assets/images/public-project.png" alt=""> -->
                                <div class="flexbe-title mt20">
                                    Сайт опубликован
                                </div>
                                <div class="flexbe-desc text-center">
                                    Доступен для посетителей, учитывается в
                                    лимите сайтов
                                </div>
                                <Icon
                                    path="settings"
                                    name="icon-check"
                                    size="18"
                                />
                            </div>
                            <div
                                :class="
                                    'flexbe-white-box shadow ' +
                                    (!siteActive ? 'active' : '')
                                "
                                @click="siteActive ? (siteActive = false) : ''"
                            >
                                <!-- <img class="lock-preview" src="/assets/images/draft-project.png" alt=""> -->
                                <div class="flexbe-title mt20">
                                    Сайт-черновик
                                </div>
                                <div class="flexbe-desc text-center">
                                    Закрыт паролем, не учитывается в лимите
                                    сайтов
                                </div>
                                <Icon
                                    path="settings"
                                    name="icon-check"
                                    size="18"
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        is="settings-block-access"
                        class="settings-block-access group-content"
                    >
                        <div class="flexbe-title text-subtitle inline-box">
                            <span class="flexbe-text">Доступ к сайту</span>
                        </div>
                        <div class="flexbe-white-box shadow inline-box between">
                            <div class="settings-block-access__code inline-box">
                                <div
                                    class="flexbe-text text-xl text-medium"
                                    ref="access_code"
                                >
                                    622505
                                </div>
                                <div
                                    is="proxy"
                                    data-is="flexbe-button-copy"
                                    class="flexbe-button-copy flexbe-button style-text tooltipstered"
                                    state="copy"
                                    @click="copyAccessCode()"
                                >
                                    <Icon path="core" name="copy" size="16" />
                                </div>
                            </div>
                            <div class="flexbe-desc">
                                Черновики и сайты с техническими адресами
                                закрыты для публичного просмотра
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
