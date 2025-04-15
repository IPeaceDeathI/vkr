<!-- header_site start -->
<?=$header_site?>
<!-- header_site end -->
<!-- menu_site start -->
<?=$menu_site?>
<!-- menu_site end -->

<input type="hidden" data-id_site value="<?=$data_site['id']?>">

<div class="wrapper-edit-site">

    <div class="left-block">

        <!-- setting menu start -->
        <?=$menu_setting_site?>
        <!-- setting menu end -->

    </div>

    <div class="right-block">

        <div class="title">Вставка кода</div>
        <br><br>
        
        <div class="desc">Перед закрывающим тегом &lt;/head&gt;</div>
        <textarea data-head><?=$data_site['code_head']?></textarea>
        <br><br>
        
        <div class="desc">Перед закрывающим тегом &lt;/body&gt;</div>
        <textarea data-body><?=$data_site['code_body']?></textarea>
        <div class="desc_warning_1">В целях безопасности данный код не загружается в режиме редактирования и доступен только в режиме
просмотра</div>
        <div data-save class="btn-action">Сохранить</div>

    </div>


</div>