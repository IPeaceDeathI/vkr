<?php

/**
 * @param \Noks\Template\Controller\EditTemplate
 */
?>
<!-- menu start -->
<?= $menu_index_tpl ?>
<!-- menu end -->

<div class="wrapper-add-site">

    <div class="title">Изменить шаблон</div>
    <?php if ($this->is_admin && !$this->is_my_tpl) : ?>
        <div class="sub-title" style="color: red;">Клиентский шаблон</div>
    <?php endif; ?>
    <br><br>

    <form class="tpl-form">
        <input name="tpl_id" type="hidden" value="<?= $this->tpl_id ?>">
        <div class="sub-title">Название шаблона</div>
        <input type="text" name="tpl_title" value="<?= $tpl['tpl_title'] ?>" required maxlength="100" minlength="1" autocomplete="off">
        <div class="sub-title">Категория</div>
        <select name="tpl_id_category" required style="width: 670px;">
            <option value="">Выберите категорию</option>
            <?php foreach ($tpl_categories as $tpl_category) : ?>
                <option <?= ($tpl_category['category_id'] == $tpl['tpl_id_category'] ? ' selected' : '') ?> value="<?= $tpl_category['category_id'] ?>"><?= $tpl_category['category_name'] ?></option>
            <?php endforeach; ?>
        </select>
        <?php if ($this->is_my_tpl_and_public_flow) : ?>
            <div class="sub-title">Изменить статус</div>
            <select name="tpl_status" required style="width: 670px;">
                <option value="">Выберите статус</option>
                <?php foreach ($statuses as $id_status => $name_status) : ?>
                    <option <?= ($id_status == $tpl['tpl_status'] ? ' selected' : '') ?> value="<?= $id_status ?>"><?= $name_status ?></option>
                <?php endforeach; ?>
            </select>
        <?php endif; ?>
        <div class="actions">
            <button class="btn-action" data-save>Изменить</button>
            <?php if ($this->is_admin) : ?>
                <button class="setting" title="Скопированный шаблон будет со статусом [В разработке]" data-copy-to-public>Копировать в главный проект</button>
            <?php endif; ?>
            <button class="setting" data-delete>Удалить</button>
        </div>
    </form>

</div>