<div class="wrapper wrapper-main">
    <h1>Оплата получена</h1>
    <?php if(isset($order_data['tariff']['name'])): ?>
        Тариф <b><?=$order_data['tariff']['name']?></b> активирован<br>
    <?php else: ?>
        Баланс пополнен.
    <?php endif; ?>
    Благодарим за использование нашего сервиса!<br>
    <a href="/sites" class="btn">Продолжить</a>
</div>