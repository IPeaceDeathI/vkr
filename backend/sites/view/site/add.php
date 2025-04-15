<div class="wrapper-add-site">

    <div class="title">Добавить сайт</div>
    <br><br>
    <?php if ($enable_create) : ?>
        <div class="sub-title">Название сайта</div>

        <input type="text" name="title_site" required maxlength="100" minlength="1" autocomplete="off">
        <input data-save type="submit" value="Добавить">
    <?php else : ?>
        <div class="sub-title">
            Лимит на создание сайтов исчерпан.<br>
            Текущее количество: <?= $currentCountSite ?> Доступно: <?= $CurrentAllowed['by_all'] ?><br>
            На странице <a href="/pay">тарифов и пополнения</a> вы можете подключить опцию "Дополнительное количество сайтов к тарифу"
        </div>
    <?php endif; ?>

</div>