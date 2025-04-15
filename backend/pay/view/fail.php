<h1>Ошибка оплаты</h1>
<p>Номер платежа: <b><?=$order_data['finance_show_order_id'] ?? 'not found'?></b></p>
<div class="error-box">Вероятнее всего, у вас не удалось оплатить выбранным способом или вы отменили платеж</div>
<a href="javascript:history.back()" class="btn">Попробовать еще раз</a>