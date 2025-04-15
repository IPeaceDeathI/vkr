<div class="admin-content container narrow">
    <div data-is="admin-user-pay-invoices" class="admin-user-pay-invoices ">
    <header>
        <div class="flexbe-title text-title">История платежей</div>
    </header>
    <table class="flexbe-table text-center block slide-down-animation">
        <thead class="text-note text-shade">
        <tr>
            <!-- <th class="id text-left">#</th> -->
            <th class="sum">Сумма</th>
            <th class="status">Статус</th>
            <th class="date-created">Дата создания</th>
            <th class="date-paid">Дата зачисления</th>
            <th class="invoice"></th>
        </tr>
        </thead>
        <tbody>

            <?php if($logs) foreach ($logs as $log) : ?>

                <tr>
                    <!-- <td class="id text-left"> <span>506691</span> </td> -->
                    <td class="sum"> <span><?=$log['log_value']?> ₽</span> </td>
                    <!-- <td class="status status-1"> <span>Оплачен</span> </td> -->
                    <td class="status status-1"> <span><?=$log['log_msg']?></span> </td>
                    <td class="date-created"> <span><?=$log['log_create_date']?></span> </td>
                    <td class="date-paid"> <span><?=$log['log_create_time']?></span> </td>
                    <td class="invoice">
                        <div class="flexbe-action-buttons"> </div>
                    </td>
                </tr>

            <?php endforeach; ?>


        
            <!-- <tr>
                <td class="id text-left"> <span>489631</span> </td>
                <td class="sum"> <span>2565 ₽</span> </td>
                <td class="status status-1"> <span>Оплачен</span> </td>
                <td class="date-created"> <span>09.11.2022</span> </td>
                <td class="date-paid"> <span>09.11.2022</span> </td>
                <td class="invoice">
                <div class="flexbe-action-buttons"> </div>
                </td>
            </tr>
            <tr>
                <td class="id text-left"> <span>484082</span> </td>
                <td class="sum"> <span>950 ₽</span> </td>
                <td class="status status-1"> <span>Оплачен</span> </td>
                <td class="date-created"> <span>11.10.2022</span> </td>
                <td class="date-paid"> <span>11.10.2022</span> </td>
                <td class="invoice">
                <div class="flexbe-action-buttons"> </div>
                </td>
            </tr> -->
        </tbody>
    </table>
    </div>
</div>