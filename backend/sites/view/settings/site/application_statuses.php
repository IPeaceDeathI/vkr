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

        <div class="title">Статусы заявок сайта</div>
        <br>

        <div data-form class="wrapper-statuses">

            <?php foreach ($def_statuses['up'] as $key => $def_status) : ?>

                <div id="disabled" class="item-status">
                    <div class="drag-drop"></div>
                    <input type="text" value="<?= $def_status['status_name'] ?>" class="block">
                    <div class="color-box">
                        <div class="color" data-color="#<?= $def_status['status_color'] ?>" style="background-color: #<?= $def_status['status_color'] ?>;"></div>
                    </div>
                    <?php if ($key === 1) : ?>
                        <div class="add"></div>
                    <?php endif; ?>
                </div>

            <?php endforeach; ?>
            <?php unset($def_statuses['up'], $key, $def_status); ?>

            <?php foreach ($statuses as $status) : ?>

                <div data-id="<?= $status['status_id'] ?>" class="item-status">
                    <div class="drag-drop"></div>
                    <input type="text" value="<?= $status['status_name'] ?>">
                    <div class="color-box">
                        <div class="color" data-color="#<?= $status['status_color'] ?>" style="background-color: #<?= $status['status_color'] ?>;"></div>
                    </div>
                    <div class="add"></div>
                    <div class="remove"></div>
                </div>

            <?php endforeach; ?>
            <?php unset($statuses, $status); ?>

            <?php foreach ($def_statuses['bottom'] as  $def_status) : ?>

                <div id="disabled" class="item-status">
                    <div class="drag-drop"></div>
                    <input type="text" value="<?= $def_status['status_name'] ?>" class="block">
                    <div class="color-box">
                        <div class="color" data-color="#<?= $def_status['status_color'] ?>" style="background-color: #<?= $def_status['status_color'] ?>;"></div>
                    </div>
                </div>

            <?php endforeach; ?>
            <?php unset($def_statuses, $def_status); ?>

        </div>

        <button data-save class="btn-action">Сохранить</button>

    </div>


</div>