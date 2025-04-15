<div class="wrapper-edit-page">

    <div class="left-block">
        <!-- card start -->
        <?=$card_setting_page?>
        <!-- card end -->
        <!-- setting menu start -->
        <?=$menu_setting_page?>
        <!-- setting menu end -->
    </div>
    <!-- main start -->
    <div class="right-block">
            <!-- go_site start -->
            <?=$go_to_setting_page?>
            <!-- go_site end -->
            <div class="title">Создать шаблон</div>
            <br><br>

            <div class="sub-title">Название</div>
            <input type="text" name="title" required maxlength="100" minlength="1">

            <div class="sub-title">Категория</div>
            <select class="select-create-template" name="id_category" required style="width: 670px;">
                <option value="">Выберите категорию</option>
                <?php foreach($tpl_categories as $tpl_category): ?>
                    <option value="<?=$tpl_category['category_id']?>"><?=$tpl_category['category_name']?></option>
                <?php endforeach; ?>
            </select>

            <button data-save class="btn-action">Создать</button>

    </div>
    <!-- main end -->
</div>