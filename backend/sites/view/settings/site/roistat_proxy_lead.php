<?php

/**
 * @var array $current_proxies
 * @var array $utm_items
 */
?>
<!-- header_site start -->
<?= $header_site ?>
<!-- header_site end -->
<!-- menu_site start -->
<?= $menu_site ?>
<!-- menu_site end -->

<div class="wrapper-edit-site">

    <div class="left-block">

        <!-- setting menu start -->
        <?= $menu_setting_site ?>
        <!-- setting menu end -->

    </div>

    <div class="right-block">
        <div class="title">Передача заявок в CRM через Roistat</div>
        <!-- start choice -->
        <br><br>
        <div data-choice style="display:none;" class="proxy-block">
            <div class="zero-line">
                <label class="toggler-wrapper style-1">
                    <input name="send_before_lead" type="checkbox">
                    <div class="toggler-slider">
                        <div class="toggler-knob"></div>
                    </div>
                </label>
                <div class="desc-send-before-lead">Отправлять предыдущие заявки?</div>
            </div>
            <div class="first-line">
                <input class="key-input" name="key" type="text" placeholder="Ключ интеграции roistat" required>
                <label title="Вкл/Выкл" class="toggler-wrapper style-1">
                    <input name="status" type="checkbox">
                    <div class="toggler-slider">
                        <div class="toggler-knob"></div>
                    </div>
                </label>
            </div>
            <div class="line-for-custom-fields">
                <input class="custom-field-input" name="crm_input" type="text" placeholder="Поле в системе CRM" required>
                <select class="values-for-proxy" name="option_input">
                    <option value="">Выберите значение</option>
                    <?php foreach ($utm_items as $utm) : ?>
                        <option value="<?= $utm ?>"><?= $utm ?></option>
                    <?php endforeach; ?>
                </select>
                <input class="your-field-input" type="text" placeholder="Свое поле" name="custom_input">
                <input class="your-field-input" type="text" placeholder="Свое фиксированное значение" name="fix_value">
                <div data-add-field class="add-field"></div>
                <div data-delete-field class="delete-field"></div>
            </div>
            <div class="add-copy-del-wrp">
                <div data-add-new-block-bottom class="add-new-block-bottom"></div>
                <div data-delete-this-block class="delete-this-block"></div>
            </div>
        </div>
        <!-- end choice -->


        <div class="wrp-block">
            <!-- start proxy-block -->
            <?php if (!$current_proxies) : ?>
                <input type="hidden" data-hole-for-plug>
            <?php else : ?>
                <?php foreach ($current_proxies as $proxy_block) : ?>
                    <div class="proxy-block">
                        <div class="first-line">

                            <input name="key" class="key-input" type="text" value="<?= $proxy_block['proxy_key'] ?>" placeholder="Ключ интеграции roistat" required>
                            <label title="Вкл/Выкл" class="toggler-wrapper style-1">
                                <input name="status" type="checkbox" <?= ($proxy_block['proxy_status'] ? 'checked' : '') ?>>
                                <div class="toggler-slider">
                                    <div class="toggler-knob"></div>
                                </div>
                            </label>
                        </div>
                        <?php foreach ($proxy_block['proxy_fields'] as $row) : ?>
                            <div class="line-for-custom-fields">
                                <input name="crm_input" class="custom-field-input" type="text" placeholder="Поле в системе CRM" required value="<?= $row['crm_input'] ?>">
                                <select class="values-for-proxy" name="option_input">
                                    <option value="">Выберите значение</option>
                                    <?php foreach ($utm_items as $utm) : ?>
                                        <option <?= ($row['option_input'] == $utm ? 'selected' : '') ?> value="<?= $utm ?>"><?= $utm ?></option>
                                    <?php endforeach; ?>
                                </select>
                                <input name="custom_input" class="your-field-input" type="text" placeholder="Свое поле" value="<?= $row['custom_input'] ?>">
                                <input class="your-field-input" type="text" placeholder="Свое фиксированное значение" value="<?= $row['fix_value'] ?? '' ?>" name="fix_value">
                                <div data-add-field class="add-field"></div>
                                <div data-delete-field class="delete-field"></div>
                            </div>
                        <?php endforeach; ?>
                        <div class="add-copy-del-wrp">
                            <div data-add-new-block-bottom class="add-new-block-bottom"></div>
                            <!-- <div data-copy-this-block class="copy-this-block"></div> -->
                            <div data-delete-this-block class="delete-this-block"></div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>

            <!-- end proxy-block -->
        </div>

        <div data-save class="btn-action">Сохранить</div>
    </div>


</div>