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

        <div class="title">Изменить сайт</div>
        <br>
        <div class="sub-title">Название сайта</div>

        <input type="text" autocomplete="off" name="title" value="<?=$data_site['title']?>">
        <br>
        <button data-save class="btn-action">Изменить</button>

    </div>


</div>