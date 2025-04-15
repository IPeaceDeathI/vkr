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

        <div class="block-connect-domain">
            <div class="connect-domain">
                <div class="title">Прикрепите домен к сайту</div>
                <div class="wrapper-input">
                    <div class="input">
                        <input type="text" name="domain" placeholder="domain.com" pattern="#^[\da-z\-\_]{1,}\.[a-z]{1,8}$#" minlength="4" maxlength="50" required>
                    </div>
                    <input data-save class="button" type="submit" value="Добавить">
                </div>
            </div>
            <div class="footer-block-connect">
                <div class="info">
                    <div class="logo-info"></div>
                    <div>
                        После добавления домена здесь, перейдите на ваш доменный регистратор и укажите<br><b>А-запись</b> с адресом нашего сервера: <b>45.146.164.226</b>
                    </div>
                </div>
            </div>
        </div>
        <!-- Domains Start -->
        <?php foreach ($data_domain as $domain) : ?>
            <div class="item-domain">
                <div class="block-name">
                    <div class="domain">Домен</div>
                    <div class="domain-name"><?= $domain['domain'] ?></div>
                </div>
                <a class="setting" style="display:none;">Настроить</a>
                <!-- Toggle Button Start -->
                <label class="toggler-wrapper style-1">
                    <input data-id_domain="<?= $domain['id'] ?>" type="checkbox" <?= ($domain['status'] == 0 ? '' : ' checked') ?>>
                    <div class="toggler-slider">
                        <div class="toggler-knob"></div>
                    </div>
                </label>
                <!-- Toggle Button End -->
            </div>
        <?php endforeach; ?>
        <!-- Domains End -->

    </div>
    
</div>