<div class="admin-content">
    <header class="container narrow">
    <div data-is="admin-breadcrumbs" class="admin-breadcrumbs text-title animate"> <a class="style-link-ignore breadcrumb first   active" href="/admin/settings/integration/counters"> Аналитика </a> </div>
    <div data-is="proxy" is="element-integrations-add-button" style="" class="element-integrations-add-button header-button element-members-control-button header-button "><a class="flexbe-button is-primary large bordered rounded" href="/admin/settings/integration/counters/connect/">
        <span class="flexbe-text">Добавить интеграцию</span></a></div>
    </header>
    <section class="container  narrow">
    <div data-is="settings-section-integrations" class="settings-section-integrations ">
        <div data-is="settings-block-integrations-connected-list" class="settings-block-integrations-connected-list group-list slide-down-animation">
        <div data-is="element-integrations-settings-instance" class="element-integrations-settings-instance group-content">
            <div class="flexbe-white-box shadow collection">
            <div class="collection-item integration-header ">
                <div class="integration-icon store-app-icon size-small"> <img class="flexbe-icon size-auto" src="/<?=VERSION?>/admin/resources/images/yandex-large.png"> </div>
                <div class="integration-name flexbe-title text-truncate"> Яндекс.Метрика </div>
                <div data-is="proxy" is="save-button" class="save-button integration-button" style=""></div>
                <div data-is="element-integrations-settings-actions" class="element-integrations-settings-actions flexbe-action-buttons integration-actions">
                <div class="action-button">
                    <svg class="flexbe-icon size-16">
                    <use xlink:href="/<?=VERSION?>/admin/resources/images/settings.svg?af9bc055#dots"></use>
                    </svg>

                    <dropdown position="center" direction="bottom" ref="dropdown">
                        <div class="toggle-helper"></div>
                        <div ref="balloon" tabindex="0" data-layers-events="ignore" class="dropdown__balloon balloon dropdown__balloon--default in-bottom" is-show="true" style="display:none; inset: 28px auto auto -96px;">
                            <div class="arrow" ref="arrow" style="left: 103px;"></div>
                            <div ref="content" class="dropdown__balloon_content flexbe-balloon-content">
                                <div class="status-list flexbe-list borderless hoverable hoverable-background round-corners">
                                    <label class="flexbe-list-item">
                                        <svg class="flexbe-icon size-16">
                                            <use xlink:href="/<?=VERSION?>/admin/resources/images/settings.integrations.svg?cc8de8e7#action-pause"></use>
                                        </svg> <span class="flexbe-text"> Приостановить </span> </label>
                                    <label class="flexbe-list-item">
                                        <svg class="flexbe-icon size-15">
                                            <use href="/<?=VERSION?>/admin/resources/images/settings.integrations.svg?cc8de8e7#to-link-bold"></use>
                                        </svg> <span class="flexbe-text">Перейти к счетчику</span> </label>
                                    <label class="flexbe-list-item">
                                        <svg class="flexbe-icon size-16">
                                            <use xlink:href="/<?=VERSION?>/admin/resources/images/settings.integrations.svg?cc8de8e7#action-remove"></use>
                                        </svg> <span class="flexbe-text">Удалить</span> </label>
                                </div>
                            </div>
                        </div>
                    </dropdown>

                </div>
                </div>
            </div>
            <div class="collection-item integration-body" data-is="settings-block-counters-yandex-metrika">
                <div data-is="admin-integrations-settings-form" class="admin-integrations-settings-form w100 ">
                <div class="flexbe-admin-form" tabindex="0">
                    <div class="form-item scrollable-content integrations-fields-item">
                    <div class="form-item-label">
                        <div class="flexbe-title"> Номер счетчика </div>
                    </div>
                    <div data-is="admin-integrations-field-item" class="admin-integrations-field-item form-item-content">
                        <div data-is="flexbe-input" name="counter_id" type="text" placeholder="123456789" error-level="error" class="flexbe-input flexbe-input--text transparent in-table ">
                        <input ref="input" class="flexbe-input__text flexbe-input-styled " type="text" checked="checked" name="counter_id" placeholder="123456789"> </div>
                    </div>
                    </div>
                    <div class="form-item scrollable-content integrations-fields-item">
                    <div class="form-item-label">
                        <div class="flexbe-title"> Вебвизор </div>
                    </div>
                    <div data-is="admin-integrations-field-item" class="admin-integrations-field-item form-item-content">
                        <div data-is="flexbe-buttons-line" name="options.webvisor_version" class="flexbe-buttons-line role-radio  is-group">
                            <span class="flexbe-button filling is-light">  
                                <span class="flexbe-text"> Отключен </span> </span>
                            <span class="flexbe-button filling is-light">  
                                <span class="flexbe-text"> Версия 1.0 </span> </span>
                            <span class="flexbe-button filling is-light active">  
                                <span class="flexbe-text"> Версия 2.0 </span> </span>
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