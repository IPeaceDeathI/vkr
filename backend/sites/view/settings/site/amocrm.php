<!-- header_site start -->
<?=$header_site?>
<!-- header_site end -->
<!-- menu_site start -->
<?=$menu_site?>
<!-- menu_site end -->

<div class="wrapper-edit-site">

    <div class="left-block">

        <!-- setting menu start -->
        <?=$menu_setting_site?>
        <!-- setting menu end -->

    </div>

    <div class="right-block">

        <div class="header-title">
            <div class="title">amoCRM</div>
            <div data-refresh-data class="btn-action mr-05" title="Доступно раз в час">Обновить данные</div>
            <?php if($unsetBtn): ?>
                <div data-unset-link class="btn-action btn-two">Сбросить привязку</div>
            <?php endif; ?>
        </div>
        <?php if($err_amo != ''): ?>
            <div class="msg-error-amocrm">При интеграции возникла ошибка: <?=$err_amo?></div>
        <?php endif; ?>
        <?php if($url_amo != ''): ?>
            <a class="btn-amocrm" href="<?=$url_amo?>">Подключить</a>
        <?php else: ?>

            <div class="sub-title">Выберите воронку:</div>
            
            <select name="pipeline_id" required>
                <option value="">---</option>
                <?php foreach($crm_data['pipelines'] as $pipeline): ?>
                    <option<?=( $pipeline['select'] ? ' selected' : '' )?> value="<?=$pipeline['pipeline_source_id']?>"><?=$pipeline['pipeline_source_name']?></option>
                <?php endforeach; ?>
            </select>
                
            <div class="sub-title">Выберите ответственного:</div>

            <select name="crm_user_id" required>
                <option value="">---</option>
                <?php foreach($crm_data['users'] as $user): ?>
                    <option<?=( $user['select'] ? ' selected' : '' )?> value="<?=$user['user_source_id']?>"><?=$user['user_source_name']?></option>
                <?php endforeach; ?>
            </select>

            
            <div data-save class="btn-action">Сохранить</div>
        <?php endif; ?>
    </div>


</div>